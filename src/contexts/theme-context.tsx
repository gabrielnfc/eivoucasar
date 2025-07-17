'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { WeddingTheme, DEFAULT_THEMES } from '@/types/theme'
import { useTheme as useThemeHook } from '@/hooks/use-theme'
import type { Couple } from '@/types'

interface ThemeContextType {
  currentTheme: WeddingTheme
  availableThemes: WeddingTheme[]
  setTheme: (themeId: string) => Promise<void>
  isLoading: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  coupleId?: string
  userId?: string
  coupleData?: Couple | null  // Dados já carregados
}

export function ThemeProvider({ children, coupleId, userId, coupleData }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<WeddingTheme>(DEFAULT_THEMES[0])
  const [availableThemes] = useState<WeddingTheme[]>(DEFAULT_THEMES)
  
  // Usar userId se disponível, senão fallback para coupleId (modo compatibilidade)
  const effectiveUserId = userId || coupleId
  
  console.log('🎨 ThemeProvider:', { 
    userId, 
    coupleId, 
    effectiveUserId, 
    hasCoupleData: !!coupleData 
  })
  
  // Passar dados do casal para evitar chamada desnecessária
  const { themeId, isLoading, updateTheme } = useThemeHook(effectiveUserId, { 
    coupleData 
  })

  // Atualizar tema atual quando themeId muda
  useEffect(() => {
    if (themeId) {
      const theme = DEFAULT_THEMES.find(t => t.id === themeId)
      if (theme) {
        setCurrentTheme(theme)
        // Cache local
        if (coupleId) {
          localStorage.setItem(`theme_${coupleId}`, themeId)
        }
      }
    }
  }, [themeId, coupleId])

  const setTheme = async (newThemeId: string) => {
    const newTheme = DEFAULT_THEMES.find(theme => theme.id === newThemeId)
    if (!newTheme) return

    try {
      // Atualizar estado local imediatamente para UX responsiva
      setCurrentTheme(newTheme)
      
      // Salvar no localStorage
      if (coupleId) {
        localStorage.setItem(`theme_${coupleId}`, newThemeId)
      }

      // Salvar no servidor usando o hook
      if (updateTheme) {
        const result = await updateTheme(newThemeId)
        if (!result.success) {
          console.warn('Erro ao salvar tema no servidor:', result.error)
        }
      }
    } catch (error) {
      console.error('Erro ao alterar tema:', error)
    }
  }

  // Aplicar CSS custom properties baseado no tema
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      const theme = currentTheme
      
      // Aplicar cores
      root.style.setProperty('--theme-primary', theme.colors.primary)
      root.style.setProperty('--theme-secondary', theme.colors.secondary)
      root.style.setProperty('--theme-accent', theme.colors.accent)
      root.style.setProperty('--theme-background', theme.colors.background)
      root.style.setProperty('--theme-surface', theme.colors.surface)
      root.style.setProperty('--theme-text', theme.colors.text)
      root.style.setProperty('--theme-text-secondary', theme.colors.textSecondary)
      root.style.setProperty('--theme-border', theme.colors.border)
      
      // Aplicar fontes
      root.style.setProperty('--theme-font-primary', theme.fonts.primary)
      root.style.setProperty('--theme-font-secondary', theme.fonts.secondary)
      root.style.setProperty('--theme-font-accent', theme.fonts.accent)
      
      // Aplicar styling
      root.style.setProperty('--theme-border-radius', theme.styling.borderRadius)
      root.style.setProperty('--theme-shadow', theme.styling.shadow)
      root.style.setProperty('--theme-spacing', theme.styling.spacing)
      root.style.setProperty('--theme-button-style', theme.styling.buttonStyle)
      
      // Aplicar animações
      root.style.setProperty('--theme-animation-speed', `${theme.animations.speed}s`)
      root.style.setProperty('--theme-animation-easing', theme.animations.easing)
    }
  }, [currentTheme])

  const value: ThemeContextType = {
    currentTheme,
    availableThemes,
    setTheme,
    isLoading,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 