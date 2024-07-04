import { NextRequest } from "next/server";

import {
  DEFAULT_LOGIN_REDIRECT,
  adminRoutes,
  apiAuthPrefix,
  authRoutes,
  productDetails,
  publicRoutes,
} from "@/routes";
import { verifyAuth } from "./utils/jwtAuth";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const currentUser = await verifyAuth(request);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProducDetail = nextUrl.pathname.startsWith(productDetails);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (currentUser) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!currentUser && !isPublicRoute && !isProducDetail) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  if (currentUser?.role !== "admin" && isAdminRoute) {
    return Response.redirect(new URL("/unauthorized", nextUrl));
  }

  return null;
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
