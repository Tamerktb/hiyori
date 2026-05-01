export default function PrivacyPage() {
  return (
    <main dir="rtl" style={{ minHeight: "100vh", background: "#080b14", color: "#fff", fontFamily: "'Tajawal','Cairo',Arial,sans-serif", padding: "60px 5%" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');`}</style>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 20 }}>سياسة الخصوصية</h1>
        <p style={{ fontSize: 15, lineHeight: 1.9, color: "#ffffffcc", marginBottom: 14 }}>
          نحن في هيبة ستور نحترم خصوصية زبائننا. لا نجمع أي معلومات شخصية إلا تلك الضرورية لإتمام الطلب (الاسم، رقم الواتساب، تفاصيل الطلب).
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.9, color: "#ffffffcc", marginBottom: 14 }}>
          لا نشارك بياناتك مع أي طرف ثالث ولا نستخدمها لأي غرض غير إتمام الطلب وتقديم الدعم.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.9, color: "#ffffffcc" }}>
          إذا كان لديك أي استفسار عن خصوصيتك، تواصل معنا على الواتساب.
        </p>
      </div>
    </main>
  );
}