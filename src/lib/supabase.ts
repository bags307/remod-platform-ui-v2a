import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const authEndpoint = import.meta.env.VITE_AUTH_ENDPOINT;

if (!supabaseUrl || !supabaseAnonKey || !authEndpoint) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'pkce',
    redirectTo: authEndpoint,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});