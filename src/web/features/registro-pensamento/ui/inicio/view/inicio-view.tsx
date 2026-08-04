'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { EstadoVazio } from '@/web/components/business/estado-vazio';
import { RegistroCardSkeleton } from '@/web/components/business/registro-card-skeleton';
import { RegistroTimeline } from '@/web/components/business/registro-timeline';
import { Button } from '@/web/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/web/components/ui/dialog';
import { useInicio } from '@/web/features/registro-pensamento/ui/inicio/hooks/use-inicio.hook';
import { useRegistrosVisiveis } from '@/web/hooks/use-registros-visiveis/use-registros-visiveis.hook';

export function InicioView() {
  const router = useRouter();
  const { nome, registros, isLoading } = useInicio();
  const { containerRef, medidorRef, reservaRef, registrosVisiveis } = useRegistrosVisiveis(registros);
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-col gap-3 px-6 pt-4 pb-3 md:max-w-2xl">
      <div className="min-w-0">
        <p className="line-clamp-1 text-sm wrap-break-word text-muted-foreground">Olá{nome ? `, ${nome}` : ''}</p>
        <h1 className="text-xl font-medium text-foreground">Como você está se sentindo?</h1>
      </div>

      <Button className="h-9 w-full rounded-2xl text-sm shadow-sm" onClick={() => setModalAberto(true)}>
        Novo Pensamento
      </Button>

      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="md:max-w-md md:p-6">
          <DialogHeader>
            <DialogTitle className="md:text-lg">Deseja escrever algo hoje?</DialogTitle>
            <DialogDescription className="md:text-base">
              Você pode descrever a situação com suas palavras, ou apenas para registrar um sentimento.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 md:-mx-6 md:-mb-6 md:p-6">
            <Button
              variant="outline"
              className="h-11 sm:flex-1"
              onClick={() => router.push('/registro/novo?semDescricao=1')}
            >
              Não
            </Button>
            <Button className="h-11 sm:flex-1" onClick={() => router.push('/registro/novo')}>
              Sim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <h2 className="shrink-0 text-sm font-medium text-muted-foreground">Últimas anotações</h2>

        {isLoading && (
          <div className="flex flex-col gap-2">
            <RegistroCardSkeleton />
            <RegistroCardSkeleton />
          </div>
        )}

        {!isLoading && registros.length === 0 && <EstadoVazio mensagem="Você não tem nenhum pensamento registrado!" />}

        {registros.length > 0 && (
          <div ref={containerRef} className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <RegistroTimeline registros={registrosVisiveis} />

            <div ref={reservaRef} className="shrink-0 pt-2">
              <Link href="/historico" className="block">
                <Button variant="outline" size="sm" className="w-full">
                  Ver histórico
                </Button>
              </Link>
            </div>
          </div>
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
