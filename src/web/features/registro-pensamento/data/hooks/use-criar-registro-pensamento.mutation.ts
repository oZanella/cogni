'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { criarRegistroPensamento } from '@/api/features/registro-pensamento/actions/criar-registro-pensamento.action';
import type { RegistroPensamentoSchema } from '@/api/features/registro-pensamento/schemas/registro-pensamento.schemas';
import { registroPensamentoKeys } from '@/web/features/registro-pensamento/data/registro-pensamento.keys';

export function useCriarRegistroPensamento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegistroPensamentoSchema) => criarRegistroPensamento(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: registroPensamentoKeys.all });
    },
  });
}
