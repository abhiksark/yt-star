import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getCanonicalUrl(path: string = ''): string {
  const baseUrl = 'https://www.bestyoutubechannels.com';
  // Remove leading and trailing slashes, then join with base URL
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  return cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
}

interface OpenGraphMetadata {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
}

export function generateMetadata({
  title,
  description,
  path,
  type = 'website',
  image,
}: OpenGraphMetadata) {
  const defaultImage = {
    url: getCanonicalUrl('og/default.png'),
    width: 1200,
    height: 630,
    alt: 'BestYoutubeChannels - Tech Education Discovery Platform',
  };

  const ogImage = image || defaultImage;

  return {
    title,
    description,
    alternates: {
      canonical: getCanonicalUrl(path),
    },
    openGraph: {
      title,
      description,
      type,
      url: getCanonicalUrl(path),
      siteName: 'BestYoutubeChannels',
      locale: 'en_US',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
      creator: '@bestyoutubechannels',
      site: '@bestyoutubechannels',
    },
  };
}