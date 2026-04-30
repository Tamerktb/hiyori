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

const styles = {
  input: {
    background: "#0f1629",
    border: "1px solid #ffffff20",
    color: "#fff",
    padding: "10px 12px",
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box" as const,
  },
  label: {
    fontSize: 12,
    color: "#ffffff77",
    fontWeight: 700,
    marginBottom: 6,
    display: "block",
  },
  btn: {
    background: "#1f2a4a",
    color: "#fff",
    border: "1px solid #ffffff20",
    borderRadius: 10,
    padding: "11px 16px",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "inherit",
  },
  btnPrimary: {
    background: "linear-gradient(135deg,#f5a623,#ff6b35)",
    color: "#000",
    border: "none",
    borderRadius: 10,
    padding: "12px 18px",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 900,
    fontFamily: "inherit",
  },
  btnDanger: {
    background: "#3a1a1a",
    color: "#ff6b6b",
    border: "1px solid #ff6b6b33",
    borderRadius: 10,
    padding: "10px 14px",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700,
    fontFamily: "inherit",
  },
  btnIcon: {
    background: "#3a1a1a",
    color: "#ff6b6b",
    border: "1px solid #ff6b6b33",
    borderRadius: 8,
    padding: "8px 10px",
    cursor: "pointer",
    fontSize: 14,
    fontFamily: "inherit",
    minWidth: 38,
  },
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
        <h1 style={{ marginBottom: 16, fontSize: 22 }}>🚫 غير مصرح</h1>
        <p style={{ color: "#ffffff88", marginBottom: 20 }}>
          هذا الحساب ليس له صلاحيات إدارة.
        </p>
        <code
          style={{
            background: "#0f1629",
            padding: "8px 14px",
            borderRadius: 8,
            fontSize: 11,
            color: "#888",
            display: "inline-block",
            wordBreak: "break-all",
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
      <style>{`
        .admin-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        @media (max-width:600px) { .admin-grid-2 { grid-template-columns:1fr; } }
        .admin-row-item { display:grid; grid-template-columns:1fr 1fr 64px auto auto; gap:8px; align-items:center; margin-bottom:8px; }
        @media (max-width:600px) {
          .admin-row-item { grid-template-columns:1fr 1fr; gap:8px; }
          .admin-row-item .item-actions { grid-column:1 / -1; display:flex; gap:8px; }
          .admin-row-item .item-actions > * { flex:1; }
          .admin-row-item .item-sort { grid-column:1; }
          .admin-row-item .item-active { grid-column:2; }
        }
      `}</style>

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
          style={{ cursor: "pointer", fontWeight: 900, fontSize: 16, listStyle: "none" }}
        >
          ➕ إضافة تطبيق جديد
        </summary>
        <form
          action={createApp}
          encType="multipart/form-data"
          style={{ display: "grid", gap: 12, marginTop: 16 }}
        >
          <div className="admin-grid-2">
            <div>
              <label style={styles.label}>الاسم بالعربي</label>
              <input name="name_ar" required style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>English Name</label>
              <input name="name_en" required style={styles.input} />
            </div>
          </div>

          <div className="admin-grid-2">
            <div>
              <label style={styles.label}>المعرّف (slug)</label>
              <input name="slug" required placeholder="pubg-mobile" style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>الترتيب</label>
              <input
                name="sort_order"
                type="number"
                defaultValue={apps.length + 1}
                style={styles.input}
              />
            </div>
          </div>

          <div className="admin-grid-2">
            <div>
              <label style={styles.label}>إيموجي</label>
              <input name="emoji" defaultValue="🎮" style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>اللون</label>
              <input name="color" defaultValue="#f5a623" style={styles.input} />
            </div>
          </div>

          <div>
            <label style={styles.label}>ملاحظة</label>
            <input name="note" style={styles.input} />
          </div>

          <div>
            <label style={styles.label}>الصورة (اختر من جهازك)</label>
            <input name="image_file" type="file" accept="image/*" style={styles.input} />
          </div>

          <button type="submit" style={styles.btnPrimary}>
            ➕ إضافة
          </button>
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
            padding: 18,
            marginBottom: 18,
            borderRight: `4px solid ${app.color}`,
          }}
        >
          {/* APP HEADER */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
              paddingBottom: 14,
              borderBottom: "1px solid #ffffff10",
            }}
          >
            {app.image_url ? (
              <img
                src={app.image_url}
                alt=""
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  objectFit: "cover",
                  border: `2px solid ${app.color}55`,
                }}
              />
            ) : (
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  background: app.color + "22",
                  border: `2px solid ${app.color}55`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
              >
                {app.emoji}
              </div>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 900, fontSize: 17, color: app.color }}>
                {app.name_ar}
              </div>
              <div style={{ fontSize: 12, color: "#ffffff66" }}>{app.name_en}</div>
            </div>
            {!app.active && (
              <span
                style={{
                  fontSize: 11,
                  padding: "4px 10px",
                  background: "#3a1a1a",
                  color: "#ff8888",
                  borderRadius: 12,
                  fontWeight: 700,
                }}
              >
                مخفي
              </span>
            )}
          </div>

          {/* APP EDITOR */}
          <details style={{ marginBottom: 16 }}>
            <summary
              style={{
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 700,
                color: "#ffffffaa",
                marginBottom: 12,
                listStyle: "none",
                padding: "10px 14px",
                background: "#080b14",
                borderRadius: 10,
              }}
            >
              ✏️ تعديل التطبيق
            </summary>
            <form
              action={updateApp}
              encType="multipart/form-data"
              style={{ display: "grid", gap: 12, marginTop: 12 }}
            >
              <input type="hidden" name="id" value={app.id} />

              <div className="admin-grid-2">
                <div>
                  <label style={styles.label}>الاسم بالعربي</label>
                  <input name="name_ar" defaultValue={app.name_ar} style={styles.input} />
                </div>
                <div>
                  <label style={styles.label}>English Name</label>
                  <input name="name_en" defaultValue={app.name_en} style={styles.input} />
                </div>
              </div>

              <div className="admin-grid-2">
                <div>
                  <label style={styles.label}>المعرّف (slug)</label>
                  <input name="slug" defaultValue={app.slug} style={styles.input} />
                </div>
                <div>
                  <label style={styles.label}>الترتيب</label>
                  <input
                    name="sort_order"
                    type="number"
                    defaultValue={app.sort_order}
                    style={styles.input}
                  />
                </div>
              </div>

              <div className="admin-grid-2">
                <div>
                  <label style={styles.label}>إيموجي</label>
                  <input name="emoji" defaultValue={app.emoji} style={styles.input} />
                </div>
                <div>
                  <label style={styles.label}>اللون</label>
                  <input name="color" defaultValue={app.color} style={styles.input} />
                </div>
              </div>

              <div>
                <label style={styles.label}>ملاحظة</label>
                <input name="note" defaultValue={app.note ?? ""} style={styles.input} />
              </div>

              <div>
                <label style={styles.label}>صورة جديدة (اختياري)</label>
                <input name="image_file" type="file" accept="image/*" style={styles.input} />
                {app.image_url && (
                  <div style={{ fontSize: 11, color: "#ffffff55", marginTop: 6 }}>
                    الصورة الحالية: <span style={{ color: "#888" }}>{app.image_url.slice(-30)}</span>
                  </div>
                )}
                <input
                  type="hidden"
                  name="image_url"
                  defaultValue={app.image_url ?? ""}
                />
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  color: "#ffffffaa",
                  padding: "10px",
                  background: "#080b14",
                  borderRadius: 10,
                }}
              >
                <input type="checkbox" name="active" defaultChecked={app.active} style={{ width: 18, height: 18 }} />
                التطبيق نشط (ظاهر في الموقع)
              </label>

              <div style={{ display: "flex", gap: 10 }}>
                <button type="submit" style={{ ...styles.btnPrimary, flex: 1 }}>
                  💾 حفظ التعديلات
                </button>
              </div>
            </form>

            <form action={deleteApp} style={{ marginTop: 12 }}>
              <input type="hidden" name="id" value={app.id} />
              <button type="submit" style={{ ...styles.btnDanger, width: "100%" }}>
                🗑 حذف التطبيق بالكامل
              </button>
            </form>
          </details>

          {/* ITEMS */}
          <div
            style={{
              background: "#080b14",
              borderRadius: 12,
              padding: 14,
            }}
          >
            <div
              style={{
                fontWeight: 900,
                marginBottom: 14,
                color: app.color,
                fontSize: 15,
              }}
            >
              💎 الباقات ({app.items.length})
            </div>

            {app.items.map((it) => (
              <form
                key={it.id}
                action={updateItem}
                className="admin-row-item"
              >
                <input type="hidden" name="id" value={it.id} />
                <input
                  name="label"
                  defaultValue={it.label}
                  style={styles.input}
                  placeholder="الباقة"
                />
                <input
                  name="price"
                  defaultValue={it.price}
                  style={styles.input}
                  placeholder="السعر"
                />
                <input
                  name="sort_order"
                  type="number"
                  defaultValue={it.sort_order}
                  style={{ ...styles.input, textAlign: "center" }}
                  className="item-sort"
                />
                <label
                  className="item-active"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    fontSize: 12,
                    color: "#ffffff77",
                    background: "#0f1629",
                    border: "1px solid #ffffff20",
                    borderRadius: 10,
                    padding: "8px 10px",
                  }}
                >
                  <input type="checkbox" name="active" defaultChecked={it.active} />
                  نشط
                </label>
                <div className="item-actions" style={{ display: "flex", gap: 6 }}>
                  <button type="submit" style={styles.btn}>
                    💾 حفظ
                  </button>
                  <button
                    type="submit"
                    formAction={deleteItem}
                    style={styles.btnIcon}
                  >
                    🗑
                  </button>
                </div>
              </form>
            ))}

            {/* ADD ITEM */}
            <form
              action={createItem}
              style={{ display: "grid", gap: 8, marginTop: 12, paddingTop: 12, borderTop: "1px dashed #ffffff15" }}
            >
              <input type="hidden" name="app_id" value={app.id} />
              <div className="admin-grid-2">
                <input
                  name="label"
                  placeholder="باقة جديدة"
                  required
                  style={styles.input}
                />
                <input
                  name="price"
                  placeholder="السعر"
                  required
                  style={styles.input}
                />
              </div>
              <button type="submit" style={styles.btnPrimary}>
                ➕ إضافة باقة جديدة
              </button>
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