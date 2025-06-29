import { MoreHorizontal, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import type { GuestGroup } from '@/types/guest';
import { cn } from '@/lib/utils';

interface GroupListProps {
	groups: GuestGroup[];
	selectedGroup: string;
	onSelectGroup: (groupId: string) => void;
	onEditGroup: (group: GuestGroup) => void;
	onDeleteGroup: (groupId: string) => void;
}

export function GroupList({
	groups,
	selectedGroup,
	onSelectGroup,
	onEditGroup,
	onDeleteGroup,
}: GroupListProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center">
					<Users className="h-5 w-5 mr-2 text-rose-500" />
					Grupos ({groups.length})
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				{groups.length === 0 ? (
					<div className="text-center py-8 text-slate-500">
						<Users className="h-12 w-12 mx-auto mb-4 text-slate-300" />
						<h3 className="text-lg font-medium mb-2">Nenhum grupo criado</h3>
						<p className="text-sm">
							Crie grupos para organizar seus convidados e acompanhar a
							competição!
						</p>
					</div>
				) : (
					<>
						{/* All Groups Option */}
						<button
							className={cn(
								'w-full text-left p-3 rounded-lg border transition-colors',
								selectedGroup === ''
									? 'border-rose-500 bg-rose-50'
									: 'border-slate-200 hover:border-slate-300'
							)}
							onClick={() => onSelectGroup('')}
						>
							<div className="flex items-center justify-between">
								<span className="font-medium">Todos os Grupos</span>
								<span className="text-sm text-slate-500">
									{groups.reduce((sum, g) => sum + g.memberCount, 0)} convidados
								</span>
							</div>
						</button>

						{/* Individual Groups */}
						{groups.map((group) => {
							const progressPercentage =
								group.targetAmount > 0
									? (group.currentAmount / group.targetAmount) * 100
									: 0;

							return (
								<div
									key={group.id}
									className={cn(
										'p-3 rounded-lg border transition-colors cursor-pointer',
										selectedGroup === group.id
											? 'border-rose-500 bg-rose-50'
											: 'border-slate-200 hover:border-slate-300'
									)}
									onClick={() => onSelectGroup(group.id)}
								>
									<div className="flex items-start justify-between mb-2">
										<div className="flex items-center space-x-2">
											<div
												className="w-3 h-3 rounded-full"
												style={{ backgroundColor: group.color }}
											/>
											<span className="font-medium text-slate-900">
												{group.name}
											</span>
										</div>

										<Button
											variant="ghost"
											size="sm"
											className="h-6 w-6 p-0"
											onClick={(e) => {
												e.stopPropagation();
												onEditGroup(group);
											}}
										>
											<MoreHorizontal className="h-4 w-4" />
										</Button>
									</div>

									{group.description && (
										<p className="text-xs text-slate-500 mb-2">
											{group.description}
										</p>
									)}

									<div className="space-y-2">
										<div className="flex items-center justify-between text-sm">
											<span className="text-slate-600">
												{group.memberCount} convidados
											</span>
											<span className="font-medium">
												{formatCurrency(group.currentAmount)}
											</span>
										</div>

										{group.targetAmount > 0 && (
											<>
												<div className="flex items-center justify-between text-xs text-slate-500">
													<span>
														Meta: {formatCurrency(group.targetAmount)}
													</span>
													<span>{Math.round(progressPercentage)}%</span>
												</div>
												<div className="w-full bg-slate-200 rounded-full h-1.5">
													<div
														className="h-1.5 rounded-full transition-all duration-300"
														style={{
															width: `${Math.min(progressPercentage, 100)}%`,
															backgroundColor: group.color,
														}}
													/>
												</div>
											</>
										)}
									</div>
								</div>
							);
						})}
					</>
				)}
			</CardContent>
		</Card>
	);
}
