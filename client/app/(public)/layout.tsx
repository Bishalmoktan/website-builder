"use client";

import { isAuthenticated } from "@/lib/service/auth.service";
import { useUserStore } from "@/store/use-user-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    async function checkUserStatus() {
      const user = await isAuthenticated();
      if (user) {
        router.replace("/dashboard");
      }
    }

    checkUserStatus();
  }, []);
  return <div>{children}</div>;
}
