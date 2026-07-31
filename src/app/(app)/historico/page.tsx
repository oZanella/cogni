import { redirect } from 'next/navigation';

import { existeRegistroPensamento } from '@/api/features/registro-pensamento/actions/existe-registro-pensamento.action';
import { HistoricoView } from '@/web/features/registro-pensamento/ui/historico/view/historico-view';

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Histórico — Cogni' };

export default async function HistoricoPage() {
  const temRegistro = await existeRegistroPensamento();
  if (!temRegistro) redirect('/inicio');

  return <HistoricoView />;
}
