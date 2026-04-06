'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { stations } from '@/lib/data'

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
})

const MultiChart = dynamic(() => import('@/components/MultiChart'), {
  ssr: false,
})

const PieChart = dynamic(() => import('@/components/PieChart'), {
  ssr: false,
})

const MyBarChart = dynamic(() => import('@/components/BarChart'), {
  ssr: false,
})

export default function MapPage() {
  const [selected, setSelected] = useState<string | null>(null)

  const selectedStation = stations.find((s) => s.id === selected)

  return (
    <div className="card">
      <h1>Interactive Map</h1>

      <Map onSelect={setSelected} selected={selected} />

      <div className="section">
        <h3>Legend</h3>

        <div className="legend-item">
          <span className="dot green" /> Clean (PM2.5 &lt; 25)
        </div>

        <div className="legend-item">
          <span className="dot orange" /> Medium (25–50)
        </div>

        <div className="legend-item">
          <span className="dot red" /> High (&gt; 50)
        </div>

        <div className="legend-item">
          <span className="dot blue" /> Selected station
        </div>
      </div>

      {selected && selectedStation && (
        <div className="section">
          <h2>Station: {selectedStation.name}</h2>

          <button onClick={() => setSelected(null)}>
            Reset selection
          </button>

          <div className="chart-container">
            <h3>All pollutants (time)</h3>
            <MultiChart stationId={selected} />

            <h3>Pollution structure</h3>
            <PieChart stationId={selected} />

            <h3>PM2.5 comparison</h3>
            <MyBarChart />
          </div>
        </div>
      )}
    </div>
  )
}