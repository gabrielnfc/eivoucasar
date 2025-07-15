'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Heart, Calendar, MapPin, Clock, User, FileText, Image, Palette, Link, Save, Shield,
  Home, Mail, Timer, BookOpen, Users, Gift, UserCheck, Building, Info, 
  ImageIcon, MessageSquare, Layout, Settings2, Sparkles, Check, AlertCircle
} from 'lucide-react'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import type { Couple } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { dbToFormData } from '@/lib/utils/field-mapping'
import { ImageUpload } from '@/components/upload/image-upload'
import { generateSlug } from '@/lib/utils/slug'

// Schema unificado para validação - VERSÃO CORRIGIDA
const unifiedSettingsSchema = z.object({
  // Campos básicos
  bride_name: z.string().min(1, 'Nome da noiva é obrigatório'),
  groom_name: z.string().min(1, 'Nome do noivo é obrigatório'),
  wedding_date: z.string().min(1, 'Data do casamento é obrigatória'),
  wedding_time: z.string().optional(),
  wedding_location: z.string().optional(),
  wedding_address: z.string().optional(),
  
  // Campos da migração
  formal_invitation_message: z.string().optional(),
  invitation_title: z.string().optional(),
  invitation_signature: z.string().optional(),
  story_title: z.string().optional(),
  first_meeting_date: z.string().optional(),
  first_meeting_story: z.string().optional(),
  engagement_date: z.string().optional(),
  engagement_story: z.string().optional(),
  countdown_title: z.string().optional(),
  countdown_message: z.string().optional(),
  
  // Campos de imagem
  bride_photo: z.string().optional(),
  groom_photo: z.string().optional(),
  cover_photo_url: z.string().optional(),
  couple_photo: z.string().optional(),
  hero_background_image: z.string().optional(),
  
  // Outros campos
  theme_color: z.string().optional(),
  slug: z.string().min(1, 'URL personalizada é obrigatória')
    .regex(/^[a-z0-9-]+$/, 'URL deve conter apenas letras minúsculas, números e hífens')
})

// Definição das seções e seus campos
const SECTION_FIELDS = {
  'basic-info': {
    title: 'Informações Básicas',
    icon: User,
    color: 'blue',
    fields: ['bride_name', 'groom_name', 'wedding_date', 'wedding_time'],
    description: 'Informações essenciais sobre o casal e o casamento'
  },
  'event-details': {
    title: 'Detalhes do Evento',
    icon: MapPin,
    color: 'green',
    fields: ['wedding_location', 'wedding_address'],
    description: 'Local e endereço da cerimônia e recepção'
  },
  'invitation': {
    title: 'Seção Convite',
    icon: Mail,
    color: 'indigo',
    fields: ['invitation_title', 'invitation_message', 'formal_invitation_message', 'invitation_signature'],
    description: 'Configurações da seção de convite'
  },
  'story': {
    title: 'Nossa História',
    icon: BookOpen,
    color: 'rose',
    fields: ['story_title', 'couple_story', 'first_meeting_date', 'first_meeting_story', 'engagement_date', 'engagement_story'],
    description: 'História do casal e marcos importantes'
  },
  'countdown': {
    title: 'Contagem Regressiva',
    icon: Timer,
    color: 'amber',
    fields: ['countdown_title', 'countdown_message'],
    description: 'Configurações da contagem regressiva'
  },
  'media': {
    title: 'Imagens',
    icon: Image,
    color: 'pink',
    fields: ['hero_background_image', 'couple_photo', 'bride_photo', 'groom_photo', 'cover_photo_url'],
    description: 'Fotos do casal e do casamento'
  },
  'appearance': {
    title: 'Aparência',
    icon: Palette,
    color: 'orange',
    fields: ['theme_color'],
    description: 'Cores e tema do site'
  },
  'url': {
    title: 'URL',
    icon: Link,
    color: 'cyan',
    fields: ['slug'],
    description: 'Endereço personalizado do site'
  }
}

