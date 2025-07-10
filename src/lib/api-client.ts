import { createClient } from '@/lib/supabase/client'
import type { Guest, GuestGroup, CreateGuestData, CreateGroupData, UpdateGuestData } from '@/types/guest'

class ApiClient {
  private async getAuthToken(): Promise<string | null> {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token || null
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<{ data?: T; error?: string }> {
    try {
      const token = await this.getAuthToken()
      
      const response = await fetch(`/api${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: data.error || 'Request failed' }
      }

      return { data }
    } catch (error) {
      console.error('API request failed:', error)
      return { error: 'Network error' }
    }
  }

  // Auth operations
  async ensureCoupleExists(): Promise<{ data?: any; error?: string }> {
    return this.request('/auth/complete-signup', { method: 'POST' })
  }

  // Guest operations
  async getGuests(): Promise<{ data?: Guest[]; error?: string }> {
    const result = await this.request<{ guests: Guest[] }>('/guests')
    if (result.error) return { error: result.error }
    return { data: result.data?.guests }
  }

  async createGuest(guestData: CreateGuestData): Promise<{ data?: Guest; error?: string }> {
    const result = await this.request<{ guest: Guest }>('/guests', {
      method: 'POST',
      body: JSON.stringify(guestData),
    })
    if (result.error) return { error: result.error }
    return { data: result.data?.guest }
  }

  async updateGuest(guestId: string, guestData: UpdateGuestData): Promise<{ data?: Guest; error?: string }> {
    const result = await this.request<{ guest: Guest }>(`/guests/${guestId}`, {
      method: 'PATCH',
      body: JSON.stringify(guestData),
    })
    if (result.error) return { error: result.error }
    return { data: result.data?.guest }
  }

  // Group operations
  async getGroups(): Promise<{ data?: GuestGroup[]; error?: string }> {
    const result = await this.request<{ groups: GuestGroup[] }>('/groups')
    if (result.error) return { error: result.error }
    return { data: result.data?.groups }
  }

  async createGroup(groupData: CreateGroupData): Promise<{ data?: GuestGroup; error?: string }> {
    const result = await this.request<{ group: GuestGroup }>('/groups', {
      method: 'POST',
      body: JSON.stringify(groupData),
    })
    if (result.error) return { error: result.error }
    return { data: result.data?.group }
  }
}

export const apiClient = new ApiClient() 