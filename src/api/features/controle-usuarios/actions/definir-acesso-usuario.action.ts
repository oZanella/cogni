'use server';

import {
  definirAcessoUsuarioSchema,
  type DefinirAcessoUsuarioSchema,
} from '@/api/features/controle-usuarios/schemas/controle-usuarios.schemas';
import { auth } from '@/api/lib/auth';
import { prisma } from '@/api/lib/prisma';
import { PapelUsuario } from '@/api/shared/enums/papel-usuario';

const MILISSEGUNDOS_POR_DIA = 24 * 60 * 60 * 1000;

export async function definirAcessoUsuario(input: DefinirAcessoUsuarioSchema) {
  const session = await auth();
  if (session?.user?.papel !== PapelUsuario.ADMIN) throw new Error('Acesso restrito a administradores');

  const dados = definirAcessoUsuarioSchema.parse(input);

  const acessoExpiraEm = dados.dias === null ? null : new Date(Date.now() + dados.dias * MILISSEGUNDOS_POR_DIA);

  await prisma.usuario.update({
    where: { id: dados.usuarioId },
    data: { acessoExpiraEm },
  });
}
