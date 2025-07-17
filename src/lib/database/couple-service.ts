import { createClient } from '@/lib/supabase/client'
import { z } from 'zod'
import { formToDbData, validateRequiredFields } from '@/lib/utils/field-mapping'

// Helper para validar datas opcionais
const optionalDateString = z.string().optional().transform(val => {
  if (!val || val.trim() === '') return undefined
  return val
})

// Helper para validar strings opcionais 
const optionalString = z.string().optional().transform(val => {
  if (val === null || val === undefined) return undefined
  return val
})

const updateCoupleSchema = z.object({
  bride_name: z.string().min(1, 'Nome da noiva é obrigatório'),
  groom_name: z.string().min(1, 'Nome do noivo é obrigatório'),
  wedding_date: z.string().min(1, 'Data do casamento é obrigatória'),
  wedding_time: optionalString,
  wedding_location: optionalString,
  wedding_address: optionalString,
  formal_invitation_message: optionalString,
  invitation_title: optionalString,
  invitation_signature: optionalString,
  story_title: optionalString,
  first_meeting_date: optionalDateString,
  first_meeting_story: optionalString,
  engagement_date: optionalDateString,
  engagement_story: optionalString,
  countdown_title: optionalString,
  countdown_message: optionalString,
  bride_photo: optionalString,
  groom_photo: optionalString,
  cover_photo_url: optionalString,
  couple_photo: optionalString,
  hero_background_image: optionalString,
  theme_color: optionalString,
  slug: z.string().min(1, 'URL personalizada é obrigatória')
    .regex(/^[a-z0-9-]+$/, 'URL deve conter apenas letras minúsculas, números e hífens')
})

// Cache global com promise sharing para evitar chamadas concorrentes
interface CacheEntry {
  data: any
  timestamp: number
}

// 🌟 SINGLETON VERDADEIRAMENTE GLOBAL - Uma única instância para toda a aplicação
declare global {
  var __GLOBAL_COUPLE_MANAGER__: GlobalCoupleManager | undefined
  var __GLOBAL_FETCH_ATTEMPTS__: Array<{
    userId: string
    timestamp: number
    callId: string
    instanceId: string
    supabaseClientId: string
    type: 'START' | 'END' | 'CACHE' | 'WAIT'
  }> | undefined
}

class GlobalCoupleManager {
  private activeFetches = new Map<string, Promise<any>>()
  private cache = new Map<string, CacheEntry>()
  private readonly CACHE_TTL = 30000 // 30 segundos
  private supabaseClients = new Map<string, any>() // Rastrear clientes únicos

  constructor() {
    // Inicializar rastreamento global de tentativas
    if (!globalThis.__GLOBAL_FETCH_ATTEMPTS__) {
      globalThis.__GLOBAL_FETCH_ATTEMPTS__ = []
    }
  }

  private logFetchAttempt(userId: string, type: 'START' | 'END' | 'CACHE' | 'WAIT', debugInfo?: any) {
    const attempt = {
      userId,
      timestamp: Date.now(),
      callId: debugInfo?.callId || 'unknown',
      instanceId: debugInfo?.instanceId || 'unknown',
      supabaseClientId: debugInfo?.supabaseClientId || 'unknown',
      type
    }
    
    globalThis.__GLOBAL_FETCH_ATTEMPTS__!.push(attempt)
    
    // Manter apenas os últimos 10 registros para não crescer infinitamente
    if (globalThis.__GLOBAL_FETCH_ATTEMPTS__!.length > 10) {
      globalThis.__GLOBAL_FETCH_ATTEMPTS__ = globalThis.__GLOBAL_FETCH_ATTEMPTS__!.slice(-10)
    }
    
    console.log('📝 GLOBAL FETCH LOG:', attempt)
    console.log('📊 HISTÓRICO DE TENTATIVAS:', globalThis.__GLOBAL_FETCH_ATTEMPTS__)
    
    // Detectar padrões suspeitos
    const recentAttempts = globalThis.__GLOBAL_FETCH_ATTEMPTS__!
      .filter(a => a.userId === userId && Date.now() - a.timestamp < 5000) // últimos 5 segundos
    
    if (recentAttempts.length > 1) {
      console.log('⚠️  MÚLTIPLAS TENTATIVAS DETECTADAS para:', userId)
      console.log('🔍 TENTATIVAS RECENTES:', recentAttempts)
      
      // Verificar se há tentativas START simultâneas
      const startAttempts = recentAttempts.filter(a => a.type === 'START')
      if (startAttempts.length > 1) {
        console.log('🚨 RACE CONDITION DETECTADA: Múltiplas tentativas START!')
        startAttempts.forEach((attempt, idx) => {
          console.log(`   START ${idx + 1}:`, {
            callId: attempt.callId,
            instanceId: attempt.instanceId,
            supabaseClientId: attempt.supabaseClientId,
            timestamp: new Date(attempt.timestamp).toISOString()
          })
        })
      }
    }
  }

