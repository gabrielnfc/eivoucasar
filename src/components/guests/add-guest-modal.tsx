'use client';

import { useState } from 'react';
import {
	X,
	User,
	Mail,
	Phone,
	Users,
	Plus,
	Trash2,
	UserPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiClient } from '@/lib/api-client';
import type { GuestGroup, CreateGuestData, CompanionData } from '@/types/guest';

interface AddGuestModalProps {
	open: boolean;
	onClose: () => void;
	groups: GuestGroup[];
	onGuestAdded: () => void;
}

export function AddGuestModal({
	open,
	onClose,
	groups,
	onGuestAdded,
}: AddGuestModalProps) {
	const [formData, setFormData] = useState<CreateGuestData>({
		name: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		groupId: '',
		ageGroup: 'adult',
		gender: 'male',
		menuType: 'adult',
		companions: [],
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		setFormData((prev) => {
			// Auto-gerar nome completo quando firstName ou lastName mudam
			if (name === 'firstName' || name === 'lastName') {
				const firstName = name === 'firstName' ? value : prev.firstName;
				const lastName = name === 'lastName' ? value : prev.lastName;
				const fullName = `${firstName} ${lastName}`.trim();

				return {
					...prev,
					[name]: value,
					name: fullName,
				};
			}

			return {
				...prev,
				[name]: value,
			};
		});
	};

	const addCompanion = () => {
		const newCompanion: CompanionData = {
			name: '',
			firstName: '',
			lastName: '',
			ageGroup: 'adult',
			gender: 'male',
			menuType: 'adult',
		};

		setFormData((prev) => ({
			...prev,
			companions: [...(prev.companions || []), newCompanion],
		}));
	};

	const removeCompanion = (index: number) => {
		setFormData((prev) => ({
			...prev,
			companions: prev.companions?.filter((_, i) => i !== index) || [],
		}));
	};

	const updateCompanion = (
		index: number,
		field: keyof CompanionData,
		value: string
	) => {
		setFormData((prev) => {
			const updatedCompanions = [...(prev.companions || [])];
			const companion = { ...updatedCompanions[index] };

			// Auto-gerar nome completo para acompanhantes também
			if (field === 'firstName' || field === 'lastName') {
				const firstName = field === 'firstName' ? value : companion.firstName;
				const lastName = field === 'lastName' ? value : companion.lastName;
				companion.name = `${firstName} ${lastName}`.trim();
			}

			(companion as any)[field] = value;
			updatedCompanions[index] = companion;

			return {
				...prev,
				companions: updatedCompanions,
			};
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			if (!formData.firstName?.trim() && !formData.lastName?.trim()) {
				setError('Nome ou sobrenome é obrigatório');
				return;
			}

			const result = await apiClient.createGuest({
				name: formData.name.trim(),
				firstName: formData.firstName?.trim() || undefined,
				lastName: formData.lastName?.trim() || undefined,
				email: formData.email?.trim() || undefined,
				phone: formData.phone?.trim() || undefined,
				groupId: formData.groupId || undefined,
				ageGroup: formData.ageGroup,
				gender: formData.gender,
				menuType: formData.menuType,
				companions: formData.companions,
			});

			if (result.error) {
				setError(result.error);
				return;
			}

			onGuestAdded();
			onClose();
			setFormData({
				name: '',
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				groupId: '',
				ageGroup: 'adult',
				gender: 'male',
				menuType: 'adult',
				companions: [],
			});
		} catch (error) {
			console.error('Erro ao adicionar convidado:', error);
			setError('Erro ao adicionar convidado. Tente novamente.');
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		if (!loading) {
			onClose();
			setFormData({
				name: '',
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				groupId: '',
				ageGroup: 'adult',
				gender: 'male',
				menuType: 'adult',
				companions: [],
			});
			setError('');
		}
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
			<Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
					<CardTitle className="flex items-center">
						<User className="h-5 w-5 mr-2 text-primary-500" />
						Adicionar Convidado
					</CardTitle>
					<Button
						variant="ghost"
						size="sm"
						onClick={handleClose}
						className="h-8 w-8 p-0"
						disabled={loading}
					>
						<X className="h-4 w-4" />
					</Button>
				</CardHeader>

				<CardContent>
					{error && (
						<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Dados Pessoais */}
						<div className="space-y-4">
							<h3 className="text-lg font-semibold text-secondary-900 border-b pb-2">
								👤 Dados Pessoais
							</h3>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<label
										htmlFor="firstName"
										className="text-sm font-medium text-secondary-700"
									>
										Nome *
									</label>
									<div className="relative">
										<User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
										<input
											id="firstName"
											name="firstName"
											type="text"
											className="input-modern pl-10"
											placeholder="Nome"
											value={formData.firstName}
											onChange={handleChange}
											required
											disabled={loading}
										/>
									</div>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="lastName"
										className="text-sm font-medium text-secondary-700"
									>
										Sobrenome *
									</label>
									<input
										id="lastName"
										name="lastName"
										type="text"
										className="input-modern"
										placeholder="Sobrenome"
										value={formData.lastName}
										onChange={handleChange}
										required
										disabled={loading}
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<label
										htmlFor="ageGroup"
										className="text-sm font-medium text-secondary-700"
									>
										Idade
									</label>
									<select
										id="ageGroup"
										name="ageGroup"
										className="input-modern"
										value={formData.ageGroup}
										onChange={handleChange}
										disabled={loading}
									>
										<option value="adult">Adulto</option>
										<option value="child">Criança</option>
										<option value="baby">Bebê</option>
									</select>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="gender"
										className="text-sm font-medium text-secondary-700"
									>
										Sexo
									</label>
									<select
										id="gender"
										name="gender"
										className="input-modern"
										value={formData.gender}
										onChange={handleChange}
										disabled={loading}
									>
										<option value="male">Masculino</option>
										<option value="female">Feminino</option>
									</select>
								</div>
							</div>
						</div>

						{/* Contato */}
						<div className="space-y-4">
							<h3 className="text-lg font-semibold text-secondary-900 border-b pb-2">
								📧 Contato
							</h3>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<label
										htmlFor="email"
										className="text-sm font-medium text-secondary-700"
									>
										E-mail
									</label>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
										<input
											id="email"
											name="email"
											type="email"
											className="input-modern pl-10"
											placeholder="email@exemplo.com"
											value={formData.email}
											onChange={handleChange}
											disabled={loading}
										/>
									</div>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="phone"
										className="text-sm font-medium text-secondary-700"
									>
										Telefone
									</label>
									<div className="relative">
										<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
										<input
											id="phone"
											name="phone"
											type="tel"
											className="input-modern pl-10"
											placeholder="(11) 99999-9999"
											value={formData.phone}
											onChange={handleChange}
											disabled={loading}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Evento */}
						<div className="space-y-4">
							<h3 className="text-lg font-semibold text-secondary-900 border-b pb-2">
								🎉 Evento
							</h3>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<label
										htmlFor="groupId"
										className="text-sm font-medium text-secondary-700"
									>
										Grupo
									</label>
									<div className="relative">
										<Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
										<select
											id="groupId"
											name="groupId"
											className="input-modern pl-10 appearance-none"
											value={formData.groupId}
											onChange={handleChange}
											disabled={loading}
											aria-label="Selecionar grupo"
										>
											<option value="">Sem grupo</option>
											{groups.map((group) => (
												<option key={group.id} value={group.id}>
													{group.name}
												</option>
											))}
										</select>
									</div>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="menuType"
										className="text-sm font-medium text-secondary-700"
									>
										Cardápio
									</label>
									<select
										id="menuType"
										name="menuType"
										className="input-modern"
										value={formData.menuType}
										onChange={handleChange}
										disabled={loading}
									>
										<option value="adult">Adulto</option>
										<option value="child">Criança</option>
										<option value="none">Sem menu</option>
									</select>
								</div>
							</div>
						</div>

						{/* Acompanhantes */}
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-semibold text-secondary-900 border-b pb-2 flex-1">
									👥 Acompanhantes
								</h3>
								<Button
									type="button"
									variant="secondary"
									size="sm"
									onClick={addCompanion}
									disabled={loading}
									className="ml-4"
								>
									<Plus className="h-4 w-4 mr-2" />
									Adicionar
								</Button>
							</div>

							{formData.companions?.map((companion, index) => (
								<div
									key={index}
									className="border border-neutral-200 rounded-lg p-4 space-y-3"
								>
									<div className="flex items-center justify-between">
										<h4 className="font-medium text-secondary-700">
											Acompanhante {index + 1}
										</h4>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => removeCompanion(index)}
											disabled={loading}
											className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>

									<div className="grid grid-cols-2 gap-3">
										<div className="space-y-1">
											<label className="text-xs font-medium text-secondary-600">
												Nome
											</label>
											<input
												type="text"
												className="input-modern"
												placeholder="Nome"
												value={companion.firstName}
												onChange={(e) =>
													updateCompanion(index, 'firstName', e.target.value)
												}
												disabled={loading}
											/>
										</div>
										<div className="space-y-1">
											<label className="text-xs font-medium text-secondary-600">
												Sobrenome
											</label>
											<input
												type="text"
												className="input-modern"
												placeholder="Sobrenome"
												value={companion.lastName}
												onChange={(e) =>
													updateCompanion(index, 'lastName', e.target.value)
												}
												disabled={loading}
											/>
										</div>
									</div>

									<div className="grid grid-cols-3 gap-3">
										<div className="space-y-1">
											<label className="text-xs font-medium text-secondary-600">
												Idade
											</label>
											<select
												className="input-modern"
												value={companion.ageGroup}
												onChange={(e) =>
													updateCompanion(
														index,
														'ageGroup',
														e.target.value as any
													)
												}
												disabled={loading}
												aria-label="Idade do acompanhante"
											>
												<option value="adult">Adulto</option>
												<option value="child">Criança</option>
												<option value="baby">Bebê</option>
											</select>
										</div>

										<div className="space-y-1">
											<label className="text-xs font-medium text-secondary-600">
												Sexo
											</label>
											<select
												className="input-modern"
												value={companion.gender}
												onChange={(e) =>
													updateCompanion(
														index,
														'gender',
														e.target.value as any
													)
												}
												disabled={loading}
												aria-label="Sexo do acompanhante"
											>
												<option value="male">Masculino</option>
												<option value="female">Feminino</option>
											</select>
										</div>

										<div className="space-y-1">
											<label className="text-xs font-medium text-secondary-600">
												Cardápio
											</label>
											<select
												className="input-modern"
												value={companion.menuType}
												onChange={(e) =>
													updateCompanion(
														index,
														'menuType',
														e.target.value as any
													)
												}
												disabled={loading}
												aria-label="Cardápio do acompanhante"
											>
												<option value="adult">Adulto</option>
												<option value="child">Criança</option>
												<option value="none">Sem menu</option>
											</select>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="flex justify-end space-x-3 pt-4 border-t">
							<Button
								type="button"
								variant="secondary"
								onClick={handleClose}
								disabled={loading}
							>
								Cancelar
							</Button>
							<Button type="submit" disabled={loading}>
								{loading ? 'Adicionando...' : 'Adicionar Convidado'}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
