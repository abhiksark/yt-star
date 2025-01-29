import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// URLs that should redirect to their canonical versions
const CANONICAL_REDIRECTS = new Map([
  ['/index', '/'],
  ['/index.html', '/'],
  ['/home', '/'],
  ['/blog/index', '/blog'],
  ['/categories/index', '/categories'],
]);

// URLs that should be excluded from trailing slash normalization
const EXCLUDE_TRAILING_SLASH_NORM = [
  '/_next',
  '/api',
  '/static',
];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Check if path should be excluded from processing
  if (EXCLUDE_TRAILING_SLASH_NORM.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Handle canonical redirects
  const canonicalPath = CANONICAL_REDIRECTS.get(pathname.toLowerCase());
  if (canonicalPath) {
    url.pathname = canonicalPath;
    return NextResponse.redirect(url, 301);
  }

  // Normalize trailing slashes
  if (pathname !== '/' && pathname.endsWith('/')) {
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  // Handle uppercase URLs
  if (pathname !== pathname.toLowerCase()) {
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. Static files (e.g. /favicon.ico, /sitemap.xml)
    */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};