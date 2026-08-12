import { createClient } from '@supabase/supabase-js'

// Preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env (local) ou nas
// variáveis de ambiente do projeto na Vercel com as credenciais do seu
// projeto Supabase para habilitar a autenticação real.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key'

// Quando as variáveis não são configuradas, o cliente aponta para uma URL
// inexistente e qualquer chamada falha com "TypeError: Failed to fetch" —
// um erro de rede genérico e pouco claro. Esse flag permite exibir uma
// mensagem melhor na UI em vez de deixar o erro cru estourar.
export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
)

if (!isSupabaseConfigured) {
  console.error(
    '[Supabase] VITE_SUPABASE_URL e/ou VITE_SUPABASE_ANON_KEY não configuradas. ' +
      'Defina-as nas variáveis de ambiente do projeto (na Vercel: Settings > Environment Variables) ' +
      'e faça um novo deploy.',
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
