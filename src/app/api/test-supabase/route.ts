import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    console.log('🔧 Testando conexão com Supabase...')
    
    // Verificar variáveis de ambiente
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        success: false,
        error: 'Variáveis de ambiente do Supabase não encontradas',
        debug: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseAnonKey,
          url: supabaseUrl?.substring(0, 30) + '...' || 'Não definida'
        }
      }, { status: 500 })
    }
    
    const supabase = await createClient()
    console.log('✅ Cliente Supabase criado')
    
    // Testar conexão básica
    const { data: test, error: testError } = await supabase
      .from('couples')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.error('❌ Erro na conexão:', testError)
      return NextResponse.json({
        success: false,
        error: 'Erro na conexão com Supabase',
        debug: {
          errorCode: testError.code,
          errorMessage: testError.message,
          supabaseUrl: supabaseUrl?.substring(0, 30) + '...',
          hasKey: !!supabaseAnonKey
        }
      }, { status: 500 })
    }
    
    // Verificar se a tabela existe
    const { data: couples, error: couplesError } = await supabase
      .from('couples')
      .select('id, slug, bride_name, groom_name')
      .limit(5)
    
    if (couplesError) {
      console.error('❌ Erro ao acessar tabela couples:', couplesError)
      return NextResponse.json({
        success: false,
        error: 'Erro ao acessar tabela couples',
        debug: {
          errorCode: couplesError.code,
          errorMessage: couplesError.message,
          hint: couplesError.hint
        }
      }, { status: 500 })
    }
    
    console.log('✅ Conexão com Supabase funcionando')
    console.log('📊 Casais encontrados:', couples?.length || 0)
    
    return NextResponse.json({
      success: true,
      message: 'Conexão com Supabase funcionando',
      debug: {
        supabaseUrl: supabaseUrl?.substring(0, 30) + '...',
        hasKey: !!supabaseAnonKey,
        totalCouples: couples?.length || 0,
        couples: couples || []
      }
    })
    
  } catch (error) {
    console.error('💥 Erro no teste do Supabase:', error)
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor',
      debug: {
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        errorMessage: error instanceof Error ? error.message : 'Erro desconhecido'
      }
    }, { status: 500 })
  }
} 