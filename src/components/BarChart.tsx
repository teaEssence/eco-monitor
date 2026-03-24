'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import { stations, measurements } from '@/lib/data'

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean
  payload?: { name: string; value: number }[]
}) => {
  if (active && payload && payload.length) {
    const data = payload[0]

    return (
      <div style={{
        background: '#111',
        border: '1px solid #00ffcc',
        padding: '6px',
        color: '#00ffcc',
      }}>
        <p>{data.name}</p>
        <p>{data.value} µg/m³</p>
      </div>
    )
  }
  return null
}

function getColor(value: number) {
  if (value < 25) return '#00ff66'
  if (value < 50) return '#ffaa00'
  return '#ff4444'
}

export default function MyBarChart() {
  const data = stations.map((station) => {
    const m = measurements.find((m) => m.stationId === station.id)

    return {
      name: station.name,
      value: m?.values.pm25 ?? 0,
    }
  })

  data.sort((a, b) => b.value - a.value)

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid stroke="#003333" />

        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={150} />

        <Tooltip content={<CustomTooltip />} />

        <Bar dataKey="value">
          {data.map((entry, index) => (
            <Cell key={index} fill={getColor(entry.value)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}