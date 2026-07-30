'use server';

import bcrypt from 'bcryptjs';

import { cadastroSchema, type CadastroSchema } from '@/api/features/auth/schemas/auth.schemas';
import { prisma } from '@/api/lib/prisma';

export async function cadastrarUsuario(input: CadastroSchema) {
  const dados = cadastroSchema.parse(input);

  const usuarioExistente = await prisma.usuario.findUnique({ where: { email: dados.email } });
  if (usuarioExistente) {
    throw new Error('Este e-mail já está cadastrado');
  }

  const senhaHash = await bcrypt.hash(dados.senha, 10);

  await prisma.usuario.create({
    data: { nome: dados.nome, email: dados.email, senha: senhaHash },
  });
}
