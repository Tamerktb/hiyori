"use client";
import { useMemo } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { User } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "@urql/next";
import CartLink from "./CartLink";
import { FetchCartQuery } from "./UserCartSection";
import useCartStore, { calcProductCountStorage } from "../useCartStore";

function CartNav() {
  const { user } = useAuth();
  return <>{!user ? <GuestCart /> : <UserCartNav currentUser={user} />}</>;
}

const GuestCart = () => {
  const cart = useCartStore((s) => s.cart);
  const productCountStorage = useMemo(() => calcProductCountStorage(cart), );
  return <CartLink productCount={productCountStorage} />;
};

const UserCartNav = ({ currentUser }: { currentUser: User }) => {
  const { data, fetching, error } = useQuery({
    query: FetchCartQuery,
    variables: { userId: currentUser.id },
  });

  const carts = data?.cartsCollection;

  const productCount = useMemo(() => {
    if (!carts?.edges) return 0;
    return carts.edges.reduce((acc: number, cur: any) => acc + (cur.node.quantity || 0), 0);
  }, );

  if (error || fetching || !carts) {
    return <CartLink productCount={0} />;
  }

  return <CartLink productCount={productCount} />;
};

export default CartNav;