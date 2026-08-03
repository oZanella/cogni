export const controleUsuariosKeys = {
  all: ['controle-usuarios'] as const,
  list: () => [...controleUsuariosKeys.all, 'lista'] as const,
};
