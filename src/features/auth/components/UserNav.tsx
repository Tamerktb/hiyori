"use client";

import { Icons } from "@/components/layouts/icons";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import supabaseClient from "@/lib/supabase/client";
import { getNameInitials } from "@/lib/utils";
import { useRouter } from "next/navigation";

function UserNav() {
  const router = useRouter();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  // ← THIS is the fix: check profiles.role instead of app_metadata.isAdmin
  useEffect(() => {
    if (!user) return;
    supabaseClient
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        setIsAdmin(data?.role === "admin");
      });
  }, [user]);

  const logout = async () => {
    await supabaseClient.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full focus:ring-0 border-0">
              <Avatar className="h-8 w-8 focus:ring-0 border-0">
                <AvatarImage
                  src="/avatars/01.png"
                  alt={getNameInitials((user.user_metadata.name as string) ?? "User")}
                />
                <AvatarFallback>
                  {getNameInitials((user.user_metadata.name as string) ?? "User")}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.user_metadata.name || user.email?.split("@")[0] || "User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
                {isAdmin && (
                  <span className="text-xs font-semibold text-orange-500 mt-1">
                    ⚡ Admin
                  </span>
                )}
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link href="/orders">
                <DropdownMenuItem>Orders</DropdownMenuItem>
              </Link>
              <Link href="/wish-list">
                <DropdownMenuItem>Wishlist</DropdownMenuItem>
              </Link>
              <Link href="/cart">
                <DropdownMenuItem>Cart</DropdownMenuItem>
              </Link>
              <Link href="/setting">
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/admin">
                    <DropdownMenuItem className="text-orange-500 font-semibold">
                      🎮 Admin Panel
                      <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/admin/products">
                    <DropdownMenuItem className="text-orange-400">
                      📦 Manage Products
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-500">
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/sign-in" className="flex items-center text-foreground">
          <Icons.user className="h-4 w-4 mr-3" />
          <p className="text-sm">Sign in</p>
        </Link>
      )}
    </>
  );
}

export default UserNav;