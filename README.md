# CRostM

Tela de autenticação com abas **Login** e **Sign In** (cadastro).

## Stack

- React + Vite
- React Router
- Tailwind CSS
- MUI (Material UI)
- Supabase (auth)

## Rodando localmente

```bash
npm install
npm run dev
```

## Configurando o Supabase

Copie `.env.example` para `.env` e preencha com as credenciais do seu projeto Supabase:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Sem essas credenciais, os botões de Login/Cadastro exibem um erro de autenticação, mas a interface funciona normalmente.

## Estrutura

- `src/pages/AuthPage.jsx` — tela com as abas Login / Sign In
- `src/pages/LoginForm.jsx` — formulário de login (e-mail + senha)
- `src/pages/SignInForm.jsx` — formulário de cadastro (nome de usuário, e-mail, senha — sem validação)
- `src/lib/supabaseClient.js` — cliente Supabase
