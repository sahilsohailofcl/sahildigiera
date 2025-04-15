import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { UserRole } from '@prisma/client';

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  
  // Public routes
  const publicRoutes = ['/', '/login', '/signup', '/pricing'];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Get the session token
  const token = await getToken({ req });
  
  // Redirect to login if not authenticated
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Admin route protection
  if (pathname.startsWith('/admin') && token.role !== UserRole.ADMIN) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Client route protection
  if (pathname.startsWith('/dashboard') && token.role !== UserRole.CLIENT) {
    return NextResponse.redirect(
      token.role === UserRole.ADMIN
        ? new URL('/admin/dashboard', req.url)
        : new URL('/login', req.url)
    );
  }

  // Check subscription/trial status for protected routes
  const protectedRoutes = ['/dashboard', '/account'];
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const hasActiveSubscription = token.subscription?.status === 'active';
    const isInTrial = token.trialEndsAt && new Date(token.trialEndsAt) > new Date();

    if (!hasActiveSubscription && !isInTrial) {
      return NextResponse.redirect(new URL('/pricing', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/account/:path*',
    '/pricing',
  ],
<<<<<<< HEAD
};
=======
};
>>>>>>> b340d51e6ab5dacdae3b8772f23743a3ab801c2c
