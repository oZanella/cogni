'use client';

import { useMutation } from '@tanstack/react-query';
import { parse } from 'date-fns';

import { listarRegistrosPensamentoPeriodo } from '@/api/features/registro-pensamento/actions/listar-registros-pensamento-periodo.action';
import type { RelatorioSchema } from '@/api/features/registro-pensamento/schemas/relatorio.schemas';

async function gerarEBaixarPdf({ dataInicio, dataFim }: RelatorioSchema) {
  const registros = await listarRegistrosPensamentoPeriodo(
    parse(dataInicio, 'yyyy-MM-dd', new Date()),
    parse(dataFim, 'yyyy-MM-dd', new Date())
  );

  if (registros.length === 0) {
    throw new Error('Nenhum pensamento registrado nesse período');
  }

  const [{ pdf }, { RelatorioDocumento }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('@/web/features/registro-pensamento/ui/relatorio/relatorio-documento'),
  ]);

  const blob = await pdf(
    <RelatorioDocumento registros={registros} dataInicio={dataInicio} dataFim={dataFim} />
  ).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `relatorio-pensametos-Cogni.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}

export function useExportarRelatorioPdf() {
  return useMutation({ mutationFn: gerarEBaixarPdf });
}
