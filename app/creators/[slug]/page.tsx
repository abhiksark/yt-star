// Add at the top of the file
import { generateCreatorSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "@/components/star-rating";
import { getCreators, getCreatorBySlug } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SimilarCreators } from "@/components/similar-creators";
import { cn } from "@/lib/utils";
import { 
  AlertCircle,
  ChevronLeft,
  Globe2,
  Languages,
  Youtube,
  Users2,
  PlaySquare,
  TrendingUp,
  Sparkles,
  Folder,
  Video,
  GraduationCap,
  Medal,
  Tag
} from "lucide-react";
import Link from "next/link";
import type { Creator } from "@/lib/types";

interface CreatorPageProps {
  params: { 
    slug: string;
  };
}

export async function generateMetadata({ params }: CreatorPageProps): Promise<Metadata> {
  const creator = await getCreatorBySlug(params.slug);
  
  if (!creator) {
    return {
      title: 'Creator Not Found',
      description: 'The requested creator could not be found.',
    };
  }

  const baseUrl = 'https://wwww.bestyoutubechannels.com';
  const url = `${baseUrl}/creators/${params.slug}`;

  return {
    title: `${creator.name} - Tech Content Creator | Best YouTube Channels`,
    description: `Learn from ${creator.name}, a tech content creator with ${creator.subscriberCount} subscribers. Expert tutorials in ${creator.categories.join(', ')}. Watch ${creator.videoCount}+ educational videos.`,
    
    keywords: [
      `${creator.name}`,
      'tech tutorials',
      'programming education',
      'coding tutorials',
      ...creator.categories,
      'tech content creator',
      'youtube educator',
      'programming tutorials',
    ],

    authors: [{ name: creator.name }],
    
    openGraph: {
      title: `${creator.name} - Tech Content Creator`,
      description: creator.description,
      type: 'profile',
      url,
      images: [
        {
          url: creator.logoUrl,
          width: 176,
          height: 176,
          alt: creator.name,
        }
      ],
      locale: 'en_US',
      siteName: 'BestYoutubeChannels',
    },

    twitter: {
      card: 'summary',
      title: `${creator.name} - Tech Content Creator`,
      description: `Learn ${creator.categories.join(', ')} from ${creator.name}`,
      images: [creator.logoUrl],
      creator: '@bestyoutubechannels',
      site: '@bestyoutubechannels',
    },

    alternates: {
      canonical: url,
      languages: {
        'en-US': url,
      },
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
    //   google: 'your-google-verification-code',
    //   yandex: 'your-yandex-verification-code',
    //   bing: 'your-bing-verification-code',
    // },

    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black',
      'format-detection': 'telephone=no',
    }
  };
}

export async function generateStaticParams() {
  const creators = await getCreators();
  return creators.map((creator) => ({
    slug: creator.slug,
  }));
}

export default async function CreatorProfile({ params }: CreatorPageProps) {
  const creator = await getCreatorBySlug(params.slug);
  const allCreators = await getCreators();

  if (!creator) {
    notFound();
  }

  // Add structured data
  const creatorSchema = generateCreatorSchema(creator);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.bestyoutubechannels.com" },
    { name: "Creators", url: "https://www.bestyoutubechannels.com/creators" },
    { name: creator.name, url: `https://www.bestyoutubechannels.com/creators/${creator.slug}` }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([creatorSchema, breadcrumbSchema])
        }}
      />
      <div className="relative max-w-5xl mx-auto space-y-8 px-4">
        {/* Decorative elements */}
        <div className="absolute -z-10 top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float" />
        <div className="absolute -z-10 top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float" style={{ animationDelay: '-2s' }} />
        
        {/* Back button */}
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
          <Link 
            href="/creators" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Creators
          </Link>
        </div>

        {/* Alert */}
        <Alert variant="default" className="bg-muted/50 border-muted-foreground/20 opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm text-muted-foreground">
            Information displayed may not be up-to-date. Statistics are periodically updated.
          </AlertDescription>
        </Alert>

        <div className="space-y-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 opacity-0 animate-fade-up" style={{ animationDelay: '300ms' }}>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground mr-2">
              <Tag className="h-4 w-4" />
              Topics:
            </span>
            {creator.categories.map((category) => (
              <Link 
                key={category} 
                href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-block"
              >
                <Badge
                  variant="secondary"
                  className="hover:bg-primary/10 cursor-pointer transition-all hover:scale-105"
                >
                  {category}
                </Badge>
              </Link>
            ))}
          </div>

          {/* Main Profile Section */}
          <div className="relative glass-effect rounded-xl p-8 sm:p-10 overflow-hidden opacity-0 animate-fade-up" style={{ animationDelay: '400ms' }}>
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-accent/5 to-background animate-gradient" />
            
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="relative">
                <Avatar className="w-32 h-32 ring-4 ring-primary/20 animate-float">
                  <img src={creator.logoUrl || ''} alt={creator.name} className="object-cover" />
                </Avatar>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-background px-3 py-1.5 rounded-full shadow-lg">
                  <StarRating rating={creator.rating || 0} className="scale-100" />
                </div>
              </div>
              
              <div className="space-y-6 flex-1">
                <div className="space-y-3">
                  <h1 className="text-4xl font-bold tracking-tight">{creator.name}</h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">{creator.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2 glass-effect px-3 py-1.5 rounded-full">
                    <Globe2 className="h-4 w-4 text-primary" />
                    {creator.country && (
                      <>
                        <img
                          src={`https://flagcdn.com/${creator.country.toLowerCase()}.svg`}
                          alt={`${creator.country} flag`}
                          className="w-4 h-4 rounded-sm object-cover"
                          loading="lazy"
                        />
                        <span>{creator.country}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 glass-effect px-3 py-1.5 rounded-full">
                    <Languages className="h-4 w-4 text-primary" />
                    <span>{creator.language}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 opacity-0 animate-fade-up" style={{ animationDelay: '500ms' }}>
            {[
              { icon: Users2, label: "Subscribers", value: creator.subscriberCount },
              { icon: Video, label: "Videos", value: creator.videoCount },
              { icon: TrendingUp, label: "Views", value: creator.views },
              { icon: GraduationCap, label: "Content Level", value: "⭐".repeat(creator.complexity) }
            ].map((stat, index) => (
              <Card key={stat.label} className="hover-card animate-fade-up opacity-0" style={{ animationDelay: `${600 + index * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content Tabs */}
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: '900ms' }}>
            <Tabs defaultValue="videos" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="videos" className="inline-flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Recent Videos
                </TabsTrigger>
                <TabsTrigger value="playlists" className="inline-flex items-center gap-2">
                  <Folder className="h-4 w-4" />
                  Playlists
                </TabsTrigger>
              </TabsList>
              <TabsContent value="videos" className="glass-effect rounded-xl p-6">
                <div className="text-center py-8 text-muted-foreground">
                  Coming soon: Recent videos from {creator.name}
                </div>
              </TabsContent>
              <TabsContent value="playlists" className="glass-effect rounded-xl p-6">
                <div className="text-center py-8 text-muted-foreground">
                  Coming soon: Popular playlists from {creator.name}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Similar Creators */}
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: '1000ms' }}>
            <SimilarCreators currentCreator={creator} allCreators={allCreators} />
          </div>
        </div>
      </div>
    </>
  );
}