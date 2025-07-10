'use client'

import { useTenant } from '@/contexts/tenant-context'
import { Heart, Quote } from 'lucide-react'

export default function WeddingInvitation() {
  const { couple } = useTenant()

  if (!couple) return null

  const defaultMessage = `Com imensa alegria, convidamos você para celebrar conosco o nosso casamento. 
  
  Sua presença é fundamental para tornar este dia ainda mais especial. Juntos celebraremos o amor, a união e o início de uma nova jornada.
  
  Venha fazer parte desta história de amor!`

  const invitationMessage = couple.invitation_message || defaultMessage

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-rose-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-6 w-6 text-rose-500" fill="currentColor" />
            <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
              Nosso Convite
            </h2>
            <Heart className="h-6 w-6 text-rose-500" fill="currentColor" />
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        {/* Invitation Message */}
        <div className="relative">
          <Quote className="absolute -top-2 -left-2 h-8 w-8 text-rose-200" />
          <div className="bg-gradient-to-b from-rose-50/50 to-pink-50/50 rounded-xl p-6 md:p-8 border border-rose-100">
            <div className="text-center">
              <div className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                {invitationMessage}
              </div>
              
              <div className="flex items-center justify-center gap-2 text-rose-600 font-medium">
                <span>💕</span>
                <span>Com amor,</span>
                <span>💕</span>
              </div>
              
              <div className="mt-4 text-2xl md:text-3xl font-serif text-gray-900">
                {couple.bride_name} & {couple.groom_name}
              </div>
            </div>
          </div>
          <Quote className="absolute -bottom-2 -right-2 h-8 w-8 text-rose-200 rotate-180" />
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center mt-8 gap-2">
          <span className="text-2xl animate-pulse">🌹</span>
          <span className="text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>💖</span>
          <span className="text-2xl animate-pulse" style={{ animationDelay: '1s' }}>🌹</span>
        </div>
      </div>
    </div>
  )
}