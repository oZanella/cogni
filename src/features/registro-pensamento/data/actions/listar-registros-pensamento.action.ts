'use server';

import type { RegistroPensamento } from '@/features/registro-pensamento/shared/types/registro-pensamento.types';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function listarRegistrosPensamento(limite?: number): Promise<RegistroPensamento[]> {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autenticado');

  return prisma.registroPensamento.findMany({
    where: { usuarioId: Number(session.user.id) },
    orderBy: { createdAt: 'desc' },
    take: limite,
    select: {
      id: true,
      situacao: true,
      pensamento: true,
      createdAt: true,
      emocoes: { select: { emocao: true, intensidade: true } },
    },
  });
}
