import { supabase } from './client';
import { ProfileSchema, Profile } from './types';
import { PostgrestError } from '@supabase/supabase-js';

export class ProfileService {
  /**
   * Create a new profile
   */
  static async create(profile: Omit<Profile, 'id'>): Promise<{ data: Profile | null; error: PostgrestError | null }> {
    try {
      // Validate profile data
      const validatedData = ProfileSchema.omit({ id: true }).parse(profile);

      const { data, error } = await supabase
        .from('profiles')
        .insert(validatedData)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error: error as PostgrestError };
    }
  }

  /**
   * Get a profile by ID
   */
  static async getById(id: number): Promise<{ data: Profile | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  }

  /**
   * Get profiles with optional filters
   */
  static async getProfiles(options: {
    category?: string;
    country?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    let query = supabase.from('profiles').select('*');

    if (options.category) {
      query = query.contains('category', [options.category]);
    }

    if (options.country) {
      query = query.eq('country', options.country.toUpperCase());
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;
    return { data, error };
  }

  /**
   * Update a profile
   */
  static async update(id: number, updates: Partial<Omit<Profile, 'id'>>): Promise<{ data: Profile | null; error: PostgrestError | null }> {
    try {
      // Validate update data
      const validatedData = ProfileSchema.partial().omit({ id: true }).parse(updates);

      const { data, error } = await supabase
        .from('profiles')
        .update(validatedData)
        .eq('id', id)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error: error as PostgrestError };
    }
  }

  /**
   * Delete a profile
   */
  static async delete(id: number): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);

    return { error };
  }

  /**
   * Search profiles by name or description
   */
  static async search(query: string, limit = 10): Promise<{ data: Profile[] | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(limit);

    return { data, error };
  }
}