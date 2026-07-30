'use client';

import { useQuery } from '@tanstack/react-query';

import { listarRegistrosPensamento } from '@/api/features/registro-pensamento/actions/listar-registros-pensamento.action';
import { registroPensamentoKeys } from '@/web/features/registro-pensamento/data/registro-pensamento.keys';

export function useRegistrosPensamento(limite?: number) {
  return useQuery({
    queryKey: registroPensamentoKeys.list(limite),
    queryFn: () => listarRegistrosPensamento(limite),
  });
}
