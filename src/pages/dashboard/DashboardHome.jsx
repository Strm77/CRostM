import { useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import { LineChart } from '@mui/x-charts/LineChart'
import StatTile from './StatTile.jsx'

const WEEKDAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const MONTHS = ['Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago']

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function buildDashboardData() {
  return {
    orders: WEEKDAYS.map(() => randomInt(20, 120)),
    signups: MONTHS.map(() => randomInt(50, 400)),
    stats: [
      { label: 'Usuários ativos', value: randomInt(800, 5000).toLocaleString('pt-BR'), deltaPct: randomInt(-12, 24) },
      {
        label: 'Receita (mês)',
        value: `R$ ${randomInt(8, 60)}.${randomInt(0, 9)}K`,
        deltaPct: randomInt(-12, 24),
      },
      { label: 'Pedidos (mês)', value: randomInt(120, 900).toLocaleString('pt-BR'), deltaPct: randomInt(-12, 24) },
    ].map((stat) => ({ ...stat, trend: Array.from({ length: 12 }, () => randomInt(10, 100)) })),
  }
}

export default function DashboardHome() {
  const [data] = useState(buildDashboardData)

  return (
    <Box className="flex flex-col gap-6">
      <Typography variant="h4" className="font-semibold">
        Dashboard
      </Typography>

      <Box className="flex flex-wrap gap-4">
        {data.stats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </Box>

      <Box className="flex flex-wrap gap-4">
        <Paper elevation={0} className="min-w-[320px] flex-1 border border-gray-200 p-4">
          <Typography variant="subtitle1" className="font-medium">
            Pedidos por dia da semana
          </Typography>
          <BarChart
            series={[{ data: data.orders, label: 'Pedidos', color: '#7c3aed' }]}
            xAxis={[{ scaleType: 'band', data: WEEKDAYS }]}
            height={280}
            borderRadius={4}
            hideLegend
            grid={{ horizontal: true }}
          />
        </Paper>

        <Paper elevation={0} className="min-w-[320px] flex-1 border border-gray-200 p-4">
          <Typography variant="subtitle1" className="font-medium">
            Novos usuários (últimos 6 meses)
          </Typography>
          <LineChart
            series={[{ data: data.signups, label: 'Novos usuários', color: '#1baf7a' }]}
            xAxis={[{ scaleType: 'point', data: MONTHS }]}
            height={280}
            hideLegend
            grid={{ horizontal: true }}
          />
        </Paper>
      </Box>
    </Box>
  )
}
