'use server';

import type { UsuarioAdmin } from '@/api/features/controle-usuarios/types/controle-usuarios.types';
import { auth } from '@/api/lib/auth';
import { prisma } from '@/api/lib/prisma';
import { PapelUsuario } from '@/api/shared/enums/papel-usuario';

export async function listarUsuarios(): Promise<UsuarioAdmin[]> {
  const session = await auth();
  if (session?.user?.papel !== PapelUsuario.ADMIN) throw new Error('Acesso restrito a administradores');

  return prisma.usuario.findMany({
    orderBy: { nome: 'asc' },
    select: {
      id: true,
      nome: true,
      nomeUsuario: true,
      email: true,
      papel: true,
      acessoExpiraEm: true,
      createdAt: true,
    },
  });
}
