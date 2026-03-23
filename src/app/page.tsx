import Link from 'next/link'
import { stations } from '@/lib/data'

export default function Home() {
  return (
    <div>
      <h1>Eco Monitor</h1>

      <ul>
        {stations.map(station => (
          <li key={station.id}>
            <Link href={`/station/${station.id}`}>
              {station.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}