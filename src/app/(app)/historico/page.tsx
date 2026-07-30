import { HistoricoView } from '@/features/registro-pensamento/ui/historico/view/historico-view';

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Histórico — Cogni' };

export default function HistoricoPage() {
  return <HistoricoView />;
}
