import { MetadataRoute } from 'next';
import { categories, getCreators } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';
import { getCanonicalUrl } from '@/lib/utils';
import { getCountryName, getCountrySlug, isValidCountryCode } from '@/lib/countries';

type SitemapEntry = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternateRefs?: Array<{
    href: string;
    hreflang: string;
  }>;
};

export default async function sitemap(): Promise<Array<SitemapEntry>> {
  const currentDate = new Date().toISOString();
  const creators = await getCreators();
  const posts = getAllPosts();

  // Core pages with importance hierarchy
  const corePages: SitemapEntry[] = [
    { path: '', priority: 1.0 }, // Homepage
    { path: 'categories', priority: 0.9 }, // Main category listing
    { path: 'countries', priority: 0.9 }, // Main country listing
    { path: 'creators', priority: 0.9 }, // All creators
    { path: 'blog', priority: 0.9 }, // Blog index
    { path: 'about', priority: 0.8 }, // About page
    { path: 'contact', priority: 0.8 }, // Contact page
    { path: 'terms', priority: 0.4 }, // Terms page
    { path: 'privacy', priority: 0.4 }, // Privacy page
  ].map(page => ({
    url: getCanonicalUrl(page.path),
    lastModified: currentDate,
    changeFrequency: page.priority >= 0.9 ? 'daily' : 'weekly' as const,
    priority: page.priority,
    alternateRefs: [
      { href: getCanonicalUrl(page.path), hreflang: 'x-default' },
      { href: getCanonicalUrl(page.path), hreflang: 'en' }
    ]
  }));

  // Category pages with dynamic priorities
  const categoryPages: SitemapEntry[] = categories.map(category => {
    const categoryCreators = creators.filter(creator => 
      creator.categories.some(c => c.toLowerCase().includes(category.name.toLowerCase()))
    );
    const priority = categoryCreators.length > 10 ? 0.8 : 0.7;

    return {
      url: getCanonicalUrl(`categories/${category.slug}`),
      lastModified: currentDate,
      changeFrequency: categoryCreators.length > 10 ? 'daily' : 'weekly' as const,
      priority,
      alternateRefs: [
        { href: getCanonicalUrl(`categories/${category.slug}`), hreflang: 'x-default' },
        { href: getCanonicalUrl(`categories/${category.slug}`), hreflang: 'en' }
      ]
    };
  });

  // Creator pages with engagement-based priorities
  const creatorPages: SitemapEntry[] = creators.map(creator => {
    // Calculate priority based on subscriber count and video count
    const subscriberWeight = Math.min(creator.subscriberCount / 1000000, 1) * 0.5;
    const videoWeight = Math.min(creator.videoCount / 1000, 1) * 0.3;
    const priority = Math.min(0.8, 0.5 + subscriberWeight + videoWeight);

    return {
      url: getCanonicalUrl(`creators/${creator.slug}`),
      lastModified: currentDate,
      changeFrequency: creator.subscriberCount > 100000 ? 'daily' : 'weekly' as const,
      priority,
      alternateRefs: [
        { href: getCanonicalUrl(`creators/${creator.slug}`), hreflang: 'x-default' },
        { href: getCanonicalUrl(`creators/${creator.slug}`), hreflang: 'en' }
      ]
    };
  });

  // Country pages with creator-count-based priorities
  const countryPages: SitemapEntry[] = Array.from(
    new Set(
      creators
        .filter(creator => creator.country && isValidCountryCode(creator.country))
        .map(creator => creator.country.toUpperCase())
    )
  ).sort((a, b) => getCountryName(a).localeCompare(getCountryName(b)))
   .map(countryCode => {
    const countrySlug = getCountrySlug(countryCode);
    const countryCreators = creators.filter(
      creator => creator.country?.toUpperCase() === countryCode
    );
    
    // Dynamic priority based on creator count
    const creatorCount = countryCreators.length;
    let priority = 0.7;
    if (creatorCount > 20) priority = 0.9;
    else if (creatorCount > 10) priority = 0.8;
    
    return {
      url: getCanonicalUrl(`countries/${countrySlug}`),
      lastModified: currentDate,
      changeFrequency: creatorCount > 10 ? 'daily' : 'weekly' as const,
      priority,
      alternateRefs: [
        { href: getCanonicalUrl(`countries/${countrySlug}`), hreflang: 'x-default' },
        { href: getCanonicalUrl(`countries/${countrySlug}`), hreflang: 'en' }
      ]
    };
  });

  // Blog posts with date-based priorities
  const blogPages: SitemapEntry[] = posts.map(post => {
    const postDate = new Date(post.date);
    const daysSincePublished = Math.floor((Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Higher priority for newer posts
    let priority = 0.6;
    if (daysSincePublished <= 7) priority = 0.8;
    else if (daysSincePublished <= 30) priority = 0.7;
    
    return {
      url: getCanonicalUrl(`blog/${post.slug}`),
      lastModified: postDate.toISOString(),
      changeFrequency: daysSincePublished <= 30 ? 'daily' : 'weekly' as const,
      priority,
      alternateRefs: [
        { href: getCanonicalUrl(`blog/${post.slug}`), hreflang: 'x-default' },
        { href: getCanonicalUrl(`blog/${post.slug}`), hreflang: 'en' }
      ]
    };
  });

  // Combine all URLs and remove duplicates
  const allUrls = [
    ...corePages,
    ...categoryPages,
    ...creatorPages,
    ...countryPages,
    ...blogPages,
  ];

  // Remove duplicates while preserving highest priority
  const urlMap = new Map<string, SitemapEntry>();
  allUrls.forEach(entry => {
    const existingEntry = urlMap.get(entry.url);
    if (!existingEntry || (existingEntry.priority || 0) < (entry.priority || 0)) {
      urlMap.set(entry.url, entry);
    }
  });

  return Array.from(urlMap.values());
}