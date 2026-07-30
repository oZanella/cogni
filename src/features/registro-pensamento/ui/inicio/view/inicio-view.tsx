'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { RegistroCard } from '@/components/business/registro-card';
import { Button } from '@/components/ui/button';
import { useInicio } from '@/features/registro-pensamento/ui/inicio/hooks/use-inicio.hook';

export function InicioView() {
  const { nome, registros, isLoading } = useInicio();

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-6 pt-10 pb-6">
      <div>
        <p className="text-sm text-muted-foreground">Olá{nome ? `, ${nome}` : ''}</p>
        <h1 className="text-2xl font-medium text-foreground">Como você está agora?</h1>
      </div>

      <Link href="/registro/novo">
        <Button size="lg" className="h-16 w-full gap-2 rounded-3xl text-base shadow-sm">
          <Plus className="size-5" />
          Novo registro
        </Button>
      </Link>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">Últimas anotações</h2>
          {registros.length > 0 && (
            <Link href="/historico" className="text-sm text-primary underline underline-offset-4">
              Ver tudo
            </Link>
          )}
        </div>

        {isLoading && <p className="text-sm text-muted-foreground">Carregando...</p>}

        {!isLoading && registros.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Você ainda não fez nenhum registro. Quando quiser, comece pelo botão acima.
          </p>
        )}

        <div className="flex flex-col gap-3">
          {registros.map((registro) => (
            <Link key={registro.id} href="/historico">
              <RegistroCard registro={registro} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
