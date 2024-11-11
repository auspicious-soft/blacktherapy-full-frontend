import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials:any) => {
        if (credentials.email) {
          return {
            email: credentials.email,
            name: credentials.name,
            id: credentials._id,
            role: credentials.role,
            onboardingCompleted: credentials.onboardingCompleted,
            status: credentials.status
          }
        }
        else {
          throw new CredentialsSignin({ cause: 'Invalid credentials' })
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user}) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.onboardingCompleted = (user as any).onboardingCompleted
        token.status = (user as any).status
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        (session as any).user.role = token.role as string
        (session as any).user.onboardingCompleted = token.onboardingCompleted as boolean
        (session as any).user.status = token.status as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  trustHost: true
})