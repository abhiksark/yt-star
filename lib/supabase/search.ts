import { supabase } from './client';
import type { Creator } from '@/lib/types';
import { channelsData } from '@/lib/data';

export async function searchCreators(query: string): Promise<{ data: Creator[] | null; error: Error | null }> {
  if (!query.trim()) {
    return { data: [], error: null };
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.cs.{${query}}`)
      .limit(10);

    if (error) {
      // Fallback to local search if Supabase query fails
      const filteredCreators = channelsData.filter(creator => 
        creator.name.toLowerCase().includes(query.toLowerCase()) ||
        creator.description.toLowerCase().includes(query.toLowerCase()) ||
        creator.category.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
      );
      return { data: filteredCreators, error: null };
    }

    return { data: data as Creator[], error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}