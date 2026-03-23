import { Station } from '@/types/station'
import { Measurement } from '@/types/measurement'

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const stations: Station[] = [
  { id: '1', name: 'Kyiv Center', type: 'urban', coordinates: { lat: 50.45, lng: 30.52 } },
  { id: '2', name: 'Lviv Station', type: 'urban', coordinates: { lat: 49.84, lng: 24.03 } },
  { id: '3', name: 'Odessa Port', type: 'industrial', coordinates: { lat: 46.48, lng: 30.73 } },
  { id: '4', name: 'Dnipro Industrial', type: 'industrial', coordinates: { lat: 48.46, lng: 35.04 } },
  { id: '5', name: 'Carpathian Rural', type: 'rural', coordinates: { lat: 48.92, lng: 24.71 } },
  { id: '6', name: 'Kharkiv Center', type: 'urban', coordinates: { lat: 49.99, lng: 36.23 } },
  { id: '7', name: 'Poltava Rural', type: 'rural', coordinates: { lat: 49.59, lng: 34.55 } }
]

export const measurements: Measurement[] = []

stations.forEach(station => {
  for (let i = 0; i < 48; i++) {
    measurements.push({
      id: `${station.id}-${i}`,
      stationId: station.id,
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      values: {
        pm25: random(10, 60),
        pm10: random(20, 80),
        no2: random(5, 40),
        o3: random(10, 70)
      }
    })
  }
})