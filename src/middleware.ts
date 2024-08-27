import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for certain paths
  if (
    pathname.startsWith('/_next/') || 
    pathname.startsWith('/favicon.ico') || 
    pathname.startsWith('/api/')
  ) {
    return NextResponse.next();
  }

  // Allow access to sign-in and sign-up pages regardless of token status
  if (pathname.startsWith('/account/sign-in') || pathname.startsWith('/account/sign-up') || pathname.startsWith("/api/api-doc") || pathname.startsWith("/account/password/reset") || pathname.startsWith('/account/verify')) {
    const response = NextResponse.next();
    response.headers.set("x-current-path", pathname);
    return response; // Allow access to these routes
  }

  // Check for token in cookies
  const token = request.cookies.get('accessToken')?.value;
  if (!token) {
    const response = NextResponse.redirect(new URL('/account/sign-in', request.url)); // Redirect if no token
    response.headers.set("x-current-path", pathname);
    return response;
  }

  try {
    // Verify the token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // If user is not verified, redirect to /not-verified page
    if (!payload.isVerified) {
      const response = NextResponse.redirect(new URL('/account/sign-in', request.url)); //TODO : make not-verified page
      response.headers.set("x-current-path", pathname);
      return response;
    }

    // If the user is authenticated, continue with the request
    const response = NextResponse.next();
    response.headers.set("x-current-path", pathname);
    return response;

  } catch (error) {
    console.error('JWT verification error:', error);
    const response = NextResponse.redirect(new URL('/account/sign-in', request.url)); // Redirect if token is invalid
    response.headers.set("x-current-path", pathname);
    return response;
  }
}

// Match all routes
export const config = {
  matcher: ['/:path*'],
};