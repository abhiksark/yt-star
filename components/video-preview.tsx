"use client";

import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Play } from "lucide-react";
import Link from "next/link";

interface VideoPreviewProps {
  video: {
    _id: string;
    title: string;
    views?: string;
    uploadDate?: string;
    duration?: string;
  };
}

export function VideoPreview({ video }: VideoPreviewProps) {
  return (
    <Link
      href={`https://www.youtube.com/watch?v=${video._id}&autoplay=1`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Card className="group overflow-hidden">
        <div className="aspect-video relative">
          <img
            src={`https://img.youtube.com/vi/${video._id}/maxresdefault.jpg`}
            alt={video.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Play className="w-12 h-12 text-white" />
          </div>
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
              {video.duration}
            </div>
          )}
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {video.views && <span>{video.views} views</span>}
            {video.uploadDate && (
              <>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(video.uploadDate))} ago</span>
              </>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}