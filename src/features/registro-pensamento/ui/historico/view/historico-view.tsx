'use client';

import { RegistroCard } from '@/components/business/registro-card';
import { useHistorico } from '@/features/registro-pensamento/ui/historico/hooks/use-historico.hook';

export function HistoricoView() {
  const { grupos, isLoading, vazio } = useHistorico();

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 pt-10 pb-6">
      <h1 className="text-2xl font-medium text-foreground">Seu histórico</h1>

      {isLoading && <p className="text-sm text-muted-foreground">Carregando...</p>}

      {vazio && (
        <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Nenhum registro ainda. Seus registros aparecerão aqui.
        </p>
      )}

      <div className="flex flex-col gap-6">
        {grupos.map((grupo) => (
          <div key={grupo.rotulo} className="flex flex-col gap-3">
            <h2 className="text-sm font-medium text-muted-foreground">{grupo.rotulo}</h2>
            <div className="flex flex-col gap-3">
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
