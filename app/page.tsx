import type { Metadata, Viewport } from "next";
import { SearchCreators } from "@/components/search-creators";
import { FeaturedCreators } from "@/components/featured-creators";
import { TrendingCreators } from "@/components/trending-creators";
import { Categories } from "@/components/categories";
import { FAQSection } from "@/components/faq-section";
import { platformFAQs, generatePlatformFAQSchema } from "@/lib/faq";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Users, Youtube, BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const metadata: Metadata = {
  title: {
    default: "Tech Content Creators - Best Programming & Tech YouTube Channels 2025",
    template: "%s | Tech Content Creators"
  },
  description: "Discover top tech YouTubers and programming content creators. Expert tutorials in software development, system design, web development, and coding education. Curated list of the best tech educators for 2025.",
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
    title: "Best Tech Content Creators & Programming YouTubers 2025",
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
    title: "Discover Top Tech Content Creators 2025",
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

export { metadata };

export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section with Clear Value Proposition */}
      <section className="relative py-12 sm:py-24 text-center overflow-hidden">
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/80" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute inset-0 -z-10 animate-gradient bg-[size:200%_200%] bg-[linear-gradient(45deg,var(--primary)/10,var(--accent)/10,var(--secondary)/10,var(--primary)/10)]" />
        
        {/* Enhanced decorative blobs with more dynamic positioning */}
        <div className="absolute top-1/3 left-4 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-float opacity-50 hidden sm:block" />
        <div className="absolute bottom-1/4 right-8 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float opacity-50 hidden sm:block" style={{ animationDelay: '-2s' }} />
        <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float opacity-50 hidden sm:block" style={{ animationDelay: '-1s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-muted/20 rounded-full blur-3xl animate-float opacity-50 hidden sm:block" style={{ animationDelay: '-3s' }} />
        
        <div className="container px-4">
          <div className="space-y-10 max-w-4xl mx-auto">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block">
                <div 
                  className="glass-effect px-4 py-2 rounded-full text-sm font-medium text-muted-foreground animate-fade-up opacity-0" 
                  style={{ animationDelay: '200ms' }}
                >
                  <span className="animate-pulse inline-block mr-2">🚀</span>
                  Trusted by 50,000+ developers worldwide
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
                  <span className="inline-block animate-title opacity-0" style={{ animationDelay: '400ms' }}>
                    <span className="text-gradient">Find Your Perfect</span>
                  </span>
                  <br />
                  <span className="inline-block animate-title opacity-0" style={{ animationDelay: '600ms' }}>
                    Tech Mentor
                  </span>
                </h1>
                <h2 
                  className="text-xl sm:text-2xl md:text-3xl text-muted-foreground max-w-2xl mx-auto animate-fade-up opacity-0" 
                  style={{ animationDelay: '800ms' }}
                >
                  Discover expert-curated programming tutorials and tech education from the world's best content creators
                </h2>
              </div>
            </div>

            {/* Enhanced Primary CTA with Search */}
            <div 
              className="max-w-2xl mx-auto animate-fade-up glass-effect p-2 rounded-2xl animate-glow opacity-0" 
              style={{ animationDelay: '1000ms' }}
            >
              <SearchCreators />
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto pt-8">
              {[
                { icon: Users, label: "Active Learners", value: "50K+", color: "primary" },
                { icon: Youtube, label: "Expert Creators", value: "100+", color: "accent" },
                { icon: BookOpen, label: "Tech Topics", value: "30+", color: "secondary" },
                { icon: CheckCircle2, label: "Quality Content", value: "Free", color: "muted" }
              ].map((item, i) => (
                <div 
                  key={item.label}
                  className={cn(
                    "glass-effect rounded-xl p-4",
                    "hover-card animate-fade-up opacity-0",
                  )}
                  style={{ animationDelay: `${1200 + i * 100}ms` }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`rounded-full p-3 bg-${item.color}/10`}>
                      <item.icon className={`h-6 w-6 text-${item.color}`} />
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{item.value}</p>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container px-4 space-y-32">
        {/* Featured Section */}
        <section className="relative hover-card rounded-3xl overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/10 to-transparent animate-gradient" />
          <div className="space-y-12 p-8 sm:p-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold animate-fade-up">Featured Content Creators</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
                Learn from industry experts with proven track records in teaching tech
              </p>
            </div>
            <FeaturedCreators />
          </div>
        </section>

        {/* Trending Section */}
        <section className="space-y-12 hover-card rounded-3xl overflow-hidden p-8 sm:p-12 glass-effect">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold animate-fade-up">Trending This Week</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
              Discover the most popular tech educators and latest content
            </p>
          </div>
          <TrendingCreators />
        </section>

        {/* Categories Section */}
        <section className="space-y-12 hover-card rounded-3xl overflow-hidden p-8 sm:p-12 relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent animate-gradient" />
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold animate-fade-up">Browse by Topic</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
              Find specialized content in your area of interest
            </p>
          </div>
          <Categories />
          <div className="text-center">
            <Button 
              asChild 
              size="lg" 
              className="glass-effect animate-fade-up hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: '200ms' }}
            >
              <Link href="/categories" className="group">
                Explore All Categories
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative hover-card rounded-3xl overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/20 to-transparent" />
          <div className="p-8 sm:p-12">
            <FAQSection 
              title="Frequently Asked Questions"
              description="Everything you need to know about finding the right tech educator"
              faqs={platformFAQs}
            />
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="text-center py-20 space-y-12 glass-effect rounded-3xl">
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold animate-fade-up text-gradient">Ready to Start Learning?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
              Join thousands of developers learning from the best tech educators
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="glass-effect animate-fade-up hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: '200ms' }}
            >
              <Link href="/categories" className="group">
                Browse Categories
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="group hover:scale-105 transition-transform animate-fade-up"
              style={{ animationDelay: '300ms' }}
            >
              <Link href="/creators">
                View All Creators
              </Link>
            </Button>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePlatformFAQSchema())
        }}
      />
    </div>
  );
}