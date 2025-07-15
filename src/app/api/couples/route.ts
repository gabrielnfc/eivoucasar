import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { formToDbData, validateRequiredFields } from '@/lib/utils/field-mapping'

const updateCoupleSchema = z.object({
  bride_name: z.string().min(1, 'Nome da noiva é obrigatório'),
  groom_name: z.string().min(1, 'Nome do noivo é obrigatório'),
  wedding_date: z.string().min(1, 'Data do casamento é obrigatória'),
  wedding_time: z.string().optional(),
  wedding_location: z.string().optional(),
  wedding_address: z.string().optional(),
  formal_invitation_message: z.string().optional(),
  bride_photo: z.string().optional(),
  groom_photo: z.string().optional(),
  cover_photo_url: z.string().optional(),
  couple_photo: z.string().optional(),
  hero_background_image: z.string().optional(),
  theme_color: z.string().optional(),
  slug: z.string().min(1, 'URL personalizada é obrigatória')
    .regex(/^[a-z0-9-]+$/, 'URL deve conter apenas letras minúsculas, números e hífens')
})

export async function PUT(request: NextRequest) {
  try {
    // Get Authorization header
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      console.log('No token found in Authorization header')
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    
    const supabase = await createClient()
    
    // Get user directly from token
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)
    
    if (userError || !user) {
      console.log('User validation failed:', userError)
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    
    console.log('User authenticated:', user.email)

    const body = await request.json()
    const validation = updateCoupleSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({ 
        error: 'Dados inválidos', 
        details: validation.error.errors 
      }, { status: 400 })
    }

    const formData = validation.data

    // Validar campos obrigatórios
    const { isValid, errors } = validateRequiredFields(formData)
    if (!isValid) {
      return NextResponse.json({ 
        error: 'Campos obrigatórios não preenchidos', 
        details: errors 
      }, { status: 400 })
    }

    // Check if slug is already taken by another couple
    const { data: existingCouple, error: slugError } = await supabase
      .from('couples')
      .select('id')
      .eq('slug', formData.slug)
      .neq('user_id', user.id)
      .single()

    if (slugError && slugError.code !== 'PGRST116') {
      throw slugError
    }

    if (existingCouple) {
      return NextResponse.json({ 
        error: 'Esta URL já está sendo usada por outro casal' 
      }, { status: 400 })
    }

    // Converter dados do formulário para o formato do banco
    const dbData = formToDbData(formData)

    // Update couple data
    const { data: updatedCouple, error } = await supabase
      .from('couples')
      .update({
        ...dbData,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating couple:', error)
      return NextResponse.json({ 
        error: 'Erro ao atualizar dados' 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      data: updatedCouple 
    })

  } catch (error) {
    console.error('Error in PUT /api/couples:', error)
    return NextResponse.json({ 
      error: 'Erro interno do servidor' 
    }, { status: 500 })
  }
}

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get('user_id')
    
    // Se user_id for fornecido, buscar diretamente (para template renderer)
    if (user_id) {
      console.log('🔍 API couples: Buscando casal por user_id:', user_id)
      
      const supabase = await createClient()
      
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
        .eq('user_id', user_id)
        .single()

      if (error || !couple) {
        console.error('❌ Casal não encontrado para user_id:', user_id, error)
        return NextResponse.json(
          { success: false, error: 'Casal não encontrado' },
          { status: 404 }
        )
      }

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

      console.log('✅ Casal encontrado:', coupleData.brideName, '&', coupleData.groomName)
      
      return NextResponse.json({
        success: true,
        data: coupleData
      })
    }
    
    // Busca com autenticação (para dashboard)
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    
    const supabase = await createClient()
    
    // Set the session with the token
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { data: couple, error } = await supabase
      .from('couples')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error) {
      console.error('Error fetching couple:', error)
      return NextResponse.json({ 
        error: 'Erro ao buscar dados' 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      data: couple 
    })

  } catch (error) {
    console.error('Error in GET /api/couples:', error)
    return NextResponse.json({ 
      error: 'Erro interno do servidor' 
    }, { status: 500 })
  }
}