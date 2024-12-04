import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/blog";

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge>{post.category}</Badge>
          <span className="text-sm text-muted-foreground">
            {formatDate(post.date)}
          </span>
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl">{post.title}</h1>
        <p className="text-xl text-muted-foreground">{post.excerpt}</p>
      </div>

      <div className="aspect-[2/1] relative overflow-hidden rounded-lg">
        <img
          src={post.image.url}
          alt={post.image.alt}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex items-center gap-4 pt-4 border-t">
        <Avatar className="h-10 w-10">
          <img src={post.author.avatar} alt={post.author.name} />
        </Avatar>
        <div>
          <p className="font-medium">{post.author.name}</p>
          <p className="text-sm text-muted-foreground">{post.author.bio}</p>
        </div>
      </div>
    </header>
  );
}