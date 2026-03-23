import { NextResponse } from 'next/server'
import { measurements } from '@/lib/data'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const stationId = searchParams.get('stationId')

  if (!stationId)
    return NextResponse.json({ error: 'stationId required' }, { status: 400 })

  const latest = measurements
    .filter(m => m.stationId === stationId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 1)

  return NextResponse.json({ data: latest })
}