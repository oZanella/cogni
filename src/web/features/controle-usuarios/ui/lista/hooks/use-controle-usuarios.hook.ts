'use client';

import toast from 'react-hot-toast';

import { useDefinirAcessoUsuario } from '@/web/features/controle-usuarios/data/hooks/use-definir-acesso-usuario.mutation';
import { useUsuarios } from '@/web/features/controle-usuarios/data/hooks/use-usuarios.query';

export function useControleUsuarios() {
  const { data: usuarios, isLoading } = useUsuarios();
  const mutation = useDefinirAcessoUsuario();

  const definirDiasAcesso = (usuarioId: number, dias: number) => {
    mutation.mutate(
      { usuarioId, dias },
      {
        onSuccess: () => toast.success('Acesso atualizado com sucesso'),
        onError: (error) => toast.error(error.message || 'Não foi possível atualizar o acesso'),
      }
    );
  };

  const removerLimiteAcesso = (usuarioId: number) => {
    mutation.mutate(
      { usuarioId, dias: null },
      {
        onSuccess: () => toast.success('Limite de acesso removido'),
        onError: (error) => toast.error(error.message || 'Não foi possível atualizar o acesso'),
      }
    );
  };

  const usuarioPendente = mutation.isPending ? mutation.variables?.usuarioId : undefined;

  return {
    usuarios: usuarios ?? [],
    isLoading,
    definirDiasAcesso,
    removerLimiteAcesso,
    usuarioPendente,
  };
}
