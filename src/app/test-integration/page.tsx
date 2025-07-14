'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function TestIntegrationPage() {
  const [coupleData, setCoupleData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testSlug = 'joao-maria-2025' // Slug de exemplo

  const fetchCoupleData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/public/couples/${testSlug}`)
      const result = await response.json()
      
      if (result.success) {
        setCoupleData(result.data)
      } else {
        setError(result.error || 'Erro ao buscar dados')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        🧪 Teste de Integração - Dados Reais
      </h1>
      
      <div className="space-y-6">
        {/* Botão de Teste */}
        <div className="text-center">
          <Button 
            onClick={fetchCoupleData}
            disabled={loading}
            className="px-8 py-3 text-lg"
          >
            {loading ? 'Carregando...' : 'Testar API de Dados do Casal'}
          </Button>
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-bold text-red-800 mb-2">❌ Erro</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Dados do Casal */}
        {coupleData && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-bold text-green-800 mb-4">✅ Dados Reais Carregados</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Informações Básicas</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong>ID:</strong> {coupleData.id}</li>
                  <li><strong>Slug:</strong> {coupleData.slug}</li>
                  <li><strong>Noiva:</strong> {coupleData.brideName}</li>
                  <li><strong>Noivo:</strong> {coupleData.groomName}</li>
                  <li><strong>Data:</strong> {new Date(coupleData.weddingDateTime).toLocaleDateString('pt-BR')}</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Localização</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong>Cidade:</strong> {coupleData.city}</li>
                  <li><strong>Estado:</strong> {coupleData.state}</li>
                  <li><strong>País:</strong> {coupleData.country}</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Locais</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong>Cerimônia:</strong> {coupleData.ceremonyVenue || 'Não informado'}</li>
                  <li><strong>Recepção:</strong> {coupleData.receptionVenue || 'Não informado'}</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Contato</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong>Email:</strong> {coupleData.email}</li>
                  <li><strong>Email Secundário:</strong> {coupleData.emailSecondary || 'Não informado'}</li>
                  <li><strong>Telefone Noiva:</strong> {coupleData.bridePhone || 'Não informado'}</li>
                  <li><strong>Telefone Noivo:</strong> {coupleData.groomPhone || 'Não informado'}</li>
                </ul>
              </div>
            </div>

            {/* Mensagem de Boas-Vindas */}
            {coupleData.welcomeMessage && (
              <div className="mt-4 p-4 bg-white rounded border">
                <h4 className="font-semibold text-gray-700 mb-2">Mensagem de Boas-Vindas</h4>
                <p className="text-sm text-gray-600">{coupleData.welcomeMessage}</p>
              </div>
            )}

            {/* História do Casal */}
            {coupleData.story && (
              <div className="mt-4 p-4 bg-white rounded border">
                <h4 className="font-semibold text-gray-700 mb-2">História do Casal</h4>
                <p className="text-sm text-gray-600">{coupleData.story}</p>
              </div>
            )}

            {/* Cores do Tema */}
            {coupleData.themeColors && (
              <div className="mt-4 p-4 bg-white rounded border">
                <h4 className="font-semibold text-gray-700 mb-2">Cores do Tema</h4>
                <div className="flex gap-2">
                  {Object.entries(coupleData.themeColors).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div 
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: value as string }}
                      />
                      <span className="text-xs text-gray-600">{key}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Instruções */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-800 mb-4">📋 Como Testar</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-700">
            <li>Clique no botão "Testar API de Dados do Casal" para buscar dados reais</li>
            <li>Verifique se os dados aparecem corretamente</li>
            <li>Se houver erro, verifique se existe um casal com o slug '{testSlug}' no banco</li>
            <li>Vá para /{testSlug} para ver o template com dados reais</li>
          </ol>
        </div>

        {/* Status */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">🔄 Status da Integração</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl">✅</div>
              <div className="text-sm font-medium">API Criada</div>
              <div className="text-xs text-gray-600">/api/public/couples/[slug]</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">✅</div>
              <div className="text-sm font-medium">Template Real</div>
              <div className="text-xs text-gray-600">createRealTemplate()</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">✅</div>
              <div className="text-sm font-medium">Renderer Atualizado</div>
              <div className="text-xs text-gray-600">TemplateRenderer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 