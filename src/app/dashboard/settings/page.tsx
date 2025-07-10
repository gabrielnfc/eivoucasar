'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, Edit3, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import SettingsForm from '@/components/dashboard/settings-form'
import { TemplateRenderer } from '@/components/templates/template-renderer'
import { createClient } from '@/lib/supabase/client'
import type { Couple } from '@/types'
import type { WeddingTemplate } from '@/types/template'


export default function SettingsPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [couple, setCouple] = useState<Couple | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'editor' | 'settings'>('editor')
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishMessage, setPublishMessage] = useState<string>('')


  console.log('Settings page - User:', user, 'Loading:', loading)

  useEffect(() => {
    if (!loading && !user) {
      console.log('Redirecting to login - no user')
      router.push('/login')
      return
    }

    if (user) {
      console.log('User found, fetching couple data')
      fetchCouple()
    }
  }, [user, loading, router])

  const fetchCouple = async () => {
    if (!user?.id) return

    try {
      setIsLoading(true)
      setError(null)
      
      const supabase = createClient()
      console.log('Fetching couple data for user:', user.id)
      
      const { data, error: coupleError } = await supabase
        .from('couples')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (coupleError) {
        console.error('Erro ao buscar casal:', coupleError)
        setError('Erro ao carregar dados do casal')
        return
      }

      console.log('Couple data loaded:', data)
      console.log('Couple slug que será usado:', data?.slug)
      setCouple(data as any)
    } catch (error) {
      console.error('Erro ao buscar casal:', error)
      setError('Erro ao carregar dados do casal')
    } finally {
      setIsLoading(false)
    }
  }



  const handleSectionUpdate = (sectionId: string, fieldId: string, value: string) => {
    console.log('Section updated:', sectionId, fieldId, value)
    // Implementar lógica para atualizar a seção no template
  }

  const handlePublishSite = async () => {
    if (!couple) return

    try {
      setIsPublishing(true)
      setPublishMessage('')

      const response = await fetch(`/api/couples/${couple.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isPublished: true
        })
      })

      const result = await response.json()

      if (result.success) {
        setPublishMessage('✅ Site publicado com sucesso!')
        // Atualizar dados locais
        setCouple(prev => prev ? { ...prev, is_published: true } as any : null)
      } else {
        setPublishMessage('❌ Erro ao publicar: ' + result.error)
      }
    } catch (error) {
      setPublishMessage('❌ Erro ao publicar o site')
      console.error('Error publishing site:', error)
    } finally {
      setIsPublishing(false)
      
      // Limpar mensagem após 3 segundos
      setTimeout(() => setPublishMessage(''), 3000)
    }
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50/50 to-blue-50/30"></div>


        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <motion.div
                className="w-full h-full border-4 border-purple-300 border-t-purple-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-purple-600" />
            </div>
            <p className="text-gray-600 font-medium">
              Carregando editor...
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Não autenticado</h1>
          <p className="text-gray-600 mb-6">Você precisa estar logado para acessar esta página.</p>
          <a
            href="/login"
            className="bg-rose-500 hover:bg-rose-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Fazer Login
          </a>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Erro</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-x-4">
            <button
              onClick={() => fetchCouple()}
              className="bg-rose-500 hover:bg-rose-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Tentar Novamente
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Voltar ao Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!couple) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Dados não encontrados</h1>
          <p className="text-gray-600 mb-6">Não foi possível encontrar os dados do casal.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-rose-500 hover:bg-rose-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toolbar Fixo */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="flex h-16 items-center justify-between px-4">
          {/* Left side - Back button and title */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard')}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            
            <div className="h-6 w-px bg-gray-300"></div>
            
            <div className="flex items-center space-x-2">
              <Edit3 className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-gray-800">Editor do Site</span>
              {couple && (
                <span className="text-sm text-gray-500">
                  - {couple.bride_name} & {couple.groom_name}
                </span>
              )}
            </div>
          </div>

          {/* Center - Tab Navigation */}
          <div className="flex items-center">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'editor'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Edit3 className="w-4 h-4 mr-2 inline" />
                Editor Visual
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'settings'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Settings className="w-4 h-4 mr-2 inline" />
                Configurações
              </button>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-3">
            {/* Site status */}
            {couple && (
              <div className="flex items-center space-x-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${(couple as any).is_published ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <span className="text-gray-600">
                  {(couple as any).is_published ? 'Publicado' : 'Rascunho'}
                </span>
              </div>
            )}

            {/* Publish button */}
            <Button
              onClick={handlePublishSite}
              disabled={isPublishing || !couple}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              {isPublishing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Publicando...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Publicar Site
                </>
              )}
            </Button>

            {/* View site & copy link */}
            {(couple as any)?.is_published && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`/${couple.slug}`, '_blank')}
                >
                  Ver Site
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/${couple.slug}`)
                    setPublishMessage('✅ Link copiado para a área de transferência!')
                    setTimeout(() => setPublishMessage(''), 2000)
                  }}
                >
                  Copiar Link
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Status message */}
        {publishMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`border-b px-4 py-2 ${
              publishMessage.includes('✅') 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            <p className="text-sm font-medium">{publishMessage}</p>
          </motion.div>
        )}
      </motion.header>



      {/* Main Content - Full Screen */}
      <main className="pt-16 min-h-screen">
        {/* Content Area */}
        {activeTab === 'editor' && couple && (
          <div className="h-[calc(100vh-4rem)]">
            <TemplateRenderer
              coupleData={couple}
              isEditable={true}
              onSectionUpdate={handleSectionUpdate}
            />
          </div>
        )}

        {activeTab === 'editor' && !couple && (
          <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-white">
            <div className="text-center">
              <Edit3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Carregando Editor...
              </h3>
              <p className="text-gray-600">
                Preparando seu editor visual com dados reais...
              </p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-white">
            <div className="max-w-4xl mx-auto p-6">
              <SettingsForm initialCouple={couple} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}