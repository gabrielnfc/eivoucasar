'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface CoupleDebugData {
  id: string
  slug: string
  bride_name: string
  groom_name: string
  wedding_date: string
  is_active: boolean
  created_at: string
}

export default function DebugCouplesPage() {
  const [couples, setCouples] = useState<CoupleDebugData[]>([])
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')

  const fetchCouples = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await fetch('/api/couples/debug')
      const result = await response.json()
      
      if (result.success) {
        setCouples(result.data)
        setMessage(`${result.data.length} casais encontrados`)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar casais')
    } finally {
      setLoading(false)
    }
  }

  const createTestCouple = async () => {
    try {
      setCreating(true)
      setError('')
      
      const response = await fetch('/api/couples/create-test', {
        method: 'POST'
      })
      const result = await response.json()
      
      if (result.success) {
        setMessage(result.message)
        // Recarregar lista
        await fetchCouples()
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar casal de teste')
    } finally {
      setCreating(false)
    }
  }

  const testCouple = async (slug: string) => {
    try {
      const response = await fetch(`/api/public/couples/${slug}`)
      const result = await response.json()
      
      if (result.success) {
        setMessage(`✅ Casal ${slug} carregou com sucesso: ${result.data.brideName} & ${result.data.groomName}`)
      } else {
        setError(`❌ Erro ao carregar casal ${slug}: ${result.error}`)
      }
    } catch (err) {
      setError(`❌ Erro na API para ${slug}: ${err instanceof Error ? err.message : 'Erro desconhecido'}`)
    }
  }

  useEffect(() => {
    fetchCouples()
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        🛠️ Debug de Casais
      </h1>
      
      {/* Mensagens */}
      {message && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">{message}</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}
      
      {/* Ações */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Ações</h2>
        <div className="flex gap-4">
          <Button 
            onClick={fetchCouples}
            disabled={loading}
            variant="outline"
          >
            {loading ? 'Carregando...' : 'Recarregar Casais'}
          </Button>
          
          <Button 
            onClick={createTestCouple}
            disabled={creating}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {creating ? 'Criando...' : 'Criar Casal de Teste'}
          </Button>
          
          <a
            href="/api/test-supabase"
            target="_blank"
            className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium"
          >
            Testar Conexão Supabase
          </a>
        </div>
      </div>
      
      {/* Lista de Casais */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Casais no Banco ({couples.length})
        </h2>
        
        {couples.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg mb-4">Nenhum casal encontrado</p>
            <p className="text-sm">Clique em "Criar Casal de Teste" para começar</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Slug</th>
                  <th className="text-left py-2">Nomes</th>
                  <th className="text-left py-2">Data do Casamento</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {couples.map((couple) => (
                  <tr key={couple.id} className="border-b">
                    <td className="py-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {couple.slug}
                      </code>
                    </td>
                    <td className="py-2">
                      {couple.bride_name} & {couple.groom_name}
                    </td>
                    <td className="py-2">
                      {new Date(couple.wedding_date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        couple.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {couple.is_active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="py-2">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => testCouple(couple.slug)}
                        >
                          Testar API
                        </Button>
                        <a
                          href={`/${couple.slug}`}
                          target="_blank"
                          className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                        >
                          Ver Site
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Informações Úteis */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">
          📋 Informações Úteis
        </h3>
        <ul className="text-sm text-blue-700 space-y-2">
          <li>• <strong>API de Debug:</strong> <code>/api/couples/debug</code></li>
            <li>• <strong>API Pública por Slug:</strong> <code>/api/public/couples/[slug]</code></li>
            <li>• <strong>API Privada por ID:</strong> <code>/api/couples/[coupleId]</code></li>
          <li>• <strong>Criar Teste:</strong> <code>/api/couples/create-test</code></li>
          <li>• <strong>Testar Supabase:</strong> <code>/api/test-supabase</code></li>
          <li>• <strong>Editor:</strong> <code>/dashboard/settings</code></li>
          <li>• <strong>Site do Casal:</strong> <code>/[slug]</code></li>
          <li>• <strong>Debug Page:</strong> <code>/debug-couples</code></li>
        </ul>
      </div>
    </div>
  )
} 