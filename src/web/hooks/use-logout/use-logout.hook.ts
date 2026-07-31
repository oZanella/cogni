'use client';

import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

import { CHAVE_LOGIN_TIMESTAMP } from '@/web/hooks/use-transformacao-borboleta/use-transformacao-borboleta.hook';

export function useLogout() {
  const mutation = useMutation({
    mutationFn: () => {
      localStorage.removeItem(CHAVE_LOGIN_TIMESTAMP);
      return signOut({ callbackUrl: '/entrar' });
    },
  });

  return { logout: () => mutation.mutate(), isPending: mutation.isPending };
}
