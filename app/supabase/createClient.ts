import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://qrtvihjmkmdegmrfsofm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydHZpaGpta21kZWdtcmZzb2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMzY0NzYsImV4cCI6MjA0ODgxMjQ3Nn0.bHvwRxgNx0sjFr0ipp7RkbyXkxUPiluFQedk1YHGbk8"
);
