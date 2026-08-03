'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { relatorioSchema, type RelatorioSchema } from '@/api/features/registro-pensamento/schemas/relatorio.schemas';
import { useExportarRelatorioPdf } from '@/web/features/registro-pensamento/data/hooks/use-exportar-relatorio-pdf.mutation';

export function useRelatorio() {
  const form = useForm<RelatorioSchema>({
    resolver: zodResolver(relatorioSchema),
    defaultValues: { dataInicio: '', dataFim: '' },
  });

  const mutation = useExportarRelatorioPdf();

  const gerarRelatorio = form.handleSubmit((valores) => {
    mutation.mutate(valores, {
      onSuccess: () => toast.success('Relatório exportado com sucesso'),
      onError: (error) => toast.error(error.message || 'Não foi possível gerar o relatório'),
    });
  });

  return {
    form,
    gerarRelatorio,
    isPending: mutation.isPending,
  };
}
