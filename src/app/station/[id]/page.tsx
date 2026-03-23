import { stations, measurements } from '@/lib/data'
import { notFound } from 'next/navigation'
import MeasurementTable from '@/components/MeasurementTable'
import StationChart from '@/components/StationChart'

export default async function StationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const station = stations.find(s => s.id === id)
  if (!station) return notFound()

  const stationMeasurements = measurements.filter(
    m => m.stationId === id
  )

  return (
    <div className="card">
      <h1>{station.name}</h1>

      <p><b>Type:</b> {station.type}</p>
      <p>
        <b>Coordinates:</b> {station.coordinates.lat}, {station.coordinates.lng}
      </p>

      <div className="section">
        <h2>Measurements</h2>
        <MeasurementTable data={stationMeasurements.slice(0, 10)} />
      </div>

      <div className="section chart-container">
        <h2>PM2.5 Chart</h2>
        <StationChart stationId={id} />
      </div>
    </div>
)
}