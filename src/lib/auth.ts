import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { Adapter } from "next-auth/adapters";
import { UserRole } from "@prisma/client";
import { JWT } from "next-auth/jwt";

interface Subscription {
  status?: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
  plan?: string;
}

interface UserWithFields {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  subscription: Subscription | null;
  stripeCustomerId: string | null;
  hasSelectedPlan: boolean;
  trialEndsAt: Date | null;
  password: string;
}

// Override the JWT type instead of extending it
type CustomJWT = JWT & {
  id: string;
  role: UserRole;
  trialEndsAt: string | null;
  subscription: Subscription | null;
  stripeCustomerId?: string | null;
  hasSelectedPlan: boolean;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        }) as unknown as UserWithFields;

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          subscription: user.subscription,
          stripeCustomerId: user.stripeCustomerId,
          hasSelectedPlan: user.hasSelectedPlan,
        };
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.trialEndsAt = token.trialEndsAt;
        session.user.subscription = token.subscription as Subscription | null;
        session.user.stripeCustomerId = token.stripeCustomerId;
        session.user.hasSelectedPlan = token.hasSelectedPlan;
      }
      return session;
    },
    async jwt({ token, user }) {
      const customToken = token as CustomJWT;

      if (user) {
        customToken.id = user.id;
        customToken.role = user.role;
        customToken.subscription = user.subscription as Subscription | null;
        customToken.stripeCustomerId = user.stripeCustomerId;
        customToken.hasSelectedPlan = user.hasSelectedPlan;
      }

      const dbUser = await prisma.user.findFirst({
        where: {
          email: customToken.email!,
        },
      }) as unknown as UserWithFields;

      if (!dbUser) {
        return customToken;
      }

      return {
        ...customToken,
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        trialEndsAt: dbUser.trialEndsAt?.toISOString() || null,
        subscription: dbUser.subscription,
        stripeCustomerId: dbUser.stripeCustomerId,
        hasSelectedPlan: dbUser.hasSelectedPlan,
      } as CustomJWT;
    },
    async redirect({ url, baseUrl }) {
      // Handle new user redirection
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // Handle external URLs
      else if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },
}; 