import { createClient } from '@supabase/supabase-js'

// Preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env com as
// credenciais do seu projeto Supabase para habilitar a autenticação real.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
