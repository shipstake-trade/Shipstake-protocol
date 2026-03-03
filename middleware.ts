import { NextRequest, NextResponse } from "next/server"

const BLOCKED_COUNTRIES = new Set(["US", "GB", "AU", "CA", "CN", "KP", "IR"])

const EXCEPTION_PREFIXES = ["/_next", "/favicon", "/gate", "/api"]
const STATIC_EXTENSIONS = [".ico", ".png", ".jpg", ".jpeg", ".svg", ".webp", ".woff", ".woff2", ".css", ".js"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip exception paths
  for (const prefix of EXCEPTION_PREFIXES) {
    if (pathname.startsWith(prefix)) return NextResponse.next()
  }

  // Skip static files
  for (const ext of STATIC_EXTENSIONS) {
    if (pathname.endsWith(ext)) return NextResponse.next()
  }

  // Geo-blocking via Vercel header
  const country = request.headers.get("x-vercel-ip-country") ?? ""

  if (BLOCKED_COUNTRIES.has(country)) {
    const gateUrl = new URL("/gate", request.url)
    gateUrl.searchParams.set("blocked", "geo")
    return NextResponse.redirect(gateUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
