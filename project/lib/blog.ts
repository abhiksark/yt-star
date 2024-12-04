export interface Author {
  name: string;
  avatar: string;
  bio: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: Author;
  category: string;
  tags: string[];
  image: {
    url: string;
    alt: string;
  };
}

export function getAllPosts(): Post[] {
  // This would typically fetch from a CMS or database
  return [
    {
      slug: "weekly-spotlight-theo",
      title: "Weekly Spotlight: Theo - Building the Future of Web Development",
      excerpt: "An in-depth look at how Theo is revolutionizing web development education through practical, real-world tutorials and insights.",
      content: "",
      date: new Date().toISOString(),
      author: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&h=250&fit=crop",
        bio: "Tech content strategist with 8+ years of experience",
      },
      category: "Creator Spotlight",
      tags: ["web development", "education", "typescript"],
      image: {
        url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
        alt: "Tech creator working on content",
      },
    },
    {
      slug: "tech-controversy-ai",
      title: "The AI Ethics Debate: Where Do We Draw the Line?",
      excerpt: "Exploring the ongoing controversy around AI ethics and its impact on content creation.",
      content: "",
      date: new Date().toISOString(),
      author: {
        name: "Michael Park",
        avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=250&h=250&fit=crop",
        bio: "Tech ethics researcher and writer",
      },
      category: "Controversy",
      tags: ["AI", "ethics", "technology"],
      image: {
        url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
        alt: "AI controversy illustration",
      },
    },
    {
      slug: "future-of-tech-education",
      title: "The Evolution of Online Tech Education",
      excerpt: "How content creators are shaping the future of technical education and skill development.",
      content: "",
      date: new Date().toISOString(),
      author: {
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&h=250&fit=crop",
        bio: "EdTech specialist and community builder",
      },
      category: "Industry Insights",
      tags: ["education", "future", "community"],
      image: {
        url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
        alt: "Modern tech education",
      },
    },
  ];
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}