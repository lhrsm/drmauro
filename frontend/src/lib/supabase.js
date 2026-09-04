import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wbjtagnxxerwhoewhtmc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_G70HiOyywwXk-QKFwwY5LA_5audGAjt';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
