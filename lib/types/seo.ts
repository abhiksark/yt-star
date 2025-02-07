import type { Metadata } from 'next';

export type ChangeFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RouteConfig {
  path: string;
  priority: number;
  changeFrequency?: ChangeFrequency;
}

export interface SEOMetadataProps {
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
}

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}

export const SEO_CONSTANTS = {
  SITE_NAME: 'BestYoutubeChannels',
  DEFAULT_IMAGE: 'og/default.png',
  SOCIAL: {
    TWITTER_HANDLE: '@bestyoutubechannels',
    LOCALE: 'en_US',
  },
  LIMITS: {
    TITLE_LENGTH: 60,
    DESCRIPTION_LENGTH: 160,
  }
} as const; 