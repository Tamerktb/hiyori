"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signInAction({
  email,
  password,
  redirectTo,
}: {
  email: string;
  password: string;
  redirectTo?: string;
}): Promise<{ error?: string } | never> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: error?.message ?? "Invalid credentials" };
  }

  // Check admin status
  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  revalidatePath("/", "layout");

  if (redirectTo) redirect(redirectTo);
  if (admin) redirect("/admin");
  redirect("/");
}