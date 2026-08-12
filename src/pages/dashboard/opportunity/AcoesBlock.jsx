import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
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

export default function AcoesBlock({ actions, onAdd, onUpdate, onDelete }) {
  const [dialogState, setDialogState] = useState(null)
  const [label, setLabel] = useState('')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')

  function openAdd() {
    setLabel('')
    setDate(toDatetimeLocal(new Date().toISOString()))
    setNote('')
    setDialogState({ mode: 'add' })
  }

  function openEdit(action) {
    setLabel(action.label)
    setDate(toDatetimeLocal(action.date))
    setNote(action.note ?? '')
    setDialogState({ mode: 'edit', id: action.id })
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!label.trim() || !date) return
    const isoDate = new Date(date).toISOString()
    if (dialogState.mode === 'add') {
      onAdd({ label, date: isoDate, note })
    } else {
      onUpdate(dialogState.id, { label, date: isoDate, note })
    }
    setDialogState(null)
  }

  return (
    <Paper elevation={0} className="border border-gray-200 p-4">
      <Box className="mb-3 flex items-center justify-between">
        <Typography variant="subtitle1" className="font-medium">
          Ações realizadas
        </Typography>
        <Button size="small" startIcon={<AddRoundedIcon />} onClick={openAdd}>
          Registrar ação
        </Button>
      </Box>

      {actions.length === 0 ? (
        <Typography variant="body2" className="text-gray-500">
          Nenhuma ação registrada ainda.
        </Typography>
      ) : (
        <List disablePadding>
          {actions.map((action) => (
            <ListItem
              key={action.id}
              divider
              secondaryAction={
                <Box className="flex gap-1">
                  <IconButton size="small" onClick={() => openEdit(action)} aria-label="Editar ação">
                    <EditRoundedIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton size="small" onClick={() => onDelete(action.id)} aria-label="Excluir ação">
                    <DeleteRoundedIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={action.label}
                secondary={`${new Date(action.date).toLocaleString('pt-BR')}${action.note ? ` — ${action.note}` : ''}`}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={Boolean(dialogState)} onClose={() => setDialogState(null)} fullWidth maxWidth="xs">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{dialogState?.mode === 'edit' ? 'Editar ação' : 'Registrar ação'}</DialogTitle>
          <DialogContent className="flex flex-col gap-4 pt-2!">
            <TextField autoFocus label="Ação" value={label} onChange={(event) => setLabel(event.target.value)} fullWidth />
            <TextField
              label="Data"
              type="datetime-local"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              fullWidth
            />
            <TextField
              label="Observação (opcional)"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              multiline
              minRows={2}
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
