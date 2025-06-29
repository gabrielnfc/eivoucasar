'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
	ArrowRight,
	Heart,
	MessageCircle,
	Clock,
	Zap,
	Shield,
	Target,
	Check,
	Sparkles,
	Star,
	Gift,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import RomanticDecorations from '@/components/ui/romantic-decorations';

export default function CTASection() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const features = [
		{
			icon: Zap,
			title: 'Setup em 24h',
			description: 'Pronto para usar amanhã',
			color: 'from-yellow-400 to-amber-500',
		},
		{
			icon: Shield,
			title: 'Garantia total',
			description: '14 dias para testar grátis',
			color: 'from-emerald-400 to-teal-500',
		},
		{
			icon: Target,
			title: '92% de sucesso',
			description: 'Em confirmações RSVP',
			color: 'from-blue-400 to-cyan-500',
		},
	];

	const trustBadges = [
		{ icon: Gift, text: '50% OFF primeiro mês' },
		{ icon: Heart, text: 'Sem cartão de crédito' },
		{ icon: Star, text: 'Suporte especializado' },
	];

	return (
		<section className="relative py-20 lg:py-32 overflow-hidden">
			{/* Background Base */}
			<div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600"></div>
			<div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-amber-600/20"></div>

			{/* Decorações Românticas */}
			<RomanticDecorations variant="section" className="opacity-50" />

			{/* Conteúdo Principal */}
			<div className="relative z-10 container mx-auto px-4">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="text-center space-y-12 max-w-4xl mx-auto"
				>
					{/* Badge de Urgência */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={inView ? { opacity: 1, scale: 1 } : {}}
						transition={{ delay: 0.2, duration: 0.6 }}
						className="inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 text-white shadow-lg"
					>
						<Clock className="w-5 h-5 mr-3 text-amber-200" />
						<span className="font-medium">Oferta especial expira em:</span>
						<span className="ml-3 font-bold text-amber-200">⏰ 23:45:12</span>
					</motion.div>

					{/* Título Principal */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.3, duration: 0.8 }}
						className="space-y-6"
					>
						<h2 className="text-5xl lg:text-7xl font-bold leading-tight text-white">
							Seu casamento dos sonhos
							<span className="block bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 bg-clip-text text-transparent">
								começa agora!
							</span>
						</h2>

						<p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
							Mais de <strong className="text-yellow-200">500 casais</strong> já
							transformaram seus sonhos em realidade. Não deixe para depois -
							seu grande dia merece o melhor!
						</p>
					</motion.div>

					{/* Features Grid */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.5, duration: 0.8 }}
						className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
					>
						{features.map((feature, index) => {
							const Icon = feature.icon;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={inView ? { opacity: 1, y: 0 } : {}}
									transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
									className="text-center space-y-4 group"
								>
									<div
										className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300`}
									>
										<Icon className="w-8 h-8 text-white" />
									</div>
									<div className="space-y-2">
										<h3 className="text-lg font-bold text-white">
											{feature.title}
										</h3>
										<p className="text-white/80 text-sm leading-relaxed">
											{feature.description}
										</p>
									</div>
								</motion.div>
							);
						})}
					</motion.div>

					{/* CTAs */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.8, duration: 0.8 }}
						className="flex flex-col sm:flex-row gap-6 justify-center items-center"
					>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button
								size="lg"
								className="bg-white text-purple-600 hover:bg-gray-50 hover:text-purple-700 px-10 py-5 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl group"
							>
								<Heart className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
								Criar Nosso Site Grátis
								<ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
							</Button>
						</motion.div>

						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button
								size="lg"
								variant="outline"
								className="border-3 border-white text-white hover:bg-white hover:text-purple-600 px-10 py-5 text-xl font-semibold backdrop-blur-sm bg-white/10 rounded-2xl transition-all duration-300 group"
							>
								<MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
								Falar com Especialista
							</Button>
						</motion.div>
					</motion.div>

					{/* Trust Badges */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 1, duration: 0.6 }}
						className="flex flex-wrap justify-center gap-6 text-white/90"
					>
						{trustBadges.map((badge, index) => {
							const Icon = badge.icon;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={inView ? { opacity: 1, scale: 1 } : {}}
									transition={{ delay: 1.1 + index * 0.1, duration: 0.4 }}
									className="flex items-center gap-3 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3"
								>
									<Icon className="w-5 h-5 text-yellow-200" />
									<span className="font-medium text-sm">✨ {badge.text}</span>
								</motion.div>
							);
						})}
					</motion.div>

					{/* Final Urgency */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={inView ? { opacity: 1 } : {}}
						transition={{ delay: 1.4, duration: 0.6 }}
						className="bg-gradient-to-r from-yellow-400/20 to-amber-400/20 backdrop-blur-sm border border-yellow-200/30 rounded-2xl p-6 max-w-2xl mx-auto"
					>
						<div className="flex items-center justify-center gap-2 mb-2">
							<Sparkles className="w-5 h-5 text-yellow-200" />
							<span className="text-yellow-200 font-bold">
								Últimas 47 vagas
							</span>
							<Sparkles className="w-5 h-5 text-yellow-200" />
						</div>
						<p className="text-white/80 text-sm">
							🎯 Garantia de satisfação total • 💎 Qualidade premium • 🚀
							Resultados comprovados
						</p>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
