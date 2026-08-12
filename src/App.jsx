import { Route, Routes } from 'react-router-dom'
import AuthPage from './pages/AuthPage.jsx'
import DashboardLayout from './components/DashboardLayout.jsx'
import DashboardHome from './pages/dashboard/DashboardHome.jsx'
import PlaceholderPage from './pages/dashboard/PlaceholderPage.jsx'
import OportunidadesPage from './pages/dashboard/OportunidadesPage.jsx'
import OpportunityDetailPage from './pages/dashboard/OpportunityDetailPage.jsx'
import ClientesPage from './pages/dashboard/ClientesPage.jsx'
import ClientDetailPage from './pages/dashboard/ClientDetailPage.jsx'
import PartnersPage from './pages/dashboard/PartnersPage.jsx'
import PartnerDetailPage from './pages/dashboard/PartnerDetailPage.jsx'
import { OpportunitiesProvider } from './context/OpportunitiesContext.jsx'
import { ClientsProvider } from './context/ClientsContext.jsx'
import { PartnersProvider } from './context/PartnersContext.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route
        path="/dashboard"
        element={
          <ClientsProvider>
            <PartnersProvider>
              <OpportunitiesProvider>
                <DashboardLayout />
              </OpportunitiesProvider>
            </PartnersProvider>
          </ClientsProvider>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="oportunidades" element={<OportunidadesPage />} />
        <Route path="oportunidades/:id" element={<OpportunityDetailPage />} />
        <Route path="clientes" element={<ClientesPage />} />
        <Route path="clientes/:id" element={<ClientDetailPage />} />
        <Route path="parceiros" element={<PartnersPage />} />
        <Route path="parceiros/:id" element={<PartnerDetailPage />} />
        <Route path="perfil" element={<PlaceholderPage title="Perfil" />} />
        <Route path="configuracoes" element={<PlaceholderPage title="Configurações" />} />
      </Route>
    </Routes>
  )
}

export default App
