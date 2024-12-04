"use client";

import { PlaylistPreview } from "@/components/playlist-preview";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PlaylistGridProps {
  playlists?: Array<{
    playlistId: string;
    title: string;
    thumbnailUrl: string;
  }>;
  isLoading?: boolean;
}

export function PlaylistGrid({ playlists, isLoading }: PlaylistGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-video" />
            <div className="p-4">
              <Skeleton className="h-4 w-3/4" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!playlists || playlists.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No playlists available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {playlists.map((playlist) => (
        <PlaylistPreview key={playlist.playlistId} playlist={playlist} />
      ))}
    </div>
  );
}