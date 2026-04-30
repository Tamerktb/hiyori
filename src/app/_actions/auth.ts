"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { env } from "@/env.mjs";

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet) => {
          toSet.forEach(({ name, value, options }) => {
            try {
              cookieStore.set(name, value, options);
            } catch {
              // ignore — happens in some contexts
            }
          });
        },
      },
    },
  );
}

export async function signOut() {
  const supabase = await getSupabase();
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
}): Promise<{ error?: string; redirectTo?: string }> {
  const supabase = await getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: error?.message ?? "Invalid credentials" };
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (redirectTo) return { redirectTo };
  if (admin) return { redirectTo: "/admin" };
  return { redirectTo: "/" };
}
export async function signUpAction({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<{ error?: string; redirectTo?: string; needsConfirmation?: boolean }> {
  const supabase = await getSupabase();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) return { error: error.message };

  if (data.session) {
    return { redirectTo: "/" };
  }
  return { needsConfirmation: true };
}