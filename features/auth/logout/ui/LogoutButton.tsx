'use client';

import { useRouter } from 'next/navigation';
import { useRootStore } from '@/stores/useRootStore';
import { Button } from '@/shared/components';

export const LogoutButton = () => {
  const router = useRouter();
  const { auth } = useRootStore();
  const { logout, isLoading } = auth;

  const handleLogout = async () => {
    await logout();
    router.push('/register');
  };

  return (
    <Button 
      onClick={handleLogout} 
      variant="outline" 
      isLoading={isLoading}
    >
      Выйти
    </Button>
  );
};