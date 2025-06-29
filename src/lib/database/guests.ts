import { prisma } from './prisma'
import type { Guest, GuestGroup, CreateGuestData, UpdateGuestData, CreateGroupData, UpdateGroupData } from '@/types/guest'

/**
 * GUEST OPERATIONS
 */

export async function getGuestsByCoupleId(coupleId: string) {
  try {
    const guests = await prisma.guest.findMany({
      where: { coupleId },
      include: {
        group: true,
      },
      orderBy: [
        { group: { name: 'asc' } },
        { name: 'asc' }
      ],
    })
    
    return guests
  } catch (error) {
    console.error('Error fetching guests:', error)
    throw new Error('Failed to fetch guests')
  }
}

export async function createGuest(coupleId: string, data: CreateGuestData) {
  try {
    const guest = await prisma.guest.create({
      data: {
        name: data.name,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        groupId: data.groupId,
        ageGroup: data.ageGroup,
        gender: data.gender,
        menuType: data.menuType,
        companions: data.companions ? data.companions as any : undefined,
        coupleId,
        totalContributed: 0,
        rsvpStatus: 'pending',
      },
      include: {
        group: true,
      },
    })
    
    return guest
  } catch (error) {
    console.error('Error creating guest:', error)
    throw new Error('Failed to create guest')
  }
}

export async function updateGuest(guestId: string, data: UpdateGuestData) {
  try {
    const updateData: any = { ...data }
    
    // Convert companions to proper format if provided
    if (data.companions !== undefined) {
      updateData.companions = data.companions ? data.companions as any : undefined
    }
    
    const guest = await prisma.guest.update({
      where: { id: guestId },
      data: updateData,
      include: {
        group: true,
      },
    })
    
    return guest
  } catch (error) {
    console.error('Error updating guest:', error)
    throw new Error('Failed to update guest')
  }
}

export async function deleteGuest(guestId: string): Promise<void> {
  try {
    await prisma.guest.delete({
      where: { id: guestId },
    })
  } catch (error) {
    console.error('Error deleting guest:', error)
    throw new Error('Failed to delete guest')
  }
}

/**
 * GROUP OPERATIONS
 */

export async function getGroupsByCoupleId(coupleId: string) {
  try {
    const groups = await prisma.guestGroup.findMany({
      where: { coupleId },
      include: {
        guests: {
          orderBy: { name: 'asc' }
        },
      },
      orderBy: { createdAt: 'asc' },
    })
    
    return groups
  } catch (error) {
    console.error('Error fetching groups:', error)
    throw new Error('Failed to fetch groups')
  }
}

export async function createGroup(coupleId: string, data: CreateGroupData) {
  try {
    const group = await prisma.guestGroup.create({
      data: {
        ...data,
        coupleId,
        currentAmount: 0,
        memberCount: 0,
        targetAmount: data.targetAmount || 0,
      },
      include: {
        guests: true,
      },
    })
    
    return group
  } catch (error) {
    console.error('Error creating group:', error)
    throw new Error('Failed to create group')
  }
}

export async function updateGroup(groupId: string, data: UpdateGroupData) {
  try {
    const group = await prisma.guestGroup.update({
      where: { id: groupId },
      data,
      include: {
        guests: true,
      },
    })
    
    return group
  } catch (error) {
    console.error('Error updating group:', error)
    throw new Error('Failed to update group')
  }
}

export async function deleteGroup(groupId: string): Promise<void> {
  try {
    // First, set all guests in this group to have no group
    await prisma.guest.updateMany({
      where: { groupId },
      data: { groupId: null },
    })
    
    // Then delete the group
    await prisma.guestGroup.delete({
      where: { id: groupId },
    })
  } catch (error) {
    console.error('Error deleting group:', error)
    throw new Error('Failed to delete group')
  }
}

/**
 * UTILITY FUNCTIONS
 */

export async function getGuestStats(coupleId: string) {
  try {
    const totalGuests = await prisma.guest.count({
      where: { coupleId },
    })
    
    const confirmedGuests = await prisma.guest.count({
      where: { 
        coupleId,
        rsvpStatus: 'confirmed',
      },
    })
    
    const totalContributed = await prisma.guest.aggregate({
      where: { coupleId },
      _sum: {
        totalContributed: true,
      },
    })
    
    const groupStats = await prisma.guestGroup.findMany({
      where: { coupleId },
      select: {
        id: true,
        name: true,
        color: true,
        memberCount: true,
        currentAmount: true,
        targetAmount: true,
      },
      orderBy: { currentAmount: 'desc' },
    })
    
    return {
      totalGuests,
      confirmedGuests,
      totalContributed: totalContributed._sum.totalContributed || 0,
      groupStats,
    }
  } catch (error) {
    console.error('Error fetching guest stats:', error)
    throw new Error('Failed to fetch guest stats')
  }
} 