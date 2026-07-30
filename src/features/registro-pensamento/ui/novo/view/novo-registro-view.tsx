'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { useRegistroWizard } from '@/features/registro-pensamento/ui/novo/hooks/use-registro-wizard.hook';
import { EmocoesStep } from '@/features/registro-pensamento/ui/novo/view/emocoes-step';
import { PensamentoStep } from '@/features/registro-pensamento/ui/novo/view/pensamento-step';
import { SituacaoStep } from '@/features/registro-pensamento/ui/novo/view/situacao-step';

const STEPS = [SituacaoStep, EmocoesStep, PensamentoStep];

export function NovoRegistroView() {
  const { form, etapa, etapas, avancar, voltar, ehUltimaEtapa, ehPrimeiraEtapa, isPending } = useRegistroWizard();

  const EtapaAtual = STEPS[etapa];

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-6 pb-10">
      <div className="mb-8 flex items-center gap-3">
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
          className="flex flex-1 flex-col justify-between gap-8"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <EtapaAtual />

          <Button type="button" size="lg" className="h-12 text-base" onClick={avancar} disabled={isPending}>
            {ehUltimaEtapa ? (isPending ? 'Salvando...' : 'Concluir registro') : 'Continuar'}
            {!ehUltimaEtapa && <ArrowRight />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
