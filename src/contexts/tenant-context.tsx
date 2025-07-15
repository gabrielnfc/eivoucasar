'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Couple } from '@/types'

interface TenantContextType {
  couple: Couple | null
  isLoading: boolean
  error: string | null
  refreshCouple: () => Promise<void>
}

const TenantContext = createContext<TenantContextType | undefined>(undefined)

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [couple, setCouple] = useState<Couple | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const slug = params?.slug as string

  const fetchCouple = async () => {
    if (!slug) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      
      const supabase = createClient()
      
      const { data: coupleData, error: coupleError } = await supabase
        .from('couples')
        .select(`
          id,
          slug,
          bride_name,
          groom_name,
          wedding_date,
          wedding_time,
          wedding_location,
          wedding_address,
          invitation_message,
          couple_story,
          bride_photo,
          groom_photo,
          cover_photo_url,
          hero_background_image,
          couple_photo,
          theme_colors,
          is_active,
          is_published,
          created_at,
          updated_at
        `)
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

      if (coupleError) {
        throw coupleError
      }

      if (!coupleData) {
        throw new Error('Casal não encontrado')
      }

      setCouple(coupleData as unknown as Couple)
    } catch (err) {
      console.error('Error fetching couple:', err)
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCouple()
  }, [slug])

  const refreshCouple = async () => {
    await fetchCouple()
  }

  const value = {
    couple,
    isLoading,
    error,
    refreshCouple
  }

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider')
  }
  return context
}