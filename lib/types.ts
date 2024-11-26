export interface Creator {
  id: number;
  name: string;
  slug: string;
  logoUrl: string;
  category: string;
  description: string;
  subscriberCount: string;
  videoCount: string | number;
  views: string;
  country: string;
  language: string;
  tags: string[];
  complexity: number;
}

export interface Category {
  name: string;
  slug: string;
}

export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}