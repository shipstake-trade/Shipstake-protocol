import { NextRequest, NextResponse } from "next/server"

const BLOCKED_COUNTRIES = new Set(["US", "GB", "AU", "CA", "CN", "KP", "IR"])

const EXCEPTION_PREFIXES = ["/_next", "/favicon", "/gate", "/api", "/og", "/sitemap.xml"]
const STATIC_EXTENSIONS = [".ico", ".png", ".jpg", ".jpeg", ".svg", ".webp", ".woff", ".woff2", ".css", ".js"]

const PROTECTED_ROUTES = ["/explore", "/quest", "/portfolio"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Skip static files and Next.js internals
  for (const prefix of EXCEPTION_PREFIXES) {
    if (pathname.startsWith(prefix)) return NextResponse.next()
  }
  for (const ext of STATIC_EXTENSIONS) {
    if (pathname.endsWith(ext)) return NextResponse.next()
  }

  // 2. Geo-blocking via Vercel header
  const country = request.headers.get("x-vercel-ip-country") ?? ""
  if (BLOCKED_COUNTRIES.has(country)) {
    const gateUrl = new URL("/gate", request.url)
    gateUrl.searchParams.set("blocked", "geo")
    return NextResponse.redirect(gateUrl)
  }

  // 3. Auth gating for protected routes
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))
  if (isProtected) {
    const privyToken = request.cookies.get("privy-token")
    if (!privyToken) {
      return NextResponse.redirect(new URL("/gate", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
