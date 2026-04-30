import React, { Suspense } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { ProductForm } from "@/features/products";

export const dynamic = "force-dynamic"; // ← ADD THIS

function NewProjectPage() { // ← Remove async, no DB call needed
  return (
    <AdminShell
      heading="Add Project"
      description="Input the field below, after that press Add Project button to save the project."
    >
      <Suspense>
        <ProductForm />
      </Suspense>
    </AdminShell>
  );
}

export default NewProjectPage;