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
        '/search',
        '/profile',
        '/404',
        '/500',
        '/_*',
        '/api/*',
        '/cdn-cgi/*'
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}