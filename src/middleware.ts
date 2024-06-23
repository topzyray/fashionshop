import { verifyToken } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/register",
  "/not-founnd",
  "/unauthorized",
  "/product",
];

const ADMIN_PATHS = ["/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;  

  // Allow public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Retrieve the token from the request headers
  const token = request.headers.get("Authorization")?.split(" ")[1];
  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // const decoded = await verifyToken(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    if (decoded) {
      // Check if the user is an admin for admin paths
      if (ADMIN_PATHS.includes(pathname) && decoded?.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      // Allow the request to proceed
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    // Redirect to login if the token is invalid
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/not-founnd",
    "/unauthorized",
    "/error",
    "/checkout",
    "/account",
    "/orders",
    "/cart",
    "/admin/:path*",
  ],
};
