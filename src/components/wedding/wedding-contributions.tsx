'use client'

import { useState, useEffect } from 'react'
import { useTenant } from '@/contexts/tenant-context'
import { Gift, Trophy, Heart, QrCode, DollarSign, Crown } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Contribution } from '@/types'

export default function WeddingContributions() {
  const { couple } = useTenant()
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalAmount, setTotalAmount] = useState(0)
  const [showQRCode, setShowQRCode] = useState(false)

  useEffect(() => {
    if (!couple?.id) return

    const fetchContributions = async () => {
      try {
        const supabase = createClient()
        
        const { data, error } = await supabase
          .from('contributions')
          .select('*')
          .eq('couple_id', couple.id)
          .eq('payment_status', 'paid')
          .order('amount', { ascending: false })

        if (error) {
          console.error('Error fetching contributions:', error)
          return
        }

        const contributionData = data || []
        setContributions(contributionData as unknown as Contribution[])
        
        // Calculate total amount
        const total = contributionData.reduce((sum, contrib: any) => sum + (contrib.amount || 0), 0)
        setTotalAmount(total)
      } catch (error) {
        console.error('Error fetching contributions:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContributions()
  }, [couple?.id])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount)
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 1:
        return <Trophy className="h-5 w-5 text-gray-400" />
      case 2:
        return <Trophy className="h-5 w-5 text-amber-600" />
      default:
        return <Gift className="h-5 w-5 text-rose-500" />
    }
  }

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white'
      case 1:
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white'
      case 2:
        return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
      default:
        return 'bg-gradient-to-r from-rose-400 to-rose-500 text-white'
    }
  }

  if (!couple) return null

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando contribuições...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-rose-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="h-6 w-6 text-rose-500" />
            <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
              Vaquinha dos Noivos
            </h2>
            <Gift className="h-6 w-6 text-rose-500" />
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">
            Sua contribuição nos ajuda a realizar nossos sonhos!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contribution Info & QR Code */}
          <div className="space-y-6">
            {/* Total Amount */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <div className="text-center">
                <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-serif text-gray-900 mb-2">
                  Total Arrecadado
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(totalAmount)}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {contributions.length} contribuições
                </p>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="text-center">
                <h3 className="text-xl font-serif text-gray-900 mb-4">
                  Contribuir via PIX
                </h3>
                
                {!showQRCode ? (
                  <button
                    onClick={() => setShowQRCode(true)}
                    className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg mx-auto"
                  >
                    <QrCode className="h-5 w-5" />
                    Mostrar QR Code
                  </button>
                ) : (
                  <div className="space-y-4">
                    {/* Placeholder for QR Code */}
                    <div className="w-48 h-48 bg-white border-2 border-blue-200 rounded-lg mx-auto flex items-center justify-center">
                      <div className="text-center">
                        <QrCode className="h-16 w-16 text-blue-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">QR Code PIX</p>
                        <p className="text-xs text-gray-500">Em breve</p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-gray-600 mb-2">Chave PIX:</p>
                      <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                        {couple.bride_name.toLowerCase().replace(/\s+/g, '.')}@pix.com
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setShowQRCode(false)}
                      className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                    >
                      Ocultar QR Code
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ranking */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-100">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <h3 className="text-xl font-serif text-gray-900">
                  Ranking dos Contribuidores
                </h3>
              </div>
              
              {contributions.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {contributions.map((contribution, index) => (
                    <div
                      key={contribution.id}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        index < 3 ? 'bg-white shadow-sm' : 'bg-white/50'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadge(index)}`}>
                          <span className="text-xs font-bold">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {contribution.guest_name}
                        </p>
                        {contribution.message && (
                          <p className="text-xs text-gray-500 truncate">
                            "{contribution.message}"
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getRankIcon(index)}
                        <span className="text-sm font-bold text-gray-900">
                          {formatCurrency(contribution.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Gift className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Seja o primeiro a contribuir!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Cada contribuição é um gesto de carinho que guardamos no coração!
          </p>
          <div className="flex justify-center gap-2">
            <span className="text-2xl animate-pulse">💖</span>
            <span className="text-2xl animate-pulse" style={{ animationDelay: '0.3s' }}>🎁</span>
            <span className="text-2xl animate-pulse" style={{ animationDelay: '0.6s' }}>🙏</span>
          </div>
        </div>
      </div>
    </div>
  )
}