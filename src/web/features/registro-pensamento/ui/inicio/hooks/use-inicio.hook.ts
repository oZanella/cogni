'use client';

import { useSession } from 'next-auth/react';

import { useRegistrosPensamento } from '@/web/features/registro-pensamento/data/hooks/use-registros-pensamento.query';

const LIMITE_RECENTES = 5;

export function useInicio() {
  const { data: session } = useSession();
  const { data: registros, isLoading } = useRegistrosPensamento(LIMITE_RECENTES);

  return {
    nome: session?.user?.name?.split(' ')[0],
    registros: registros ?? [],
    isLoading,
  };
}
