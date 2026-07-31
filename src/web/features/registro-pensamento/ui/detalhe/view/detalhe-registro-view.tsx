'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/web/components/ui/button';
import { Form } from '@/web/components/ui/form';
import { Progress } from '@/web/components/ui/progress';
import { Skeleton } from '@/web/components/ui/skeleton';
import { useDetalheRegistro } from '@/web/features/registro-pensamento/ui/detalhe/hooks/use-detalhe-registro.hook';
import { EmocoesStep } from '@/web/features/registro-pensamento/ui/novo/view/emocoes-step';
import { SituacaoStep } from '@/web/features/registro-pensamento/ui/novo/view/situacao-step';

const STEPS = [SituacaoStep, EmocoesStep];

export function DetalheRegistroView({ id }: { id: number }) {
  const { form, etapa, etapas, avancar, voltar, ehUltimaEtapa, ehPrimeiraEtapa, isLoading, naoEncontrado, isPending } =
    useDetalheRegistro(id);

  const EtapaAtual = STEPS[etapa];

  return (
    <div className="mx-auto flex h-dvh w-full max-w-md flex-col overflow-hidden px-6 pt-6 pb-10">
      <div className="mb-8 flex shrink-0 items-center gap-3">
        {ehPrimeiraEtapa ? (
          <Link href="/historico" aria-label="Voltar para o histórico">
            <Button type="button" variant="ghost" size="icon">
              <ArrowLeft />
            </Button>
          </Link>
        ) : (
          <Button type="button" variant="ghost" size="icon" onClick={voltar} aria-label="Etapa anterior">
            <ArrowLeft />
          </Button>
        )}
        <div className="flex-1">
          <Progress value={((etapa + 1) / etapas.length) * 100} className="h-1.5" />
        </div>
      </div>

      {isLoading && (
        <div className="flex min-h-0 flex-1 flex-col gap-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
      )}

      {naoEncontrado && <p className="text-sm text-muted-foreground">Registro não encontrado.</p>}

      {!isLoading && !naoEncontrado && (
        <Form {...form}>
          <form
            className="flex min-h-0 flex-1 flex-col justify-between gap-8"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <EtapaAtual />

            <Button type="button" size="lg" className="h-12 shrink-0 text-base" onClick={avancar} disabled={isPending}>
              {ehUltimaEtapa ? (isPending ? 'Salvando...' : 'Salvar alterações') : 'Continuar'}
              {!ehUltimaEtapa && <ArrowRight />}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
