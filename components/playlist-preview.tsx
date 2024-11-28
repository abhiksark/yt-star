"use client";

import { Card } from "@/components/ui/card";
import { PlaySquare } from "lucide-react";
import Link from "next/link";

interface PlaylistPreviewProps {
  playlist: {
    playlistId: string;
    title: string;
    thumbnailUrl: string;
  };
}

export function PlaylistPreview({ playlist }: PlaylistPreviewProps) {
  return (
    <Link
      href={`https://www.youtube.com/playlist?list=${playlist.playlistId}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Card className="group overflow-hidden">
        <div className="aspect-video relative">
          <img
            src={playlist.thumbnailUrl}
            alt={playlist.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <PlaySquare className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
            {playlist.title}
          </h3>
        </div>
      </Card>
    </Link>
  );
}