// Configuração dos campos
const FIELD_CONFIG = {
  bride_name: {
    label: 'Nome da Noiva',
    type: 'text',
    icon: Heart,
    required: true,
    placeholder: 'Nome da noiva',
    helpText: 'Nome que aparecerá em todo o site'
  },
  groom_name: {
    label: 'Nome do Noivo',
    type: 'text',
    icon: Heart,
    required: true,
    placeholder: 'Nome do noivo',
    helpText: 'Nome que aparecerá em todo o site'
  },
  wedding_date: {
    label: 'Data do Casamento',
    type: 'date',
    icon: Calendar,
    required: true,
    helpText: 'Data que aparecerá no convite e contagem regressiva'
  },
  wedding_time: {
    label: 'Horário do Casamento',
    type: 'time',
    icon: Clock,
    helpText: 'Horário da cerimônia'
  },
  wedding_location: {
    label: 'Local da Cerimônia',
    type: 'text',
    icon: MapPin,
    placeholder: 'Ex: Igreja São João',
    helpText: 'Nome do local onde será a cerimônia'
  },
  wedding_address: {
    label: 'Endereço da Recepção',
    type: 'text',
    icon: Building,
    placeholder: 'Ex: Salão de Festas',
    helpText: 'Local onde será a recepção'
  },
  invitation_message: {
    label: 'Mensagem do Convite',
    type: 'textarea',
    icon: Mail,
    placeholder: 'Digite a mensagem que aparecerá no convite...',
    helpText: 'Mensagem principal do convite'
  },
  couple_story: {
    label: 'Nossa História',
    type: 'textarea',
    icon: BookOpen,
    placeholder: 'Conte a história do casal...',
    helpText: 'História que aparecerá na seção "Nossa História"'
  },
  bride_photo: {
    label: 'Foto da Noiva',
    type: 'image',
    icon: Image,
    helpText: 'Imagem da noiva para o site'
  },
  groom_photo: {
    label: 'Foto do Noivo',
    type: 'image',
    icon: Image,
    helpText: 'Imagem do noivo para o site'
  },
  cover_photo_url: {
    label: 'Foto de Capa',
    type: 'file',
    icon: ImageIcon,
    accept: 'image/*',
    placeholder: 'Selecione uma imagem...',
    helpText: 'Imagem principal do site'
  },
  theme_color: {
    label: 'Cor do Tema',
    type: 'color',
    icon: Palette,
    helpText: 'Cor principal do site'
  },
  slug: {
    label: 'URL Personalizada',
    type: 'text',
    icon: Link,
    required: true,
    placeholder: 'joao-maria',
    helpText: 'Endereço do site: eivoucasar.com/[slug]'
  },
  // Novos campos para seções específicas
  invitation_title: {
    label: 'Título do Convite',
    type: 'text',
    icon: Mail,
    placeholder: 'Você está convidado!',
    helpText: 'Título que aparecerá na seção do convite'
  },
  formal_invitation_message: {
    label: 'Mensagem Formal',
    type: 'textarea',
    icon: Mail,
    placeholder: 'Mensagem formal do convite...',
    helpText: 'Mensagem formal e detalhada do convite'
  },
  invitation_signature: {
    label: 'Assinatura do Convite',
    type: 'text',
    icon: Mail,
    placeholder: 'Com amor, João & Maria',
    helpText: 'Assinatura que aparecerá no final do convite'
  },
  story_title: {
    label: 'Título da História',
    type: 'text',
    icon: BookOpen,
    placeholder: 'Nossa História de Amor',
    helpText: 'Título da seção Nossa História'
  },
  couple_photo: {
    label: 'Foto do Casal',
    type: 'image',
    icon: Image,
    helpText: 'Foto do casal para a seção história'
  },
  hero_background_image: {
    label: 'Imagem de Fundo Hero',
    type: 'image',
    icon: Image,
    helpText: 'Imagem de fundo da seção principal'
  },
  first_meeting_date: {
    label: 'Data do Primeiro Encontro',
    type: 'date',
    icon: Calendar,
    helpText: 'Data do primeiro encontro'
  },
  first_meeting_story: {
    label: 'História do Primeiro Encontro',
    type: 'textarea',
    icon: BookOpen,
    placeholder: 'Como vocês se conheceram...',
    helpText: 'Conte como foi o primeiro encontro'
  },
  engagement_date: {
    label: 'Data do Noivado',
    type: 'date',
    icon: Calendar,
    helpText: 'Data do pedido de casamento'
  },
  engagement_story: {
    label: 'História do Noivado',
    type: 'textarea',
    icon: BookOpen,
    placeholder: 'Como foi o pedido de casamento...',
    helpText: 'Conte como foi o pedido de casamento'
  },
  countdown_title: {
    label: 'Título da Contagem',
    type: 'text',
    icon: Timer,
    placeholder: 'Faltam apenas...',
    helpText: 'Título da contagem regressiva'
  },
  countdown_message: {
    label: 'Mensagem da Contagem',
    type: 'text',
    icon: Timer,
    placeholder: 'Dias para o nosso grande dia!',
    helpText: 'Mensagem que aparece na contagem regressiva'
  }
}

