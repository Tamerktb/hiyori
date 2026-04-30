"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { signInAction } from "@/app/_actions/auth";
import { authSchema } from "../validations";
import { PasswordInput } from "./PasswordInput";

type FormData = z.infer<typeof authSchema>;

export function SignInForm() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit({ email, password }: FormData) {
    startTransition(async () => {
      const redirectTo =
        searchParams?.get("redirectTo") ||
        searchParams?.get("from") ||
        undefined;

      const result = await signInAction({ email, password, redirectTo });

      if (result?.error) {
        toast({ title: "خطأ", description: result.error });
        return;
      }
      if (result?.redirectTo) {
        window.location.href = result.redirectTo;
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@domain.com" {...field} />
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
                <PasswordInput
                  placeholder="**********"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && (
            <Spinner className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          Sign in
        </Button>
      </form>
    </Form>
  );
}

export default SignInForm;