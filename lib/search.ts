import { Creator } from "@/lib/types";
import { supabase, isSupabaseConfigured } from "./supabase";

export async function searchCreators(query: string): Promise<Creator[]> { 
  const trimmedQuery = query.trim();
  
  if (!trimmedQuery || !isSupabaseConfigured()) {
    return [];
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .or(`name.ilike.%${trimmedQuery}%,description.ilike.%${trimmedQuery}%`)
    .limit(10);

  if (error) {
    console.error('Error searching creators:', error);
    return [];
  }

  return data || [];
}