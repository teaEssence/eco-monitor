'use client'

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { measurements } from '@/lib/data'

type TooltipPayload = {
  name: string
  value: number
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean
  payload?: TooltipPayload[]
}) => {
  if (active && payload && payload.length) {
    const data = payload[0]

    return (
      <div
        style={{
          background: '#111',
          border: '1px solid #00ffcc',
          padding: '6px',
          color: '#00ffcc',
        }}
      >
        <p>{data.name}</p>
        <p>{data.value} µg/m³</p>
      </div>
    )
  }

  return null
}

export default function PollutionPieChart({
  stationId,
}: {
  stationId: string
}) {
  const m = measurements.find((m) => m.stationId === stationId)

  if (!m) return null

  const data = [
    { name: 'PM2.5', value: m.values.pm25, color: '#00ffcc' },
    { name: 'PM10', value: m.values.pm10, color: '#ff00ff' },
    { name: 'NO2', value: m.values.no2, color: '#ffff00' },
    { name: 'O3', value: m.values.o3, color: '#00ff66' },
  ]

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="value"
        outerRadius={100}
        labelLine={false}
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={entry.color} />
        ))}
      </Pie>

      <Tooltip content={<CustomTooltip />} />

      <Legend />
    </PieChart>
  )
}