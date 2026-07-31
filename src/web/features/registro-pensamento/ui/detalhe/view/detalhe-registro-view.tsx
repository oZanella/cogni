'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/web/components/ui/button';
import { Form } from '@/web/components/ui/form';
import { Skeleton } from '@/web/components/ui/skeleton';
import { useDetalheRegistro } from '@/web/features/registro-pensamento/ui/detalhe/hooks/use-detalhe-registro.hook';
import { EmocoesStep } from '@/web/features/registro-pensamento/ui/novo/view/emocoes-step';
import { SituacaoStep } from '@/web/features/registro-pensamento/ui/novo/view/situacao-step';

export function DetalheRegistroView({ id }: { id: number }) {
  const { form, isLoading, naoEncontrado, salvar, isPending } = useDetalheRegistro(id);

  return (
    <div className="mx-auto flex h-dvh w-full max-w-md flex-col overflow-hidden px-6 pt-6 pb-10">
      <div className="mb-8 flex shrink-0 items-center gap-3">
        <Link href="/historico" aria-label="Voltar para o histórico">
          <Button type="button" variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-lg font-medium text-foreground">Seu registro</h1>
      </div>

      {isLoading && (
        <div className="flex flex-1 flex-col gap-10">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-40 w-full rounded-lg" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64" />
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }, (_, index) => (
                <Skeleton key={index} className="h-9 w-full rounded-full" />
              ))}
            </div>
          </div>
        </div>
      )}

      {naoEncontrado && <p className="text-sm text-muted-foreground">Registro não encontrado.</p>}

      {!isLoading && !naoEncontrado && (
        <Form {...form}>
          <form
            className="flex min-h-0 flex-1 flex-col justify-between gap-8"
            onSubmit={(event) => {
              event.preventDefault();
              salvar();
            }}
          >
            <div className="flex min-h-0 flex-1 flex-col gap-8">
              <div className="flex h-48 shrink-0 flex-col">
                <SituacaoStep />
              </div>
              <EmocoesStep />
            </div>

            <Button type="submit" size="lg" className="h-12 shrink-0 text-base" disabled={isPending}>
              {isPending ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
