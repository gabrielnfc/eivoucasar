import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { coupleService } from '@/lib/database/couple-service'
import type { Couple } from '@/types'

// 🌟 SINGLETON REACT GLOBAL - Um único estado compartilhado entre todas as instâncias do hook
declare global {
  var __REACT_COUPLE_SINGLETON__: {
    couple: Couple | null
    isLoading: boolean
    error: string | null
    subscribers: Set<(data: { couple: Couple | null; isLoading: boolean; error: string | null; initialized: boolean }) => void>
    lastUserId: string | undefined
    isFetching: boolean
    initialized: boolean
  } | undefined
}

class ReactCoupleSingleton {
  private static instance: ReactCoupleSingleton

  static getInstance(): ReactCoupleSingleton {
    if (!ReactCoupleSingleton.instance) {
      ReactCoupleSingleton.instance = new ReactCoupleSingleton()
    }
    return ReactCoupleSingleton.instance
  }

  private getGlobalState() {
    if (!globalThis.__REACT_COUPLE_SINGLETON__) {
      globalThis.__REACT_COUPLE_SINGLETON__ = {
        couple: null,
        isLoading: false,
        error: null,
        subscribers: new Set(),
        lastUserId: undefined,
        isFetching: false,
        initialized: false
      }
      console.log('🌟 REACT COUPLE SINGLETON: Estado global criado')
    }
    return globalThis.__REACT_COUPLE_SINGLETON__
  }

  subscribe(callback: (data: { couple: Couple | null; isLoading: boolean; error: string | null; initialized: boolean }) => void) {
    const state = this.getGlobalState()
    state.subscribers.add(callback)
    console.log('📡 REACT SINGLETON: Subscriber adicionado, total:', state.subscribers.size)
    
    // Retornar função de cleanup
    return () => {
      state.subscribers.delete(callback)
      console.log('📡 REACT SINGLETON: Subscriber removido, total:', state.subscribers.size)
    }
  }

  private notifySubscribers() {
    const state = this.getGlobalState()
    const data = {
      couple: state.couple,
      isLoading: state.isLoading,
      error: state.error,
      initialized: state.initialized
    }
    
    console.log('📢 REACT SINGLETON: Notificando', state.subscribers.size, 'subscribers')
    state.subscribers.forEach(callback => callback(data))
  }

  async fetchCouple(userId: string, bypassCache = false) {
    const state = this.getGlobalState()
    
    if (!userId) {
      console.log('🚫 REACT SINGLETON: No userId provided')
      return
    }

    // Evitar fetch se já estamos buscando ou userId não mudou
    if ((state.isFetching && state.lastUserId === userId) || 
        (!bypassCache && state.lastUserId === userId && state.initialized)) {
      console.log('🚫 REACT SINGLETON: Fetch evitado', {
        isFetching: state.isFetching,
        sameUser: state.lastUserId === userId,
        initialized: state.initialized
      })
      return
    }

    console.log('🚀 REACT SINGLETON: Iniciando fetch para userId:', userId)
    
    state.isFetching = true
    state.isLoading = true
    state.error = null
    state.lastUserId = userId
    this.notifySubscribers()

    try {
      const { couple, error } = await coupleService.getCoupleByUserId(userId, bypassCache, 'useCouple')
      
      state.couple = couple
      state.error = error
      state.isLoading = false
      state.isFetching = false
      state.initialized = true

      console.log('✅ REACT SINGLETON: Fetch concluído', {
        hasCouple: !!couple,
        error
      })

      this.notifySubscribers()
    } catch (error) {
      console.error('💥 REACT SINGLETON: Erro no fetch:', error)
      
      state.error = 'Erro interno'
      state.isLoading = false
      state.isFetching = false
      
      this.notifySubscribers()
    }
  }

  getCurrentState() {
    const state = this.getGlobalState()
    return {
      couple: state.couple,
      isLoading: state.isLoading,
      error: state.error,
      initialized: state.initialized
    }
  }

  updateLocalCouple(newData: Partial<Couple>) {
    const state = this.getGlobalState()
    if (state.couple) {
      state.couple = { ...state.couple, ...newData }
      this.notifySubscribers()
      console.log('🔄 REACT SINGLETON: Dados locais atualizados')
    }
  }
}

const reactCoupleSingleton = ReactCoupleSingleton.getInstance()

export function useCouple(userId: string | undefined) {
  const hookId = useMemo(() => Math.random().toString(36).substr(2, 9), [])
  
  // Estado local que será sincronizado com o singleton
  const [localState, setLocalState] = useState(() => {
    const currentState = reactCoupleSingleton.getCurrentState()
    console.log('🎯 useCouple: Hook criado', {
      hookId,
      userId,
      currentState: {
        hasCouple: !!currentState.couple,
        isLoading: currentState.isLoading,
        error: currentState.error,
        initialized: currentState.initialized
      }
    })
    return currentState
  })

  // Subscribir-se ao singleton
  useEffect(() => {
    console.log('🔗 useCouple: Subscribing to singleton', { hookId, userId })
    
    const unsubscribe = reactCoupleSingleton.subscribe((data) => {
      console.log('📨 useCouple: Recebendo atualização do singleton', {
        hookId,
        hasCouple: !!data.couple,
        isLoading: data.isLoading,
        error: data.error
      })
      setLocalState(data)
    })

    return () => {
      console.log('🔗 useCouple: Unsubscribing from singleton', { hookId })
      unsubscribe()
    }
  }, [hookId])

  // Iniciar fetch quando userId mudar
  useEffect(() => {
    if (userId) {
      console.log('🎯 useCouple: Requesting fetch', { hookId, userId })
      reactCoupleSingleton.fetchCouple(userId)
    }
  }, [userId, hookId])

  const refreshCouple = useCallback(async () => {
    if (userId) {
      console.log('🔄 useCouple: Manual refresh', { hookId, userId })
      await reactCoupleSingleton.fetchCouple(userId, true)
    }
  }, [userId, hookId])

  const updateLocalCouple = useCallback((newData: Partial<Couple>) => {
    console.log('📝 useCouple: Updating local data', { hookId, newData })
    reactCoupleSingleton.updateLocalCouple(newData)
  }, [hookId])

  console.log('🎯 useCouple: Render', {
    hookId,
    userId,
    hasCouple: !!localState.couple,
    isLoading: localState.isLoading,
    error: localState.error
  })

  return useMemo(() => ({
    couple: localState.couple,
    isLoading: localState.isLoading,
    error: localState.error,
    refreshCouple,
    updateLocalCouple
  }), [localState.couple, localState.isLoading, localState.error, refreshCouple, updateLocalCouple])
} 