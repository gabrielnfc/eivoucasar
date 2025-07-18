'use client'

import React, { useState, useEffect, memo } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Heart, Calendar, MapPin, Clock, User, FileText, Image, Palette, Link, Save, Shield,
  Home, Mail, Timer, BookOpen, Users, Gift, UserCheck, Building, Info, 
  ImageIcon, MessageSquare, Layout, Settings2, Sparkles, Check, AlertCircle, Phone, Target, CreditCard
} from 'lucide-react'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import type { Couple } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { coupleService } from '@/lib/database/couple-service'
import { dbToFormData } from '@/lib/utils/field-mapping'
import { ImageUpload } from '@/components/upload/image-upload'
import { generateSlug } from '@/lib/utils/slug'

// Schema unificado para validação - VERSÃO COMPLETA ATUALIZADA
const unifiedSettingsSchema = z.object({
  // Campos básicos
  bride_name: z.string().min(1, 'Nome da noiva é obrigatório'),
  groom_name: z.string().min(1, 'Nome do noivo é obrigatório'),
  wedding_date: z.string().min(1, 'Data do casamento é obrigatória'),
  wedding_time: z.string().optional(),
  wedding_location: z.string().optional(),
  wedding_address: z.string().optional(),
  
  // Campos de convite
  invitation_title: z.string().optional(),
  invitation_signature: z.string().optional(),
  formal_invitation_message: z.string().optional(),
  
  // Campos de história
  couple_story: z.string().optional(),
  story_title: z.string().optional(),
  first_meeting_date: z.string().optional(),
  first_meeting_story: z.string().optional(),
  engagement_date: z.string().optional(),
  engagement_story: z.string().optional(),
  
  // Campos de contagem regressiva
  countdown_title: z.string().optional(),
  countdown_message: z.string().optional(),
  
  // Campos de imagem
  bride_photo: z.string().optional(),
  groom_photo: z.string().optional(),
  cover_photo_url: z.string().optional(),
  couple_photo: z.string().optional(),
  hero_background_image: z.string().optional(),
  
  // Campos de local/venue
  ceremony_venue: z.string().optional(),
  ceremony_time: z.string().optional(),
  reception_venue: z.string().optional(),
  reception_time: z.string().optional(),
  directions: z.string().optional(),
  parking_info: z.string().optional(),
  
  // Campos de RSVP
  rsvp_title: z.string().optional(),
  rsvp_subtitle: z.string().optional(),
  rsvp_deadline: z.string().optional(),
  rsvp_message: z.string().optional(),
  rsvp_confirmation_message: z.string().optional(),
  
  // Campos de padrinhos
  groomsmen_title: z.string().optional(),
  groomsmen_subtitle: z.string().optional(),
  
  // Campos de detalhes
  details_title: z.string().optional(),
  dress_code: z.string().optional(),
  dress_code_description: z.string().optional(),
  important_notes: z.string().optional(),
  
  // Campos de galeria
  gallery_title: z.string().optional(),
  gallery_subtitle: z.string().optional(),
  
  // Campos de depoimentos
  testimonials_title: z.string().optional(),
  testimonials_subtitle: z.string().optional(),
  testimonials_message: z.string().optional(),
  testimonials_auto_approve: z.string().optional(),
  
  // Campos de gamificação
  gamification_title: z.string().optional(),
  gamification_subtitle: z.string().optional(),
  pix_key: z.string().optional(),
  
  // Campos de rodapé
  footer_thank_you_message: z.string().optional(),
  footer_signature: z.string().optional(),
  footer_contact_email: z.string().email().optional(),
  footer_contact_phone: z.string().optional(),
  
  // Outros campos
  theme_color: z.string().optional(),
  slug: z.string().min(1, 'URL personalizada é obrigatória')
    .regex(/^[a-z0-9-]+$/, 'URL deve conter apenas letras minúsculas, números e hífens')
})

