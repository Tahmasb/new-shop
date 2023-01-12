import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  "https://irzratzvffopwztyalib.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyenJhdHp2ZmZvcHd6dHlhbGliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA3NjE0NjgsImV4cCI6MTk4NjMzNzQ2OH0.7ZpWVIF_-ubc_5Gyxm-Kyn5ak4YQaJ1u8dQ_BXL5Gng"
)
