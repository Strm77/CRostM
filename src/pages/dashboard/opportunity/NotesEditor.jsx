import { useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'

export default function NotesEditor({ value, onSave }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  function handleEdit() {
    setDraft(value)
    setIsEditing(true)
  }

  function handleCancel() {
    setDraft(value)
    setIsEditing(false)
  }

  function handleSave() {
    onSave(draft)
    setIsEditing(false)
  }

  return (
    <Paper elevation={0} className="flex min-h-[320px] flex-1 flex-col border border-gray-200 p-4">
      <Box className="mb-3 flex items-center justify-between">
        <Typography variant="subtitle1" className="font-medium">
          Notas (Markdown)
        </Typography>
        {isEditing ? (
          <Box className="flex gap-1">
            <Button size="small" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button size="small" variant="contained" onClick={handleSave}>
              Salvar
            </Button>
          </Box>
        ) : (
          <Button size="small" startIcon={<EditRoundedIcon fontSize="small" />} onClick={handleEdit}>
            Editar
          </Button>
        )}
      </Box>

      {isEditing ? (
        <Box
          component="textarea"
          autoFocus
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={'Escreva anotações em Markdown...\n\n# Título\n- item 1\n- item 2'}
          className="w-full flex-1 resize-none border-0 bg-transparent font-mono text-sm text-gray-800 outline-none placeholder:text-gray-400"
        />
      ) : value ? (
        <Box
          component="pre"
          className="w-full flex-1 overflow-auto whitespace-pre-wrap break-words border-0 bg-transparent font-mono text-sm text-gray-800"
        >
          {value}
        </Box>
      ) : (
        <Typography variant="body2" className="text-gray-400">
          Nenhuma nota adicionada ainda.
        </Typography>
      )}
    </Paper>
  )
}
