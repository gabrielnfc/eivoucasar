'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRequireAuth } from '@/contexts/auth-context';
import Loading from '@/components/ui/loading';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user, loading, initialized } = useRequireAuth();
  const router = useRouter();
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  // ✅ OTIMIZADO: Timeout reduzido para 3s
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!initialized && loading) {
        console.warn('AuthGuard: Timeout reached after 3s - assuming auth check failed');
        setTimeoutReached(true);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [initialized, loading]);

  // ✅ OTIMIZADO: Check mais inteligente - só redirecionar após animação ou quando necessário
  useEffect(() => {
    if (initialized && !loading) {
      if (!user) {
        console.log('AuthGuard: Redirecionamento imediato - sem usuário');
        if (!animationCompleted) {
          setTimeout(() => router.push('/login'), 500);
        } else {
          router.push('/login');
        }
      }
    } else if (timeoutReached) {
      console.log('AuthGuard: Redirecionamento por timeout (3s)');
      router.push('/login');
    }
  }, [user, loading, initialized, timeoutReached, animationCompleted, router]);

  // ✅ Loading universal para navegação/autenticação
  if ((loading || !initialized) && !timeoutReached) {
    return (
      <Loading 
        message="Verificando autenticação..."
        showTimeout={true} 
        timeoutSeconds={3}
        onComplete={() => {
          console.log('AuthGuard: Loading animation completed');
          setAnimationCompleted(true);
        }}
      />
    );
  }

  // ✅ Redirect mais rápido
  if (timeoutReached || (!user && initialized)) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Acesso negado
          </h2>
          <p className="text-gray-600">
            Redirecionando para login...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 