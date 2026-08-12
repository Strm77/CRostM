import { Box, Paper, Typography } from '@mui/material'

export default function NotesEditor({ value, onChange }) {
  return (
    <Paper elevation={0} className="flex h-full min-h-[420px] flex-1 flex-col border border-gray-200 p-4">
      <Typography variant="subtitle1" className="mb-3 font-medium">
        Notas (Markdown)
      </Typography>
      <Box
        component="textarea"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={'Escreva anotações em Markdown...\n\n# Título\n- item 1\n- item 2'}
        className="w-full flex-1 resize-none border-0 bg-transparent font-mono text-sm text-gray-800 outline-none placeholder:text-gray-400"
      />
    </Paper>
  )
}
