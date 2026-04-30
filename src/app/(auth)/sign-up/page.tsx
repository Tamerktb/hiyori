"use client";

import Link from "next/link";
import { useState } from "react";
import { signUpAction } from "@/app/_actions/auth";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const result = await signUpAction(new FormData(e.currentTarget));

    if (result?.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    if (result?.needsConfirmation) {
      setSuccess("تم إنشاء الحساب! تفقّد بريدك لتفعيل الحساب.");
      setLoading(false);
    }
    // Otherwise, redirected to /
  }

  const inputStyle: React.CSSProperties = {
    background: "#080b14",
    border: "1px solid #ffffff20",
    color: "#fff",
    padding: "12px 14px",
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "inherit",
  };

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
        إنشاء حساب
      </h1>
      <p style={{ fontSize: 14, color: "#ffffff66", marginBottom: 24 }}>
        املأ البيانات لإنشاء حساب
      </p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 14 }}>
        <input name="name" required placeholder="اسمك" style={inputStyle} />
        <input
          name="email"
          type="email"
          required
          placeholder="email@domain.com"
          style={inputStyle}
        />
        <input
          name="password"
          type="password"
          required
          minLength={6}
          placeholder="كلمة المرور (6 أحرف على الأقل)"
          style={inputStyle}
        />

        {error && (
          <div style={{ background: "#3a1a1a", border: "1px solid #ff6b6b44", color: "#ff8888", padding: "10px 14px", borderRadius: 10, fontSize: 13 }}>
            ⚠ {error}
          </div>
        )}
        {success && (
          <div style={{ background: "#1a3a1a", border: "1px solid #6bff6b44", color: "#88ff88", padding: "10px 14px", borderRadius: 10, fontSize: 13 }}>
            ✓ {success}
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
          {loading ? "جاري الإنشاء..." : "إنشاء حساب"}
        </button>
      </form>

      <div style={{ marginTop: 18, fontSize: 13, color: "#ffffff66", textAlign: "center" }}>
        عندك حساب؟{" "}
        <Link href="/sign-in" style={{ color: "#f5a623", fontWeight: 700, textDecoration: "none" }}>
          سجّل دخول
        </Link>
      </div>
    </div>
  );
}