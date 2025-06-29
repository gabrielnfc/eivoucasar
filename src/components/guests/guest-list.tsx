import {
	Mail,
	Phone,
	MoreHorizontal,
	UserCheck,
	UserX,
	Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Guest, GuestGroup } from '@/types/guest';
import { cn } from '@/lib/utils';

interface GuestListProps {
	guests: Guest[];
	groups: GuestGroup[];
	loading: boolean;
	onEditGuest: (guest: Guest) => void;
	onDeleteGuest: (guestId: string) => void;
	onToggleConfirm: (guestId: string, confirmed: boolean) => void;
}

export function GuestList({
	guests,
	groups,
	loading,
	onEditGuest,
	onDeleteGuest,
	onToggleConfirm,
}: GuestListProps) {
	const getGroupByName = (groupId?: string) => {
		return groups.find((g) => g.id === groupId);
	};

	if (loading) {
		return (
			<Card>
				<CardContent className="p-6">
					<div className="animate-pulse space-y-4">
						{[...Array(5)].map((_, i) => (
							<div key={i} className="flex items-center space-x-4">
								<div className="w-10 h-10 bg-slate-200 rounded-full" />
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-slate-200 rounded w-1/3" />
									<div className="h-3 bg-slate-200 rounded w-1/2" />
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center">
					<Users className="h-5 w-5 mr-2 text-rose-500" />
					Convidados ({guests.length})
				</CardTitle>
			</CardHeader>
			<CardContent>
				{guests.length === 0 ? (
					<div className="text-center py-12 text-slate-500">
						<Users className="h-16 w-16 mx-auto mb-4 text-slate-300" />
						<h3 className="text-xl font-medium mb-2">
							Nenhum convidado encontrado
						</h3>
						<p className="text-sm">
							Adicione convidados para começar a organizar seu casamento!
						</p>
					</div>
				) : (
					<div className="space-y-3">
						{guests.map((guest) => {
							const group = getGroupByName(guest.groupId);

							return (
								<div
									key={guest.id}
									className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
								>
									<div className="flex items-center space-x-4">
										{/* Status Indicator */}
										<div className="flex-shrink-0">
											{guest.rsvpStatus === 'confirmed' ? (
												<div className="w-3 h-3 bg-green-500 rounded-full" />
											) : (
												<div className="w-3 h-3 bg-slate-300 rounded-full" />
											)}
										</div>

										{/* Guest Info */}
										<div className="min-w-0 flex-1">
											<div className="flex items-center space-x-2 mb-1">
												<h4 className="font-medium text-slate-900 truncate">
													{guest.name}
												</h4>
												{group && (
													<span
														className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
														style={{
															backgroundColor: `${group.color}20`,
															color: group.color,
														}}
													>
														{group.name}
													</span>
												)}
											</div>

											<div className="flex items-center space-x-4 text-sm text-slate-500">
												{guest.email && (
													<div className="flex items-center">
														<Mail className="h-3 w-3 mr-1" />
														<span className="truncate">{guest.email}</span>
													</div>
												)}
												{guest.phone && (
													<div className="flex items-center">
														<Phone className="h-3 w-3 mr-1" />
														<span>{guest.phone}</span>
													</div>
												)}
												{!guest.email && !guest.phone && (
													<span className="text-slate-400">Sem contato</span>
												)}
											</div>
										</div>
									</div>

									{/* Actions */}
									<div className="flex items-center space-x-2">
										<Button
											variant="ghost"
											size="sm"
											onClick={() =>
												onToggleConfirm(
													guest.id,
													guest.rsvpStatus !== 'confirmed'
												)
											}
											className={cn(
												'h-8 w-8 p-0',
												guest.rsvpStatus === 'confirmed'
													? 'text-green-600 hover:text-green-700'
													: 'text-slate-400 hover:text-slate-600'
											)}
											title={
												guest.rsvpStatus === 'confirmed'
													? 'Desconfirmar'
													: 'Confirmar'
											}
										>
											{guest.rsvpStatus === 'confirmed' ? (
												<UserCheck className="h-4 w-4" />
											) : (
												<UserX className="h-4 w-4" />
											)}
										</Button>

										<Button
											variant="ghost"
											size="sm"
											onClick={() => onEditGuest(guest)}
											className="h-8 w-8 p-0"
											title="Editar convidado"
										>
											<MoreHorizontal className="h-4 w-4" />
										</Button>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
