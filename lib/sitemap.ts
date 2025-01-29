import { MetadataRoute } from 'next';
import { categories, getCreators } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';
import { getCanonicalUrl } from '@/lib/utils';
import { getCountryName, getCountrySlug, isValidCountryCode } from '@/lib/countries';

// Centralize URL normalization
function normalizeUrl(url: string): string {
  return url
    .toLowerCase()
    .replace(/\/+$/, '') // Remove trailing slashes
    .replace(/\/{2,}/g, '/'); // Remove duplicate slashes
}

// Validate URL is properly formed
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();
  const baseUrl = 'https://www.bestyoutubechannels.com';

  // Core pages with strict canonical paths
  const coreRoutes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
  ];

  // Dynamic category pages
  const categoryUrls = categories.map((category) => ({
    url: normalizeUrl(`${baseUrl}/categories/${category.slug}`),
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Dynamic creator pages
  const creators = await getCreators();
  
  // Get unique countries and generate country pages with full names
  const countries = Array.from(
    new Set(
      creators
        .filter(creator => creator.country && isValidCountryCode(creator.country))
        .map(creator => creator.country.toUpperCase())
    )
  );

  const countryUrls = countries.map(countryCode => {
    const countryName = getCountryName(countryCode);
    const countrySlug = getCountrySlug(countryCode);
    return {
      url: normalizeUrl(`${baseUrl}/countries/${countrySlug}`),
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
      // Add additional metadata for better SEO
      alternateNames: [countryName],
    };
  });

  const creatorUrls = creators.map((creator) => ({
    url: normalizeUrl(`${baseUrl}/creators/${creator.slug}`),
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // Dynamic blog posts
  const blogPosts = getAllPosts();
  const blogUrls = blogPosts.map((post) => ({
    url: normalizeUrl(`${baseUrl}/blog/${post.slug}`),
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Combine all URLs and filter out any invalid ones
  const allUrls = [
    ...coreRoutes,
    ...categoryUrls,
    ...countryUrls,
    ...creatorUrls,
    ...blogUrls,
  ].filter((route) => isValidUrl(route.url));

  // Remove duplicate URLs (keeping the one with higher priority)
  const uniqueUrls = Array.from(
    new Map(
      allUrls.sort((a, b) => b.priority - a.priority)
        .map(item => [normalizeUrl(item.url), item])
    ).values()
  );

  return uniqueUrls;
}