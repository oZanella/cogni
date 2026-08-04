'use client';

import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import type { RegistroPensamentoSchema } from '@/api/features/registro-pensamento/schemas/registro-pensamento.schemas';
import { FormControl, FormField, FormItem, FormMessage } from '@/web/components/ui/form';
import { Textarea } from '@/web/components/ui/textarea';

export function SituacaoStep() {
  const { control } = useFormContext<RegistroPensamentoSchema>();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    // Safari no iOS não repinta o fundo pautado (background-attachment: local) quando a altura
    // da textarea muda com a barra de endereço do navegador, deixando linhas em branco no final.
    const repintarLinhas = () => {
      const el = textareaRef.current;
      if (!el) return;
      el.style.backgroundAttachment = 'scroll';
      void el.offsetHeight;
      el.style.backgroundAttachment = '';
    };

    repintarLinhas();
    window.visualViewport?.addEventListener('resize', repintarLinhas);
    return () => window.visualViewport?.removeEventListener('resize', repintarLinhas);
  }, []);

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
                ref={(el) => {
                  field.ref(el);
                  textareaRef.current = el;
                }}
                placeholder="Ex: Hoje briguei com meus pais e me senti culpado (a)..."
                className="papel-caderno scrollbar-fina field-sizing-fixed h-full min-h-0 resize-none overflow-y-auto bg-card pt-3 pr-3 pl-10 text-base"
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
