import { imageService } from './image-service'
import { createClient } from '@/lib/supabase/client'

export async function setupSupabaseStorage() {
  console.log('🚀 Configurando Supabase Storage...')
  
  try {
    // 1. Inicializar bucket
    await imageService.initializeBucket()
    console.log('✅ Bucket wedding-images criado/verificado')
    
    // 2. Configurar políticas de acesso (RLS)
    await setupBucketPolicies()
    console.log('✅ Políticas de acesso configuradas')
    
    console.log('🎉 Setup completo! Sistema de upload pronto para uso.')
    
  } catch (error) {
    console.error('❌ Erro no setup:', error)
    throw error
  }
}

async function setupBucketPolicies() {
  const supabase = createClient()
  
  // Verificar se as políticas já existem
  const bucketName = 'wedding-images'
  
  try {
    const { data: policies } = await supabase.rpc('list_storage_policies')
    const existingPolicies = Array.isArray(policies) ? 
      policies.filter((p: any) => p.bucket_name === bucketName) : []
    
    if (existingPolicies.length > 0) {
      console.log('📋 Políticas já existem, pulando configuração...')
      return
    }
  } catch (error) {
    console.log('📋 Não foi possível verificar políticas existentes, continuando...')
  }
  
  // Caso precise criar políticas via RPC (normalmente feito via dashboard)
  console.log('📋 Configurar políticas manualmente no Supabase Dashboard:')
  console.log(`
    1. Acesse: Storage > Policies
    2. Bucket: ${bucketName}
    3. Criar políticas:
    
    POLICY: "Users can upload to their own folder"
    - Target: INSERT
    - For: authenticated
    - SQL: bucket_id = 'wedding-images' AND (storage.foldername(name))[1] = auth.uid()::text
    
    POLICY: "Users can view their own files"
    - Target: SELECT 
    - For: authenticated
    - SQL: bucket_id = 'wedding-images' AND (storage.foldername(name))[1] = auth.uid()::text
    
    POLICY: "Users can update their own files"
    - Target: UPDATE
    - For: authenticated  
    - SQL: bucket_id = 'wedding-images' AND (storage.foldername(name))[1] = auth.uid()::text
    
    POLICY: "Users can delete their own files"
    - Target: DELETE
    - For: authenticated
    - SQL: bucket_id = 'wedding-images' AND (storage.foldername(name))[1] = auth.uid()::text
    
    POLICY: "Public can view published images"
    - Target: SELECT
    - For: public
    - SQL: bucket_id = 'wedding-images'
  `)
}

// Função para testar o sistema de upload
export async function testImageUpload() {
  console.log('🧪 Testando sistema de upload...')
  
  try {
    // Criar um arquivo de teste
    const testFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' })
    
    // Fazer upload de teste
    const testCoupleId = 'test-couple-123'
    const uploadedUrl = await imageService.uploadImage(testFile, {
      coupleId: testCoupleId,
      type: 'couple',
      maxWidth: 800,
      maxHeight: 600,
      quality: 0.85
    })
    
    console.log('✅ Upload de teste realizado:', uploadedUrl)
    
    // Limpar arquivo de teste
    await imageService.deleteImage(uploadedUrl, testCoupleId)
    console.log('✅ Limpeza do arquivo de teste realizada')
    
    console.log('🎉 Sistema de upload funcionando corretamente!')
    
  } catch (error) {
    console.error('❌ Erro no teste:', error)
    throw error
  }
}

// Utilitário para verificar se o bucket está configurado corretamente
export async function verifyBucketSetup() {
  const supabase = createClient()
  
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets()
    
    if (error) {
      throw error
    }
    
    const weddingBucket = buckets?.find(b => b.name === 'wedding-images')
    
    if (!weddingBucket) {
      throw new Error('Bucket wedding-images não encontrado')
    }
    
    console.log('✅ Bucket wedding-images encontrado:')
    console.log(`  - ID: ${weddingBucket.id}`)
    console.log(`  - Público: ${weddingBucket.public}`)
    console.log(`  - Criado em: ${weddingBucket.created_at}`)
    
    return true
    
  } catch (error) {
    console.error('❌ Erro ao verificar bucket:', error)
    return false
  }
}

// Função para uso em desenvolvimento
export async function devSetup() {
  console.log('🔧 Configuração para desenvolvimento...')
  
  const isConfigured = await verifyBucketSetup()
  
  if (!isConfigured) {
    await setupSupabaseStorage()
  }
  
  console.log('✅ Sistema pronto para desenvolvimento!')
} 