  // 🚀 Método estático para garantir uma única instância global
  static getInstance(): GlobalCoupleManager {
    if (typeof globalThis !== 'undefined') {
      // Usar globalThis em ambientes universais
      if (!globalThis.__GLOBAL_COUPLE_MANAGER__) {
        globalThis.__GLOBAL_COUPLE_MANAGER__ = new GlobalCoupleManager()
        console.log('🌟 GLOBAL SINGLETON: Nova instância criada')
        
        // Adicionar detector de timing crítico
        console.log('⏰ TIMING DETECTOR: Instalado para detectar chamadas simultâneas')
        
      } else {
        console.log('🔄 GLOBAL SINGLETON: Reutilizando instância existente')
      }
      return globalThis.__GLOBAL_COUPLE_MANAGER__
    }
    
    // Fallback para ambientes que não suportam globalThis
    if (!global.__GLOBAL_COUPLE_MANAGER__) {
      global.__GLOBAL_COUPLE_MANAGER__ = new GlobalCoupleManager()
      console.log('🌟 GLOBAL SINGLETON (fallback): Nova instância criada')
    }
    return global.__GLOBAL_COUPLE_MANAGER__
  }

  private detectSimultaneousCalls(userId: string, debugInfo?: any) {
    const now = Date.now()
    const recentCalls = globalThis.__GLOBAL_FETCH_ATTEMPTS__!
      .filter(a => a.userId === userId && a.type === 'START')
      .filter(a => now - a.timestamp < 100) // últimos 100ms
    
    if (recentCalls.length > 0) {
      console.log('🚨 CHAMADAS QUASE SIMULTÂNEAS DETECTADAS!')
      console.log('⏰ TIMING CRÍTICO:')
      recentCalls.forEach((call, idx) => {
        console.log(`   Call ${idx + 1}: ${new Date(call.timestamp).toISOString()}, diff: ${now - call.timestamp}ms`)
      })
      console.log(`   Current call: ${new Date(now).toISOString()}`)
      
      // Detectar se há diferença de menos de 10ms
      const timeDiffs = recentCalls.map(c => now - c.timestamp)
      const hasVeryCloseCalls = timeDiffs.some(diff => diff < 10)
      
      if (hasVeryCloseCalls) {
        console.log('💥 RACE CONDITION EXTREMA: Chamadas com diferença < 10ms!')
        console.log('🔍 ANÁLISE DETALHADA:')
        console.log('   - Podem estar sendo executadas antes do singleton ter chance de interceptar')
        console.log('   - Possível problema no timing de criação das promises')
        console.log('   - Debug info da chamada atual:', debugInfo)
      }
    }
  }

