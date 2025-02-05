import { MetadataRoute } from 'next';
import { categories, getCreators } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';
import { getCanonicalUrl } from '@/lib/utils';
import { getCountryName, getCountrySlug, isValidCountryCode } from '@/lib/countries';

/**
 * Generates a comprehensive sitemap for the entire website
 * Priorities are assigned based on content importance and update frequency:
 * 1.0: Homepage
 * 0.9: Main listing pages (categories, countries, creators)
 * 0.8: Individual category and country pages
 * 0.7: Creator profiles
 * 0.6-0.8: Blog posts (based on recency)
 * 0.4: Static pages (about, contact, terms, privacy)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();
  const creators = await getCreators();
  const posts = getAllPosts();

  // Core pages (static routes)
  const corePages = [
    { path: '', priority: 1.0, freq: 'daily' }, // Homepage
    { path: 'categories', priority: 0.9, freq: 'daily' }, // Categories index
    { path: 'countries', priority: 0.9, freq: 'daily' }, // Countries index
    { path: 'creators', priority: 0.9, freq: 'daily' }, // Creators index
    { path: 'blog', priority: 0.9, freq: 'daily' }, // Blog index
    { path: 'about', priority: 0.4, freq: 'monthly' }, // About page
    { path: 'contact', priority: 0.4, freq: 'monthly' }, // Contact page
    { path: 'terms', priority: 0.4, freq: 'yearly' }, // Terms page
    { path: 'privacy', priority: 0.4, freq: 'yearly' }, // Privacy page
  ].map(page => ({
    url: getCanonicalUrl(page.path),
    lastModified: currentDate,
    changeFrequency: page.freq,
    priority: page.priority,
  }));

  // Category pages (dynamic routes with engagement-based priority)
  const categoryPages = categories.map(category => {
    const categoryCreators = creators.filter(creator => 
      creator.categories.some(c => c.toLowerCase().includes(category.name.toLowerCase()))
    );
    return {
      url: getCanonicalUrl(`categories/${category.slug}`),
      lastModified: currentDate,
      changeFrequency: categoryCreators.length > 10 ? 'daily' : 'weekly',
      priority: 0.8,
    };
  });

  // Creator pages (dynamic routes with engagement-based priority)
  const creatorPages = creators.map(creator => {
    // Higher priority for more influential creators
    const subscriberWeight = Math.min(creator.subscriberCount / 1000000, 1) * 0.5;
    const videoWeight = Math.min(creator.videoCount / 1000, 1) * 0.3;
    const priority = Math.min(0.8, 0.5 + subscriberWeight + videoWeight);

    return {
      url: getCanonicalUrl(`creators/${creator.slug}`),
      lastModified: currentDate,
      changeFrequency: creator.subscriberCount > 100000 ? 'daily' : 'weekly',
      priority,
    };
  });

  // Country pages (dynamic routes with creator-count-based priority)
  const countryPages = Array.from(
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
    
    return {
      url: getCanonicalUrl(`countries/${countrySlug}`),
      lastModified: currentDate,
      changeFrequency: countryCreators.length > 10 ? 'daily' : 'weekly',
      priority: countryCreators.length > 20 ? 0.9 : countryCreators.length > 10 ? 0.8 : 0.7,
    };
  });

  // Blog posts (dynamic routes with recency-based priority)
  const blogPages = posts.map(post => {
    const postDate = new Date(post.date);
    const daysSincePublished = Math.floor((Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Higher priority for newer posts
    const priority = daysSincePublished <= 7 ? 0.8 : 
                    daysSincePublished <= 30 ? 0.7 : 0.6;
    
    return {
      url: getCanonicalUrl(`blog/${post.slug}`),
      lastModified: postDate.toISOString(),
      changeFrequency: daysSincePublished <= 30 ? 'daily' : 'weekly',
      priority,
    };
  });

  // Combine all URLs and remove duplicates while preserving highest priority
  const urlMap = new Map<string, MetadataRoute.Sitemap[number]>();
  
  [...corePages, ...categoryPages, ...creatorPages, ...countryPages, ...blogPages]
    .forEach(entry => {
      const existingEntry = urlMap.get(entry.url);
      if (!existingEntry || (existingEntry.priority || 0) < (entry.priority || 0)) {
        urlMap.set(entry.url, entry);
      }
    });

  return Array.from(urlMap.values());
}