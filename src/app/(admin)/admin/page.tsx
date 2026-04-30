import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAllAppsForAdmin } from "@/lib/apps";
import {
  createApp,
  updateApp,
  deleteApp,
  createItem,
  updateItem,
  deleteItem,
} from "./_actions";

export const dynamic = "force-dynamic";

const inputStyle: React.CSSProperties = {
  background: "#0f1629",
  border: "1px solid #ffffff20",
  color: "#fff",
  padding: "8px 10px",
  borderRadius: 8,
  fontSize: 13,
  fontFamily: "inherit",
};
const btn: React.CSSProperties = {
  background: "#1f2a4a",
  color: "#fff",
  border: "1px solid #ffffff20",
  borderRadius: 8,
  padding: "8px 14px",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 700,
};
const btnPrimary: React.CSSProperties = {
  ...btn,
  background: "linear-gradient(135deg,#f5a623,#ff6b35)",
  color: "#000",
  border: "none",
};
const btnDanger: React.CSSProperties = {
  ...btn,
  background: "#3a1a1a",
  color: "#ff6b6b",
  border: "1px solid #ff6b6b33",
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in?next=/admin");

  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!admin) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <h1 style={{ marginBottom: 16 }}>🚫 غير مصرح</h1>
        <p style={{ color: "#ffffff88", marginBottom: 20 }}>
          هذا الحساب ليس له صلاحيات إدارة.
        </p>
        <code
          style={{
            background: "#0f1629",
            padding: "8px 14px",
            borderRadius: 8,
            fontSize: 12,
            color: "#888",
            display: "inline-block",
          }}
        >
          User ID: {user.id}
        </code>
      </div>
    );
  }

  const apps = await getAllAppsForAdmin();

  return (
    <div>
      {/* ADD NEW APP */}
      <details
        style={{
          background: "#0f1629",
          border: "1px solid #ffffff15",
          borderRadius: 14,
          padding: 18,
          marginBottom: 24,
        }}
      >
        <summary
          style={{ cursor: "pointer", fontWeight: 900, fontSize: 16 }}
        >
          ➕ إضافة تطبيق جديد
        </summary>
        <form
          action={createApp}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            gap: 10,
            marginTop: 16,
          }}
        >
          <input name="name_ar" placeholder="الاسم بالعربي" required style={inputStyle} />
          <input name="name_en" placeholder="English Name" required style={inputStyle} />
          <input name="slug" placeholder="slug (مثل: pubg-mobile)" required style={inputStyle} />
          <input name="emoji" placeholder="🎮" defaultValue="🎮" style={inputStyle} />
          <input name="color" placeholder="#f5a623" defaultValue="#f5a623" style={inputStyle} />
          <input name="note" placeholder="ملاحظة (اختياري)" style={inputStyle} />
          <input name="image_file" type="file" accept="image/*" style={inputStyle} />
          <input name="image_url" placeholder="أو رابط مباشر" style={inputStyle} />
          <input name="sort_order" type="number" placeholder="ترتيب" defaultValue={apps.length + 1} style={inputStyle} />
          <button type="submit" style={btnPrimary}>إضافة</button>
        </form>
      </details>

      {/* APPS LIST */}
      {apps.map((app) => (
        <div
          key={app.id}
          style={{
            background: "linear-gradient(145deg,#0f1629,#151d35)",
            border: "1px solid #ffffff10",
            borderRadius: 16,
            padding: 20,
            marginBottom: 18,
            borderLeft: `4px solid ${app.color}`,
          }}
        >
          {/* APP EDITOR */}
          <form
            action={updateApp}
            style={{
              display: "grid",
              gridTemplateColumns: "auto repeat(auto-fit,minmax(120px,1fr)) auto auto",
              gap: 8,
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <input type="hidden" name="id" value={app.id} />
            <span style={{ fontSize: 28 }}>{app.emoji}</span>
            <input name="name_ar" defaultValue={app.name_ar} style={inputStyle} />
            <input name="name_en" defaultValue={app.name_en} style={inputStyle} />
            <input name="slug" defaultValue={app.slug} style={inputStyle} />
            <input name="emoji" defaultValue={app.emoji} style={{ ...inputStyle, width: 60 }} />
            <input name="color" defaultValue={app.color} style={{ ...inputStyle, width: 90 }} />
            <input name="note" defaultValue={app.note ?? ""} placeholder="ملاحظة" style={inputStyle} />
           {app.image_url && (
              <img src={app.image_url} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover", border: "1px solid #ffffff22" }} />
            )}
            <input name="image_file" type="file" accept="image/*" style={{ ...inputStyle, gridColumn: "span 2" }} />
            <input name="image_url" defaultValue={app.image_url ?? ""} placeholder="أو رابط مباشر" style={inputStyle} />
            <input name="sort_order" type="number" defaultValue={app.sort_order} style={{ ...inputStyle, width: 60 }} />
            <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#ffffff99" }}>
              <input type="checkbox" name="active" defaultChecked={app.active} /> نشط
            </label>
            <button type="submit" style={btnPrimary}>حفظ</button>
          </form>

          <form action={deleteApp} style={{ display: "inline-block", marginBottom: 16 }}>
            <input type="hidden" name="id" value={app.id} />
            <button
              type="submit"
              style={btnDanger}
              // @ts-ignore
              formNoValidate
            >
              🗑 حذف التطبيق بكامله
            </button>
          </form>

          {/* ITEMS */}
          <div
            style={{
              background: "#080b14",
              borderRadius: 10,
              padding: 14,
              marginTop: 8,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 10, color: app.color }}>
              الباقات ({app.items.length})
            </div>

            {app.items.map((it) => (
              <div
                key={it.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 70px auto auto auto",
                  gap: 6,
                  marginBottom: 6,
                  alignItems: "center",
                }}
              >
                <form action={updateItem} style={{ display: "contents" }}>
                  <input type="hidden" name="id" value={it.id} />
                  <input name="label" defaultValue={it.label} style={inputStyle} placeholder="الباقة" />
                  <input name="price" defaultValue={it.price} style={inputStyle} placeholder="السعر" />
                  <input name="sort_order" type="number" defaultValue={it.sort_order} style={inputStyle} />
                  <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#ffffff77" }}>
                    <input type="checkbox" name="active" defaultChecked={it.active} /> ✓
                  </label>
                  <button type="submit" style={btn}>حفظ</button>
                </form>
                <form action={deleteItem}>
                  <input type="hidden" name="id" value={it.id} />
                  <button type="submit" style={btnDanger}>🗑</button>
                </form>
              </div>
            ))}

            {/* ADD ITEM */}
            <form
              action={createItem}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr auto",
                gap: 6,
                marginTop: 12,
                paddingTop: 12,
                borderTop: "1px dashed #ffffff15",
              }}
            >
              <input type="hidden" name="app_id" value={app.id} />
              <input name="label" placeholder="باقة جديدة" required style={inputStyle} />
              <input name="price" placeholder="السعر" required style={inputStyle} />
              <button type="submit" style={btnPrimary}>+ إضافة باقة</button>
            </form>
          </div>
        </div>
      ))}

      {apps.length === 0 && (
        <div style={{ textAlign: "center", padding: 40, color: "#ffffff66" }}>
          لا توجد تطبيقات بعد. أضف أول تطبيق من الأعلى.
        </div>
      )}
    </div>
  );
}