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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Use a single instance throughout the component
  const supabase = useMemo(() => createClient(), []);

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

      // 🌟 OTIMIZAÇÃO: Usar singleton do CoupleService ao invés de chamada direta
      let coupleData = null;
      try {
        console.log('🔐 AuthContext: Buscando dados do casal via singleton para userId:', currentUser.id)
        const { coupleService } = await import('@/lib/database/couple-service')
        const { couple, error } = await coupleService.getCoupleByUserId(currentUser.id, false, 'AuthContext')
        
        if (error) {
          console.log('🔐 AuthContext: No couple profile found - user needs to complete signup')
          coupleData = null
        } else {
          coupleData = couple
          console.log('🔐 AuthContext: ✅ Couple data loaded via singleton')
        }
      } catch (coupleError) {
        console.log('🔐 AuthContext: Error loading couple data:', coupleError);
        coupleData = null;
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

      setUser(userData);
    } catch (error) {
      console.error('AuthContext: Error refreshing user:', error);
      setUser(null);
    }
  }, [supabase]);

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
        // Get initial session
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
  }, [supabase, refreshUser]);

  const value = useMemo(() => ({
    user,
    loading,
    initialized,
    signOut: handleSignOut,
    refreshUser,
  }), [user, loading, initialized, handleSignOut, refreshUser]);

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
  
  // Simply return the auth state - let the component handle redirects
  return auth;
}
