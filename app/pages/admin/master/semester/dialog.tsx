import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";
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
import { ScrollArea } from "~/components/ui/scroll-area";
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
import GenerateUrl from "~/utils/generate-url";
import { setFormErrorsFromApi } from "~/utils/set-errors-api";
import type {
  TahunAkademik,
  TahunAkademikResponse,
  TahunAkademikResponseNoPagination,
} from "../tahun-akademik/type";
import { fetcher } from "~/lib/fetcher";

const Dialog = ({ url }: { url: String }) => {
  const store = useDialogStore();

  const URL = GenerateUrl(
    `${import.meta.env.VITE_BASE_URL}/api/tahun-akademik`,
    `paginate=false`
  );

  const { data, error, isLoading } = useSWR<TahunAkademikResponseNoPagination>(
    URL,
    fetcher
  );

  const form = useForm({
    values: {
      id: "",
      semester: "",
      year: "",
      tahun_akademik_id: "",
    },
  });

  useEffect(() => {
    if (store.data) {
      form.clearErrors();
      // If there's existing data, set the form values
      form.setValue("id", store.data.id);
      form.setValue("semester", store.data.semester);
      form.setValue("year", store.data.year);
      form.setValue("tahun_akademik_id", store.data.tahun_akademik_id.toString());
    } else {
      // Reset the form if no data is available
      form.reset();
    }
  }, [store.data]);

  async function onSubmit(values: Record<string, any>) {
    const urlEndpoint = store.data
      ? `/api/semester/${store.data.id}`
      : `/api/semester`;
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
        ? "Semester updated successfully!"
        : "Semester created successfully!"
    );
  }

  return (
    <Form {...form}>
      <CustomDialog
        title={store.data ? "Edit Semester" : "Add New Semester"}
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
        <ScrollArea>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <FormControl>
                      <Input placeholder="1" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the semester number, e.g., "1".
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="2024" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the year, e.g., "2024".
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tahun_akademik_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun Akademik</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <Select disabled>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Loading..." />
                          </SelectTrigger>
                        </Select>
                      ) : error ? (
                        <div className="text-destructive text-sm">
                          Failed to load Tahun Akademik.
                        </div>
                      ) : (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Tahun Akademik" />
                          </SelectTrigger>
                          <SelectContent>
                            {data?.results.map((tahunAkademik) => (
                              <SelectItem
                                key={tahunAkademik.id}
                                value={tahunAkademik.id.toString()}
                              >
                                {tahunAkademik.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
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
        </ScrollArea>
      </CustomDialog>
    </Form>
  );
};

export default Dialog;
