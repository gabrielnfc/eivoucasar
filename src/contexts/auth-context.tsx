'use client';

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { User, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import type { AuthUser } from '@/lib/auth';

interface AuthContextType {
	user: AuthUser | null;
	loading: boolean;
	initialized: boolean;
	signOut: () => Promise<void>;
	refreshUser: () => Promise<void>;
	checkAuth: () => Promise<void>; // Nova função para verificação sob demanda
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [loading, setLoading] = useState(false); // Não começar carregando
	const [initialized, setInitialized] = useState(false);

	// Use a single instance throughout the component
	const supabase = useMemo(() => createClient(), []);

	const refreshUser = useCallback(async () => {
		try {
			setLoading(true);
			
			const {
				data: { user: authUser },
				error,
			} = await supabase.auth.getUser();

			if (error) {
				console.error('AuthContext: Erro ao buscar usuário:', error);
				// Só deslogar se for erro de token inválido, não de sessão missing
				if (error.message.includes('invalid') || error.message.includes('expired')) {
					setUser(null);
				}
				return;
			}

			if (!authUser) {
				setUser(null);
				return;
			}

			// Buscar dados do casal no banco
			let coupleData = null;
			try {
				const { data } = await supabase
					.from('couples')
					.select('*')
					.eq('user_id', authUser.id)
					.single();
				coupleData = data;
			} catch (coupleError) {
				console.log('AuthContext: Perfil de casal incompleto ou erro temporário');
				// Perfil de casal incompleto - será solicitado completar na UI
				coupleData = null;
			}

			const userData: AuthUser = {
				id: authUser.id,
				email: authUser.email!,
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
				isProfileComplete: !!coupleData, // Verdadeiro apenas se existe na tabela couples
			};

			setUser(userData);
		} catch (error) {
			console.error('AuthContext: Erro ao atualizar usuário:', error);
			// Em caso de erro de rede, não alterar estado do usuário
		} finally {
			setLoading(false);
		}
	}, [supabase]);

	// Nova função para verificação sob demanda
	const checkAuth = useCallback(async () => {
		if (initialized) return; // Só verificar uma vez
		
		try {
			setLoading(true);
			
			// Verificar se existe sessão ativa (sem forçar erro)
			const { data: { session }, error } = await supabase.auth.getSession();
			
			if (error) {
				console.log('AuthContext: Sem sessão ativa:', error.message);
				setUser(null);
				return;
			}

			if (session?.user) {
				// Só buscar dados completos se existe sessão
				await refreshUser();
			} else {
				setUser(null);
			}
		} catch (error) {
			console.log('AuthContext: Erro ao verificar sessão:', error);
			setUser(null);
		} finally {
			setLoading(false);
			setInitialized(true);
		}
	}, [supabase, refreshUser, initialized]);

	const handleSignOut = async () => {
		try {
			setLoading(true);
			await supabase.auth.signOut();
			setUser(null);
			setInitialized(false); // Reset para permitir nova verificação
		} catch (error) {
			console.error('Error signing out:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		let isMounted = true;

		// Verificação passiva de mudanças de auth (não força verificação inicial)
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
			if (!isMounted) return;

			console.log('AuthContext: Auth state change:', event);

			if (event === 'SIGNED_IN' && session?.user) {
				await refreshUser();
			} else if (event === 'SIGNED_OUT') {
				setUser(null);
				setInitialized(false);
			} else if (event === 'TOKEN_REFRESHED' && session?.user) {
				// Token foi renovado, atualizar dados do usuário
				await refreshUser();
			}
		});

		return () => {
			isMounted = false;
			subscription.unsubscribe();
		};
	}, [supabase, refreshUser]);

	const value = {
		user,
		loading,
		initialized,
		signOut: handleSignOut,
		refreshUser,
		checkAuth, // Nova função exportada
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}

// Hook especializado para páginas que NECESSITAM de autenticação
export function useRequireAuth() {
	const auth = useAuth();
	
	useEffect(() => {
		// Verificar autenticação quando hook for usado
		if (!auth.initialized) {
			auth.checkAuth();
		}
	}, [auth]);

	return auth;
}
