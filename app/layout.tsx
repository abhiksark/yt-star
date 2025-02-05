import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { generateWebsiteSchema } from "@/lib/schema";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/error-boundary";
import { cn } from "@/lib/utils";
import Script from 'next/script';

// Load font with display: swap for better performance
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});

// Ensure base URL is always valid
const BASE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestyoutubechannels.com'
).toString();

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Best Tech YouTube Channels 2025 - Programming & Development Tutorials",
    template: "%s | BestYoutubeChannels"
  },
  description: "Find the best tech YouTube channels for programming tutorials, system design, and software development. Expert-curated list of educational content creators for 2025.",
  keywords: [
    "best tech youtube channels",
    "best programming youtube channels",
    "tech youtube channels",
    "programming tutorials",
    "coding education",
    "system design tutorials",
    "software development learning",
    "tech content creators",
    "learn programming",
    "developer education",
    "coding youtube channels",
    "tech tutorials 2025",
    "learn coding youtube",
    "programming education"
  ],
  applicationName: "BestYoutubeChannels",
  authors: [{ name: "BestYoutubeChannels Team" }],
  generator: "Next.js",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "BestYoutubeChannels",
    title: "Best Tech YouTube Channels 2025",
    description: "Find the best tech YouTube channels for programming tutorials and software development.",
    url: BASE_URL,
    images: [{
      url: `${BASE_URL}/og/default.png`,
      width: 1200,
      height: 630,
      alt: "BestYoutubeChannels - Tech Content Creators Directory"
    }]
  },
  twitter: {
    card: "summary_large_image",
    site: "@bestyoutubechannels",
    creator: "@bestyoutubechannels",
    images: [`${BASE_URL}/og/default.png`]
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Security headers with stricter CSP */}
        <meta httpEquiv="Content-Security-Policy" content={`
          default-src 'self';
          script-src 'self' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
          img-src 'self' data: https: blob:;
          font-src 'self' data: https://fonts.gstatic.com;
          connect-src 'self' https://www.google-analytics.com;
          frame-src 'self' https://www.youtube.com;
          object-src 'none';
          base-uri 'self';
          form-action 'self';
          frame-ancestors 'none';
          upgrade-insecure-requests;
        `} />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), interest-cohort=()" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/og/default.png" as="image" />
        
        {/* PWA support */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
      </head>
      <body className={cn("min-h-screen bg-background antialiased", inter.className)} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="bestyoutubechannels-theme"
        >
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">
              <ErrorBoundary>
                <Toaster />
                {children}
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        
        {/* Analytics script with performance optimization */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}