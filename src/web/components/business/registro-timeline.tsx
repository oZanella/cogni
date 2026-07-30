import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import { Fragment } from 'react';

import type { RegistroPensamento } from '@/api/features/registro-pensamento/types/registro-pensamento.types';

export function RegistroTimeline({ registros }: { registros: RegistroPensamento[] }) {
  return (
    <div className="flex flex-1 flex-col">
      {registros.map((registro) => (
        <Fragment key={registro.id}>
          <Link href="/historico" className="flex min-w-0 shrink-0 gap-3">
            <div className="flex shrink-0 flex-col items-center">
              <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-primary" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(registro.createdAt, { addSuffix: true, locale: ptBR })}
              </span>
              <p className="line-clamp-4 min-w-0 text-base wrap-break-word text-foreground">{registro.situacao}</p>
            </div>
          </Link>

          {/* espaçador depois de cada item (inclusive o último, levando até o botão): sem
              conteúdo próprio, então pode encolher até 0 ou esticar à vontade pra preencher
              espaço sobrando, sem nunca forçar o texto (que tem altura mínima) a ficar menor
              do que o necessário */}
          <div className="flex min-h-0 flex-1 gap-3">
            <div className="flex w-2.5 shrink-0 justify-center">
              <span className="w-px flex-1 bg-border" />
            </div>
            <div className="flex-1" />
          </div>
        </Fragment>
      ))}
    </div>
  );
}
