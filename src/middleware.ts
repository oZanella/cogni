import { NextResponse } from 'next/server';

import { auth } from '@/api/lib/auth';
import { PapelUsuario } from '@/api/shared/enums/papel-usuario';

const ROTA_ACESSO_EXPIRADO = '/acesso-expirado';
const ROTA_ADMIN = '/controle-usuarios';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;
  const isAuthRoute = pathname.startsWith('/entrar') || pathname.startsWith('/cadastro');
  const isRotaAcessoExpirado = pathname.startsWith(ROTA_ACESSO_EXPIRADO);

  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL('/entrar', req.nextUrl));
  }

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL('/inicio', req.nextUrl));
  }

  if (isLoggedIn && req.auth?.user) {
    const { acessoExpiraEm, papel } = req.auth.user;
    const acessoExpirado = papel !== PapelUsuario.ADMIN && !!acessoExpiraEm && new Date(acessoExpiraEm) < new Date();

    if (acessoExpirado && !isRotaAcessoExpirado) {
      return NextResponse.redirect(new URL(ROTA_ACESSO_EXPIRADO, req.nextUrl));
    }

    if (!acessoExpirado && isRotaAcessoExpirado) {
      return NextResponse.redirect(new URL('/inicio', req.nextUrl));
    }

    if (pathname.startsWith(ROTA_ADMIN) && papel !== PapelUsuario.ADMIN) {
      return NextResponse.redirect(new URL('/inicio', req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};
