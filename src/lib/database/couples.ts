import { prisma } from './prisma'

export interface CoupleWithDetails {
  id: string
  userId: string
  email: string
  brideName: string
  groomName: string
  // outros campos conforme necessário
}

/**
 * Buscar casal por user ID (dashboard)
 */
export async function getCoupleByUserId(userId: string): Promise<CoupleWithDetails | null> {
  try {
    const couple = await prisma.couple.findFirst({
      where: { userId },
    })

    return couple as CoupleWithDetails
  } catch (error) {
    console.error('Error fetching couple by user ID:', error)
    throw new Error('Failed to fetch couple')
  }
} 