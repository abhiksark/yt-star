import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Default to empty string to prevent invalid URL error
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

// Helper function to check if Supabase is properly configured
export function isSupabaseConfigured() {
  return supabaseUrl !== 'https://placeholder.supabase.co' && 
         supabaseKey !== 'placeholder-key';
}