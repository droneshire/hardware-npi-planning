import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      const isOnAuth = nextUrl.pathname.startsWith("/auth")

      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn && isOnAuth) {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.firebaseUid = user.firebaseUid || user.id
      }
      if (account?.provider === "google") {
        token.firebaseUid = user.firebaseUid || user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.firebaseUid = token.firebaseUid as string
      }
      return session
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        idToken: { label: "ID Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.idToken) {
          return null
        }

        try {
          // Verify the Firebase ID token
          // Note: For production, use Firebase Admin SDK to verify the token server-side
          // For now, we trust the client-provided token (not secure for production)
          // TODO: Implement Firebase Admin SDK verification
          const response = await fetch(
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ idToken: credentials.idToken }),
            }
          )

          if (!response.ok) {
            return null
          }

          const data = await response.json()
          const user = data.users?.[0]

          if (!user) {
            return null
          }

          // TODO: Fetch user from Data Connect to get role and organization
          // For now, return basic user info
          return {
            id: user.localId,
            email: user.email || "",
            name: user.displayName || user.email?.split("@")[0] || "User",
            firebaseUid: user.localId,
            role: "MEMBER", // Default role, should be fetched from database
          }
        } catch (error) {
          console.error("Auth verification error:", error)
          return null
        }
      },
    }),
  ],
}
