import { Emocao } from '@/api/shared/enums/emocao';

export const emocaoMap: Record<Emocao, string> = {
  GRATIDAO: 'Gratidão',
  EMPOLGACAO: 'Empolgação',
  ORGULHO: 'Orgulho',
  SATISFACAO: 'Satisfação',
  ALIVIO: 'Alívio',
  AMOR: 'Amor',
  CONFIANCA: 'Confiança',
  ENTUSIASMO: 'Entusiasmo',
  ALEGRIA: 'Alegria',
  ESPERANCA: 'Esperança',
  CALMA: 'Calma',
  ANSIEDADE: 'Ansiedade',
  TRISTEZA: 'Tristeza',
  RAIVA: 'Raiva',
  MEDO: 'Medo',
  VERGONHA: 'Vergonha',
  CULPA: 'Culpa',
  FRUSTRACAO: 'Frustração',
  CANSACO: 'Cansaço',
  EXAUSTAO: 'Exaustão',
  SOLIDAO: 'Solidão',
  CONFUSAO: 'Confusão',
  OUTRO: 'Outro',
};

/** Emoções de valência positiva — exibidas na coluna esquerda do seletor. */
export const EMOCOES_POSITIVAS: Emocao[] = [
  Emocao.GRATIDAO,
  Emocao.EMPOLGACAO,
  Emocao.ORGULHO,
  Emocao.SATISFACAO,
  Emocao.ALIVIO,
  Emocao.AMOR,
  Emocao.CONFIANCA,
  Emocao.ENTUSIASMO,
  Emocao.ALEGRIA,
  Emocao.ESPERANCA,
  Emocao.CALMA,
];

/** Emoções de valência negativa — exibidas na coluna direita do seletor. */
export const EMOCOES_NEGATIVAS: Emocao[] = [
  Emocao.ANSIEDADE,
  Emocao.TRISTEZA,
  Emocao.RAIVA,
  Emocao.MEDO,
  Emocao.VERGONHA,
  Emocao.CULPA,
  Emocao.FRUSTRACAO,
  Emocao.CANSACO,
  Emocao.EXAUSTAO,
  Emocao.SOLIDAO,
  Emocao.CONFUSAO,
];

export const emocaoOptions = Object.values(Emocao).map((valor) => ({
  value: valor,
  label: emocaoMap[valor],
}));

export const emocaoOptionsPositivas = EMOCOES_POSITIVAS.map((valor) => ({
  value: valor,
  label: emocaoMap[valor],
}));

export const emocaoOptionsNegativas = EMOCOES_NEGATIVAS.map((valor) => ({
  value: valor,
  label: emocaoMap[valor],
}));
