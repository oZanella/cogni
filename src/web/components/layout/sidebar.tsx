'use client';

import { FileText, History, House } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/web/components/ui/tooltip';
import { useExisteRegistroPensamento } from '@/web/features/registro-pensamento/data/hooks/use-existe-registro-pensamento.query';
import { cn } from '@/web/lib/utils';

const ITENS = [
  { href: '/inicio', label: 'Início', icon: House },
  { href: '/historico', label: 'Histórico', icon: History },
  { href: '/relatorio', label: 'Relatório', icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: temRegistro } = useExisteRegistroPensamento();
  const [dicaAberta, setDicaAberta] = useState(false);

  return (
    <aside className="hidden h-full w-56 shrink-0 flex-col gap-6 overflow-y-auto border-r border-border px-4 py-6 md:flex">
      <nav className="flex flex-col gap-1">
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
                    className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground/50"
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">Registre um pensamento para desbloquear o histórico</TooltipContent>
              </Tooltip>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors',
                ativo ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-muted'
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
