import Link from "next/link";
import UserMenu from "@/components/UserMenu";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#080b14",
        color: "#fff",
        fontFamily: "'Tajawal','Cairo',Arial,sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');
        .user-menu summary { list-style: none; }
        .user-menu summary::-webkit-details-marker { display: none; }
        .user-menu summary::marker { display: none; }
      `}</style>
      <header
        style={{
          padding: "16px 5%",
          borderBottom: "1px solid #ffffff10",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#0a0e1a",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <Link
          href="/admin"
          style={{ color: "#fff", textDecoration: "none", fontWeight: 900 }}
        >
          🎮 لوحة التحكم — هيبة ستور
        </Link>
       <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link
            href="/"
            style={{ color: "#ffffff88", textDecoration: "none", fontSize: 14 }}
          >
            ← عودة للموقع
          </Link>
          <UserMenu />
        </div>
      </header>
      <main style={{ padding: "30px 5%", maxWidth: 1200, margin: "0 auto" }}>
        {children}
      </main>
    </div>
  );
}