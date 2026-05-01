import Link from "next/link";
import { getApps } from "@/lib/apps";

import UserMenu from "@/components/UserMenu";
export const dynamic = "force-dynamic";
const WA = "https://wa.me/962781482011";

const features = [
  { icon: "⚡", title: "تسليم فوري", desc: "شحن خلال دقائق" },
  { icon: "🔒", title: "أمان 100%", desc: "معاملات مضمونة" },
  { icon: "💸", title: "أسعار نار", desc: "أرخص من السوق" },
  { icon: "🎮", title: "جميع الألعاب", desc: "كل التطبيقات" },
];

export default async function Home() {
  const apps = await getApps();

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#080b14",
        color: "#fff",
        fontFamily: "'Tajawal','Cairo',Arial,sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .glow-btn { display:inline-flex; align-items:center; gap:10px; background:linear-gradient(135deg,#25d366,#128c5e); color:white; padding:16px 36px; border-radius:50px; font-size:18px; font-weight:900; text-decoration:none; box-shadow:0 0 30px #25d36655; transition:all .3s; }
        .glow-btn:hover { transform:translateY(-3px); box-shadow:0 0 50px #25d36699; }
        .outline-btn { display:inline-flex; align-items:center; gap:10px; background:transparent; color:#fff; padding:16px 36px; border-radius:50px; font-size:16px; font-weight:700; text-decoration:none; border:2px solid #ffffff30; transition:border-color .3s; }
        .outline-btn:hover { border-color:#ffffff77; }
        .app-card { background:linear-gradient(145deg,#0f1629,#151d35); border-radius:20px; padding:30px 22px; border:1px solid #ffffff10; transition:all .35s; text-align:center; text-decoration:none; color:inherit; display:block; }
        .app-card:hover { transform:translateY(-8px); border-color:#ffffff22; }
        .feat-card { background:linear-gradient(145deg,#0f1629,#151d35); border:1px solid #ffffff10; border-radius:16px; padding:28px 20px; text-align:center; transition:transform .3s; }
        .feat-card:hover { transform:translateY(-4px); }
        .grid3 { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
        .grid4 { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }
        .grid5 { display:grid; grid-template-columns:repeat(5,1fr); gap:18px; }
        @media(max-width:900px){ .grid3{grid-template-columns:repeat(2,1fr);} .grid4{grid-template-columns:repeat(2,1fr);} .grid5{grid-template-columns:repeat(2,1fr);} }
        @media(max-width:560px){ .grid3{grid-template-columns:1fr;} .grid4{grid-template-columns:repeat(2,1fr);} .grid5{grid-template-columns:repeat(2,1fr);} }
        .badge { display:inline-block; background:linear-gradient(135deg,#f5a623,#ff6b35); color:#000; font-weight:900; font-size:13px; padding:4px 14px; border-radius:20px; margin-bottom:12px; }
        .wa-float { position:fixed; bottom:28px; left:28px; width:62px; height:62px; background:#25d366; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:30px; box-shadow:0 4px 24px #25d36655; z-index:999; text-decoration:none; transition:transform .3s; animation:pulse 2s infinite; }
        .wa-float:hover { transform:scale(1.1); }
        @keyframes pulse { 0%,100%{box-shadow:0 4px 24px #25d36655;} 50%{box-shadow:0 4px 40px #25d36699;} }
        .user-menu summary { list-style: none; }
        .user-menu summary::-webkit-details-marker { display: none; }
        .user-menu summary::marker { display: none; }
        .hero-bg { position:absolute; inset:0; pointer-events:none; background:radial-gradient(ellipse 60% 50% at 20% 40%,#f5a62318 0%,transparent 60%),radial-gradient(ellipse 50% 50% at 80% 60%,#ff4d4d14 0%,transparent 60%); }
      `}</style>

    {/* NAV */}
<nav style={{ padding: "18px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ffffff10", background: "#080b14ee", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 100 }}>
  <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#fff" }}>
    <span style={{ fontSize: 32 }}>🎮</span>
    <div>
      <div style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.1 }}>هيبة ستور</div>
      <div style={{ fontSize: 11, color: "#ffffff55", letterSpacing: 2 }}>HIBA STORE</div>
    </div>
  </Link>

  {/* RIGHT SIDE: login state + WA button */}
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
   
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <a href={WA} target="_blank" rel="noreferrer" style={{ background: "linear-gradient(135deg,#25d366,#128c5e)", color: "#fff", padding: "10px 22px", borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            📲 تواصل معنا
          </a>
          <UserMenu />
        </div>
  </div>
</nav>

      {/* HERO */}
      <section style={{ position: "relative", padding: "80px 5% 60px", textAlign: "center", overflow: "hidden" }}>
        <div className="hero-bg" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="badge">🔥 عروض نار ما بتتكرر</div>
          <h1 style={{ fontSize: "clamp(48px,9vw,100px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, background: "linear-gradient(135deg,#fff 30%,#f5a623 70%,#ff4d4d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            هيبة ستور
          </h1>
          <p style={{ fontSize: "clamp(18px,3vw,26px)", color: "#ffffffbb", marginBottom: 12, fontWeight: 700 }}>🚀 شحن ألعاب + تطبيقات</p>
          <p style={{ fontSize: "clamp(15px,2vw,19px)", color: "#ffffff88", maxWidth: 500, margin: "0 auto 40px" }}>
            بدك شحن سريع؟ مضمون؟ بدون وجع راس وصلت المكان الصح ✅
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={WA} target="_blank" rel="noreferrer" className="glow-btn">📲 اطلب الآن على واتساب</a>
            <a href="#products" className="outline-btn">🎮 شوف المنتجات</a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "20px 5% 50px", maxWidth: 1100, margin: "0 auto" }}>
        <div className="grid4">
          {features.map((f) => (
            <div key={f.title} className="feat-card">
              <div style={{ fontSize: 36, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 900, marginBottom: 5 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: "#ffffff55" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* APPS GRID — clicks go to detail page */}
      <section id="products" style={{ padding: "40px 5% 60px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h2 style={{ fontSize: "clamp(26px,5vw,46px)", fontWeight: 900, marginBottom: 10 }}>🎮 منتجاتنا</h2>
          <p style={{ color: "#ffffff55", fontSize: 16 }}>اضغط على أي تطبيق لعرض الأسعار</p>
        </div>
      <div className={apps.length === 5 ? "grid5" : "grid3"}>
          {apps.map((app) => (
            <Link key={app.id} href={`/apps/${app.slug}`} className="app-card">
              <div
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 24,
                  background: app.color + "18",
                  border: `2px solid ${app.color}55`,
                  margin: "0 auto 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  fontSize: 48,
                }}
              >
                {app.image_url ? (
                  <img
                    src={app.image_url}
                    alt={app.name_ar}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <span>{app.emoji}</span>
                )}
              </div>
              <div style={{ fontWeight: 900, fontSize: 18, color: app.color, marginBottom: 6 }}>
                {app.name_ar}
              </div>
              <div style={{ fontSize: 13, color: "#ffffff55", marginBottom: 14 }}>{app.name_en}</div>
              <div style={{ display: "inline-block", padding: "6px 14px", background: app.color + "18", border: `1px solid ${app.color}33`, borderRadius: 20, fontSize: 12, fontWeight: 700, color: app.color }}>
                {app.items.length} باقة متوفرة ←
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "40px 5% 60px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h2 style={{ fontSize: "clamp(26px,5vw,46px)", fontWeight: 900, marginBottom: 10 }}>🔄 كيف نشتغل</h2>
          <p style={{ color: "#ffffff55", fontSize: 16 }}>4 خطوات بسيطة وبتستلم شحنك بدقائق</p>
        </div>
        <div className="grid4">
          {[
            { n: "1", icon: "🎮", title: "اختر المنتج", desc: "اضغط على المنتج اللي بدك إياه" },
            { n: "2", icon: "💬", title: "تواصل واتساب", desc: "بنرد عليك فوراً ونأكد الطلب" },
            { n: "3", icon: "💳", title: "ادفع بأمان", desc: "زين كاش، أورنج موني، أو حوالة بنكية" },
            { n: "4", icon: "⚡", title: "استلم الكود", desc: "الكود بيوصلك على الواتساب فوراً" },
          ].map((s) => (
            <div key={s.n} className="feat-card" style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: -12, right: -12, width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#f5a623,#ff4d4d)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#000" }}>
                {s.n}
              </div>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "#ffffff55" }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

   {/* TRUST */}
      <section style={{ padding: "40px 5% 60px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h2 style={{ fontSize: "clamp(26px,5vw,46px)", fontWeight: 900, marginBottom: 10 }}>✨ ليش تثق فينا</h2>
        </div>
        <div className="grid3">
          {[
            { icon: "📘", title: "صفحة فيسبوك نشطة", desc: "شوف تقييمات الزبائن وآرائهم", url: "https://www.facebook.com/share/1App5Bfp2S/" },
            { icon: "💬", title: "دعم فني 24/7", desc: "موجودين دائماً على الواتساب", url: WA },
            { icon: "🇯🇴", title: "محل أردني محلي", desc: "الزرقاء، الأردن • نخدم زبائننا بفخر", url: "" },
       ].map((b, i) => (
            
             <a key={i}
              href={b.url || "#"}
              target={b.url ? "_blank" : "_self"}
              rel="noreferrer"
              className="feat-card"
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <div style={{ fontSize: 42, marginBottom: 14 }}>{b.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 900, marginBottom: 8 }}>{b.title}</div>
              <div style={{ fontSize: 13, color: "#ffffff66" }}>{b.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "40px 5% 60px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h2 style={{ fontSize: "clamp(26px,5vw,46px)", fontWeight: 900, marginBottom: 10 }}>❓ أسئلة شائعة</h2>
        </div>
        {[
          { q: "كيف أعرف إنكم محل موثوق؟", a: "إحنا محل أردني من الزرقاء، صفحتنا على الفيسبوك نشطة وفيها تقييمات الزبائن. تقدر تواصل معنا قبل الشراء وتسأل أي سؤال." },
          { q: "كيف بستلم الكود بعد الدفع؟", a: "بعد ما تدفع وتبعتلنا صورة الإيصال على الواتساب، الكود بيوصلك خلال دقائق على نفس رقم الواتساب." },
          { q: "شو طرق الدفع المتوفرة؟", a: "زين كاش، أورنج موني، تحويل بنكي. كل التفاصيل بنرسلها لك بعد ما نأكد الطلب على الواتساب." },
          { q: "إذا الكود ما اشتغل، شو بصير؟", a: "تواصل معنا فوراً على الواتساب خلال 24 ساعة من الاستلام، ورح نتأكد من المشكلة ونحلها لك." },
          { q: "ليش بعض المنتجات مكتوب 'تواصل معنا' بدل السعر؟", a: "بعض الأسعار بتتغير حسب الكمية أو العرض الحالي. تواصل معنا وبنعطيك أحسن سعر متوفر اليوم." },
          { q: "هل في خصم على الكميات؟", a: "أكيد! إذا بدك تشحن أكتر من مرة أو كميات كبيرة، تواصل معنا وبنعملك خصم خاص." },
        ].map((f, i) => (
          <details key={i} style={{ background: "linear-gradient(145deg,#0f1629,#151d35)", border: "1px solid #ffffff10", borderRadius: 14, padding: "18px 22px", marginBottom: 12, cursor: "pointer" }}>
            <summary style={{ fontWeight: 900, fontSize: 16, color: "#fff", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{f.q}</span>
              <span style={{ color: "#f5a623", fontSize: 22 }}>+</span>
            </summary>
            <p style={{ marginTop: 14, color: "#ffffff99", fontSize: 14, lineHeight: 1.7 }}>{f.a}</p>
          </details>
        ))}
      </section>

      {/* CTA */}
      <section style={{ margin: "0 5% 60px", background: "linear-gradient(135deg,#0f1629,#1a1040)", border: "1px solid #ffffff15", borderRadius: 24, padding: "50px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(22px,4vw,38px)", fontWeight: 900, marginBottom: 14 }}>📲 تواصل معنا الآن</h2>
        <p style={{ fontSize: 17, color: "#ffffff88", marginBottom: 30 }}>
          واتساب: <strong style={{ color: "#25d366" }}>0781482011</strong>
          <br />طرق الدفع: زين كاش · أورنج موني · تحويل بنكي
        </p>
        <a href={WA} target="_blank" rel="noreferrer" className="glow-btn" style={{ fontSize: 20 }}>💬 ابدأ المحادثة</a>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #ffffff10", padding: "40px 5% 28px", textAlign: "center", color: "#ffffff66", fontSize: 13 }}>
        <div style={{ fontSize: 30, marginBottom: 8 }}>🎮</div>
        <div style={{ fontWeight: 900, color: "#fff", fontSize: 18, marginBottom: 4 }}>هيبة ستور</div>
        <div style={{ marginBottom: 18, color: "#ffffff55" }}>📍 الزرقاء، الأردن 🇯🇴</div>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 18 }}>
          <a href={WA} target="_blank" rel="noreferrer" style={{ color: "#25d366", textDecoration: "none", fontWeight: 700 }}>📱 واتساب</a>
          <a href="https://www.facebook.com/share/1App5Bfp2S/" target="_blank" rel="noreferrer" style={{ color: "#1877f2", textDecoration: "none", fontWeight: 700 }}>📘 فيسبوك</a>
        </div>
        <div style={{ borderTop: "1px solid #ffffff10", paddingTop: 18, color: "#ffffff44" }}>
          جميع الحقوق محفوظة © 2026 · هيبة ستور · شحن ألعاب وتطبيقات
        </div>
      </footer>

      <a href={WA} target="_blank" rel="noreferrer" className="wa-float">💬</a>
    </main>
  );
}