'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { createClient } from '@/lib/supabase/client'

export default function DebugAuthPage() {
  const { user, loading } = useAuth()
  const [coupleData, setCoupleData] = useState<any>(null)
  const [authData, setAuthData] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      
      // Verificar autenticação
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      const { data: { user: authUser }, error: userError } = await supabase.auth.getUser()
      
      setAuthData({
        session,
        sessionError,
        authUser,
        userError
      })
      
      // Buscar dados do casal
      if (authUser) {
        const { data: couple, error: coupleError } = await supabase
          .from('couples')
          .select('*')
          .eq('user_id', authUser.id)
          .single()
        
        setCoupleData({ couple, coupleError })
      }
    }
    
    if (!loading) {
      checkAuth()
    }
  }, [loading])

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🔍 Debug - Autenticação</h1>
      
      {/* Auth Context */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-2">Auth Context</h2>
        <pre className="text-sm overflow-auto">
          {JSON.stringify({ user, loading }, null, 2)}
        </pre>
      </div>
      
      {/* Supabase Auth */}
      <div className="mb-6 p-4 bg-blue-100 rounded">
        <h2 className="text-xl font-semibold mb-2">Supabase Auth</h2>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(authData, null, 2)}
        </pre>
      </div>
      
      {/* Couple Data */}
      <div className="mb-6 p-4 bg-green-100 rounded">
        <h2 className="text-xl font-semibold mb-2">Couple Data</h2>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(coupleData, null, 2)}
        </pre>
      </div>
      
      {/* IDs Summary */}
      <div className="mb-6 p-4 bg-yellow-100 rounded">
        <h2 className="text-xl font-semibold mb-2">IDs Summary</h2>
        <ul className="text-sm space-y-1">
          <li><strong>Auth User ID:</strong> {authData?.authUser?.id || 'N/A'}</li>
          <li><strong>Context User ID:</strong> {user?.id || 'N/A'}</li>
          <li><strong>Couple ID:</strong> {coupleData?.couple?.id || 'N/A'}</li>
          <li><strong>Couple User ID:</strong> {coupleData?.couple?.user_id || 'N/A'}</li>
          <li><strong>IDs Match:</strong> {
            authData?.authUser?.id === coupleData?.couple?.user_id ? '✅ YES' : '❌ NO'
          }</li>
        </ul>
      </div>
    </div>
  )
} 