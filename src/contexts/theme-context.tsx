'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { WeddingTheme, ThemeContextType, DEFAULT_THEMES } from '@/types/theme'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  coupleId?: string
}

export function ThemeProvider({ children, coupleId }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<WeddingTheme>(DEFAULT_THEMES[0])
  const [availableThemes] = useState<WeddingTheme[]>(DEFAULT_THEMES)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar tema salvo do localStorage ou database
  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        setIsLoading(true)
        
        // Primeiro tenta localStorage para cache rápido
        const savedThemeId = localStorage.getItem(`theme_${coupleId}`)
        
        if (savedThemeId) {
          const savedTheme = DEFAULT_THEMES.find(theme => theme.id === savedThemeId)
          if (savedTheme) {
            setCurrentTheme(savedTheme)
          }
        }
        
        // Se houver coupleId, busca do database
        if (coupleId) {
          try {
            const response = await fetch(`/api/couples/${coupleId}/theme`)
            if (response.ok) {
              const { themeId } = await response.json()
              const dbTheme = DEFAULT_THEMES.find(theme => theme.id === themeId)
              if (dbTheme) {
                setCurrentTheme(dbTheme)
                localStorage.setItem(`theme_${coupleId}`, themeId)
              }
            }
          } catch (error) {
            console.warn('Erro ao carregar tema do database:', error)
          }
        }
      } catch (error) {
        console.error('Erro ao carregar tema:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSavedTheme()
  }, [coupleId])

  const setTheme = async (themeId: string) => {
    const newTheme = DEFAULT_THEMES.find(theme => theme.id === themeId)
    if (!newTheme) return

    // Atualiza tema imediatamente para UX responsiva
    setCurrentTheme(newTheme)
    
    // Salva no localStorage para cache
    if (coupleId) {
      localStorage.setItem(`theme_${coupleId}`, themeId)
    }

    // Salva no database em background
    if (coupleId) {
      try {
        await fetch(`/api/couples/${coupleId}/theme`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ themeId }),
        })
      } catch (error) {
        console.error('Erro ao salvar tema no database:', error)
      }
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