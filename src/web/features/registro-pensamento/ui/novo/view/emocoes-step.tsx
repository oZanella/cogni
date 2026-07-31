'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';

import type { RegistroPensamentoSchema } from '@/api/features/registro-pensamento/schemas/registro-pensamento.schemas';
import { Emocao } from '@/api/shared/enums/emocao';
import { Badge } from '@/web/components/ui/badge';
import { Slider } from '@/web/components/ui/slider';
import { emocaoMap, emocaoOptions } from '@/web/shared/enum-maps/emocao-map';

const EMOCOES_POSITIVAS: Emocao[] = [Emocao.ESPERANCA, Emocao.ALEGRIA, Emocao.CALMA];

function emojiIntensidade(emocao: Emocao, intensidade: number) {
  if (emocao === Emocao.OUTRO) return '😐';

  if (EMOCOES_POSITIVAS.includes(emocao)) {
    if (intensidade <= 20) return '🙂';
    if (intensidade <= 40) return '😊';
    if (intensidade <= 60) return '😄';
    if (intensidade <= 80) return '😁';
    return '🤩';
  }

  if (intensidade <= 20) return '😌';
  if (intensidade <= 40) return '🙂';
  if (intensidade <= 60) return '😐';
  if (intensidade <= 80) return '😟';
  return '😰';
}

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
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div className="shrink-0">
        <p className="mb-1 text-lg font-medium">O que você sentiu?</p>
        <p className="text-sm text-muted-foreground">Selecione uma ou mais emoções.</p>
      </div>

      <div className="grid shrink-0 grid-cols-3 gap-2">
        {emocaoOptions.map((opcao) => {
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
        })}
      </div>

      {formState.errors.emocoes?.message && (
        <p className="shrink-0 text-sm text-destructive">{formState.errors.emocoes.message}</p>
      )}

      <div className="scrollbar-fina flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1">
        {fields.map((campo, index) => (
          <div key={campo.id} className="flex shrink-0 flex-col gap-2 rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between text-sm font-medium">
              <span>
                {emocaoMap[campo.emocao]} {emojiIntensidade(campo.emocao, watch(`emocoes.${index}.intensidade`))}
              </span>
              <span className="text-muted-foreground">{watch(`emocoes.${index}.intensidade`)}%</span>
            </div>
            <Slider
              value={[watch(`emocoes.${index}.intensidade`)]}
              max={100}
              step={5}
              onValueChange={([valor]) => setValue(`emocoes.${index}.intensidade`, valor)}
            />
            <div className="flex justify-between text-xs font-bold">
              <span>-</span>
              <span>+</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
