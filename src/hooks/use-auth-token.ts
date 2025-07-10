import { createClient } from '@/lib/supabase/client'

export function useAuthToken() {
  const getToken = async () => {
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      return session?.access_token || null
    } catch (error) {
      console.error('Error getting auth token:', error)
      return null
    }
  }

  return { getToken }
}