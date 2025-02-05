import { type Metadata } from 'next';

export const SEO_METRICS = {
  maxTitleLength: 60,
  maxDescriptionLength: 160,
  minContentLength: 300,
  maxUrlLength: 75,
  maxKeywords: 10
};

export const MOBILE_METADATA = {
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    minimumScale: 1,
    userScalable: true,
  },
  themeColor: '#ffffff',
  mobileAppMeta: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
  }
};

export const INTERNATIONAL_SEO = {
  defaultLocale: 'en-US',
  alternateLocales: ['en-GB', 'en-AU', 'en-CA'],
  hreflangMeta: {
    'x-default': 'https://www.bestyoutubechannels.com',
    'en-us': 'https://www.bestyoutubechannels.com/us',
    'en-gb': 'https://www.bestyoutubechannels.com/uk'
  }
};

export const PERFORMANCE_CONFIG = {
  preconnect: [
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com'
  ],
  preload: [
    {
      rel: 'preload',
      href: '/fonts/main.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous'
    }
  ]
};

export const AUTHORITY_SIGNALS = {
  foundingDate: "2024",
  award: "Best Tech Education Directory 2024",
  review: {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.8",
      "bestRating": "5"
    }
  }
};

export const DEFAULT_METADATA: Metadata = {
  title: {
    default: "Tech Content Creators - Best Programming & Tech YouTube Channels 2025",
    template: "%s | Tech Content Creators"
  },
  description: "Discover top tech YouTubers and programming content creators. Expert tutorials in software development, system design, web development, and coding education. Curated list of the best tech educators for 2025.",
  applicationName: "BestYoutubeChannels",
  authors: [{ name: "BestYoutubeChannels Team" }],
  generator: "Next.js",
  keywords: [
    "tech YouTubers",
    "programming tutorials",
    "coding education",
    "tech content creators",
    "software development tutorials",
    "system design tutorials",
    "web development courses",
    "programming education",
    "tech tutorials 2025",
    "software engineering education",
    "learn to code",
    "developer content",
    "best tech YouTube channels",
    "programming learning resources",
    "tech education platform"
  ],
  creator: "BestYoutubeChannels Team",
  publisher: "BestYoutubeChannels",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestyoutubechannels.com'),
  openGraph: {
    type: 'website',
    siteName: 'BestYoutubeChannels',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bestyoutubechannels',
    creator: '@bestyoutubechannels',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    },
  },
  other: {
    ...MOBILE_METADATA.mobileAppMeta,
    'theme-color': MOBILE_METADATA.themeColor,
  },
};

export const DEFAULT_VIEWPORT = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
} as const;

export const SEO_PATTERNS = {
  title: {
    creator: "%name% - Tech Content Creator Profile | Best YouTube Channels",
    category: "%category% Programming Tutorials & Tech Education | Best YouTube Channels",
    country: "Best Tech YouTubers from %country% | Programming & Development Tutorials",
    blog: "%title% - Tech Education Blog | Best YouTube Channels",
  },
  description: {
    creator: "Learn from %name%, a tech content creator with %subscribers% subscribers. Expert tutorials in %categories%. Watch %videos%+ educational videos.",
    category: "Find the best %category% tutorials and courses. Learn from %count% expert content creators specializing in %category% education and programming.",
    country: "Discover %count% tech content creators from %country%. Learn programming, system design, and web development from local experts.",
    blog: "%excerpt%. Read more tech education insights and tutorials on BestYoutubeChannels.",
  },
  longTail: {
    creator: "how to learn %technology% from %name%",
    category: "best %category% tutorials for beginners 2025",
    country: "top %country% tech YouTubers for %technology%"
  },
  richSnippets: {
    creator: {
      ratingPattern: "%rating% out of 5 - Based on %reviewCount% reviews",
      videoCountPattern: "Over %count% educational videos"
    }
  }
};

export const STRUCTURED_DATA = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BestYoutubeChannels",
    alternateName: "Tech Content Creators Directory",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestyoutubechannels.com',
    logo: {
      "@type": "ImageObject",
      url: "/logo.png",
      width: "180",
      height: "180"
    },
    sameAs: [
      "https://twitter.com/bestyoutubechannels",
      "https://github.com/bestyoutubechannels"
    ],
    foundingDate: AUTHORITY_SIGNALS.foundingDate,
    award: AUTHORITY_SIGNALS.award,
    review: AUTHORITY_SIGNALS.review
  }
};

export const COMMON_KEYWORDS = [
  'tech education',
  'programming tutorials',
  'coding education',
  'tech content creators',
  'learn programming',
  'software development',
  'tech youtube channels',
  'programming courses',
  'developer tutorials',
  'tech learning'
]; 