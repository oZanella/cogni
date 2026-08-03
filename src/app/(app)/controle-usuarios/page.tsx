import { redirect } from 'next/navigation';

import { auth } from '@/api/lib/auth';
import { PapelUsuario } from '@/api/shared/enums/papel-usuario';
import { ControleUsuariosView } from '@/web/features/controle-usuarios/ui/lista/view/controle-usuarios-view';

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Controle de usuários — Cogni' };

export default async function ControleUsuariosPage() {
  const session = await auth();
  if (session?.user?.papel !== PapelUsuario.ADMIN) redirect('/inicio');

  return <ControleUsuariosView />;
}
