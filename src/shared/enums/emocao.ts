export const Emocao = {
  ANSIEDADE: 'ANSIEDADE',
  TRISTEZA: 'TRISTEZA',
  RAIVA: 'RAIVA',
  MEDO: 'MEDO',
  VERGONHA: 'VERGONHA',
  CULPA: 'CULPA',
  FRUSTRACAO: 'FRUSTRACAO',
  ALEGRIA: 'ALEGRIA',
  OUTRO: 'OUTRO',
} as const;

export type Emocao = (typeof Emocao)[keyof typeof Emocao];
