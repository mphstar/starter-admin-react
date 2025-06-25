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

import { fetcher } from "~/lib/fetcher";
import type { KelasResponseNoPagination } from "../kelas/type";
import { PasswordInput } from "~/components/molecules/password-input";
import type { SemesterResponseNoPagination } from "../semester/type";
import type { RoleResponseNoPagination } from "../../roles/type";

const Dialog = ({ url }: { url: String }) => {
  const store = useDialogStore();

  const URL = GenerateUrl(
    `${import.meta.env.VITE_BASE_URL}/api/role`,
    `paginate=false`
  );

  const { data, error, isLoading } = useSWR<RoleResponseNoPagination>(
    URL,
    fetcher
  );


  const form = useForm({
    values: {
      id: "",
      name: "",
      email: "",
      password: "",
      religion: "",
      gender: "",
      nip: "",
      position: "",
      birth_place: "",
      birth_date: "",
      phone_number: "",
      nationality: "",
      image: undefined as File | undefined,
      role: "",
    },
  });

  useEffect(() => {
    if (store.data) {
      form.clearErrors();
      // If there's existing data, set the form values
      form.setValue("id", store.data.id);
      form.setValue("name", store.data.user.name);
      form.setValue("email", store.data.user.email);
      form.setValue("password", store.data.user.password);
      form.setValue("religion", store.data.user.religion);
      form.setValue("gender", store.data.user.gender);
      form.setValue("nip", store.data.nip);
      form.setValue("position", store.data.position);
      form.setValue("birth_place", store.data.user.birth_place);
      form.setValue("birth_date", store.data.user.birth_date);
      form.setValue("phone_number", store.data.user.phone_number);
      form.setValue("nationality", store.data.user.nationality);

      form.setValue("role", store.data.user.roles[0]?.id.toString() ?? ""); // Reset image field
    } else {
      // Reset the form if no data is available
      form.reset();
    }
  }, [store.data]);

  async function onSubmit(values: Record<string, any>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("religion", values.religion);
    formData.append("gender", values.gender);
    formData.append("nip", values.nip);
    formData.append("position", values.position);
    formData.append("birth_place", values.birth_place);
    formData.append("birth_date", values.birth_date);
    formData.append("phone_number", values.phone_number);
    formData.append("nationality", values.nationality);
    if (values.image) {
      formData.append("image", values.image);
    }
    formData.append("role", values.role);

    const urlEndpoint = store.data
      ? `/api/employee/${store.data.id}`
      : `/api/employee`;
    const method = "POST";

    const fetchData = await fetch(
      `${import.meta.env.VITE_BASE_URL}${urlEndpoint}`,
      {
        method: method,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${MyAccessToken.get()}`,
        },
        body: formData,
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
        ? "Employee updated successfully!"
        : "Employee created successfully!"
    );
  }

  return (
    <Form {...form}>
      <CustomDialog
        title={store.data ? "Edit Employee" : "Add New Employee"}
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
        className="xl:min-w-6xl"
      >
        <ScrollArea>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Employee Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIP</FormLabel>
                    <FormControl>
                      <Input placeholder="NIP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Gender" />
                          <SelectContent>
                            <SelectItem value="MALE">Male</SelectItem>
                            <SelectItem value="FEMALE">Female</SelectItem>
                          </SelectContent>
                        </SelectTrigger>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="religion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Religion</FormLabel>
                    <FormControl>
                      <Input placeholder="Religion" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Position" />
                          <SelectContent>
                            <SelectItem value="TEACHER">Teacher</SelectItem>
                            <SelectItem value="ADMINISTRATOR">
                              Administrator
                            </SelectItem>
                            <SelectItem value="TECHNICIAN">
                              Technician
                            </SelectItem>
                          </SelectContent>
                        </SelectTrigger>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birth_place"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Place</FormLabel>
                    <FormControl>
                      <Input placeholder="Birth Place" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birth_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Date</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Birth Date"
                        type="date"
                        className="[&::-webkit-calendar-picker-indicator]:opacity-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input placeholder="Nationality" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Image"
                        type="file"
                        // Remove value prop for file input
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <Select disabled>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Loading..." />
                          </SelectTrigger>
                        </Select>
                      ) : error ? (
                        <div className="text-destructive text-sm">
                          Failed to load role.
                        </div>
                      ) : (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Role" />
                          </SelectTrigger>
                          <SelectContent>
                            {data?.results.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item.id.toString()}
                              >
                                {item.name}
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
