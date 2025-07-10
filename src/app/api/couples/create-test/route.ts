import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST() {
  try {
    console.log('🔧 Criando casal de teste...')
    
    const supabase = await createClient()
    
    // Verificar se já existe um casal de teste
    const { data: existingCouple } = await supabase
      .from('couples')
      .select('id, slug')
      .eq('slug', 'joao-maria-2025')
      .single()
    
    if (existingCouple) {
      return NextResponse.json({
        success: true,
        message: 'Casal de teste já existe',
        data: existingCouple
      })
    }
    
    // Criar casal de teste
    const testCouple = {
      user_id: '00000000-0000-0000-0000-000000000000', // UUID fictício para teste
      slug: 'joao-maria-2025',
      bride_name: 'Maria Silva',
      groom_name: 'João Santos',
      email: 'joao.maria@teste.com',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      wedding_date: '2025-06-15',
      wedding_datetime: '2025-06-15T16:00:00-03:00',
      ceremony_venue: 'Igreja São José',
      reception_venue: 'Salão Villa Bela',
      welcome_message: 'Com alegria no coração, convidamos você para celebrar conosco o nosso casamento!',
      story: 'Nossa história começou em uma tarde de primavera quando nos conhecemos no parque. Desde então, descobrimos que o amor verdadeiro existe e é ainda mais bonito quando compartilhado.',
      theme_colors: {
        primary: '#be185d',
        secondary: '#ec4899',
        accent: '#f97316',
        background: '#fef2f2',
        text: '#1f2937'
      },
      is_active: true,
      is_published: true,
      terms_accepted_at: new Date().toISOString(),
      signup_role: 'bride'
    }
    
    const { data: newCouple, error } = await supabase
      .from('couples')
      .insert(testCouple)
      .select()
      .single()
    
    if (error) {
      console.error('❌ Erro ao criar casal de teste:', error)
      return NextResponse.json({
        success: false,
        error: 'Erro ao criar casal de teste',
        details: error
      }, { status: 500 })
    }
    
    console.log('✅ Casal de teste criado:', newCouple.bride_name, '&', newCouple.groom_name)
    
    return NextResponse.json({
      success: true,
      message: 'Casal de teste criado com sucesso',
      data: newCouple
    })
    
  } catch (error) {
    console.error('💥 Erro na criação do casal de teste:', error)
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
} 