import { CadastroView } from '@/web/features/auth/ui/cadastro/view/cadastro-view';

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Criar conta — Cogni' };

export default function CadastroPage() {
  return <CadastroView />;
}
