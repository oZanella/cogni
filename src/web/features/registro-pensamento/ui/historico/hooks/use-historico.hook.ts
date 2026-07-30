'use client';

import { format, isToday, isYesterday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import type { RegistroPensamento } from '@/api/features/registro-pensamento/types/registro-pensamento.types';
import { useRegistrosPensamento } from '@/web/features/registro-pensamento/data/hooks/use-registros-pensamento.query';

function rotuloDoDia(data: Date) {
  if (isToday(data)) return 'Hoje';
  if (isYesterday(data)) return 'Ontem';
  return format(data, "d 'de' MMMM", { locale: ptBR });
}

export function useHistorico() {
  const { data: registros, isLoading } = useRegistrosPensamento();

  const grupos = (registros ?? []).reduce<{ rotulo: string; registros: RegistroPensamento[] }[]>(
    (acumulado, registro) => {
      const rotulo = rotuloDoDia(registro.createdAt);
      const grupoExistente = acumulado.find((grupo) => grupo.rotulo === rotulo);

      if (grupoExistente) {
        grupoExistente.registros.push(registro);
      } else {
        acumulado.push({ rotulo, registros: [registro] });
      }

      return acumulado;
    },
    []
  );

  return { grupos, isLoading, vazio: !isLoading && (registros ?? []).length === 0 };
}
