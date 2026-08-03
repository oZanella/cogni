import { z } from 'zod';

export const loginSchema = z.object({
  nomeUsuario: z.string().min(1, 'Informe seu nome de usuário'),
  senha: z.string().min(1, 'Informe sua senha'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const cadastroSchema = z
  .object({
    nome: z.string().min(2, 'Informe seu nome'),
    nomeUsuario: z
      .string()
      .min(3, 'O nome de usuário deve ter no mínimo 3 caracteres')
      .max(30, 'O nome de usuário deve ter no máximo 30 caracteres')
      .regex(/^[a-zA-Z0-9_.]+$/, 'Use apenas letras, números, ponto e underline'),
    email: z.string().email('E-mail inválido'),
    senha: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha'],
  });

export type CadastroSchema = z.infer<typeof cadastroSchema>;
