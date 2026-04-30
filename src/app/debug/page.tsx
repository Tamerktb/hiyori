import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function DebugPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const sbCookies = allCookies.filter((c) => c.name.startsWith("sb-"));

  let isAdmin = false;
  if (user) {
    const { data: admin } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();
    isAdmin = !!admin;
  }

  return (
    <pre style={{ padding: 30, color: "#fff", background: "#000", fontFamily: "monospace", fontSize: 13, minHeight: "100vh" }}>
{JSON.stringify(
  {
    hasUser: !!user,
    userEmail: user?.email ?? null,
    userId: user?.id ?? null,
    isAdmin,
    error: error?.message ?? null,
    sbCookieNames: sbCookies.map((c) => c.name),
    sbCookieCount: sbCookies.length,
    allCookieNames: allCookies.map((c) => c.name),
  },
  null,
  2,
)}
    </pre>
  );
}