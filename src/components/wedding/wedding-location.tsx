'use client'

import { useTenant } from '@/contexts/tenant-context'
import { MapPin, Navigation, Clock, Phone } from 'lucide-react'

export default function WeddingLocation() {
  const { couple } = useTenant()

  if (!couple) return null

  // Extract coordinates from address if available (simple implementation)
  const getGoogleMapsUrl = (address: string) => {
    const encodedAddress = encodeURIComponent(address)
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
  }

  const getGoogleMapsEmbedUrl = (address: string) => {
    const encodedAddress = encodeURIComponent(address)
    return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodedAddress}`
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-rose-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="h-6 w-6 text-rose-500" />
            <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
              Localização
            </h2>
            <MapPin className="h-6 w-6 text-rose-500" />
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Location Details */}
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-rose-50/50 to-pink-50/50 rounded-xl p-6 border border-rose-100">
              <h3 className="text-xl font-serif text-gray-900 mb-4">
                Detalhes do Local
              </h3>
              
              <div className="space-y-4">
                {couple.wedding_location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-rose-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Local</h4>
                      <p className="text-gray-600">{couple.wedding_location}</p>
                    </div>
                  </div>
                )}

                {couple.wedding_address && (
                  <div className="flex items-start gap-3">
                    <Navigation className="h-5 w-5 text-rose-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Endereço</h4>
                      <p className="text-gray-600">{couple.wedding_address}</p>
                    </div>
                  </div>
                )}

                {couple.wedding_time && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-rose-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Horário</h4>
                      <p className="text-gray-600">{couple.wedding_time}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {couple.wedding_address && (
                <a
                  href={getGoogleMapsUrl(couple.wedding_address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <Navigation className="h-5 w-5" />
                  Abrir no Google Maps
                </a>
              )}

              <button
                onClick={() => {
                  if (couple.wedding_address) {
                    const mapsUrl = getGoogleMapsUrl(couple.wedding_address)
                    if (navigator.share) {
                      navigator.share({
                        title: `Casamento ${couple.bride_name} & ${couple.groom_name}`,
                        text: `Local: ${couple.wedding_location}\nEndereço: ${couple.wedding_address}`,
                        url: mapsUrl
                      })
                    } else {
                      // Fallback: copy to clipboard
                      navigator.clipboard.writeText(`${couple.wedding_location}\n${couple.wedding_address}\n${mapsUrl}`)
                    }
                  }
                }}
                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-rose-500 font-medium py-3 px-6 rounded-lg border-2 border-rose-500 transition-colors duration-200 shadow-md hover:shadow-lg w-full"
              >
                <Phone className="h-5 w-5" />
                Compartilhar Localização
              </button>
            </div>
          </div>

          {/* Map */}
          <div className="space-y-4">
            {couple.wedding_address && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
              <div className="aspect-video rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  src={getGoogleMapsEmbedUrl(couple.wedding_address)}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização do casamento"
                />
              </div>
            ) : (
              <div className="aspect-video rounded-lg border border-gray-200 bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg mb-2">
                    Mapa em breve
                  </p>
                  <p className="text-gray-500 text-sm">
                    A localização será disponibilizada aqui
                  </p>
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="bg-gradient-to-b from-blue-50/50 to-indigo-50/50 rounded-xl p-4 border border-blue-100">
              <h4 className="font-medium text-gray-900 mb-2">
                💡 Dicas importantes
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Chegue com 15 minutos de antecedência</li>
                <li>• Estacionamento disponível no local</li>
                <li>• Local acessível para cadeirantes</li>
                <li>• Em caso de dúvidas, entre em contato</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Mal podemos esperar para celebrar com vocês neste local especial!
          </p>
          <div className="flex justify-center gap-2">
            <span className="text-2xl animate-pulse">📍</span>
            <span className="text-2xl animate-pulse" style={{ animationDelay: '0.3s' }}>💒</span>
            <span className="text-2xl animate-pulse" style={{ animationDelay: '0.6s' }}>🗺️</span>
          </div>
        </div>
      </div>
    </div>
  )
}