'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { measurements } from '@/lib/data'

export default function MyBarChart() {
  const data = measurements.slice(0, 5)

  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="stationId" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="values.pm25" fill="#00ffcc" />
    </BarChart>
  )
}