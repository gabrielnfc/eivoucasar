'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Calendar, MapPin, Clock, User, FileText, Image, Palette, Link, Save, Shield, Cookie } from 'lucide-react'
import { z } from 'zod'
import toast from 'react-hot-toast'
import type { Couple } from '@/types'
import { createClient } from '@/lib/supabase/client'

const settingsSchema = z.object({
  bride_name: z.string().min(1, 'Nome da noiva é obrigatório'),
  groom_name: z.string().min(1, 'Nome do noivo é obrigatório'),
  wedding_date: z.string().min(1, 'Data do casamento é obrigatória'),
  wedding_time: z.string().optional(),
  wedding_location: z.string().optional(),
  wedding_address: z.string().optional(),
  invitation_message: z.string().optional(),
  couple_story: z.string().optional(),
  bride_photo: z.string().optional(),
  groom_photo: z.string().optional(),
  cover_photo: z.string().optional(),
  theme_color: z.string().optional(),
  slug: z.string().min(1, 'URL personalizada é obrigatória')
    .regex(/^[a-z0-9-]+$/, 'URL deve conter apenas letras minúsculas, números e hífens')
})

interface SettingsFormProps {
  initialCouple: Couple
}

export default function SettingsForm({ initialCouple }: SettingsFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [formData, setFormData] = useState({
    bride_name: initialCouple.bride_name || '',
    groom_name: initialCouple.groom_name || '',
    wedding_date: initialCouple.wedding_date || '',
    wedding_time: initialCouple.wedding_time || '',
    wedding_location: initialCouple.wedding_location || '',
    wedding_address: initialCouple.wedding_address || '',
    invitation_message: initialCouple.invitation_message || '',
    couple_story: initialCouple.couple_story || '',
    bride_photo: initialCouple.bride_photo || '',
    groom_photo: initialCouple.groom_photo || '',
    cover_photo: initialCouple.cover_photo || '',
    theme_color: initialCouple.theme_color || '#fe97a2',
    slug: initialCouple.slug || ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validation = settingsSchema.safeParse(formData)
    
    if (!validation.success) {
      const firstError = validation.error.errors[0]
      toast.error(firstError.message)
      return
    }

    setIsLoading(true)

    try {
      console.log('Step 1: Getting auth token...')
      
      // Get auth token
      const supabase = createClient()
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      console.log('Step 2: Session result:', { session: !!session, error: sessionError })
      
      if (sessionError || !session?.access_token) {
        console.log('Step 3: No token found, redirecting to login')
        toast.error('Token de autenticação não encontrado')
        router.push('/login')
        return
      }
      
      console.log('Step 4: Making API request...')
      
      const response = await fetch('/api/couples', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(formData),
      })

      console.log('Step 5: API response status:', response.status)
      
      const result = await response.json()
      
      console.log('Step 6: API result:', result)

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao salvar')
      }

      console.log('Step 7: Success!')
      toast.success('Configurações salvas com sucesso!')
      router.refresh()
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error(error instanceof Error ? error.message : 'Erro ao salvar configurações')
    } finally {
      console.log('Step 8: Setting loading to false')
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateSlug = () => {
    const slug = `${formData.bride_name}-${formData.groom_name}`
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    handleInputChange('slug', slug)
  }

  const tabs = [
    { id: 'basic', label: 'Informações Básicas', icon: User },
    { id: 'content', label: 'Conteúdo', icon: FileText },
    { id: 'photos', label: 'Fotos', icon: Image },
    { id: 'appearance', label: 'Aparência', icon: Palette },
    { id: 'url', label: 'URL', icon: Link },
    { id: 'privacy', label: 'Privacidade', icon: Shield }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-rose-500 text-rose-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Basic Information */}
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Heart className="h-4 w-4 text-rose-500" />
                  Nome da Noiva *
                </label>
                <input
                  type="text"
                  required
                  value={formData.bride_name}
                  onChange={(e) => handleInputChange('bride_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  placeholder="Nome da noiva"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Heart className="h-4 w-4 text-rose-500" />
                  Nome do Noivo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.groom_name}
                  onChange={(e) => handleInputChange('groom_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  placeholder="Nome do noivo"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 text-rose-500" />
                  Data do Casamento *
                </label>
                <input
                  type="date"
                  required
                  value={formData.wedding_date}
                  onChange={(e) => handleInputChange('wedding_date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 text-rose-500" />
                  Horário do Casamento
                </label>
                <input
                  type="time"
                  value={formData.wedding_time}
                  onChange={(e) => handleInputChange('wedding_time', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 text-rose-500" />
                  Local do Casamento
                </label>
                <input
                  type="text"
                  value={formData.wedding_location}
                  onChange={(e) => handleInputChange('wedding_location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  placeholder="Ex: Igreja São João"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 text-rose-500" />
                  Endereço Completo
                </label>
                <input
                  type="text"
                  value={formData.wedding_address}
                  onChange={(e) => handleInputChange('wedding_address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  placeholder="Rua, número, cidade - CEP"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FileText className="h-4 w-4 text-rose-500" />
                Mensagem do Convite
              </label>
              <textarea
                value={formData.invitation_message}
                onChange={(e) => handleInputChange('invitation_message', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                placeholder="Digite a mensagem que aparecerá no convite do seu site..."
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Heart className="h-4 w-4 text-rose-500" />
                Nossa História
              </label>
              <textarea
                value={formData.couple_story}
                onChange={(e) => handleInputChange('couple_story', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                placeholder="Conte a história do casal..."
              />
            </div>
          </div>
        )}

        {/* Photos */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Image className="h-4 w-4 text-rose-500" />
                  Foto da Noiva
                </label>
                <input
                  type="url"
                  value={formData.bride_photo}
                  onChange={(e) => handleInputChange('bride_photo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  placeholder="URL da foto da noiva"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Image className="h-4 w-4 text-rose-500" />
                  Foto do Noivo
                </label>
                <input
                  type="url"
                  value={formData.groom_photo}
                  onChange={(e) => handleInputChange('groom_photo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  placeholder="URL da foto do noivo"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Image className="h-4 w-4 text-rose-500" />
                Foto de Capa
              </label>
              <input
                type="url"
                value={formData.cover_photo}
                onChange={(e) => handleInputChange('cover_photo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                placeholder="URL da foto de capa do site"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium text-blue-900 mb-2">💡 Dica para fotos</h4>
              <p className="text-sm text-blue-700">
                Use serviços como Imgur, Google Drive ou qualquer host de imagens para obter URLs das suas fotos. 
                Certifique-se de que as URLs terminem com .jpg, .png ou .webp.
              </p>
            </div>
          </div>
        )}

        {/* Appearance */}
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Palette className="h-4 w-4 text-rose-500" />
                Cor do Tema
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={formData.theme_color}
                  onChange={(e) => handleInputChange('theme_color', e.target.value)}
                  className="w-12 h-12 border border-gray-300 rounded-md cursor-pointer"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={formData.theme_color}
                    onChange={(e) => handleInputChange('theme_color', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="#fe97a2"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium text-gray-900 mb-2">🎨 Personalização</h4>
              <p className="text-sm text-gray-600">
                Escolha uma cor que combine com o tema do seu casamento. Esta cor será usada nos destaques 
                e elementos principais do seu site.
              </p>
            </div>
          </div>
        )}

        {/* URL */}
        {activeTab === 'url' && (
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Link className="h-4 w-4 text-rose-500" />
                URL Personalizada *
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  eivoucasar.com/
                </span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  placeholder="joao-maria"
                />
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-600">
                  Apenas letras minúsculas, números e hífens
                </p>
                <button
                  type="button"
                  onClick={generateSlug}
                  className="text-sm text-rose-600 hover:text-rose-500"
                >
                  Gerar automaticamente
                </button>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-md">
              <h4 className="font-medium text-green-900 mb-2">🌐 Seu Site</h4>
              <p className="text-sm text-green-700">
                Seu site ficará disponível em: <strong>eivoucasar.com/{formData.slug}</strong>
              </p>
            </div>
          </div>
        )}

        {/* Privacy & Cookies */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">
                  Privacidade e Cookies
                </h3>
              </div>
              <p className="text-blue-700 mb-4">
                Gerencie suas preferências de privacidade e cookies conforme a LGPD (Lei Geral de Proteção de Dados).
              </p>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Cookie className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Configurações de Cookies</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Controle quais tipos de cookies são aceitos em seu navegador.
                </p>
                <button
                  type="button"
                  onClick={() => router.push('/dashboard/settings/cookies')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Gerenciar Cookies
                </button>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">🛡️ Seus Direitos</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• <strong>Acesso:</strong> Solicitar acesso aos seus dados pessoais</p>
                  <p>• <strong>Correção:</strong> Corrigir dados incorretos ou desatualizados</p>
                  <p>• <strong>Exclusão:</strong> Solicitar exclusão dos seus dados</p>
                  <p>• <strong>Portabilidade:</strong> Receber seus dados em formato estruturado</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">
                🔒 Como Protegemos Seus Dados
              </h3>
              <div className="space-y-3 text-sm text-green-700">
                <p>
                  <strong>Criptografia:</strong> Todos os dados são criptografados em trânsito e em repouso.
                </p>
                <p>
                  <strong>Acesso Restrito:</strong> Apenas pessoal autorizado tem acesso aos dados.
                </p>
                <p>
                  <strong>Backup Seguro:</strong> Backups regulares em ambiente seguro e criptografado.
                </p>
                <p>
                  <strong>Monitoramento:</strong> Monitoramento 24/7 para detectar atividades suspeitas.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">
                📊 Dados Que Coletamos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
                <div>
                  <h4 className="font-medium mb-2">Dados Pessoais:</h4>
                  <ul className="space-y-1">
                    <li>• Nome dos noivos</li>
                    <li>• E-mail de contato</li>
                    <li>• Data do casamento</li>
                    <li>• Local do evento</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Dados de Uso:</h4>
                  <ul className="space-y-1">
                    <li>• Páginas visitadas</li>
                    <li>• Tempo de permanência</li>
                    <li>• Interações no site</li>
                    <li>• Preferências de configuração</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">
                Tem dúvidas sobre privacidade ou quer exercer seus direitos?
              </p>
              <a
                href="mailto:privacidade@eivoucasar.com"
                className="text-rose-600 hover:text-rose-700 font-medium underline"
              >
                Entre em contato: privacidade@eivoucasar.com
              </a>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            {isLoading ? 'Salvando...' : 'Salvar Configurações'}
          </button>
        </div>
      </form>
    </div>
  )
}