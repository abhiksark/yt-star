import type { Creator, Category } from "@/lib/types";
import { supabase } from './supabase';

export const categories: Category[] = [
  { name: 'System Design', slug: 'system-design' },
  { name: 'Frontend', slug: 'frontend' },
  { name: 'Backend', slug: 'backend' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'ML', slug: 'machine-learning' },
  { name: 'DevOps', slug: 'devops' },
  { name: 'Data Science', slug: 'data-science' },
  { name: 'Cloud', slug: 'cloud' },
  { name: 'Security', slug: 'security' },
  { name: 'Mobile', slug: 'mobile' },
];

export async function getCreators(): Promise<Creator[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');
  
  if (error) {
    console.error('Error fetching creators:', error);
    return [];
  }
  
  return data;
}

export async function getCreatorBySlug(slug: string): Promise<Creator | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching creator:', error);
    return null;
  }
  
  return data;
}