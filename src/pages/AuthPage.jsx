import { useState } from 'react'
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material'
import LoginForm from './LoginForm.jsx'
import SignInForm from './SignInForm.jsx'

export default function AuthPage() {
  const [tab, setTab] = useState('login')

  return (
    <Box className="flex min-h-svh items-center justify-center bg-gray-50 p-4">
      <Paper elevation={3} className="w-full max-w-sm p-8">
        <Typography variant="h5" component="h1" className="mb-6 text-center font-semibold">
          CRostM
        </Typography>

        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          variant="fullWidth"
          className="mb-6"
        >
          <Tab value="login" label="Login" />
          <Tab value="signin" label="Sign In" />
        </Tabs>

        {tab === 'login' ? <LoginForm /> : <SignInForm />}
      </Paper>
    </Box>
  )
}
