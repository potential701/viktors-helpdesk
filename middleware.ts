import {NextRequest, NextResponse} from 'next/server';
import axios from 'axios';
import {cookies} from 'next/headers';

const unauthenticatedRoutes = ['/auth/login', '/auth/register']

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const auth_token = cookieStore.get('auth_token');

  try {
    await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/api/verify?token=' + auth_token?.value)

    if (unauthenticatedRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  } catch {
    if (!unauthenticatedRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}