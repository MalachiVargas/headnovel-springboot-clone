import NextAuth, { NextAuthOptions } from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'

export const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    })
    // Auth0Provider({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    //   issuer: process.env.AUTH0_ISSUER,
    // }),
  ],
  theme: {
    colorScheme: 'light'
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = 'admin'
      return token
    }
  }
}

export default NextAuth(authOptions)
