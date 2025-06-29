export interface Guest {
  id: string
  name: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  coupleId: string
  groupId?: string
  ageGroup?: 'adult' | 'child' | 'baby'
  gender?: 'male' | 'female'
  menuType?: 'adult' | 'child' | 'none'
  companions?: CompanionData[]
  totalContributed: number
  rsvpStatus: 'pending' | 'confirmed' | 'declined'
  createdAt: string
  updatedAt: string
  group?: GuestGroup
}

export interface GuestGroup {
  id: string
  name: string
  description?: string
  color: string
  coupleId: string
  targetAmount: number
  currentAmount: number
  memberCount: number
  createdAt: string
  updatedAt: string
  guests?: Guest[]
}

export interface CreateGuestData {
  name: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  groupId?: string
  ageGroup?: 'adult' | 'child' | 'baby'
  gender?: 'male' | 'female'
  menuType?: 'adult' | 'child' | 'none'
  companions?: CompanionData[]
}

export interface CompanionData {
  name: string
  firstName?: string
  lastName?: string
  ageGroup: 'adult' | 'child' | 'baby'
  gender?: 'male' | 'female'
  menuType?: 'adult' | 'child' | 'none'
}

export interface UpdateGuestData {
  name?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  groupId?: string
  ageGroup?: 'adult' | 'child' | 'baby'
  gender?: 'male' | 'female'
  menuType?: 'adult' | 'child' | 'none'
  companions?: CompanionData[]
  rsvpStatus?: 'pending' | 'confirmed' | 'declined'
}

export interface CreateGroupData {
  name: string
  description?: string
  color: string
  targetAmount?: number
}

export interface UpdateGroupData {
  name?: string
  description?: string
  color?: string
  targetAmount?: number
}

// Cores predefinidas para grupos
export const GROUP_COLORS = [
  { name: 'Rosa', value: '#f43f5e', bg: '#fdf2f8' },
  { name: 'Azul', value: '#3b82f6', bg: '#eff6ff' },
  { name: 'Verde', value: '#10b981', bg: '#ecfdf5' },
  { name: 'Roxo', value: '#8b5cf6', bg: '#f5f3ff' },
  { name: 'Laranja', value: '#f97316', bg: '#fff7ed' },
  { name: 'Amarelo', value: '#eab308', bg: '#fefce8' },
] as const

// Grupos padrão para novos casais
export const DEFAULT_GROUPS = [
  {
    name: 'Família da Noiva',
    description: 'Familiares da noiva',
    color: '#f43f5e',
    targetAmount: 5000,
  },
  {
    name: 'Família do Noivo', 
    description: 'Familiares do noivo',
    color: '#3b82f6',
    targetAmount: 5000,
  },
  {
    name: 'Amigos',
    description: 'Amigos do casal',
    color: '#10b981', 
    targetAmount: 3000,
  },
] as const 