import type { Metadata } from 'next';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DEFAULT_METADATA, COMMON_KEYWORDS } from './seo-config';

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

export function getCanonicalUrl(path: string = ''): string {
  const baseUrl = getBaseUrl();
  // Remove leading/trailing slashes and normalize multiple slashes
  const cleanPath = path.replace(/^\/+|\/+$/g, '').replace(/\/+/g, '/');
  return cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
}

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
  
  // Ensure title and description are within optimal lengths
  const formattedTitle = title.length > 60 ? `${title.slice(0, 57)}...` : title;
  const formattedDesc = description.length > 160 ? `${description.slice(0, 157)}...` : description;

  // Combine and deduplicate keywords
  const allKeywords = Array.from(new Set([...keywords, ...COMMON_KEYWORDS]));

  const metadata: Metadata = {
    ...DEFAULT_METADATA,
    title: {
      default: `${formattedTitle} | BestYoutubeChannels`,
      template: '%s | BestYoutubeChannels'
    },
    description: formattedDesc,
    keywords: allKeywords,
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