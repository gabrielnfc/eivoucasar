'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Check, ChevronDown } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'
import { WeddingTheme } from '@/types/theme'

interface ThemeSelectorProps {
  className?: string
}

export default function ThemeSelector({ className = '' }: ThemeSelectorProps) {
  const { currentTheme, availableThemes, setTheme, isLoading } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId)
    setIsOpen(false)
  }

  const getThemePreview = (theme: WeddingTheme) => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <div 
            className="w-3 h-3 rounded-full border border-gray-300 shadow-sm"
            style={{ backgroundColor: theme.colors.primary }}
          />
          <div 
            className="w-3 h-3 rounded-full border border-gray-300 shadow-sm"
            style={{ backgroundColor: theme.colors.secondary }}
          />
          <div 
            className="w-3 h-3 rounded-full border border-gray-300 shadow-sm"
            style={{ backgroundColor: theme.colors.accent }}
          />
        </div>
        <span className="text-lg">{theme.preview}</span>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 px-3 py-2 text-sm text-gray-500 ${className}`}>
        <div className="w-4 h-4 border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin" />
        <span className="hidden sm:inline">Carregando...</span>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Botão do Theme Selector */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
      >
        <Palette className="w-4 h-4 text-purple-600" />
        <span className="hidden sm:inline">Temas</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 z-50 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-600" />
                <h3 className="text-sm font-semibold text-gray-900">Escolha um Tema</h3>
              </div>
              <p className="text-xs text-gray-500 mt-1">Personalize a aparência do seu site</p>
            </div>

            {/* Themes Grid - Sem scroll, layout fixo */}
            <div className="p-4">
              <div className="grid grid-cols-1 gap-2">
                {availableThemes.map((theme, index) => (
                  <motion.button
                    key={theme.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleThemeSelect(theme.id)}
                    className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
                      currentTheme.id === theme.id
                        ? 'border-purple-400 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Theme Preview */}
                        {getThemePreview(theme)}
                        
                        {/* Theme Info */}
                        <div className="text-left">
                          <div className="font-medium text-gray-900 text-sm">
                            {theme.displayName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {theme.description}
                          </div>
                        </div>
                      </div>

                      {/* Selected Check */}
                      <div className="flex items-center">
                        {currentTheme.id === theme.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center justify-center w-5 h-5 bg-purple-500 rounded-full"
                          >
                            <Check className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Tema ativo: <span className="font-medium">{currentTheme.displayName}</span></span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 