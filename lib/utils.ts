import type { Metadata } from 'next';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
  // Remove leading and trailing slashes, then join with base URL
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
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
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: { name: string; url?: string }[];
  section?: string;
}): Metadata & { openGraph: NonNullable<Metadata['openGraph']> } {
  const url = getCanonicalUrl(path);
  const imageUrl = getCanonicalUrl(image);
  const formattedTitle = title.length > 60 ? `${title.slice(0, 57)}...` : title;
  const formattedDesc = description.length > 160 ? `${description.slice(0, 157)}...` : description;

  const baseMetadata = {
    title: `${formattedTitle} | BestYoutubeChannels`,
    description: formattedDesc,
    keywords: [
      ...keywords,
      'tech education',
      'programming tutorials',
      'coding education',
      'tech content creators',
      'learn programming',
      'software development',
    ],
    authors: authors.map(author => ({ name: author.name, url: author.url })),
  };

  return {
    ...baseMetadata,
    openGraph: {
      title: formattedTitle,
      description: formattedDesc,
      url,
      siteName: 'BestYoutubeChannels',
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: formattedTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: formattedTitle,
      description: formattedDesc,
      images: [imageUrl],
      creator: '@bestyoutubechannels',
      site: '@bestyoutubechannels',
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export { getBaseUrl }