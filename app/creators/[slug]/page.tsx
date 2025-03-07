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
  Folder,
  Globe2,
  GraduationCap,
  Languages,
  Medal,
  Tag,
  Calendar,
  User,
  ArrowRight,
  Users2,
  Video,
  TrendingUp,
  Youtube,
  Play,
  Star
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

  // Extract and format existing creator data with fallbacks
  const fallbackStats = {
    subscriberCount: creator.subscriberCount || "125K",
    videoCount: creator.videoCount || "87",
    views: creator.views || "4.2M",
    complexity: creator.complexity || 3,
    channelId: creator.channelId || "UC_dummy_channel_id",
    bannerUrl: creator.bannerUrl || "https://placehold.co/1500x500/e9ecef/6c757d?text=Channel+Banner",
    logoUrl: creator.logoUrl || `https://placehold.co/300x300/e9ecef/6c757d?text=${creator.name?.charAt(0) || 'C'}`,
    country: creator.country || "US",
    language: creator.language || "English",
    joinedDate: "January 2020" // Placeholder for join date
  };

  // Placeholder creator videos
  const creatorVideos = [
    { 
      id: "video1", 
      title: `${creator.name}: How to Master ${creator.categories?.[0] || 'Programming'}`, 
      views: "120K", 
      likes: "5.2K", 
      publishedAt: "2 weeks ago", 
      thumbnail: "https://placehold.co/640x360/4338ca/ffffff?text=Featured+Video" 
    },
    { 
      id: "video2", 
      title: `Complete ${creator.categories?.[0] || 'Development'} Guide for Beginners`, 
      views: "89K", 
      likes: "4.1K", 
      publishedAt: "1 month ago", 
      thumbnail: "https://placehold.co/640x360/6d28d9/ffffff?text=Tutorial+Video" 
    },
    { 
      id: "video3", 
      title: `${creator.categories?.[1] || 'Advanced'} Tips and Tricks`, 
      views: "210K", 
      likes: "9.8K", 
      publishedAt: "2 months ago", 
      thumbnail: "https://placehold.co/640x360/db2777/ffffff?text=Tips+Video" 
    },
    { 
      id: "video4", 
      title: `Real-world ${creator.categories?.[0] || 'Tech'} Project`, 
      views: "75K", 
      likes: "3.6K", 
      publishedAt: "3 months ago", 
      thumbnail: "https://placehold.co/640x360/16a34a/ffffff?text=Project+Video" 
    },
  ];

  // Placeholder creator playlists
  const creatorPlaylists = [
    { 
      id: "playlist1", 
      title: `${creator.categories?.[0] || 'Development'} Masterclass`, 
      videoCount: 12, 
      thumbnail: "https://placehold.co/640x360/4338ca/ffffff?text=Masterclass" 
    },
    { 
      id: "playlist2", 
      title: `${creator.categories?.[1] || 'Programming'} Fundamentals`, 
      videoCount: 8, 
      thumbnail: "https://placehold.co/640x360/6d28d9/ffffff?text=Fundamentals" 
    },
    { 
      id: "playlist3", 
      title: `Advanced ${creator.categories?.[0] || 'Tech'} Topics`, 
      videoCount: 15, 
      thumbnail: "https://placehold.co/640x360/db2777/ffffff?text=Advanced+Topics" 
    },
  ];

  // Featured video - assume this is the most recent or most popular
  const featuredVideo = creatorVideos[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([creatorSchema, breadcrumbSchema])
        }}
      />

      {/* 1. Enhanced Hero Section with Banner */}
      <div className="relative w-full">
        {/* Banner Image */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/95 mix-blend-overlay z-10" />
          <img 
            src={fallbackStats.bannerUrl} 
            alt={`${creator.name} channel banner`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Creator Profile Info Overlapping Banner */}
        <div className="relative max-w-6xl mx-auto px-4 -mt-24 z-20">
          <div className="glass-effect rounded-xl p-8 border border-border/10 shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Avatar with Subscription Count Badge */}
              <div className="relative -mt-20 md:-mt-24">
                <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-background shadow-xl">
                  <img src={fallbackStats.logoUrl} alt={creator.name} className="object-cover" />
                </Avatar>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-background px-3 py-1.5 rounded-full shadow-lg">
                  <StarRating rating={creator.rating || 4.5} className="scale-100" />
                </div>
              </div>
              
              {/* Creator Info */}
              <div className="space-y-4 flex-1 text-center md:text-left">
                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{creator.name}</h1>
                    <Badge variant="secondary" className="hidden md:inline-flex">
                      {fallbackStats.subscriberCount} subscribers
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {creator.description || `${creator.name} is a tech content creator focused on ${creator.categories?.join(', ') || 'programming and development'}. They share valuable insights, tutorials, and best practices with their audience.`}
                  </p>
                </div>
                
                {/* User Rating Prompt */}
                <div className="bg-accent/30 rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between gap-3 border border-accent/20 mt-2">
                  <div className="flex items-center gap-2">
                    <Medal className="h-5 w-5 text-amber-500" />
                    <span className="font-medium">How helpful is this creator to you?</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star}
                        aria-label={`Rate ${star} stars`}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
                      >
                        <Star 
                          className={`h-6 w-6 ${star <= (creator.rating || 0) ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'}`}
                        />
                      </button>
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">{creator.totalRatings || 0} ratings</span>
                  </div>
                </div>
                
                {/* Metadata Pills */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm">
                  <div className="flex items-center gap-2 glass-effect px-3 py-1.5 rounded-full">
                    <Globe2 className="h-4 w-4 text-primary" />
                    <img
                      src={`https://flagcdn.com/${fallbackStats.country.toLowerCase()}.svg`}
                      alt={`${fallbackStats.country} flag`}
                      className="w-4 h-4 rounded-sm object-cover"
                      loading="lazy"
                    />
                    <span>{fallbackStats.country}</span>
                  </div>
                  <div className="flex items-center gap-2 glass-effect px-3 py-1.5 rounded-full">
                    <Languages className="h-4 w-4 text-primary" />
                    <span>{fallbackStats.language}</span>
                  </div>
                  <div className="flex items-center gap-2 glass-effect px-3 py-1.5 rounded-full">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Joined {fallbackStats.joinedDate}</span>
                  </div>
                  <a 
                    href={`https://youtube.com/channel/${fallbackStats.channelId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-red-600 text-white hover:bg-red-700 px-4 py-1.5 rounded-full transition-colors"
                  >
                    <Youtube className="h-4 w-4" />
                    <span>Subscribe</span>
                  </a>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-4">
                  {(creator.categories || ['Programming', 'Web Development']).map((category) => (
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
              </div>
            </div>
          </div>
        </div>

        {/* Creator Stats Dashboard */}
        <div className="max-w-6xl mx-auto px-4 mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Users2, label: "Subscribers", value: fallbackStats.subscriberCount, color: "bg-blue-500" },
              { icon: Video, label: "Videos", value: fallbackStats.videoCount, color: "bg-purple-500" },
              { icon: TrendingUp, label: "Views", value: fallbackStats.views, color: "bg-green-500" },
              { icon: GraduationCap, label: "Content Level", value: "⭐".repeat(fallbackStats.complexity), color: "bg-amber-500" }
            ].map((stat, index) => (
              <Card key={stat.label} className="hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${stat.color}/10 flex items-center justify-center`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color.split('-')[1]}-500`} />
                    </div>
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-12 py-12">
        {/* 2. Featured Video Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Featured Video</h2>
            <Link 
              href={`https://youtube.com/channel/${fallbackStats.channelId}/videos`}
              target="_blank"
              rel="noopener noreferrer" 
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              View all videos
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6">
            {/* Featured Video - Placeholder instead of actual embed */}
            <div className="md:col-span-3 rounded-xl overflow-hidden shadow-lg aspect-video relative group">
              <img 
                src={featuredVideo.thumbnail} 
                alt={featuredVideo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                <div className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="h-10 w-10 text-white fill-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-semibold text-lg">{featuredVideo.title}</h3>
                <p className="text-white/80 text-sm">{featuredVideo.views} views • {featuredVideo.publishedAt}</p>
              </div>
            </div>
            
            {/* Recent Videos */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="font-semibold text-lg">Recent Videos</h3>
              <div className="space-y-3">
                {creatorVideos.slice(1, 4).map(video => (
                  <div key={video.id} className="flex gap-3 group hover:bg-accent rounded-lg p-2 transition-colors">
                    <div className="w-32 h-18 relative rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center">
                          <Play className="h-5 w-5 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{video.views} views</span>
                        <span>•</span>
                        <span>{video.publishedAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* 3. Structured Content Tabs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Creator Content</h2>
          
          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="videos" className="inline-flex items-center gap-2">
                <Video className="h-4 w-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="playlists" className="inline-flex items-center gap-2">
                <Folder className="h-4 w-4" />
                Playlists
              </TabsTrigger>
              <TabsTrigger value="about" className="inline-flex items-center gap-2">
                <User className="h-4 w-4" />
                About
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="videos" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {creatorVideos.map(video => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-all group">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 bg-primary/90 rounded-full flex items-center justify-center">
                          <Play className="h-7 w-7 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <span>{video.views} views</span>
                        <span>•</span>
                        <span>{video.publishedAt}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="playlists" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {creatorPlaylists.map(playlist => (
                  <Card key={playlist.id} className="flex overflow-hidden hover:shadow-lg transition-all group h-32">
                    <div className="w-44 relative overflow-hidden">
                      <img 
                        src={playlist.thumbnail} 
                        alt={playlist.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-white font-semibold">
                          {playlist.videoCount} videos
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col justify-center">
                      <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {playlist.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Updated recently
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center text-sm text-muted-foreground mt-4">
                <p>Placeholder data - will be replaced with actual playlists</p>
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">About {creator.name}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {creator.description || `${creator.name} is a tech content creator focused on ${creator.categories?.join(', ') || 'programming and development'}. They create educational content to help developers improve their skills and knowledge through in-depth tutorials, code-alongs, and project demonstrations.`}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-border/40">
                    <h4 className="font-medium mb-2">Channel Statistics</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Joined YouTube:</span>
                        <span>{fallbackStats.joinedDate}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Total Videos:</span>
                        <span>{fallbackStats.videoCount}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Total Views:</span>
                        <span>{fallbackStats.views}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Subscribers:</span>
                        <span>{fallbackStats.subscriberCount}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Content Level:</span>
                        <span>{"⭐".repeat(fallbackStats.complexity)}</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Similar Creators Section - Fix Redundancy */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Similar Creators You Might Like</h2>
            <Link 
              href="/creators" 
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              View all creators
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          
          <SimilarCreators currentCreator={creator} allCreators={allCreators} enhanced={true} />
        </section>
      </div>
    </>
  );
}