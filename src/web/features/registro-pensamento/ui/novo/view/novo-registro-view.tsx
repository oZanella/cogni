'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/web/components/ui/button';
import { Form } from '@/web/components/ui/form';
import { Progress } from '@/web/components/ui/progress';
import { useRegistroWizard } from '@/web/features/registro-pensamento/ui/novo/hooks/use-registro-wizard.hook';
import { EmocoesStep } from '@/web/features/registro-pensamento/ui/novo/view/emocoes-step';
import { IntensidadeStep } from '@/web/features/registro-pensamento/ui/novo/view/intensidade-step';
import { SituacaoStep } from '@/web/features/registro-pensamento/ui/novo/view/situacao-step';

const STEPS_TODAS = [SituacaoStep, EmocoesStep, IntensidadeStep];

export function NovoRegistroView() {
  const { form, etapa, etapas, semDescricao, avancar, voltar, ehUltimaEtapa, ehPrimeiraEtapa, isPending } =
    useRegistroWizard();

  const STEPS = semDescricao ? STEPS_TODAS.slice(1) : STEPS_TODAS;
  const EtapaAtual = STEPS[etapa];

  return (
    <div className="mx-auto flex h-svh w-full max-w-md flex-col overflow-hidden px-6 pt-6 pb-10 md:max-w-xl">
      <div className="mb-8 flex shrink-0 items-center gap-3">
        {ehPrimeiraEtapa ? (
          <Link href="/inicio" aria-label="Voltar para o início">
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

      <Form {...form}>
        <form
          className="flex min-h-0 flex-1 flex-col justify-between gap-8"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <EtapaAtual />

          <Button type="button" size="lg" className="h-12 shrink-0 text-base" onClick={avancar} disabled={isPending}>
            {ehUltimaEtapa ? (isPending ? 'Salvando...' : 'Concluir registro') : 'Continuar'}
            {!ehUltimaEtapa && <ArrowRight />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
