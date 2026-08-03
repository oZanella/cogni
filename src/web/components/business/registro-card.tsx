import Link from 'next/link';

import type { RegistroPensamento } from '@/api/features/registro-pensamento/types/registro-pensamento.types';
import { Badge } from '@/web/components/ui/badge';
import { Card, CardContent } from '@/web/components/ui/card';
import { formatarTempoRelativo } from '@/web/lib/formatar-tempo-relativo';
import { emocaoMap } from '@/web/shared/enum-maps/emocao-map';

const MAX_EMOCOES_VISIVEIS = 3;

export function RegistroCard({ registro }: { registro: RegistroPensamento }) {
  const emocoesVisiveis = registro.emocoes.slice(0, MAX_EMOCOES_VISIVEIS);
  const emocoesRestantes = registro.emocoes.length - emocoesVisiveis.length;

  return (
    <Link href={`/registro/${registro.id}`} className="block h-40">
      <Card className="h-full border-none bg-card shadow-sm transition-colors hover:bg-accent">
        <CardContent className="flex h-full flex-col gap-2 p-3">
          <span className="shrink-0 text-xs text-muted-foreground">{formatarTempoRelativo(registro.createdAt)}</span>

          <p className="line-clamp-2 min-w-0 flex-1 text-sm leading-snug wrap-break-word text-foreground">
            {registro.situacao || <span className="italic text-muted-foreground">Sem descrição</span>}
          </p>

          <div className="flex h-6 shrink-0 items-center gap-1.5 overflow-hidden">
            {emocoesVisiveis.map((item, index) => (
              <Badge key={index} variant="secondary" className="shrink-0 font-normal">
                {emocaoMap[item.emocao]}
              </Badge>
            ))}
            {emocoesRestantes > 0 && (
              <Badge variant="secondary" className="shrink-0 font-normal text-muted-foreground">
                +{emocoesRestantes}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
