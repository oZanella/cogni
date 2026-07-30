import { InicioView } from '@/web/features/registro-pensamento/ui/inicio/view/inicio-view';

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Início — Cogni' };

export default function InicioPage() {
  return <InicioView />;
}
