'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, Edit3, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRequireAuth } from '@/contexts/auth-context'
import { ThemeProvider } from '@/contexts/theme-context'
import UnifiedSettings from '@/components/dashboard/unified-settings'
import { TemplateRenderer } from '@/components/templates/template-renderer'
import { SectionNavigator } from '@/components/dashboard/section-navigator'
import ThemeSelector from '@/components/ui/theme-selector'
import { createClient } from '@/lib/supabase/client'
import { coupleService } from '@/lib/database/couple-service'
import { useCouple } from '@/hooks/use-couple'
import { createRealTemplate } from '@/lib/create-real-template'
import type { Couple } from '@/types'
import type { WeddingTemplate } from '@/types/template'

export default function SettingsPage() {
  const router = useRouter()
  const { user, loading, initialized } = useRequireAuth()
  
  // 🌟 OTIMIZAÇÃO: useCouple sempre primeiro - fonte única de dados
  const { couple, isLoading, error, updateLocalCouple } = useCouple(user?.id)
  
  const [template, setTemplate] = useState<WeddingTemplate | null>(null)
  const [activeTab, setActiveTab] = useState<'editor' | 'settings'>('editor')
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishMessage, setPublishMessage] = useState<string>('')

  // Log para debug do fluxo otimizado
  console.log('🎯 Settings Page: Render state', {
    userLoading: loading,
    hasUser: !!user,
    coupleLoading: isLoading,
    hasCouple: !!couple,
    coupleError: error
  })

  // Redirecionar se não encontrar casal
  useEffect(() => {
    if (initialized && !isLoading && error === 'Nenhum casal encontrado') {
      router.push('/dashboard')
    }
  }, [initialized, isLoading, error, router])

  // Gerar template sempre que couple mudar
  useEffect(() => {
    if (couple) {
      console.log('📄 Settings: Generating template from couple data')
      const generatedTemplate = createRealTemplate(couple as any)
      setTemplate(generatedTemplate)
    }
  }, [couple])

  const handleSectionUpdate = (data: any) => {
    console.log('Settings update:', data)
    console.log('🖼️ Settings update - hero_background_image:', data.hero_background_image)
    
    // Atualizar o couple state com novos dados
    if (couple) {
      updateLocalCouple({ ...couple, ...data } as Couple)
    }
    
    // Regenerar template com novos dados
    if (couple) {
      const updatedTemplate = createRealTemplate({ ...couple, ...data })
      setTemplate(updatedTemplate)
    }
  }

  const handlePublishSite = async () => {
    if (!couple || !user?.id) return

    try {
      setIsPublishing(true)
      setPublishMessage('')
      
      const { success, error } = await coupleService.togglePublish(user.id, true)

      if (!success) {
        throw new Error(error)
      }

      if (couple) {
        updateLocalCouple({ ...couple, is_published: true } as Couple)
      }
      setPublishMessage('✅ Site publicado com sucesso!')
      
      setTimeout(() => {
        setPublishMessage('')
      }, 3000)
      
    } catch (err) {
      console.error('Error publishing site:', err)
      setPublishMessage('❌ Erro ao publicar o site. Tente novamente.')
      setTimeout(() => {
        setPublishMessage('')
      }, 5000)
    } finally {
      setIsPublishing(false)
    }
  }

  // Loading state - separar loading de auth vs loading de dados
  console.log('🎯 Render check - Loading states:', {
    initialized,
    authLoading: loading,
    dataLoading: isLoading,
    hasUser: !!user,
    hasCouple: !!couple
  })

  if (!initialized) {
    console.log('🔄 Rendering: Auth not initialized')
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  // Auth state - usuário não está logado
  if (initialized && !loading && !user) {
    console.log('🔄 Rendering: User not logged in, redirecting')
    router.push('/login')
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecionando para login...</p>
        </div>
      </div>
    )
  }

  // Data loading state
  if (user && isLoading) {
    console.log('🔄 Rendering: Data loading state')
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados do casal...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
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

  // Prepara seções para navegação
  const sections = template?.sections?.map(section => ({
    id: section.id,
    name: section.name,
    type: section.type,
    enabled: section.enabled
  })) || []

  return (
    <ThemeProvider 
      coupleId={couple?.id} 
      userId={user?.id} 
      coupleData={couple} // 🌟 Dados sempre sincronizados com useCouple
    >
      <div className="min-h-screen bg-gray-50">
        {/* Header Principal - Mais Limpo */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm"
        >
          <div className="flex h-14 items-center justify-between px-6">
            {/* Left side - Navigation */}
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard')}
                className="hover:bg-gray-100 text-gray-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              
              <div className="h-5 w-px bg-gray-300"></div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-purple-50">
                  <Edit3 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Editor do Site</span>
                  {couple && (
                    <span className="text-sm text-gray-500 ml-2">
                      {couple.bride_name} & {couple.groom_name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-4">
              {/* Site status */}
              {couple && (
                <div className="flex items-center space-x-2 text-sm bg-gray-50 px-3 py-1.5 rounded-full">
                  <div className={`w-2 h-2 rounded-full ${(couple as any).is_published ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <span className="text-gray-600 font-medium">
                    {(couple as any).is_published ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
              )}

              {/* Theme Selector - 🌟 Agora usa dados unificados */}
              <ThemeSelector />

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
            </div>
          </div>

          {/* Sub-header com Tabs e Navegação de Seções */}
          <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50/50 to-purple-50/30">
            <div className="flex h-12 items-center justify-between px-4 md:px-6">
              {/* Tab Navigation */}
              <div className="flex items-center">
                <div className="bg-white rounded-lg p-1 flex border border-gray-200 shadow-sm">
                  <button
                    onClick={() => setActiveTab('editor')}
                    className={`px-3 md:px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeTab === 'editor'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Edit3 className="w-4 h-4 mr-1 md:mr-2 inline" />
                    <span className="hidden sm:inline">Editor</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`px-3 md:px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeTab === 'settings'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Settings className="w-4 h-4 mr-1 md:mr-2 inline" />
                    <span className="hidden sm:inline">Config</span>
                  </button>
                </div>
              </div>

              {/* Section Navigator - Apenas no Editor */}
              {activeTab === 'editor' && sections.length > 0 && (
                <div className="flex-1 flex justify-center px-4 md:px-6">
                  <SectionNavigator
                    sections={sections}
                    onSectionClick={(sectionId) => {
                      console.log('Section clicked:', sectionId)
                    }}
                    className="max-w-6xl w-full"
                  />
                </div>
              )}

              {/* Copy Link Button */}
              {(couple as any)?.is_published && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    couple && navigator.clipboard.writeText(`${window.location.origin}/${couple.slug}`)
                    setPublishMessage('✅ Link copiado!')
                    setTimeout(() => setPublishMessage(''), 2000)
                  }}
                  className="text-gray-500 hover:text-gray-700 hover:bg-white/50 hidden md:flex"
                >
                  Copiar Link
                </Button>
              )}
            </div>
          </div>

          {/* Status message */}
          {publishMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`border-b px-6 py-2 ${
                publishMessage.includes('✅') 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <p className="text-sm font-medium">{publishMessage}</p>
            </motion.div>
          )}
        </motion.header>

        {/* Main Content - Ajustado para novo header */}
        <main className="pt-20 min-h-screen">
          {/* Content Area */}
          {activeTab === 'editor' && couple && (
            <div className="h-[calc(100vh-5rem)]">
              <TemplateRenderer
                coupleData={couple}
                isEditable={true}
                onSectionUpdate={handleSectionUpdate}
              />
            </div>
          )}

          {activeTab === 'editor' && !couple && (
            <div className="h-[calc(100vh-5rem)] flex items-center justify-center bg-white">
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

          {activeTab === 'settings' && couple && (
            <div className="h-[calc(100vh-5rem)] bg-white">
                              <UnifiedSettings 
                  initialCouple={couple} 
                  onDataChange={handleSectionUpdate}
                  onCoupleUpdate={updateLocalCouple}
                />
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  )
}