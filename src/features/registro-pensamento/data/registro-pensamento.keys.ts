export const registroPensamentoKeys = {
  all: ['registros-pensamento'] as const,
  list: (limite?: number) => [...registroPensamentoKeys.all, { limite: limite ?? 'todos' }] as const,
};
