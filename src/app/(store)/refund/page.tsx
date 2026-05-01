export default function RefundPage() {
  return (
    <main dir="rtl" style={{ minHeight: "100vh", background: "#080b14", color: "#fff", fontFamily: "'Tajawal','Cairo',Arial,sans-serif", padding: "60px 5%" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');`}</style>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 20 }}>سياسة الاسترداد</h1>
        <p style={{ fontSize: 15, lineHeight: 1.9, color: "#ffffffcc", marginBottom: 14 }}>
          نحرص على رضا زبائننا. إذا واجهت مشكلة في الكود الذي استلمته، تواصل معنا فوراً على الواتساب خلال 24 ساعة من الاستلام.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.9, color: "#ffffffcc", marginBottom: 14 }}>
          سيقوم فريقنا بالتحقق من المشكلة وحلها بسرعة، إما بإعادة الكود أو استرداد المبلغ كاملاً.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.9, color: "#ffffffcc" }}>
          الأكواد التي تم استخدامها أو تنشيطها لا يمكن استردادها.
        </p>
      </div>
    </main>
  );
}