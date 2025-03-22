"use client";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define which routes do NOT require authentication
const PUBLIC_ROUTES = ["/", "/login"];

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (loading) return;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    if (!isAuthenticated && !isPublicRoute) {
      router.replace("/login");
      setCanRender(false);
    } else {
      setCanRender(true);
    }
  }, [isAuthenticated, loading, pathname, router]);

  if (loading || !canRender) return null;

  return <>{children}</>;
};
