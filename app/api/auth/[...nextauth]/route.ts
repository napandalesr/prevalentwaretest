import { prisma } from '@/prisma';
import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';


const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID ?? '',
      clientSecret: process.env.AUTH0_CLIENT_SECRET ?? '',
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if(session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email ?? '' },
        });
  
        if (dbUser) {
          session.user.role = dbUser.role;
        }else {
          await prisma.user.create(
            { data: { email: session.user.email ?? '', name: session.user?.name ?? '', role: 'USER'} }
          );
        }
      }
      return session;
    },
  },
  secret: process.env.AUTH0_SECRET,
});

export { handler as GET, handler as POST }