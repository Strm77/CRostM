import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient.js'

const DRAWER_WIDTH = 240

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: DashboardRoundedIcon },
  { label: 'Oportunidades', path: '/dashboard/oportunidades', icon: TrendingUpRoundedIcon },
  { label: 'Clientes', path: '/dashboard/clientes', icon: GroupsRoundedIcon },
  { label: 'Parceiros', path: '/dashboard/parceiros', icon: HandshakeRoundedIcon },
  { label: 'Perfil', path: '/dashboard/perfil', icon: PersonRoundedIcon },
  { label: 'Configurações', path: '/dashboard/configuracoes', icon: SettingsRoundedIcon },
]

export default function DashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <Box className="flex min-h-svh">
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        <Toolbar>
          <Typography variant="h6" className="font-semibold">
            CRostM
          </Typography>
        </Toolbar>
        <Divider />
        <List className="flex-1" sx={{ flexGrow: 1 }}>
          {menuItems.map(({ label, path, icon: Icon }) => {
            const selected =
              path === '/dashboard' ? location.pathname === path : location.pathname.startsWith(path)
            return (
              <ListItemButton key={path} selected={selected} onClick={() => navigate(path)}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            )
          })}
        </List>
        <Divider />
        <List>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box component="main" className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </Box>
    </Box>
  )
}
