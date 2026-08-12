import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

function toDatetimeLocal(isoString) {
  const date = new Date(isoString)
  const offset = date.getTimezoneOffset()
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16)
}

export default function TimelineBlock({ events, onAdd, onUpdate, onDelete }) {
  const [dialogState, setDialogState] = useState(null)
  const [label, setLabel] = useState('')
  const [date, setDate] = useState('')

  function openAdd() {
    setLabel('')
    setDate(toDatetimeLocal(new Date().toISOString()))
    setDialogState({ mode: 'add' })
  }

  function openEdit(event) {
    setLabel(event.label)
    setDate(toDatetimeLocal(event.date))
    setDialogState({ mode: 'edit', id: event.id })
  }

  function handleSubmit(formEvent) {
    formEvent.preventDefault()
    if (!label.trim() || !date) return
    const isoDate = new Date(date).toISOString()
    if (dialogState.mode === 'add') {
      onAdd({ label, date: isoDate })
    } else {
      onUpdate(dialogState.id, { label, date: isoDate })
    }
    setDialogState(null)
  }

  return (
    <Paper elevation={0} className="border border-gray-200 p-4">
      <Box className="mb-3 flex items-center justify-between">
        <Typography variant="subtitle1" className="font-medium">
          Timeline
        </Typography>
        <Button size="small" startIcon={<AddRoundedIcon />} onClick={openAdd}>
          Adicionar etapa
        </Button>
      </Box>

      <Box className="flex flex-col">
        {events.map((event, index) => (
          <Box key={event.id} className="flex gap-3">
            <Box className="flex flex-col items-center">
              <Box className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#7c3aed]" />
              {index < events.length - 1 && <Box className="w-px flex-1 bg-gray-200" />}
            </Box>
            <Box className="flex flex-1 items-start justify-between gap-2 pb-4">
              <Box>
                <Typography variant="body2" className="font-medium">
                  {event.label}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  {new Date(event.date).toLocaleString('pt-BR')}
                </Typography>
              </Box>
              <Box className="flex gap-1">
                <IconButton size="small" onClick={() => openEdit(event)} aria-label="Editar etapa">
                  <EditRoundedIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="small" onClick={() => onDelete(event.id)} aria-label="Excluir etapa">
                  <DeleteRoundedIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Dialog open={Boolean(dialogState)} onClose={() => setDialogState(null)} fullWidth maxWidth="xs">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{dialogState?.mode === 'edit' ? 'Editar etapa' : 'Adicionar etapa'}</DialogTitle>
          <DialogContent className="flex flex-col gap-4 pt-2!">
            <TextField autoFocus label="Descrição" value={label} onChange={(event) => setLabel(event.target.value)} fullWidth />
            <TextField
              label="Data"
              type="datetime-local"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogState(null)}>Cancelar</Button>
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Paper>
  )
}
