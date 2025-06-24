import { useForm } from "react-hook-form";
import CustomDialog from "~/components/molecules/custom-dialog";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { DialogClose } from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useDialogStore } from "~/stores/useDialogStore";
import GenerateUrl from "~/utils/generate-url";
import type { PermissionsResponseNoPagination } from "./type";
import { fetcher } from "~/lib/fetcher";
import useSWR, { mutate } from "swr";
import { useEffect } from "react";
import { toast } from "sonner";
import MyAccessToken from "~/utils/access-token";
import { setFormErrorsFromApi } from "~/utils/set-errors-api";

const Dialog = ({ url }: { url: string }) => {
  const store = useDialogStore();

  const URL = GenerateUrl(
    `${import.meta.env.VITE_BASE_URL}/api/permission`,
    `paginate=false`
  );

  const { data, error, isLoading } = useSWR<PermissionsResponseNoPagination>(
    URL,
    fetcher
  );

  // Ubah defaultValues agar permissions berupa array of number (id)
  const form = useForm({
    values: {
      id: "",
      name: "",
      permission: [] as number[],
    },
  });

  useEffect(() => {
    if (store.data) {

      form.clearErrors();
      // If there's existing data, set the form values
      form.setValue("id", store.data.id);
      form.setValue("name", store.data.name);
      form.setValue(
        "permission",
        store.data.permissions.map((ite: { id: number }) => ite.id)
      );
    } else {
      // Reset the form if no data is available
      form.reset();
    }
  }, [store.data]);

  async function onSubmit(values: Record<string, any>) {
    const urlEndpoint = store.data
      ? `/api/role/${store.data.id}`
      : `/api/role`;
    const method = store.data ? "PUT" : "POST";

    const fetchData = await fetch(
      `${import.meta.env.VITE_BASE_URL}${urlEndpoint}`,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${MyAccessToken.get()}`,
        },
        body: JSON.stringify(values),
      }
    );

    if (!fetchData.ok) {
      const error = await fetchData.json();
      setFormErrorsFromApi(form, error.errors);
      return;
    }

    store.setOpen(false);
    store.reset();
    form.reset();

    mutate(url);
    toast.success(
      store.data
        ? "Role updated successfully!"
        : "Role created successfully!"
    );
  }

  return (
    <CustomDialog
      title={store.data ? "Edit Role" : "Add New Role"}
      description="Make changes and save."
      footer={
        <>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => store.setOpen(false)}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
        </>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Role name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="permission"
              render={({ field }) => {
                // field.value: number[] (array of permission ids)
                const permissionIds = field.value || [];
                const allPermissionIds = data?.results.map((p) => p.id) || [];
                const isAllSelected =
                  allPermissionIds.length > 0 &&
                  allPermissionIds.every((id) => permissionIds.includes(id));

                const toggleSelectAll = (checked: boolean) => {
                  if (checked) {
                    field.onChange(allPermissionIds);
                  } else {
                    field.onChange([]);
                  }
                };

                if (isLoading) {
                  return (
                    <FormItem>
                      <FormLabel>Loading permissions...</FormLabel>
                    </FormItem>
                  );
                }
                if (error) {
                  return (
                    <FormItem>
                      <FormLabel>Error loading permissions</FormLabel>
                      <FormMessage>
                        {error.message || "Failed to load permissions."}
                      </FormMessage>
                    </FormItem>
                  );
                }

                return (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <FormLabel className="flex-1">Permissions</FormLabel>
                      {/* Select All */}
                      <FormItem className="flex items-center space-x-1">
                        <FormControl>
                          <Checkbox
                            checked={isAllSelected}
                            onCheckedChange={(checked) =>
                              toggleSelectAll(Boolean(checked))
                            }
                          />
                        </FormControl>
                        <FormLabel className="font-medium capitalize">
                          Check All
                        </FormLabel>
                      </FormItem>
                    </div>
                    {/* List Permissions */}
                    <div className="mt-2 p-4 border-2 border-dashed grid grid-cols-2 md:grid-cols-3 rounded-md gap-2 wrap-anywhere">
                      {data?.results.map((permission) => (
                        <FormItem
                          key={permission.id}
                          className="flex flex-row items-start space-x-1 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={permissionIds.includes(permission.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([
                                    ...permissionIds,
                                    permission.id,
                                  ]);
                                } else {
                                  field.onChange(
                                    permissionIds.filter(
                                      (id) => id !== permission.id
                                    )
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal capitalize">
                            {permission.name.replace(/_/g, " ")}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </form>
      </Form>
    </CustomDialog>
  );
};

export default Dialog;
