'use client'

import { useState, useEffect } from 'react'
import { useTenant } from '@/contexts/tenant-context'
import { MessageCircle, Heart, Send, User, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Message } from '@/types'
import toast from 'react-hot-toast'

interface MessageFormData {
  guest_name: string
  guest_email: string
  message: string
}

export default function WeddingMessages() {
  const { couple } = useTenant()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<MessageFormData>({
    guest_name: '',
    guest_email: '',
    message: ''
  })

  useEffect(() => {
    if (!couple?.id) return

    const fetchMessages = async () => {
      try {
        const supabase = createClient()
        
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('couple_id', couple.id)
          .eq('is_approved', true)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching messages:', error)
          return
        }

        setMessages((data || []) as unknown as Message[])
      } catch (error) {
        console.error('Error fetching messages:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [couple?.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!couple) return
    
    if (!formData.guest_name.trim()) {
      toast.error('Por favor, informe seu nome')
      return
    }

    if (!formData.message.trim()) {
      toast.error('Por favor, escreva uma mensagem')
      return
    }

    setIsSubmitting(true)

    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('messages')
        .insert({
          couple_id: couple.id,
          guest_name: formData.guest_name.trim(),
          guest_email: formData.guest_email.trim() || null,
          message: formData.message.trim(),
          is_approved: false // Messages need approval
        })

      if (error) {
        throw error
      }

      toast.success('Mensagem enviada com sucesso! Após aprovação, ela aparecerá aqui.')

      // Reset form
      setFormData({
        guest_name: '',
        guest_email: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting message:', error)
      toast.error('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof MessageFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!couple) return null

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-rose-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="h-6 w-6 text-rose-500" />
            <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
              Recados para os Noivos
            </h2>
            <MessageCircle className="h-6 w-6 text-rose-500" />
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">
            Deixe uma mensagem carinhosa para {couple.bride_name} e {couple.groom_name}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Message Form */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-100">
              <h3 className="text-xl font-serif text-gray-900 mb-4">
                Escreva seu recado
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4" />
                    Seu nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.guest_name}
                    onChange={(e) => handleInputChange('guest_name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4" />
                    Email (opcional)
                  </label>
                  <input
                    type="email"
                    value={formData.guest_email}
                    onChange={(e) => handleInputChange('guest_email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                    placeholder="seu.email@exemplo.com"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MessageCircle className="h-4 w-4" />
                    Sua mensagem *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                    rows={5}
                    placeholder="Escreva uma mensagem carinhosa para os noivos..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                  {isSubmitting ? 'Enviando...' : 'Enviar Recado'}
                </button>
              </form>
            </div>
          </div>

          {/* Messages Display */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-xl font-serif text-gray-900 mb-4">
                Mensagens dos Convidados
              </h3>
              
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Carregando mensagens...</p>
                </div>
              ) : messages.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-rose-500" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {message.guest_name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {formatDate(message.created_at)}
                            </p>
                          </div>
                        </div>
                        <Heart className="h-4 w-4 text-rose-400" />
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {message.message}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Seja o primeiro a deixar um recado!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Todas as mensagens passam por aprovação antes de serem publicadas.
          </p>
          <div className="flex justify-center gap-2">
            <span className="text-2xl animate-pulse">💌</span>
            <span className="text-2xl animate-pulse" style={{ animationDelay: '0.3s' }}>💕</span>
            <span className="text-2xl animate-pulse" style={{ animationDelay: '0.6s' }}>📝</span>
          </div>
        </div>
      </div>
    </div>
  )
}