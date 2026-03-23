import { NextResponse } from 'next/server'
import { measurements } from '@/lib/data'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const stationId = searchParams.get('stationId')
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const sort = searchParams.get('sort') ?? 'desc'

  if (!stationId)
    return NextResponse.json({ error: 'stationId required' }, { status: 400 })

  if (isNaN(page) || isNaN(limit))
    return NextResponse.json(
      { error: 'page and limit must be numbers' },
      { status: 400 }
    )

  let filtered = measurements.filter(m => m.stationId === stationId)

  // validation
  filtered = filtered.filter(
    m =>
      m.values.pm25 >= 0 &&
      m.values.pm10 >= 0 &&
      m.values.no2 >= 0 &&
      m.values.o3 >= 0
  )

  filtered.sort((a, b) =>
    sort === 'asc'
      ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  const start = (page - 1) * limit
  const paginated = filtered.slice(start, start + limit)

  return NextResponse.json({
    data: paginated,
    total: filtered.length,
    page,
  })
}