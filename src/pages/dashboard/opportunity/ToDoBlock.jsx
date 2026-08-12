import { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, TextField, Typography } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded'

export default function ToDoBlock({ todos, onAdd, onUpdate, onDelete, onComplete }) {
  const [dialogState, setDialogState] = useState(null)
  const [text, setText] = useState('')

  function openAdd() {
    setText('')
    setDialogState({ mode: 'add' })
  }

  function openEdit(todo) {
    setText(todo.text)
    setDialogState({ mode: 'edit', id: todo.id })
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!text.trim()) return
    if (dialogState.mode === 'add') {
      onAdd(text)
    } else {
      onUpdate(dialogState.id, { text })
    }
    setDialogState(null)
  }

  return (
    <Paper elevation={0} className="border border-gray-200 p-4">
      <Box className="mb-3 flex items-center justify-between">
        <Typography variant="subtitle1" className="font-medium">
          To Do
        </Typography>
        <Button size="small" startIcon={<AddRoundedIcon />} onClick={openAdd}>
          Nova tarefa
        </Button>
      </Box>

      {todos.length === 0 ? (
        <Typography variant="body2" className="text-gray-500">
          Nenhuma tarefa pendente.
        </Typography>
      ) : (
        <Box className="flex flex-col">
          {todos.map((todo) => (
            <Box key={todo.id} className="flex items-center justify-between gap-2 border-b border-gray-100 py-2 last:border-b-0">
              <Box className="flex items-center gap-2">
                <IconButton size="small" onClick={() => onComplete(todo.id)} aria-label="Concluir tarefa">
                  <RadioButtonUncheckedRoundedIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2">{todo.text}</Typography>
              </Box>
              <Box className="flex gap-1">
                <IconButton size="small" onClick={() => openEdit(todo)} aria-label="Editar tarefa">
                  <EditRoundedIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="small" onClick={() => onDelete(todo.id)} aria-label="Excluir tarefa">
                  <DeleteRoundedIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <Dialog open={Boolean(dialogState)} onClose={() => setDialogState(null)} fullWidth maxWidth="xs">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{dialogState?.mode === 'edit' ? 'Editar tarefa' : 'Nova tarefa'}</DialogTitle>
          <DialogContent className="flex flex-col gap-4 pt-2!">
            <TextField autoFocus label="Tarefa" value={text} onChange={(event) => setText(event.target.value)} fullWidth />
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
