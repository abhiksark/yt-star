import { MetadataRoute } from 'next';
import { channelsData, categories } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bestyoutubechannels.com';

  // Core pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/careers',
    '/categories',
    '/tags',
    '/signin',
    '/terms',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Category pages
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Creator pages
  const creatorPages = channelsData.map((creator) => ({
    url: `${baseUrl}/creators/${creator.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Tag pages
  const tags = Array.from(new Set(channelsData.flatMap((creator) => creator.tags)));
  const tagPages = tags.map((tag) => ({
    url: `${baseUrl}/tags/${tag.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...categoryPages, ...creatorPages, ...tagPages];
}