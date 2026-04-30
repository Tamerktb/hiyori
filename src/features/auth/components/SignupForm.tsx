"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { Icons } from "@/components/layouts/icons";
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
import { useToast } from "@/components/ui/use-toast";
import { signUpAction } from "@/app/_actions/auth";
import { PasswordInput } from "./PasswordInput";
import { signupSchema } from "../validations";

type FormData = z.infer<typeof signupSchema>;

export function SignUpForm() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: searchParams.get("name") || "",
      email: searchParams.get("email") || "",
      password: searchParams.get("password") || "",
    },
  });

  function onSubmit({ email, password, name }: FormData) {
    startTransition(async () => {
      const result = await signUpAction({ email, password, name });
      if (result?.error) {
        toast({ title: "خطأ", description: result.error });
        return;
      }
      if (result?.redirectTo) {
        window.location.href = result.redirectTo;
      } else if (result?.needsConfirmation) {
        toast({
          title: "تم إنشاء الحساب",
          description: "تم إرسال رابط تفعيل إلى بريدك الإلكتروني.",
        });
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الاسم</FormLabel>
              <FormControl>
                <Input placeholder="كيف ندعوك؟" {...field} />
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
              <FormLabel>البريد الإلكتروني</FormLabel>
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
              <FormLabel>كلمة المرور</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          إنشاء حساب
        </Button>
      </form>
    </Form>
  );
}

export default SignUpForm;