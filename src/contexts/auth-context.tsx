'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
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

	const refreshUser = async () => {
		try {
			const {
				data: { user: authUser },
				error,
			} = await supabase.auth.getUser();

			if (error || !authUser) {
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
				// Perfil de casal incompleto - será solicitado completar na UI
				coupleData = null;
			}

			const userData: AuthUser = {
				id: authUser.id,
				email: authUser.email!,
				emailSecondary:
					coupleData?.email_secondary ||
					authUser.user_metadata?.email_secondary,
				brideName: coupleData?.bride_name || authUser.user_metadata?.bride_name,
				groomName: coupleData?.groom_name || authUser.user_metadata?.groom_name,
				city: coupleData?.city || authUser.user_metadata?.city,
				state: coupleData?.state || authUser.user_metadata?.state,
				country: coupleData?.country || authUser.user_metadata?.country,
				bridePhone:
					coupleData?.bride_phone || authUser.user_metadata?.bride_phone,
				groomPhone:
					coupleData?.groom_phone || authUser.user_metadata?.groom_phone,
				weddingDateTime:
					coupleData?.wedding_datetime ||
					authUser.user_metadata?.wedding_datetime,
				signupRole:
					coupleData?.signup_role || authUser.user_metadata?.signup_role,
				slug: coupleData?.slug,
				isProfileComplete: !!coupleData, // Verdadeiro apenas se existe na tabela couples
			};

			setUser(userData);
		} catch (error) {
			console.error('AuthContext: Erro ao atualizar usuário:', error);
			// Não deslogar por erro de rede - manter usuário logado
		}
	};

	const handleSignOut = async () => {
		try {
			await supabase.auth.signOut();
			setUser(null);
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};

	useEffect(() => {
		// Verificar usuário inicial
		refreshUser().finally(() => setLoading(false));

		// Listen para mudanças de auth
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_IN' && session?.user) {
				await refreshUser();
			} else if (event === 'SIGNED_OUT') {
				setUser(null);
			}
			setLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

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
