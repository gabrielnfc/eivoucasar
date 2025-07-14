import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface CoupleData {
  id: string
  slug: string
  brideName: string
  groomName: string
  weddingDate: string
  weddingDateTime: string
  ceremonyVenue?: string
  receptionVenue?: string
  welcomeMessage?: string
  story?: string
  coverPhotoUrl?: string
  themeColors?: any
  email: string
  emailSecondary?: string
  city: string
  state: string
  country?: string
  bridePhone?: string
  groomPhone?: string
  isActive: boolean
  isPublished: boolean
}

// GET - Buscar dados completos do casal pelo ID (API PRIVADA - Dashboard)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ coupleId: string }> }
) {
  try {
    const { coupleId } = await params
    
    console.log('🔍 API Private [coupleId] - Iniciando busca para ID:', coupleId)
    
    if (!coupleId) {
      console.log('❌ coupleId não fornecido')
      return NextResponse.json(
        { success: false, error: 'ID do casal é obrigatório' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    console.log('✅ Cliente Supabase criado')
    
    // Buscar dados completos do casal por ID (sem filtro de publicação para dashboard)
    const { data: couple, error } = await supabase
      .from('couples')
      .select(`
        id,
        slug,
        bride_name,
        groom_name,
        wedding_date,
        wedding_datetime,
        ceremony_venue,
        reception_venue,
        welcome_message,
        story,
        cover_photo_url,
        theme_colors,
        email,
        email_secondary,
        city,
        state,
        country,
        bride_phone,
        groom_phone,
        is_active,
        is_published
      `)
      .eq('id', coupleId)
      .single()

    if (error) {
      console.error('❌ Erro do Supabase:', error)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Casal não encontrado',
          debug: {
            coupleIdBuscado: coupleId,
            errorCode: error.code,
            errorMessage: error.message
          }
        },
        { status: 404 }
      )
    }

    if (!couple) {
      console.log('❌ Nenhum casal encontrado para ID:', coupleId)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Casal não encontrado',
          debug: {
            coupleIdBuscado: coupleId
          }
        },
        { status: 404 }
      )
    }

    console.log('✅ Casal encontrado:', couple.bride_name, '&', couple.groom_name)

    // Transformar dados para formato consistente
    const coupleData: CoupleData = {
      id: couple.id,
      slug: couple.slug,
      brideName: couple.bride_name,
      groomName: couple.groom_name,
      weddingDate: couple.wedding_date,
      weddingDateTime: couple.wedding_datetime,
      ceremonyVenue: couple.ceremony_venue,
      receptionVenue: couple.reception_venue,
      welcomeMessage: couple.welcome_message,
      story: couple.story,
      coverPhotoUrl: couple.cover_photo_url,
      themeColors: couple.theme_colors,
      email: couple.email,
      emailSecondary: couple.email_secondary,
      city: couple.city,
      state: couple.state,
      country: couple.country,
      bridePhone: couple.bride_phone,
      groomPhone: couple.groom_phone,
      isActive: couple.is_active,
      isPublished: couple.is_published
    }

    return NextResponse.json({
      success: true,
      data: coupleData
    })

  } catch (error) {
    console.error('Erro ao buscar casal:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar dados do casal (API PRIVADA - Dashboard)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ coupleId: string }> }
) {
  try {
    const { coupleId } = await params
    const body = await request.json()
    
    if (!coupleId) {
      return NextResponse.json(
        { success: false, error: 'ID do casal é obrigatório' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    
    // Verificar se o casal existe
    const { data: existingCouple, error: fetchError } = await supabase
      .from('couples')
      .select('id')
      .eq('id', coupleId)
      .single()

    if (fetchError || !existingCouple) {
      return NextResponse.json(
        { success: false, error: 'Casal não encontrado' },
        { status: 404 }
      )
    }

    // Preparar dados para atualização
    const updateData: any = {}
    
    if (body.brideName) updateData.bride_name = body.brideName
    if (body.groomName) updateData.groom_name = body.groomName
    if (body.weddingDateTime) updateData.wedding_datetime = body.weddingDateTime
    if (body.ceremonyVenue !== undefined) updateData.ceremony_venue = body.ceremonyVenue
    if (body.receptionVenue !== undefined) updateData.reception_venue = body.receptionVenue
    if (body.welcomeMessage !== undefined) updateData.welcome_message = body.welcomeMessage
    if (body.story !== undefined) updateData.story = body.story
    if (body.coverPhotoUrl !== undefined) updateData.cover_photo_url = body.coverPhotoUrl
    if (body.themeColors) updateData.theme_colors = body.themeColors
    if (body.emailSecondary !== undefined) updateData.email_secondary = body.emailSecondary
    if (body.bridePhone !== undefined) updateData.bride_phone = body.bridePhone
    if (body.groomPhone !== undefined) updateData.groom_phone = body.groomPhone
    if (body.isPublished !== undefined) updateData.is_published = body.isPublished

    // Atualizar timestamp
    updateData.updated_at = new Date().toISOString()

    // Atualizar no banco
    const { data: updatedCouple, error: updateError } = await supabase
      .from('couples')
      .update(updateData)
      .eq('id', coupleId)
      .select()
      .single()

    if (updateError) {
      console.error('Erro ao atualizar casal:', updateError)
      return NextResponse.json(
        { success: false, error: 'Erro ao atualizar dados' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Dados atualizados com sucesso',
      data: updatedCouple
    })

  } catch (error) {
    console.error('Erro ao atualizar casal:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 