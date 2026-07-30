import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import type { RegistroPensamento } from '@/api/features/registro-pensamento/types/registro-pensamento.types';
import { Badge } from '@/web/components/ui/badge';
import { Card, CardContent } from '@/web/components/ui/card';
import { emocaoMap } from '@/web/shared/enum-maps/emocao-map';

export function RegistroCard({ registro }: { registro: RegistroPensamento }) {
  return (
    <Card className="border-none bg-card shadow-sm">
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(registro.createdAt, { addSuffix: true, locale: ptBR })}
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-foreground">{registro.situacao}</p>

        {registro.emocoes.length > 0 && (
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
