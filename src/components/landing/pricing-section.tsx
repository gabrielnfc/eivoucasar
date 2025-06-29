'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Crown, Star, Zap, Sparkles, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RomanticDecorations from '@/components/ui/romantic-decorations';

const plans = [
	{
		name: 'Básico',
		price: 'R$ 29,90',
		period: '/mês',
		description: 'Perfeito para casamentos íntimos',
		features: [
			'Site personalizado',
			'Até 100 convidados',
			'RSVP básico',
			'Lista de presentes',
			'Suporte por email',
		],
		color: 'from-blue-500 to-cyan-500',
		bgGradient: 'from-blue-50 to-cyan-50',
		popular: false,
	},
	{
		name: 'Premium',
		price: 'R$ 49,90',
		period: '/mês',
		description: 'Ideal para a maioria dos casamentos',
		features: [
			'Tudo do Básico',
			'Até 300 convidados',
			'Gamificação completa',
			'Analytics avançado',
			'Temas premium',
			'Suporte prioritário',
		],
		color: 'from-purple-500 to-pink-500',
		bgGradient: 'from-purple-50 to-pink-50',
		popular: true,
	},
	{
		name: 'Pro',
		price: 'R$ 79,90',
		period: '/mês',
		description: 'Para casamentos grandes e únicos',
		features: [
			'Tudo do Premium',
			'Convidados ilimitados',
			'Integração WhatsApp',
			'Domínio personalizado',
			'Manager dedicado',
			'Setup personalizado',
		],
		color: 'from-amber-500 to-orange-500',
		bgGradient: 'from-amber-50 to-orange-50',
		popular: false,
	},
];

const testimonials = [
	{ name: 'Maria & João', text: 'Economizamos R$ 3.000 em convites!' },
	{ name: 'Ana & Pedro', text: 'Os convidados adoraram a gamificação!' },
	{ name: 'Julia & Carlos', text: 'Setup em apenas 2 horas!' },
];

