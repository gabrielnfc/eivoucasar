'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import CookieSettings from '@/components/cookies/cookie-settings'
import Loading from '@/components/ui/loading'

export default function CookieSettingsPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [animationCompleted, setAnimationCompleted] = useState(false)

  // ✅ LOADING COMPLETO - usuário só vê conteúdo após animação terminar
  const isDataLoading = loading || !user;
  const shouldShowLoading = isDataLoading || !animationCompleted;

  let loadingMessage = 'Carregando configurações...';
  if (loading) {
    loadingMessage = 'Verificando autenticação...';
  } else if (!user) {
    loadingMessage = 'Autenticando usuário...';
  } else if (!animationCompleted) {
    loadingMessage = 'Finalizando carregamento...';
  }

  if (shouldShowLoading) {
    return (
      <Loading 
        message={loadingMessage}
        showTimeout={true}
        timeoutSeconds={2}
        onComplete={() => {
          console.log('Cookies Settings: Animação completada');
          // Só marcar como completo se os dados também estiverem carregados
          if (!isDataLoading) {
            setAnimationCompleted(true);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard/settings')}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CookieSettings />
      </div>
    </div>
  )
} 