const SUPABASE_URL = (typeof process !== 'undefined' && process.env && process.env.SUPABASE_URL) 
  || (typeof window !== 'undefined' && window.SUPABASE_URL)
  || '';
const SUPABASE_ANON_KEY = (typeof process !== 'undefined' && process.env && process.env.SUPABASE_ANON_KEY) 
  || (typeof window !== 'undefined' && window.SUPABASE_ANON_KEY)
  || '';

export const db = typeof supabase !== 'undefined' && supabase.createClient && SUPABASE_URL && SUPABASE_ANON_KEY
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
