import { z } from 'zod';

import { Emocao } from '@/shared/enums/emocao';

export const registroPensamentoSchema = z.object({
  situacao: z.string().min(3, 'Descreva brevemente a situação'),
  emocoes: z
    .array(
      z.object({
        emocao: z.nativeEnum(Emocao),
        intensidade: z.number().min(0).max(100),
      })
    )
    .min(1, 'Selecione ao menos uma emoção'),
  pensamento: z.string().min(3, 'Escreva o pensamento que veio à sua cabeça'),
});

export type RegistroPensamentoSchema = z.infer<typeof registroPensamentoSchema>;
