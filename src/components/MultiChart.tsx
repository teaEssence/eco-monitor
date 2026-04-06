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
import { trackEvent } from '@/lib/analytics'

export default function MultiChart({ stationId }: { stationId: string }) {
  const [data, setData] = useState<Measurement[]>([])
  const [active, setActive] = useState<'all' | 'pm25' | 'pm10' | 'no2'>('all')

  useEffect(() => {
    fetch(`/api/stations/measurements?stationId=${stationId}`)
      .then((res) => res.json())
      .then((json) => setData(json.data))
  }, [stationId])

  function handleClick(type: typeof active) {
    trackEvent('chart_filter', { type })
    setActive(type)
  }

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => handleClick('all')} style={btn(active === 'all')}>
          All
        </button>

        <button onClick={() => handleClick('pm25')} style={btn(active === 'pm25')}>
          PM2.5
        </button>

        <button onClick={() => handleClick('pm10')} style={btn(active === 'pm10')}>
          PM10
        </button>

        <button onClick={() => handleClick('no2')} style={btn(active === 'no2')}>
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
            <Line dataKey="values.pm25" stroke="#00ffcc" />
          )}

          {(active === 'all' || active === 'pm10') && (
            <Line dataKey="values.pm10" stroke="#ff00ff" />
          )}

          {(active === 'all' || active === 'no2') && (
            <Line dataKey="values.no2" stroke="#ffff00" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function btn(active: boolean) {
  return {
    background: active ? '#00ffcc' : 'black',
    color: active ? '#000' : '#00ffcc',
    border: '1px solid #00ffcc',
    marginRight: '5px',
    cursor: 'pointer',
  }
}