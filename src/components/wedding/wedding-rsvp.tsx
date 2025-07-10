'use client'

import { useState } from 'react'
import { useTenant } from '@/contexts/tenant-context'
import { Check, X, User, Mail, Phone, MessageCircle, Users, Utensils } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

interface RSVPFormData {
  guest_name: string
  guest_email: string
  guest_phone: string
  will_attend: boolean | null
  plus_one: boolean
  plus_one_name: string
  dietary_restrictions: string
  message: string
}

export default function WeddingRSVP() {
  const { couple } = useTenant()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<RSVPFormData>({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    will_attend: null,
    plus_one: false,
    plus_one_name: '',
    dietary_restrictions: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!couple) return
    
    if (formData.will_attend === null) {
      toast.error('Por favor, confirme se você irá comparecer')
      return
    }

    if (!formData.guest_name.trim()) {
      toast.error('Por favor, informe seu nome')
      return
    }

    if (formData.plus_one && !formData.plus_one_name.trim()) {
      toast.error('Por favor, informe o nome do acompanhante')
      return
    }

    setIsSubmitting(true)

    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('guest_rsvps')
        .insert({
          couple_id: couple.id,
          guest_name: formData.guest_name.trim(),
          guest_email: formData.guest_email.trim() || null,
          guest_phone: formData.guest_phone.trim() || null,
          will_attend: formData.will_attend,
          plus_one: formData.plus_one,
          plus_one_name: formData.plus_one_name.trim() || null,
          dietary_restrictions: formData.dietary_restrictions.trim() || null,
          message: formData.message.trim() || null
        })

      if (error) {
        throw error
      }

      toast.success(
        formData.will_attend 
          ? 'Confirmação enviada com sucesso! Nos vemos no casamento! 💕'
          : 'Confirmação enviada. Sentiremos sua falta! 💔'
      )

      // Reset form
      setFormData({
        guest_name: '',
        guest_email: '',
        guest_phone: '',
        will_attend: null,
        plus_one: false,
        plus_one_name: '',
        dietary_restrictions: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      toast.error('Erro ao enviar confirmação. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof RSVPFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!couple) return null

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-rose-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Check className="h-6 w-6 text-rose-500" />
            <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
              Confirmar Presença
            </h2>
            <Check className="h-6 w-6 text-rose-500" />
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">
            Sua presença é muito importante para nós!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4" />
                Nome completo *
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
                Email
              </label>
              <input
                type="email"
                value={formData.guest_email}
                onChange={(e) => handleInputChange('guest_email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                placeholder="seu.email@exemplo.com"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone className="h-4 w-4" />
                Telefone
              </label>
              <input
                type="tel"
                value={formData.guest_phone}
                onChange={(e) => handleInputChange('guest_phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          {/* Attendance Confirmation */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-4 block">
              Você irá comparecer ao casamento? *
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleInputChange('will_attend', true)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all duration-200 ${
                  formData.will_attend === true
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-green-500'
                }`}
              >
                <Check className="h-5 w-5" />
                Sim, estarei presente!
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('will_attend', false)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all duration-200 ${
                  formData.will_attend === false
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-red-500'
                }`}
              >
                <X className="h-5 w-5" />
                Não poderei comparecer
              </button>
            </div>
          </div>

          {/* Plus One */}
          {formData.will_attend === true && (
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Users className="h-4 w-4" />
                  Acompanhante
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.plus_one}
                    onChange={(e) => handleInputChange('plus_one', e.target.checked)}
                    className="w-4 h-4 text-rose-500 border-gray-300 rounded focus:ring-rose-500"
                  />
                  <span className="text-gray-700">Levarei um acompanhante</span>
                </label>
              </div>

              {formData.plus_one && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Nome do acompanhante *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.plus_one_name}
                    onChange={(e) => handleInputChange('plus_one_name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                    placeholder="Nome do acompanhante"
                  />
                </div>
              )}

              {/* Dietary Restrictions */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Utensils className="h-4 w-4" />
                  Restrições alimentares
                </label>
                <textarea
                  value={formData.dietary_restrictions}
                  onChange={(e) => handleInputChange('dietary_restrictions', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                  rows={3}
                  placeholder="Informe se possui alguma restrição alimentar (vegetariano, vegano, alergia, etc.)"
                />
              </div>
            </div>
          )}

          {/* Message */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MessageCircle className="h-4 w-4" />
              Mensagem para os noivos
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
              rows={4}
              placeholder="Deixe uma mensagem carinhosa para os noivos..."
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-rose-500 hover:bg-rose-600 disabled:bg-gray-400 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Confirmar Presença'}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Obrigado por confirmar sua presença conosco!
          </p>
          <div className="flex justify-center gap-2">
            <span className="text-2xl animate-pulse">💕</span>
            <span className="text-2xl animate-pulse" style={{ animationDelay: '0.3s' }}>✅</span>
            <span className="text-2xl animate-pulse" style={{ animationDelay: '0.6s' }}>🎉</span>
          </div>
        </div>
      </div>
    </div>
  )
}