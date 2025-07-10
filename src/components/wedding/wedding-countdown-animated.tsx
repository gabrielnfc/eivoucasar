'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CountdownProps {
  targetDate: string
  className?: string
}

interface TimeUnit {
  value: number
  label: string
  prevValue?: number
}

export function WeddingCountdownAnimated({ targetDate, className = '' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([
    { value: 0, label: 'DIAS' },
    { value: 0, label: 'HORAS' },
    { value: 0, label: 'MINUTOS' },
    { value: 0, label: 'SEGUNDOS' }
  ])
  const [isLoaded, setIsLoaded] = useState(false)

  const calculateTimeLeft = () => {
    const now = new Date().getTime()
    const target = new Date(targetDate).getTime()
    const difference = target - now

    if (difference > 0) {
      // Cálculo direto no padrão brasileiro: dias, horas, minutos, segundos
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      return [
        { value: days, label: 'DIAS' },
        { value: hours, label: 'HORAS' },
        { value: minutes, label: 'MINUTOS' },
        { value: seconds, label: 'SEGUNDOS' }
      ]
    }

    return [
      { value: 0, label: 'DIAS' },
      { value: 0, label: 'HORAS' },
      { value: 0, label: 'MINUTOS' },
      { value: 0, label: 'SEGUNDOS' }
    ]
  }

  useEffect(() => {
    setIsLoaded(true)
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const newTime = calculateTimeLeft()
        
        // Adicionar valores anteriores para animação
        return newTime.map((unit, index) => ({
          ...unit,
          prevValue: prevTime[index]?.value
        }))
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const isWeddingDay = () => {
    const now = new Date()
    const wedding = new Date(targetDate)
    return now.toDateString() === wedding.toDateString()
  }

  const isPastWedding = () => {
    const now = new Date().getTime()
    const target = new Date(targetDate).getTime()
    return now > target
  }

  if (!isLoaded) {
    return (
      <div className={`flex justify-center items-center py-12 ${className}`}>
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="flex gap-4 justify-center">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg w-20 h-24"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isWeddingDay()) {
    return (
      <motion.div 
        className={`text-center py-12 ${className}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-6xl md:text-8xl mb-4"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          🎉
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-bold text-rose-600 mb-4 font-serif">
          Hoje é o grande dia!
        </h2>
        <p className="text-xl text-gray-600">
          O casamento está acontecendo agora! 💕
        </p>
      </motion.div>
    )
  }

  if (isPastWedding()) {
    return (
      <motion.div 
        className={`text-center py-12 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-5xl mb-4">💍</div>
        <h2 className="text-3xl md:text-5xl font-bold text-rose-600 mb-4 font-serif">
          Felizes para sempre!
        </h2>
        <p className="text-xl text-gray-600">
          O casamento já aconteceu e foi maravilhoso! 
        </p>
      </motion.div>
    )
  }

  return (
    <div className={`text-center py-12 ${className}`}>
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 font-serif"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Faltam poucos dias para o grande momento!
      </motion.h2>
      
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
        {timeLeft.map((unit, index) => (
          <motion.div
            key={unit.label}
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1 
            }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 min-w-[100px] md:min-w-[120px]">
              {/* Número Animado */}
              <div className="relative h-12 md:h-16 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={unit.value}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ y: unit.prevValue !== undefined ? 50 : 0, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 15 
                    }}
                  >
                    <span className="text-3xl md:text-4xl font-bold text-rose-600">
                      {unit.value.toString().padStart(2, '0')}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Label */}
              <motion.div 
                className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {unit.label}
              </motion.div>
            </div>
            
            {/* Efeito de Pulso no Segundo */}
            {unit.label === 'SEGUNDOS' && (
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-rose-300"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Decoração */}
      <motion.div 
        className="mt-8 flex justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {['💕', '✨', '💕'].map((emoji, index) => (
          <motion.span
            key={index}
            className="text-2xl"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 2,
              delay: index * 0.3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
      
      {/* Mensagem motivacional */}
      <motion.p 
        className="text-gray-600 mt-6 text-lg md:text-xl max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Cada segundo nos aproxima do nosso "Sim, aceito!" 💍
      </motion.p>
    </div>
  )
}

export default WeddingCountdownAnimated 