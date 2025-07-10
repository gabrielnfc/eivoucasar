import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/client'

export async function getAuthUser(request: NextRequest) {
  try {
    // Extract the session token from cookies
    const accessToken = request.cookies.get('sb-access-token')?.value
    const refreshToken = request.cookies.get('sb-refresh-token')?.value
    
    if (!accessToken && !refreshToken) {
      return null
    }

    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }
    
    return user
  } catch (error) {
    console.error('Error getting auth user:', error)
    return null
  }
}