  async getCoupleData(
    userId: string, 
    supabaseClient: any, 
    bypassCache = false,
    debugInfo?: {
      callId: string
      instanceId: string
      supabaseClientId: string
      timestamp: number
      source?: string
    }
  ): Promise<{ couple: any; error: string | null }> {
    const cacheKey = `couple_${userId}`
    const now = Date.now()

    // 🚨 DETECÇÃO CRÍTICA: Verificar chamadas simultâneas ANTES de qualquer processamento
    this.detectSimultaneousCalls(userId, debugInfo)

    // 📝 LOG: Registrar tentativa de acesso
    this.logFetchAttempt(userId, 'START', debugInfo)

    // 🔍 Rastrear clientes Supabase únicos
    if (debugInfo?.supabaseClientId) {
      if (!this.supabaseClients.has(debugInfo.supabaseClientId)) {
        this.supabaseClients.set(debugInfo.supabaseClientId, {
          client: supabaseClient,
          firstSeen: now,
          url: supabaseClient?.supabaseUrl || 'unknown',
          key: supabaseClient?.supabaseKey?.substring(0, 20) + '...' || 'unknown'
        })
        console.log('🔗 NOVO CLIENTE SUPABASE detectado:', debugInfo.supabaseClientId)
      }
      
      console.log('📊 TOTAL DE CLIENTES SUPABASE:', this.supabaseClients.size)
      if (this.supabaseClients.size > 1) {
        console.log('⚠️  MÚLTIPLOS CLIENTES SUPABASE DETECTADOS!')
        this.supabaseClients.forEach((info, id) => {
          console.log(`   Cliente ${id}: URL=${info.url}, firstSeen=${new Date(info.firstSeen).toISOString()}`)
        })
      }
    }

    console.log('🏗️ GLOBAL SINGLETON: getCoupleData chamado para:', userId)
    console.log('📊 GLOBAL SINGLETON STATE:', {
      activeFetches: this.activeFetches.size,
      hasActiveForUser: this.activeFetches.has(cacheKey),
      cacheSize: this.cache.size,
      bypassCache,
      instanceId: this.constructor.name,
      debugInfo,
      totalSupabaseClients: this.supabaseClients.size
    })

    // Verificação crítica: Se há fetch ativo, mas com cliente diferente
    if (this.activeFetches.has(cacheKey)) {
      console.log('⏳ GLOBAL SINGLETON: Aguardando fetch ativo para:', userId)
      console.log('🔄 DEBUG: Call aguardando -', debugInfo)
      console.log('⚠️  ATENÇÃO: Usando cliente Supabase ID:', debugInfo?.supabaseClientId)
      
      // 📝 LOG: Registrar que está aguardando
      this.logFetchAttempt(userId, 'WAIT', debugInfo)
      
      try {
        const result = await this.activeFetches.get(cacheKey)!
        console.log('✅ GLOBAL SINGLETON: Resultado do fetch ativo obtido para:', userId)
        return result
      } catch (error) {
        console.log('❌ GLOBAL SINGLETON: Erro no fetch ativo:', error)
        this.activeFetches.delete(cacheKey)
        // Continuar para criar novo fetch
      }
    }

    // 2. Verificar cache se não for bypass
    if (!bypassCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!
      if (now - cached.timestamp < this.CACHE_TTL) {
        console.log('✅ GLOBAL SINGLETON: Cache hit para:', userId)
        console.log('📄 DEBUG: Cache hit -', debugInfo)
        
        // 📝 LOG: Registrar cache hit
        this.logFetchAttempt(userId, 'CACHE', debugInfo)
        
        return { couple: cached.data, error: null }
      } else {
        console.log('🗑️ GLOBAL SINGLETON: Cache expirado para:', userId)
        this.cache.delete(cacheKey)
      }
    }

    // 3. Criar nova busca e garantir que seja única
    console.log('🚀 GLOBAL SINGLETON: Iniciando nova busca para:', userId)
    console.log('🔥 DEBUG: Nova busca iniciada -', debugInfo)
    console.log('🔗 USANDO CLIENTE SUPABASE ID:', debugInfo?.supabaseClientId)
    
    const fetchPromise = this.performActualFetch(userId, supabaseClient, cacheKey, debugInfo)
    
    // Armazenar como fetch ativo
    this.activeFetches.set(cacheKey, fetchPromise)

    try {
      const result = await fetchPromise
      console.log('✅ GLOBAL SINGLETON: Busca concluída para:', userId)
      
      // 📝 LOG: Registrar conclusão
      this.logFetchAttempt(userId, 'END', debugInfo)
      
      return result
    } finally {
      // Limpar fetch ativo
      this.activeFetches.delete(cacheKey)
      console.log('🧹 GLOBAL SINGLETON: Fetch ativo removido para:', userId)
    }
  }

