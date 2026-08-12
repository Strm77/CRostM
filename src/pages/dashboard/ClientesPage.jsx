import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  List,
  ListItemButton,
  ListItemText,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useNavigate } from 'react-router-dom'
import { useClients } from '../../context/ClientsContext.jsx'

export default function ClientesPage() {
  const navigate = useNavigate()
  const { clients, addClient } = useClients()
  const [tab, setTab] = useState('lista')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [name, setName] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  function handleClose() {
    setDialogOpen(false)
    setName('')
    setIsPublic(false)
  }

  function handleCreate(event) {
    event.preventDefault()
    if (!name.trim()) return
    addClient(name, isPublic)
    handleClose()
  }

  function openClient(id) {
    navigate(`/dashboard/clientes/${id}`)
  }

  return (
    <Box className="flex flex-col gap-6">
      <Box className="flex items-center justify-between">
        <Typography variant="h4" className="font-semibold">
          Clientes
        </Typography>
        <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setDialogOpen(true)}>
          Novo cliente
        </Button>
      </Box>

      <Tabs value={tab} onChange={(_, value) => setTab(value)}>
        <Tab value="lista" label="Lista" />
        <Tab value="cards" label="Cards" />
      </Tabs>

      {clients.length === 0 ? (
        <Typography variant="body1" className="text-gray-500">
          Nenhum cliente criado ainda.
        </Typography>
      ) : tab === 'lista' ? (
        <List className="border border-gray-200" sx={{ bgcolor: 'background.paper' }}>
          {clients.map((client) => (
            <ListItemButton key={client.id} divider onClick={() => openClient(client.id)}>
              <ListItemText primary={client.name} />
              <Chip
                size="small"
                label={client.isPublic ? 'Público' : 'Privado'}
                color={client.isPublic ? 'success' : 'default'}
                variant="outlined"
              />
            </ListItemButton>
          ))}
        </List>
      ) : (
        <Box className="flex flex-wrap gap-4">
          {clients.map((client) => (
            <Card key={client.id} variant="outlined" className="w-64">
              <CardActionArea onClick={() => openClient(client.id)}>
                <CardContent>
                  <Box className="flex items-center justify-between gap-2">
                    <Typography variant="subtitle1" className="font-medium">
                      {client.name}
                    </Typography>
                    <Chip
                      size="small"
                      label={client.isPublic ? 'Público' : 'Privado'}
                      color={client.isPublic ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="xs">
        <Box component="form" onSubmit={handleCreate}>
          <DialogTitle>Novo cliente</DialogTitle>
          <DialogContent className="flex flex-col gap-4 pt-2!">
            <TextField
              autoFocus
              label="Nome do cliente"
              value={name}
              onChange={(event) => setName(event.target.value)}
              fullWidth
            />
            <FormControlLabel
              control={<Switch checked={isPublic} onChange={(event) => setIsPublic(event.target.checked)} />}
              label={isPublic ? 'Público' : 'Privado'}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained">
              Criar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  )
}
