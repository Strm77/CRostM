import { Route, Routes } from 'react-router-dom'
import AuthPage from './pages/AuthPage.jsx'
import DashboardLayout from './components/DashboardLayout.jsx'
import DashboardHome from './pages/dashboard/DashboardHome.jsx'
import PlaceholderPage from './pages/dashboard/PlaceholderPage.jsx'
import OportunidadesPage from './pages/dashboard/OportunidadesPage.jsx'
import OpportunityDetailPage from './pages/dashboard/OpportunityDetailPage.jsx'
import { OpportunitiesProvider } from './context/OpportunitiesContext.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route
        path="/dashboard"
        element={
          <OpportunitiesProvider>
            <DashboardLayout />
          </OpportunitiesProvider>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="oportunidades" element={<OportunidadesPage />} />
        <Route path="oportunidades/:id" element={<OpportunityDetailPage />} />
        <Route path="clientes" element={<PlaceholderPage title="Clientes" />} />
        <Route path="perfil" element={<PlaceholderPage title="Perfil" />} />
        <Route path="configuracoes" element={<PlaceholderPage title="Configurações" />} />
      </Route>
    </Routes>
  )
}

export default App
