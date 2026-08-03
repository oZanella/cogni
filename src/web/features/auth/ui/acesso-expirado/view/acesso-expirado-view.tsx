'use client';

import { LogOut, Mail } from 'lucide-react';

import { Button } from '@/web/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/web/components/ui/card';
import { useLogout } from '@/web/hooks/use-logout/use-logout.hook';

const EMAIL_SUPORTE = 'cogni@gmail.com.br';

export function AcessoExpiradoView() {
  const { logout, isPending } = useLogout();

  return (
    <Card className="w-full max-w-sm border-none shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-medium">Acesso encerrado</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 text-center">
        <p className="text-sm text-muted-foreground">
          O tempo de acesso ao Cogni se encerrou. Para continuar acessando, entre em contato pelo e-mail abaixo.
        </p>

        <a
          href={`mailto:${EMAIL_SUPORTE}`}
          className="flex items-center gap-2 rounded-xl bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          <Mail className="size-4" />
          {EMAIL_SUPORTE}
        </a>

        <Button variant="outline" className="w-full" disabled={isPending} onClick={logout}>
          <LogOut />
          {isPending ? 'Saindo...' : 'Sair'}
        </Button>
      </CardContent>
    </Card>
  );
}
