import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC = ["/", "/home", "/login", "/signup", "/api/login", "/api/logout"];

function isPublic(pathname: string) {
  if (PUBLIC.includes(pathname)) return true;
  if (pathname.startsWith("/_next") || pathname.startsWith("/assets")) return true;
  return false;
}

async function verifyJWT(token: string) {
  // Use the SAME secret & algorithm you used to sign on the server (HS256)
  const secret = new TextEncoder().encode("yourSecretKey");
  // Throws if invalid/expired
  return jwtVerify(token, secret, { algorithms: ["HS256"] });
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublic(pathname) || req.method === "OPTIONS") {
    return NextResponse.next();
  }

  const token = req.cookies.get("authToken")?.value;
  console.log("middleware tokentoken==> ",token)

  if (!token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  try {
    await verifyJWT(token);
    return NextResponse.next();
  } catch (err) {
    console.error("Invalid or expired token:", err);
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("authToken");
    return res;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/flights/:path*", "/hotel/:path*", "/user-create/:path*"],
};