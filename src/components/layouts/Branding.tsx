import { cn } from "@/lib/utils";
import Link from "next/link";

function Branding({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 no-underline", className)}
    >
      <span className="text-2xl">🎮</span>
      <span className="text-xl font-black tracking-tight">هيبة ستور</span>
    </Link>
  );
}

export default Branding;