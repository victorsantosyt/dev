import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  const isPublicRoute = request.nextUrl.pathname.startsWith('/login');
  const isProtected = !isPublicRoute && !token;

  if (isProtected) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}