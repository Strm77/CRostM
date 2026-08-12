import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  List,
  ListItemButton,
  ListItemText,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useNavigate } from 'react-router-dom'
import { usePartners } from '../../context/PartnersContext.jsx'

export default function PartnersPage() {
  const navigate = useNavigate()
  const { partners, addPartner } = usePartners()
  const [tab, setTab] = useState('lista')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [name, setName] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  function handleClose() {
    setDialogOpen(false)
    setName('')
    setIsPublic(false)
  }

  function handleCreate(event) {
    event.preventDefault()
    if (!name.trim()) return
    addPartner(name, isPublic)
    handleClose()
  }

  function openPartner(id) {
    navigate(`/dashboard/parceiros/${id}`)
  }

  return (
    <Box className="flex flex-col gap-6">
      <Box className="flex items-center justify-between">
        <Typography variant="h4" className="font-semibold">
          Parceiros
        </Typography>
        <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setDialogOpen(true)}>
          Novo parceiro
        </Button>
      </Box>

      <Tabs value={tab} onChange={(_, value) => setTab(value)}>
        <Tab value="lista" label="Lista" />
        <Tab value="cards" label="Cards" />
      </Tabs>

      {partners.length === 0 ? (
        <Typography variant="body1" className="text-gray-500">
          Nenhum parceiro criado ainda.
        </Typography>
      ) : tab === 'lista' ? (
        <List className="border border-gray-200" sx={{ bgcolor: 'background.paper' }}>
          {partners.map((partner) => (
            <ListItemButton key={partner.id} divider onClick={() => openPartner(partner.id)}>
              <ListItemText primary={partner.name} />
              <Chip
                size="small"
                label={partner.isPublic ? 'Público' : 'Privado'}
                color={partner.isPublic ? 'success' : 'default'}
                variant="outlined"
              />
            </ListItemButton>
          ))}
        </List>
      ) : (
        <Box className="flex flex-wrap gap-4">
          {partners.map((partner) => (
            <Card key={partner.id} variant="outlined" className="w-64">
              <CardActionArea onClick={() => openPartner(partner.id)}>
                <CardContent>
                  <Box className="flex items-center justify-between gap-2">
                    <Typography variant="subtitle1" className="font-medium">
                      {partner.name}
                    </Typography>
                    <Chip
                      size="small"
                      label={partner.isPublic ? 'Público' : 'Privado'}
                      color={partner.isPublic ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="xs">
        <Box component="form" onSubmit={handleCreate}>
          <DialogTitle>Novo parceiro</DialogTitle>
          <DialogContent className="flex flex-col gap-4 pt-2!">
            <TextField
              autoFocus
              label="Nome do parceiro"
              value={name}
              onChange={(event) => setName(event.target.value)}
              fullWidth
            />
            <FormControlLabel
              control={<Switch checked={isPublic} onChange={(event) => setIsPublic(event.target.checked)} />}
              label={isPublic ? 'Público' : 'Privado'}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained">
              Criar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  )
}
