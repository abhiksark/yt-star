'use client';

import { useState, useCallback } from 'react';
import { Profile } from '../types';
import { ProfileService } from '../profiles';
import { PostgrestError } from '@supabase/supabase-js';

interface UseProfilesOptions {
  initialProfiles?: Profile[];
}

export function useProfiles(options: UseProfilesOptions = {}) {
  const [profiles, setProfiles] = useState<Profile[]>(options.initialProfiles || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  const fetchProfiles = useCallback(async (filters?: Parameters<typeof ProfileService.getProfiles>[0]) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await ProfileService.getProfiles(filters);
      
      if (error) {
        setError(error);
      } else {
        setProfiles(data || []);
      }
    } catch (err) {
      setError(err as PostgrestError);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProfile = useCallback(async (profile: Omit<Profile, 'id'>) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await ProfileService.create(profile);
      
      if (error) {
        setError(error);
      } else if (data) {
        setProfiles(prev => [...prev, data]);
      }
      
      return { data, error };
    } catch (err) {
      setError(err as PostgrestError);
      return { data: null, error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (id: number, updates: Partial<Omit<Profile, 'id'>>) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await ProfileService.update(id, updates);
      
      if (error) {
        setError(error);
      } else if (data) {
        setProfiles(prev => prev.map(p => p.id === id ? data : p));
      }
      
      return { data, error };
    } catch (err) {
      setError(err as PostgrestError);
      return { data: null, error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProfile = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await ProfileService.delete(id);
      
      if (error) {
        setError(error);
      } else {
        setProfiles(prev => prev.filter(p => p.id !== id));
      }
      
      return { error };
    } catch (err) {
      setError(err as PostgrestError);
      return { error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    profiles,
    loading,
    error,
    fetchProfiles,
    createProfile,
    updateProfile,
    deleteProfile
  };
}