import { Box, Paper, Typography } from '@mui/material'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded'
import { SparkLineChart } from '@mui/x-charts/SparkLineChart'

const GOOD = '#0ca30c'
const CRITICAL = '#d03b3b'
const MUTED = '#c3c2b7'

export default function StatTile({ label, value, deltaPct, trend }) {
  const isUp = deltaPct >= 0
  const deltaColor = isUp ? GOOD : CRITICAL
  const DeltaIcon = isUp ? ArrowUpwardRoundedIcon : ArrowDownwardRoundedIcon

  return (
    <Paper elevation={0} className="flex-1 min-w-[200px] border border-gray-200 p-4">
      <Typography variant="body2" className="text-gray-500">
        {label}
      </Typography>
      <Box className="mt-1 flex items-end justify-between gap-2">
        <Box>
          <Typography variant="h5" className="font-semibold">
            {value}
          </Typography>
          <Box className="flex items-center gap-0.5" sx={{ color: deltaColor }}>
            <DeltaIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" className="font-medium" sx={{ color: deltaColor }}>
              {Math.abs(deltaPct)}% vs. mês anterior
            </Typography>
          </Box>
        </Box>
        <SparkLineChart data={trend} height={40} width={100} color={MUTED} curve="linear" />
      </Box>
    </Paper>
  )
}
