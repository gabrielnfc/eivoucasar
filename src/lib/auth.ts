import { createClient } from '@/lib/supabase/client'

// Tipos de autenticação
export interface SignUpData {
  // Dados básicos
  email: string
  emailSecondary?: string
  password: string
  
  // Dados do casal
  brideName: string
  groomName: string
  
  // Localização
  city: string
  state: string
  country: string
  
  // Contatos
  bridePhone?: string
  groomPhone?: string
  
  // Evento
  weddingDate: string
  weddingTime: string
  
  // Configuração
  signupRole: 'bride' | 'groom' | 'other'
  
  // Aceites
  acceptTerms: boolean
}

export interface SignInData {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  emailSecondary?: string
  brideName?: string
  groomName?: string
  city?: string
  state?: string
  country?: string
  bridePhone?: string
  groomPhone?: string
  weddingDateTime?: string
  signupRole?: string
  slug?: string
  isProfileComplete?: boolean // Indica se o cadastro do casal está completo
}

/**
 * Registra um novo casal
 */
export async function signUp(data: SignUpData) {
  try {
    const { 
      email, 
      password, 
      brideName, 
      groomName, 
      weddingDate, 
      weddingTime,
      city,
      state,
      country,
      bridePhone,
      groomPhone,
      signupRole,
      emailSecondary
    } = data
    
    // Combinar data e hora do casamento
    const weddingDateTime = `${weddingDate}T${weddingTime}:00.000Z`
    
    // 1. Criar usuário no Supabase Auth
    const supabase = createClient()
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          bride_name: brideName,
          groom_name: groomName,
          wedding_datetime: weddingDateTime,
          city,
          state,
          country,
          bride_phone: bridePhone,
          groom_phone: groomPhone,
          signup_role: signupRole,
          email_secondary: emailSecondary,
        },
      },
    })

    if (authError) throw authError

    return { success: true, data: authData }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

/**
 * Faz login do usuário
 */
export async function signIn(data: SignInData) {
  try {
    const supabase = createClient()
    const { data: authData, error } = await supabase.auth.signInWithPassword(data)
    
    if (error) throw error

    return { success: true, data: authData }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

/**
 * Faz logout do usuário
 */
export async function signOut() {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

/**
 * Obtém usuário atual
 */
export async function getCurrentUser() {
  try {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) throw error
    
    return { success: true, user }
  } catch (error: any) {
    return { success: false, error: error.message, user: null }
  }
}

/**
 * Reseta senha
 */
export async function resetPassword(email: string) {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    
    if (error) throw error
    
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
} 