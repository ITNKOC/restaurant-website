"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthCheckProps {
  children: ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      // Check if user is logged in
      const isAdminLoggedIn =
        localStorage.getItem("isAdminLoggedIn") === "true";

      if (!isAdminLoggedIn) {
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
      }

      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : null;
}
