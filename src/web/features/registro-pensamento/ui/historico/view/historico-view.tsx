'use client';

import { EstadoVazio } from '@/web/components/business/estado-vazio';
import { RegistroCard } from '@/web/components/business/registro-card';
import { RegistroCardSkeleton } from '@/web/components/business/registro-card-skeleton';
import { useHistorico } from '@/web/features/registro-pensamento/ui/historico/hooks/use-historico.hook';

export function HistoricoView() {
  const { grupos, isLoading, vazio } = useHistorico();

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 pt-6 pb-6 md:max-w-4xl">
      <h1 className="text-2xl font-medium text-foreground">Seu histórico</h1>

      {isLoading && (
        <div className="columns-2 gap-3 md:gap-4">
          <RegistroCardSkeleton />
          <RegistroCardSkeleton />
          <RegistroCardSkeleton />
          <RegistroCardSkeleton />
        </div>
      )}

      {vazio && <EstadoVazio mensagem="Nenhum pensamento registrado" />}

      <div className="flex flex-col gap-6">
        {grupos.map((grupo) => (
          <div key={grupo.rotulo} className="flex flex-col gap-3">
            <h2 className="text-sm font-medium text-muted-foreground">{grupo.rotulo}</h2>
            <div className="columns-2 gap-3 md:gap-4">
              {grupo.registros.map((registro) => (
                <RegistroCard key={registro.id} registro={registro} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
