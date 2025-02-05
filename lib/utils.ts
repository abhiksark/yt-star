import { type Metadata } from 'next';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DEFAULT_METADATA, COMMON_KEYWORDS, SEO_METRICS } from './seo-config';

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

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestyoutubechannels.com';
}

// URL normalization utilities
export function normalizeUrl(url: string): string {
  return url
    .toLowerCase()
    .trim()
    .replace(/([^:]\/)\/+/g, '$1') // Remove duplicate slashes except after protocol
    .replace(/\/$/, ''); // Remove trailing slash
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getCanonicalUrl(path: string = ''): string {
  const baseUrl = getBaseUrl();
  const cleanPath = path.replace(/^\/+|\/+$/g, '').replace(/\/+/g, '/');
  const fullUrl = cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
  return normalizeUrl(fullUrl);
}

// SEO validation utilities
export function validateTitle(title: string): boolean {
  return title.length <= SEO_METRICS.maxTitleLength;
}

export function validateDescription(description: string): boolean {
  return description.length <= SEO_METRICS.maxDescriptionLength;
}

export function validateKeywords(keywords: string[]): boolean {
  return keywords.length <= SEO_METRICS.maxKeywords;
}

export function validateUrl(url: string): boolean {
  return url.length <= SEO_METRICS.maxUrlLength && isValidUrl(url);
}

export function validateStructuredData(data: any): boolean {
  try {
    // Basic validation
    if (!data['@context'] || !data['@type']) {
      return false;
    }
    // Check if JSON-LD is valid
    JSON.stringify(data);
    return true;
  } catch {
    return false;
  }
}

// SEO metadata generator with validation
export function generateSEOMetadata({
  title,
  description,
  path,
  type = 'website',
  image = 'og/default.png',
  keywords = [],
  publishedTime,
  modifiedTime,
  authors = [],
  section,
  locale = 'en_US',
  alternateLanguages = {},
  noindex = false,
  rating = 'general',
  category = 'Technology',
  tags = [],
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: { name: string; url?: string }[];
  section?: string;
  locale?: string;
  alternateLanguages?: Record<string, string>;
  noindex?: boolean;
  rating?: string;
  category?: string;
  tags?: string[];
}): Metadata {
  const url = getCanonicalUrl(path);
  const imageUrl = getCanonicalUrl(image);
  
  // Validate and format title and description
  const formattedTitle = validateTitle(title) ? title : title.slice(0, SEO_METRICS.maxTitleLength - 3) + '...';
  const formattedDesc = validateDescription(description) ? description : description.slice(0, SEO_METRICS.maxDescriptionLength - 3) + '...';

  // Validate and limit keywords
  const validatedKeywords = Array.from(
    new Set([...keywords, ...COMMON_KEYWORDS])
  ).slice(0, SEO_METRICS.maxKeywords);

  const metadata: Metadata = {
    ...DEFAULT_METADATA,
    title: {
      default: `${formattedTitle} | BestYoutubeChannels`,
      template: '%s | BestYoutubeChannels'
    },
    description: formattedDesc,
    keywords: validatedKeywords,
    authors: authors.length > 0 ? authors.map(author => ({ name: author.name, url: author.url })) : DEFAULT_METADATA.authors,
    category,
    openGraph: {
      ...DEFAULT_METADATA.openGraph,
      title: formattedTitle,
      description: formattedDesc,
      url,
      type,
      locale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: formattedTitle,
          type: 'image/png',
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      tags,
    },
    twitter: {
      ...DEFAULT_METADATA.twitter,
      title: formattedTitle,
      description: formattedDesc,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
      languages: {
        'x-default': url,
        ...alternateLanguages,
      },
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      }
    }
  };

  return metadata;
}

export { getBaseUrl }