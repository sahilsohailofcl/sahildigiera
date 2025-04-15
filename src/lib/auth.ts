import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import { stripe } from "./stripe/client";
import { getServerSession } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      if (user.email && user.name) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
        });
        await prisma.user.update({
          where: { id: user.id },
          data: {
            stripeCustomerId: customer.id,
          },
        });
      }
    },
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.stripeCustomerId = user.stripeCustomerId;
      return session;
    },
  },
};

export const auth = async (req: Request) => {
  const session = await getServerSession(authOptions);
  return session;
}; 