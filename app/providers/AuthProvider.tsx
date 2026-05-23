
'use client';

import { FC, useEffect, useState } from 'react';
import { useRootStore } from '@/stores/useRootStore';

type TProps = {
    children:  React.ReactNode
}


export const AuthProvider:FC<TProps> = ({ children }) => {
  const { auth } = useRootStore();
  const { checkAuth, isLoading } = auth;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsReady(true);
    };
    initAuth();
  }, [checkAuth]);

  if (!isReady && isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Загрузка...
      </div>
    );
  }

  return <>{children}</>;
}