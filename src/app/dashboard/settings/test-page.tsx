'use client'

import { useAuth } from '@/contexts/auth-context'

export default function TestPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="p-6">
      <h1>Teste de Autenticação</h1>
      <p>User: {user ? JSON.stringify(user, null, 2) : 'Nenhum usuário'}</p>
    </div>
  )
}