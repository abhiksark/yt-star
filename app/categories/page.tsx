import { Metadata } from "next";
import { categories, getCreators } from "@/lib/data";
import { CategoryHeader } from "@/components/category-header";
import { CategoryGrid } from "@/components/category-grid";
import { CategoryFilter } from "@/components/category-filter";
import { Suspense } from "react";
import { CategoryGridSkeleton } from "@/components/skeletons";

export const metadata: Metadata = {
  title: "Browse Categories - Tech Content Creators",
  description: "Explore tech content creators by category. Find experts in system design, frontend, backend, and more.",
  keywords: "tech content creators, programming tutorials, coding education, tech influencers, software development, system design, frontend development, backend development, web development, software engineering, tech tutorials, programming education, developer content",
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },

  category: 'Technology',
  openGraph: {
    title: "Browse Categories - Tech Content Creators",
    description: "Explore tech content creators in Youtube by category. Find experts in system design, frontend, backend, and more.",
    type: "website",
    locale: "en_US",
    siteName: "Tech Content Creators",
    // images: [
    //   {
    //     url: "/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Tech Content Creators Categories"
    //   }
    // ]
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Browse Categories - Tech Content Creators",
  //   description: "Explore tech content creators by category. Find experts in system design, frontend, backend, and more.",
  //   images: ["/og-image.png"]
  // },
  alternates: {
    canonical: "/categories",
    languages: {
      'en-US': '/categories',
    },
  },
  authors: [{ name: 'Tech Content Creators' }],
  generator: 'Next.js',
  applicationName: 'Tech Content Creators',
  // referrer: 'origin-when-cross-origin',
  // creator: 'Tech Content Creators Team',
  publisher: 'Tech Content Creators',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.bestyoutubechannels.com'),
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
    'format-detection': 'telephone=no',
  }
};

export default async function CategoriesPage() {
  const creators = await getCreators();

  return (
    <div className="space-y-8">
      <CategoryHeader />
      <CategoryFilter categories={categories} />
      <Suspense fallback={<CategoryGridSkeleton />}>
        <CategoryGrid categories={categories} creators={creators} />
      </Suspense>
    </div>
  );
}