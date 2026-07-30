'use client';

import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

export function useLogout() {
  const mutation = useMutation({
    mutationFn: () => signOut({ callbackUrl: '/entrar' }),
  });

  return { logout: () => mutation.mutate(), isPending: mutation.isPending };
}
