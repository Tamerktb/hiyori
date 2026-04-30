import Link from "next/link";

export default function AuthLayout({
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');`}</style>
      <header
        style={{
          padding: "18px 5%",
          borderBottom: "1px solid #ffffff10",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            color: "#fff",
          }}
        >
          <span style={{ fontSize: 28 }}>🎮</span>
          <span style={{ fontSize: 20, fontWeight: 900 }}>هيبة ستور</span>
        </Link>
      </header>
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 5%",
        }}
      >
        <div style={{ width: "100%", maxWidth: 440 }}>{children}</div>
      </main>
    </div>
  );
}