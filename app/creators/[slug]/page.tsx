// /app/creators/[slug]/page.tsx

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
import { 
  AlertCircle, 
  Users, 
  PlaySquare, 
  Eye, 
  BarChart2,
  Globe2,
  Languages,
  Link as LinkIcon,
  Youtube
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

  return {
    title: `${creator.name} - Tech Content Creator Profile`,
    description: creator.description,
    openGraph: {
      title: `${creator.name} - Tech Content Creator`,
      description: creator.description,
      images: [{ url: creator.logoUrl, width: 176, height: 176, alt: creator.name }],
    },
    alternates: {
      canonical: `/creators/${params.slug}`,
    },
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

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Alert variant="default" className="bg-muted/50 border-muted-foreground/20">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-sm text-muted-foreground">
          Information displayed may not be up-to-date. Statistics are periodically updated.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2">Topics:</span>
          {creator.categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="hover:bg-secondary/80"
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="relative bg-gradient-to-b from-muted/50 to-background rounded-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative">
              <Avatar className="w-24 h-24 ring-2 ring-border">
                <img src={creator.logoUrl || ''} alt={creator.name} className="object-cover" />
              </Avatar>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-background px-2 py-1 rounded-full border shadow-sm">
                <StarRating rating={creator.rating || 0} className="scale-90" />
              </div>
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <h1 className="text-3xl font-bold mb-2">{creator.name}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{creator.description}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Globe2 className="h-4 w-4" />
                  <span>{creator.country}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Languages className="h-4 w-4" />
                  <span>{creator.language}</span>
                </div>
              </div>
              {/* <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <Youtube className="h-4 w-4" />
                  <Link href="#" className="text-primary hover:text-primary/80 font-medium">
                    View Channel
                  </Link>
                </div>
                <div className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" />
                  <Link href="#" className="text-primary hover:text-primary/80 font-medium">
                    Website
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Users className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                <p className="text-2xl font-bold mb-1">{creator.subscriberCount}</p>
                <p className="text-sm text-muted-foreground">Subscribers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <PlaySquare className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                <p className="text-2xl font-bold mb-1">{creator.videoCount}</p>
                <p className="text-sm text-muted-foreground">Videos</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Eye className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                <p className="text-2xl font-bold mb-1">{creator.views}</p>
                <p className="text-sm text-muted-foreground">Views</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <BarChart2 className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                <div className="flex justify-center gap-1 mb-1">
                  {Array.from({ length: creator.complexity }).map((_, i) => (
                    <span key={i} className="w-2 h-2 bg-primary rounded-full" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Content Level</p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="videos">Recent Videos</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
        </TabsList>
        <TabsContent value="videos">
          <div className="text-center py-8 text-muted-foreground">
            Coming soon: Recent videos from {creator.name}
          </div>
        </TabsContent>
        <TabsContent value="playlists">
          <div className="text-center py-8 text-muted-foreground">
            Coming soon: Popular playlists from {creator.name}
          </div>
        </TabsContent>
      </Tabs>

      <SimilarCreators currentCreator={creator} allCreators={allCreators} />
    </div>
  );
}