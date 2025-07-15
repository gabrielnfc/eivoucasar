import { imageService } from './image-service'

// Função para testar se o sistema de upload está funcionando
export async function testUploadSystem() {
  console.log('🧪 Testando sistema de upload...')
  
  try {
    // 1. Verificar se o bucket existe
    console.log('📁 Verificando bucket...')
    await imageService.initializeBucket()
    console.log('✅ Bucket verificado/criado')
    
    // 2. Criar um arquivo de teste pequeno
    console.log('📄 Criando arquivo de teste...')
    const testContent = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
    const response = await fetch(testContent)
    const blob = await response.blob()
    const testFile = new File([blob], 'test-upload.png', { type: 'image/png' })
    
    // 3. Fazer upload de teste
    console.log('📤 Fazendo upload de teste...')
    const testCoupleId = 'test-couple-' + Date.now()
    
    const uploadedUrl = await imageService.uploadImage(testFile, {
      coupleId: testCoupleId,
      type: 'couple',
      maxWidth: 800,
      maxHeight: 600,
      quality: 0.85
    })
    
    console.log('✅ Upload realizado com sucesso!')
    console.log('🔗 URL:', uploadedUrl)
    
    // 4. Verificar se o arquivo foi criado
    console.log('🔍 Verificando arquivo...')
    
    // Tentar fazer download do arquivo
    const downloadResponse = await fetch(uploadedUrl)
    if (downloadResponse.ok) {
      console.log('✅ Arquivo acessível via URL pública')
    } else {
      console.log('⚠️  Arquivo não acessível via URL pública')
    }
    
    // 5. Limpar arquivo de teste
    console.log('🧹 Limpando arquivo de teste...')
    await imageService.deleteImage(uploadedUrl, testCoupleId)
    console.log('✅ Arquivo de teste removido')
    
    console.log('🎉 TESTE CONCLUÍDO COM SUCESSO!')
    console.log('Sistema de upload está funcionando corretamente.')
    
    return {
      success: true,
      message: 'Sistema de upload funcionando corretamente',
      uploadedUrl
    }
    
  } catch (error) {
    console.error('❌ Erro no teste:', error)
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      error
    }
  }
}

// Função para diagnosticar problemas de upload
export async function diagnoseUploadIssues() {
  console.log('🔍 Diagnosticando problemas de upload...')
  
  const issues = []
  
  try {
    // 1. Verificar se o Supabase está conectado
    console.log('🔌 Verificando conexão com Supabase...')
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      issues.push({
        type: 'auth',
        message: 'Erro de autenticação: ' + error.message
      })
    } else if (!data.user) {
      issues.push({
        type: 'auth',
        message: 'Usuário não autenticado'
      })
    } else {
      console.log('✅ Usuário autenticado:', data.user.id)
    }
    
    // 2. Verificar se o bucket existe
    console.log('📁 Verificando bucket...')
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
    
    if (bucketError) {
      issues.push({
        type: 'storage',
        message: 'Erro ao acessar storage: ' + bucketError.message
      })
    } else {
      const weddingBucket = buckets?.find(b => b.name === 'wedding-images')
      if (!weddingBucket) {
        issues.push({
          type: 'bucket',
          message: 'Bucket wedding-images não encontrado'
        })
      } else {
        console.log('✅ Bucket wedding-images encontrado')
      }
    }
    
    // 3. Verificar políticas de storage
    console.log('🛡️  Verificando políticas...')
    try {
      const { data: policies } = await supabase.rpc('list_storage_policies')
      console.log('📋 Políticas encontradas:', Array.isArray(policies) ? policies.length : 0)
    } catch (error) {
      issues.push({
        type: 'policies',
        message: 'Não foi possível verificar políticas de storage'
      })
    }
    
    // 4. Verificar variáveis de ambiente
    console.log('🔧 Verificando variáveis de ambiente...')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl) {
      issues.push({
        type: 'env',
        message: 'NEXT_PUBLIC_SUPABASE_URL não configurada'
      })
    }
    
    if (!supabaseKey) {
      issues.push({
        type: 'env',
        message: 'NEXT_PUBLIC_SUPABASE_ANON_KEY não configurada'
      })
    }
    
    // 5. Relatório final
    console.log('📊 Relatório de diagnóstico:')
    console.log('==========================================')
    
    if (issues.length === 0) {
      console.log('✅ Nenhum problema encontrado!')
      console.log('O sistema de upload deve estar funcionando.')
    } else {
      console.log('❌ Problemas encontrados:')
      issues.forEach((issue, index) => {
        console.log(`${index + 1}. [${issue.type.toUpperCase()}] ${issue.message}`)
      })
    }
    
    console.log('==========================================')
    
    return {
      success: issues.length === 0,
      issues,
      totalIssues: issues.length
    }
    
  } catch (error) {
    console.error('❌ Erro no diagnóstico:', error)
    return {
      success: false,
      issues: [{
        type: 'system',
        message: 'Erro no sistema de diagnóstico: ' + (error instanceof Error ? error.message : 'Erro desconhecido')
      }],
      totalIssues: 1
    }
  }
}

// Função para executar ambos os testes
export async function runFullTest() {
  console.log('🚀 Executando teste completo do sistema de upload...')
  console.log('==========================================')
  
  // 1. Diagnóstico
  const diagnostic = await diagnoseUploadIssues()
  
  if (!diagnostic.success) {
    console.log('❌ Diagnóstico falhou. Corrija os problemas antes de continuar.')
    return diagnostic
  }
  
  // 2. Teste de upload
  const uploadTest = await testUploadSystem()
  
  return {
    success: uploadTest.success,
    diagnostic,
    uploadTest
  }
} 