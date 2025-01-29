import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { cn, getCanonicalUrl } from "@/lib/utils";
import { generateWebsiteSchema } from "@/lib/schema";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestyoutubechannels.com'),
  title: {
    default: "BestYoutubeChannels - Discover Top Tech Content Creators",
    template: "%s | BestYoutubeChannels"
  },
  description: "Discover the best YouTube channels for programming, system design, and tech education. Find expert content creators across different programming languages and technologies.",
  keywords: [
    "tech youtube channels",
    "programming tutorials",
    "coding education",
    "system design tutorials",
    "software development learning",
    "tech content creators",
    "learn programming",
    "developer education",
    "coding youtube channels",
    "tech tutorials"
  ],
  authors: [{ name: "BestYoutubeChannels Team" }],
  creator: "BestYoutubeChannels",
  publisher: "BestYoutubeChannels",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: getCanonicalUrl(),
    title: 'BestYoutubeChannels - Discover Top Tech Content Creators',
    description: 'Find the best tech education content creators on YouTube',
    siteName: 'BestYoutubeChannels',
    images: [
      {
        url: '/og/default.png',
        width: 1200,
        height: 630,
        alt: 'BestYoutubeChannels - Tech Education Discovery Platform',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BestYoutubeChannels - Tech Education Discovery',
    description: 'Find the best tech education content creators on YouTube',
    creator: '@bestyoutubechannels',
    site: '@bestyoutubechannels',
    images: ['/og/default.png'],
  },
  alternates: {
    canonical: getCanonicalUrl(),
  },
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
  // verification: {
  //   google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  //   yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  //   bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebsiteSchema())
          }}
        />
      </head>
      <body className={cn(inter.className)} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background flex flex-col">
            <Navigation />
            <main className="container mx-auto px-4 py-8 flex-grow">
              <Toaster />
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}