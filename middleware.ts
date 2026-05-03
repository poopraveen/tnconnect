import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (path.startsWith("/seller") && token?.role !== "SELLER" && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/become-seller", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        if (path.startsWith("/seller") || path.startsWith("/admin")) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/seller/:path*", "/admin/:path*", "/saved", "/profile/:path*"],
};
