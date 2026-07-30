'use client';

import { useFormContext } from 'react-hook-form';

import type { RegistroPensamentoSchema } from '@/api/features/registro-pensamento/schemas/registro-pensamento.schemas';
import { FormControl, FormField, FormItem, FormMessage } from '@/web/components/ui/form';
import { Textarea } from '@/web/components/ui/textarea';

export function SituacaoStep() {
  const { control } = useFormContext<RegistroPensamentoSchema>();

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="mb-1 text-lg font-medium">O que aconteceu?</p>
        <p className="text-sm text-muted-foreground">Descreva a situação com suas palavras, sem pressa.</p>
      </div>
      <FormField
        control={control}
        name="situacao"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                {...field}
                rows={8}
                placeholder="Ex: Recebi uma mensagem do meu chefe e comecei a me sentir mal..."
                className="resize-none text-base"
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
