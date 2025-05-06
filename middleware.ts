import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAuth = !!token;
  const isAuthPage = req.nextUrl.pathname.startsWith('/api/auth') || req.nextUrl.pathname === '/login';

  if (!isAuth && !isAuthPage) {
    const loginUrl = new URL('/api/auth/signin', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}


export const config = {
    matcher: ['/((?!_next|api/auth|favicon.ico|.*\\..*).*)'],
  };
  