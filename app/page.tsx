import type { Metadata, Viewport } from "next";
import { SearchCreators } from "@/components/search-creators";
import { FeaturedCreators } from "@/components/featured-creators";
import { TrendingCreators } from "@/components/trending-creators";
import { Categories } from "@/components/categories";
import { FAQSection } from "@/components/faq-section";
import { platformFAQs, generatePlatformFAQSchema } from "@/lib/faq";
import { SearchButton } from "@/components/search-button";
import { Suspense } from "react";
import { Shell } from "@/components/shell";
import { DEFAULT_METADATA } from "@/lib/seo-config";

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// Revalidate page every 12 hours
export const revalidate = 43200;

// Dynamic metadata for home page
export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  alternates: {
    canonical: '/',
  },
};

// Loading fallbacks
const CreatorsSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="h-8 bg-muted rounded w-1/3" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-64 bg-muted rounded" />
      ))}
    </div>
  </div>
);

export default async function Home() {
  return (
    <Shell>
      <div className="space-y-8 sm:space-y-12">
        <section className="relative py-12 sm:py-20 text-center space-y-6 overflow-hidden px-4">
          {/* Animated background with reduced motion support */}
          <div className="absolute inset-0 -z-10 motion-safe:animate-gradient bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30" />
          <div 
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]" 
            style={{ backgroundSize: '14px 24px' }}
            aria-hidden="true"
          />
          
          <div className="space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter px-4">
              Discover Top Tech Content Creators
            </h1>
            <h2 className="text-muted-foreground text-xl sm:text-2xl md:text-3xl max-w-2xl mx-auto px-4">
              Expert tutorials in programming, system design, and web development
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <SearchCreators />
            </div>
          </div>

          {/* Decorative elements with reduced motion */}
          <div 
            className="absolute top-1/2 left-4 w-24 h-24 bg-primary/20 rounded-full blur-xl motion-safe:animate-float hidden sm:block" 
            aria-hidden="true"
          />
          <div 
            className="absolute bottom-1/3 right-8 w-32 h-32 bg-accent/20 rounded-full blur-xl motion-safe:animate-float hidden sm:block" 
            style={{ animationDelay: '-2s' }}
            aria-hidden="true"
          />
        </section>

        <div className="container px-4 space-y-12 sm:space-y-16">
          <Suspense fallback={<CreatorsSkeleton />}>
            <TrendingCreators />
          </Suspense>
          
          <section>
            <h2 className="text-3xl font-bold mb-6">Featured Content Creators</h2>
            <Suspense fallback={<CreatorsSkeleton />}>
              <FeaturedCreators />
            </Suspense>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold mb-6">Browse Categories</h2>
            <Categories />
          </section>
          
          <FAQSection 
            title="Frequently Asked Questions About Tech Education"
            description="Find answers to common questions about finding and learning from tech content creators"
            faqs={platformFAQs}
          />
        </div>
        
        {/* Trust signals with semantic markup */}
        <section className="bg-muted/50 py-12 mt-16">
          <div className="container px-4">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <dt className="text-sm text-muted-foreground">Expert Creators</dt>
                <dd className="text-3xl font-bold text-primary">50+</dd>
              </div>
              <div className="space-y-2">
                <dt className="text-sm text-muted-foreground">Monthly Users</dt>
                <dd className="text-3xl font-bold text-primary">10K+</dd>
              </div>
              <div className="space-y-2">
                <dt className="text-sm text-muted-foreground">Tech Topics</dt>
                <dd className="text-3xl font-bold text-primary">30+</dd>
              </div>
              <div className="space-y-2">
                <dt className="text-sm text-muted-foreground">Hours of Content</dt>
                <dd className="text-3xl font-bold text-primary">15K+</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Structured FAQ data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generatePlatformFAQSchema())
          }}
        />
      </div>
    </Shell>
  );
}