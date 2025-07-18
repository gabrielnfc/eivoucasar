'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Heart } from 'lucide-react'
import { useTenant } from '@/contexts/tenant-context'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import RomanticDecorations from '@/components/ui/romantic-decorations'
import Image from 'next/image'

export default function WeddingHero() {
  const { couple, isLoading } = useTenant()

  // ✅ Seções não precisam loading de página - apenas renderizar vazio se carregando
  if (isLoading || !couple) {
    return null
  }

  const weddingDate = new Date(couple.wedding_date)
  const formattedDate = format(weddingDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  const formattedTime = couple.wedding_time ? format(new Date(`2000-01-01T${couple.wedding_time}`), 'HH:mm', { locale: ptBR }) : ''

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-rose-50 to-white overflow-hidden">
      {/* Romantic decorations for hero */}
      <RomanticDecorations variant="hero" />
      
      {/* Cover photo background */}
      {couple.cover_photo_url && (
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          src={couple.cover_photo_url}
          alt={`Foto do casal ${couple.bride_name} e ${couple.groom_name}`}
          fill
          priority
        />
      )}
      
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Couple photos */}
          <div className="flex items-center justify-center gap-8 mb-12">
            {couple.bride_photo && (
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={couple.bride_photo}
                    alt={couple.bride_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-2xl">
                  👰‍♀️
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-center">
              <Heart className="h-8 w-8 text-rose-500 animate-pulse" fill="currentColor" />
            </div>
            
            {couple.groom_photo && (
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={couple.groom_photo}
                    alt={couple.groom_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-2xl">
                  🤵‍♂️
                </div>
              </div>
            )}
          </div>

          {/* Names */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-4">
              {couple.bride_name}
              <span className="text-rose-500 mx-4">&</span>
              {couple.groom_name}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"></div>
          </div>

          {/* Wedding details */}
          <div className="space-y-6 mb-12">
            <div className="flex items-center justify-center gap-2 text-xl md:text-2xl text-gray-700">
              <Calendar className="h-6 w-6 text-rose-500" />
              <span>{formattedDate}</span>
              {formattedTime && <span className="text-gray-500">• {formattedTime}</span>}
            </div>
            
            {couple.wedding_location && (
              <div className="flex items-center justify-center gap-2 text-lg md:text-xl text-gray-600">
                <MapPin className="h-5 w-5 text-rose-500" />
                <span>{couple.wedding_location}</span>
              </div>
            )}
          </div>

          {/* Call to action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-8 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Confirmar Presença
            </button>
            <button
              onClick={() => document.getElementById('contributions')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white hover:bg-gray-50 text-rose-500 font-medium py-3 px-8 rounded-full border-2 border-rose-500 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Contribuir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}