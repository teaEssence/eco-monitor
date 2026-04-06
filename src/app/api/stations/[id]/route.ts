import { NextRequest, NextResponse } from "next/server";
import { stations } from "@/lib/data";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const station = stations.find((s) => s.id === id);

  if (!station) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: station });
}
