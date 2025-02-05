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

  // Common keywords for all pages
  const commonKeywords = [
    'tech education',
    'programming tutorials',
    'coding education',
    'tech content creators',
    'learn programming',
    'software development',
    'tech youtube channels',
    'programming courses',
    'developer tutorials',
    'tech learning'
  ];

  // Combine and deduplicate keywords
  const allKeywords = Array.from(new Set([...keywords, ...commonKeywords]));

  const baseMetadata: Metadata = {
    metadataBase: new URL(getBaseUrl()),
    title: {
      default: `${formattedTitle} | BestYoutubeChannels`,
      template: '%s | BestYoutubeChannels'
    },
    description: formattedDesc,
    applicationName: 'BestYoutubeChannels',
    authors: authors.map(author => ({ name: author.name, url: author.url })),
    generator: 'Next.js',
    keywords: allKeywords,
    referrer: 'origin-when-cross-origin',
    themeColor: '#ffffff',
    colorScheme: 'dark light',
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
    creator: 'BestYoutubeChannels Team',
    publisher: 'BestYoutubeChannels',
    category,
    classification: 'Education/Technology',
    robots: {
      index: !noindex,
      follow: !noindex,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
        noimageindex: false,
        'notranslate': false,
      },
    },
    openGraph: {
      title: formattedTitle,
      description: formattedDesc,
      url,
      siteName: 'BestYoutubeChannels',
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
      card: 'summary_large_image',
      title: formattedTitle,
      description: formattedDesc,
      images: [imageUrl],
      creator: '@bestyoutubechannels',
      site: '@bestyoutubechannels',
    },
    alternates: {
      canonical: url,
      languages: {
        'x-default': url,
        ...alternateLanguages,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
      other: {
        'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
      },
      me: ['https://twitter.com/bestyoutubechannels'],
    },
    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'msapplication-TileColor': '#ffffff',
      'msapplication-config': '/browserconfig.xml',
      'theme-color': '#ffffff',
      rating,
    },
  };

  return baseMetadata;
}

export { getBaseUrl }