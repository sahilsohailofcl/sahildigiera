// app/dashboard/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  if (session.user.role === UserRole.ADMIN) {
    redirect('/admin/dashboard');
  }

  // Check subscription/trial status
  const hasActiveSubscription = session.user.subscription?.status === 'active';
  const isInTrial = session.user.trialEndsAt && new Date(session.user.trialEndsAt) > new Date();

  if (!hasActiveSubscription && !isInTrial) {
    redirect('/pricing');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Client Dashboard</h1>
      <p className="mt-2">Welcome back, {session.user.name}!</p>
      {/* Add your dashboard content here */}
    </div>
  );
}