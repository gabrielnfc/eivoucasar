'use client';

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { User, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import type { AuthUser } from '@/lib/auth';

interface AuthContextType {
	user: AuthUser | null;
	loading: boolean;
	signOut: () => Promise<void>;
	refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [loading, setLoading] = useState(true);
	const [initialized, setInitialized] = useState(false);

	// Use a single instance throughout the component
	const supabase = useMemo(() => createClient(), []);

	const refreshUser = useCallback(async () => {
		try {
			const {
				data: { user: authUser },
				error,
			} = await supabase.auth.getUser();

			if (error) {
				console.error('AuthContext: Erro ao buscar usuário:', error);
				// Só deslogar se for erro de token inválido
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
			// Não deslogar por erro de rede - manter usuário logado
		}
	}, [supabase]);

	const handleSignOut = async () => {
		try {
			await supabase.auth.signOut();
			setUser(null);
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};

	useEffect(() => {
		let isMounted = true;

		const initializeAuth = async () => {
			try {
				// Verificar usuário inicial
				await refreshUser();
			} catch (error) {
				console.error('Erro na inicialização de auth:', error);
			} finally {
				if (isMounted) {
					setLoading(false);
					setInitialized(true);
				}
			}
		};

		// Só inicializar se ainda não foi inicializado
		if (!initialized) {
			initializeAuth();
		}

		// Listen para mudanças de auth apenas após inicialização
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
			if (!initialized) return; // Ignorar eventos durante inicialização

			if (event === 'SIGNED_IN' && session?.user) {
				await refreshUser();
			} else if (event === 'SIGNED_OUT') {
				setUser(null);
			}
		});

		return () => {
			isMounted = false;
			subscription.unsubscribe();
		};
	}, [supabase, refreshUser, initialized]);

	const value = {
		user,
		loading,
		signOut: handleSignOut,
		refreshUser,
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
