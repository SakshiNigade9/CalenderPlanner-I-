import { createClient } from "@supabase/supabase-js";

// Debug logs
console.log("SUPABASE_URL =", import.meta.env.VITE_SUPABASE_URL);
console.log(
  "SUPABASE_KEY_EXISTS =",
  !!import.meta.env.VITE_SUPABASE_ANON_KEY
);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

<<<<<<< HEAD:src/lib/supabase.js
export const supabase =
  console.log("SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("SUPABASE KEY EXISTS:", !!import.meta.env.VITE_SUPABASE_ANON_KEY);
  createClient(
    supabaseUrl,
    supabaseAnonKey
  );
=======
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
>>>>>>> 3afb548 (debug supabase env):frontend/src/lib/supabase.js
