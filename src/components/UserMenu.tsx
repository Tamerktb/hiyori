import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/_actions/auth";

export default async function UserMenu() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link
        href="/sign-in"
        style={{
          color: "#ffffffaa",
          textDecoration: "none",
          fontSize: 13,
          padding: "8px 14px",
          border: "1px solid #ffffff22",
          borderRadius: 8,
          fontWeight: 700,
        }}
      >
        تسجيل الدخول
      </Link>
    );
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  const isAdmin = !!admin;
  const initial = (user.email || "U")[0].toUpperCase();

  return (
    <details className="user-menu" style={{ position: "relative" }}>
      <summary
        style={{
          listStyle: "none",
          cursor: "pointer",
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: isAdmin
            ? "linear-gradient(135deg,#f5a623,#ff6b35)"
            : "#1f2a4a",
          color: isAdmin ? "#000" : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: 15,
          border: "2px solid #ffffff22",
        }}
      >
        {initial}
      </summary>
      <div
        style={{
          position: "absolute",
          top: 50,
          insetInlineEnd: 0,
          background: "#0f1629",
          border: "1px solid #ffffff20",
          borderRadius: 12,
          padding: 8,
          minWidth: 220,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          zIndex: 200,
        }}
      >
        <div
          style={{
            padding: "10px 12px",
            borderBottom: "1px solid #ffffff10",
            marginBottom: 4,
          }}
        >
          <div style={{ fontSize: 11, color: "#ffffff66", marginBottom: 4 }}>
            {isAdmin ? "👑 مسؤول" : "👤 مستخدم"}
          </div>
          <div style={{ fontSize: 13, color: "#fff", wordBreak: "break-all" }}>
            {user.email}
          </div>
        </div>
        {isAdmin && (
          <Link
            href="/admin"
            style={{
              display: "block",
              padding: "10px 12px",
              color: "#fff",
              textDecoration: "none",
              fontSize: 14,
              borderRadius: 8,
              fontWeight: 700,
            }}
          >
            🎮 لوحة التحكم
          </Link>
        )}
        <form action={signOut}>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px 12px",
              background: "transparent",
              color: "#ff6b6b",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              textAlign: "right",
              fontFamily: "inherit",
              borderRadius: 8,
              fontWeight: 700,
            }}
          >
            🚪 تسجيل الخروج
          </button>
        </form>
      </div>
    </details>
  );
}