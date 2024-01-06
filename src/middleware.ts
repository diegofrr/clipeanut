import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/users')) {
    console.log('users page');
  }

  NextResponse.next();
}

export const config = {
  matcher: ['/users/:path*']
};
