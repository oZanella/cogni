import { AcessoExpiradoView } from '@/web/features/auth/ui/acesso-expirado/view/acesso-expirado-view';

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Acesso encerrado — Cogni' };

export default function AcessoExpiradoPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-6 py-12">
      <AcessoExpiradoView />
    </div>
  );
}
