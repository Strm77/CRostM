import { Box, Button, Chip, Paper, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { useNavigate, useParams } from 'react-router-dom'
import { useOpportunities } from '../../context/OpportunitiesContext.jsx'

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

function Timeline({ items }) {
  return (
    <Box className="flex flex-col">
      {items.map((item, index) => (
        <Box key={item.label} className="flex gap-3">
          <Box className="flex flex-col items-center">
            <Box className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#7c3aed]" />
            {index < items.length - 1 && <Box className="w-px flex-1 bg-gray-200" />}
          </Box>
          <Box className="pb-4">
            <Typography variant="body2" className="font-medium">
              {item.label}
            </Typography>
            <Typography variant="caption" className="text-gray-500">
              {item.date}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default function OpportunityDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getOpportunity } = useOpportunities()
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

  const createdAtLabel = new Date(opportunity.createdAt).toLocaleString('pt-BR')

  return (
    <Box className="flex flex-col gap-6">
      <Button
        startIcon={<ArrowBackRoundedIcon />}
        onClick={() => navigate('/dashboard/oportunidades')}
        className="self-start"
      >
        Oportunidades
      </Button>

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

      <Box className="flex flex-wrap gap-4">
        <Paper elevation={0} className="min-w-[320px] flex-1 border border-gray-200 p-4">
          <Typography variant="subtitle1" className="mb-3 font-medium">
            Informações
          </Typography>
          <Box className="flex flex-col gap-2">
            <InfoRow label="Cliente" value={opportunity.clientName} />
            <InfoRow label="Oportunidade" value={opportunity.opportunityName} />
            <InfoRow label="Número" value={opportunity.number} />
            <InfoRow label="Criada em" value={createdAtLabel} />
          </Box>
        </Paper>

        <Paper elevation={0} className="min-w-[320px] flex-1 border border-gray-200 p-4">
          <Typography variant="subtitle1" className="mb-3 font-medium">
            Financeiro
          </Typography>
          <Box className="flex flex-col gap-2">
            <InfoRow label="Valor estimado" value="Não informado" />
            <InfoRow label="Valor fechado" value="Não informado" />
            <InfoRow label="Probabilidade" value="Não informado" />
          </Box>
        </Paper>
      </Box>

      <Paper elevation={0} className="border border-gray-200 p-4">
        <Typography variant="subtitle1" className="mb-3 font-medium">
          Timeline
        </Typography>
        <Timeline items={[{ label: 'Oportunidade criada', date: createdAtLabel }]} />
      </Paper>

      <Paper elevation={0} className="border border-gray-200 p-4">
        <Typography variant="subtitle1" className="mb-3 font-medium">
          Ações realizadas
        </Typography>
        <Typography variant="body2" className="text-gray-500">
          Nenhuma ação registrada ainda.
        </Typography>
      </Paper>
    </Box>
  )
}
