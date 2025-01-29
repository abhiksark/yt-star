import { MetadataRoute } from 'next';
import { categories, getCreators } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';
import { getCanonicalUrl } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // High-priority core pages
  const primaryPages = [
    {
      route: '',
      priority: 1.0,
      changeFrequency: 'daily' as const,
    },
    {
      route: 'categories',
      priority: 0.9,
      changeFrequency: 'daily' as const,
    },
    {
      route: 'countries',
      priority: 0.9,
      changeFrequency: 'daily' as const,
    },
    {
      route: 'blog',
      priority: 0.9,
      changeFrequency: 'daily' as const,
    }
  ].map((page) => ({
    url: getCanonicalUrl(page.route),
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Secondary navigation pages
  const secondaryPages = [
    {
      route: 'about',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
    {
      route: 'contact',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
    {
      route: 'careers',
      priority: 0.7,
      changeFrequency: 'weekly' as const,
    },
  ].map((page) => ({
    url: getCanonicalUrl(page.route),
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Authentication and profile pages (no-index in robots.txt)
  const authPages = [
    {
      route: 'signin',
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    },
    {
      route: 'signup',
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    },
    {
      route: 'profile',
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    },
  ].map((page) => ({
    url: getCanonicalUrl(page.route),
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Legal and policy pages
  const legalPages = [
    {
      route: 'terms',
      priority: 0.4,
      changeFrequency: 'monthly' as const,
    },
    {
      route: 'privacy',
      priority: 0.4,
      changeFrequency: 'monthly' as const,
    },
  ].map((page) => ({
    url: getCanonicalUrl(page.route),
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Category pages
  const categoryPages = categories.map((category) => ({
    url: getCanonicalUrl(`categories/${category.slug}`),
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Fetch creators dynamically
  const creators = await getCreators();

  // Creator profile pages
  const creatorPages = creators.map((creator) => ({
    url: getCanonicalUrl(`creators/${creator.slug}`),
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // Country pages
  const countryPages = creators
    .map(creator => creator.country)
    .filter((country, index, self) => country && self.indexOf(country) === index)
    .map(country => ({
      url: getCanonicalUrl(`countries/${country.toLowerCase()}`),
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

  // Blog posts
  const blogPosts = getAllPosts().map((post) => ({
    url: getCanonicalUrl(`blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Combine all URLs and remove duplicates
  const allUrls = [
    ...primaryPages,
    ...secondaryPages,
    ...categoryPages,
    ...creatorPages,
    ...countryPages,
    ...blogPosts,
    ...legalPages,
    // Exclude auth pages from sitemap since they should be no-indexed
  ];

  // Remove duplicate URLs (keeping the one with higher priority)
  const uniqueUrls = Array.from(
    new Map(
      allUrls
        .sort((a, b) => (b.priority || 0) - (a.priority || 0))
        .map(item => [item.url.toLowerCase(), item])
    ).values()
  );

  return uniqueUrls;
}