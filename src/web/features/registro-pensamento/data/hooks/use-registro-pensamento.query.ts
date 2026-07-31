'use client';

import { useQuery } from '@tanstack/react-query';

import { buscarRegistroPensamento } from '@/api/features/registro-pensamento/actions/buscar-registro-pensamento.action';
import { registroPensamentoKeys } from '@/web/features/registro-pensamento/data/registro-pensamento.keys';

export function useRegistroPensamento(id: number) {
  return useQuery({
    queryKey: registroPensamentoKeys.detail(id),
    queryFn: () => buscarRegistroPensamento(id),
  });
}
