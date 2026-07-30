import { NovoRegistroView } from '@/web/features/registro-pensamento/ui/novo/view/novo-registro-view';

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Novo registro — Cogni' };

export default function NovoRegistroPage() {
  return <NovoRegistroView />;
}
