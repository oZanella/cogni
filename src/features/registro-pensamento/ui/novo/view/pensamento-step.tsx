'use client';

import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import type { RegistroPensamentoSchema } from '@/features/registro-pensamento/shared/schemas/registro-pensamento.schemas';

export function PensamentoStep() {
  const { control } = useFormContext<RegistroPensamentoSchema>();

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="mb-1 text-lg font-medium">O que passou pela sua cabeça?</p>
        <p className="text-sm text-muted-foreground">Escreva o pensamento automático, como ele veio até você.</p>
      </div>
      <FormField
        control={control}
        name="pensamento"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                {...field}
                rows={8}
                placeholder="Ex: Eu vou ser demitido, eu não sirvo para esse trabalho..."
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
