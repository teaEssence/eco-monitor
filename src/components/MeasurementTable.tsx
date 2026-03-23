import { Measurement } from '@/types/measurement'

export default function MeasurementTable({ data }: { data: Measurement[] }) {
  return (
    <table border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>Time</th>
          <th>PM2.5</th>
          <th>PM10</th>
          <th>NO2</th>
          <th>O3</th>
        </tr>
      </thead>
      <tbody>
        {data.map(m => (
          <tr key={m.id}>
            <td>{new Date(m.timestamp).toLocaleString()}</td>
            <td>{m.values.pm25}</td>
            <td>{m.values.pm10}</td>
            <td>{m.values.no2}</td>
            <td>{m.values.o3}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}