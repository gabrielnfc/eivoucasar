import { createClient } from '@/lib/supabase/client'

// Diagnóstico específico para problemas de autenticação e RLS
export async function diagnoseAuthAndRLS() {
  console.log('🔍 Diagnosticando autenticação e RLS...')
  
  const supabase = createClient()
  const issues = []
  
  try {
    // 1. Verificar autenticação
    console.log('🔐 Verificando autenticação...')
    const { data: authData, error: authError } = await supabase.auth.getUser()
    
    if (authError) {
      issues.push({
        type: 'auth-error',
        message: 'Erro ao verificar autenticação: ' + authError.message,
        solution: 'Faça login novamente'
      })
    } else if (!authData?.user) {
      issues.push({
        type: 'not-authenticated',
        message: 'Usuário não autenticado',
        solution: 'Faça login antes de fazer upload'
      })
    } else {
      console.log('✅ Usuário autenticado:', authData.user.id)
      console.log('📧 Email:', authData.user.email)
    }
    
    // 2. Verificar session
    console.log('🎫 Verificando session...')
    const { data: sessionData } = await supabase.auth.getSession()
    
    if (!sessionData?.session) {
      issues.push({
        type: 'no-session',
        message: 'Sessão não encontrada',
        solution: 'Faça login para criar uma sessão válida'
      })
    } else {
      console.log('✅ Sessão válida, expires:', sessionData.session.expires_at)
    }
    
    // 3. Verificar bucket
    console.log('📁 Verificando bucket...')
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
    
    if (bucketError) {
      issues.push({
        type: 'bucket-error',
        message: 'Erro ao acessar buckets: ' + bucketError.message,
        solution: 'Verifique permissões do banco de dados'
      })
    } else {
      const weddingBucket = buckets?.find(b => b.name === 'wedding-images')
      if (!weddingBucket) {
        issues.push({
          type: 'bucket-missing',
          message: 'Bucket wedding-images não encontrado',
          solution: 'Execute o script de migração SQL'
        })
      } else {
        console.log('✅ Bucket encontrado:', weddingBucket)
      }
    }
    
    // 4. Testar upload simples
    if (authData?.user && !issues.some(i => i.type.includes('auth'))) {
      console.log('📤 Testando upload simples...')
      
      try {
        // Criar arquivo de teste muito simples
        const testData = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]) // PNG header
        const testFile = new File([testData], 'test.png', { type: 'image/png' })
        
        const testPath = `${authData.user.id}/test-${Date.now()}.png`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('wedding-images')
          .upload(testPath, testFile, {
            cacheControl: '3600',
            upsert: true
          })
        
        if (uploadError) {
          issues.push({
            type: 'upload-error',
            message: 'Erro no upload de teste: ' + uploadError.message,
            solution: 'Execute o script de correção de RLS'
          })
        } else {
          console.log('✅ Upload de teste funcionou:', uploadData.path)
          
          // Limpar arquivo de teste
          await supabase.storage
            .from('wedding-images')
            .remove([testPath])
        }
      } catch (uploadError) {
        issues.push({
          type: 'upload-exception',
          message: 'Exceção no upload: ' + (uploadError as Error).message,
          solution: 'Verifique configuração do Supabase'
        })
      }
    }
    
    // 5. Relatório final
    console.log('📊 Relatório de diagnóstico:')
    console.log('==========================================')
    
    if (issues.length === 0) {
      console.log('✅ Nenhum problema encontrado!')
      console.log('O sistema de autenticação e RLS está funcionando.')
    } else {
      console.log('❌ Problemas encontrados:')
      issues.forEach((issue, index) => {
        console.log(`${index + 1}. [${issue.type.toUpperCase()}] ${issue.message}`)
        console.log(`   💡 Solução: ${issue.solution}`)
      })
    }
    
    console.log('==========================================')
    
    return {
      success: issues.length === 0,
      issues,
      authenticated: !!authData?.user,
      userId: authData?.user?.id,
      userEmail: authData?.user?.email
    }
    
  } catch (error) {
    console.error('❌ Erro no diagnóstico:', error)
    return {
      success: false,
      issues: [{
        type: 'diagnostic-error',
        message: 'Erro no diagnóstico: ' + (error instanceof Error ? error.message : 'Erro desconhecido'),
        solution: 'Verifique a configuração do Supabase'
      }],
      authenticated: false,
      userId: null,
      userEmail: null
    }
  }
}

// Função para forçar reautenticação
export async function forceReauth() {
  console.log('🔄 Forçando reautenticação...')
  
  const supabase = createClient()
  
  try {
    // Limpar sessão atual
    await supabase.auth.signOut()
    
    // Redirecionar para login
    window.location.href = '/login'
    
  } catch (error) {
    console.error('❌ Erro ao forçar reautenticação:', error)
    throw error
  }
}

// Função para verificar se o usuário está logado
export async function isUserAuthenticated() {
  const supabase = createClient()
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return {
      authenticated: !!user,
      userId: user?.id,
      userEmail: user?.email
    }
  } catch (error) {
    console.error('❌ Erro ao verificar autenticação:', error)
    return {
      authenticated: false,
      userId: null,
      userEmail: null
    }
  }
} 