import { NextResponse } from 'next/server';

import { auth } from '@/api/lib/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthRoute = req.nextUrl.pathname.startsWith('/entrar') || req.nextUrl.pathname.startsWith('/cadastro');

  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL('/entrar', req.nextUrl));
  }

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL('/inicio', req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};
