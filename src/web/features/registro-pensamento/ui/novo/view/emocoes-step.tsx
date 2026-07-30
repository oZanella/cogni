'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';

import type { RegistroPensamentoSchema } from '@/api/features/registro-pensamento/schemas/registro-pensamento.schemas';
import { Badge } from '@/web/components/ui/badge';
import { Slider } from '@/web/components/ui/slider';
import { emocaoMap, emocaoOptions } from '@/web/shared/enum-maps/emocao-map';

export function EmocoesStep() {
  const { control, watch, setValue, formState } = useFormContext<RegistroPensamentoSchema>();
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

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-1 text-lg font-medium">O que você sentiu?</p>
        <p className="text-sm text-muted-foreground">Selecione uma ou mais emoções e ajuste a intensidade.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {emocaoOptions.map((opcao) => {
          const ativa = emocoesSelecionadas.some((item) => item.emocao === opcao.value);
          return (
            <button
              type="button"
              key={opcao.value}
              onClick={() => alternarEmocao(opcao.value)}
              className="rounded-full"
            >
              <Badge variant={ativa ? 'default' : 'outline'} className="h-9 cursor-pointer px-4 text-sm">
                {opcao.label}
              </Badge>
            </button>
          );
        })}
      </div>

      {formState.errors.emocoes?.message && (
        <p className="text-sm text-destructive">{formState.errors.emocoes.message}</p>
      )}

      <div className="flex flex-col gap-4">
        {fields.map((campo, index) => (
          <div key={campo.id} className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between text-sm font-medium">
              <span>{emocaoMap[campo.emocao]}</span>
              <span className="text-muted-foreground">{watch(`emocoes.${index}.intensidade`)}%</span>
            </div>
            <Slider
              value={[watch(`emocoes.${index}.intensidade`)]}
              max={100}
              step={5}
              onValueChange={([valor]) => setValue(`emocoes.${index}.intensidade`, valor)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
