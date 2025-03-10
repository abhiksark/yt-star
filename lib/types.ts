export interface Creator {
  id: number;
  name: string;
  slug: string;
  logoUrl: string;
  description: string;
  subscriberCount: string;
  videoCount: string | number;
  views: string;
  country: string;
  language: string;
  categories: string[];
  complexity: number;
  rating?: number;
  channelId: string;
  bannerUrl: string;
  totalRatings?: number;
}

export interface Category {
  name: string;
  slug: string;
  description?: string;
}

export interface Country {
  code: string;
  name: string;
  slug: string;
}

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}