'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { RegistroCard } from '@/web/components/business/registro-card';
import { Button } from '@/web/components/ui/button';
import { useInicio } from '@/web/features/registro-pensamento/ui/inicio/hooks/use-inicio.hook';

export function InicioView() {
  const { nome, registros, isLoading } = useInicio();

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-5 px-6 pt-5 pb-4 md:max-w-xl">
      <div>
        <p className="text-sm text-muted-foreground">Olá{nome ? `, ${nome}` : ''}</p>
        <h1 className="text-xl font-medium text-foreground">Como você está agora?</h1>
      </div>

      <Link href="/registro/novo">
        <Button className="h-11 w-full gap-2 rounded-2xl text-sm shadow-sm">
          <Plus className="size-4" />
          Novo registro
        </Button>
      </Link>

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-muted-foreground">Últimas anotações</h2>

        {isLoading && <p className="text-sm text-muted-foreground">Carregando...</p>}

        {!isLoading && registros.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Você ainda não fez nenhum registro. Quando quiser, comece pelo botão acima.
          </p>
        )}

        <div className="flex flex-col gap-2">
          {registros.map((registro) => (
            <Link key={registro.id} href="/historico">
              <RegistroCard registro={registro} compact />
            </Link>
          ))}
        </div>

        {registros.length > 0 && (
          <Link href="/historico">
            <Button variant="outline" size="sm" className="w-full">
              Ver histórico
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
