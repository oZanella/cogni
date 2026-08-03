'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';

import type { RegistroPensamentoSchema } from '@/api/features/registro-pensamento/schemas/registro-pensamento.schemas';
import type { Emocao } from '@/api/shared/enums/emocao';
import { Badge } from '@/web/components/ui/badge';
import { emocaoOptionsNegativas, emocaoOptionsPositivas } from '@/web/shared/enum-maps/emocao-map';

export function EmocoesStep() {
  const { control, watch, formState } = useFormContext<RegistroPensamentoSchema>();
  const { fields, append, remove } = useFieldArray({ control, name: 'emocoes' });
  const emocoesSelecionadas = watch('emocoes');

  const alternarEmocao = (emocao: RegistroPensamentoSchema['emocoes'][number]['emocao']) => {
    const index = fields.findIndex((campo) => campo.emocao === emocao);
    if (index >= 0) {
      remove(index);
    } else {
      append({ emocao, intensidade: 50 });
    }
  };

  const renderOpcao = (opcao: { value: Emocao; label: string }) => {
    const ativa = emocoesSelecionadas.some((item) => item.emocao === opcao.value);
    return (
      <button type="button" key={opcao.value} onClick={() => alternarEmocao(opcao.value)} className="w-full">
        <Badge
          variant={ativa ? 'default' : 'outline'}
          className="h-9 w-full cursor-pointer justify-center px-2 text-sm"
        >
          {opcao.label}
        </Badge>
      </button>
    );
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div className="shrink-0">
        <p className="mb-1 text-lg font-medium">O que você sentiu?</p>
        <p className="text-sm text-muted-foreground">Selecione uma ou mais emoções para prosseguir.</p>
      </div>

      <div className="scrollbar-fina grid min-h-0 flex-1 grid-cols-2 gap-4 overflow-y-auto pr-1">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">{emocaoOptionsPositivas.map(renderOpcao)}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">{emocaoOptionsNegativas.map(renderOpcao)}</div>
        </div>
      </div>

      {formState.errors.emocoes?.message && (
        <p className="shrink-0 text-sm text-destructive">{formState.errors.emocoes.message}</p>
      )}
    </div>
  );
}
