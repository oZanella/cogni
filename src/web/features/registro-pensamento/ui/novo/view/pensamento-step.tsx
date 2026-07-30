'use client';

import { useFormContext } from 'react-hook-form';

import type { RegistroPensamentoSchema } from '@/api/features/registro-pensamento/schemas/registro-pensamento.schemas';
import { FormControl, FormField, FormItem, FormMessage } from '@/web/components/ui/form';
import { Textarea } from '@/web/components/ui/textarea';

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
