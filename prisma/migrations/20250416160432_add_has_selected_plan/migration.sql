-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasSelectedPlan" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "trialStartedAt" TIMESTAMP(3);
