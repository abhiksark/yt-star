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
  { name: 'Python', slug: 'python' },
  { name: 'Java', slug: 'java' },
  { name: 'Operating Systems', slug: 'os' },
  { name: 'DSA', slug: 'dsa' },
  { name: 'Computer Architecture', slug: 'computer-architecture' },
];

export async function getCreators(): Promise<Creator[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');
  
  if (error) {
    console.error('Error fetching creators:', error);
    return [];
  }
  
  return data || [];
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

export async function getCountries(): Promise<string[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('country');
  
  if (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
  
  return Array.from(new Set(data.map(profile => profile.country).filter(Boolean)));
}