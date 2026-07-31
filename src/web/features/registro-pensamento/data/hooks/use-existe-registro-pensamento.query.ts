'use client';

import { useQuery } from '@tanstack/react-query';

import { existeRegistroPensamento } from '@/api/features/registro-pensamento/actions/existe-registro-pensamento.action';
import { registroPensamentoKeys } from '@/web/features/registro-pensamento/data/registro-pensamento.keys';

export function useExisteRegistroPensamento() {
  return useQuery({
    queryKey: registroPensamentoKeys.existe(),
    queryFn: () => existeRegistroPensamento(),
  });
}
