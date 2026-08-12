import { createClient } from '@supabase/supabase-js'

// A anon key do Supabase é uma credencial pública por design (protegida por
// RLS no banco, não por sigilo), então é seguro usá-la como padrão aqui.
// VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY continuam disponíveis para
// apontar para outro projeto Supabase (ex: ambiente local) sem editar código.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://szrihlwaqjuzqcchhnpy.supabase.co'
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6cmlobHdhcWp1enFjY2hobnB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NTQ5MDgsImV4cCI6MjEwMjEzMDkwOH0.QtrXFEkon6tBQLNileu6zEk2MBNZJPDYfhykfwJmggg'

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