  private async performActualFetch(
    userId: string, 
    supabaseClient: any, 
    cacheKey: string,
    debugInfo?: any
  ) {
    try {
      console.log('📡 GLOBAL SINGLETON: Executando fetch real para:', userId)
      console.log('🎯 DEBUG: Fetch real executado -', debugInfo)
      console.log('⏰ FETCH START TIME:', Date.now(), 'ISO:', new Date().toISOString())
      
      // 🚨 ALERTA FINAL: Verificar se já houve chamadas HTTP recentes
      const recentHttpCalls = globalThis.__GLOBAL_FETCH_ATTEMPTS__!
        .filter(a => a.userId === userId && a.type === 'END')
        .filter(a => Date.now() - a.timestamp < 5000) // últimos 5 segundos
      
      if (recentHttpCalls.length > 0) {
        console.log('🚨🚨🚨 ALERTA CRÍTICO: SEGUNDA CHAMADA HTTP DETECTADA!')
        console.log('💀 ISTO NÃO DEVERIA ACONTECER COM O SINGLETON!')
        console.log('🔍 Chamadas HTTP anteriores:', recentHttpCalls)
        console.log('📋 Estado atual do singleton:')
        console.log('   - Cache size:', this.cache.size)
        console.log('   - Active fetches:', this.activeFetches.size)
        console.log('   - Supabase clients:', this.supabaseClients.size)
        console.log('🎯 Informações da chamada atual:', debugInfo)
        
        // Forçar stack trace para análise
        console.trace('🔍 STACK TRACE DA SEGUNDA CHAMADA HTTP:')
      }
      
      // 🔍 INTERCEPTAÇÃO CRÍTICA: Monitorar a chamada HTTP real
      console.log('🌐 HTTP CALL: Prestes a fazer chamada HTTP para couples table')
      console.log('🔗 CLIENT INFO:', {
        clientId: debugInfo?.supabaseClientId,
        url: supabaseClient?.supabaseUrl,
        hasAuth: !!supabaseClient?.auth,
        timestamp: new Date().toISOString()
      })
      
      // Criar um wrapper para interceptar a chamada
      const originalFrom = supabaseClient.from
      const httpCallId = Math.random().toString(36).substr(2, 9)
      
      console.log('🚨 HTTP CALL INICIADA:', {
        httpCallId,
        userId,
        debugInfo,
        stack: new Error().stack?.split('\n').slice(0, 5)
      })
      
      const { data: couple, error } = await supabaseClient
        .from('couples')
        .select('*')
        .eq('user_id', userId)
        .single()

      console.log('🚨 HTTP CALL CONCLUÍDA:', {
        httpCallId,
        userId,
        hasData: !!couple,
        hasError: !!error,
        endTime: new Date().toISOString()
      })

      console.log('⏰ FETCH END TIME:', Date.now(), 'ISO:', new Date().toISOString())

      if (error) {
        if (error.code === 'PGRST116') {
          // Não encontrado - cachear null temporariamente
          this.cache.set(cacheKey, { 
            data: null, 
            timestamp: Date.now() 
          })
          console.log('📝 GLOBAL SINGLETON: Cached null result for:', userId)
          return { couple: null, error: 'Nenhum casal encontrado' }
        }
        throw error
      }

      // Cachear resultado positivo
      this.cache.set(cacheKey, { 
        data: couple, 
        timestamp: Date.now() 
      })

      console.log('✅ GLOBAL SINGLETON: Dados cacheados para:', userId)
      return { couple, error: null }

    } catch (error) {
      console.error('💥 GLOBAL SINGLETON: Erro no fetch real:', error)
      return { couple: null, error: 'Erro ao buscar dados do casal' }
    }
  }

  clearCache(userId?: string) {
    if (userId) {
      const cacheKey = `couple_${userId}`
      this.cache.delete(cacheKey)
      this.activeFetches.delete(cacheKey)
      console.log('🧹 GLOBAL SINGLETON: Cache limpo para:', userId)
    } else {
      this.cache.clear()
      this.activeFetches.clear()
      console.log('🧹 GLOBAL SINGLETON: Todo cache limpo')
    }
  }
}

// 🌟 Instância singleton verdadeiramente global
const globalCoupleManager = GlobalCoupleManager.getInstance()

