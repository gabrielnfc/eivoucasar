'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import {
	Heart,
	Users,
	Plus,
	Search,
	Filter,
	UserPlus,
	ArrowLeft,
	Sparkles,
	Star,
	Trophy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';
import { GuestList } from '@/components/guests/guest-list';
import { GroupList } from '@/components/guests/group-list';
import { AddGuestModal } from '@/components/guests/add-guest-modal';
import { AddGroupModal } from '@/components/guests/add-group-modal';
import { GuestStats } from '@/components/guests/guest-stats';
import { CompleteProfile } from '@/components/auth/complete-profile';
import { apiClient } from '@/lib/api-client';
import Loading from '@/components/ui/loading';
import type { Guest, GuestGroup } from '@/types/guest';

export default function GuestsPage() {
	const { user, loading } = useAuth();
	const router = useRouter();
	const [guests, setGuests] = useState<Guest[]>([]);
	const [groups, setGroups] = useState<GuestGroup[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedGroup, setSelectedGroup] = useState<string>('');
	const [showAddGuest, setShowAddGuest] = useState(false);
	const [showAddGroup, setShowAddGroup] = useState(false);
	const [loadingData, setLoadingData] = useState(true);
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

	useEffect(() => {
		if (user && user.isProfileComplete) {
			loadGuestsAndGroups();
		}
	}, [user]);

	const loadGuestsAndGroups = async () => {
		try {
			setLoadingData(true);

			// Carregar dados em paralelo
			const [guestsResult, groupsResult] = await Promise.all([
				apiClient.getGuests(),
				apiClient.getGroups(),
			]);

			if (guestsResult.error) {
				console.error('Erro ao carregar convidados:', guestsResult.error);
			} else {
				setGuests(guestsResult.data || []);
			}

			if (groupsResult.error) {
				console.error('Erro ao carregar grupos:', groupsResult.error);
			} else {
				setGroups(groupsResult.data || []);
			}
		} catch (error) {
			console.error('Error loading data:', error);
		} finally {
			setLoadingData(false);
		}
	};

	const handleToggleConfirm = async (
		guestId: string,
		shouldConfirm: boolean
	) => {
		try {
			const newStatus = shouldConfirm ? 'confirmed' : 'pending';

			// Atualizar no banco
			const result = await apiClient.updateGuest(guestId, {
				rsvpStatus: newStatus,
			});

			if (result.error) {
				console.error('Erro ao atualizar convidado:', result.error);
				return;
			}

			// Atualizar no estado local
			setGuests((prevGuests) =>
				prevGuests.map((guest) =>
					guest.id === guestId ? { ...guest, rsvpStatus: newStatus } : guest
				)
			);
		} catch (error) {
			console.error('Error toggling guest confirmation:', error);
		}
	};

	const filteredGuests = guests.filter((guest) => {
		const matchesSearch =
			guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			guest.email?.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesGroup = !selectedGroup || guest.groupId === selectedGroup;
		return matchesSearch && matchesGroup;
	});

	// ✅ LOADING COMPLETO - usuário só vê conteúdo após animação terminar
	const isDataLoading = loading || !user || loadingData;
	const shouldShowLoading = isDataLoading || !animationCompleted;

	let loadingMessage = 'Carregando convidados...';
	if (loading) {
		loadingMessage = 'Verificando autenticação...';
	} else if (!user) {
		loadingMessage = 'Autenticando usuário...';
	} else if (loadingData) {
		loadingMessage = 'Carregando lista de convidados...';
	} else if (!animationCompleted) {
		loadingMessage = 'Finalizando carregamento...';
	}

	if (shouldShowLoading) {
		return (
			<Loading 
				message={loadingMessage}
				showTimeout={true}
				timeoutSeconds={2}
				onComplete={() => {
					console.log('Guests: Animação completada');
					// Só marcar como completo se os dados também estiverem carregados
					if (!isDataLoading) {
						setAnimationCompleted(true);
					}
				}}
			/>
		);
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
				<div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50/50 to-pink-50/30"></div>

				{/* Elementos Geométricos Flutuantes */}
				<motion.div
					className="absolute top-12 left-6 w-80 h-80 opacity-6"
					animate={{
						rotate: [0, 360],
						scale: [1, 1.15, 1],
					}}
					transition={{
						duration: 45,
						repeat: Infinity,
						ease: 'linear',
					}}
				>
					<div className="w-full h-full border-4 border-indigo-300/20 rounded-full"></div>
					<div className="absolute top-12 left-12 w-56 h-56 border-3 border-purple-300/25 rounded-full"></div>
					<div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-indigo-300/10 to-purple-300/10 rounded-full"></div>
				</motion.div>

				<motion.div
					className="absolute top-16 right-8 w-72 h-72 opacity-8"
					animate={{
						y: [0, -60, 0],
						rotate: [0, 180, 360],
					}}
					transition={{
						duration: 38,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="w-full h-full bg-gradient-to-br from-pink-300/15 to-purple-300/15 transform rotate-45 rounded-3xl"></div>
				</motion.div>

				{/* Elementos de Guests Flutuantes */}
				{[...Array(12)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute"
						style={{
							left: `${12 + i * 8}%`,
							top: `${8 + (i % 6) * 15}%`,
						}}
						animate={{
							opacity: [0.15, 0.7, 0.15],
							scale: [0.5, 1.1, 0.5],
							y: [0, -12, 0],
						}}
						transition={{
							duration: 2.8 + i * 0.25,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: i * 0.15,
						}}
					>
						{i % 3 === 0 && <Users className="w-3 h-3 text-indigo-400/50" />}
						{i % 3 === 1 && <Heart className="w-3 h-3 text-pink-400/50" />}
						{i % 3 === 2 && <Star className="w-3 h-3 text-purple-400/50" />}
					</motion.div>
				))}

				{/* Sparkles de Guests */}
				{[...Array(8)].map((_, i) => (
					<motion.div
						key={`sparkle-${i}`}
						className="absolute"
						style={{
							right: `${8 + i * 11}%`,
							bottom: `${12 + (i % 4) * 18}%`,
						}}
						animate={{
							opacity: [0.25, 1, 0.25],
							scale: [0.4, 1.2, 0.4],
							rotate: [0, 360, 0],
						}}
						transition={{
							duration: 2.2 + i * 0.35,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: i * 0.12,
						}}
					>
						<Sparkles className="w-2 h-2 text-purple-400/60" />
					</motion.div>
				))}

				{/* Overlay Gradiente */}
				<div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/85"></div>
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
								whileTap={{ scale: 0.95 }}
							>
								<Button
									variant="ghost"
									onClick={() => router.push('/dashboard')}
									className="hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200"
								>
									<ArrowLeft className="h-4 w-4 mr-2" />
									Dashboard
								</Button>
							</motion.div>
							<div className="hidden md:block w-px h-8 bg-gray-300"></div>
							<div className="flex items-center space-x-3">
								<div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
									<Users className="h-6 w-6 text-white" />
								</div>
								<div>
									<h1 className="text-xl font-bold text-gray-800">
										Gestão de Convidados
									</h1>
									<p className="text-xs text-gray-500">
										Organize e gerencie sua lista
									</p>
								</div>
							</div>
						</div>

						<div className="flex items-center space-x-3">
							<motion.div
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Button
									variant="secondary"
									onClick={() => setShowAddGroup(true)}
									className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200 hover:border-purple-300 transition-all duration-200"
								>
									<Plus className="h-4 w-4 mr-2" />
									Grupo
								</Button>
							</motion.div>
							<motion.div
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Button
									onClick={() => setShowAddGuest(true)}
									className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
								>
									<UserPlus className="h-4 w-4 mr-2" />
									Convidado
								</Button>
							</motion.div>
						</div>
					</div>
				</div>
			</motion.header>

			{/* Main Content */}
			<main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
				{/* Stats com Animação */}
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="mb-8"
				>
					<GuestStats
						totalGuests={guests.length}
						confirmedGuests={
							guests.filter((g) => g.rsvpStatus === 'confirmed').length
						}
						groups={groups}
					/>
				</motion.div>

				{/* Search and Filters */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.2, duration: 0.8 }}
					className="mb-6"
				>
					<Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg rounded-2xl overflow-hidden">
						<CardContent className="p-6">
							<div className="flex flex-col sm:flex-row gap-4">
								<div className="relative flex-1">
									<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
									<input
										type="text"
										placeholder="Buscar convidados por nome ou email..."
										className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>

								<div className="relative min-w-[220px]">
									<Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
									<select
										className="w-full pl-12 pr-8 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 appearance-none cursor-pointer"
										value={selectedGroup}
										onChange={(e) => setSelectedGroup(e.target.value)}
										aria-label="Filtrar por grupo"
									>
										<option value="">Todos os grupos</option>
										{groups.map((group) => (
											<option key={group.id} value={group.id}>
												{group.name}
											</option>
										))}
									</select>
									<div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
										<svg
											className="w-4 h-4 text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Content Grid */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.4, duration: 0.8 }}
					className="grid lg:grid-cols-3 gap-6"
				>
					{/* Groups Sidebar */}
					<motion.div
						whileHover={{ scale: 1.01 }}
						transition={{ duration: 0.2 }}
						className="lg:col-span-1"
					>
						<GroupList
							groups={groups}
							selectedGroup={selectedGroup}
							onSelectGroup={setSelectedGroup}
							onEditGroup={() => {}}
							onDeleteGroup={() => {}}
						/>
					</motion.div>

					{/* Guests List */}
					<motion.div
						whileHover={{ scale: 1.005 }}
						transition={{ duration: 0.2 }}
						className="lg:col-span-2"
					>
						<GuestList
							guests={filteredGuests}
							groups={groups}
							loading={loadingData}
							onEditGuest={() => {}}
							onDeleteGuest={() => {}}
							onToggleConfirm={handleToggleConfirm}
						/>
					</motion.div>
				</motion.div>
			</main>

			{/* Modals */}
			<AddGuestModal
				open={showAddGuest}
				onClose={() => setShowAddGuest(false)}
				groups={groups}
				onGuestAdded={loadGuestsAndGroups}
			/>

			<AddGroupModal
				open={showAddGroup}
				onClose={() => setShowAddGroup(false)}
				onGroupAdded={loadGuestsAndGroups}
			/>
		</div>
	);
}
