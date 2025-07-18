'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Camera, ExternalLink } from 'lucide-react'
import { useTenant } from '@/contexts/tenant-context'
import { createClient } from '@/lib/supabase/client'
import type { VenuePhoto } from '@/types'
import Image from 'next/image'

export default function WeddingVenue() {
  const { couple } = useTenant()
  const [venuePhotos, setVenuePhotos] = useState<VenuePhoto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState<VenuePhoto | null>(null)

  useEffect(() => {
    if (!couple?.id) return

    const fetchVenuePhotos = async () => {
      try {
        const supabase = createClient()
        
        const { data, error } = await supabase
          .from('venue_photos')
          .select('*')
          .eq('couple_id', couple.id)
          .order('order', { ascending: true })

        if (error) {
          console.error('Error fetching venue photos:', error)
          return
        }

        setVenuePhotos((data || []) as unknown as VenuePhoto[])
      } catch (error) {
        console.error('Error fetching venue photos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVenuePhotos()
  }, [couple?.id])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // ✅ Seções não precisam loading de página - apenas renderizar vazio se carregando
  if (isLoading || !couple) {
    return null
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-rose-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="h-6 w-6 text-rose-500" />
            <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
              Nosso Local
            </h2>
            <Camera className="h-6 w-6 text-rose-500" />
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        {/* Venue Information */}
        <div className="mb-8">
          <div className="bg-gradient-to-b from-rose-50/50 to-pink-50/50 rounded-xl p-6 border border-rose-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              {couple.wedding_location && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-rose-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Local</h3>
                    <p className="text-gray-600">{couple.wedding_location}</p>
                  </div>
                </div>
              )}

              {/* Time */}
              {couple.wedding_time && (
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-rose-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Horário</h3>
                    <p className="text-gray-600">{couple.wedding_time}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Photos Grid */}
        {venuePhotos.length > 0 ? (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 text-lg">
                Conheça o local onde nossa história será celebrada
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {venuePhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <Image
                    src={photo.url}
                    alt={photo.caption || `Foto do local ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                    <p className="text-sm font-medium">
                      {photo.caption || `Foto ${index + 1}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-4">
              Em breve, compartilharemos fotos do nosso local especial!
            </p>
            <div className="flex justify-center gap-2">
              <span className="text-2xl animate-pulse">📸</span>
              <span className="text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>💒</span>
              <span className="text-2xl animate-pulse" style={{ animationDelay: '1s' }}>🌺</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Esperamos vocês neste lugar tão especial para nós!
          </p>
          <div className="flex justify-center gap-2">
            <span className="text-2xl animate-pulse">💕</span>
            <span className="text-2xl animate-pulse" style={{ animationDelay: '0.3s' }}>🏰</span>
            <span className="text-2xl animate-pulse" style={{ animationDelay: '0.6s' }}>💕</span>
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              title="Fechar"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-10"
            >
              {/* Heart icon was removed from imports, so using ExternalLink as a placeholder */}
              <ExternalLink className="h-6 w-6" />
            </button>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.caption || 'Foto do local'}
                fill
                className="object-cover"
              />
            </div>
            {selectedPhoto.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white text-lg font-medium">
                  {selectedPhoto.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}