import { MetadataRoute } from 'next';
import { categories, getCreators } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';
import { getCountryName, getCountrySlug, isValidCountryCode } from '@/lib/countries';
import { getCanonicalUrl } from '@/lib/utils';
import { type RouteConfig, type SitemapEntry, type ChangeFrequency } from './types/seo';

const CORE_ROUTES: RouteConfig[] = [
  { path: '', priority: 1.0, changeFrequency: 'daily' },
  { path: 'categories', priority: 0.9, changeFrequency: 'daily' },
  { path: 'countries', priority: 0.9, changeFrequency: 'daily' },
  { path: 'blog', priority: 0.8, changeFrequency: 'daily' },
  { path: 'about', priority: 0.7, changeFrequency: 'weekly' },
  { path: 'contact', priority: 0.6, changeFrequency: 'monthly' },
  { path: 'terms', priority: 0.4, changeFrequency: 'yearly' },
  { path: 'privacy', priority: 0.4, changeFrequency: 'yearly' },
];

function createSitemapEntry(
  path: string, 
  priority: number, 
  changeFrequency: ChangeFrequency, 
  lastModified: string = new Date().toISOString()
): SitemapEntry {
  return {
    url: getCanonicalUrl(path),
    lastModified,
    changeFrequency,
    priority,
  };
}

async function generateDynamicRoutes(currentDate: string): Promise<SitemapEntry[]> {
  const creators = await getCreators();
  const blogPosts = getAllPosts();

  // Generate category pages
  const categoryUrls = categories.map(category => 
    createSitemapEntry(`categories/${category.slug}`, 0.8, 'daily', currentDate)
  );

  // Generate country pages
  const countries = Array.from(
    new Set(
      creators
        .filter(creator => creator.country && isValidCountryCode(creator.country))
        .map(creator => creator.country.toUpperCase())
    )
  ).sort();

  const countryUrls = countries.map(countryCode => 
    createSitemapEntry(`countries/${getCountrySlug(countryCode)}`, 0.8, 'daily', currentDate)
  );

  // Generate creator pages
  const creatorUrls = creators.map(creator => 
    createSitemapEntry(`creators/${creator.slug}`, 0.7, 'daily', currentDate)
  );

  // Generate blog post pages
  const blogUrls = blogPosts.map(post => 
    createSitemapEntry(`blog/${post.slug}`, 0.6, 'weekly', new Date(post.date).toISOString())
  );

  return [...categoryUrls, ...countryUrls, ...creatorUrls, ...blogUrls];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();
  
  // Generate core routes
  const coreRoutes = CORE_ROUTES.map(({ path, priority, changeFrequency = 'daily' }) => 
    createSitemapEntry(path, priority, changeFrequency, currentDate)
  );

  // Generate dynamic routes
  const dynamicRoutes = await generateDynamicRoutes(currentDate);

  // Combine all routes
  const allUrls = [...coreRoutes, ...dynamicRoutes];

  // Remove duplicates (keeping higher priority ones)
  return Array.from(
    new Map(
      allUrls
        .sort((a, b) => (b.priority || 0) - (a.priority || 0))
        .map(item => [item.url.toLowerCase(), item])
    ).values()
  );
}