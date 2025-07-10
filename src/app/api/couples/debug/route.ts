import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    console.log('🔍 Iniciando debug da API de casais...')
    
    const supabase = await createClient()
    console.log('✅ Cliente Supabase criado')
    
    // Buscar todos os casais
    const { data: couples, error } = await supabase
      .from('couples')
      .select(`
        id,
        slug,
        bride_name,
        groom_name,
        wedding_date,
        is_active,
        created_at
      `)
      .limit(10)

    if (error) {
      console.error('❌ Erro ao buscar casais:', error)
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error
      }, { status: 500 })
    }

    console.log('📊 Casais encontrados:', couples?.length || 0)
    
    return NextResponse.json({
      success: true,
      message: `Encontrados ${couples?.length || 0} casais`,
      data: couples || [],
      debug: {
        totalCouples: couples?.length || 0,
        firstCouple: couples?.[0] || null,
        slugs: couples?.map(c => c.slug) || []
      }
    })

  } catch (error) {
    console.error('💥 Erro na API de debug:', error)
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
} 