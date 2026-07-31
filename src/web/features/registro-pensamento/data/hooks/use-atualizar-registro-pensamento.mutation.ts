'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { atualizarRegistroPensamento } from '@/api/features/registro-pensamento/actions/atualizar-registro-pensamento.action';
import type { RegistroPensamentoSchema } from '@/api/features/registro-pensamento/schemas/registro-pensamento.schemas';
import { registroPensamentoKeys } from '@/web/features/registro-pensamento/data/registro-pensamento.keys';

export function useAtualizarRegistroPensamento(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegistroPensamentoSchema) => atualizarRegistroPensamento(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: registroPensamentoKeys.all });
    },
  });
}
