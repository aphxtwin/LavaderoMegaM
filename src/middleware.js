import { NextResponse } from 'next/server';
import { verifyAuth } from './lib/auth';

export default async function middleware(req) {
  const token = req.cookies.get('user-token')?.value;
  const { origin } = req.nextUrl;
  const verifiedToken = token
    && (await verifyAuth(token).catch((err) => NextResponse.error(`Ocurrio un error: ${err.message}`, 500)));
  if (req.nextUrl.pathname.startsWith('/dashboard') && !verifiedToken) {
    return NextResponse.redirect(origin);
  }

  if (req.nextUrl.pathname === '/' && verifiedToken) {
    return NextResponse.redirect(`${origin}/dashboard`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/'],
};
