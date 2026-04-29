"use server";

import db from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { profiles } from "../../lib/supabase/schema";
import { AdminUserFormData } from "@/features/users/validations";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  return data.user;
};

export const getCurrentUserSession = async () => {
  const cookieStore = await cookies();
  const supabase = await createClient();

  const { data } = await supabase.auth.getSession();
  return data.session;
};

export const isAdmin = async (currentUser: User | null) =>
  currentUser?.app_metadata?.isAdmin;

export const getUser = async ({ userId }: { userId: string }) => {
  const supabase = await createClient();
  const adminAuthClient = supabase.auth.admin;

  const { data, error } = await adminAuthClient.getUserById(userId);
  if (error) throw new Error("User not found");
  return data;
};