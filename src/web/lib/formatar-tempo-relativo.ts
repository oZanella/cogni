import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
} from 'date-fns';

function unidade(valor: number, singular: string, plural: string) {
  return `há ${valor} ${valor === 1 ? singular : plural}`;
}

export function formatarTempoRelativo(data: Date | string | number): string {
  const referencia = new Date(data);
  const agora = new Date();

  const minutos = differenceInMinutes(agora, referencia);
  if (minutos < 1) return 'agora mesmo';
  if (minutos < 60) return unidade(minutos, 'minuto', 'minutos');

  const horas = differenceInHours(agora, referencia);
  if (horas < 24) return unidade(horas, 'hora', 'horas');

  const dias = differenceInDays(agora, referencia);
  if (dias < 7) return unidade(dias, 'dia', 'dias');

  const semanas = differenceInWeeks(agora, referencia);
  if (semanas < 5) return unidade(semanas, 'semana', 'semanas');

  const meses = differenceInMonths(agora, referencia);
  if (meses < 12) return unidade(meses, 'mês', 'meses');

  const anos = differenceInYears(agora, referencia);
  return unidade(anos, 'ano', 'anos');
}
