import { LoginView } from '@/web/features/auth/ui/login/view/login-view';

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Entrar — Cogni' };

export default function EntrarPage() {
  return <LoginView />;
}
