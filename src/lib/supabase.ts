import { createClient } from "@supabase/supabase-js";

// Use environment variables for connection
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY; // Or ideally anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