export default function PricingSection() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<section className="relative py-20 lg:py-32 overflow-hidden">
			{/* Background Base */}
			<div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-rose-50/30"></div>

			{/* Decorações Românticas */}
			<RomanticDecorations variant="section" />

			{/* Conteúdo Principal */}
			<div className="relative z-10 container mx-auto px-4">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					{/* Badge */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={inView ? { opacity: 1, scale: 1 } : {}}
						transition={{ delay: 0.2, duration: 0.6 }}
						className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-full px-6 py-3 mb-8 shadow-lg"
					>
						<Crown className="w-4 h-4 text-amber-500" />
						<span className="text-sm font-medium text-gray-700">
							Planos Transparentes
						</span>
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.3, duration: 0.8 }}
						className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-amber-800 to-orange-900 bg-clip-text text-transparent mb-6"
					>
						Preços que fazem
						<br />
						<span className="text-amber-600">sentido</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.4, duration: 0.8 }}
						className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
					>
						Investimento acessível para criar memórias que duram para sempre.
						Sem taxas ocultas, sem surpresas.
					</motion.p>

					{/* Elementos de Confiança */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.5, duration: 0.8 }}
						className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-600"
					>
						<div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
							<Shield className="w-4 h-4 text-green-500" />
							<span>7 dias grátis</span>
						</div>
						<div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
							<Heart className="w-4 h-4 text-rose-500" />
							<span>Sem fidelidade</span>
						</div>
						<div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
							<Zap className="w-4 h-4 text-blue-500" />
							<span>Ativação instantânea</span>
						</div>
					</motion.div>
				</motion.div>

				{/* Grid de Planos */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					{plans.map((plan, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{
								delay: 0.6 + index * 0.1,
								duration: 0.6,
								ease: 'easeOut',
							}}
							className={`relative group ${
								plan.popular ? 'md:-mt-8 md:scale-105' : ''
							}`}
						>
							{/* Badge Popular */}
							{plan.popular && (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={inView ? { opacity: 1, scale: 1 } : {}}
									transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
									className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
								>
									<div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
										<Star className="w-4 h-4 inline mr-1" />
										Mais Popular
									</div>
								</motion.div>
							)}

							<div
								className={`relative bg-gradient-to-br ${
									plan.bgGradient
								} border-2 ${
									plan.popular ? 'border-purple-300/50' : 'border-white/50'
								} rounded-3xl p-8 shadow-xl shadow-gray-200/30 backdrop-blur-sm group-hover:shadow-2xl group-hover:shadow-gray-300/40 transition-all duration-500 h-full flex flex-col`}
							>
								{/* Elementos Decorativos Internos */}
								<div
									className={`absolute top-4 right-4 w-20 h-20 bg-gradient-to-br ${plan.color} opacity-10 rounded-full blur-xl`}
								></div>

								{/* Header do Plano */}
								<div className="text-center mb-8">
									<div
										className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
									>
										{index === 0 && <Zap className="w-8 h-8 text-white" />}
										{index === 1 && <Crown className="w-8 h-8 text-white" />}
										{index === 2 && <Star className="w-8 h-8 text-white" />}
									</div>

									<h3 className="text-2xl font-bold text-gray-900 mb-2">
										{plan.name}
									</h3>
									<p className="text-gray-600 text-sm">{plan.description}</p>
								</div>

								{/* Preço */}
								<div className="text-center mb-8">
									<div className="flex items-baseline justify-center gap-1">
										<span className="text-4xl font-bold text-gray-900">
											{plan.price}
										</span>
										<span className="text-gray-600">{plan.period}</span>
									</div>
								</div>

								{/* Features */}
								<div className="flex-grow mb-8">
									<ul className="space-y-4">
										{plan.features.map((feature, featureIndex) => (
											<motion.li
												key={featureIndex}
												initial={{ opacity: 0, x: -20 }}
												animate={inView ? { opacity: 1, x: 0 } : {}}
												transition={{
													delay: 0.8 + index * 0.1 + featureIndex * 0.05,
													duration: 0.4,
												}}
												className="flex items-center gap-3"
											>
												<div
													className={`w-5 h-5 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center flex-shrink-0`}
												>
													<Check className="w-3 h-3 text-white" />
												</div>
												<span className="text-gray-700">{feature}</span>
											</motion.li>
										))}
									</ul>
								</div>

								{/* CTA Button */}
								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Button
										className={`w-full ${
											plan.popular
												? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
												: 'bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50'
										} py-4 rounded-2xl font-semibold transition-all duration-300`}
									>
										{plan.popular ? 'Começar Agora' : 'Teste Grátis'}
									</Button>
								</motion.div>

								{/* Linha Decorativa Bottom */}
								<div
									className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${plan.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl`}
								></div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Social Proof */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 1.2, duration: 0.8 }}
					className="mt-20 text-center"
				>
					<div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-xl shadow-gray-200/50 max-w-4xl mx-auto">
						<Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-6" />
						<h3 className="text-2xl font-bold text-gray-900 mb-6">
							O que nossos casais estão dizendo
						</h3>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{testimonials.map((testimonial, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={inView ? { opacity: 1, y: 0 } : {}}
									transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
									className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200/50"
								>
									<p className="text-gray-700 mb-4 italic">
										"{testimonial.text}"
									</p>
									<p className="text-sm font-semibold text-gray-900">
										— {testimonial.name}
									</p>
								</motion.div>
							))}
						</div>

						<motion.div
							initial={{ opacity: 0 }}
							animate={inView ? { opacity: 1 } : {}}
							transition={{ delay: 1.8, duration: 0.6 }}
							className="mt-8 text-sm text-gray-500"
						>
							<p>
								💝 Garantia de 30 dias • 🔒 Pagamento seguro • 🎯 Suporte
								especializado
							</p>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
