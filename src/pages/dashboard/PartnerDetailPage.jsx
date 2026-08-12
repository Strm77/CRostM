import { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import { useNavigate, useParams } from 'react-router-dom'
import { usePartners } from '../../context/PartnersContext.jsx'
import PartnerInfoBlock from './partner/PartnerInfoBlock.jsx'
import ContactsBlock from './client/ContactsBlock.jsx'

export default function PartnerDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getPartner, updatePartner, deletePartner, addContact, updateContact, deleteContact } = usePartners()
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  const partner = getPartner(id)

  if (!partner) {
    return (
      <Box className="flex flex-col items-start gap-4">
        <Typography variant="h5" className="font-semibold">
          Parceiro não encontrado.
        </Typography>
        <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate('/dashboard/parceiros')}>
          Voltar para Parceiros
        </Button>
      </Box>
    )
  }

  function handleDelete() {
    deletePartner(partner.id)
    navigate('/dashboard/parceiros')
  }

  return (
    <Box className="flex flex-col gap-6">
      <Box className="flex items-center justify-between">
        <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate('/dashboard/parceiros')} className="self-start">
          Parceiros
        </Button>
        <IconButton color="error" onClick={() => setConfirmDeleteOpen(true)} aria-label="Excluir parceiro">
          <DeleteRoundedIcon />
        </IconButton>
      </Box>

      <Typography variant="h4" className="font-semibold">
        {partner.name}
      </Typography>

      <Box className="flex flex-wrap gap-4">
        <PartnerInfoBlock partner={partner} onSave={(patch) => updatePartner(partner.id, patch)} />
      </Box>

      <ContactsBlock
        contacts={partner.contacts}
        onAdd={(contact) => addContact(partner.id, contact)}
        onUpdate={(contactId, patch) => updateContact(partner.id, contactId, patch)}
        onDelete={(contactId) => deleteContact(partner.id, contactId)}
      />

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Excluir parceiro?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Essa ação não pode ser desfeita. Oportunidades vinculadas a este parceiro perderão a referência.
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
