import type { Metadata } from 'next';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SEO_CONSTANTS, type SEOMetadataProps } from './types/seo';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestyoutubechannels.com';
}

export function getCanonicalUrl(path: string = '', forceTrailingSlash: boolean = false): string {
  // Remove www. from base URL to match middleware redirect
  const baseUrl = getBaseUrl().replace(/^www\./, '').replace(/\/$/, '');
  
  // Clean the path: remove leading/trailing slashes and normalize multiple slashes
  const cleanPath = path.replace(/^\/+|\/+$/g, '').replace(/\/+/g, '/');
  
  // Add trailing slash if:
  // 1. It's explicitly requested via forceTrailingSlash
  // 2. The path exists (not homepage)
  // 3. The path doesn't end with a file extension
  // 4. The path is for a dynamic route (creators/, countries/, categories/, blog/)
  const isDynamicRoute = /^(creators|countries|categories|blog)\//.test(cleanPath);
  const shouldAddTrailingSlash = (forceTrailingSlash || isDynamicRoute || cleanPath) && 
    !cleanPath.match(/\.[a-zA-Z0-9]+$/);
  
  const finalPath = cleanPath && shouldAddTrailingSlash ? `${cleanPath}/` : cleanPath;
  
  // Combine and return
  return cleanPath ? `${baseUrl}/${finalPath}` : baseUrl;
}

function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
}

export function generateSEOMetadata({
  title,
  description,
  path,
  type = 'website',
  image = SEO_CONSTANTS.DEFAULT_IMAGE,
  keywords = [],
  publishedTime,
  modifiedTime,
  authors = [],
  section,
}: SEOMetadataProps): Metadata {
  // Always use trailing slashes for canonical URLs
  const url = getCanonicalUrl(path, true);
  const imageUrl = getCanonicalUrl(image);
  const formattedTitle = truncateText(title, SEO_CONSTANTS.LIMITS.TITLE_LENGTH);
  const formattedDesc = truncateText(description, SEO_CONSTANTS.LIMITS.DESCRIPTION_LENGTH);

  const metadata: Metadata = {
    title: `${formattedTitle} | ${SEO_CONSTANTS.SITE_NAME}`,
    description: formattedDesc,
    keywords,
    authors: authors.map(author => ({ name: author.name, url: author.url })),
    alternates: { 
      canonical: url,
      // Add non-www version as canonical
      ...(url.startsWith('www.') && {
        canonical: url.replace(/^www\./, '')
      })
    },
    openGraph: {
      title: formattedTitle,
      description: formattedDesc,
      url,
      siteName: SEO_CONSTANTS.SITE_NAME,
      type,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: formattedTitle,
      }],
      locale: SEO_CONSTANTS.SOCIAL.LOCALE,
    },
    twitter: {
      card: 'summary_large_image',
      title: formattedTitle,
      description: formattedDesc,
      images: [imageUrl],
      creator: SEO_CONSTANTS.SOCIAL.TWITTER_HANDLE,
      site: SEO_CONSTANTS.SOCIAL.TWITTER_HANDLE,
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      nocache: false,
    }
  };

  // Add optional metadata
  if (publishedTime) metadata.openGraph!.publishedTime = publishedTime;
  if (modifiedTime) metadata.openGraph!.modifiedTime = modifiedTime;
  if (section) metadata.openGraph!.section = section;

  return metadata;
}