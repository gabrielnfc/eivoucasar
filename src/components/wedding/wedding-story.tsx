'use client'

import { useTenant } from '@/contexts/tenant-context'
import { Heart, BookOpen } from 'lucide-react'

export default function WeddingStory() {
  const { couple } = useTenant()

  if (!couple) return null

  const defaultStory = `Nossa história começou de uma forma especial e única. Desde o primeiro encontro, soubemos que havia algo diferente, algo mágico entre nós.

Com o passar do tempo, nosso amor cresceu e se fortaleceu. Vivemos momentos incríveis juntos, superamos desafios e construímos uma base sólida de amor, confiança e cumplicidade.

Hoje, estamos prontos para dar o próximo passo em nossa jornada. Queremos compartilhar este momento especial com vocês, nossas pessoas queridas, que fizeram parte desta linda história.

Obrigado por estarem ao nosso lado nesta nova aventura!`

  const coupleStory = couple.couple_story || defaultStory

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-rose-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-rose-500" />
            <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
              Nossa História
            </h2>
            <BookOpen className="h-6 w-6 text-rose-500" />
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        {/* Story Content */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-rose-50/50 to-pink-50/50 rounded-xl p-6 md:p-8 border border-rose-100">
            <div className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line">
              {coupleStory}
            </div>
          </div>

          {/* Timeline visual element */}
          <div className="flex items-center justify-center gap-4 py-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Primeiro encontro</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-rose-200 to-pink-200"></div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-500" fill="currentColor" />
              <span className="text-sm text-gray-600">Amor</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-pink-200 to-purple-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Casamento</span>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Queremos que vocês façam parte desta história!
            </p>
            <div className="flex justify-center gap-2">
              <span className="text-2xl animate-bounce">💕</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>👰‍♀️</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>🤵‍♂️</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.6s' }}>💕</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}