'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TestAuthPage() {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getUser()
      
      if (error) {
        setResult(`Erro: ${error.message}`)
      } else {
        setResult(`Sucesso: ${data.user ? 'Usuário logado' : 'Nenhum usuário'}`)
      }
    } catch (error) {
      setResult(`Erro de conexão: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const testLogin = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'test123'
      })
      
      if (error) {
        setResult(`Erro de login: ${error.message}`)
      } else {
        setResult(`Login OK: ${data.user?.email}`)
      }
    } catch (error) {
      setResult(`Erro de login: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Teste de Autenticação</h1>
      
      <div className="space-y-4">
        <button
          onClick={testConnection}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? 'Testando...' : 'Testar Conexão'}
        </button>
        
        <button
          onClick={testLogin}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400 ml-4"
        >
          {loading ? 'Testando...' : 'Testar Login (fake)'}
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Resultado:</h3>
        <pre className="text-sm">{result}</pre>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-100 rounded">
        <h3 className="font-semibold mb-2">Variáveis de Ambiente:</h3>
        <pre className="text-sm">
          SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Definida' : 'Não definida'}
          {'\n'}
          SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Definida' : 'Não definida'}
        </pre>
      </div>
    </div>
  )
}