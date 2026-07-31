'use client';

import { History, House } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/web/components/ui/tooltip';
import { useExisteRegistroPensamento } from '@/web/features/registro-pensamento/data/hooks/use-existe-registro-pensamento.query';
import { cn } from '@/web/lib/utils';

const ITENS = [
  { href: '/inicio', label: 'Início', icon: House },
  { href: '/historico', label: 'Histórico', icon: History },
];

export function BottomNav() {
  const pathname = usePathname();
  const { data: temRegistro } = useExisteRegistroPensamento();
  const [dicaAberta, setDicaAberta] = useState(false);

  return (
    <nav className="shrink-0 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <div className="mx-auto flex w-full max-w-md items-center justify-around px-6 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        {ITENS.map((item) => {
          const ativo = pathname === item.href;
          const Icon = item.icon;
          const bloqueado = item.href === '/historico' && !temRegistro;

          if (bloqueado) {
            return (
              <Tooltip key={item.href} open={dicaAberta} onOpenChange={setDicaAberta}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-disabled="true"
                    onClick={() => {
                      setDicaAberta(true);
                      setTimeout(() => setDicaAberta(false), 2500);
                    }}
                    className="flex cursor-not-allowed flex-col items-center gap-1 rounded-xl px-4 py-1.5 text-xs text-muted-foreground/50"
                  >
                    <Icon className="size-5" />
                    {item.label}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">Registre um pensamento para desbloquear o histórico</TooltipContent>
              </Tooltip>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 rounded-xl px-4 py-1.5 text-xs transition-colors',
                ativo ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
