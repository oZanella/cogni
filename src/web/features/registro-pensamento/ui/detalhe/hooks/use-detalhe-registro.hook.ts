'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  registroPensamentoSchema,
  type RegistroPensamentoSchema,
} from '@/api/features/registro-pensamento/schemas/registro-pensamento.schemas';
import { useAtualizarRegistroPensamento } from '@/web/features/registro-pensamento/data/hooks/use-atualizar-registro-pensamento.mutation';
import { useRegistroPensamento } from '@/web/features/registro-pensamento/data/hooks/use-registro-pensamento.query';

export function useDetalheRegistro(id: number) {
  const router = useRouter();
  const { data: registro, isLoading } = useRegistroPensamento(id);
  const mutation = useAtualizarRegistroPensamento(id);

  const form = useForm<RegistroPensamentoSchema>({
    resolver: zodResolver(registroPensamentoSchema),
    defaultValues: { situacao: '', emocoes: [], pensamento: '' },
  });

  useEffect(() => {
    if (!registro) return;
    form.reset({
      situacao: registro.situacao,
      pensamento: registro.pensamento,
      emocoes: registro.emocoes,
    });
  }, [registro, form]);

  const salvar = form.handleSubmit((data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success('Registro atualizado com sucesso');
        router.push('/historico');
      },
      onError: (error) => toast.error(error.message || 'Não foi possível salvar as alterações'),
    });
  });

  return {
    form,
    isLoading,
    naoEncontrado: !isLoading && !registro,
    salvar,
    isPending: mutation.isPending,
  };
}
