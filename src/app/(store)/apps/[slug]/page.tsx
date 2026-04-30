import Link from "next/link";
import { notFound } from "next/navigation";
import { getAppBySlug, getApps } from "@/lib/apps";
import UserMenu from "@/components/UserMenu";
export const dynamic = "force-dynamic";

const WA = "https://wa.me/962781367709";

export async function generateStaticParams() {
  const apps = await getApps();
  return apps.map((a) => ({ slug: a.slug }));
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app) notFound();

  return (
    <main
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
        * { box-sizing:border-box; margin:0; padding:0; }
        .price-row { display:flex; justify-content:space-between; align-items:center; padding:16px 20px; background:#ffffff08; border-radius:14px; margin-bottom:10px; text-decoration:none; border:1px solid transparent; transition:all .25s; }
        .price-row:hover { background:#ffffff14; transform:translateX(-4px); }
        .user-menu summary { list-style: none; }
        .user-menu summary::-webkit-details-marker { display: none; }
        .user-menu summary::marker { display: none; }
        .wa-float { position:fixed; bottom:28px; left:28px; width:62px; height:62px; background:#25d366; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:30px; box-shadow:0 4px 24px #25d36655; z-index:999; text-decoration:none; }
      `}</style>

      <nav style={{ padding: "18px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ffffff10", background: "#080b14ee", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#fff" }}>
          <span style={{ fontSize: 28 }}>🎮</span>
          <div style={{ fontWeight: 900, fontSize: 20 }}>هيبة ستور</div>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link href="/" style={{ color: "#ffffff88", textDecoration: "none", fontSize: 14 }}>← الرئيسية</Link>
          <UserMenu />
        </div>
      </nav>

      <section style={{ padding: "60px 5% 40px", textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
       <div style={{ width: 140, height: 140, borderRadius: 30, background: app.color + "18", border: `3px solid ${app.color}55`, margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", fontSize: 64 }}>
          {app.image_url ? (
            <img src={app.image_url} alt={app.name_ar} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span>{app.emoji}</span>
          )}
        </div>
        <h1 style={{ fontSize: "clamp(28px,6vw,48px)", fontWeight: 900, color: app.color, marginBottom: 8 }}>
          {app.name_ar}
        </h1>
        <div style={{ fontSize: 16, color: "#ffffff55", marginBottom: 14, letterSpacing: 1 }}>{app.name_en}</div>
        {app.note && (
          <div style={{ display: "inline-block", padding: "8px 18px", background: app.color + "18", border: `1px solid ${app.color}44`, borderRadius: 20, fontSize: 14, fontWeight: 700, color: app.color }}>
            📌 {app.note}
          </div>
        )}
      </section>

      <section style={{ padding: "20px 5% 60px", maxWidth: 700, margin: "0 auto" }}>
        <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20, textAlign: "center" }}>💎 الأسعار</h2>

        {app.items.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: "#ffffff66" }}>
            لا توجد باقات متاحة حالياً.
          </div>
        )}

        {app.items.map((item) => {
          const msg = `السلام عليكم، أريد شراء ${item.label} من ${app.name_ar}`;
          const link = `${WA}?text=${encodeURIComponent(msg)}`;
          const isContact = item.price === "تواصل معنا";
          return (
            <a key={item.id} href={link} target="_blank" rel="noreferrer" className="price-row">
              <span style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>{item.label}</span>
              <span style={{ fontWeight: 900, fontSize: isContact ? 13 : 16, color: isContact ? "#ffffff66" : app.color }}>
                {item.price} ←
              </span>
            </a>
          );
        })}

        
          <a href={`${WA}?text=${encodeURIComponent(`السلام عليكم، أريد الاستفسار عن ${app.name_ar}`)}`}
          target="_blank"
          rel="noreferrer"
          style={{ display: "block", marginTop: 28, padding: 18, background: "linear-gradient(135deg,#25d366,#128c5e)", borderRadius: 14, textAlign: "center", color: "#fff", fontWeight: 900, fontSize: 17, textDecoration: "none", boxShadow: "0 6px 24px #25d36644" }}
        >
          📲 اطلب الآن على واتساب
        </a>
      </section>

      <a href={WA} target="_blank" rel="noreferrer" className="wa-float">💬</a>
    </main>
  );
}