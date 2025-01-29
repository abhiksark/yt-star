import { MetadataRoute } from 'next';

import { getBaseUrl } from '@/lib/utils';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private/',
        '/admin/',
        '/api/',
        '/*.json$',
        '/search', // Add if you have a search page with dynamic results
        '/profile', // Add for user-specific pages
        '/404',
        '/500',
        '/_*',
        '/api/*',
        '/cdn-cgi/*',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}