'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  registroPensamentoSchema,
  type RegistroPensamentoSchema,
} from '@/api/features/registro-pensamento/schemas/registro-pensamento.schemas';
import { useCriarRegistroPensamento } from '@/web/features/registro-pensamento/data/hooks/use-criar-registro-pensamento.mutation';

const ETAPAS_TODAS = [
  { titulo: 'Situação', campos: ['situacao'] },
  { titulo: 'Emoções', campos: ['emocoes'] },
] as const satisfies { titulo: string; campos: (keyof RegistroPensamentoSchema)[] }[];

export function useRegistroWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const semDescricao = searchParams.get('semDescricao') === '1';
  const etapas = semDescricao ? ETAPAS_TODAS.slice(1) : ETAPAS_TODAS;

  const [etapa, setEtapa] = useState(0);
  const [redirecionando, setRedirecionando] = useState(false);

  const form = useForm<RegistroPensamentoSchema>({
    resolver: zodResolver(registroPensamentoSchema),
    defaultValues: { situacao: '', emocoes: [] },
  });

  const mutation = useCriarRegistroPensamento();

  const ehUltimaEtapa = etapa === etapas.length - 1;

  const avancar = async () => {
    const valido = await form.trigger(etapas[etapa].campos);
    if (!valido) return;

    if (!ehUltimaEtapa) {
      setEtapa((atual) => atual + 1);
      return;
    }

    form.handleSubmit((data) => {
      mutation.mutate(data, {
        onSuccess: () => {
          setRedirecionando(true);
          toast.success('Registro salvo com sucesso');
          router.push('/historico');
        },
        onError: (error) => toast.error(error.message || 'Não foi possível salvar seu registro'),
      });
    })();
  };

  const voltar = () => setEtapa((atual) => Math.max(0, atual - 1));

  return {
    form,
    etapa,
    etapas,
    semDescricao,
    avancar,
    voltar,
    ehUltimaEtapa,
    ehPrimeiraEtapa: etapa === 0,
    isPending: mutation.isPending || redirecionando,
  };
}
