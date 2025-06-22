import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useConfirmDialogStore } from "~/stores/useConfirmDialogStore";
import { useDialogStore } from "~/stores/useDialogStore";
import MyAccessToken from "~/utils/access-token";
import { setFormErrorsFromApi } from "~/utils/set-errors-api";

const Dialog = ({ url }: { url: String }) => {
  const store = useDialogStore();

  const form = useForm({
    values: {
      id: "",
      name: "",
      code: "",
      level: "",
    },
  });

  useEffect(() => {
    if (store.data) {
      form.clearErrors();
      // If there's existing data, set the form values
      form.setValue("id", store.data.id);
      form.setValue("name", store.data.name);
      form.setValue("code", store.data.code);
      form.setValue("level", store.data.level);
    } else {
      // Reset the form if no data is available
      form.reset();
    }
  }, [store.data]);

  async function onSubmit(values: Record<string, any>) {
    const urlEndpoint = store.data
      ? `/api/kelas/${store.data.id}`
      : `/api/kelas`;
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
      store.data ? "Kelas updated successfully!" : "Kelas created successfully!"
    );
  }

  return (
    <Form {...form}>
      <CustomDialog
        title={store.data ? "Edit Kelas" : "Add New Kelas"}
        description="Make changes and save."
        footer={
          <>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => store.setOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Loading..." : "Save"}
            </Button>
          </>
        }
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Kelas code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Kelas name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TODDLER">TODDLER</SelectItem>
                        <SelectItem value="PLAYGROUP">PLAYGROUP</SelectItem>
                        <SelectItem value="KINDERGARTEN_1">
                          KINDERGARTEN_1
                        </SelectItem>
                        <SelectItem value="KINDERGARTEN_2">
                          KINDERGARTEN_2
                        </SelectItem>
                        <SelectItem value="ELEMENTARY_SCHOOL">
                          ELEMENTARY_SCHOOL
                        </SelectItem>
                        <SelectItem value="JUNIOR_HIGH_SCHOOL">
                          JUNIOR_HIGH_SCHOOL
                        </SelectItem>
                        <SelectItem value="SENIOR_HIGH_SCHOOL">
                          SENIOR_HIGH_SCHOOL
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <button
            type="submit"
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
          ></button>
        </form>
      </CustomDialog>
    </Form>
  );
};

export default Dialog;
