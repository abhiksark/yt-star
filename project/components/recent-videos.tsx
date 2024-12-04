import { Card } from "@/components/ui/card";

interface Video {
  title: string;
  views: string;
  thumbnail: string;
}

interface RecentVideosProps {
  videos: Video[];
}

export function RecentVideos({ videos }: RecentVideosProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {videos.map((video, index) => (
        <Card key={index} className="overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold">{video.title}</h3>
            <p className="text-sm text-muted-foreground">{video.views} views</p>
          </div>
        </Card>
      ))}
    </div>
  );
}