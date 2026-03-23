import { NextResponse } from 'next/server'
import { stations } from '@/lib/data'

export async function GET() {
  return NextResponse.json({ data: stations })
}