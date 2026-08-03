'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  registroPensamentoSchema,
  type RegistroPensamentoSchema,
} from '@/api/features/registro-pensamento/schemas/registro-pensamento.schemas';
import { useAtualizarRegistroPensamento } from '@/web/features/registro-pensamento/data/hooks/use-atualizar-registro-pensamento.mutation';
import { useRegistroPensamento } from '@/web/features/registro-pensamento/data/hooks/use-registro-pensamento.query';

const ETAPAS = [
  { titulo: 'Situação', campos: ['situacao'] },
  { titulo: 'Emoções', campos: ['emocoes'] },
] as const satisfies { titulo: string; campos: (keyof RegistroPensamentoSchema)[] }[];

export function useDetalheRegistro(id: number) {
  const router = useRouter();
  const { data: registro, isLoading } = useRegistroPensamento(id);
  const mutation = useAtualizarRegistroPensamento(id);
  const [redirecionando, setRedirecionando] = useState(false);
  const [etapa, setEtapa] = useState(0);

  const form = useForm<RegistroPensamentoSchema>({
    resolver: zodResolver(registroPensamentoSchema),
    defaultValues: { situacao: '', emocoes: [] },
  });

  useEffect(() => {
    if (!registro) return;
    form.reset({
      situacao: registro.situacao,
      emocoes: registro.emocoes,
    });
  }, [registro, form]);

  const ehUltimaEtapa = etapa === ETAPAS.length - 1;

  const avancar = async () => {
    const valido = await form.trigger(ETAPAS[etapa].campos);
    if (!valido) {
      if ((ETAPAS[etapa].campos as readonly string[]).includes('emocoes')) {
        toast.error('Selecione um sentimento');
      }
      return;
    }

    if (!ehUltimaEtapa) {
      setEtapa((atual) => atual + 1);
      return;
    }

    form.handleSubmit((data) => {
      mutation.mutate(data, {
        onSuccess: () => {
          setRedirecionando(true);
          toast.success('Registro atualizado com sucesso');
          router.push('/historico');
        },
        onError: (error) => toast.error(error.message || 'Não foi possível salvar as alterações'),
      });
    })();
  };

  const voltar = () => setEtapa((atual) => Math.max(0, atual - 1));

  return {
    form,
    etapa,
    etapas: ETAPAS,
    avancar,
    voltar,
    ehUltimaEtapa,
    ehPrimeiraEtapa: etapa === 0,
    isLoading,
    naoEncontrado: !isLoading && !registro,
    isPending: mutation.isPending || redirecionando,
  };
}
