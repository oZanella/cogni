'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { criarRegistroPensamento } from '@/features/registro-pensamento/data/actions/criar-registro-pensamento.action';
import { registroPensamentoKeys } from '@/features/registro-pensamento/data/registro-pensamento.keys';
import type { RegistroPensamentoSchema } from '@/features/registro-pensamento/shared/schemas/registro-pensamento.schemas';

export function useCriarRegistroPensamento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegistroPensamentoSchema) => criarRegistroPensamento(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: registroPensamentoKeys.all });
    },
  });
}
