'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import {
	Users,
	Trophy,
	DollarSign,
	Settings,
	LogOut,
	Heart,
	Zap,
	TrendingUp,
	Star,
	Sparkles,
} from 'lucide-react';
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
import Loading from '@/components/ui/loading';

export default function DashboardPage() {
	const { user, loading, signOut } = useAuth();
	const router = useRouter();
	const [animationCompleted, setAnimationCompleted] = useState(false);
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

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

	// ✅ Loading completo - usuário só vê conteúdo após animação terminar
	if (loading || !animationCompleted) {
		return (
			<Loading 
				message="Carregando seu painel..." 
				showTimeout={true}
				timeoutSeconds={2}
				onComplete={() => {
					console.log('Dashboard: Animação completada');
					setAnimationCompleted(true);
				}}
			/>
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
		<div className="min-h-screen relative overflow-hidden">
			{/* Background Decorativo */}
			<div className="absolute inset-0">
				{/* Gradiente Base */}
				<div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50/50 to-blue-50/30"></div>

				{/* Elementos Geométricos Flutuantes */}
				<motion.div
					className="absolute top-16 left-8 w-96 h-96 opacity-6"
					animate={{
						rotate: [0, 360],
						scale: [1, 1.1, 1],
					}}
					transition={{
						duration: 40,
						repeat: Infinity,
						ease: 'linear',
					}}
				>
					<div className="w-full h-full border-4 border-purple-300/20 rounded-full"></div>
					<div className="absolute top-16 left-16 w-64 h-64 border-3 border-pink-300/25 rounded-full"></div>
					<div className="absolute top-28 left-28 w-40 h-40 bg-gradient-to-br from-purple-300/10 to-pink-300/10 rounded-full"></div>
				</motion.div>

				<motion.div
					className="absolute top-20 right-12 w-80 h-80 opacity-8"
					animate={{
						y: [0, -50, 0],
						rotate: [0, 180, 360],
					}}
					transition={{
						duration: 35,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="w-full h-full bg-gradient-to-br from-blue-300/15 to-indigo-300/15 transform rotate-45 rounded-3xl"></div>
				</motion.div>

				<motion.div
					className="absolute bottom-16 right-1/4 w-72 h-72 opacity-7"
					animate={{
						scale: [1, 1.2, 1],
						rotate: [45, 225, 45],
					}}
					transition={{
						duration: 32,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="w-full h-full border-6 border-pink-300/25 rounded-2xl transform rotate-12"></div>
				</motion.div>

				{/* Elementos Dashboard Flutuantes */}
				{[...Array(10)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute"
						style={{
							left: `${15 + i * 10}%`,
							top: `${10 + (i % 5) * 18}%`,
						}}
						animate={{
							opacity: [0.2, 0.8, 0.2],
							scale: [0.6, 1.2, 0.6],
							y: [0, -15, 0],
						}}
						transition={{
							duration: 3 + i * 0.3,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: i * 0.2,
						}}
					>
						{i % 4 === 0 && <Trophy className="w-3 h-3 text-amber-400/50" />}
						{i % 4 === 1 && <Users className="w-3 h-3 text-blue-400/50" />}
						{i % 4 === 2 && <Heart className="w-3 h-3 text-pink-400/50" />}
						{i % 4 === 3 && <Star className="w-3 h-3 text-purple-400/50" />}
					</motion.div>
				))}

				{/* Sparkles de Dashboard */}
				{[...Array(8)].map((_, i) => (
					<motion.div
						key={`sparkle-${i}`}
						className="absolute"
						style={{
							right: `${10 + i * 12}%`,
							bottom: `${15 + (i % 4) * 20}%`,
						}}
						animate={{
							opacity: [0.3, 1, 0.3],
							scale: [0.5, 1.3, 0.5],
							rotate: [0, 360, 0],
						}}
						transition={{
							duration: 2.5 + i * 0.4,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: i * 0.15,
						}}
					>
						<Sparkles className="w-2 h-2 text-indigo-400/60" />
					</motion.div>
				))}

				{/* Overlay Gradiente */}
				<div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/80"></div>
			</div>

			{/* Header Moderno */}
			<motion.header
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="relative z-20 border-b border-gray-200/50 bg-white/90 backdrop-blur-sm shadow-sm"
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-20 items-center justify-between">
						<div className="flex items-center space-x-4">
							<motion.div
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.2 }}
							>
								<Logo className="h-12 w-auto" />
							</motion.div>
							<div className="hidden md:block w-px h-8 bg-gray-300"></div>
							<div className="hidden md:block">
								<h1 className="text-lg font-semibold text-gray-800">
									Dashboard
								</h1>
								<p className="text-xs text-gray-500">Painel de controle</p>
							</div>
						</div>

						<div className="flex items-center space-x-4">
							<div className="hidden sm:block text-right">
								<p className="text-sm font-medium text-gray-800">
									{user.brideName} & {user.groomName}
								</p>
								<p className="text-xs text-gray-500">Olá, casal! 💕</p>
							</div>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Button
									variant="ghost"
									onClick={handleSignOut}
									className="hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
								>
									<LogOut className="h-4 w-4 mr-2" />
									Sair
								</Button>
							</motion.div>
						</div>
					</div>
				</div>
			</motion.header>

			{/* Main Content */}
			<main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
				{/* Welcome Section */}
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="mb-8"
				>
					<div className="text-center mb-8">
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.2, duration: 0.6 }}
							className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
						>
							Dashboard do Casamento
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.4, duration: 0.6 }}
							className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed"
						>
							Gerencie seu site de casamento e acompanhe as contribuições em
							tempo real
						</motion.p>
					</div>
				</motion.div>

				{/* Stats Cards */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.6, duration: 0.8 }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
				>
					<motion.div
						whileHover={{ scale: 1.02, y: -5 }}
						transition={{ duration: 0.3 }}
					>
						<Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-50 to-emerald-50">
								<CardTitle className="text-sm font-semibold text-gray-700">
									Total Arrecadado
								</CardTitle>
								<div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
									<DollarSign className="h-5 w-5 text-white" />
								</div>
							</CardHeader>
							<CardContent className="pt-4">
								<div className="text-3xl font-bold text-gray-900 mb-1">
									R$ 0,00
								</div>
								<p className="text-xs text-gray-500 flex items-center gap-1">
									<TrendingUp className="w-3 h-3" />
									+0% em relação ao mês passado
								</p>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.02, y: -5 }}
						transition={{ duration: 0.3 }}
					>
						<Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-50 to-indigo-50">
								<CardTitle className="text-sm font-semibold text-gray-700">
									Convidados
								</CardTitle>
								<div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
									<Users className="h-5 w-5 text-white" />
								</div>
							</CardHeader>
							<CardContent className="pt-4">
								<div className="text-3xl font-bold text-gray-900 mb-1">0</div>
								<p className="text-xs text-gray-500">0 confirmados</p>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.02, y: -5 }}
						transition={{ duration: 0.3 }}
					>
						<Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-50 to-yellow-50">
								<CardTitle className="text-sm font-semibold text-gray-700">
									Contribuições
								</CardTitle>
								<div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center">
									<Trophy className="h-5 w-5 text-white" />
								</div>
							</CardHeader>
							<CardContent className="pt-4">
								<div className="text-3xl font-bold text-gray-900 mb-1">0</div>
								<p className="text-xs text-gray-500">0 este mês</p>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.02, y: -5 }}
						transition={{ duration: 0.3 }}
					>
						<Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-50 to-pink-50">
								<CardTitle className="text-sm font-semibold text-gray-700">
									Meta
								</CardTitle>
								<div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
									<Settings className="h-5 w-5 text-white" />
								</div>
							</CardHeader>
							<CardContent className="pt-4">
								<div className="text-3xl font-bold text-gray-900 mb-1">0%</div>
								<p className="text-xs text-gray-500">da meta atingida</p>
							</CardContent>
						</Card>
					</motion.div>
				</motion.div>

				{/* Quick Actions */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.8, duration: 0.8 }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					<motion.div
						whileHover={{ scale: 1.02, y: -5 }}
						transition={{ duration: 0.3 }}
					>
						<Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group cursor-pointer">
							<CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
								<CardTitle className="flex items-center gap-3">
									<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
										<Users className="h-6 w-6 text-white" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-gray-800">
											Gerenciar Convidados
										</h3>
										<p className="text-sm text-gray-600">
											Adicione convidados e organize grupos
										</p>
									</div>
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-6">
								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Button
										className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
										onClick={() => router.push('/dashboard/guests')}
									>
										<div className="flex items-center justify-center gap-2">
											Começar Agora
											<Zap className="w-4 h-4 group-hover:animate-pulse" />
										</div>
									</Button>
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.02, y: -5 }}
						transition={{ duration: 0.3 }}
					>
						<Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group cursor-pointer">
							<CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 group-hover:from-amber-100 group-hover:to-yellow-100 transition-all duration-300">
								<CardTitle className="flex items-center gap-3">
									<div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
										<Trophy className="h-6 w-6 text-white" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-gray-800">
											Ver Rankings
										</h3>
										<p className="text-sm text-gray-600">
											Acompanhe a competição entre grupos
										</p>
									</div>
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-6">
								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
										Ver Rankings
									</Button>
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.02, y: -5 }}
						transition={{ duration: 0.3 }}
					>
						<Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group cursor-pointer">
							<CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 group-hover:from-purple-100 group-hover:to-pink-100 transition-all duration-300">
								<CardTitle className="flex items-center gap-3">
									<div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
										<Settings className="h-6 w-6 text-white" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-gray-800">
											Configurações
										</h3>
										<p className="text-sm text-gray-600">
											Personalize seu site de casamento
										</p>
									</div>
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-6">
								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Button 
										className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
										onClick={() => router.push('/dashboard/settings')}
									>
										Configurar
									</Button>
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>
				</motion.div>
			</main>
		</div>
	);
}
