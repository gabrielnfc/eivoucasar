'use client';

import AuthGuard from '@/components/auth/auth-guard';
import { ThemeProvider } from '@/contexts/theme-context';
import { useAuth } from '@/contexts/auth-context';
import { useCouple } from '@/hooks/use-couple';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // ✅ Obter dados do usuário e casal para o ThemeProvider
  const { user } = useAuth();
  const { couple } = useCouple(user?.id);

  return (
    <AuthGuard>
      <ThemeProvider 
        coupleId={couple?.id} 
        userId={user?.id} 
        coupleData={couple}
      >
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </ThemeProvider>
    </AuthGuard>
  )
}