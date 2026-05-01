export default function TermsPage() {
  return (
    <main dir="rtl" style={{ minHeight: "100vh", background: "#080b14", color: "#fff", fontFamily: "'Tajawal','Cairo',Arial,sans-serif", padding: "60px 5%" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');`}</style>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 20 }}>الشروط والأحكام</h1>
        <p style={{ fontSize: 15, lineHeight: 1.9, color: "#ffffffcc", marginBottom: 14 }}>
          باستخدامك لموقع هيبة ستور، فإنك توافق على الشروط التالية:
        </p>
        <ul style={{ fontSize: 15, lineHeight: 1.9, color: "#ffffffcc", paddingInlineStart: 24, marginBottom: 14 }}>
          <li>جميع الأسعار قابلة للتغيير حسب السوق.</li>
          <li>الدفع يتم عبر زين كاش، أورنج موني، أو تحويل بنكي.</li>
          <li>يتم تسليم الكود خلال دقائق من تأكيد الدفع.</li>
          <li>لا يحق إعادة بيع الأكواد لطرف ثالث.</li>
          <li>أي إساءة استخدام للخدمة قد تؤدي لإلغاء الطلب دون استرداد.</li>
        </ul>
        <p style={{ fontSize: 15, lineHeight: 1.9, color: "#ffffffcc" }}>
          إذا كان لديك أي استفسار، تواصل معنا على الواتساب.
        </p>
      </div>
    </main>
  );
}