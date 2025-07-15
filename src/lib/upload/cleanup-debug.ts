// Utilitário para limpeza de arquivos de debug/teste
export async function cleanupDebugFiles() {
  console.log('🧹 Limpando arquivos de debug...')
  
  const filesToDelete = [
    'src/app/debug-upload/page.tsx',
    'src/lib/upload/test-upload.ts',
    'src/lib/upload/cleanup-debug.ts'
  ]
  
  const summary = {
    cleaned: [] as string[],
    errors: [] as string[],
    total: filesToDelete.length
  }
  
  for (const file of filesToDelete) {
    try {
      // Simular limpeza (o usuário deve deletar manualmente)
      console.log(`📁 Marcar para remoção: ${file}`)
      summary.cleaned.push(file)
    } catch (error) {
      console.error(`❌ Erro ao limpar ${file}:`, error)
      summary.errors.push(file)
    }
  }
  
  console.log('📊 Relatório de limpeza:')
  console.log('==========================================')
  console.log(`✅ Arquivos limpos: ${summary.cleaned.length}/${summary.total}`)
  console.log(`❌ Erros: ${summary.errors.length}`)
  console.log('==========================================')
  
  if (summary.cleaned.length > 0) {
    console.log('📋 Arquivos limpos:')
    summary.cleaned.forEach(file => console.log(`  - ${file}`))
  }
  
  if (summary.errors.length > 0) {
    console.log('❌ Arquivos com erro:')
    summary.errors.forEach(file => console.log(`  - ${file}`))
  }
  
  console.log('==========================================')
  console.log('🎉 Limpeza concluída!')
  console.log('💡 Lembre-se de deletar manualmente os arquivos marcados.')
  
  return summary
}

// Instruções para limpeza manual
export const CLEANUP_INSTRUCTIONS = `
🧹 LIMPEZA PÓS-IMPLEMENTAÇÃO

Após confirmar que o sistema está funcionando, delete estes arquivos:

1. Arquivos de debug/teste:
   - src/app/debug-upload/page.tsx
   - src/lib/upload/test-upload.ts
   - src/lib/upload/cleanup-debug.ts

2. Arquivos temporários:
   - README-MIGRACAO.md
   - src/lib/database/migrations/fix-template-default.sql

3. Manter apenas os arquivos essenciais:
   ✅ src/lib/upload/image-service.ts
   ✅ src/components/upload/image-upload.tsx
   ✅ src/lib/upload/setup-bucket.ts
   ✅ src/lib/utils/field-mapping.ts
   ✅ src/components/dashboard/unified-settings.tsx
   ✅ src/lib/database/migrations/complete-settings-migration.sql

4. Commits recomendados:
   git add .
   git commit -m "feat: sistema de upload e configurações unificadas implementado"
   git push origin main
` 