const SUPABASE_URL = (typeof process !== 'undefined' && process.env && process.env.SUPABASE_URL) 
  || (typeof window !== 'undefined' && window.SUPABASE_URL)
  || '';
const SUPABASE_ANON_KEY = (typeof process !== 'undefined' && process.env && process.env.SUPABASE_ANON_KEY) 
  || (typeof window !== 'undefined' && window.SUPABASE_ANON_KEY)
  || '';

let client = null;
if (typeof supabase !== 'undefined' && supabase.createClient && SUPABASE_URL && SUPABASE_ANON_KEY) {
  try {
    client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (e) {
    console.warn('Failed to initialize Supabase client:', e);
  }
}

export const db = client || {
  from: () => ({
    select: async () => ({ data: [], error: null }),
    insert: async (records) => ({ data: records, error: null }),
    update: async () => ({ data: [], error: null }),
    delete: async () => ({ data: [], error: null })
  })
};
