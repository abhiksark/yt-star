import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import GoogleAnalytics from './components/GoogleAnalytics';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://bestyoutubechannels.com'),
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
    url: 'https://bestyoutubechannels.com',
    title: 'BestYoutubeChannels - Discover Top Tech Content Creators',
    description: 'Find the best tech education content creators on YouTube',
    siteName: 'BestYoutubeChannels',
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'BestYoutubeChannels - Tech Education Discovery',
  //   description: 'Find the best tech education content creators on YouTube',
  //   creator: '@bestyoutubechannels',
  //   site: '@bestyoutubechannels',
  // },
  alternates: {
    canonical: 'https://bestyoutubechannels.com',
    languages: {
      'en-US': 'https://bestyoutubechannels.com',
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
        <GoogleAnalytics />
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