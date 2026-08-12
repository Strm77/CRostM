import { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import { useNavigate, useParams } from 'react-router-dom'
import { useClients } from '../../context/ClientsContext.jsx'
import ClientInfoBlock from './client/ClientInfoBlock.jsx'
import ContactsBlock from './client/ContactsBlock.jsx'

export default function ClientDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getClient, updateClient, deleteClient, addContact, updateContact, deleteContact } = useClients()
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  const client = getClient(id)

  if (!client) {
    return (
      <Box className="flex flex-col items-start gap-4">
        <Typography variant="h5" className="font-semibold">
          Cliente não encontrado.
        </Typography>
        <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate('/dashboard/clientes')}>
          Voltar para Clientes
        </Button>
      </Box>
    )
  }

  function handleDelete() {
    deleteClient(client.id)
    navigate('/dashboard/clientes')
  }

  return (
    <Box className="flex flex-col gap-6">
      <Box className="flex items-center justify-between">
        <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate('/dashboard/clientes')} className="self-start">
          Clientes
        </Button>
        <IconButton color="error" onClick={() => setConfirmDeleteOpen(true)} aria-label="Excluir cliente">
          <DeleteRoundedIcon />
        </IconButton>
      </Box>

      <Typography variant="h4" className="font-semibold">
        {client.name}
      </Typography>

      <Box className="flex flex-wrap gap-4">
        <ClientInfoBlock client={client} onSave={(patch) => updateClient(client.id, patch)} />
      </Box>

      <ContactsBlock
        contacts={client.contacts}
        onAdd={(contact) => addContact(client.id, contact)}
        onUpdate={(contactId, patch) => updateContact(client.id, contactId, patch)}
        onDelete={(contactId) => deleteContact(client.id, contactId)}
      />

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Excluir cliente?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Essa ação não pode ser desfeita. Oportunidades vinculadas a este cliente perderão a referência.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
