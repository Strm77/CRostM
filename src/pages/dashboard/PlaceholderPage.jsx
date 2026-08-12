import { Box, Typography } from '@mui/material'

export default function PlaceholderPage({ title }) {
  return (
    <Box className="flex flex-col gap-2">
      <Typography variant="h4" className="font-semibold">
        {title}
      </Typography>
      <Typography variant="body1" className="text-gray-500">
        Em construção.
      </Typography>
    </Box>
  )
}
