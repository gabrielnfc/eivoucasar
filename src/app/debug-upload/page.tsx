'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ImageUpload } from '@/components/upload/image-upload'
import { runFullTest, testUploadSystem, diagnoseUploadIssues } from '@/lib/upload/test-upload'
import { diagnoseAuthAndRLS, forceReauth, isUserAuthenticated } from '@/lib/upload/auth-diagnostic'

export default function DebugUploadPage() {
  const [testResults, setTestResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const runDiagnostic = async () => {
    setIsLoading(true)
    try {
      const results = await diagnoseUploadIssues()
      setTestResults({ type: 'diagnostic', ...results })
    } catch (error) {
      setTestResults({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Erro desconhecido' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const runUploadTest = async () => {
    setIsLoading(true)
    try {
      const results = await testUploadSystem()
      setTestResults({ type: 'upload-test', ...results })
    } catch (error) {
      setTestResults({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Erro desconhecido' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const runFullTestSuite = async () => {
    setIsLoading(true)
    try {
      const results = await runFullTest()
      setTestResults({ type: 'full-test', ...results })
    } catch (error) {
      setTestResults({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Erro desconhecido' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const runAuthDiagnostic = async () => {
    setIsLoading(true)
    try {
      const results = await diagnoseAuthAndRLS()
      setTestResults({ type: 'auth-diagnostic', ...results })
    } catch (error) {
      setTestResults({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Erro desconhecido' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReauth = async () => {
    try {
      await forceReauth()
    } catch (error) {
      console.error('Erro ao reautenticar:', error)
    }
  }

  const checkAuth = async () => {
    const authStatus = await isUserAuthenticated()
    console.log('Status de autenticação:', authStatus)
    setTestResults({ type: 'auth-status', ...authStatus })
  }

  const handleImageUpload = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    console.log('✅ Imagem carregada:', imageUrl)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🧪 Debug - Sistema de Upload
          </h1>
          <p className="text-gray-600">
            Teste e diagnóstico do sistema de upload de imagens
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Seção de Testes */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">🔍 Testes Automáticos</h2>
            
            <div className="space-y-4">
              <Button 
                onClick={checkAuth}
                disabled={isLoading}
                className="w-full"
                variant="outline"
              >
                {isLoading ? 'Executando...' : '🔐 Verificar Autenticação'}
              </Button>

              <Button 
                onClick={runAuthDiagnostic}
                disabled={isLoading}
                className="w-full"
                variant="outline"
              >
                {isLoading ? 'Executando...' : '🛡️ Diagnóstico RLS'}
              </Button>

              <Button 
                onClick={runDiagnostic}
                disabled={isLoading}
                className="w-full"
                variant="outline"
              >
                {isLoading ? 'Executando...' : '🏥 Diagnóstico Geral'}
              </Button>

              <Button 
                onClick={runUploadTest}
                disabled={isLoading}
                className="w-full"
                variant="outline"
              >
                {isLoading ? 'Executando...' : '📤 Teste de Upload'}
              </Button>

              <Button 
                onClick={runFullTestSuite}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Executando...' : '🚀 Teste Completo'}
              </Button>

              <Button 
                onClick={handleReauth}
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                variant="secondary"
              >
                🔄 Fazer Login Novamente
              </Button>
            </div>
          </Card>

          {/* Seção de Upload Manual */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">📤 Teste Manual</h2>
            
            <div className="space-y-4">
                             <ImageUpload
                 onImageChange={handleImageUpload}
                 currentImage={selectedImage || undefined}
                 coupleId="debug-couple"
                 type="couple"
                 aspectRatio="square"
               />

              {selectedImage && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✅ Upload realizado com sucesso!
                  </p>
                  <p className="text-xs text-green-600 mt-1 break-all">
                    {selectedImage}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Resultados dos Testes */}
        {testResults && (
          <Card className="mt-8 p-6">
            <h2 className="text-xl font-semibold mb-4">📊 Resultados</h2>
            
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto">
              <pre className="text-sm">
                {JSON.stringify(testResults, null, 2)}
              </pre>
            </div>

            {testResults.type === 'diagnostic' && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">
                  Status: {testResults.success ? '✅ Sucesso' : '❌ Problemas Encontrados'}
                </h3>
                
                {testResults.issues && testResults.issues.length > 0 && (
                  <div className="space-y-2">
                    {testResults.issues.map((issue: any, index: number) => (
                      <div key={index} className="p-2 bg-red-50 rounded text-red-800">
                        <strong>[{issue.type.toUpperCase()}]</strong> {issue.message}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {testResults.type === 'upload-test' && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">
                  Upload Test: {testResults.success ? '✅ Sucesso' : '❌ Falhou'}
                </h3>
                <p className="text-sm text-gray-600">
                  {testResults.message}
                </p>
              </div>
            )}
          </Card>
        )}

        {/* Instruções */}
        <Card className="mt-8 p-6">
          <h2 className="text-xl font-semibold mb-4">📋 Instruções</h2>
          
          <div className="space-y-3 text-sm">
            <div>
              <strong>1. Diagnóstico:</strong> Verifica se o Supabase está configurado corretamente
            </div>
            <div>
              <strong>2. Teste de Upload:</strong> Faz upload de uma imagem de teste
            </div>
            <div>
              <strong>3. Teste Completo:</strong> Executa diagnóstico + teste de upload
            </div>
            <div>
              <strong>4. Teste Manual:</strong> Arraste uma imagem para testar o componente
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded">
            <p className="text-sm text-blue-800">
              💡 <strong>Dica:</strong> Abra o console do navegador (F12) para ver logs detalhados
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
} 