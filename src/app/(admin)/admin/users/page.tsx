import { AdminUserNav } from "@/features/users/components/AdminUserNav";
import { UsersColumns } from "@/features/users/components/UsersColumns";
// listUsers is not used or doesn't exist - remove it
import AdminShell from "@/components/admin/AdminShell";
import { ProductsDataTable } from "@/features/products";
import ErrorToaster from "@/components/layouts/ErrorToaster";
// TODO: CREATE New Data Table for golbaluse

type AdminUsersPageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

async function UsersPage({ searchParams }: AdminUsersPageProps) {
  const currentUser = await getCurrentUser();

  const users = await listUsers({});

  return (
    <AdminShell heading="Users" description="Edit/Create new user by admin.">
      <AdminUserNav />
      <ProductsDataTable columns={UsersColumns} data={users || []} />
      <ErrorToaster />
    </AdminShell>
  );
}

export default UsersPage;
