"use client";

import Link from "next/link";
import { useState } from "react";
import { signInAction } from "@/app/_actions/auth";

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await signInAction(new FormData(e.currentTarget));
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // On success, the server action redirects — this code won't continue.
  }

  return (
    <div
      style={{
        background: "#0f1629",
        border: "1px solid #ffffff15",
        borderRadius: 16,
        padding: 32,
        color: "#fff",
        width: "100%",
        maxWidth: 420,
      }}
    >
      <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 8 }}>
        تسجيل الدخول
      </h1>
      <p style={{ fontSize: 14, color: "#ffffff66", marginBottom: 24 }}>
        أدخل بريدك وكلمة المرور
      </p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 14 }}>
        <input
          name="email"
          type="email"
          required
          placeholder="email@domain.com"
          style={{
            background: "#080b14",
            border: "1px solid #ffffff20",
            color: "#fff",
            padding: "12px 14px",
            borderRadius: 10,
            fontSize: 14,
            fontFamily: "inherit",
          }}
        />
        <input
          name="password"
          type="password"
          required
          placeholder="••••••••"
          style={{
            background: "#080b14",
            border: "1px solid #ffffff20",
            color: "#fff",
            padding: "12px 14px",
            borderRadius: 10,
            fontSize: 14,
            fontFamily: "inherit",
          }}
        />

        {error && (
          <div
            style={{
              background: "#3a1a1a",
              border: "1px solid #ff6b6b44",
              color: "#ff8888",
              padding: "10px 14px",
              borderRadius: 10,
              fontSize: 13,
            }}
          >
            ⚠ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "linear-gradient(135deg,#f5a623,#ff6b35)",
            color: "#000",
            border: "none",
            padding: "13px",
            borderRadius: 10,
            fontWeight: 900,
            fontSize: 15,
            cursor: loading ? "wait" : "pointer",
            fontFamily: "inherit",
          }}
        >
          {loading ? "جاري الدخول..." : "تسجيل الدخول"}
        </button>
      </form>

      <div style={{ marginTop: 18, fontSize: 13, color: "#ffffff66", textAlign: "center" }}>
        ما عندك حساب؟{" "}
        <Link href="/sign-up" style={{ color: "#f5a623", fontWeight: 700, textDecoration: "none" }}>
          أنشئ حساب
        </Link>
      </div>
    </div>
  );
}