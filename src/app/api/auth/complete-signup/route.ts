import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/database/prisma'

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verificar se o casal já existe
    const existingCouple = await prisma.couple.findFirst({
      where: { userId: user.id }
    })

    if (existingCouple) {
      return NextResponse.json({ 
        success: true, 
        message: 'Casal já existe',
        couple: existingCouple 
      })
    }

    // Extrair dados do usuário
    const brideName = user.user_metadata?.bride_name
    const groomName = user.user_metadata?.groom_name
    const weddingDateTime = user.user_metadata?.wedding_datetime
    const city = user.user_metadata?.city
    const state = user.user_metadata?.state
    const country = user.user_metadata?.country || 'Brasil'
    const bridePhone = user.user_metadata?.bride_phone
    const groomPhone = user.user_metadata?.groom_phone
    const signupRole = user.user_metadata?.signup_role
    const emailSecondary = user.user_metadata?.email_secondary

    if (!brideName || !groomName || !weddingDateTime || !city || !state) {
      return NextResponse.json({ 
        error: 'Dados incompletos do usuário' 
      }, { status: 400 })
    }

    // Criar slug único
    const baseSlug = `${brideName.toLowerCase().replace(/\s+/g, '-')}-${groomName.toLowerCase().replace(/\s+/g, '-')}`
    let slug = baseSlug
    let counter = 1

    // Verificar se slug já existe e criar um único
    while (await prisma.couple.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    // Criar o casal
    const weddingDate = new Date(weddingDateTime)
    const couple = await prisma.couple.create({
      data: {
        userId: user.id,
        email: user.email!,
        emailSecondary,
        brideName,
        groomName,
        city,
        state,
        country,
        bridePhone,
        groomPhone,
        wedding_date: weddingDate, // Campo Date obrigatório
        weddingDateTime: weddingDate, // Campo DateTime obrigatório
        signupRole,
        slug,
        isActive: true,
        isPublished: false, // Padrão: não publicado até configurar
        termsAcceptedAt: new Date(), // Aceito no momento do signup
      }
    })

    // Criar grupos padrão
    await Promise.all([
      prisma.guestGroup.create({
        data: {
          coupleId: couple.id,
          name: 'Família da Noiva',
          description: 'Familiares da noiva',
          color: '#f43f5e',
          targetAmount: 1000,
          currentAmount: 0,
          memberCount: 0,
        }
      }),
      prisma.guestGroup.create({
        data: {
          coupleId: couple.id,
          name: 'Família do Noivo',
          description: 'Familiares do noivo',
          color: '#3b82f6',
          targetAmount: 1000,
          currentAmount: 0,
          memberCount: 0,
        }
      }),
      prisma.guestGroup.create({
        data: {
          coupleId: couple.id,
          name: 'Amigos',
          description: 'Amigos do casal',
          color: '#10b981',
          targetAmount: 1500,
          currentAmount: 0,
          memberCount: 0,
        }
      })
    ])

    return NextResponse.json({ 
      success: true, 
      message: 'Casal criado com sucesso',
      couple 
    })
  } catch (error) {
    console.error('Erro ao completar signup:', error)
    return NextResponse.json({ 
      error: 'Erro interno do servidor' 
    }, { status: 500 })
  }
} 