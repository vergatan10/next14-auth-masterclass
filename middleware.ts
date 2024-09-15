// import { auth } from "@/auth"
import NextAuth from "next-auth"

import authConfig from "./auth.config"
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const publicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null;
    }

    if (!isLoggedIn && !publicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return Response.redirect(new URL(
            `/auth/login?callbackUrl=${encodedCallbackUrl}`,
            nextUrl))
    }

    return null;
    // const isLoggedIn = !!req.auth; // !!  ubah menjadi boolean
    // console.log("ROUTE :", req.nextUrl.pathname)
    // console.log("IS LOGGEDIN : ", isLoggedIn)
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
    // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    // matcher: ["/auth/login", "/auth/register"],
}