'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useCriarRegistroPensamento } from '@/features/registro-pensamento/data/hooks/use-criar-registro-pensamento.mutation';
import {
  registroPensamentoSchema,
  type RegistroPensamentoSchema,
} from '@/features/registro-pensamento/shared/schemas/registro-pensamento.schemas';

const ETAPAS = [
  { titulo: 'Situação', campos: ['situacao'] },
  { titulo: 'Emoções', campos: ['emocoes'] },
  { titulo: 'Pensamento', campos: ['pensamento'] },
] as const satisfies { titulo: string; campos: (keyof RegistroPensamentoSchema)[] }[];

export function useRegistroWizard() {
  const router = useRouter();
  const [etapa, setEtapa] = useState(0);

  const form = useForm<RegistroPensamentoSchema>({
    resolver: zodResolver(registroPensamentoSchema),
    defaultValues: { situacao: '', emocoes: [], pensamento: '' },
  });

  const mutation = useCriarRegistroPensamento();

  const ehUltimaEtapa = etapa === ETAPAS.length - 1;

  const avancar = async () => {
    const valido = await form.trigger(ETAPAS[etapa].campos);
    if (!valido) return;

    if (!ehUltimaEtapa) {
      setEtapa((atual) => atual + 1);
      return;
    }

    form.handleSubmit((data) => {
      mutation.mutate(data, {
        onSuccess: () => {
          toast.success('Registro salvo com sucesso');
          router.push('/historico');
        },
        onError: () => toast.error('Não foi possível salvar seu registro'),
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
    isPending: mutation.isPending,
  };
}
