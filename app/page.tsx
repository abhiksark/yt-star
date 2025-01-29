import { Metadata, Viewport } from "next";
import { SearchCreators } from "@/components/search-creators";
import { FeaturedCreators } from "@/components/featured-creators";
import { Categories } from "@/components/categories";
import { SearchButton } from "@/components/search-button";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Tech Content Creators - Best Programming & Tech YouTube Channels 2024",
    template: "%s | Tech Content Creators"
  },
  description: "Discover top tech YouTubers and programming content creators. Expert tutorials in software development, system design, web development, and coding education. Curated list of the best tech educators for 2024.",
  keywords: [
    "tech YouTubers",
    "programming tutorials",
    "coding education",
    "tech content creators",
    "software development tutorials",
    "system design tutorials",
    "web development courses",
    "programming education",
    "tech tutorials 2024",
    "software engineering education",
    "learn to code",
    "developer content",
    "best tech YouTube channels",
    "programming learning resources",
    "tech education platform"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Technology',
  openGraph: {
    title: "Best Tech Content Creators & Programming YouTubers 2024",
    description: "Find expert tech content creators and programming YouTubers. Learn software development, system design, and web development from industry experts.",
    type: "website",
    locale: "en_US",
    siteName: "Tech Content Creators",
    url: 'https://www.bestyoutubechannels.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tech Content Creators Platform'
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Top Tech Content Creators 2024",
    description: "Find the best tech content creators and programming YouTubers. Learn from experts in software development.",
    images: ["/twitter-image.png"],
    creator: "@techcreators",
    site: "@techcreatorsplatform"
  },
  alternates: {
    canonical: "https://www.bestyoutubechannels.com",
    languages: {
      'en-US': 'https://www.bestyoutubechannels.com',
    },
  },
  authors: [{ name: 'Tech Content Creators Team' }],
  generator: 'Next.js',
  applicationName: 'Tech Content Creators',
  publisher: 'Tech Content Creators Platform',
  metadataBase: new URL('https://www.bestyoutubechannels.com'),
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#ffffff',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#ffffff'
  }
};

export default function Home() {
  return (
    <div className="space-y-8 sm:space-y-12">
      <section className="relative py-12 sm:py-20 text-center space-y-6 overflow-hidden px-4">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        <div className="space-y-6 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter px-4">
            Discover <span className="text-gradient">Top Tech</span> Content Creators
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
            Find your next favorite tech YouTuber from our curated list of content creators
            across programming, system design, and software development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <SearchCreators />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-4 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-float hidden sm:block" />
        <div className="absolute bottom-1/3 right-8 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float hidden sm:block" style={{ animationDelay: '-2s' }} />
      </section>

      <div className="container px-4 space-y-12 sm:space-y-16">
        <Categories />
        <FeaturedCreators />
      </div>
    </div>
  );
}