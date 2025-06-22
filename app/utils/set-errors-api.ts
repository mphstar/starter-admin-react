import type { UseFormReturn, FieldValues } from "react-hook-form";

export function setFormErrorsFromApi<TFieldValues extends FieldValues = FieldValues>(
  form: UseFormReturn<TFieldValues>,
  errors: Record<string, string[] | string>
) {
  Object.entries(errors).forEach(([key, messages]) => {
    form.setError(key as any, {
      type: "manual",
      message: Array.isArray(messages) ? messages.join(", ") : String(messages),
    });
  });
}
