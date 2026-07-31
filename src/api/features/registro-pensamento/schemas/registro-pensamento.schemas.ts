import { z } from 'zod';

import { Emocao } from '@/api/shared/enums/emocao';

export const registroPensamentoSchema = z.object({
  situacao: z.string().min(3, 'Descrição deve ter no mínimo 3 caracteres'),
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
