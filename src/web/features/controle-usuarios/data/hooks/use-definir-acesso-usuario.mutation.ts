'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { definirAcessoUsuario } from '@/api/features/controle-usuarios/actions/definir-acesso-usuario.action';
import type { DefinirAcessoUsuarioSchema } from '@/api/features/controle-usuarios/schemas/controle-usuarios.schemas';
import { controleUsuariosKeys } from '@/web/features/controle-usuarios/data/controle-usuarios.keys';

export function useDefinirAcessoUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DefinirAcessoUsuarioSchema) => definirAcessoUsuario(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: controleUsuariosKeys.all });
    },
  });
}
