'use client';

// ===============================================
// EICASEI - PRICING TABLE COMPONENT
// ===============================================

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
	SUBSCRIPTION_PLANS,
	formatPrice,
	type PlanId,
} from '@/lib/stripe/products';
import { Check, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

interface PricingTableProps {
	onSelectPlan?: (planId: PlanId, interval: 'monthly' | 'yearly') => void;
	className?: string;
}

export default function PricingTable({
	onSelectPlan,
	className,
}: PricingTableProps) {
	const [interval, setInterval] = useState<'monthly' | 'yearly'>('monthly');
	const [loading, setLoading] = useState<string | null>(null);
	const { user } = useAuth();

	const handleSelectPlan = async (planId: PlanId) => {
		if (!user) {
			// Redirect to login if not authenticated
			window.location.href = '/login?redirect=/pricing';
			return;
		}

		setLoading(planId);

		try {
			if (onSelectPlan) {
				onSelectPlan(planId, interval);
			} else {
				// Default behavior: redirect to checkout
				const response = await fetch('/api/stripe/checkout', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						planId,
						interval,
						userId: user.id,
						email: user.email,
					}),
				});

				const { url, error } = await response.json();

				if (error) {
					throw new Error(error);
				}

				if (url) {
					window.location.href = url;
				}
			}
		} catch (error) {
			console.error('Error selecting plan:', error);
			alert('Erro ao processar pagamento. Tente novamente.');
		} finally {
			setLoading(null);
		}
	};

	return (
		<div className={`w-full max-w-6xl mx-auto ${className}`}>
			{/* Interval Toggle */}
			<div className="flex justify-center mb-8">
				<div className="relative flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
					<button
						onClick={() => setInterval('monthly')}
						className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
							interval === 'monthly'
								? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md'
								: 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
						}`}
					>
						Mensal
					</button>
					<button
						onClick={() => setInterval('yearly')}
						className={`px-6 py-2 text-sm font-medium rounded-md transition-all relative ${
							interval === 'yearly'
								? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md'
								: 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
						}`}
					>
						Anual
						<span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
							-17%
						</span>
					</button>
				</div>
			</div>

			{/* Plans Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => {
					const planId = key as PlanId;
					const price =
						interval === 'monthly' ? plan.priceMonthly : plan.priceYearly;
					const isPopular = planId === 'PREMIUM';

					return (
						<Card
							key={planId}
							className={`relative p-8 bg-white dark:bg-slate-800 ${
								isPopular
									? 'border-2 border-rose-500 shadow-xl scale-105'
									: 'border border-slate-200 dark:border-slate-700'
							}`}
						>
							{/* Popular Badge */}
							{isPopular && (
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
									<div className="bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
										<Sparkles className="w-4 h-4" />
										Mais Popular
									</div>
								</div>
							)}

							{/* Plan Header */}
							<div className="text-center mb-8">
								<h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
									{plan.name}
								</h3>
								<p className="text-slate-600 dark:text-slate-400 mb-6">
									{plan.description}
								</p>

								<div className="mb-6">
									<div className="flex items-baseline justify-center">
										<span className="text-4xl font-bold text-slate-900 dark:text-white">
											{formatPrice(price)}
										</span>
										<span className="text-slate-600 dark:text-slate-400 ml-2">
											/{interval === 'monthly' ? 'mês' : 'ano'}
										</span>
									</div>
									{interval === 'yearly' && (
										<p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">
											Economie{' '}
											{formatPrice(plan.priceMonthly * 12 - plan.priceYearly)}{' '}
											por ano
										</p>
									)}
								</div>

								<Button
									onClick={() => handleSelectPlan(planId)}
									disabled={loading === planId}
									className={`w-full py-3 ${
										isPopular
											? 'bg-rose-500 hover:bg-rose-600 text-white'
											: 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'
									}`}
								>
									{loading === planId ? 'Processando...' : 'Começar Agora'}
								</Button>
							</div>

							{/* Features List */}
							<div className="space-y-4">
								{plan.features.map((feature, index) => (
									<div key={index} className="flex items-center gap-3">
										<Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
										<span className="text-slate-700 dark:text-slate-300 text-sm">
											{feature}
										</span>
									</div>
								))}
							</div>

							{/* Plan Limits */}
							<div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
								<div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
									<div>
										Convidados:{' '}
										{plan.maxGuests === -1 ? 'Ilimitados' : plan.maxGuests}
									</div>
									<div>
										Fotos:{' '}
										{plan.maxPhotos === -1 ? 'Ilimitadas' : plan.maxPhotos}
									</div>
									{plan.allowsCustomDomain && (
										<div>✓ Domínio personalizado</div>
									)}
									{plan.allowsAnalytics && <div>✓ Analytics avançado</div>}
								</div>
							</div>
						</Card>
					);
				})}
			</div>

			{/* FAQ or Additional Info */}
			<div className="text-center mt-12">
				<p className="text-slate-600 dark:text-slate-400 text-sm">
					Todos os planos incluem 7 dias grátis. Cancele quando quiser.
				</p>
				<p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
					Dúvidas?{' '}
					<a href="/contact" className="text-rose-500 hover:underline">
						Entre em contato
					</a>
				</p>
			</div>
		</div>
	);
}
 