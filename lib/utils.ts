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

export function getCanonicalUrl(path: string = ''): string {
  const baseUrl = getBaseUrl().replace(/\/$/, '');
  const cleanPath = path.replace(/^\/+|\/+$/g, '').replace(/\/+/g, '/');
  return cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
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
  const url = getCanonicalUrl(path);
  const imageUrl = getCanonicalUrl(image);
  const formattedTitle = truncateText(title, SEO_CONSTANTS.LIMITS.TITLE_LENGTH);
  const formattedDesc = truncateText(description, SEO_CONSTANTS.LIMITS.DESCRIPTION_LENGTH);

  const metadata: Metadata = {
    title: `${formattedTitle} | ${SEO_CONSTANTS.SITE_NAME}`,
    description: formattedDesc,
    keywords,
    authors: authors.map(author => ({ name: author.name, url: author.url })),
    alternates: { canonical: url },
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
    }
  };

  // Add optional metadata
  if (publishedTime) metadata.openGraph!.publishedTime = publishedTime;
  if (modifiedTime) metadata.openGraph!.modifiedTime = modifiedTime;
  if (section) metadata.openGraph!.section = section;

  return metadata;
}