import { SidebarNav } from "@/components/admin/SidebarNav";
import { ScrollArea } from "@/components/ui/scrollArea";
import { dashboardConfig } from "@/config/dashboard";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const cookieStore = await cookies();
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/sign-in");
  }

  return (
    <div className="mx-auto px- max-w- pt- flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr) 240px_minmax(0,1fr)] lg:gap-10 bg-white">
      <aside className="fixed top-14 z-30 -ml-2 hidden h- w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <ScrollArea className="py-6 pr-6 lg:py-8">
          <SidebarNav items={dashboardConfig.sidebarNav} />
        </ScrollArea>
      </aside>
      <main className="flex w-full flex-col overflow-hidden pt- ">
        {children}
      </main>
    </div>
  );
}