import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const start = Date.now();

  const res = NextResponse.next();

  const duration = Date.now() - start;

  console.log(
    JSON.stringify({
      method: req.method,
      url: req.url,
      duration,
    }),
  );

  return res;
}