interface UnifiedSettingsProps {
  initialCouple: Couple
  onDataChange?: (data: any) => void
}

export default function UnifiedSettings({ initialCouple, onDataChange }: UnifiedSettingsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeSection, setActiveSection] = useState('basic-info')
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Estado unificado com mapeamento correto
  const [formData, setFormData] = useState(() => {
    const mappedData = dbToFormData(initialCouple)
    console.log('🔍 UnifiedSettings - initialCouple:', initialCouple)
    console.log('🔍 UnifiedSettings - mappedData:', mappedData)
    console.log('🔍 UnifiedSettings - bride_name:', mappedData.bride_name)
    console.log('🔍 UnifiedSettings - groom_name:', mappedData.groom_name)
    console.log('🔍 UnifiedSettings - wedding_date:', mappedData.wedding_date)
    
    return {
      bride_name: mappedData.bride_name || '',
      groom_name: mappedData.groom_name || '',
      wedding_date: mappedData.wedding_date || '',
      wedding_time: mappedData.wedding_time || '',
      wedding_location: mappedData.wedding_location || '',
      wedding_address: mappedData.wedding_address || '',
      formal_invitation_message: mappedData.formal_invitation_message || '',
      invitation_title: mappedData.invitation_title || '',
      invitation_signature: mappedData.invitation_signature || '',
      story_title: mappedData.story_title || '',
      first_meeting_date: mappedData.first_meeting_date || '',
      first_meeting_story: mappedData.first_meeting_story || '',
      engagement_date: mappedData.engagement_date || '',
      engagement_story: mappedData.engagement_story || '',
      countdown_title: mappedData.countdown_title || '',
      countdown_message: mappedData.countdown_message || '',
      bride_photo: mappedData.bride_photo || '',
      groom_photo: mappedData.groom_photo || '',
      cover_photo_url: mappedData.cover_photo_url || '',
      couple_photo: mappedData.couple_photo || '',
      hero_background_image: mappedData.hero_background_image || '',
      theme_color: mappedData.theme_color || '',
      slug: mappedData.slug || ''
    }
  })

  // Auto-save a cada 3 segundos quando há mudanças
  useEffect(() => {
    if (!hasUnsavedChanges) return

    const saveTimer = setTimeout(() => {
      handleAutoSave()
    }, 3000)

    return () => clearTimeout(saveTimer)
  }, [formData, hasUnsavedChanges])

  // Escutar mudanças do editor inline e template
  useEffect(() => {
    const handleInlineUpdate = (event: CustomEvent<{ fieldId: string; value: string }>) => {
      const { fieldId, value } = event.detail
      console.log('Inline field update:', fieldId, value)
      
      // Atualizar o formulário com dados do editor inline
      if (fieldId in formData) {
        handleInputChange(fieldId, value)
      }
    }

    const handleTemplateUpdate = (event: CustomEvent<{ fieldId: string; value: string }>) => {
      const { fieldId, value } = event.detail
      console.log('Template field update:', fieldId, value)
      
      // Atualizar o formulário com dados do template
      if (fieldId in formData) {
        handleInputChange(fieldId, value)
      }
    }

    window.addEventListener('inlineFieldUpdate', handleInlineUpdate as EventListener)
    window.addEventListener('templateFieldUpdate', handleTemplateUpdate as EventListener)
    
    return () => {
      window.removeEventListener('inlineFieldUpdate', handleInlineUpdate as EventListener)
      window.removeEventListener('templateFieldUpdate', handleTemplateUpdate as EventListener)
    }
  }, [])

  // Notificar mudanças para o editor (apenas quando realmente necessário)
  useEffect(() => {
    if (onDataChange && hasUnsavedChanges) {
      onDataChange(formData)
    }
  }, [formData]) // Removido onDataChange das deps para evitar loop

  const handleInputChange = (fieldName: string, value: string) => {
    console.log('🔄 handleInputChange:', fieldName, '=', value)
    
    if (fieldName === 'hero_background_image') {
      console.log('🖼️ handleInputChange: Atualizando hero_background_image com:', value)
    }
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))
    setHasUnsavedChanges(true)
  }

  const handleAutoSave = async () => {
    try {
      await saveData()
      setLastSaved(new Date())
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error('Auto-save failed:', error)
    }
  }

  const saveData = async () => {
    // Validar apenas se temos dados básicos para auto-save
    const hasBasicData = formData.bride_name && formData.groom_name && formData.wedding_date
    
    if (!hasBasicData) {
      console.log('Pulando auto-save: dados básicos incompletos')
      return
    }
    
    const validation = unifiedSettingsSchema.safeParse(formData)
    
    if (!validation.success) {
      const firstError = validation.error.errors[0]
      throw new Error(firstError.message)
    }

    const supabase = createClient()
    
    // Try to get current session first
    let { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    // If no session, try to refresh
    if (!session && !sessionError) {
      console.log('No session found, attempting to refresh...')
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession()
      
      if (refreshError) {
        console.log('Refresh failed, redirecting to login')
        window.location.href = '/login'
        return
      }
      
      session = refreshData.session
    }
    
    if (sessionError || !session?.access_token) {
      console.log('Session error:', sessionError)
      throw new Error('Sessão expirada. Por favor, faça login novamente.')
    }

    const response = await fetch('/api/couples', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      const result = await response.json()
      
      // Se token expirou, tentar refresh
      if (response.status === 401) {
        console.log('Token expired, attempting refresh...')
        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession()
        
        if (refreshError) {
          console.log('Refresh failed, redirecting to login')
          window.location.href = '/login'
          return
        }
        
        // Tentar novamente com novo token
        const retryResponse = await fetch('/api/couples', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshData.session?.access_token}`,
          },
          body: JSON.stringify(formData),
        })
        
        if (!retryResponse.ok) {
          const retryResult = await retryResponse.json()
          throw new Error(retryResult.error || 'Erro ao salvar')
        }
        
        return retryResponse.json()
      }
      
      throw new Error(result.error || 'Erro ao salvar')
    }

    return response.json()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await saveData()
      toast.success('Configurações salvas com sucesso!')
      setLastSaved(new Date())
      setHasUnsavedChanges(false)
      router.refresh()
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error(error instanceof Error ? error.message : 'Erro ao salvar configurações')
    } finally {
      setIsLoading(false)
    }
  }

  const generateSlug = () => {
    const slug = `${formData.bride_name}-${formData.groom_name}`
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    handleInputChange('slug', slug)
  }

  const renderField = (fieldName: string) => {
    const field = FIELD_CONFIG[fieldName as keyof typeof FIELD_CONFIG]
    const Icon = field.icon || ImageIcon // Usar ImageIcon como fallback
    const value = formData[fieldName as keyof typeof formData]

    return (
      <div key={fieldName} className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Icon className="h-4 w-4 text-gray-500" />
          {field.label}
          {'required' in field && field.required && <span className="text-red-500">*</span>}
        </label>
        
        {field.type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
            rows={fieldName === 'couple_story' ? 6 : 4}
            placeholder={'placeholder' in field ? field.placeholder : ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
          />
        ) : field.type === 'image' ? (
          <ImageUpload
            coupleId={initialCouple.id}
            type={fieldName === 'hero_background_image' ? 'hero' : 
                  fieldName === 'couple_photo' ? 'couple' : 
                  fieldName === 'bride_photo' ? 'bride' : 
                  fieldName === 'groom_photo' ? 'groom' : 'gallery'}
            currentImage={value}
            onImageChange={(url) => handleInputChange(fieldName, url)}
            aspectRatio={fieldName === 'hero_background_image' ? 'landscape' : 
                        fieldName === 'couple_photo' ? 'landscape' : 'portrait'}
            size="md"
          />
        ) : field.type === 'color' ? (
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={value}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
              className="w-12 h-12 border border-gray-300 rounded-md cursor-pointer"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder={'placeholder' in field ? field.placeholder : ''}
            />
          </div>
        ) : fieldName === 'slug' ? (
          <div className="space-y-2">
            <div className="flex">
              <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                eivoucasar.com/
              </span>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(fieldName, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder={'placeholder' in field ? field.placeholder : ''}
              />
            </div>
            <button
              type="button"
              onClick={generateSlug}
              className="text-sm text-purple-600 hover:text-purple-500"
            >
              Gerar automaticamente
            </button>
          </div>
        ) : (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
            required={'required' in field ? field.required : false}
            placeholder={'placeholder' in field ? field.placeholder : ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        )}
        
        {field.helpText && (
          <p className="text-sm text-gray-500">{field.helpText}</p>
        )}
      </div>
    )
  }

  const currentSection = SECTION_FIELDS[activeSection as keyof typeof SECTION_FIELDS]

  return (
    <div className="flex h-full">
      {/* Sidebar Navigation */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Configurações</h2>
            {hasUnsavedChanges && (
              <div className="flex items-center gap-2 text-sm text-amber-600">
                <AlertCircle className="w-4 h-4" />
                Não salvo
              </div>
            )}
            {lastSaved && !hasUnsavedChanges && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Check className="w-4 h-4" />
                Salvo
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            {Object.entries(SECTION_FIELDS).map(([key, section]) => {
              const Icon = section.icon
              const isActive = activeSection === key
              
              return (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-600 border-r-2 border-purple-500'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {section.title}
                </button>
              )
            })}
          </div>

          {lastSaved && (
            <div className="mt-6 p-3 bg-gray-50 rounded-md">
              <p className="text-xs text-gray-500">
                Última atualização: {lastSaved.toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="max-w-4xl">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg bg-${currentSection.color}-50`}>
                  <currentSection.icon className={`h-6 w-6 text-${currentSection.color}-600`} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentSection.title}
                </h1>
              </div>
              <p className="text-gray-600">{currentSection.description}</p>
            </div>

            {/* Fields */}
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {currentSection.fields.map((fieldName) => renderField(fieldName))}
            </motion.div>

            {/* Save Button */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200 mt-8">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Sparkles className="h-4 w-4" />
                Auto-save ativo
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                {isLoading ? 'Salvando...' : 'Salvar Agora'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 