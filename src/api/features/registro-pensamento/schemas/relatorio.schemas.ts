import { z } from 'zod';

export const relatorioSchema = z
  .object({
    dataInicio: z.string().min(1, 'Informe a data de início'),
    dataFim: z.string().min(1, 'Informe a data de fim'),
  })
  .refine((valores) => new Date(valores.dataInicio) <= new Date(valores.dataFim), {
    message: 'A data de início deve ser anterior ou igual à data de fim',
    path: ['dataFim'],
  });

export type RelatorioSchema = z.infer<typeof relatorioSchema>;
