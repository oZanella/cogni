'use server';

import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { cadastroSchema, type CadastroSchema } from '@/api/features/auth/schemas/auth.schemas';
import { prisma } from '@/api/lib/prisma';

export async function cadastrarUsuario(input: CadastroSchema) {
  const dados = cadastroSchema.parse(input);

  const email = dados.email.trim().toLowerCase();
  const nomeUsuario = dados.nomeUsuario.trim().toLowerCase();

  const usuarioExistente = await prisma.usuario.findFirst({
    where: { OR: [{ email }, { nomeUsuario }] },
  });
  if (usuarioExistente) {
    throw new Error(
      usuarioExistente.email === email ? 'Este e-mail já está cadastrado' : 'Este nome de usuário já está em uso'
    );
  }

  const senhaHash = await bcrypt.hash(dados.senha, 10);

  try {
    await prisma.usuario.create({
      data: { nome: dados.nome, nomeUsuario, email, senha: senhaHash },
    });
  } catch (error) {
    // corrida entre cadastros simultâneos com o mesmo e-mail/usuário: o findFirst acima
    // não pega, mas a constraint única do banco garante que nunca fica duplicado
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      const campo = (error.meta?.target as string[] | undefined)?.[0];
      throw new Error(
        campo === 'nomeUsuario' ? 'Este nome de usuário já está em uso' : 'Este e-mail já está cadastrado'
      );
    }
    throw error;
  }
}
