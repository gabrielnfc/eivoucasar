'use client'

import { useState, useEffect } from 'react'
import { useTenant } from '@/contexts/tenant-context'
import { Users, Heart, Crown, Phone } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Groomsman } from '@/types'
import Image from 'next/image'

export default function WeddingGroomsmen() {
  const { couple } = useTenant()
  const [groomsmen, setGroomsmen] = useState<Groomsman[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!couple?.id) return

    const fetchGroomsmen = async () => {
      try {
        const supabase = createClient()
        
        const { data, error } = await supabase
          .from('groomsmen')
          .select('*')
          .eq('couple_id', couple.id)
          .order('role', { ascending: true })

        if (error) {
          console.error('Error fetching groomsmen:', error)
          return
        }

        setGroomsmen((data || []) as unknown as Groomsman[])
      } catch (error) {
        console.error('Error fetching groomsmen:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGroomsmen()
  }, [couple?.id])

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'best_man':
        return 'Padrinho'
      case 'maid_of_honor':
        return 'Madrinha'
      case 'groomsman':
        return 'Padrinho'
      case 'bridesmaid':
        return 'Madrinha'
      default:
        return 'Padrinho/Madrinha'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'best_man':
      case 'maid_of_honor':
        return <Crown className="h-4 w-4 text-amber-500" />
      default:
        return <Heart className="h-4 w-4 text-rose-500" />
    }
  }

  const getDefaultPhoto = (role: string) => {
    return role === 'bridesmaid' || role === 'maid_of_honor' 
      ? '/images/default-bridesmaid.png' 
      : '/images/default-groomsman.png'
  }

  if (!couple) return null

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando padrinhos...</p>
        </div>
      </div>
    )
  }

  if (groomsmen.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-100">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="h-6 w-6 text-rose-500" />
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
                Nossos Padrinhos
              </h2>
              <Users className="h-6 w-6 text-rose-500" />
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 text-lg">
              Em breve, apresentaremos nossos queridos padrinhos e madrinhas!
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <span className="text-2xl animate-pulse">👫</span>
              <span className="text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>👭</span>
              <span className="text-2xl animate-pulse" style={{ animationDelay: '1s' }}>👫</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const groomsmenList = groomsmen.filter(g => g.role === 'groomsman' || g.role === 'best_man')
  const bridesmaids = groomsmen.filter(g => g.role === 'bridesmaid' || g.role === 'maid_of_honor')

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-rose-100">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-6 w-6 text-rose-500" />
            <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
              Nossos Padrinhos
            </h2>
            <Users className="h-6 w-6 text-rose-500" />
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">
            Pessoas especiais que estarão ao nosso lado neste dia único
          </p>
        </div>

        <div className="space-y-12">
          {/* Groomsmen */}
          {groomsmenList.length > 0 && (
            <div>
              <h3 className="text-xl font-serif text-gray-900 text-center mb-6">
                Padrinhos do {couple.groom_name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {groomsmenList.map((groomsman) => (
                  <div
                    key={groomsman.id}
                    className="bg-gradient-to-b from-blue-50/50 to-indigo-50/50 rounded-xl p-6 border border-blue-100 text-center hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="relative mb-4">
                      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-white shadow-lg">
                        {groomsman.photo ? (
                          <Image
                            src={groomsman.photo}
                            alt={groomsman.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center">
                            <span className="text-3xl">🤵‍♂️</span>
                          </div>
                        )}
                      </div>
                      <div className="absolute -top-2 -right-2">
                        {getRoleIcon(groomsman.role)}
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-medium text-gray-900 mb-1">
                      {groomsman.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {getRoleLabel(groomsman.role)}
                    </p>
                    
                    {groomsman.phone && (
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                        <Phone className="h-3 w-3" />
                        <span>{groomsman.phone}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bridesmaids */}
          {bridesmaids.length > 0 && (
            <div>
              <h3 className="text-xl font-serif text-gray-900 text-center mb-6">
                Madrinhas da {couple.bride_name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {bridesmaids.map((bridesmaid) => (
                  <div
                    key={bridesmaid.id}
                    className="bg-gradient-to-b from-rose-50/50 to-pink-50/50 rounded-xl p-6 border border-rose-100 text-center hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="relative mb-4">
                      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-white shadow-lg">
                        {bridesmaid.photo ? (
                          <Image
                            src={bridesmaid.photo}
                            alt={bridesmaid.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-b from-rose-100 to-rose-200 flex items-center justify-center">
                            <span className="text-3xl">👰‍♀️</span>
                          </div>
                        )}
                      </div>
                      <div className="absolute -top-2 -right-2">
                        {getRoleIcon(bridesmaid.role)}
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-medium text-gray-900 mb-1">
                      {bridesmaid.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {getRoleLabel(bridesmaid.role)}
                    </p>
                    
                    {bridesmaid.phone && (
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                        <Phone className="h-3 w-3" />
                        <span>{bridesmaid.phone}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer message */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Obrigado por estarem ao nosso lado neste momento tão especial!
          </p>
          <div className="flex justify-center gap-2">
            <span className="text-2xl animate-pulse">💕</span>
            <span className="text-2xl animate-pulse" style={{ animationDelay: '0.3s' }}>🤗</span>
            <span className="text-2xl animate-pulse" style={{ animationDelay: '0.6s' }}>💕</span>
          </div>
        </div>
      </div>
    </div>
  )
}