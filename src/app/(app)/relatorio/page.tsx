import { RelatorioView } from '@/web/features/registro-pensamento/ui/relatorio/view/relatorio-view';

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Relatório — Cogni' };

export default function RelatorioPage() {
  return <RelatorioView />;
}
