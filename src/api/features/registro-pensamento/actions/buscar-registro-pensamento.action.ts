'use server';

import type { RegistroPensamento } from '@/api/features/registro-pensamento/types/registro-pensamento.types';
import { auth } from '@/api/lib/auth';
import { prisma } from '@/api/lib/prisma';

export async function buscarRegistroPensamento(id: number): Promise<RegistroPensamento | null> {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autenticado');

  return prisma.registroPensamento.findFirst({
    where: { id, usuarioId: Number(session.user.id) },
    select: {
      id: true,
      situacao: true,
      pensamento: true,
      createdAt: true,
      emocoes: { select: { emocao: true, intensidade: true } },
    },
  });
}
