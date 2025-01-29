import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { getCanonicalUrl } from "@/lib/utils";
import { generateWebsiteSchema } from "@/lib/schema";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bestyoutubechannels.com'),
  title: {
    default: "BestYoutubeChannels - Discover Top Tech Content Creators",
    template: "%s"
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
    url: 'https://www.bestyoutubechannels.com',
    title: 'BestYoutubeChannels - Discover Top Tech Content Creators',
    description: 'Find the best tech education content creators on YouTube',
    siteName: 'BestYoutubeChannels',
    images: [
      {
        url: getCanonicalUrl('og/default.png'),
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
    images: [getCanonicalUrl('og/default.png')],
  },
  alternates: {
    canonical: 'https://www.bestyoutubechannels.com',
    languages: {
      'en-US': 'https://www.bestyoutubechannels.com',
    },
  },
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