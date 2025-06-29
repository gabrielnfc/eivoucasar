import { NextRequest, NextResponse } from 'next/server'
import { createGroup, getGroupsByCoupleId } from '@/lib/database/guests'
import { getCoupleByUserId } from '../../../../lib/database/couples'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Buscar dados do casal
    const couple = await getCoupleByUserId(user.id)

    if (!couple) {
      return NextResponse.json({ error: 'Couple not found' }, { status: 404 })
    }

    // Buscar grupos
    const groups = await getGroupsByCoupleId(couple.id)
    
    return NextResponse.json({ groups })
  } catch (error) {
    console.error('Error fetching groups:', error)
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
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Buscar dados do casal
    const couple = await getCoupleByUserId(user.id)

    if (!couple) {
      return NextResponse.json({ error: 'Couple not found' }, { status: 404 })
    }

    // Parse do body
    const body = await request.json()
    const { name, description, color, targetAmount } = body

    if (!name || !color) {
      return NextResponse.json({ error: 'Name and color are required' }, { status: 400 })
    }

    // Criar grupo
    const group = await createGroup(couple.id, {
      name,
      description: description || undefined,
      color,
      targetAmount: targetAmount || 0,
    })

    return NextResponse.json({ group })
  } catch (error) {
    console.error('Error creating group:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 