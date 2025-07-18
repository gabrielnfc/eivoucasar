'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

export interface AuthUser {
  id: string
  email: string
  emailSecondary?: string
  brideName?: string
  groomName?: string
  city?: string
  state?: string
  country?: string
  bridePhone?: string
  groomPhone?: string
  weddingDateTime?: string
  signupRole?: string
  slug?: string
  isProfileComplete?: boolean
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  initialized: boolean
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
  fastAuthCheck: () => Promise<boolean> // ✅ OTIMIZADO: Adicionar fast check na interface
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Use a single instance throughout the component
  const supabase = useMemo(() => createClient(), []);

  // ✅ OTIMIZADO: Cache local para evitar buscar dados repetidamente
  const [userCache, setUserCache] = useState<Map<string, { data: AuthUser; timestamp: number }>>(new Map());
  const CACHE_TTL = 60000; // 1 minuto de cache

  // ✅ OTIMIZADO: Fast check - apenas verificar se ainda está autenticado sem buscar dados
  const fastAuthCheck = useCallback(async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session?.user) {
        setUser(null);
        setInitialized(true);
        return false;
      }
      
      // Se já temos um usuário carregado com o mesmo ID, não precisa recarregar tudo
      if (user && user.id === session.user.id) {
        console.log('🔐 AuthContext: Fast auth check - user still valid');
        setInitialized(true);
        return true;
      }
      
