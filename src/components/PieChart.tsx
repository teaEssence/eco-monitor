'use client'

import { PieChart, Pie, Tooltip } from 'recharts'
import { measurements } from '@/lib/data'

export default function MyPieChart() {
  const m = measurements[0]

  const data = [
    { name: 'PM2.5', value: m.values.pm25 },
    { name: 'PM10', value: m.values.pm10 },
    { name: 'NO2', value: m.values.no2 },
    { name: 'O3', value: m.values.o3 },
  ]

  return (
    <PieChart width={400} height={300}>
      <Pie data={data} dataKey="value" outerRadius={100} />
      <Tooltip />
    </PieChart>
  )
}