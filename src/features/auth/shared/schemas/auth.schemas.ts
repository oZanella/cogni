import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(1, 'Informe sua senha'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const cadastroSchema = z
  .object({
    nome: z.string().min(2, 'Informe seu nome'),
    email: z.string().email('E-mail inválido'),
    senha: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha'],
  });

export type CadastroSchema = z.infer<typeof cadastroSchema>;
