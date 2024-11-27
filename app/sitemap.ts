import { MetadataRoute } from 'next';
import { channelsData, categories } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bestyoutubechannels.com';

  // Core pages
  const staticPages = [
    '',
    '/about',
    '/blog',
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

  // Blog posts
  const blogPosts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...categoryPages, ...creatorPages, ...blogPosts];
}