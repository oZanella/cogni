'use client';

import { useFormContext } from 'react-hook-form';

import type { RegistroPensamentoSchema } from '@/api/features/registro-pensamento/schemas/registro-pensamento.schemas';
import { FormControl, FormField, FormItem, FormMessage } from '@/web/components/ui/form';
import { Textarea } from '@/web/components/ui/textarea';

export function SituacaoStep() {
  const { control } = useFormContext<RegistroPensamentoSchema>();

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="shrink-0">
        <p className="mb-1 text-lg font-medium">O que aconteceu?</p>
        <p className="text-sm text-muted-foreground">Descreva a situação com suas palavras, não tenha sem pressa.</p>
      </div>
      <FormField
        control={control}
        name="situacao"
        render={({ field }) => (
          <FormItem className="flex min-h-0 flex-1 flex-col gap-2">
            <FormControl className="min-h-0 flex-1">
              <Textarea
                {...field}
                placeholder="Ex: Hoje briguei com meus pais e me senti culpado (a)..."
                className="scrollbar-fina field-sizing-fixed h-full min-h-0 resize-none overflow-y-auto text-base"
                autoFocus
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
