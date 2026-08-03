import type { PapelUsuario } from '@/api/shared/enums/papel-usuario';

import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    papel?: PapelUsuario;
    acessoExpiraEm?: string | null;
  }

  interface Session {
    user: {
      id: string;
      papel: PapelUsuario;
      acessoExpiraEm: string | null;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    papel?: PapelUsuario;
    acessoExpiraEm?: string | null;
  }
}
