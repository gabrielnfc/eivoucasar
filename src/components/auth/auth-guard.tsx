'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRequireAuth } from '@/contexts/auth-context'; // Usar o novo hook

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user, loading, initialized } = useRequireAuth(); // Usar hook que verifica sob demanda
  const router = useRouter();

  useEffect(() => {
    // Só redirecionar se estiver inicializado e não há usuário
    if (initialized && !loading && !user) {
      console.log('AuthGuard: Redirecionando para login - sem usuário');
      router.push('/login');
    }
  }, [user, loading, initialized, router]);

  // Show loading while checking auth
  if (loading || !initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Show fallback or redirect if not authenticated
  if (!user) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Acesso negado
          </h2>
          <p className="text-gray-600">
            Você precisa estar logado para acessar esta página.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 