      return false; // Precisa fazer refresh completo
    } catch (error) {
      console.error('AuthContext: Fast check error:', error);
      setUser(null);
      setInitialized(true);
      return false;
    }
  }, [supabase, user]);

  const refreshUser = useCallback(async (authUser?: User | null) => {
    try {
      // If user is provided, use it; otherwise fetch it
      let currentUser = authUser;
      if (!currentUser) {
        const { data: { user: fetchedUser }, error } = await supabase.auth.getUser();
        if (error) {
          console.log('AuthContext: Error fetching user:', error.message);
          setUser(null);
          return;
        }
        currentUser = fetchedUser;
      }

      if (!currentUser) {
        setUser(null);
        return;
      }

      // ✅ OTIMIZADO: Verificar cache primeiro antes de fazer qualquer busca
      const cacheKey = currentUser.id;
      const cached = userCache.get(cacheKey);
      if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
        console.log('🔐 AuthContext: Using cached user data (ultra fast)');
        setUser(cached.data);
        return;
      }

      // ✅ OTIMIZADO: Early exit se já temos o mesmo usuário
      if (user && currentUser.id === user.id && !cached) {
        console.log('🔐 AuthContext: Same user, skipping refresh');
        return;
      }

      // ✅ OTIMIZADO: Para casos de login inicial, usar dados do metadata primeiro
      // Isso evita ter que fazer chamada para o banco imediatamente
      let coupleData = null;
      
      // Tentar usar dados do user metadata primeiro (mais rápido)
      const metadata = currentUser.user_metadata || {};
      if (metadata.bride_name && metadata.groom_name) {
        console.log('🔐 AuthContext: Using metadata for initial load (faster)');
        coupleData = {
          bride_name: metadata.bride_name,
          groom_name: metadata.groom_name,
          wedding_datetime: metadata.wedding_datetime,
          city: metadata.city,
          state: metadata.state,
          country: metadata.country,
          bride_phone: metadata.bride_phone,
          groom_phone: metadata.groom_phone,
          signup_role: metadata.signup_role,
          email_secondary: metadata.email_secondary,
        };
      } else {
        // Fallback para busca no banco com timeout otimizado
        try {
          console.log('🔐 AuthContext: Buscando dados do casal via singleton para userId:', currentUser.id)
          const { coupleService } = await import('@/lib/database/couple-service')
          
          // ✅ OTIMIZADO: Timeout reduzido de 5s para 2s + retry inteligente
          const couplePromise = coupleService.getCoupleByUserId(currentUser.id, false, 'AuthContext')
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout ao buscar dados do casal')), 2000) // Reduzido para 2s
          )
          
          const { couple, error } = await Promise.race([couplePromise, timeoutPromise]) as any
          
          if (error) {
            console.log('🔐 AuthContext: No couple profile found - user needs to complete signup')
            coupleData = null
          } else {
            coupleData = couple
            console.log('🔐 AuthContext: ✅ Couple data loaded via singleton')
          }
        } catch (coupleError) {
          console.log('🔐 AuthContext: Error/timeout loading couple data:', coupleError);
          // ✅ IMPORTANTE: Não falhar o auth por causa de erro nos dados do casal
          // O usuário pode estar autenticado mesmo sem dados do casal completados
          coupleData = null;
        }
      }

      const userData: AuthUser = {
        id: currentUser.id,
        email: currentUser.email!,
        emailSecondary: coupleData?.email_secondary as string | undefined,
        brideName: coupleData?.bride_name as string | undefined,
        groomName: coupleData?.groom_name as string | undefined,
        city: coupleData?.city as string | undefined,
        state: coupleData?.state as string | undefined,
        country: coupleData?.country as string | undefined,
        bridePhone: coupleData?.bride_phone as string | undefined,
        groomPhone: coupleData?.groom_phone as string | undefined,
        weddingDateTime: coupleData?.wedding_datetime as string | undefined,
        signupRole: coupleData?.signup_role as string | undefined,
        slug: coupleData?.slug as string | undefined,
        isProfileComplete: !!coupleData,
      };

      // ✅ OTIMIZADO: Salvar no cache para próximas navigações
      setUserCache(prev => new Map(prev.set(cacheKey, { data: userData, timestamp: Date.now() })));
      setUser(userData);
    } catch (error) {
      console.error('AuthContext: Error refreshing user:', error);
      setUser(null);
    }
  }, [supabase, user, userCache, CACHE_TTL]);

  const handleSignOut = useCallback(async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  // Initial session check and auth state listener
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        // ✅ OTIMIZADO: Fazer fast check primeiro
        const fastCheckResult = await fastAuthCheck();
        if (fastCheckResult && isMounted) {
          // User ainda válido, não precisa fazer mais nada
          setLoading(false);
          return;
        }

        // Se fast check falhou, fazer verificação completa
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.log('AuthContext: Session error:', error.message);
        }

        if (session?.user && isMounted) {
          await refreshUser(session.user);
        } else if (isMounted) {
          setUser(null);
        }
      } catch (error) {
        console.log('AuthContext: Error initializing auth:', error);
        if (isMounted) {
          setUser(null);
        }
      } finally {
        // ✅ FIX: SEMPRE definir initialized como true, mesmo em caso de erro
        // Isso evita loading infinito quando há problemas na inicialização
        if (isMounted) {
          setLoading(false);
          setInitialized(true);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (!isMounted) return;

        console.log('AuthContext: Auth state change:', event);

        // Handle different auth events
        switch (event) {
          case 'SIGNED_IN':
            if (session?.user) {
              setLoading(true);
              await refreshUser(session.user);
              setLoading(false);
            }
            break;
          
          case 'SIGNED_OUT':
            setUser(null);
            setLoading(false);
            break;
          
          case 'TOKEN_REFRESHED':
            // Silent refresh - don't show loading
            if (session?.user) {
              await refreshUser(session.user);
            }
            break;
          
          default:
            // For other events like INITIAL_SESSION, let the initial check handle it
            break;
        }
      }
    );

    // Initialize auth state
    initializeAuth();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, refreshUser, fastAuthCheck]);

  const value = useMemo(() => ({
    user,
    loading,
    initialized,
    signOut: handleSignOut,
    refreshUser,
    fastAuthCheck, // ✅ OTIMIZADO: Expor fast check para uso externo
  }), [user, loading, initialized, handleSignOut, refreshUser, fastAuthCheck]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Simplified hook for pages that need auth - no automatic checking
export function useRequireAuth() {
  const auth = useAuth();
  
  // ✅ OTIMIZADO: Usar fast check primeiro, depois refresh se necessário
  useEffect(() => {
    if (!auth.initialized && !auth.loading) {
      console.log('useRequireAuth: Triggering optimized auth check');
      
      const doAuthCheck = async () => {
        try {
          // Usar fast check primeiro (ultra rápido)
          const fastResult = await auth.fastAuthCheck();
          if (!fastResult) {
            // Fast check falhou, fazer refresh completo
            console.log('useRequireAuth: Fast check failed, doing full refresh');
            await auth.refreshUser();
          } else {
            console.log('useRequireAuth: Fast check succeeded - user valid');
          }
        } catch (error) {
          console.error('useRequireAuth: Error in optimized auth check:', error);
        }
      };
      
      doAuthCheck();
    }
  }, [auth.initialized, auth.loading, auth.refreshUser, auth.fastAuthCheck]);
  
  return auth;
}
