import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: UserRole;
      trialEndsAt?: string | null;
      subscription?: {
        status?: string;
        currentPeriodEnd?: string;
        cancelAtPeriodEnd?: boolean;
        plan?: string;
      } | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role: UserRole;
    trialEndsAt?: string | null;
    subscription?: {
      status?: string;
      currentPeriodEnd?: string;
      cancelAtPeriodEnd?: boolean;
      plan?: string;
    } | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    role: UserRole;
    trialEndsAt?: string | null;
    subscription?: {
      status?: string;
      currentPeriodEnd?: string;
      cancelAtPeriodEnd?: boolean;
      plan?: string;
    } | null;
  }
} 