import { NextResponse } from "next/server";
import { measurements } from "@/lib/data";
import { log } from "@/lib/logger";

export async function GET(req: Request) {
  const start = Date.now();

  log("info", "API request start", { url: req.url });

  try {
    const { searchParams } = new URL(req.url);

    const stationId = searchParams.get("stationId");
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const sort = searchParams.get("sort") ?? "desc";

    if (!stationId) {
      log("error", "Missing stationId");
      return NextResponse.json(
        { error: "stationId required" },
        { status: 400 },
      );
    }

    if (isNaN(page) || isNaN(limit)) {
      log("warn", "Invalid pagination params");
      return NextResponse.json(
        { error: "page and limit must be numbers" },
        { status: 400 },
      );
    }

    const filtered = measurements
      .filter((m) => m.stationId === stationId)
      .filter(
        (m) =>
          m.values.pm25 >= 0 &&
          m.values.pm10 >= 0 &&
          m.values.no2 >= 0 &&
          m.values.o3 >= 0,
      );

    filtered.sort((a, b) =>
      sort === "asc"
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    const duration = Date.now() - start;

    log("info", "API success", {
      stationId,
      duration,
      count: paginated.length,
    });

    return NextResponse.json(
      {
        data: paginated,
        total: filtered.length,
        page,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=60",
        },
      },
    );
  } catch (error) {
    log("error", "API crash", { error });

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
