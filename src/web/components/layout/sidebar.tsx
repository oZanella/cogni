'use client';

import { History, House } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/web/lib/utils';

const ITENS = [
  { href: '/inicio', label: 'Início', icon: House },
  { href: '/historico', label: 'Histórico', icon: History },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-56 shrink-0 flex-col gap-6 border-r border-border px-4 py-6 md:flex">
      <nav className="flex flex-col gap-1">
        {ITENS.map((item) => {
          const ativo = pathname === item.href;
          const Icon = item.icon;

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
