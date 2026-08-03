export const PapelUsuario = {
  ADMIN: 'ADMIN',
  PACIENTE: 'PACIENTE',
} as const;

export type PapelUsuario = (typeof PapelUsuario)[keyof typeof PapelUsuario];
