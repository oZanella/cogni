import type { Emocao } from '@/shared/enums/emocao';

export type RegistroPensamentoEmocao = {
  emocao: Emocao;
  intensidade: number;
};

export type RegistroPensamento = {
  id: number;
  situacao: string;
  pensamento: string;
  createdAt: Date;
  emocoes: RegistroPensamentoEmocao[];
};
