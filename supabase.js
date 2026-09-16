const SUPABASE_URL = (typeof process !== 'undefined' && process.env && process.env.SUPABASE_URL) 
  || 'https://jmuvrmtpvpofiddbifap.supabase.co';
const SUPABASE_ANON_KEY = (typeof process !== 'undefined' && process.env && process.env.SUPABASE_ANON_KEY) 
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptdXZybXRwdnBvZmlkZGJpZmFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MTA0NDEsImV4cCI6MjEwNDk4NjQ0MX0.ruEGSFFCzAZMZcte9P97xzoAeUadJHHW0P_BgoGyhe8';

export const db = typeof supabase !== 'undefined' && supabase.createClient
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
