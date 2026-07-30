import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import type { RegistroPensamento } from '@/api/features/registro-pensamento/types/registro-pensamento.types';
import { Badge } from '@/web/components/ui/badge';
import { Card, CardContent } from '@/web/components/ui/card';
import { cn } from '@/web/lib/utils';
import { emocaoMap } from '@/web/shared/enum-maps/emocao-map';

export function RegistroCard({ registro, compact = false }: { registro: RegistroPensamento; compact?: boolean }) {
  return (
    <Card className="border-none bg-card shadow-sm">
      <CardContent className={cn('flex flex-col p-3', compact ? 'gap-1' : 'gap-2')}>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(registro.createdAt, { addSuffix: true, locale: ptBR })}
          </span>
        </div>

        <p className={cn('text-sm leading-snug text-foreground', compact ? 'line-clamp-1' : 'line-clamp-2')}>
          {registro.situacao}
        </p>

        {!compact && registro.emocoes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {registro.emocoes.map((item, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {emocaoMap[item.emocao]}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
