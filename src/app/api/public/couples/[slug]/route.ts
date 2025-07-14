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

// GET - Buscar dados completos do casal pelo slug (API PÚBLICA)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    console.log('🔍 API Public [slug] - Iniciando busca para slug:', slug)
    
    if (!slug) {
      console.log('❌ Slug não fornecido')
      return NextResponse.json(
        { success: false, error: 'Slug é obrigatório' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    console.log('✅ Cliente Supabase criado')
    
    // Primeiro, vamos verificar se existem casais na tabela
    const { data: allCouples, error: countError } = await supabase
      .from('couples')
      .select('id, slug')
      .limit(5)
    
    console.log('📊 Total de casais encontrados:', allCouples?.length || 0)
    console.log('📋 Slugs disponíveis:', allCouples?.map(c => c.slug) || [])
    
    // Buscar dados completos do casal (apenas publicados)
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
      .eq('slug', slug)
      .eq('is_published', true) // Apenas sites publicados
      .single()

    if (error) {
      console.error('❌ Erro do Supabase:', error)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Casal não encontrado',
          debug: {
            slugBuscado: slug,
            slugsDisponiveis: allCouples?.map(c => c.slug) || [],
            totalCasais: allCouples?.length || 0,
            errorCode: error.code,
            errorMessage: error.message
          }
        },
        { status: 404 }
      )
    }

    if (!couple) {
      console.log('❌ Nenhum casal encontrado para slug:', slug)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Casal não encontrado',
          debug: {
            slugBuscado: slug,
            slugsDisponiveis: allCouples?.map(c => c.slug) || [],
            totalCasais: allCouples?.length || 0
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