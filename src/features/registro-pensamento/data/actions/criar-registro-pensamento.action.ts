'use server';

import {
  registroPensamentoSchema,
  type RegistroPensamentoSchema,
} from '@/features/registro-pensamento/shared/schemas/registro-pensamento.schemas';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function criarRegistroPensamento(input: RegistroPensamentoSchema) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autenticado');

  const dados = registroPensamentoSchema.parse(input);

  await prisma.registroPensamento.create({
    data: {
      usuarioId: Number(session.user.id),
      situacao: dados.situacao,
      pensamento: dados.pensamento,
      emocoes: {
        create: dados.emocoes.map((item) => ({
          emocao: item.emocao,
          intensidade: item.intensidade,
        })),
      },
    },
  });
}
