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

async function uploadImageIfPresent(
  sb: any,
  formData: FormData,
  slug: string,
): Promise<string | null> {
  const file = formData.get("image_file");
  if (!(file instanceof File) || file.size === 0) return null;

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const safeSlug =
    slug.replace(/[^a-z0-9-]/gi, "-").toLowerCase() || "app";
  const path = `${safeSlug}-${Date.now()}.${ext}`;

  const { data, error } = await sb.storage
    .from("app-images")
    .upload(path, file, { upsert: true, cacheControl: "3600" });

  if (error) throw new Error(`فشل رفع الصورة: ${error.message}`);

  const { data: urlData } = sb.storage
    .from("app-images")
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    // Remove zero-width chars, BOM, etc.
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    // Replace any non-URL-safe character with a dash
    .replace(/[^a-z0-9-]+/g, "-")
    // Collapse multiple dashes
    .replace(/-+/g, "-")
    // Trim leading/trailing dashes
    .replace(/^-+|-+$/g, "");
}

export async function createApp(formData: FormData) {
  const sb = await requireAdmin();
  const name_ar = s(formData.get("name_ar"));
  const name_en = s(formData.get("name_en"));
  if (!name_ar || !name_en) throw new Error("الحقول المطلوبة ناقصة");

  // Bulletproof slug: prefer user input, fall back to English name, then Arabic.
  let slug = slugify(s(formData.get("slug")));
  if (!slug) slug = slugify(name_en);
  if (!slug) slug = slugify(name_ar);
  if (!slug) slug = `app-${Date.now()}`;

  const uploaded = await uploadImageIfPresent(sb, formData, slug);
  const image_url_value = uploaded || s(formData.get("image_url")) || null;

  const { error } = await sb.from("apps").insert({
    slug,
    name_ar,
    name_en,
    emoji: s(formData.get("emoji")) || "🎮",
    color: s(formData.get("color")) || "#f5a623",
    note: s(formData.get("note")) || null,
    image_url: image_url_value,
    sort_order: n(formData.get("sort_order")),
  });
  if (error) throw new Error(error.message);
  bust();
}

export async function updateApp(formData: FormData) {
  const sb = await requireAdmin();
  const id = s(formData.get("id"));
  let slug = slugify(s(formData.get("slug")));
  if (!slug) slug = slugify(s(formData.get("name_en")));
  if (!slug) slug = slugify(s(formData.get("name_ar")));
  const uploaded = await uploadImageIfPresent(sb, formData, slug);
  const image_url_value =
    uploaded || s(formData.get("image_url")) || null;
  const { error } = await sb
    .from("apps")
    .update({
      slug,
      name_ar: s(formData.get("name_ar")),
      name_en: s(formData.get("name_en")),
      emoji: s(formData.get("emoji")) || "🎮",
      color: s(formData.get("color")) || "#f5a623",
         note: s(formData.get("note")) || null,
           image_url: image_url_value,
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