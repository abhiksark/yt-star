import { MetadataRoute } from 'next';
import { categories, getCreators } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';
import { getCanonicalUrl } from '@/lib/utils';
import { getCountryName, getCountrySlug, isValidCountryCode } from '@/lib/countries';

// Helper function to safely convert string to number
function safeNumber(value: string | number | undefined): number {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  
  // Handle formatted strings (e.g., "1.2M", "100K")
  const multipliers = { K: 1000, M: 1000000, B: 1000000000 };
  const match = value.toString().match(/^([\d.]+)([KMB])?$/i);
  
  if (match) {
    const [, num, unit] = match;
    const multiplier = unit ? multipliers[unit.toUpperCase() as keyof typeof multipliers] : 1;
    return parseFloat(num) * multiplier;
  }
  
  const num = Number(value.replace(/[^0-9]/g, ''));
  return isNaN(num) ? 0 : num;
}

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}

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
  try {
    const currentDate = new Date().toISOString();
    const [creators, posts] = await Promise.all([
      getCreators(),
      getAllPosts()
    ]);

    // Core pages (static routes)
    const coreEntries: SitemapEntry[] = [
      { url: getCanonicalUrl(), lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
      { url: getCanonicalUrl('categories'), lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
      { url: getCanonicalUrl('countries'), lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
      { url: getCanonicalUrl('creators'), lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
      { url: getCanonicalUrl('blog'), lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
      { url: getCanonicalUrl('about'), lastModified: currentDate, changeFrequency: 'monthly', priority: 0.4 },
      { url: getCanonicalUrl('contact'), lastModified: currentDate, changeFrequency: 'monthly', priority: 0.4 },
      { url: getCanonicalUrl('terms'), lastModified: currentDate, changeFrequency: 'yearly', priority: 0.4 },
      { url: getCanonicalUrl('privacy'), lastModified: currentDate, changeFrequency: 'yearly', priority: 0.4 },
    ];

    // Category pages with engagement-based priority
    const categoryEntries: SitemapEntry[] = categories.map(category => {
      const categoryCreators = creators.filter(creator => 
        creator.categories.some(c => c.toLowerCase().includes(category.name.toLowerCase()))
      );
      const freq: ChangeFrequency = categoryCreators.length > 10 ? 'daily' : 'weekly';

      return {
        url: getCanonicalUrl(`categories/${category.slug}`),
        lastModified: currentDate,
        changeFrequency: freq,
        priority: 0.8,
      };
    });

    // Creator pages with engagement-based priority
    const creatorEntries: SitemapEntry[] = creators.map(creator => {
      const subscriberCount = safeNumber(creator.subscriberCount);
      const videoCount = safeNumber(creator.videoCount);
      
      const subscriberWeight = Math.min(subscriberCount / 1000000, 1) * 0.5;
      const videoWeight = Math.min(videoCount / 1000, 1) * 0.3;
      const priority = Math.min(0.8, 0.5 + subscriberWeight + videoWeight);
      const freq: ChangeFrequency = subscriberCount > 100000 ? 'daily' : 'weekly';

      return {
        url: getCanonicalUrl(`creators/${creator.slug}`),
        lastModified: currentDate,
        changeFrequency: freq,
        priority,
      };
    });

    // Country pages with creator-count-based priority
    const countries = Array.from(
      new Set(
        creators
          .filter(creator => creator.country && isValidCountryCode(creator.country))
          .map(creator => creator.country.toUpperCase())
      )
    ).sort((a, b) => getCountryName(a).localeCompare(getCountryName(b)));

    const countryEntries: SitemapEntry[] = countries.map(countryCode => {
      const countrySlug = getCountrySlug(countryCode);
      const countryCreators = creators.filter(
        creator => creator.country?.toUpperCase() === countryCode
      );
      
      const freq: ChangeFrequency = countryCreators.length > 10 ? 'daily' : 'weekly';
      const priority = countryCreators.length > 20 ? 0.9 : countryCreators.length > 10 ? 0.8 : 0.7;

      return {
        url: getCanonicalUrl(`countries/${countrySlug}`),
        lastModified: currentDate,
        changeFrequency: freq,
        priority,
      };
    });

    // Blog posts with recency-based priority
    const blogEntries: SitemapEntry[] = posts.map(post => {
      const postDate = new Date(post.date);
      const daysSincePublished = Math.floor((Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24));
      
      const priority = daysSincePublished <= 7 ? 0.8 : 
                      daysSincePublished <= 30 ? 0.7 : 0.6;
      const freq: ChangeFrequency = daysSincePublished <= 30 ? 'daily' : 'weekly';
      
      return {
        url: getCanonicalUrl(`blog/${post.slug}`),
        lastModified: postDate.toISOString(),
        changeFrequency: freq,
        priority,
      };
    });

    // Combine all entries and remove duplicates while preserving highest priority
    const urlMap = new Map<string, SitemapEntry>();
    
    [...coreEntries, ...categoryEntries, ...creatorEntries, ...countryEntries, ...blogEntries]
      .forEach(entry => {
        const existingEntry = urlMap.get(entry.url);
        if (!existingEntry || existingEntry.priority < entry.priority) {
          urlMap.set(entry.url, entry);
        }
      });

    return Array.from(urlMap.values());
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return core pages as fallback
    return [
      {
        url: getCanonicalUrl(),
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1.0,
      }
    ];
  }
}