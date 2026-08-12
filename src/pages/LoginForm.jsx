import { useState } from 'react'
import { Alert, Box, Button, TextField } from '@mui/material'
import { supabase } from '../lib/supabaseClient.js'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)
    setMessage(error ? { type: 'error', text: error.message } : { type: 'success', text: 'Login realizado com sucesso!' })
  }

  return (
    <Box component="form" onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField
        label="E-mail"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        fullWidth
      />
      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        fullWidth
      />

      {message && <Alert severity={message.type}>{message.text}</Alert>}

      <Button type="submit" variant="contained" size="large" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>
    </Box>
  )
}
