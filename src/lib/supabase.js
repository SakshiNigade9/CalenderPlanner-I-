import { createClient } from "@supabase/supabase-js";

// Debug logs
console.log("SUPABASE_URL =", import.meta.env.VITE_SUPABASE_URL);
console.log(
  "SUPABASE_KEY_EXISTS =",
  !!import.meta.env.VITE_SUPABASE_ANON_KEY
);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Safety check
if (!supabaseUrl) {
  console.error("❌ VITE_SUPABASE_URL is missing");
}

if (!supabaseAnonKey) {
  console.error("❌ VITE_SUPABASE_ANON_KEY is missing");
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);