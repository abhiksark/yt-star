import { MetadataRoute } from 'next';
import { categories, getCreators } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';
import { getCanonicalUrl } from '@/lib/utils';
import { getCountryName, getCountrySlug, isValidCountryCode } from '@/lib/countries';
import { getBaseUrl } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // Core pages
  const corePages = [
    { path: '', priority: 1.0 },
    { path: 'categories', priority: 0.9 },
    { path: 'countries', priority: 0.9 },
    { path: 'blog', priority: 0.9 },
    { path: 'about', priority: 0.8 },
    { path: 'contact', priority: 0.8 },
    { path: 'terms', priority: 0.4 },
    { path: 'privacy', priority: 0.4 },
  ].map(page => ({
    url: getCanonicalUrl(page.path),
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: page.priority,
  }));

  // Category pages
  const categoryPages = categories.map(category => ({
    url: getCanonicalUrl(`categories/${category.slug}`),
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Fetch creators
  const creators = await getCreators();

  // Creator pages
  const creatorPages = creators.map(creator => ({
    url: getCanonicalUrl(`creators/${creator.slug}`),
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // Country pages
  const countryPages = Array.from(
    new Set(
      creators
        .filter(creator => creator.country && isValidCountryCode(creator.country))
        .map(creator => creator.country.toUpperCase())
    )
  ).map(countryCode => ({
    url: getCanonicalUrl(`countries/${getCountrySlug(countryCode)}`),
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    alternateRefs: [{
      href: getCanonicalUrl(`countries/${getCountrySlug(countryCode)}`),
      hreflang: 'en'
    }]
  }));

  // Blog posts
  const blogPages = getAllPosts().map(post => ({
    url: getCanonicalUrl(`blog/${post.slug}`),
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
    alternateRefs: [{
      href: getCanonicalUrl(`blog/${post.slug}`),
      hreflang: 'en'
    }]
  }));

  // Combine all URLs
  const allUrls = [
    ...corePages,
    ...categoryPages,
    ...creatorPages,
    ...countryPages,
    ...blogPages,
  ];

  // Remove duplicates and sort by priority
  const uniqueUrls = Array.from(
    new Map(
      allUrls
        .sort((a, b) => (b.priority || 0) - (a.priority || 0))
        .map(item => [item.url.toLowerCase(), item])
    ).values()
  );

  return uniqueUrls;
}