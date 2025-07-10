import { NextRequest, NextResponse } from 'next/server'
import { createGuest, getGuestsByCoupleId } from '@/lib/database/guests'
import { getCoupleByUserId } from '../../../../lib/database/couples'
import { createClient } from '@/lib/supabase/client'
import { z } from 'zod'

const companionSchema = z.object({
  name: z.string().min(1),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  ageGroup: z.enum(['adult', 'child', 'baby']),
  gender: z.enum(['male', 'female']).optional(),
  menuType: z.enum(['adult', 'child', 'none']).optional(),
})

const createGuestSchema = z.object({
  name: z.string().min(1),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  groupId: z.string().optional(),
  ageGroup: z.enum(['adult', 'child', 'baby']).optional(),
  gender: z.enum(['male', 'female']).optional(),
  menuType: z.enum(['adult', 'child', 'none']).optional(),
  companions: z.array(companionSchema).optional(),
})

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Buscar dados do casal
    const couple = await getCoupleByUserId(user.id)

    if (!couple) {
      return NextResponse.json({ error: 'Couple not found' }, { status: 404 })
    }

    // Buscar convidados
    const guests = await getGuestsByCoupleId(couple.id)
    
    return NextResponse.json({ guests })
  } catch (error) {
    console.error('Error fetching guests:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Buscar dados do casal
    const couple = await getCoupleByUserId(user.id)

    if (!couple) {
      return NextResponse.json({ error: 'Couple not found' }, { status: 404 })
    }

    // Parse e validação do body
    const body = await request.json()
    
    let guest
    try {
      const validatedData = createGuestSchema.parse(body)
      
      // Criar convidado
      guest = await createGuest(couple.id, {
        name: validatedData.name,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email || undefined,
        phone: validatedData.phone || undefined,
        groupId: validatedData.groupId || undefined,
        ageGroup: validatedData.ageGroup || 'adult',
        gender: validatedData.gender || 'male',
        menuType: validatedData.menuType || 'adult',
        companions: validatedData.companions || [],
      })
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        return NextResponse.json({ 
          error: 'Invalid data', 
          details: validationError.errors 
        }, { status: 400 })
      }
      throw validationError
    }

    return NextResponse.json({ guest })
  } catch (error) {
    console.error('Error creating guest:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 