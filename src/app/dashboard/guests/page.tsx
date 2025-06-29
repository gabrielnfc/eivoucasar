'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Users, Plus, Search, Filter, UserPlus } from 'lucide-react';
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

	if (loading || !user) {
		return (
			<div className="min-h-screen bg-neutral-50 flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
			</div>
		);
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
						<div className="flex items-center space-x-4">
							<Button variant="ghost" onClick={() => router.push('/dashboard')}>
								← Dashboard
							</Button>
							<div className="flex items-center space-x-2">
								<Users className="h-6 w-6 text-primary-500" />
								<h1 className="text-xl font-semibold text-secondary-900">
									Gestão de Convidados
								</h1>
							</div>
						</div>

						<div className="flex items-center space-x-2">
							<Button variant="secondary" onClick={() => setShowAddGroup(true)}>
								<Plus className="h-4 w-4 mr-2" />
								Grupo
							</Button>
							<Button onClick={() => setShowAddGuest(true)}>
								<UserPlus className="h-4 w-4 mr-2" />
								Convidado
							</Button>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
				{/* Stats */}
				<GuestStats
					totalGuests={guests.length}
					confirmedGuests={
						guests.filter((g) => g.rsvpStatus === 'confirmed').length
					}
					groups={groups}
					className="mb-8"
				/>

				{/* Search and Filters */}
				<Card className="mb-6">
					<CardContent className="p-4">
						<div className="flex flex-col sm:flex-row gap-4">
							<div className="relative flex-1">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
								<input
									type="text"
									placeholder="Buscar convidados..."
									className="input-modern pl-10"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>

							<div className="relative min-w-[200px]">
								<Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
								<select
									className="input-modern pl-10 appearance-none"
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
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="grid lg:grid-cols-3 gap-6">
					{/* Groups Sidebar */}
					<div className="lg:col-span-1">
						<GroupList
							groups={groups}
							selectedGroup={selectedGroup}
							onSelectGroup={setSelectedGroup}
							onEditGroup={() => {}}
							onDeleteGroup={() => {}}
						/>
					</div>

					{/* Guests List */}
					<div className="lg:col-span-2">
						<GuestList
							guests={filteredGuests}
							groups={groups}
							loading={loadingData}
							onEditGuest={() => {}}
							onDeleteGuest={() => {}}
							onToggleConfirm={handleToggleConfirm}
						/>
					</div>
				</div>
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
