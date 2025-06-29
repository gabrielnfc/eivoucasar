'use client';

import { useState } from 'react';
import { X, Users, Target, Type, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { apiClient } from '@/lib/api-client';
import { GROUP_COLORS, type CreateGroupData } from '@/types/guest';

interface AddGroupModalProps {
	open: boolean;
	onClose: () => void;
	onGroupAdded: () => void;
}

export function AddGroupModal({
	open,
	onClose,
	onGroupAdded,
}: AddGroupModalProps) {
	const [formData, setFormData] = useState<CreateGroupData>({
		name: '',
		description: '',
		color: GROUP_COLORS[0].value,
		targetAmount: 0,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === 'targetAmount' ? Number(value) : value,
		}));
	};

	const handleColorChange = (color: string) => {
		setFormData((prev) => ({ ...prev, color }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			if (!formData.name.trim()) {
				setError('Nome é obrigatório');
				return;
			}

			const result = await apiClient.createGroup({
				name: formData.name.trim(),
				description: formData.description?.trim() || undefined,
				color: formData.color,
				targetAmount: formData.targetAmount || 0,
			});

			if (result.error) {
				setError(result.error);
				return;
			}

			onGroupAdded();
			onClose();
			setFormData({
				name: '',
				description: '',
				color: GROUP_COLORS[0].value,
				targetAmount: 0,
			});
		} catch (error) {
			console.error('Erro ao criar grupo:', error);
			setError('Erro ao criar grupo. Tente novamente.');
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		if (!loading) {
			onClose();
			setFormData({
				name: '',
				description: '',
				color: GROUP_COLORS[0].value,
				targetAmount: 0,
			});
			setError('');
		}
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
					<CardTitle className="flex items-center">
						<Users className="h-5 w-5 mr-2 text-primary-500" />
						Criar Grupo
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

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<label
								htmlFor="name"
								className="text-sm font-medium text-secondary-700"
							>
								Nome do Grupo *
							</label>
							<div className="relative">
								<Type className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
								<input
									id="name"
									name="name"
									type="text"
									className="input-modern pl-10"
									placeholder="Ex: Família da Noiva"
									value={formData.name}
									onChange={handleChange}
									required
									disabled={loading}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="description"
								className="text-sm font-medium text-secondary-700"
							>
								Descrição
							</label>
							<textarea
								id="description"
								name="description"
								className="input-modern min-h-[80px] resize-none"
								placeholder="Descrição opcional do grupo"
								value={formData.description}
								onChange={handleChange}
								disabled={loading}
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-secondary-700">
								Cor do Grupo
							</label>
							<div className="flex flex-wrap gap-2">
								{GROUP_COLORS.map((colorOption) => (
									<button
										key={colorOption.value}
										type="button"
										className={`w-8 h-8 rounded-full border-2 transition-all ${
											formData.color === colorOption.value
												? 'border-neutral-400 scale-110'
												: 'border-neutral-200 hover:border-neutral-300'
										}`}
										style={{ backgroundColor: colorOption.value }}
										onClick={() => handleColorChange(colorOption.value)}
										title={colorOption.name}
										disabled={loading}
									/>
								))}
							</div>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="targetAmount"
								className="text-sm font-medium text-secondary-700"
							>
								Meta de Contribuição
							</label>
							<div className="relative">
								<Target className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
								<input
									id="targetAmount"
									name="targetAmount"
									type="number"
									min="0"
									step="100"
									className="input-modern pl-10"
									placeholder="0"
									value={formData.targetAmount || ''}
									onChange={handleChange}
									disabled={loading}
								/>
							</div>
							{formData.targetAmount && formData.targetAmount > 0 && (
								<p className="text-xs text-secondary-500">
									Meta: {formatCurrency(formData.targetAmount)}
								</p>
							)}
						</div>

						<div className="flex justify-end space-x-3 pt-4">
							<Button
								type="button"
								variant="secondary"
								onClick={handleClose}
								disabled={loading}
							>
								Cancelar
							</Button>
							<Button type="submit" disabled={loading}>
								{loading ? 'Criando...' : 'Criar Grupo'}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
