// ===============================================
// EICASEI - COUPLES DATABASE OPERATIONS
// ===============================================

import { prisma, handlePrismaError } from './prisma'
import type { Couple, SubscriptionPlan } from '@prisma/client'

// Types
export interface CreateCoupleData {
  userId: string
  email: string
  brideName: string
  groomName: string
  weddingDate: Date
  city: string
  state: string
  country?: string
  signupRole: string
  ceremonyVenue?: string
  receptionVenue?: string
  welcomeMessage?: string
  story?: string
  themeColors?: Record<string, string>
  emailSecondary?: string
  bridePhone?: string
  groomPhone?: string
}

export interface CoupleWithDetails extends Couple {
  subscriptions: Array<{
    plan: SubscriptionPlan
    status: string
    currentPeriodEnd: Date | null
  }>
  _count: {
    guests: number
    guestGroups: number
    contributions: number
    gifts: number
  }
}

// ===============================================
// CREATE OPERATIONS
// ===============================================

/**
 * Criar um novo casal
 */
export async function createCouple(data: CreateCoupleData): Promise<Couple> {
  try {
    // Gerar slug baseado nos nomes
    const year = new Date(data.weddingDate).getFullYear()
    const slug = generateSlug(data.brideName, data.groomName, year)
    
    const couple = await prisma.couple.create({
      data: {
        userId: data.userId,
        email: data.email,
        emailSecondary: data.emailSecondary,
        brideName: data.brideName,
        groomName: data.groomName,
        city: data.city,
        state: data.state,
        country: data.country || "Brasil",
        bridePhone: data.bridePhone,
        groomPhone: data.groomPhone,
        wedding_date: data.weddingDate,
        weddingDateTime: data.weddingDate,
        signupRole: data.signupRole,
        ceremonyVenue: data.ceremonyVenue,
        receptionVenue: data.receptionVenue,
        welcomeMessage: data.welcomeMessage,
        story: data.story,
        slug: slug,
        themeColors: data.themeColors || {
          primary: "#d946ef",
          secondary: "#f97316", 
          accent: "#06b6d4",
          background: "#fafafa",
          text: "#171717"
        },
        termsAcceptedAt: new Date(),
      },
    })

    return couple
  } catch (error) {
    handlePrismaError(error)
  }
}

// ===============================================
// READ OPERATIONS  
// ===============================================

/**
 * Buscar casal por slug (para sites públicos)
 */
export async function getCoupleBySlug(slug: string): Promise<Couple | null> {
  try {
    const couple = await prisma.couple.findFirst({
      where: { 
        slug,
        isPublished: true // Apenas casais publicados
      },
      include: {
        guestGroups: {
          orderBy: { currentAmount: 'desc' }
        },
        scheduleEvents: {
          where: { isPublic: true },
          orderBy: { startTime: 'asc' }
        },
        photos: {
          where: { isFeatured: true },
          orderBy: { orderIndex: 'asc' },
          take: 6
        }
      }
    })

    return couple
  } catch (error) {
    handlePrismaError(error)
  }
}

/**
 * Buscar casal por user ID (dashboard)
 */
export async function getCoupleByUserId(userId: string): Promise<CoupleWithDetails | null> {
  try {
    const couple = await prisma.couple.findFirst({
      where: { userId },
      include: {
        subscriptions: {
          include: {
            plan: true
          },
          where: {
            status: 'active'
          },
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        _count: {
          select: {
            guests: true,
            guestGroups: true,
            contributions: {
              where: { status: 'paid' }
            },
            gifts: true
          }
        }
      }
    })

    return couple as CoupleWithDetails
  } catch (error) {
    handlePrismaError(error)
  }
}

/**
 * Buscar estatísticas do casal
 */
export async function getCoupleStats(coupleId: string) {
  try {
    // Usar a view criada no banco
    const stats = await prisma.$queryRaw<Array<{
      total_guests: number
      confirmed_guests: number
      pending_guests: number
      declined_guests: number
      total_contributions: number
      total_paid_contributions: number
      total_gifts: number
      reserved_gifts: number
    }>>`
      SELECT * FROM couple_stats WHERE id = ${coupleId}
    `

    return stats[0] || null
  } catch (error) {
    handlePrismaError(error)
  }
}

// ===============================================
// UPDATE OPERATIONS
// ===============================================

/**
 * Atualizar dados do casal
 */
export async function updateCouple(
  coupleId: string, 
  data: Partial<CreateCoupleData>
): Promise<Couple> {
  try {
    const couple = await prisma.couple.update({
      where: { id: coupleId },
      data: {
        email: data.email,
        emailSecondary: data.emailSecondary,
        brideName: data.brideName,
        groomName: data.groomName,
        city: data.city,
        state: data.state,
        country: data.country,
        bridePhone: data.bridePhone,
        groomPhone: data.groomPhone,
        wedding_date: data.weddingDate,
        weddingDateTime: data.weddingDate,
        signupRole: data.signupRole,
        ceremonyVenue: data.ceremonyVenue,
        receptionVenue: data.receptionVenue,
        welcomeMessage: data.welcomeMessage,
        story: data.story,
        themeColors: data.themeColors,
      },
    })

    return couple
  } catch (error) {
    handlePrismaError(error)
  }
}

/**
 * Publicar/despublicar site do casal
 */
export async function toggleCouplePublication(
  coupleId: string, 
  isPublished: boolean
): Promise<Couple> {
  try {
    const couple = await prisma.couple.update({
      where: { id: coupleId },
      data: { isPublished },
    })

    return couple
  } catch (error) {
    handlePrismaError(error)
  }
}

// ===============================================
// HELPER FUNCTIONS
// ===============================================

/**
 * Verificar se slug está disponível
 */
export async function isSlugAvailable(slug: string): Promise<boolean> {
  try {
    const existing = await prisma.couple.findUnique({
      where: { slug },
      select: { id: true }
    })

    return !existing
  } catch (error) {
    handlePrismaError(error)
  }
}

/**
 * Gerar slug personalizado
 */
export function generateSlug(brideName: string, groomName: string, year: number): string {
  const normalize = (str: string) => 
    str.toLowerCase()
       .normalize('NFD')
       .replace(/[\u0300-\u036f]/g, '') // Remove acentos
       .replace(/[^a-z0-9]/g, '-')       // Substitui não-alfanuméricos por -
       .replace(/-+/g, '-')              // Remove - duplicados
       .replace(/^-|-$/g, '')            // Remove - do início/fim

  const slug = `${normalize(groomName)}-${normalize(brideName)}-${year}`
  return slug
} 