import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getCoupleByUserId } from '@/lib/database/couples'
import { updateGuest } from '@/lib/database/guests'
import { z } from 'zod'

const companionSchema = z.object({
  name: z.string().min(1),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  ageGroup: z.enum(['adult', 'child', 'baby']),
  gender: z.enum(['male', 'female']).optional(),
  menuType: z.enum(['adult', 'child', 'none']).optional(),
})

const updateGuestSchema = z.object({
  name: z.string().min(1).optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  groupId: z.string().optional(),
  ageGroup: z.enum(['adult', 'child', 'baby']).optional(),
  gender: z.enum(['male', 'female']).optional(),
  menuType: z.enum(['adult', 'child', 'none']).optional(),
  companions: z.array(companionSchema).optional(),
  rsvpStatus: z.enum(['pending', 'confirmed', 'declined']).optional(),
})

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: guestId } = await params
    
    // Verificar autenticação
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Buscar o couple
    const couple = await getCoupleByUserId(user.id)
    if (!couple) {
      return NextResponse.json({ error: 'Couple not found' }, { status: 404 })
    }

    // Validar dados do body
    const body = await request.json()
    const validatedData = updateGuestSchema.parse(body)

    // Atualizar o convidado
    const updatedGuest = await updateGuest(guestId, validatedData)

    return NextResponse.json({
      success: true,
      guest: updatedGuest
    })

  } catch (error) {
    console.error('Error updating guest:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: "Invalid data",
        details: (error as z.ZodError).errors,
      }, { status: 400 });
    }

    return NextResponse.json(
      {
        error: "Failed to update guest",
      },
      { status: 500 }
    );
  }
}