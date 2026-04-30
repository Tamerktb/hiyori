"use client";

import { useAuth } from "@/providers/AuthProvider";
import supabaseClient from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomeUserNav() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    supabaseClient
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()
      .then(({ data }) => setIsAdmin(data?.role === "admin"));
  }, [user]);

  const logout = async () => {
    await supabaseClient.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (!user) {
    return (
      <Link
        href="/sign-in"
        style={{
          background: "rgba(255,255,255,0.08)",
          color: "#fff",
          padding: "10px 22px",
          borderRadius: 50,
          fontWeight: 700,
          fontSize: 15,
          textDecoration: "none",
          border: "1px solid rgba(255,255,255,0.18)",
          transition: "all .2s",
        }}
      >
        👤 تسجيل الدخول
      </Link>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {isAdmin && (
        <Link
          href="/admin"
          style={{
            background: "linear-gradient(135deg,#f5a623,#ff6b35)",
            color: "#000",
            padding: "9px 18px",
            borderRadius: 50,
            fontWeight: 900,
            fontSize: 14,
            textDecoration: "none",
          }}
        >
          🎮 لوحة التحكم
        </Link>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#667eea,#764ba2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 900,
            color: "#fff",
          }}
        >
          {user.email?.charAt(0).toUpperCase()}
        </div>
        <button
          onClick={logout}
          style={{
            background: "rgba(255,80,80,0.12)",
            color: "#ff6b6b",
            padding: "8px 16px",
            borderRadius: 50,
            fontWeight: 700,
            fontSize: 13,
            border: "1px solid rgba(255,80,80,0.25)",
            cursor: "pointer",
          }}
        >
          خروج
        </button>
      </div>
    </div>
  );
}