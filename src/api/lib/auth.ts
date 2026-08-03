import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { loginSchema } from '@/api/features/auth/schemas/auth.schemas';
import { prisma } from '@/api/lib/prisma';
import type { PapelUsuario } from '@/api/shared/enums/papel-usuario';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  pages: { signIn: '/entrar' },
  providers: [
    Credentials({
      credentials: {
        nomeUsuario: {},
        senha: {},
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const usuario = await prisma.usuario.findUnique({
          where: { nomeUsuario: parsed.data.nomeUsuario.trim().toLowerCase() },
        });
        if (!usuario) return null;

        const senhaValida = await bcrypt.compare(parsed.data.senha, usuario.senha);
        if (!senhaValida) return null;

        // login sempre é permitido; se o acesso estiver expirado, o middleware bloqueia
        // o usuário na primeira navegação, redirecionando para /acesso-expirado
        return {
          id: String(usuario.id),
          name: usuario.nome,
          email: usuario.email,
          papel: usuario.papel,
          acessoExpiraEm: usuario.acessoExpiraEm?.toISOString() ?? null,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.papel = user.papel as PapelUsuario;
        token.acessoExpiraEm = user.acessoExpiraEm;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.papel = token.papel as PapelUsuario;
        session.user.acessoExpiraEm = (token.acessoExpiraEm as string | null | undefined) ?? null;
      }
      return session;
    },
  },
});
