'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/web/components/ui/button';
import { Form } from '@/web/components/ui/form';
import { useDetalheRegistro } from '@/web/features/registro-pensamento/ui/detalhe/hooks/use-detalhe-registro.hook';
import { EmocoesStep } from '@/web/features/registro-pensamento/ui/novo/view/emocoes-step';
import { PensamentoStep } from '@/web/features/registro-pensamento/ui/novo/view/pensamento-step';
import { SituacaoStep } from '@/web/features/registro-pensamento/ui/novo/view/situacao-step';

export function DetalheRegistroView({ id }: { id: number }) {
  const { form, isLoading, naoEncontrado, salvar, isPending } = useDetalheRegistro(id);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-6 pb-10">
      <div className="mb-8 flex items-center gap-3">
        <Link href="/historico" aria-label="Voltar para o histórico">
          <Button type="button" variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-lg font-medium text-foreground">Seu registro</h1>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Carregando...</p>}

      {naoEncontrado && <p className="text-sm text-muted-foreground">Registro não encontrado.</p>}

      {!isLoading && !naoEncontrado && (
        <Form {...form}>
          <form
            className="flex flex-1 flex-col gap-10"
            onSubmit={(event) => {
              event.preventDefault();
              salvar();
            }}
          >
            <SituacaoStep />
            <EmocoesStep />
            <PensamentoStep />

            <Button type="submit" size="lg" className="h-12 text-base" disabled={isPending}>
              {isPending ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
