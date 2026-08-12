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
  List,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useNavigate } from 'react-router-dom'
import { useOpportunities } from '../../context/OpportunitiesContext.jsx'

export default function OportunidadesPage() {
  const navigate = useNavigate()
  const { opportunities, addOpportunity } = useOpportunities()
  const [tab, setTab] = useState('lista')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [clientName, setClientName] = useState('')
  const [opportunityName, setOpportunityName] = useState('')

  function handleClose() {
    setDialogOpen(false)
    setClientName('')
    setOpportunityName('')
  }

  function handleCreate(event) {
    event.preventDefault()
    if (!clientName.trim() || !opportunityName.trim()) return
    addOpportunity(clientName, opportunityName)
    handleClose()
  }

  function openOpportunity(id) {
    navigate(`/dashboard/oportunidades/${id}`)
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
              <ListItemText primary={opp.opportunityName} secondary={opp.clientName} />
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
                    {opp.clientName}
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
            <TextField
              autoFocus
              label="Nome do cliente"
              value={clientName}
              onChange={(event) => setClientName(event.target.value)}
              fullWidth
            />
            <TextField
              label="Nome da oportunidade"
              value={opportunityName}
              onChange={(event) => setOpportunityName(event.target.value)}
              fullWidth
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
