'use client';

import { LogOut } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { Avatar, AvatarFallback } from '@/web/components/ui/avatar';
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

export function Header() {
  const { data: session } = useSession();
  const { logout, isPending } = useLogout();

  const nome = session?.user?.name ?? '';
  const email = session?.user?.email ?? '';
  const inicial = nome.charAt(0).toUpperCase() || '?';

  return (
    <header className="z-10 shrink-0 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-md items-center justify-between px-6 md:max-w-4xl md:px-8">
        <span className="text-lg font-medium tracking-tight text-foreground">Cogni</span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Menu do usuário">
              <Avatar>
                <AvatarFallback className="bg-secondary text-secondary-foreground">{inicial}</AvatarFallback>
              </Avatar>
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
