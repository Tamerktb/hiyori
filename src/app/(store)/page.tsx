"use client";

const products = [
  {
    id: 1,
    nameAr: "شدات ببجي موبايل",
    name: "PUBG Mobile UC",
    emoji: "🎯",
    color: "#f5a623",
    glow: "#f5a62333",
    note: "الشحن عن طريق الـ ID",
    items: [
      { amount: "60 UC", price: "0.70 د.أ" },
      { amount: "325 UC", price: "3.40 د.أ" },
      { amount: "660 UC", price: "6.30 د.أ" },
      { amount: "1800 UC", price: "16.00 د.أ" },
      { amount: "3850 UC", price: "33.00 د.أ" },
      { amount: "8100 UC", price: "64.00 د.أ" },
    ],
  },
  {
    id: 2,
    nameAr: "جواهر فري فاير",
    name: "Free Fire Diamonds",
    emoji: "💎",
    color: "#ff4d4d",
    glow: "#ff4d4d33",
    note: "الشحن عن طريق الـ ID",
    items: [
      { amount: "100 جوهرة", price: "تواصل معنا" },
      { amount: "310 جوهرة", price: "تواصل معنا" },
      { amount: "520 جوهرة", price: "تواصل معنا" },
      { amount: "1060 جوهرة", price: "تواصل معنا" },
      { amount: "2180 جوهرة", price: "تواصل معنا" },
      { amount: "5600 جوهرة", price: "تواصل معنا" },
    ],
  },
  {
    id: 3,
    nameAr: "رايزر غولد عالمي",
    name: "Razer Gold Global",
    emoji: "🟢",
    color: "#44ff44",
    glow: "#44ff4433",
    note: "بطاقات عالمية فقط",
    items: [
      { amount: "$5", price: "3.70 د.أ" },
      { amount: "$10", price: "6.50 د.أ" },
      { amount: "$20", price: "14.50 د.أ" },
      { amount: "$50", price: "تواصل معنا" },
      { amount: "$100", price: "تواصل معنا" },
    ],
  },
  {
    id: 4,
    nameAr: "توكنز جواكر",
    name: "Jawaker Tokens",
    emoji: "🃏",
    color: "#f59e0b",
    glow: "#f59e0b33",
    note: "الشحن عن طريق الـ ID",
    items: [
      { amount: "باقة صغيرة", price: "تواصل معنا" },
      { amount: "باقة وسط", price: "تواصل معنا" },
      { amount: "باقة كبيرة", price: "تواصل معنا" },
      { amount: "باقة VIP", price: "تواصل معنا" },
    ],
  },
  {
    id: 5,
    nameAr: "جواهر بيجو لايف",
    name: "Bigo Live Diamonds",
    emoji: "🎙️",
    color: "#a78bfa",
    glow: "#a78bfa33",
    note: "الشحن عن طريق الـ ID",
    items: [
      { amount: "باقة صغيرة", price: "تواصل معنا" },
      { amount: "باقة وسط", price: "تواصل معنا" },
      { amount: "باقة كبيرة", price: "تواصل معنا" },
      { amount: "باقة VIP", price: "تواصل معنا" },
    ],
  },
];

const features = [
  { icon: "⚡", title: "تسليم فوري", desc: "شحن خلال دقائق" },
  { icon: "🔒", title: "أمان 100%", desc: "معاملات مضمونة" },
  { icon: "💸", title: "أسعار نار", desc: "أرخص من السوق" },
  { icon: "🎮", title: "جميع الألعاب", desc: "كل التطبيقات" },
];

const WA = "https://wa.me/962781367709";

