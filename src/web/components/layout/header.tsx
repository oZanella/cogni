'use client';

import { LogOut } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { Casulo } from '@/web/components/business/criaturas';
import { Button } from '@/web/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/web/components/ui/dropdown-menu';
import { useLogout } from '@/web/hooks/use-logout/use-logout.hook';
import { useTransformacaoBorboleta } from '@/web/hooks/use-transformacao-borboleta/use-transformacao-borboleta.hook';

export function Header() {
  const { data: session } = useSession();
  const { logout, isPending } = useLogout();
  const estagio = useTransformacaoBorboleta();

  const nome = session?.user?.name ?? '';
  const email = session?.user?.email ?? '';

  return (
    <header className="z-10 shrink-0 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-md items-center justify-between px-6 md:max-w-4xl md:px-8">
        <span className="text-lg font-medium tracking-tight text-foreground">Cogni</span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Menu do usuário">
              {estagio === 'casulo' && (
                <Casulo
                  className="origin-center animate-[formar-casulo_0.5s_ease-out_forwards]"
                  style={{ height: 24, width: 19 }}
                />
              )}
              {estagio === 'borboleta' && (
                <span className="inline-block animate-[eclodir-borboleta_0.6s_ease-out_forwards]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/butterfly-animation.svg" alt="Borboleta" height={24} width={24} />
                </span>
              )}
              {estagio === null && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/butterfly-animation.svg" alt="Borboleta" height={24} width={24} />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col gap-0.5">
              <span className="truncate font-medium">{nome || 'Minha conta'}</span>
              {email && <span className="truncate text-xs font-normal text-muted-foreground">{email}</span>}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" disabled={isPending} onClick={logout}>
              <LogOut />
              {isPending ? 'Saindo...' : 'Sair'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