// Definição das seções e seus campos - ATUALIZADA
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
    fields: ['invitation_title', 'formal_invitation_message', 'invitation_signature'],
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
  'venue': {
    title: 'Local do Casamento',
    icon: Building,
    color: 'green',
    fields: ['wedding_location', 'wedding_address', 'ceremony_venue', 'ceremony_time', 'reception_venue', 'reception_time', 'directions', 'parking_info'],
    description: 'Informações sobre cerimônia e recepção'
  },
  'rsvp': {
    title: 'RSVP - Confirmação',
    icon: UserCheck,
    color: 'blue',
    fields: ['rsvp_title', 'rsvp_subtitle', 'rsvp_deadline', 'rsvp_message', 'rsvp_confirmation_message'],
    description: 'Configurações da confirmação de presença'
  },
  'groomsmen': {
    title: 'Nossos Padrinhos',
    icon: Users,
    color: 'purple',
    fields: ['groomsmen_title', 'groomsmen_subtitle'],
    description: 'Configurações da seção de padrinhos'
  },
  'details': {
    title: 'Detalhes do Evento',
    icon: Info,
    color: 'slate',
    fields: ['details_title', 'dress_code', 'dress_code_description', 'important_notes'],
    description: 'Dress code e informações importantes'
  },
  'gallery': {
    title: 'Galeria',
    icon: Image,
    color: 'pink',
    fields: ['gallery_title', 'gallery_subtitle'],
    description: 'Configurações da galeria de fotos'
  },
  'testimonials': {
    title: 'Depoimentos',
    icon: MessageSquare,
    color: 'yellow',
    fields: ['testimonials_title', 'testimonials_subtitle', 'testimonials_message', 'testimonials_auto_approve'],
    description: 'Configurações dos depoimentos dos convidados'
  },
  'gamification': {
    title: 'Lua de Mel - PIX',
    icon: Target,
    color: 'emerald',
    fields: ['gamification_title', 'gamification_subtitle', 'pix_key'],
    description: 'Configurações da gamificação e PIX'
  },
  'footer': {
    title: 'Rodapé',
    icon: Layout,
    color: 'gray',
    fields: ['footer_thank_you_message', 'footer_signature', 'footer_contact_email', 'footer_contact_phone'],
    description: 'Informações do rodapé do site'
  },
  'media': {
    title: 'Imagens',
    icon: Image,
    color: 'pink',
    fields: ['hero_background_image', 'couple_photo', 'bride_photo', 'groom_photo', 'cover_photo_url'],
    description: 'Fotos do casal e do casamento'
  },
  'url': {
    title: 'URL',
    icon: Link,
    color: 'cyan',
    fields: ['slug'],
    description: 'Endereço personalizado do site'
  }
}

