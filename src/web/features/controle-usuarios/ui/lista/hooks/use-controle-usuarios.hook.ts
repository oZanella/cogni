'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

import { useDefinirAcessoUsuario } from '@/web/features/controle-usuarios/data/hooks/use-definir-acesso-usuario.mutation';
import { useUsuarios } from '@/web/features/controle-usuarios/data/hooks/use-usuarios.query';

const TAMANHO_PAGINA = 10;

export function useControleUsuarios() {
  const { data: usuarios, isLoading } = useUsuarios();
  const mutation = useDefinirAcessoUsuario();
  const [busca, setBusca] = useState('');
  const [pagina, setPagina] = useState(1);

  const lista = usuarios ?? [];
  const buscaNormalizada = busca.trim().toLowerCase();
  const listaFiltrada = buscaNormalizada
    ? lista.filter(
        (usuario) =>
          usuario.nome.toLowerCase().includes(buscaNormalizada) ||
          usuario.nomeUsuario.toLowerCase().includes(buscaNormalizada) ||
          usuario.email.toLowerCase().includes(buscaNormalizada)
      )
    : lista;

  const totalPaginas = Math.max(1, Math.ceil(listaFiltrada.length / TAMANHO_PAGINA));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const usuariosPaginados = listaFiltrada.slice((paginaAtual - 1) * TAMANHO_PAGINA, paginaAtual * TAMANHO_PAGINA);

  const alterarBusca = (valor: string) => {
    setBusca(valor);
    setPagina(1);
  };

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
        onSuccess: () => toast.success('Acesso ilimitado definido'),
        onError: (error) => toast.error(error.message || 'Não foi possível atualizar o acesso'),
      }
    );
  };

  const usuarioPendente = mutation.isPending ? mutation.variables?.usuarioId : undefined;

  return {
    usuariosPaginados,
    isLoading,
    definirDiasAcesso,
    removerLimiteAcesso,
    usuarioPendente,
    busca,
    alterarBusca,
    pagina: paginaAtual,
    totalPaginas,
    proximaPagina: () => setPagina((atual) => Math.min(totalPaginas, atual + 1)),
    paginaAnterior: () => setPagina((atual) => Math.max(1, atual - 1)),
  };
}
