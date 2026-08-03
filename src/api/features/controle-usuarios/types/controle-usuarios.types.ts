import type { PapelUsuario } from '@/api/shared/enums/papel-usuario';

export type UsuarioAdmin = {
  id: number;
  nome: string;
  email: string;
  papel: PapelUsuario;
  acessoExpiraEm: Date | null;
  createdAt: Date;
};
