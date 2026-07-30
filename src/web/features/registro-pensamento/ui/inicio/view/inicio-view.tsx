'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { RegistroTimeline } from '@/web/components/business/registro-timeline';
import { Button } from '@/web/components/ui/button';
import { useInicio } from '@/web/features/registro-pensamento/ui/inicio/hooks/use-inicio.hook';
import { useRegistrosVisiveis } from '@/web/hooks/use-registros-visiveis/use-registros-visiveis.hook';

export function InicioView() {
  const { nome, registros, isLoading } = useInicio();
  const { containerRef, medidorRef, registrosVisiveis } = useRegistrosVisiveis(registros);

  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-col gap-5 px-6 pt-5 pb-6 md:max-w-xl">
      <div className="min-w-0">
        <p className="line-clamp-1 text-sm wrap-break-word text-muted-foreground">Olá{nome ? `, ${nome}` : ''}</p>
        <h1 className="text-xl font-medium text-foreground">Como você está agora?</h1>
      </div>

      <Link href="/registro/novo">
        <Button className="h-11 w-full gap-2 rounded-2xl text-sm shadow-sm">
          <Plus className="size-4" />
          Novo registro
        </Button>
      </Link>

      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <h2 className="shrink-0 text-sm font-medium text-muted-foreground">Últimas anotações</h2>

        {isLoading && <p className="text-sm text-muted-foreground">Carregando...</p>}

        {!isLoading && registros.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Você ainda não fez nenhum registro. Quando quiser, comece pelo botão acima.
          </p>
        )}

        {registros.length > 0 && (
          <div ref={containerRef} className="min-h-0 flex-1 overflow-hidden">
            <RegistroTimeline registros={registrosVisiveis} />
          </div>
        )}

        {registros.length > 0 && (
          <Link href="/historico" className="shrink-0 pt-2">
            <Button variant="outline" size="sm" className="w-full">
              Ver histórico
            </Button>
          </Link>
        )}
      </div>

      {registros.length > 0 && (
        <div
          ref={medidorRef}
          aria-hidden
          className="pointer-events-none invisible absolute inset-x-0 top-0 -z-10 h-0 w-full max-w-md overflow-hidden"
        >
          <RegistroTimeline registros={registros} />
        </div>
      )}
    </div>
  );
}
