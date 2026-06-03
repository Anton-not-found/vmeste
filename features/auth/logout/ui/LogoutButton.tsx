"use client";

import { useRouter } from "next/navigation";
import { useRootStore } from "@/stores/useRootStore";
import { Button } from "antd";

export const LogoutButton = () => {
  const router = useRouter();
  const { auth } = useRootStore();
  const { logout, isLoading } = auth;

  const handleLogout = async () => {
    await logout();
    router.push("/register");
  };

  return (
    <Button color="primary" variant="filled" onClick={handleLogout} loading={isLoading}>
      Выйти
    </Button>
  );
};
