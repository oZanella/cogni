'use server';

import { auth } from '@/api/lib/auth';
import { prisma } from '@/api/lib/prisma';

export async function existeRegistroPensamento(): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autenticado');

  const registro = await prisma.registroPensamento.findFirst({
    where: { usuarioId: Number(session.user.id) },
    select: { id: true },
  });

  return registro !== null;
}
