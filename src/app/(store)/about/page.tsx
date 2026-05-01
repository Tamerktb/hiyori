const WA = "https://wa.me/962781482011";

export default function AboutPage() {
  return (
    <main dir="rtl" style={{ minHeight: "100vh", background: "#080b14", color: "#fff", fontFamily: "'Tajawal','Cairo',Arial,sans-serif", padding: "60px 5%" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');`}</style>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 20, background: "linear-gradient(135deg,#fff,#f5a623)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>من نحن</h1>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: "#ffffffcc", marginBottom: 16 }}>
          هيبة ستور هو متجر أردني محلي متخصص في شحن الألعاب وبيع بطاقات وتوكنز التطبيقات المختلفة. نقدم لكم أفضل الأسعار وأسرع تسليم في السوق.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: "#ffffffcc", marginBottom: 16 }}>
          نحن نخدم زبائننا من جميع أنحاء الأردن من مقرنا في الزرقاء، ونفخر بتقديم خدمة موثوقة ودعم فني على مدار الساعة.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: "#ffffffcc" }}>
          للتواصل معنا: واتساب <a href={WA} style={{ color: "#25d366", fontWeight: 700 }}>0781482011</a>
        </p>
      </div>
    </main>
  );
}