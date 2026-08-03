'use client';

import { useFormContext } from 'react-hook-form';

import type { RegistroPensamentoSchema } from '@/api/features/registro-pensamento/schemas/registro-pensamento.schemas';
import type { Emocao } from '@/api/shared/enums/emocao';
import { Slider } from '@/web/components/ui/slider';
import { emocaoMap, EMOCOES_POSITIVAS } from '@/web/shared/enum-maps/emocao-map';

function emojiIntensidade(emocao: Emocao, intensidade: number) {
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

export function IntensidadeStep() {
  const { watch, setValue } = useFormContext<RegistroPensamentoSchema>();
  const emocoesSelecionadas = watch('emocoes');

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div className="shrink-0">
        <p className="mb-1 text-lg font-medium">Qual a intensidade?</p>
        <p className="text-sm text-muted-foreground">Ajuste o quanto você sentiu cada emoção selecionada.</p>
      </div>

      <div className="scrollbar-fina flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {emocoesSelecionadas.map((campo, index) => (
          <div key={campo.emocao} className="flex shrink-0 flex-col gap-2 rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between text-sm font-medium">
              <span>
                {emocaoMap[campo.emocao]} {emojiIntensidade(campo.emocao, campo.intensidade)}
              </span>
              <span className="text-muted-foreground">{campo.intensidade}%</span>
            </div>
            <Slider
              value={[campo.intensidade]}
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
