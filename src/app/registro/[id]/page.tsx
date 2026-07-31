import { notFound } from 'next/navigation';

import { DetalheRegistroView } from '@/web/features/registro-pensamento/ui/detalhe/view/detalhe-registro-view';

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Seu registro — Cogni' };

export default async function RegistroDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const registroId = Number(id);
  if (!Number.isInteger(registroId)) notFound();

  return <DetalheRegistroView id={registroId} />;
}
