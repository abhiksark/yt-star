import { MetadataRoute } from 'next';
import { categories, getCreators } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';
import { getCountryName, getCountrySlug, isValidCountryCode } from '@/lib/countries';

// Centralize URL normalization
function normalizeUrl(url: string): string {
  return url
    .toLowerCase()
    .trim()
    .replace(/([^:]\/)\/+/g, '$1') // Remove duplicate slashes except after protocol
    .replace(/\/$/, ''); // Remove trailing slash
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

// Get base URL with protocol
function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestyoutubechannels.com';
}

// Create canonical URL
function createCanonicalUrl(path: string = ''): string {
  const baseUrl = getBaseUrl();
  const cleanPath = path.replace(/^\/+/, '').replace(/\/+$/, '');
  return cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();
  const baseUrl = getBaseUrl();

  // Core pages with strict canonical paths
  const coreRoutes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: createCanonicalUrl('categories'),
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: createCanonicalUrl('countries'),
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: createCanonicalUrl('blog'),
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: createCanonicalUrl('about'),
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: createCanonicalUrl('contact'),
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: createCanonicalUrl('terms'),
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
    {
      url: createCanonicalUrl('privacy'),
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
  ];

  // Dynamic category pages
  const categoryUrls = categories.map((category) => ({
    url: createCanonicalUrl(`categories/${category.slug}`),
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Dynamic creator pages
  const creators = await getCreators();
  
  // Get unique countries and generate country pages
  const countries = Array.from(
    new Set(
      creators
        .filter(creator => creator.country && isValidCountryCode(creator.country))
        .map(creator => creator.country.toUpperCase())
    )
  ).sort();

  const countryUrls = countries.map(countryCode => {
    const countryName = getCountryName(countryCode);
    const countrySlug = getCountrySlug(countryCode);
    return {
      url: createCanonicalUrl(`countries/${countrySlug}`),
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
      alternateNames: [countryName],
    };
  });

  const creatorUrls = creators.map((creator) => ({
    url: createCanonicalUrl(`creators/${creator.slug}`),
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // Dynamic blog posts
  const blogPosts = getAllPosts();
  const blogUrls = blogPosts.map((post) => ({
    url: createCanonicalUrl(`blog/${post.slug}`),
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
  ].filter((route) => {
    const isValid = isValidUrl(route.url);
    if (!isValid) {
      console.warn(`Invalid URL found in sitemap: ${route.url}`);
    }
    return isValid;
  });

  // Remove duplicate URLs (keeping the one with higher priority)
  const uniqueUrls = Array.from(
    new Map(
      allUrls
        .sort((a, b) => b.priority - a.priority)
        .map(item => [normalizeUrl(item.url), item])
    ).values()
  );

  return uniqueUrls;
}