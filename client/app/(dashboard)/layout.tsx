"use client";
import { getCurrentUser } from "@/lib/service/auth.service";
import { useUserStore } from "@/store/use-user-store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUser();
        if (!user.data) {
          router.replace("/auth/signin");
        } else {
          setUser(user.data);
        }
      } catch (error) {
        router.replace("/auth/signin");
      }
    }

    fetchUser();
  }, []);
  return <div>{children}</div>;
}
