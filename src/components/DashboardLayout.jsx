import { useState } from 'react'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
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
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  function goTo(path) {
    navigate(path)
    setMobileOpen(false)
  }

  const drawerContent = (
    <>
      <Toolbar>
        <Typography variant="h6" className="font-semibold">
          CRostM
        </Typography>
      </Toolbar>
      <Divider />
      <List className="flex-1" sx={{ flexGrow: 1 }}>
        {menuItems.map(({ label, path, icon: Icon }) => {
          const selected = path === '/dashboard' ? location.pathname === path : location.pathname.startsWith(path)
          return (
            <ListItemButton key={path} selected={selected} onClick={() => goTo(path)}>
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
    </>
  )

  return (
    <Box className="flex min-h-svh">
      <AppBar
        position="fixed"
        elevation={0}
        className="border-b border-gray-200 bg-white!"
        sx={{ display: { md: 'none' }, width: '100%' }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
            <MenuRoundedIcon className="text-gray-900" />
          </IconButton>
          <Typography variant="h6" className="ml-2 font-semibold text-gray-900">
            CRostM
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        className="flex-1 bg-gray-50 p-6"
        sx={{ mt: { xs: 7, md: 0 }, width: { md: `calc(100% - ${DRAWER_WIDTH}px)` } }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
