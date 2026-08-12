import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { useClients } from '../../../context/ClientsContext.jsx'

function InfoRow({ label, value }) {
  return (
    <Box className="flex items-center justify-between gap-4">
      <Typography variant="body2" className="text-gray-500">
        {label}
      </Typography>
      <Typography variant="body2" className="font-medium">
        {value}
      </Typography>
    </Box>
  )
}

export default function InformacoesBlock({ opportunity, onSave }) {
  const { clients, getClient } = useClients()
  const [open, setOpen] = useState(false)
  const [clientId, setClientId] = useState(opportunity.clientId)
  const [opportunityName, setOpportunityName] = useState(opportunity.opportunityName)
  const [number, setNumber] = useState(opportunity.number)

  function handleOpen() {
    setClientId(opportunity.clientId)
    setOpportunityName(opportunity.opportunityName)
    setNumber(opportunity.number)
    setOpen(true)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!clientId || !opportunityName.trim() || !number.trim()) return
    onSave({ clientId, opportunityName, number })
    setOpen(false)
  }

  const createdAtLabel = new Date(opportunity.createdAt).toLocaleString('pt-BR')

  return (
    <Paper elevation={0} className="min-w-[320px] flex-1 border border-gray-200 p-4">
      <Box className="mb-3 flex items-center justify-between">
        <Typography variant="subtitle1" className="font-medium">
          Informações
        </Typography>
        <IconButton size="small" onClick={handleOpen} aria-label="Editar informações">
          <EditRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box className="flex flex-col gap-2">
        <InfoRow label="Cliente" value={getClient(opportunity.clientId)?.name ?? 'Cliente removido'} />
        <InfoRow label="Oportunidade" value={opportunity.opportunityName} />
        <InfoRow label="Número" value={opportunity.number} />
        <InfoRow label="Criada em" value={createdAtLabel} />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>Editar informações</DialogTitle>
          <DialogContent className="flex flex-col gap-4 pt-2!">
            <FormControl fullWidth>
              <InputLabel id="opp-client-select-label">Cliente</InputLabel>
              <Select
                labelId="opp-client-select-label"
                label="Cliente"
                value={clientId ?? ''}
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
            <TextField
              label="Nome da oportunidade"
              value={opportunityName}
              onChange={(event) => setOpportunityName(event.target.value)}
              fullWidth
            />
            <TextField label="Número" value={number} onChange={(event) => setNumber(event.target.value)} fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Paper>
  )
}
