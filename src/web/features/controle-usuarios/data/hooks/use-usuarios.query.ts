'use client';

import { useQuery } from '@tanstack/react-query';

import { listarUsuarios } from '@/api/features/controle-usuarios/actions/listar-usuarios.action';
import { controleUsuariosKeys } from '@/web/features/controle-usuarios/data/controle-usuarios.keys';

export function useUsuarios() {
  return useQuery({
    queryKey: controleUsuariosKeys.list(),
    queryFn: () => listarUsuarios(),
  });
}
