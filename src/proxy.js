import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Redirect root /admin and /admin/dashboard to /admin/posts to prevent 404
  if (pathname === '/admin' || pathname === '/admin/dashboard') {
    return NextResponse.redirect(new URL('/admin/posts', request.url));
  }

  // Proxy / pass-through for now, bypassing authentication for everything else
  return NextResponse.next();
}

// Ensure middleware only runs on necessary paths to save execution time
export const config = {
  matcher: ['/admin/:path*'],
};
