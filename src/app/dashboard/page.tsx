'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Trophy, DollarSign, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Logo from '@/components/ui/logo';
import { useAuth } from '@/contexts/auth-context';
import { CompleteProfile } from '@/components/auth/complete-profile';

export default function DashboardPage() {
	const { user, loading, signOut } = useAuth();
	const router = useRouter();

	useEffect(() => {
		// Aguardar um pouco antes de redirecionar para permitir que a auth carregue
		const timer = setTimeout(() => {
			if (!loading && !user) {
				router.push('/login');
			}
		}, 1000);

		// Se o usuário carregar antes do timeout, cancelar o timer
		if (user || loading) {
			clearTimeout(timer);
		}

		return () => clearTimeout(timer);
	}, [user, loading, router]);

	const handleSignOut = async () => {
		await signOut();
		router.push('/');
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-neutral-50 flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
			</div>
		);
	}

	if (!user) {
		return null; // Will redirect in useEffect
	}

	// Se o perfil não estiver completo, mostrar tela de completar cadastro
	if (!user.isProfileComplete) {
		return <CompleteProfile />;
	}

	return (
		<div className="min-h-screen bg-neutral-50">
			{/* Header */}
			<header className="bg-white border-b border-neutral-200">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<div className="flex items-center space-x-3">
							<Logo size="lg" />
						</div>

						<div className="flex items-center space-x-4">
							<span className="text-sm text-secondary-600">
								Olá, {user.brideName} & {user.groomName}!
							</span>
							<Button variant="ghost" onClick={handleSignOut}>
								<LogOut className="h-4 w-4 mr-2" />
								Sair
							</Button>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
				{/* Welcome Section */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-secondary-900">
						Dashboard do Casamento
					</h1>
					<p className="mt-2 text-secondary-600">
						Gerencie seu site de casamento e acompanhe as contribuições em tempo
						real
					</p>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<Card variant="elevated">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Arrecadado
							</CardTitle>
							<DollarSign className="h-4 w-4 text-primary-500" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-secondary-900">
								R$ 0,00
							</div>
							<p className="text-xs text-secondary-500">
								+0% em relação ao mês passado
							</p>
						</CardContent>
					</Card>

					<Card variant="elevated">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Convidados</CardTitle>
							<Users className="h-4 w-4 text-secondary-500" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-secondary-900">0</div>
							<p className="text-xs text-secondary-500">0 confirmados</p>
						</CardContent>
					</Card>

					<Card variant="elevated">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Contribuições
							</CardTitle>
							<Trophy className="h-4 w-4 text-accent-500" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-secondary-900">0</div>
							<p className="text-xs text-secondary-500">0 este mês</p>
						</CardContent>
					</Card>

					<Card variant="elevated">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Meta</CardTitle>
							<Settings className="h-4 w-4 text-secondary-500" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-secondary-900">0%</div>
							<p className="text-xs text-secondary-500">da meta atingida</p>
						</CardContent>
					</Card>
				</div>

				{/* Quick Actions */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<Card variant="elevated" interactive="hover">
						<CardHeader>
							<CardTitle className="flex items-center">
								<Users className="h-5 w-5 mr-2 text-primary-500" />
								Gerenciar Convidados
							</CardTitle>
							<CardDescription>
								Adicione convidados e organize grupos
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button
								className="w-full"
								variant="primary"
								onClick={() => router.push('/dashboard/guests')}
							>
								Começar Agora
							</Button>
						</CardContent>
					</Card>

					<Card variant="elevated" interactive="hover">
						<CardHeader>
							<CardTitle className="flex items-center">
								<Trophy className="h-5 w-5 mr-2 text-accent-500" />
								Ver Rankings
							</CardTitle>
							<CardDescription>
								Acompanhe a competição entre grupos
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button className="w-full" variant="secondary">
								Ver Rankings
							</Button>
						</CardContent>
					</Card>

					<Card variant="elevated" interactive="hover">
						<CardHeader>
							<CardTitle className="flex items-center">
								<Settings className="h-5 w-5 mr-2 text-secondary-500" />
								Configurações
							</CardTitle>
							<CardDescription>
								Personalize seu site de casamento
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button className="w-full" variant="secondary">
								Configurar
							</Button>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}
