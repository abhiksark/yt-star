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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestyoutubechannels.com';
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
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  keywords?: string[];
}) {
  const url = getCanonicalUrl(path);
  const imageUrl = getCanonicalUrl(image);
  const formattedTitle = title.length > 60 ? `${title.slice(0, 57)}...` : title;
  const formattedDesc = description.length > 160 ? `${description.slice(0, 157)}...` : description;

  return {
    title: `${formattedTitle} | Best Tech Education Platform`,
    description: formattedDesc,
    keywords: [
      ...keywords,
      'tech education',
      'programming tutorials',
      'coding tutorials',
      'tech content creators',
      'learn programming',
      'software development tutorials',
    ],
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestyoutubechannels.com'),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'BestYoutubeChannels',
      type,
      locale: 'en_US',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@bestyoutubechannels',
      site: '@bestyoutubechannels',
    },
    robots: {
      index: true,
      follow: true,
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