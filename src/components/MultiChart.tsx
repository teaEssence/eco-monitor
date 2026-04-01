'use client'

import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { Measurement } from '@/types/measurement'

export default function MultiChart({ stationId }: { stationId: string }) {
  const [data, setData] = useState<Measurement[]>([])
  const [active, setActive] = useState<'all' | 'pm25' | 'pm10' | 'no2'>('all')

  useEffect(() => {
    fetch(`/api/stations/measurements?stationId=${stationId}`)
      .then((res) => res.json())
      .then((json) => setData(json.data))
  }, [stationId])

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button
          onClick={() => setActive('all')}
          style={{
            background: active === 'all' ? '#00ffcc' : 'black',
            color: active === 'all' ? '#000' : '#00ffcc',
            border: '1px solid #00ffcc',
            marginRight: '5px',
            cursor: 'pointer',
          }}
        >
          All
        </button>

        <button
          onClick={() => setActive('pm25')}
          style={{
            background: active === 'pm25' ? '#00ffcc' : 'black',
            color: active === 'pm25' ? '#000' : '#00ffcc',
            border: '1px solid #00ffcc',
            marginRight: '5px',
            cursor: 'pointer',
          }}
        >
          PM2.5
        </button>

        <button
          onClick={() => setActive('pm10')}
          style={{
            background: active === 'pm10' ? '#00ffcc' : 'black',
            color: active === 'pm10' ? '#000' : '#00ffcc',
            border: '1px solid #00ffcc',
            marginRight: '5px',
            cursor: 'pointer',
          }}
        >
          PM10
        </button>

        <button
          onClick={() => setActive('no2')}
          style={{
            background: active === 'no2' ? '#00ffcc' : 'black',
            color: active === 'no2' ? '#000' : '#00ffcc',
            border: '1px solid #00ffcc',
            cursor: 'pointer',
          }}
        >
          NO2
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#003333" />

          <XAxis
            dataKey="timestamp"
            tickFormatter={(v) =>
              new Date(v).toLocaleTimeString()
            }
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

          {(active === 'all' || active === 'pm25') && (
            <Line
              type="monotone"
              dataKey="values.pm25"
              stroke="#00ffcc"
            />
          )}

          {(active === 'all' || active === 'pm10') && (
            <Line
              type="monotone"
              dataKey="values.pm10"
              stroke="#ff00ff"
            />
          )}

          {(active === 'all' || active === 'no2') && (
            <Line
              type="monotone"
              dataKey="values.no2"
              stroke="#ffff00"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}