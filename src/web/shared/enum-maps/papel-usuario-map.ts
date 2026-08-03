import type { PapelUsuario } from '@/api/shared/enums/papel-usuario';

export const papelUsuarioMap: Record<PapelUsuario, string> = {
  ADMIN: 'Administrador',
  PACIENTE: 'Paciente',
};