// Configuração dos campos - EXPANDIDA
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

  // Campos de convite
  invitation_title: {
    label: 'Título do Convite',
    type: 'text',
    icon: Mail,
    placeholder: 'Ex: Você está convidado!',
    helpText: 'Título da seção de convite'
  },
  formal_invitation_message: {
    label: 'Convite Formal',
    type: 'textarea',
    icon: Mail,
    placeholder: 'Mensagem formal do convite...',
    helpText: 'Texto formal do convite'
  },
  invitation_signature: {
    label: 'Assinatura do Convite',
    type: 'text',
    icon: Mail,
    placeholder: 'Ex: João & Maria',
    helpText: 'Nomes do casal (o "Com amor," será adicionado automaticamente)'
  },
  
  // Campos de história
  couple_story: {
    label: 'Nossa História',
    type: 'textarea',
    icon: BookOpen,
    placeholder: 'Conte a história do casal...',
    helpText: 'História que aparecerá na seção "Nossa História"'
  },
  story_title: {
    label: 'Título da História',
    type: 'text',
    icon: BookOpen,
    placeholder: 'Ex: Nossa História',
    helpText: 'Título da seção da história'
  },
  first_meeting_date: {
    label: 'Data do Primeiro Encontro',
    type: 'date',
    icon: Calendar,
    helpText: 'Quando vocês se conheceram'
  },
  first_meeting_story: {
    label: 'História do Primeiro Encontro',
    type: 'textarea',
    icon: BookOpen,
    placeholder: 'Como vocês se conheceram...',
    helpText: 'História de como se conheceram'
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
    placeholder: 'Como foi o pedido...',
    helpText: 'História do pedido de casamento'
  },
  
  // Campos de contagem regressiva
  countdown_title: {
    label: 'Título da Contagem',
    type: 'text',
    icon: Timer,
    placeholder: 'Ex: Faltam apenas...',
    helpText: 'Título da contagem regressiva'
  },
  countdown_message: {
    label: 'Mensagem da Contagem',
    type: 'text',
    icon: Timer,
    placeholder: 'Ex: Para o grande dia!',
    helpText: 'Mensagem que acompanha a contagem'
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
  
  // Campos de local/venue
  ceremony_venue: {
    label: 'Nome do Local da Cerimônia',
    type: 'text',
    icon: Building,
    placeholder: 'Ex: Igreja São João',
    helpText: 'Nome do local onde será a cerimônia'
  },
  ceremony_time: {
    label: 'Horário da Cerimônia',
    type: 'time',
    icon: Clock,
    helpText: 'Horário da cerimônia'
  },
  reception_venue: {
    label: 'Nome do Local da Recepção',
    type: 'text',
    icon: Building,
    placeholder: 'Ex: Salão de Festas Luna',
    helpText: 'Nome do local onde será a recepção'
  },
  reception_time: {
    label: 'Horário da Recepção',
    type: 'time',
    icon: Clock,
    helpText: 'Horário da recepção'
  },
  directions: {
    label: 'Como Chegar',
    type: 'textarea',
    icon: MapPin,
    placeholder: 'Instruções de como chegar...',
    helpText: 'Instruções detalhadas para os convidados'
  },
  parking_info: {
    label: 'Informações de Estacionamento',
    type: 'textarea',
    icon: Info,
    placeholder: 'Informações sobre estacionamento...',
    helpText: 'Detalhes sobre estacionamento no local'
  },
  
  // Campos de RSVP
  rsvp_title: {
    label: 'Título da Seção RSVP',
    type: 'text',
    icon: UserCheck,
    placeholder: 'Ex: Confirme sua Presença',
    helpText: 'Título da seção de confirmação'
  },
  rsvp_subtitle: {
    label: 'Subtítulo do RSVP',
    type: 'text',
    icon: UserCheck,
    placeholder: 'Ex: Sua presença é muito importante para nós!',
    helpText: 'Subtítulo da seção de confirmação'
  },
  rsvp_deadline: {
    label: 'Data Limite para RSVP',
    type: 'date',
    icon: Calendar,
    helpText: 'Data limite para confirmação de presença'
  },
  rsvp_message: {
    label: 'Mensagem do RSVP',
    type: 'textarea',
    icon: MessageSquare,
    placeholder: 'Mensagem adicional para os convidados...',
    helpText: 'Mensagem explicativa para os convidados'
  },
  rsvp_confirmation_message: {
    label: 'Mensagem de Confirmação',
    type: 'textarea',
    icon: MessageSquare,
    placeholder: 'Obrigado por confirmar sua presença!',
    helpText: 'Mensagem mostrada após confirmação'
  },
  
  // Campos de padrinhos
  groomsmen_title: {
    label: 'Título da Seção Padrinhos',
    type: 'text',
    icon: Users,
    placeholder: 'Ex: Nossos Padrinhos',
    helpText: 'Título da seção de padrinhos'
  },
  groomsmen_subtitle: {
    label: 'Subtítulo da Seção Padrinhos',
    type: 'text',
    icon: Users,
    placeholder: 'Ex: Pessoas especiais que estarão ao nosso lado',
    helpText: 'Subtítulo da seção de padrinhos'
  },
  
  // Campos de detalhes
  details_title: {
    label: 'Título da Seção Detalhes',
    type: 'text',
    icon: Info,
    placeholder: 'Ex: Informações Importantes',
    helpText: 'Título da seção de detalhes'
  },
  dress_code: {
    label: 'Dress Code',
    type: 'text',
    icon: Palette,
    placeholder: 'Ex: Esporte Fino',
    helpText: 'Código de vestimenta para o evento'
  },
  dress_code_description: {
    label: 'Descrição do Dress Code',
    type: 'textarea',
    icon: Palette,
    placeholder: 'Detalhes sobre o dress code...',
    helpText: 'Descrição detalhada do dress code'
  },
  important_notes: {
    label: 'Observações Importantes',
    type: 'textarea',
    icon: Info,
    placeholder: 'Informações importantes para os convidados...',
    helpText: 'Informações importantes para os convidados'
  },
  
  // Campos de galeria
  gallery_title: {
    label: 'Título da Galeria',
    type: 'text',
    icon: Image,
    placeholder: 'Ex: Nossa Galeria',
    helpText: 'Título da seção de galeria'
  },
  gallery_subtitle: {
    label: 'Subtítulo da Galeria',
    type: 'text',
    icon: Image,
    placeholder: 'Ex: Momentos especiais capturados',
    helpText: 'Subtítulo da seção de galeria'
  },
  
  // Campos de depoimentos
  testimonials_title: {
    label: 'Título dos Depoimentos',
    type: 'text',
    icon: MessageSquare,
    placeholder: 'Ex: Depoimentos dos Amigos',
    helpText: 'Título da seção de depoimentos'
  },
  testimonials_subtitle: {
    label: 'Subtítulo dos Depoimentos',
    type: 'text',
    icon: MessageSquare,
    placeholder: 'Ex: O que nossos amigos dizem sobre nós',
    helpText: 'Subtítulo da seção de depoimentos'
  },
  testimonials_message: {
    label: 'Mensagem dos Depoimentos',
    type: 'textarea',
    icon: MessageSquare,
    placeholder: 'Deixe uma mensagem carinhosa para o casal...',
    helpText: 'Mensagem de instrução para depoimentos'
  },
  testimonials_auto_approve: {
    label: 'Aprovação Automática',
    type: 'select',
    icon: Shield,
    options: [
      { value: 'true', label: 'Sim - Aprovar automaticamente' },
      { value: 'false', label: 'Não - Revisar antes de publicar' }
    ],
    helpText: 'Se depoimentos são aprovados automaticamente'
  },
  
  // Campos de gamificação
  gamification_title: {
    label: 'Título da Gamificação',
    type: 'text',
    icon: Target,
    placeholder: 'Ex: Ajude nossa Lua de Mel',
    helpText: 'Título da seção de contribuições'
  },
  gamification_subtitle: {
    label: 'Subtítulo da Gamificação',
    type: 'text',
    icon: Target,
    placeholder: 'Ex: Contribua para tornar nossos sonhos realidade',
    helpText: 'Subtítulo da seção de contribuições'
  },
  pix_key: {
    label: 'Chave PIX',
    type: 'text',
    icon: CreditCard,
    placeholder: 'Ex: 11999999999 ou email@exemplo.com',
    helpText: 'Chave PIX para receber contribuições'
  },
  
  // Campos de rodapé
  footer_thank_you_message: {
    label: 'Mensagem de Agradecimento',
    type: 'textarea',
    icon: Heart,
    placeholder: 'Obrigado por fazer parte do nosso grande dia!',
    helpText: 'Mensagem de agradecimento no rodapé'
  },
  footer_signature: {
    label: 'Assinatura do Rodapé',
    type: 'text',
    icon: Heart,
    placeholder: 'Ex: Com amor, João & Maria',
    helpText: 'Assinatura que aparece no rodapé'
  },
  footer_contact_email: {
    label: 'Email de Contato',
    type: 'email',
    icon: Mail,
    placeholder: 'contato@exemplo.com',
    helpText: 'Email de contato no rodapé'
  },
  footer_contact_phone: {
    label: 'Telefone de Contato',
    type: 'tel',
    icon: Phone,
    placeholder: '(11) 99999-9999',
    helpText: 'Telefone de contato no rodapé'
  }
}

