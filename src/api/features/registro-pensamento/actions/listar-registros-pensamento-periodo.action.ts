'use server';

import { endOfDay, startOfDay } from 'date-fns';

import type { RegistroPensamento } from '@/api/features/registro-pensamento/types/registro-pensamento.types';
import { auth } from '@/api/lib/auth';
import { prisma } from '@/api/lib/prisma';

export async function listarRegistrosPensamentoPeriodo(dataInicio: Date, dataFim: Date): Promise<RegistroPensamento[]> {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autenticado');
  if (dataInicio > dataFim) throw new Error('A data de início deve ser anterior ou igual à data de fim');

  return prisma.registroPensamento.findMany({
    where: {
      usuarioId: Number(session.user.id),
      createdAt: { gte: startOfDay(dataInicio), lte: endOfDay(dataFim) },
    },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      situacao: true,
      createdAt: true,
      emocoes: { select: { emocao: true, intensidade: true } },
    },
  });
}
