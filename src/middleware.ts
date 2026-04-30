import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/env.mjs";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh the auth cookie. CRITICAL — without this, sessions don't survive page navigation.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    // Run on every page except static assets, image files, and API routes.
    "/((?!_next/static|_next/image|favicon.ico|apps/.*\\.(?:jpg|jpeg|png|svg|webp|gif)$).*)",
  ],
};