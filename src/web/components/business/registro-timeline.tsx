import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

import type { RegistroPensamento } from '@/api/features/registro-pensamento/types/registro-pensamento.types';
import { cn } from '@/web/lib/utils';

export function RegistroTimeline({ registros }: { registros: RegistroPensamento[] }) {
  return (
    <div className="flex flex-col">
      {registros.map((registro, index) => {
        const ehUltimo = index === registros.length - 1;

        return (
          <Link key={registro.id} href="/historico" className="flex min-w-0 gap-3">
            <div className="flex flex-col items-center">
              <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-primary" />
              {!ehUltimo && <span className="w-px flex-1 bg-border" />}
            </div>
            <div className={cn('flex min-w-0 flex-1 flex-col', !ehUltimo && 'pb-4')}>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(registro.createdAt, { addSuffix: true, locale: ptBR })}
              </span>
              <p className="line-clamp-2 min-w-0 text-sm wrap-break-word text-foreground">{registro.situacao}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
