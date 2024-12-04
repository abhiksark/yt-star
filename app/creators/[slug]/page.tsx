import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
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
  Languages
} from "lucide-react";
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

      <div className="grid md:grid-cols-[auto,1fr] gap-6 items-start">
        <div className="space-y-4">
          <Avatar className="w-24 h-24">
            <img src={creator.logoUrl || ''} alt={creator.name} />
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{creator.name}</h1>
            <p className="text-muted-foreground">{creator.categories[0]}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {creator.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Globe2 className="h-4 w-4" />
              <span>{creator.country}</span>
            </div>
            <div className="flex items-center gap-1">
              <Languages className="h-4 w-4" />
              <span>{creator.language}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex flex-col items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-medium">Subscribers</p>
                <p className="text-2xl font-bold">{creator.subscriberCount}</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex flex-col items-center gap-2">
                <PlaySquare className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-medium">Videos</p>
                <p className="text-2xl font-bold">{creator.videoCount}</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex flex-col items-center gap-2">
                <Eye className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-medium">Views</p>
                <p className="text-2xl font-bold">{creator.views}</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex flex-col items-center gap-2">
                <BarChart2 className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-medium">Complexity</p>
                <div className="flex gap-1">
                  {Array.from({ length: creator.complexity }).map((_, i) => (
                    <span key={i} className="w-2 h-2 bg-primary rounded-full" />
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <p className="text-lg">{creator.description}</p>
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