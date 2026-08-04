'use client';

import { CircleHelp, LogOut } from 'lucide-react';
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
import { useOnboarding } from '@/web/features/registro-pensamento/ui/onboarding/hooks/use-onboarding.hook';
import { OnboardingModal } from '@/web/features/registro-pensamento/ui/onboarding/view/onboarding-modal';
import { useLogout } from '@/web/hooks/use-logout/use-logout.hook';
import { useTransformacaoBorboleta } from '@/web/hooks/use-transformacao-borboleta/use-transformacao-borboleta.hook';

export function Header() {
  const { data: session } = useSession();
  const { logout, isPending } = useLogout();
  const estagio = useTransformacaoBorboleta();
  const onboarding = useOnboarding();

  const nome = session?.user?.name ?? '';
  const email = session?.user?.email ?? '';

  return (
    <header className="z-10 shrink-0 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-md items-center justify-between px-6 md:max-w-6xl md:px-8">
        <span className="text-3xl font-semibold tracking-tight text-primary">Cogni</span>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Ver apresentação do sistema" onClick={onboarding.abrir}>
            <CircleHelp />
          </Button>

          <OnboardingModal
            aberto={onboarding.aberto}
            etapa={onboarding.etapa}
            ehUltimaEtapa={onboarding.ehUltimaEtapa}
            avancar={onboarding.avancar}
            pular={onboarding.pular}
            onOpenChange={onboarding.onOpenChange}
          />

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
              <DropdownMenuItem variant="destructive" disabled={isPending} onClick={logout} className="cursor-pointer">
                <LogOut />
                {isPending ? 'Saindo...' : 'Sair'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
