import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code"); // OAuth code from Google
  const next = searchParams.get("next") ?? "/";

  const redirectTo = request.nextUrl.clone();
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");
  redirectTo.searchParams.delete("code");

  const supabase = await createClient();

  // Handle Google OAuth
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      redirectTo.pathname = "/error";
      return NextResponse.redirect(redirectTo);
    }
  }
  // Handle email OTP / magic link
  else if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (error) {
      redirectTo.pathname = "/error";
      return NextResponse.redirect(redirectTo);
    }
  }
  // Neither code nor OTP — invalid callback
  else {
    redirectTo.pathname = "/error";
    return NextResponse.redirect(redirectTo);
  }

  // Successfully authenticated — now check role and redirect accordingly
const { data: { user } } = await supabase.auth.getUser();

console.log("=== CALLBACK DEBUG ===");
console.log("user:", user?.email, user?.id);

if (user) {
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  console.log("profile:", profile);
  console.log("profileError:", profileError);
  console.log("next param:", next);

    // If user has a specific destination from `next`, honor it
    if (next && next !== "/") {
      redirectTo.pathname = next;
    }
    // Otherwise, admins go to /admin, everyone else goes to /
    else if (profile?.role === "admin") {
      redirectTo.pathname = "/admin";
    } else {
      redirectTo.pathname = "/";
    }

    redirectTo.searchParams.delete("next");
    return NextResponse.redirect(redirectTo);
  }

  redirectTo.pathname = "/";
  return NextResponse.redirect(redirectTo);
}