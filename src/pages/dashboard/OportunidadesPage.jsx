import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useOpportunities } from '../../context/OpportunitiesContext.jsx'
import { useClients } from '../../context/ClientsContext.jsx'

export default function OportunidadesPage() {
  const navigate = useNavigate()
  const { opportunities, addOpportunity } = useOpportunities()
  const { clients, getClient } = useClients()
  const [tab, setTab] = useState('lista')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [clientId, setClientId] = useState('')
  const [opportunityName, setOpportunityName] = useState('')

  function handleClose() {
    setDialogOpen(false)
    setClientId('')
    setOpportunityName('')
  }

  function handleCreate(event) {
    event.preventDefault()
    if (!clientId || !opportunityName.trim()) return
    addOpportunity(clientId, opportunityName)
    handleClose()
  }

  function openOpportunity(id) {
    navigate(`/dashboard/oportunidades/${id}`)
  }

  function clientLabel(id) {
    return getClient(id)?.name ?? 'Cliente removido'
  }

  return (
    <Box className="flex flex-col gap-6">
      <Box className="flex items-center justify-between">
        <Typography variant="h4" className="font-semibold">
          Oportunidades
        </Typography>
        <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setDialogOpen(true)}>
          Nova oportunidade
        </Button>
      </Box>

      <Tabs value={tab} onChange={(_, value) => setTab(value)}>
        <Tab value="lista" label="Lista" />
        <Tab value="cards" label="Cards" />
      </Tabs>

      {opportunities.length === 0 ? (
        <Typography variant="body1" className="text-gray-500">
          Nenhuma oportunidade criada ainda.
        </Typography>
      ) : tab === 'lista' ? (
        <List className="border border-gray-200" sx={{ bgcolor: 'background.paper' }}>
          {opportunities.map((opp) => (
            <ListItemButton key={opp.id} divider onClick={() => openOpportunity(opp.id)}>
              <ListItemText primary={opp.opportunityName} secondary={clientLabel(opp.clientId)} />
            </ListItemButton>
          ))}
        </List>
      ) : (
        <Box className="flex flex-wrap gap-4">
          {opportunities.map((opp) => (
            <Card key={opp.id} variant="outlined" className="w-64">
              <CardActionArea onClick={() => openOpportunity(opp.id)}>
                <CardContent>
                  <Typography variant="subtitle1" className="font-medium">
                    {opp.opportunityName}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    {clientLabel(opp.clientId)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="xs">
        <Box component="form" onSubmit={handleCreate}>
          <DialogTitle>Nova oportunidade</DialogTitle>
          <DialogContent className="flex flex-col gap-4 pt-2!">
            {clients.length === 0 ? (
              <Typography variant="body2" className="text-gray-500">
                Nenhum cliente cadastrado ainda.{' '}
                <RouterLink to="/dashboard/clientes" onClick={handleClose}>
                  Cadastre um cliente
                </RouterLink>{' '}
                antes de criar uma oportunidade.
              </Typography>
            ) : (
              <FormControl fullWidth>
                <InputLabel id="client-select-label">Cliente</InputLabel>
                <Select
                  labelId="client-select-label"
                  label="Cliente"
                  value={clientId}
                  onChange={(event) => setClientId(event.target.value)}
                  autoFocus
                >
                  {clients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <TextField
              label="Nome da oportunidade"
              value={opportunityName}
              onChange={(event) => setOpportunityName(event.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained" disabled={clients.length === 0}>
              Criar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  )
}
