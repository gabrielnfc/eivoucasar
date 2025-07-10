'use client'

import { useState, useEffect } from 'react'
import { useTenant } from '@/contexts/tenant-context'
import { Heart } from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function WeddingCountdown() {
  const { couple } = useTenant()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isWeddingDay, setIsWeddingDay] = useState(false)

  useEffect(() => {
    if (!couple?.wedding_date) return

    const calculateTimeLeft = () => {
      const weddingDate = new Date(couple.wedding_date)
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
        setIsWeddingDay(false)
      } else {
        setIsWeddingDay(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [couple?.wedding_date])

  if (!couple) return null

  if (isWeddingDay) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-100">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="h-8 w-8 text-rose-500 animate-pulse" fill="currentColor" />
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900">
              É hoje!
            </h2>
            <Heart className="h-8 w-8 text-rose-500 animate-pulse" fill="currentColor" />
          </div>
          <p className="text-xl text-gray-600 mb-8">
            O grande dia chegou! 🎉
          </p>
          <div className="flex items-center justify-center gap-2 text-lg text-rose-600">
            <span>💒</span>
            <span className="font-medium">
              {couple.bride_name} & {couple.groom_name}
            </span>
            <span>💒</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-100">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Heart className="h-6 w-6 text-rose-500" fill="currentColor" />
          <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
            Contagem Regressiva
          </h2>
          <Heart className="h-6 w-6 text-rose-500" fill="currentColor" />
        </div>
        
        <p className="text-gray-600 mb-8 text-lg">
          Faltam apenas...
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="bg-gradient-to-b from-rose-50 to-rose-100 rounded-xl p-4 md:p-6">
            <div className="text-3xl md:text-4xl font-bold text-rose-600 mb-2">
              {timeLeft.days}
            </div>
            <div className="text-sm md:text-base text-gray-600 font-medium">
              {timeLeft.days === 1 ? 'Dia' : 'Dias'}
            </div>
          </div>
          
          <div className="bg-gradient-to-b from-pink-50 to-pink-100 rounded-xl p-4 md:p-6">
            <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
              {timeLeft.hours}
            </div>
            <div className="text-sm md:text-base text-gray-600 font-medium">
              {timeLeft.hours === 1 ? 'Hora' : 'Horas'}
            </div>
          </div>
          
          <div className="bg-gradient-to-b from-purple-50 to-purple-100 rounded-xl p-4 md:p-6">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
              {timeLeft.minutes}
            </div>
            <div className="text-sm md:text-base text-gray-600 font-medium">
              {timeLeft.minutes === 1 ? 'Minuto' : 'Minutos'}
            </div>
          </div>
          
          <div className="bg-gradient-to-b from-indigo-50 to-indigo-100 rounded-xl p-4 md:p-6">
            <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
              {timeLeft.seconds}
            </div>
            <div className="text-sm md:text-base text-gray-600 font-medium">
              {timeLeft.seconds === 1 ? 'Segundo' : 'Segundos'}
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Até que {couple.bride_name} e {couple.groom_name} se tornem marido e mulher!
          </p>
          <div className="flex justify-center gap-2">
            <span className="text-2xl animate-bounce">💕</span>
            <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>💖</span>
            <span className="text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>💕</span>
          </div>
        </div>
      </div>
    </div>
  )
}