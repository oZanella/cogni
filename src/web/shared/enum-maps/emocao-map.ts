import { Emocao } from '@/api/shared/enums/emocao';

export const emocaoMap: Record<Emocao, string> = {
  ANSIEDADE: 'Ansiedade',
  TRISTEZA: 'Tristeza',
  RAIVA: 'Raiva',
  MEDO: 'Medo',
  VERGONHA: 'Vergonha',
  CULPA: 'Culpa',
  FRUSTRACAO: 'Frustração',
  ALEGRIA: 'Alegria',
  CANSACO: 'Cansaço',
  EXAUSTAO: 'Exaustão',
  SOLIDAO: 'Solidão',
  CONFUSAO: 'Confusão',
  ESPERANCA: 'Esperança',
  CALMA: 'Calma',
  OUTRO: 'Outro',
};

export const emocaoOptions = Object.values(Emocao).map((valor) => ({
  value: valor,
  label: emocaoMap[valor],
}));
