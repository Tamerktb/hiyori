import { AdminUserNav } from "@/features/users/components/AdminUserNav";
import { UsersColumns } from "@/features/users/components/UsersColumns";
import AdminShell from "@/components/admin/AdminShell";
import { ProductsDataTable } from "@/features/products";
import ErrorToaster from "@/components/layouts/ErrorToaster";
import { createClient } from "@/lib/supabase/server";

type AdminUsersPageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

async function UsersPage({ searchParams }: AdminUsersPageProps) {
  const supabase = await createClient();
  const { data: { users }, error } = await supabase.auth.admin.listUsers();

  return (
    <AdminShell heading="Users" description="Edit/Create new user by admin.">
      <AdminUserNav />
      <ProductsDataTable columns={UsersColumns} data={users || []} />
      <ErrorToaster />
    </AdminShell>
  );
}

export default UsersPage;