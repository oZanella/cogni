import Link from 'next/link';

import type { RegistroPensamento } from '@/api/features/registro-pensamento/types/registro-pensamento.types';
import { Badge } from '@/web/components/ui/badge';
import { Card, CardContent } from '@/web/components/ui/card';
import { formatarTempoRelativo } from '@/web/lib/formatar-tempo-relativo';
import { emocaoMap } from '@/web/shared/enum-maps/emocao-map';

export function RegistroCard({ registro }: { registro: RegistroPensamento }) {
  return (
    <Link href={`/registro/${registro.id}`} className="block">
      <Card className="border-none bg-card shadow-sm transition-colors hover:bg-accent">
        <CardContent className="flex flex-col gap-2 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{formatarTempoRelativo(registro.createdAt)}</span>
          </div>

          <p className="min-w-0 text-sm leading-snug wrap-break-word text-foreground">{registro.situacao}</p>

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
    </Link>
  );
}
