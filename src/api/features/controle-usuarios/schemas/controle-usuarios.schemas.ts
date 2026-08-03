import { z } from 'zod';

export const definirAcessoUsuarioSchema = z.object({
  usuarioId: z.number().int().positive(),
  dias: z.number().int().positive().nullable(),
});

export type DefinirAcessoUsuarioSchema = z.infer<typeof definirAcessoUsuarioSchema>;
