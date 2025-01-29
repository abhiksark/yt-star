import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Best Tech YouTube Channels',
    short_name: 'BestYTChannels',
    description: 'Find the best tech YouTube channels for programming tutorials and software development',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        // purpose: 'any maskable'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        // purpose: 'any maskable'
      }
    ],
    categories: ['education', 'technology', 'development'],
    screenshots: [
      {
        src: '/screenshots/home.png',
        sizes: '1280x720',
        type: 'image/png',
        // platform: 'wide',
        // label: 'Homepage of BestYoutubeChannels'
      }
    ],
    shortcuts: [
      {
        name: 'Categories',
        url: '/categories',
        description: 'Browse content creator categories'
      },
      {
        name: 'Blog',
        url: '/blog',
        description: 'Read latest tech articles'
      }
    ],
    related_applications: [],
    prefer_related_applications: false,
    id: 'com.bestyoutubechannels.app',
    scope: '/',
    lang: 'en',
    dir: 'ltr'
  };
}