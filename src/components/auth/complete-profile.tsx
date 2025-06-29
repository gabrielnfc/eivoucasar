'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/ui/logo';
import { useAuth } from '@/contexts/auth-context';
import { apiClient } from '@/lib/api-client';

export function CompleteProfile() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const { user, refreshUser } = useAuth();
	const router = useRouter();

	const handleCompleteProfile = async () => {
		if (!user) return;

		setIsLoading(true);
		setError('');

		try {
			console.log('🔧 Completando perfil do usuário...');

			const result = await apiClient.ensureCoupleExists();

			if (result.error) {
				setError(result.error);
				return;
			}

			console.log('✅ Perfil completado com sucesso!');

			// Atualizar dados do usuário
			await refreshUser();

			// Redirecionar para o dashboard
			router.push('/dashboard');
		} catch (error) {
			console.error('Erro ao completar perfil:', error);
			setError('Erro ao completar perfil. Tente novamente.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
			<Card variant="glass" className="w-full max-w-md shadow-romantic">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4">
						<Logo size="lg" />
					</div>
					<CardTitle className="text-xl font-semibold text-secondary-900">
						Finalizar Cadastro
					</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					<div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
						<div className="flex items-start space-x-3">
							<AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
							<div>
								<h3 className="text-sm font-medium text-amber-800">
									Cadastro Incompleto
								</h3>
								<p className="text-sm text-amber-700 mt-1">
									Detectamos que sua conta não foi totalmente configurada. Vamos
									completar seu perfil de casal agora.
								</p>
							</div>
						</div>
					</div>

					{user && (
						<div className="bg-neutral-50 rounded-lg p-4 space-y-2">
							<h4 className="text-sm font-medium text-secondary-700">
								Dados da Conta:
							</h4>
							<div className="text-sm text-secondary-600 space-y-1">
								<p>
									<strong>Email:</strong> {user.email}
								</p>
								{user.brideName && (
									<p>
										<strong>Noiva:</strong> {user.brideName}
									</p>
								)}
								{user.groomName && (
									<p>
										<strong>Noivo:</strong> {user.groomName}
									</p>
								)}
							</div>
						</div>
					)}

					{error && (
						<div className="bg-red-50 border border-red-200 rounded-lg p-3">
							<p className="text-sm text-red-600">{error}</p>
						</div>
					)}

					<div className="space-y-3">
						<Button
							onClick={handleCompleteProfile}
							disabled={isLoading}
							className="w-full"
							variant="primary"
						>
							{isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
							{isLoading ? 'Completando...' : 'Completar Cadastro'}
						</Button>

						<p className="text-xs text-secondary-500 text-center">
							Isso criará seu perfil de casal e grupos padrão para gerenciar
							convidados.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
