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
import EditRoundedIcon from '@mui/icons-material/EditRounded'

function formatCurrency(value) {
  if (value === null || value === undefined || value === '') return 'Não informado'
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

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

export default function FinanceiroBlock({ financials, onSave }) {
  const [open, setOpen] = useState(false)
  const [estimatedValue, setEstimatedValue] = useState(financials.estimatedValue ?? '')
  const [closedValue, setClosedValue] = useState(financials.closedValue ?? '')
  const [probability, setProbability] = useState(financials.probability ?? '')

  function handleOpen() {
    setEstimatedValue(financials.estimatedValue ?? '')
    setClosedValue(financials.closedValue ?? '')
    setProbability(financials.probability ?? '')
    setOpen(true)
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSave({
      estimatedValue: estimatedValue === '' ? null : Number(estimatedValue),
      closedValue: closedValue === '' ? null : Number(closedValue),
      probability: probability === '' ? null : Number(probability),
    })
    setOpen(false)
  }

  return (
    <Paper elevation={0} className="min-w-[320px] flex-1 border border-gray-200 p-4">
      <Box className="mb-3 flex items-center justify-between">
        <Typography variant="subtitle1" className="font-medium">
          Financeiro
        </Typography>
        <IconButton size="small" onClick={handleOpen} aria-label="Editar financeiro">
          <EditRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box className="flex flex-col gap-2">
        <InfoRow label="Valor estimado" value={formatCurrency(financials.estimatedValue)} />
        <InfoRow label="Valor fechado" value={formatCurrency(financials.closedValue)} />
        <InfoRow
          label="Probabilidade"
          value={financials.probability === null || financials.probability === undefined ? 'Não informado' : `${financials.probability}%`}
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>Editar financeiro</DialogTitle>
          <DialogContent className="flex flex-col gap-4 pt-2!">
            <TextField
              autoFocus
              label="Valor estimado (R$)"
              type="number"
              value={estimatedValue}
              onChange={(event) => setEstimatedValue(event.target.value)}
              fullWidth
            />
            <TextField
              label="Valor fechado (R$)"
              type="number"
              value={closedValue}
              onChange={(event) => setClosedValue(event.target.value)}
              fullWidth
            />
            <TextField
              label="Probabilidade (%)"
              type="number"
              slotProps={{ htmlInput: { min: 0, max: 100 } }}
              value={probability}
              onChange={(event) => setProbability(event.target.value)}
              fullWidth
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
