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
import type { KelasResponseNoPagination } from "../kelas/type";

const Dialog = ({ url }: { url: String }) => {
  const store = useDialogStore();

  const URL = GenerateUrl(
    `${import.meta.env.VITE_BASE_URL}/api/kelas`,
    `paginate=false`
  );

  const { data, error, isLoading } = useSWR<KelasResponseNoPagination>(
    URL,
    fetcher
  );

  const form = useForm({
    values: {
      id: "",
      name: "",
      code: "",
      kelas_id: "",
    },
  });

  useEffect(() => {
    if (store.data) {
      form.clearErrors();
      // If there's existing data, set the form values
      form.setValue("id", store.data.id);
      form.setValue("name", store.data.name);
      form.setValue("code", store.data.code);
      form.setValue("kelas_id", store.data.kelas_id.toString());
    } else {
      // Reset the form if no data is available
      form.reset();
    }
  }, [store.data]);

  async function onSubmit(values: Record<string, any>) {
    const urlEndpoint = store.data
      ? `/api/subject/${store.data.id}`
      : `/api/subject`;
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
        ? "Mata Pelajaran updated successfully!"
        : "Mata Pelajaran created successfully!"
    );
  }

  return (
    <Form {...form}>
      <CustomDialog
        title={store.data ? "Edit Mata Pelajaran" : "Add New Mata Pelajaran"}
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Mata Pelajaran" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Code.." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="kelas_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kelas</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <Select disabled>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Loading..." />
                          </SelectTrigger>
                        </Select>
                      ) : error ? (
                        <div className="text-destructive text-sm">
                          Failed to load Kelas.
                        </div>
                      ) : (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Kelas" />
                          </SelectTrigger>
                          <SelectContent>
                            {data?.results.map((kelas) => (
                              <SelectItem
                                key={kelas.id}
                                value={kelas.id.toString()}
                              >
                                {kelas.name}
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
