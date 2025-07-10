export interface Couple {
  id: string
  user_id: string
  bride_name: string
  groom_name: string
  wedding_date: string
  wedding_time?: string
  wedding_location?: string
  wedding_address?: string
  invitation_message?: string
  couple_story?: string
  bride_photo?: string
  groom_photo?: string
  cover_photo?: string
  slug: string
  is_active: boolean
  theme_color?: string
  created_at: string
  updated_at: string
  subscription_plan_id?: string | null
}

export interface Groomsman {
  id: string
  couple_id: string
  name: string
  role: 'groomsman' | 'bridesmaid' | 'best_man' | 'maid_of_honor'
  photo?: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface VenuePhoto {
  id: string
  couple_id: string
  url: string
  caption?: string
  order: number
  created_at: string
  updated_at: string
}

export interface Contribution {
  id: string
  couple_id: string
  guest_name: string
  guest_email?: string
  guest_phone?: string
  amount: number
  message?: string
  payment_method: 'pix' | 'credit_card' | 'cash'
  payment_status: 'pending' | 'paid' | 'cancelled'
  payment_reference?: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  couple_id: string
  guest_name: string
  guest_email?: string
  message: string
  is_approved: boolean
  created_at: string
  updated_at: string
}

export interface GuestRSVP {
  id: string
  couple_id: string
  guest_name: string
  guest_email?: string
  guest_phone?: string
  will_attend: boolean
  plus_one: boolean
  plus_one_name?: string
  dietary_restrictions?: string
  message?: string
  created_at: string
  updated_at: string
}