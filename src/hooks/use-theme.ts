import { useState, useEffect } from 'react'
import type { Couple } from '@/types'

interface UseThemeOptions {
  coupleData?: Couple | null  // Dados já carregados do casal
}

/**
 * 🌟 HOOK OTIMIZADO: useTheme
 * 
 * NOVA ARQUITETURA (Zero chamadas API independentes):
 * - useCouple: ÚNICA fonte de dados do casal
 * - useTheme: Apenas extrai tema dos dados fornecidos
 * - ThemeProvider: Conecta useCouple → useTheme
 * 
 * FLUXO:
 * 1. useCouple faz 1 chamada API
 * 2. ThemeProvider passa dados para useTheme
 * 3. useTheme extrai tema dos dados
 * 4. Zero race conditions, zero duplicação
 */
export function useTheme(userId: string | undefined, options: UseThemeOptions = {}) {
  const [themeId, setThemeId] = useState<string>('romantic-rose')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 🌟 NOVA ABORDAGEM: Apenas reagir aos dados fornecidos, NUNCA fazer chamadas próprias
  useEffect(() => {
    if (options.coupleData) {
      console.log('🎨 useTheme: Using provided couple data instead of API call')
      const themeColors = options.coupleData.theme_colors as any
      const currentTheme = themeColors?.themeId || 'romantic-rose'
      setThemeId(currentTheme)
      setIsLoading(false)
      setError(null)
      return
    }

    // Se não há dados do casal, aguardar que sejam fornecidos
    // Mas só indicar loading se temos userId (significa que deveria ter dados)
    if (userId) {
      console.log('🎨 useTheme: Waiting for couple data to be provided (no independent API calls)')
      setIsLoading(true) // Indicar que estamos aguardando dados
      setError(null)
    } else {
      console.log('🎨 useTheme: No userId provided, using default theme')
      setIsLoading(false)
      setError(null)
    }
    
    // Manter tema padrão até dados chegarem
    setThemeId('romantic-rose')
    
  }, [options.coupleData, userId])

  // Função para atualizar tema (mantida para compatibilidade)
  const updateTheme = async (newThemeId: string) => {
    if (!userId) {
      console.error('🎨 useTheme: Cannot update theme without userId')
      return { success: false, error: 'User ID é obrigatório' }
    }

    console.log('🎨 useTheme: Updating theme to:', newThemeId)
    setIsLoading(true)
    setError(null)

    try {
      // Usar coupleService apenas para UPDATE, nunca para fetch
      const { coupleService } = await import('@/lib/database/couple-service')
      const result = await coupleService.updateTheme(userId, newThemeId)
      
      if (result.success) {
        setThemeId(newThemeId)
        console.log('🎨 useTheme: Theme updated successfully')
      } else {
        setError(result.error || 'Erro ao atualizar tema')
        console.error('🎨 useTheme: Failed to update theme:', result.error)
      }

      return result
    } catch (err) {
      console.error('🎨 useTheme: Error updating theme:', err)
      const errorMessage = 'Erro ao atualizar tema'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  console.log('🎨 useTheme: Current state:', { 
    themeId, 
    isLoading, 
    error, 
    hasCoupleData: !!options.coupleData,
    userId 
  })

  return {
    themeId,
    isLoading,
    error,
    updateTheme
  }
} 