interface UnifiedSettingsProps {
  initialCouple: Couple
  onDataChange?: (data: any) => void
  onCoupleUpdate?: (updatedCouple: Couple) => void // Para sincronização com hook
}

const UnifiedSettings = memo(function UnifiedSettings({ initialCouple, onDataChange, onCoupleUpdate }: UnifiedSettingsProps) {
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
      invitation_signature: mappedData.invitation_signature ? 
        mappedData.invitation_signature.replace(/^Com amor,?\s*/i, '').trim() : '',
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
      slug: mappedData.slug || '',
      rsvp_title: mappedData.rsvp_title || '',
      rsvp_subtitle: mappedData.rsvp_subtitle || '',
      rsvp_deadline: mappedData.rsvp_deadline || '',
      rsvp_message: mappedData.rsvp_message || '',
      rsvp_confirmation_message: mappedData.rsvp_confirmation_message || '',
      gamification_title: mappedData.gamification_title || '',
      gamification_subtitle: mappedData.gamification_subtitle || '',
      pix_key: mappedData.pix_key || '',
      testimonials_message: mappedData.testimonials_message || '',
      testimonials_auto_approve: mappedData.testimonials_auto_approve || ''
    }
  })

  // ✅ SMART AUTO-SAVE: Debounced e inteligente
  useEffect(() => {
    if (!hasUnsavedChanges) return

    console.log('⏰ Auto-save: Iniciando timer de 3 segundos')
    const saveTimer = setTimeout(() => {
      console.log('💾 Auto-save: Executando save automático')
      handleAutoSave()
    }, 3000) // Reduzido para 3s para UX melhor

    return () => {
      console.log('⏰ Auto-save: Timer cancelado')
      clearTimeout(saveTimer)
    }
  }, [formData, hasUnsavedChanges])

  // Notificar mudanças para o template (debounced para performance)
  useEffect(() => {
    if (onDataChange && hasUnsavedChanges) {
      console.log('🔄 Config→Template: Notificando mudanças para template')
      
      // ✅ DEBOUNCE: Só notificar após pequeno delay para evitar spam
      const updateTimer = setTimeout(() => {
        onDataChange(formData)
      }, 100) // Micro-delay para agrupar mudanças rápidas
      
      return () => clearTimeout(updateTimer)
    }
  }, [formData, hasUnsavedChanges, onDataChange])

  // Escutar mudanças do editor inline e template
  useEffect(() => {
    const handleInlineUpdate = (event: CustomEvent<{ fieldId: string; value: string }>) => {
      const { fieldId, value } = event.detail
      console.log('📝 Config←Template: Recebendo update:', fieldId, '=', value)
      
      // ✅ SMART SYNC: Só atualizar se o valor realmente mudou
      if (fieldId in formData && formData[fieldId as keyof typeof formData] !== value) {
        console.log('🔄 Config←Template: Aplicando mudança:', fieldId)
        handleInputChange(fieldId, value)
      } else {
        console.log('⏭️ Config←Template: Valor já sincronizado, ignorando')
      }
    }

    const handleTemplateUpdate = (event: CustomEvent<{ fieldId: string; value: string }>) => {
      const { fieldId, value } = event.detail
      console.log('📝 Config←Template: Recebendo template update:', fieldId, '=', value)
      
      // ✅ SMART SYNC: Só atualizar se o valor realmente mudou
      if (fieldId in formData && formData[fieldId as keyof typeof formData] !== value) {
        console.log('🔄 Config←Template: Aplicando template change:', fieldId)
        handleInputChange(fieldId, value)
      } else {
        console.log('⏭️ Config←Template: Template já sincronizado, ignorando')
      }
    }

    window.addEventListener('inlineFieldUpdate', handleInlineUpdate as EventListener)
    window.addEventListener('templateFieldUpdate', handleTemplateUpdate as EventListener)
    
    return () => {
      window.removeEventListener('inlineFieldUpdate', handleInlineUpdate as EventListener)
      window.removeEventListener('templateFieldUpdate', handleTemplateUpdate as EventListener)
    }
  }, [formData]) // ✅ Adicionar formData nas deps para comparação de valores

  const handleInputChange = (fieldName: string, value: string) => {
    console.log('🔄 handleInputChange:', fieldName, '=', value)
    
    if (fieldName === 'hero_background_image') {
      console.log('🖼️ handleInputChange: Atualizando hero_background_image com:', value)
    }
    
    setFormData(prev => {
      // ✅ OTIMIZAÇÃO: Só atualizar se valor realmente mudou
      if (prev[fieldName as keyof typeof prev] === value) {
        console.log('⏭️ handleInputChange: Valor já é o mesmo, ignorando')
        return prev
      }
      
      console.log('✅ handleInputChange: Aplicando mudança')
      return {
        ...prev,
        [fieldName]: value
      }
    })
    setHasUnsavedChanges(true)
  }

  const handleAutoSave = async () => {
    try {
      console.log('💾 Auto-save: Iniciando...')
      await saveData()
      setLastSaved(new Date())
      setHasUnsavedChanges(false)
      console.log('✅ Auto-save: Sucesso!')
    } catch (error) {
      console.error('❌ Auto-save failed:', error)
      // ✅ NÃO mostrar erro de auto-save para usuário - apenas log
      // Auto-save silencioso é melhor UX
    }
  }

  const saveData = async () => {
    // Validar apenas se temos dados básicos para auto-save
    const hasBasicData = formData.bride_name && formData.groom_name && formData.wedding_date
    
    if (!hasBasicData) {
      console.log('⏭️ Auto-save: Pulando - dados básicos incompletos')
      return
    }

    if (!initialCouple?.user_id) {
      console.error('❌ User ID não encontrado')
      throw new Error('Usuário não identificado')
    }

    try {
      console.log('📡 saveData: Enviando para API...', { 
        user_id: initialCouple.user_id,
        changes: Object.keys(formData).filter(key => 
          formData[key as keyof typeof formData] !== initialCouple[key as keyof typeof initialCouple]
        )
      })
      
      // 💌 PROCESSAR ASSINATURA: Adicionar "Com amor," automaticamente
      const processedData = { ...formData }
      if (processedData.invitation_signature && processedData.invitation_signature.trim()) {
        // Remover "Com amor," se já existir para evitar duplicação
        const cleanSignature = processedData.invitation_signature.replace(/^Com amor,?\s*/i, '').trim()
        if (cleanSignature) {
          processedData.invitation_signature = `Com amor, ${cleanSignature}`
          console.log('💌 saveData: Assinatura processada:', processedData.invitation_signature)
        }
      }
      
      const result = await coupleService.updateCouple(initialCouple.user_id, processedData)

      if (!result.success) {
        throw new Error(result.error)
      }
      
      console.log('✅ saveData: Dados salvos com sucesso')
      
      // Atualizar estado local com dados atualizados (sem regenerar template)
      onDataChange?.(result.data)
      
      // Sincronizar com hook otimizado
      if (onCoupleUpdate && result.data) {
        onCoupleUpdate(result.data as unknown as Couple)
      }
      
      return result
    } catch (error) {
      console.error('❌ Error in saveData:', error)
      throw error
    }
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
})

export default UnifiedSettings 