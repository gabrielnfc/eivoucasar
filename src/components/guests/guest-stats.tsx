import { Users, UserCheck, Trophy, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import type { GuestGroup } from '@/types/guest';
import { cn } from '@/lib/utils';

interface GuestStatsProps {
	totalGuests: number;
	confirmedGuests: number;
	groups: GuestGroup[];
	className?: string;
}

export function GuestStats({
	totalGuests,
	confirmedGuests,
	groups,
	className,
}: GuestStatsProps) {
	const totalContributed = groups.reduce(
		(sum, group) => sum + group.currentAmount,
		0
	);
	const totalTarget = groups.reduce(
		(sum, group) => sum + group.targetAmount,
		0
	);
	const progressPercentage =
		totalTarget > 0 ? (totalContributed / totalTarget) * 100 : 0;

	return (
		<div
			className={cn(
				'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
				className
			)}
		>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Total de Convidados
					</CardTitle>
					<Users className="h-4 w-4 text-slate-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{totalGuests}</div>
					<p className="text-xs text-slate-500">
						{confirmedGuests} confirmados
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Taxa de Confirmação
					</CardTitle>
					<UserCheck className="h-4 w-4 text-slate-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{totalGuests > 0
							? Math.round((confirmedGuests / totalGuests) * 100)
							: 0}
						%
					</div>
					<p className="text-xs text-slate-500">dos convidados confirmaram</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Total Arrecadado
					</CardTitle>
					<Trophy className="h-4 w-4 text-slate-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{formatCurrency(totalContributed)}
					</div>
					<p className="text-xs text-slate-500">
						de {formatCurrency(totalTarget)} meta
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Progresso da Meta
					</CardTitle>
					<Target className="h-4 w-4 text-slate-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{Math.round(progressPercentage)}%
					</div>
					<div className="w-full bg-slate-200 rounded-full h-2 mt-2">
						<div
							className="bg-rose-500 h-2 rounded-full transition-all duration-300"
							style={{ width: `${Math.min(progressPercentage, 100)}%` }}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
