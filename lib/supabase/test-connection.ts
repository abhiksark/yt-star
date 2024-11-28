import { supabase } from './client';

export async function testSupabaseConnection() {
  try {
    const startTime = performance.now();
    
    // Test query to fetch up to 10 profiles
    const { data, error, count } = await supabase
      .from('profiles')
      .select('*', { count: 'exact' })
      .limit(10);
      
    const endTime = performance.now();
    const queryTime = endTime - startTime;

    if (error) {
      return {
        success: false,
        error: error.message,
        details: {
          code: error.code,
          hint: error.hint,
        },
      };
    }

    return {
      success: true,
      data: {
        recordCount: count,
        sampleData: data,
        performance: {
          queryTimeMs: Math.round(queryTime),
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}