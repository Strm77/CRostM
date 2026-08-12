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

export default function ContactsBlock({ contacts, onAdd, onUpdate, onDelete }) {
  const [dialogState, setDialogState] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  function openAdd() {
    setName('')
    setEmail('')
    setPhone('')
    setDialogState({ mode: 'add' })
  }

  function openEdit(contact) {
    setName(contact.name)
    setEmail(contact.email)
    setPhone(contact.phone)
    setDialogState({ mode: 'edit', id: contact.id })
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!name.trim()) return
    if (dialogState.mode === 'add') {
      onAdd({ name, email, phone })
    } else {
      onUpdate(dialogState.id, { name, email, phone })
    }
    setDialogState(null)
  }

  return (
    <Paper elevation={0} className="border border-gray-200 p-4">
      <Box className="mb-3 flex items-center justify-between">
        <Typography variant="subtitle1" className="font-medium">
          Contatos
        </Typography>
        <Button size="small" startIcon={<AddRoundedIcon />} onClick={openAdd}>
          Novo contato
        </Button>
      </Box>

      {contacts.length === 0 ? (
        <Typography variant="body2" className="text-gray-500">
          Nenhum contato cadastrado ainda.
        </Typography>
      ) : (
        <List disablePadding>
          {contacts.map((contact) => (
            <ListItem
              key={contact.id}
              divider
              secondaryAction={
                <Box className="flex gap-1">
                  <IconButton size="small" onClick={() => openEdit(contact)} aria-label="Editar contato">
                    <EditRoundedIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton size="small" onClick={() => onDelete(contact.id)} aria-label="Excluir contato">
                    <DeleteRoundedIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={contact.name}
                secondary={[contact.email, contact.phone].filter(Boolean).join(' — ')}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={Boolean(dialogState)} onClose={() => setDialogState(null)} fullWidth maxWidth="xs">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{dialogState?.mode === 'edit' ? 'Editar contato' : 'Novo contato'}</DialogTitle>
          <DialogContent className="flex flex-col gap-4 pt-2!">
            <TextField autoFocus label="Nome" value={name} onChange={(event) => setName(event.target.value)} fullWidth />
            <TextField label="E-mail" type="email" value={email} onChange={(event) => setEmail(event.target.value)} fullWidth />
            <TextField label="Telefone" value={phone} onChange={(event) => setPhone(event.target.value)} fullWidth />
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
