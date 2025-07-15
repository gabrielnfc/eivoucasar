import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { DEFAULT_THEMES } from '@/types/theme'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ coupleId: string }> }
) {
  try {
    const supabase = await createClient()
    const { coupleId } = await params

    // Buscar o tema atual do casal
    // Primeiro tentar por id (couple_id), depois por user_id (para compatibilidade)
    let { data: couple, error } = await supabase
      .from('couples')
      .select('id, theme_colors')
      .eq('id', coupleId)
      .single()
    
    // Se não encontrar por id, tentar por user_id
    if (error && error.code === 'PGRST116') {
      console.log(`Tentando buscar por user_id: ${coupleId}`)
      const { data: coupleByUserId, error: userError } = await supabase
        .from('couples')
        .select('id, theme_colors')
        .eq('user_id', coupleId)
        .single()
      
      if (coupleByUserId) {
        console.log(`Encontrado por user_id: ${coupleByUserId.id}`)
        couple = coupleByUserId
        error = userError
      }
    }

    if (error || !couple) {
      console.error('Erro ao buscar casal:', error)
      return NextResponse.json({ error: 'Casal não encontrado' }, { status: 404 })
    }

    // Verificar se há um themeId salvo no theme_colors
    const themeColors = couple.theme_colors as any
    const themeId = themeColors?.themeId || DEFAULT_THEMES[0].id

    // Verificar se o tema existe
    const theme = DEFAULT_THEMES.find(t => t.id === themeId)
    if (!theme) {
      return NextResponse.json({ themeId: DEFAULT_THEMES[0].id })
    }

    return NextResponse.json({ themeId })
  } catch (error) {
    console.error('Erro ao buscar tema:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ coupleId: string }> }
) {
  try {
    const supabase = await createClient()
    const { coupleId } = await params
    const { themeId } = await request.json()

    // Validar se o tema existe
    const theme = DEFAULT_THEMES.find(t => t.id === themeId)
    if (!theme) {
      return NextResponse.json({ error: 'Tema não encontrado' }, { status: 400 })
    }

    // Buscar theme_colors atual para preservar outros dados
    let { data: couple, error: fetchError } = await supabase
      .from('couples')
      .select('id, theme_colors')
      .eq('id', coupleId)
      .single()

    // Se não encontrar por id, tentar por user_id
    if (fetchError && fetchError.code === 'PGRST116') {
      console.log(`PUT: Tentando buscar por user_id: ${coupleId}`)
      const { data: coupleByUserId, error: userError } = await supabase
        .from('couples')
        .select('id, theme_colors')
        .eq('user_id', coupleId)
        .single()
      
      if (coupleByUserId) {
        console.log(`PUT: Encontrado por user_id: ${coupleByUserId.id}`)
        couple = coupleByUserId
        fetchError = userError
      }
    }

    if (fetchError || !couple) {
      console.error('Erro ao buscar casal:', fetchError)
      return NextResponse.json({ error: 'Casal não encontrado' }, { status: 404 })
    }

    // Merge com theme_colors existente
    const currentThemeColors = couple.theme_colors as any || {}
    const updatedThemeColors = {
      ...currentThemeColors,
      themeId,
      // Atualizar cores do tema
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      accent: theme.colors.accent,
      background: theme.colors.background,
      text: theme.colors.text,
      // Adicionar informações do tema
      themeData: {
        name: theme.name,
        displayName: theme.displayName,
        fonts: theme.fonts,
        styling: theme.styling,
        animations: theme.animations
      }
    }

    // Atualizar no banco usando o ID real do casal
    const { error: updateError } = await supabase
      .from('couples')
      .update({ theme_colors: updatedThemeColors })
      .eq('id', couple.id)

    if (updateError) {
      console.error('Erro ao atualizar tema:', updateError)
      return NextResponse.json({ error: 'Erro ao salvar tema' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      themeId,
      message: 'Tema atualizado com sucesso' 
    })
  } catch (error) {
    console.error('Erro ao atualizar tema:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 