export class CoupleService {
  private supabase = createClient()
  private readonly CACHE_TTL = 30000 // 30 segundos
  private readonly instanceId = Math.random().toString(36).substr(2, 9) // ID único da instância
  private readonly supabaseClientId = Math.random().toString(36).substr(2, 9) // ID único do cliente Supabase

  constructor() {
    console.log('🏭 CoupleService: Nova instância criada com ID:', this.instanceId)
    console.log('🔗 Supabase Client ID:', this.supabaseClientId)
  }

  /**
   * Busca dados do casal do usuário autenticado (com SINGLETON GLOBAL garantido)
   */
  async getCoupleByUserId(userId: string, bypassCache = false, debugSource?: string) {
    const callId = Math.random().toString(36).substr(2, 9)
    const timestamp = Date.now()
    
    if (!userId) return { couple: null, error: 'User ID é obrigatório' }

    // 🔍 Log detalhado para debug
    const caller = new Error().stack?.split('\n')[2]?.trim() || 'unknown'
    const callerMethod = new Error().stack?.split('\n')[1]?.trim() || 'unknown'
    
    console.log('🔍 API CALL: getCoupleByUserId ENTRY (GLOBAL SINGLETON):', userId)
    console.log('📱 SOURCE:', debugSource || 'unknown')
    console.log('⏰ TIMESTAMP:', timestamp, 'ISO:', new Date(timestamp).toISOString())
    console.log('🆔 CALL ID:', callId)
    console.log('🏭 INSTANCE ID:', this.instanceId)
    console.log('🔗 SUPABASE CLIENT ID:', this.supabaseClientId)
    console.log('📍 CALLED FROM:', caller)
    console.log('🔗 CALLER METHOD:', callerMethod)

    // 🌟 USAR SINGLETON GLOBAL - Garante uma única busca por userId em toda a aplicação
    try {
      const result = await globalCoupleManager.getCoupleData(userId, this.supabase, bypassCache, {
        callId,
        instanceId: this.instanceId,
        supabaseClientId: this.supabaseClientId,
        timestamp,
        source: debugSource || 'unknown'
      })
      console.log('✅ GLOBAL SINGLETON RESULT:', { 
        userId, 
        hasCouple: !!result.couple, 
        error: result.error, 
        instanceId: this.instanceId,
        callId,
        source: debugSource,
        duration: Date.now() - timestamp + 'ms'
      })
      return result
    } catch (error) {
      console.error('💥 getCoupleByUserId GLOBAL SINGLETON ERROR:', error)
      return { couple: null, error: 'Erro ao buscar dados do casal' }
    }
  }

  /**
   * Invalida cache para um usuário específico
   */
  private invalidateCache(userId: string) {
    globalCoupleManager.clearCache(userId)
  }

