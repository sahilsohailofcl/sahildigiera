import { NextAuthOptions, User, Session, DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import Stripe from "stripe";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import { getServerSession } from "next-auth/next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

// Extended types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: "ADMIN" | "CLIENT";
      stripeCustomerId?: string | null;
      subscription?: any;
      trialEndsAt?: Date | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "ADMIN" | "CLIENT";
    stripeCustomerId?: string | null;
    subscription?: any;
    trialEndsAt?: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "CLIENT";
    stripeCustomerId?: string | null;
    subscription?: any;
    trialEndsAt?: Date | null;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          stripeCustomerId: user.stripeCustomerId,
          subscription: user.subscription,
          trialEndsAt: user.trialEndsAt,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events: {
    async createUser({ user }) {
      if (user.email && user.name && user.role === "CLIENT") {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
        });

        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customer.id },
        });
      }
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.stripeCustomerId = user.stripeCustomerId;
        token.subscription = user.subscription;
        token.trialEndsAt = user.trialEndsAt;
      } else {
        // Fetch the latest user data on each token refresh
        const latestUser = await prisma.user.findUnique({
          where: { id: token.id }
        });
        if (latestUser) {
          token.subscription = latestUser.subscription;
          token.trialEndsAt = latestUser.trialEndsAt;
          token.stripeCustomerId = latestUser.stripeCustomerId;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.stripeCustomerId = token.stripeCustomerId;
        session.user.subscription = token.subscription;
        session.user.trialEndsAt = token.trialEndsAt;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

// Initialize NextAuth
const handler = NextAuth(authOptions);

// Export handlers for API routes
export { handler as GET, handler as POST };

// Server component helper
export const getServerAuthSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};