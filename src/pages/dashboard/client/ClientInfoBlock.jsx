import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'

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

export default function ClientInfoBlock({ client, onSave }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(client.name)
  const [isPublic, setIsPublic] = useState(client.isPublic)

  function handleOpen() {
    setName(client.name)
    setIsPublic(client.isPublic)
    setOpen(true)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!name.trim()) return
    onSave({ name, isPublic })
    setOpen(false)
  }

  const createdAtLabel = new Date(client.createdAt).toLocaleString('pt-BR')

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
        <InfoRow label="Nome do cliente" value={client.name} />
        <InfoRow label="Visibilidade" value={client.isPublic ? 'Público' : 'Privado'} />
        <InfoRow label="Criado em" value={createdAtLabel} />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>Editar informações</DialogTitle>
          <DialogContent className="flex flex-col gap-4 pt-2!">
            <TextField autoFocus label="Nome do cliente" value={name} onChange={(event) => setName(event.target.value)} fullWidth />
            <FormControlLabel
              control={<Switch checked={isPublic} onChange={(event) => setIsPublic(event.target.checked)} />}
              label={isPublic ? 'Público' : 'Privado'}
            />
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
