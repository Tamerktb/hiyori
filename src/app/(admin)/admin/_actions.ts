"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!admin) throw new Error("Not authorized");
  return supabase;
}

function bust() {
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/apps", "layout");
}

const s = (v: FormDataEntryValue | null) => String(v ?? "").trim();
const n = (v: FormDataEntryValue | null) => Number(v ?? 0) || 0;

export async function createApp(formData: FormData) {
  const sb = await requireAdmin();
  const slug = s(formData.get("slug")).toLowerCase();
  const name_ar = s(formData.get("name_ar"));
  const name_en = s(formData.get("name_en"));
  if (!slug || !name_ar || !name_en) throw new Error("الحقول المطلوبة ناقصة");
  const { error } = await sb.from("apps").insert({
    slug,
    name_ar,
    name_en,
    emoji: s(formData.get("emoji")) || "🎮",
    color: s(formData.get("color")) || "#f5a623",
   note: s(formData.get("note")) || null,
    image_url: s(formData.get("image_url")) || null,
    sort_order: n(formData.get("sort_order")),
  });
  if (error) throw new Error(error.message);
  bust();
}

export async function updateApp(formData: FormData) {
  const sb = await requireAdmin();
  const id = s(formData.get("id"));
  const { error } = await sb
    .from("apps")
    .update({
      slug: s(formData.get("slug")).toLowerCase(),
      name_ar: s(formData.get("name_ar")),
      name_en: s(formData.get("name_en")),
      emoji: s(formData.get("emoji")) || "🎮",
      color: s(formData.get("color")) || "#f5a623",
         note: s(formData.get("note")) || null,
      image_url: s(formData.get("image_url")) || null,
      sort_order: n(formData.get("sort_order")),
      active: formData.get("active") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  bust();
}

export async function deleteApp(formData: FormData) {
  const sb = await requireAdmin();
  await sb.from("apps").delete().eq("id", s(formData.get("id")));
  bust();
}

export async function createItem(formData: FormData) {
  const sb = await requireAdmin();
  const app_id = s(formData.get("app_id"));
  const label = s(formData.get("label"));
  const price = s(formData.get("price"));
  if (!app_id || !label || !price) throw new Error("الحقول ناقصة");
  const { data: last } = await sb
    .from("app_items")
    .select("sort_order")
    .eq("app_id", app_id)
    .order("sort_order", { ascending: false })
    .limit(1);
  const next = (last?.[0]?.sort_order ?? 0) + 1;
  await sb.from("app_items").insert({ app_id, label, price, sort_order: next });
  bust();
}

export async function updateItem(formData: FormData) {
  const sb = await requireAdmin();
  await sb
    .from("app_items")
    .update({
      label: s(formData.get("label")),
      price: s(formData.get("price")),
      sort_order: n(formData.get("sort_order")),
      active: formData.get("active") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("id", s(formData.get("id")));
  bust();
}

export async function deleteItem(formData: FormData) {
  const sb = await requireAdmin();
  await sb.from("app_items").delete().eq("id", s(formData.get("id")));
  bust();
}