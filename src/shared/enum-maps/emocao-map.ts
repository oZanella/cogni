import { Emocao } from '@/shared/enums/emocao';

export const emocaoMap: Record<Emocao, string> = {
  ANSIEDADE: 'Ansiedade',
  TRISTEZA: 'Tristeza',
  RAIVA: 'Raiva',
  MEDO: 'Medo',
  VERGONHA: 'Vergonha',
  CULPA: 'Culpa',
  FRUSTRACAO: 'Frustração',
  ALEGRIA: 'Alegria',
  OUTRO: 'Outro',
};

export const emocaoOptions = Object.values(Emocao).map((valor) => ({
  value: valor,
  label: emocaoMap[valor],
}));
