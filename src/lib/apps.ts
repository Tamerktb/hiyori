import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { env } from "@/env.mjs";

export type App = {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  emoji: string;
  color: string;
  note: string | null;
  image_url: string | null;
  sort_order: number;
  active: boolean;
};

export type AppItem = {
  id: string;
  app_id: string;
  label: string;
  price: string;
  sort_order: number;
  active: boolean;
};

export type AppWithItems = App & { items: AppItem[] };

function publicClient() {
  return createSupabaseClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { persistSession: false } },
  );
}

const sortItems = (items: AppItem[]) =>
  [...items].sort((a, b) => a.sort_order - b.sort_order);

export async function getApps(): Promise<AppWithItems[]> {
  const supabase = publicClient();
  const { data } = await supabase
    .from("apps")
    .select("*, items:app_items(*)")
    .eq("active", true)
    .order("sort_order");
  if (!data) return [];
  return data.map((a: any) => ({
    ...a,
    items: sortItems((a.items || []).filter((i: AppItem) => i.active)),
  }));
}

export async function getAppBySlug(
  slug: string,
): Promise<AppWithItems | null> {
  const supabase = publicClient();
  const { data } = await supabase
    .from("apps")
    .select("*, items:app_items(*)")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (!data) return null;
  return {
    ...data,
    items: sortItems(((data as any).items || []).filter((i: AppItem) => i.active)),
  };
}

export async function getAllAppsForAdmin(): Promise<AppWithItems[]> {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("apps")
    .select("*, items:app_items(*)")
    .order("sort_order");
  if (!data) return [];
  return data.map((a: any) => ({
    ...a,
    items: sortItems(a.items || []),
  }));
}