  /**
   * Atualiza dados do casal (client-side com RLS)
   */
  async updateCouple(userId: string, formData: any) {
    try {
      // Validação client-side
      const validation = updateCoupleSchema.safeParse(formData)
      
      if (!validation.success) {
        const firstError = validation.error.errors[0]
        return { success: false, error: firstError.message }
      }

      const validatedData = validation.data

      // Validar campos obrigatórios
      const { isValid, errors } = validateRequiredFields(validatedData)
      if (!isValid) {
        return { success: false, error: errors.join(', ') }
      }

      // Verificar se slug está disponível (apenas se mudou)
      const currentCouple = await this.getCoupleByUserId(userId)
      if (currentCouple.couple && validatedData.slug !== currentCouple.couple.slug) {
        const { data: existingCouple } = await this.supabase
          .from('couples')
          .select('id')
          .eq('slug', validatedData.slug)
          .neq('user_id', userId)
          .single()

        if (existingCouple) {
          return { success: false, error: 'Esta URL já está sendo usada por outro casal' }
        }
      }

      // Converter dados do formulário para o formato do banco
      const dbData = formToDbData(validatedData)

      // Update usando RLS automático
      const { data: updatedCouple, error } = await this.supabase
        .from('couples')
        .update({
          ...dbData,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId) // RLS garante que só atualiza do próprio usuário
        .select()
        .single()

      if (error) {
        console.error('Error updating couple:', error)
        
        // Tratamento específico para erros conhecidos
        if (error.code === '22007') {
          return { success: false, error: 'Erro nos campos de data. Verifique se as datas estão no formato correto.' }
        }
        
        if (error.code === '23505') {
          return { success: false, error: 'Este slug já está sendo usado por outro casal.' }
        }
        
        return { success: false, error: 'Erro ao atualizar dados' }
      }

      // Invalidar cache após atualização bem-sucedida
      this.invalidateCache(userId)

      return { success: true, data: updatedCouple }
    } catch (error) {
      console.error('Error in updateCouple:', error)
      return { success: false, error: 'Erro interno' }
    }
  }

  /**
   * Atualiza tema do casal
   */
  async updateTheme(userId: string, themeId: string) {
    try {
      // Buscar dados atuais
      const { couple, error: fetchError } = await this.getCoupleByUserId(userId)
      if (fetchError || !couple) {
        return { success: false, error: 'Casal não encontrado' }
      }

      // Atualizar theme_colors
      const existingThemeColors = couple.theme_colors as any || {}
      const updatedThemeColors = {
        ...existingThemeColors,
        themeId,
        lastUpdated: new Date().toISOString()
      }

      const { error } = await this.supabase
        .from('couples')
        .update({ theme_colors: updatedThemeColors })
        .eq('user_id', userId) // RLS automático

      if (error) {
        console.error('Error updating theme:', error)
        return { success: false, error: 'Erro ao salvar tema' }
      }

      // Invalidar cache após atualização de tema
      this.invalidateCache(userId)

      return { success: true, themeId }
    } catch (error) {
      console.error('Error in updateTheme:', error)
      return { success: false, error: 'Erro interno' }
    }
  }

  /**
   * Busca tema atual do casal (via SINGLETON GLOBAL)
   */
  async getTheme(userId: string) {
    const callId = Math.random().toString(36).substr(2, 9)
    const timestamp = Date.now()
    
    try {
      console.log('🎨 CoupleService.getTheme: Usando SINGLETON GLOBAL para user_id:', userId)
      console.log('🏭 GETTHEME INSTANCE ID:', this.instanceId)
      console.log('🔗 GETTHEME SUPABASE CLIENT ID:', this.supabaseClientId)
      console.log('🆔 GETTHEME CALL ID:', callId)
      console.log('⏰ GETTHEME TIMESTAMP:', timestamp)
      
      // 🌟 USAR SINGLETON GLOBAL - mesma fonte de dados que useCouple
      const { couple, error } = await globalCoupleManager.getCoupleData(userId, this.supabase, false, {
        callId,
        instanceId: this.instanceId,
        supabaseClientId: this.supabaseClientId,
        timestamp
      })
      
      if (error || !couple) {
        console.log('🎨 CoupleService.getTheme: Casal não encontrado para user_id:', userId)
        return { themeId: null, error: 'Casal não encontrado' }
      }

      const themeColors = couple.theme_colors as any
      const themeId = themeColors?.themeId || 'romantic-rose'

      console.log('🎨 CoupleService.getTheme: Tema encontrado via SINGLETON GLOBAL:', themeId, 'para user_id:', userId, 'instanceId:', this.instanceId, 'callId:', callId)
      return { themeId, error: null }
    } catch (error) {
      console.error('Error getting theme:', error)
      return { themeId: null, error: 'Erro interno' }
    }
  }

  /**
   * Publica/despublica site
   */
  async togglePublish(userId: string, isPublished: boolean) {
    try {
      const { error } = await this.supabase
        .from('couples')
        .update({ 
          is_published: isPublished,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId) // RLS automático

      if (error) {
        console.error('Error toggling publish:', error)
        return { success: false, error: 'Erro ao atualizar status' }
      }

      // Invalidar cache após mudança de status
      this.invalidateCache(userId)

      return { success: true }
    } catch (error) {
      console.error('Error in togglePublish:', error)
      return { success: false, error: 'Erro interno' }
    }
  }

  /**
   * Limpa todo o cache (útil para debug)
   */
  static clearAllCache() {
    GlobalCoupleManager.getInstance().clearCache()
  }
}

// Singleton instance
export const coupleService = new CoupleService() 