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

const Dialog = () => {
  const store = useDialogStore();

  const form = useForm({
    defaultValues: {
      name: "",
      permissions: [] as string[],
    },
  });

  function onSubmit(values: Record<string, any>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    form.setError("permissions", {
      type: "manual",
      message: "This is a custom error message.",
    });
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
              name="permissions"
              render={() => {
                const allPermissions = [
                  "Get User",
                  "Create User",
                  "Update User",
                  "Delete User",
                ];

                const isAllSelected = allPermissions.every((perm) =>
                  form.watch("permissions")?.includes(perm)
                );

                const toggleSelectAll = (checked: boolean) => {
                  if (checked) {
                    form.setValue("permissions", allPermissions);
                  } else {
                    form.setValue("permissions", []);
                  }
                };

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
                        <FormLabel className="font-semibold">
                          Check All
                        </FormLabel>
                      </FormItem>
                    </div>

                    {/* List Permissions */}
                    <div className="mt-2 p-4 border-2 border-dashed grid grid-cols-2 md:grid-cols-3 rounded-md gap-2">
                      {allPermissions.map((permission) => (
                        <FormField
                          key={permission}
                          control={form.control}
                          name="permissions"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={permission}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(permission)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([
                                          ...field.value,
                                          permission,
                                        ]);
                                      } else {
                                        field.onChange(
                                          field.value?.filter(
                                            (val) => val !== permission
                                          )
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal capitalize">
                                  {permission}
                                </FormLabel>
                                
                              </FormItem>
                            );
                          }}
                        />
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
