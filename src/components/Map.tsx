'use client'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { stations, measurements } from '@/lib/data'

function getLatestPM25(stationId: string) {
  const m = measurements.find((m) => m.stationId === stationId)
  return m?.values.pm25 ?? 0
}

function getColor(pm25: number) {
  if (pm25 < 25) return 'green'
  if (pm25 < 50) return 'orange'
  return 'red'
}

function createCircleIcon(color: string) {
  return new L.DivIcon({
    className: '',
    html: `
      <div style="
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: ${color};
        border: 2px solid #00ffcc;
        box-shadow: 0 0 6px ${color};
      "></div>
    `,
  })
}

export default function Map({
  onSelect,
  selected,
}: {
  onSelect: (id: string) => void
  selected: string | null
}) {
  return (
    <MapContainer
      center={[49.0, 31.0]}
      zoom={6}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {stations.map((s) => {
        const pm25 = getLatestPM25(s.id)

        let color = getColor(pm25)

        if (selected === s.id) {
          color = 'blue'
        }

        return (
          <Marker
            key={s.id}
            position={[s.coordinates.lat, s.coordinates.lng]}
            icon={createCircleIcon(color)}
            eventHandlers={{
              click: () => onSelect(s.id),
            }}
          >
            <Popup>
              <b>{s.name}</b>
              <br />
              PM2.5: {pm25}
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}