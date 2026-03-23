'use client'

import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { Measurement } from '@/types/measurement'

export default function StationChart({ stationId }: { stationId: string }) {
  const [data, setData] = useState<Measurement[]>([])

  useEffect(() => {
    fetch(`/api/stations/measurements?stationId=${stationId}`)
      .then(res => res.json())
      .then(json => setData(json.data))
  }, [stationId])

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis
        dataKey="timestamp"
        tickFormatter={v => new Date(v).toLocaleTimeString()}
      />

      <YAxis />
      <Tooltip
        contentStyle={{
          backgroundColor: '#111',
          border: '1px solid #00ffcc',
          color: '#00ffcc',
        }}
        labelStyle={{ color: '#ffffff' }}
      />

      <Line type="monotone" dataKey="values.pm25" stroke="#00ffcc" />
    </LineChart>
  )
}