import { useState } from 'react'
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import { useNavigate, useParams } from 'react-router-dom'
import { useOpportunities } from '../../context/OpportunitiesContext.jsx'
import StageStepper from './opportunity/StageStepper.jsx'
import InformacoesBlock from './opportunity/InformacoesBlock.jsx'
import FinanceiroBlock from './opportunity/FinanceiroBlock.jsx'
import TimelineBlock from './opportunity/TimelineBlock.jsx'
import AcoesBlock from './opportunity/AcoesBlock.jsx'
import NotesEditor from './opportunity/NotesEditor.jsx'

export default function OpportunityDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    getOpportunity,
    updateOpportunity,
    updateFinancials,
    updateNotes,
    setStage,
    addTimelineEvent,
    updateTimelineEvent,
    deleteTimelineEvent,
    addAction,
    updateAction,
    deleteAction,
    deleteOpportunity,
  } = useOpportunities()
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  const opportunity = getOpportunity(id)

  if (!opportunity) {
    return (
      <Box className="flex flex-col items-start gap-4">
        <Typography variant="h5" className="font-semibold">
          Oportunidade não encontrada.
        </Typography>
        <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate('/dashboard/oportunidades')}>
          Voltar para Oportunidades
        </Button>
      </Box>
    )
  }

  function handleDelete() {
    deleteOpportunity(opportunity.id)
    navigate('/dashboard/oportunidades')
  }

  return (
    <Box className="flex flex-col gap-6">
      <Box className="flex items-center justify-between">
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate('/dashboard/oportunidades')}
          className="self-start"
        >
          Oportunidades
        </Button>
        <IconButton
          color="error"
          onClick={() => setConfirmDeleteOpen(true)}
          aria-label="Excluir oportunidade"
        >
          <DeleteRoundedIcon />
        </IconButton>
      </Box>

      <Box className="flex flex-wrap items-center gap-3">
        <Chip label={opportunity.number} color="primary" className="font-semibold" />
        <Box>
          <Typography variant="h4" className="font-semibold">
            {opportunity.opportunityName}
          </Typography>
          <Typography variant="subtitle1" className="text-gray-500">
            {opportunity.clientName}
          </Typography>
        </Box>
      </Box>

      <StageStepper stage={opportunity.stage} onChange={(stage) => setStage(opportunity.id, stage)} />

      <Box className="flex flex-col gap-4 md:flex-row md:items-stretch">
        <Box className="flex w-full flex-col gap-4 md:w-1/2">
          <Box className="flex flex-wrap gap-4">
            <InformacoesBlock opportunity={opportunity} onSave={(patch) => updateOpportunity(opportunity.id, patch)} />
            <FinanceiroBlock
              financials={opportunity.financials}
              onSave={(financials) => updateFinancials(opportunity.id, financials)}
            />
          </Box>

          <TimelineBlock
            events={opportunity.timelineEvents}
            onAdd={(event) => addTimelineEvent(opportunity.id, event)}
            onUpdate={(eventId, patch) => updateTimelineEvent(opportunity.id, eventId, patch)}
            onDelete={(eventId) => deleteTimelineEvent(opportunity.id, eventId)}
          />

          <AcoesBlock
            actions={opportunity.actions}
            onAdd={(action) => addAction(opportunity.id, action)}
            onUpdate={(actionId, patch) => updateAction(opportunity.id, actionId, patch)}
            onDelete={(actionId) => deleteAction(opportunity.id, actionId)}
          />
        </Box>

        <Box className="flex w-full md:w-1/2">
          <NotesEditor value={opportunity.notes} onChange={(notes) => updateNotes(opportunity.id, notes)} />
        </Box>
      </Box>

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Excluir oportunidade?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Essa ação não pode ser desfeita. Todos os dados desta oportunidade serão perdidos.
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
