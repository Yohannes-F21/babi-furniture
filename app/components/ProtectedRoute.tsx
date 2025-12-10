// components/ProtectedRoute.tsx
"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RootState } from "../store/store";
import { ThreeDot } from "react-loading-indicators";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoggedOut, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || isLoggedOut)) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoggedOut, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        {/* <div className="text-xl">Checking session...</div> */}
        <ThreeDot
          color="#d97706"
          size="large"
          text="Checking session"
          textColor=""
        />
      </div>
    );
  }

  if (!isAuthenticated || isLoggedOut) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        {/* <div className="text-xl">Redirecting to login...</div> */}
        <ThreeDot
          color="#d97706"
          size="large"
          text="Redirecting to login"
          textColor=""
        />
      </div>
    );
  }

  return <>{children}</>;
}
