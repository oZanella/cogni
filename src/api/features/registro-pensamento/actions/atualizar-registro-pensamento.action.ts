'use server';

import {
  registroPensamentoSchema,
  type RegistroPensamentoSchema,
} from '@/api/features/registro-pensamento/schemas/registro-pensamento.schemas';
import { auth } from '@/api/lib/auth';
import { prisma } from '@/api/lib/prisma';

export async function atualizarRegistroPensamento(id: number, input: RegistroPensamentoSchema) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autenticado');

  const dados = registroPensamentoSchema.parse(input);

  const registro = await prisma.registroPensamento.findFirst({
    where: { id, usuarioId: Number(session.user.id) },
    select: { id: true },
  });
  if (!registro) throw new Error('Registro não encontrado');

  await prisma.$transaction([
    prisma.registroPensamentoEmocao.deleteMany({ where: { registroPensamentoId: id } }),
    prisma.registroPensamento.update({
      where: { id },
      data: {
        situacao: dados.situacao,
        emocoes: {
          create: dados.emocoes.map((item) => ({
            emocao: item.emocao,
            intensidade: item.intensidade,
          })),
        },
      },
    }),
  ]);
}
