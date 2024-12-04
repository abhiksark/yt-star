import { supabase } from './client';
import type { Creator } from '@/lib/types';
import { channelsData } from '@/lib/data';

export async function getFeaturedCreators(): Promise<{ data: Creator[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(3)
      .limit(3);

    if (error || !data) {
      // Fallback to static data if Supabase query fails
      return { 
        data: channelsData.slice(0, 3),
        error: null 
      };
    }

    return { data: data as Creator[], error: null };
  } catch (error) {
    // Fallback to static data on error
    return {
      data: channelsData.slice(0, 3),
      error: null
    };
  }
}