import Link from 'next/link';

import type { RegistroPensamento } from '@/api/features/registro-pensamento/types/registro-pensamento.types';
import { Badge } from '@/web/components/ui/badge';
import { Card, CardContent } from '@/web/components/ui/card';
import { formatarTempoRelativo } from '@/web/lib/formatar-tempo-relativo';
import { emocaoMap } from '@/web/shared/enum-maps/emocao-map';

export function RegistroCard({ registro }: { registro: RegistroPensamento }) {
  return (
    <Link href={`/registro/${registro.id}`} className="mb-3 block break-inside-avoid md:mb-4">
      <Card className="border-none bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
        <CardContent className="flex flex-col gap-2 p-4">
          <span className="text-xs text-muted-foreground">{formatarTempoRelativo(registro.createdAt)}</span>

          <p className="min-w-0 text-sm leading-relaxed wrap-break-word text-foreground">
            {registro.situacao || <span className="italic text-muted-foreground">Sem descrição</span>}
          </p>

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
