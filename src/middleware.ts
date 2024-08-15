import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith('/_next/') || 
    pathname.startsWith('/favicon.ico') || 
    pathname.startsWith('/api/')
  ) {
    return NextResponse.next();
  }

  // Allow access to sign-in and sign-up pages regardless of token status
  if (pathname.startsWith('/account/sign-in') || pathname.startsWith('/account/sign-up')) {
    return NextResponse.next(); // Allow access to these routes
  }

  // Check for token in cookies
  const token = request.cookies.get('accessToken')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/account/sign-in', request.url)); // Redirect if no token
  }

  console.log(token);
  

  try {
    // Verify the token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    console.log(payload);

    //  // If the user is authenticated, prevent access to sign-in and sign-up pages
    //  if (pathname.startsWith('/account/sign-in') || pathname.startsWith('/account/sign-up')) {
    //     return NextResponse.redirect(new URL('/dashboard', request.url)); // Redirect to dashboard if already authenticated
    //   }
    

    // If user is not verified, redirect to /not-verified page
    if (!payload.isVerified) {
      return NextResponse.redirect(new URL('/account/sign-in', request.url)); //TODO : make not-verified page
    }

    // Allow the user to proceed to the requested route if they are verified
    return NextResponse.next();

  } catch (error) {
    console.error('JWT verification error:', error);
    return NextResponse.redirect(new URL('/account/sign-in', request.url)); // Redirect if token is invalid
  }
}

// Match all routes except static files, API routes, and account-related routes
export const config = {
  matcher: ['/:path*'],
};