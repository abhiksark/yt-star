import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/lib/blog";

interface PostSidebarProps {
  post: Post;
}

export function PostSidebar({ post }: PostSidebarProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Share</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Share this article with your network
          </p>
          {/* Add social sharing buttons here */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Coming soon: Related articles based on this post's topics
          </p>
        </CardContent>
      </Card>
    </div>
  );
}