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
      stripeCustomerId?: string | null;
      hasSelectedPlan: boolean;
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
    stripeCustomerId?: string | null;
    hasSelectedPlan: boolean;
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
    stripeCustomerId?: string | null;
    hasSelectedPlan: boolean;
  }
} 