export default function Home() {
  return (
    <main dir="rtl" style={{
      minHeight: "100vh",
      background: "#080b14",
      color: "#fff",
      fontFamily: "'Tajawal', 'Cairo', Arial, sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .glow-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #25d366, #128c5e);
          color: white; padding: 16px 36px; border-radius: 50px;
          font-size: 18px; font-weight: 900; text-decoration: none;
          box-shadow: 0 0 30px #25d36655; transition: all 0.3s ease;
        }
        .glow-btn:hover { transform: translateY(-3px); box-shadow: 0 0 50px #25d36699; }
        .outline-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent; color: #fff; padding: 16px 36px;
          border-radius: 50px; font-size: 16px; font-weight: 700;
          text-decoration: none; border: 2px solid #ffffff30; transition: border-color 0.3s;
        }
        .outline-btn:hover { border-color: #ffffff77; }
        .card {
          background: linear-gradient(145deg, #0f1629, #151d35);
          border-radius: 20px; padding: 26px 22px;
          border: 1px solid #ffffff10; transition: all 0.35s ease;
        }
        .card:hover { transform: translateY(-6px); }
        .price-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 14px; background: #ffffff08; border-radius: 10px;
          margin-top: 7px; cursor: pointer; text-decoration: none;
          border: 1px solid transparent; transition: all 0.2s;
        }
        .price-row:hover { background: #ffffff14; }
        .feat-card {
          background: linear-gradient(145deg, #0f1629, #151d35);
          border: 1px solid #ffffff10; border-radius: 16px;
          padding: 28px 20px; text-align: center; transition: transform 0.3s;
        }
        .feat-card:hover { transform: translateY(-4px); }
        .grid3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; }
        .grid4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 18px; }
        @media(max-width:900px){ .grid3{grid-template-columns:repeat(2,1fr);} .grid4{grid-template-columns:repeat(2,1fr);} }
        @media(max-width:560px){ .grid3{grid-template-columns:1fr;} .grid4{grid-template-columns:repeat(2,1fr);} }
        .badge {
          display: inline-block;
          background: linear-gradient(135deg,#f5a623,#ff6b35);
          color:#000; font-weight:900; font-size:13px;
          padding:4px 14px; border-radius:20px; margin-bottom:12px;
        }
        .wa-float {
          position:fixed; bottom:28px; left:28px; width:62px; height:62px;
          background:#25d366; border-radius:50%; display:flex;
          align-items:center; justify-content:center; font-size:30px;
          box-shadow:0 4px 24px #25d36655; z-index:999; text-decoration:none;
          transition:transform 0.3s; animation:pulse 2s infinite;
        }
        .wa-float:hover { transform:scale(1.1); }
        @keyframes pulse {
          0%,100%{box-shadow:0 4px 24px #25d36655;}
          50%{box-shadow:0 4px 40px #25d36699;}
        }
        .hero-bg {
          position:absolute; inset:0; pointer-events:none;
          background:
            radial-gradient(ellipse 60% 50% at 20% 40%,#f5a62318 0%,transparent 60%),
            radial-gradient(ellipse 50% 50% at 80% 60%,#ff4d4d14 0%,transparent 60%);
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        padding:"18px 5%", display:"flex", justifyContent:"space-between",
        alignItems:"center", borderBottom:"1px solid #ffffff10",
        background:"#080b14ee", backdropFilter:"blur(12px)",
        position:"sticky", top:0, zIndex:100,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:32 }}>🎮</span>
          <div>
            <div style={{ fontSize:22, fontWeight:900, lineHeight:1.1 }}>هيبة ستور</div>
            <div style={{ fontSize:11, color:"#ffffff55", letterSpacing:2 }}>HIBA STORE</div>
          </div>
        </div>
        <a href={WA} target="_blank" rel="noreferrer" style={{
          background:"linear-gradient(135deg,#25d366,#128c5e)",
          color:"#fff", padding:"10px 22px", borderRadius:50,
          fontWeight:700, fontSize:15, textDecoration:"none",
          display:"flex", alignItems:"center", gap:8,
        }}>📲 تواصل معنا</a>
      </nav>

      {/* HERO */}
      <section style={{ position:"relative", padding:"80px 5% 60px", textAlign:"center", overflow:"hidden" }}>
        <div className="hero-bg" />
        <div style={{ position:"relative", zIndex:1 }}>
          <div className="badge">🔥 عروض نار ما بتتكرر</div>
          <h1 style={{
            fontSize:"clamp(48px,9vw,100px)", fontWeight:900, lineHeight:1.1, marginBottom:20,
            background:"linear-gradient(135deg,#fff 30%,#f5a623 70%,#ff4d4d)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>هيبة ستور</h1>
          <p style={{ fontSize:"clamp(18px,3vw,26px)", color:"#ffffffbb", marginBottom:12, fontWeight:700 }}>
            🚀 شحن ألعاب + تطبيقات
          </p>
          <p style={{ fontSize:"clamp(15px,2vw,19px)", color:"#ffffff88", maxWidth:500, margin:"0 auto 40px" }}>
            بدك شحن سريع؟ مضمون؟ بدون وجع راس وصلت المكان الصح ✅
          </p>
          <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            <a href={WA} target="_blank" rel="noreferrer" className="glow-btn">📲 اطلب الآن على واتساب</a>
            <a href="#products" className="outline-btn">🎮 شوف المنتجات</a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:"20px 5% 50px", maxWidth:1100, margin:"0 auto" }}>
        <div className="grid4">
          {features.map(f => (
            <div key={f.title} className="feat-card">
              <div style={{ fontSize:36, marginBottom:10 }}>{f.icon}</div>
              <div style={{ fontSize:17, fontWeight:900, marginBottom:5 }}>{f.title}</div>
              <div style={{ fontSize:13, color:"#ffffff55" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" style={{ padding:"40px 5% 60px", maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:44 }}>
          <h2 style={{ fontSize:"clamp(26px,5vw,46px)", fontWeight:900, marginBottom:10 }}>🎮 منتجاتنا</h2>
          <p style={{ color:"#ffffff55", fontSize:16 }}>اضغط على أي منتج للطلب مباشرة على واتساب</p>
        </div>
        <div className="grid3">
          {products.map(p => (
            <div key={p.id} className="card">
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
                <div style={{
                  width:52, height:52, borderRadius:14,
                  background:p.glow, border:"2px solid " + p.color + "44",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:26, flexShrink:0,
                }}>{p.emoji}</div>
                <div>
                  <div style={{ fontWeight:900, fontSize:17, color:p.color }}>{p.nameAr}</div>
                  <div style={{ fontSize:12, color:"#ffffff44" }}>{p.name}</div>
                </div>
              </div>
              <div style={{
                fontSize:12, color:p.color, background:p.glow,
                borderRadius:8, padding:"5px 10px", marginBottom:12,
                display:"inline-block", fontWeight:700,
              }}>📌 {p.note}</div>
              {p.items.map(item => (
                <a key={item.amount}
                  href={WA + "?text=" + encodeURIComponent("السلام عليكم، أريد شراء " + item.amount + " من " + p.nameAr)}
                  target="_blank" rel="noreferrer" className="price-row"
                >
                  <span style={{ fontWeight:700, fontSize:14, color:"#fff" }}>{item.amount}</span>
                  <span style={{
                    fontWeight:900,
                    fontSize: item.price === "تواصل معنا" ? "12px" : "14px",
                    color: item.price === "تواصل معنا" ? "#ffffff44" : p.color,
                  }}>{item.price}</span>
                </a>
              ))}
              <a href={WA + "?text=" + encodeURIComponent("السلام عليكم، أريد الاستفسار عن " + p.nameAr)}
                target="_blank" rel="noreferrer"
                style={{
                  display:"block", marginTop:16, padding:"11px",
                  background:p.glow, border:"1px solid " + p.color + "44",
                  borderRadius:12, textAlign:"center", color:p.color,
                  fontWeight:700, fontSize:14, textDecoration:"none",
                }}
              >📲 اطلب الآن</a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        margin:"0 5% 60px",
        background:"linear-gradient(135deg,#0f1629,#1a1040)",
        border:"1px solid #ffffff15", borderRadius:24,
        padding:"50px 40px", textAlign:"center",
      }}>
        <h2 style={{ fontSize:"clamp(22px,4vw,38px)", fontWeight:900, marginBottom:14 }}>📲 تواصل معنا الآن</h2>
        <p style={{ fontSize:17, color:"#ffffff88", marginBottom:30 }}>
          واتساب: <strong style={{ color:"#25d366" }}>0781367709</strong>
          <br />طرق الدفع: زين كاش · أورنج موني · تحويل بنكي
        </p>
        <a href={WA} target="_blank" rel="noreferrer" className="glow-btn" style={{ fontSize:20 }}>💬 ابدأ المحادثة</a>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop:"1px solid #ffffff10", padding:"28px 5%",
        textAlign:"center", color:"#ffffff33", fontSize:13,
      }}>
        <div style={{ fontSize:22, marginBottom:6 }}>🎮</div>
        <div style={{ fontWeight:700, color:"#ffffff77", marginBottom:4 }}>هيبة ستور</div>
        <div>جميع الحقوق محفوظة © 2026 · شحن ألعاب وتطبيقات</div>
      </footer>

      <a href={WA} target="_blank" rel="noreferrer" className="wa-float">💬</a>
    </main>
  );
}
