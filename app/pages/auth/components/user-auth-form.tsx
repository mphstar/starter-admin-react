import { useState, type HTMLAttributes } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { PasswordInput } from "~/components/molecules/password-input";
import { Link, useNavigate } from "react-router";
import { TbBrandFacebook, TbBrandGithub } from "react-icons/tb";
import { zodResolver } from "@hookform/resolvers/zod";
import MyAccessToken from "~/utils/access-token";
import { toast } from "sonner";

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>;

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, {
      message: "Please enter your password",
    })
    .min(3, {
      message: "Password must be at least 3 characters long",
    }),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      email: "",
      password: "",
    },
  });

  const router = useNavigate();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // eslint-disable-next-line no-console
    const urlEndpoint = `/api/auth/login`;

    const fetchData = await fetch(
      `${import.meta.env.VITE_BASE_URL}${urlEndpoint}`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!fetchData.ok) {
      const errorData = await fetchData.json();
      form.setError("email", {
        type: "manual",
        message: errorData.message || "Login failed. Please try again.",
      });
      return;
    }

    const responseData = await fetchData.json();

    toast.success("Login successful!");

    // Set the access token in a utility class
    MyAccessToken.set(responseData.access_token);

    // Redirect to the home page or any other page after successful login
    router("/admin/dashboard", { replace: true });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-3", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to="/forgot-password"
                className="text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75"
              >
                Forgot password?
              </Link>
            </FormItem>
          )}
        />
        <Button className="mt-2" disabled={form.formState.isSubmitting}>
          Login
        </Button>
      </form>
    </Form>
  );
}
