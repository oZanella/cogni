import { z } from 'zod';

import { Emocao } from '@/api/shared/enums/emocao';

export const registroPensamentoSchema = z.object({
  situacao: z.string().refine((valor) => valor.length === 0 || valor.length >= 3, 'Mínimo de 3 caracteres'),
  emocoes: z
    .array(
      z.object({
        emocao: z.nativeEnum(Emocao),
        intensidade: z.number().min(0).max(100),
      })
    )
    .min(1, 'Selecione ao menos uma emoção'),
});

export type RegistroPensamentoSchema = z.infer<typeof registroPensamentoSchema>;
