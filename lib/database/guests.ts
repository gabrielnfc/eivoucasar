// ===============================================
// EICASEI - GUESTS & GROUPS DATABASE OPERATIONS
// ===============================================

import { prisma, handlePrismaError } from './prisma'
import type { Guest, GuestGroup, Contribution } from '@prisma/client'

// Types
export interface CreateGuestData {
  coupleId: string
  groupId?: string
  name: string
  email?: string
  phone?: string
  companionsCount?: number
  dietaryRestrictions?: string
  notes?: string
}

export interface CreateGuestGroupData {
  coupleId: string
  name: string
  color?: string
  targetAmount?: number
  emoji?: string
}

export interface GuestWithGroup extends Guest {
  group: GuestGroup | null
  contributions: Contribution[]
}

export interface GuestGroupWithStats extends GuestGroup {
  guests: Guest[]
  _count: {
    guests: number
    contributions: number
  }
}

// ===============================================
// GUEST OPERATIONS
// ===============================================

/**
 * Criar novo convidado
 */
export async function createGuest(data: CreateGuestData): Promise<Guest> {
  try {
    const guest = await prisma.guest.create({
      data: {
        coupleId: data.coupleId,
        groupId: data.groupId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        companionsCount: data.companionsCount || 0,
        dietaryRestrictions: data.dietaryRestrictions,
        notes: data.notes,
      },
    })

    return guest
  } catch (error) {
    handlePrismaError(error)
  }
}

/**
 * Buscar convidados do casal
 */
export async function getGuestsByCouple(coupleId: string): Promise<GuestWithGroup[]> {
  try {
    const guests = await prisma.guest.findMany({
      where: { coupleId },
      include: {
        group: true,
        contributions: {
          where: { status: 'paid' },
          orderBy: { paidAt: 'desc' }
        }
      },
      orderBy: [
        { totalContributed: 'desc' },
        { name: 'asc' }
      ]
    })

    return guests
  } catch (error) {
    handlePrismaError(error)
  }
}

/**
 * Atualizar RSVP do convidado
 */
export async function updateGuestRSVP(
  guestId: string,
  rsvpStatus: 'confirmed' | 'declined',
  companionsCount?: number
): Promise<Guest> {
  try {
    const guest = await prisma.guest.update({
      where: { id: guestId },
      data: {
        rsvpStatus,
        companionsCount,
        respondedAt: new Date(),
      },
    })

    return guest
  } catch (error) {
    handlePrismaError(error)
  }
}

/**
 * Buscar ranking de convidados por contribuição
 */
export async function getGuestContributionRanking(coupleId: string) {
  try {
    const ranking = await prisma.$queryRaw<Array<{
      id: string
      name: string
      total_contributed: number
      group_name: string | null
      group_color: string | null
      ranking_position: number
    }>>`
      SELECT * FROM guest_contribution_ranking 
      WHERE couple_id = ${coupleId}
      ORDER BY ranking_position
      LIMIT 10
    `

    return ranking
  } catch (error) {
    handlePrismaError(error)
  }
}

// ===============================================
// GUEST GROUP OPERATIONS
// ===============================================

/**
 * Criar novo grupo de convidados
 */
export async function createGuestGroup(data: CreateGuestGroupData): Promise<GuestGroup> {
  try {
    const group = await prisma.guestGroup.create({
      data: {
        coupleId: data.coupleId,
        name: data.name,
        color: data.color || '#3b82f6',
        targetAmount: data.targetAmount || 0,
        emoji: data.emoji || '👥',
      },
    })

    return group
  } catch (error) {
    handlePrismaError(error)
  }
}

/**
 * Buscar grupos do casal com estatísticas
 */
export async function getGuestGroupsByCouple(coupleId: string): Promise<GuestGroupWithStats[]> {
  try {
    const groups = await prisma.guestGroup.findMany({
      where: { coupleId },
      include: {
        guests: {
          orderBy: { totalContributed: 'desc' },
          take: 5 // Top 5 contribuidores do grupo
        },
        _count: {
          select: {
            guests: true,
            contributions: {
              where: { status: 'paid' }
            }
          }
        }
      },
      orderBy: { currentAmount: 'desc' }
    })

    return groups
  } catch (error) {
    handlePrismaError(error)
  }
}

/**
 * Buscar ranking de grupos por contribuição
 */
export async function getGroupContributionRanking(coupleId: string) {
  try {
    const ranking = await prisma.$queryRaw<Array<{
      id: string
      name: string
      color: string
      emoji: string
      current_amount: number
      target_amount: number
      member_count: number
      progress_percentage: number
      ranking_position: number
    }>>`
      SELECT * FROM group_contribution_ranking 
      WHERE couple_id = ${coupleId}
      ORDER BY ranking_position
    `

    return ranking
  } catch (error) {
    handlePrismaError(error)
  }
}

/**
 * Atualizar meta do grupo
 */
export async function updateGroupTarget(
  groupId: string,
  targetAmount: number
): Promise<GuestGroup> {
  try {
    const group = await prisma.guestGroup.update({
      where: { id: groupId },
      data: { targetAmount },
    })

    return group
  } catch (error) {
    handlePrismaError(error)
  }
}

// ===============================================
// HELPER FUNCTIONS
// ===============================================

/**
 * Mover convidado para outro grupo
 */
export async function moveGuestToGroup(
  guestId: string,
  newGroupId: string | null
): Promise<Guest> {
  try {
    const guest = await prisma.guest.update({
      where: { id: guestId },
      data: { groupId: newGroupId },
    })

    return guest
  } catch (error) {
    handlePrismaError(error)
  }
}

/**
 * Buscar convidado por email (para RSVP público)
 */
export async function getGuestByEmail(
  coupleId: string,
  email: string
): Promise<Guest | null> {
  try {
    const guest = await prisma.guest.findFirst({
      where: {
        coupleId,
        email: {
          equals: email,
          mode: 'insensitive'
        }
      },
      include: {
        group: true
      }
    })

    return guest
  } catch (error) {
    handlePrismaError(error)
  }
} 