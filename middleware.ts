'use client';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { countryNames } from '@/lib/countries';

// URLs that should redirect to their canonical versions
const CANONICAL_REDIRECTS = new Map([
  ['/index', '/'],
  ['/index.html', '/'],
  ['/home', '/'],
  ['/blog/index', '/blog/'],
  ['/categories/index', '/categories/'],
  ['/countries/index', '/countries/'],
  ['/creator', '/creators/'],
  ['/category', '/categories/'],
  ['/articles', '/blog/'],
  ['/posts', '/blog/'],
]);

// URLs that should be excluded from normalization
const EXCLUDE_NORM = [
  '/_next',
  '/api',
  '/static',
  '/sitemap.xml',
  '/robots.txt',
  '/favicon.ico',
  '/manifest.json',
  '/feed.xml',
  '/.well-known',
  '/browserconfig.xml',
  '/site.webmanifest',
];

// Handle legacy country code URLs
const COUNTRY_CODE_PATTERN = /^\/countries\/([a-z]{2})\/?$/i;

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const currentPath = url.pathname;

  // Skip processing for excluded paths
  if (EXCLUDE_NORM.some(prefix => currentPath.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Handle legacy country code URLs
  const countryMatch = currentPath.match(COUNTRY_CODE_PATTERN);
  if (countryMatch) {
    const countryCode = countryMatch[1].toUpperCase();
    const countryName = countryNames[countryCode];
    if (countryName) {
      url.pathname = `/countries/${countryName.toLowerCase().replace(/\s+/g, '-')}/`;
      return NextResponse.redirect(url, 308);
    }
  }

  // Normalize multiple slashes in URL
  if (currentPath.includes('//')) {
    url.pathname = currentPath.replace(/\/+/g, '/');
    return NextResponse.redirect(url, 308);
  }

  // Handle canonical redirects
  const canonicalPath = CANONICAL_REDIRECTS.get(currentPath.toLowerCase());
  if (canonicalPath) {
    url.pathname = canonicalPath;
    return NextResponse.redirect(url, 308);
  }

  // Add trailing slash if missing (except for root path and static files)
  if (currentPath !== '/' && 
      !currentPath.endsWith('/') && 
      !currentPath.match(/\.[a-zA-Z0-9]+$/)) {
    url.pathname = `${currentPath}/`;
    return NextResponse.redirect(url, 308);
  }

  // Handle uppercase URLs
  if (currentPath !== currentPath.toLowerCase()) {
    url.pathname = currentPath.toLowerCase();
    return NextResponse.redirect(url, 308);
  }

  // Handle www subdomain - redirect to non-www
  if (request.headers.get('host')?.startsWith('www.')) {
    url.host = url.host.replace(/^www\./, '');
    return NextResponse.redirect(url, 301);
  }

  // Handle common misspellings and redirects
  if (currentPath.includes('youtube') && !currentPath.includes('youtubechannels')) {
    url.pathname = currentPath.replace('youtube', 'youtubechannels');
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
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};