'use client';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// URLs that should redirect to their canonical versions
const CANONICAL_REDIRECTS = new Map([
  ['/index', '/'],
  ['/index.html', '/'],
  ['/home', '/'],
  ['/blog/index', '/blog'],
  ['/categories/index', '/categories'],
  ['/creator', '/creators'],
  ['/category', '/categories'],
  ['/articles', '/blog'],
  ['/posts', '/blog'],
]);

// URLs that should be excluded from trailing slash normalization
const EXCLUDE_TRAILING_SLASH_NORM = [
  '/_next',
  '/api',
  '/static',
];

function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const currentPath = url.pathname;

  // Normalize multiple slashes in URL
  if (currentPath.includes('//')) {
    url.pathname = currentPath.replace(/\/+/g, '/');
    return NextResponse.redirect(url, 301);
  }

  // Check if path should be excluded from processing
  if (EXCLUDE_TRAILING_SLASH_NORM.some(prefix => currentPath.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Handle index.html and trailing index
  if (currentPath.endsWith('index.html') || currentPath.endsWith('/index')) {
    url.pathname = currentPath.replace(/(\/index)?\.html$|\/index$/, '');
    return NextResponse.redirect(url, 301);
  }

  // Handle canonical redirects
  const canonicalPath = CANONICAL_REDIRECTS.get(currentPath.toLowerCase());
  if (canonicalPath) {
    url.pathname = canonicalPath;
    return NextResponse.redirect(url, 301);
  }

  // Normalize trailing slashes
  if (currentPath !== '/' && currentPath.endsWith('/')) {
    url.pathname = currentPath.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  // Handle uppercase URLs
  if (currentPath !== currentPath.toLowerCase()) {
    url.pathname = currentPath.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  // Handle common misspellings and redirects
  if (currentPath.includes('youtube') && !currentPath.includes('youtubechannels')) {
    url.pathname = currentPath.replace('youtube', 'youtubechannels');
    return NextResponse.redirect(url, 301);
  }

  // Handle www subdomain
  if (request.headers.get('host')?.startsWith('www.')) {
    url.host = url.host.replace(/^www\./, '');
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

const config = {
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

export { middleware, config };