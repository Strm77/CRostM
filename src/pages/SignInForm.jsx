import { useState } from 'react'
import { Alert, Box, Button, TextField } from '@mui/material'
import { supabase } from '../lib/supabaseClient.js'

export default function SignInForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    })

    setLoading(false)
    setMessage(error ? { type: 'error', text: error.message } : { type: 'success', text: 'Cadastro realizado com sucesso!' })
  }

  return (
    <Box component="form" onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField
        label="Nome de usuário"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        fullWidth
      />
      <TextField
        label="E-mail"
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
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </Button>
    </Box>
  )
}
