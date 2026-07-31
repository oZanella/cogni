export const registroPensamentoKeys = {
  all: ['registros-pensamento'] as const,
  list: (limite?: number) => [...registroPensamentoKeys.all, { limite: limite ?? 'todos' }] as const,
  detail: (id: number) => [...registroPensamentoKeys.all, 'detalhe', id] as const,
  existe: () => [...registroPensamentoKeys.all, 'existe'] as const,
};
