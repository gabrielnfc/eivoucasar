import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface CoupleData {
  // Dados básicos
  id: string
  slug: string
  bride_name: string
  groom_name: string
  wedding_date: string
  wedding_time?: string
  wedding_location?: string
  wedding_address?: string
  wedding_datetime: string
  
  // Configurações
  theme?: string
  privacy_level?: string
  created_at?: string
  
  // Fotos
  bride_photo?: string
  groom_photo?: string
  cover_photo_url?: string
  couple_photo?: string
  hero_background_image?: string
  
  // Conteúdo
  couple_story?: string
  story_title?: string
  
  // 💌 CAMPOS DE INVITATION PARA SINCRONIZAÇÃO
  invitation_title?: string
  invitation_message?: string
  formal_invitation_message?: string
  invitation_signature?: string
  invitation_image_2?: string
  invitation_image_3?: string
  
  // ⏰ CAMPOS DE COUNTDOWN PARA SINCRONIZAÇÃO
  countdown_title?: string
  countdown_message?: string
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
        wedding_time,
        wedding_location,
        wedding_address,
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
        is_published,
        invitation_title,
        invitation_message,
        formal_invitation_message,
        invitation_signature,
        invitation_image_2,
        invitation_image_3,
        countdown_title,
        countdown_message
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
      // Dados básicos
      id: couple.id,
      slug: couple.slug,
      bride_name: couple.bride_name,
      groom_name: couple.groom_name,
      wedding_date: couple.wedding_date,
      wedding_time: couple.wedding_time,
      wedding_location: couple.wedding_location,
      wedding_address: couple.wedding_address,
      wedding_datetime: couple.wedding_datetime,
      
      // Configurações
      theme: couple.theme_colors,
      privacy_level: 'public',
      
      // Fotos (usando apenas campos que existem no SELECT)
      cover_photo_url: couple.cover_photo_url,
      
      // Conteúdo (usando apenas campos que existem no SELECT)
      couple_story: couple.story,
      
      // 💌 CAMPOS DE INVITATION PARA SINCRONIZAÇÃO
      invitation_title: couple.invitation_title,
      invitation_message: couple.invitation_message,
      formal_invitation_message: couple.formal_invitation_message,
      invitation_signature: couple.invitation_signature,
      invitation_image_2: couple.invitation_image_2,
      invitation_image_3: couple.invitation_image_3,
      
      // ⏰ CAMPOS DE COUNTDOWN PARA SINCRONIZAÇÃO
      countdown_title: couple.countdown_title,
      countdown_message: couple.countdown_message
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