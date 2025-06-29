'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-parallax';
import RomanticDecorations from '@/components/ui/romantic-decorations';
import {
	Heart,
	Users,
	Share2,
	Trophy,
	Smartphone,
	Palette,
	Shield,
	Gift,
	Sparkles,
	Star,
} from 'lucide-react';

const features = [
	{
		icon: Heart,
		title: 'Site Personalizado',
		description: 'Design único que reflete a personalidade do casal',
		gradient: 'from-rose-500 to-pink-500',
		bgColor: 'from-rose-50 to-pink-50',
	},
	{
		icon: Users,
		title: 'Gestão de Convidados',
		description: 'RSVP inteligente com confirmação em tempo real',
		gradient: 'from-blue-500 to-cyan-500',
		bgColor: 'from-blue-50 to-cyan-50',
	},
	{
		icon: Gift,
		title: 'Lista de Presentes',
		description: 'Sistema completo de presentes com múltiplas opções',
		gradient: 'from-emerald-500 to-teal-500',
		bgColor: 'from-emerald-50 to-teal-50',
	},
	{
		icon: Trophy,
		title: 'Gamificação Única',
		description: 'Ranking e desafios que engajam os convidados',
		gradient: 'from-amber-500 to-orange-500',
		bgColor: 'from-amber-50 to-orange-50',
	},
	{
		icon: Smartphone,
		title: 'Mobile First',
		description: 'Experiência perfeita em todos os dispositivos',
		gradient: 'from-purple-500 to-violet-500',
		bgColor: 'from-purple-50 to-violet-50',
	},
	{
		icon: Palette,
		title: 'Temas Elegantes',
		description: 'Mais de 20 temas profissionais para escolher',
		gradient: 'from-indigo-500 to-blue-500',
		bgColor: 'from-indigo-50 to-blue-50',
	},
	{
		icon: Shield,
		title: 'Segurança Total',
		description: 'Dados protegidos com criptografia de ponta',
		gradient: 'from-slate-500 to-gray-500',
		bgColor: 'from-slate-50 to-gray-50',
	},
	{
		icon: Share2,
		title: 'Compartilhamento',
		description: 'Integração com redes sociais e convites digitais',
		gradient: 'from-pink-500 to-rose-500',
		bgColor: 'from-pink-50 to-rose-50',
	},
];

export default function FeaturesSection() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<section className="relative py-20 lg:py-32 overflow-hidden">
			{/* Background Base */}
			<div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-stone-100"></div>

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
						className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-full px-6 py-3 mb-8 shadow-lg"
					>
						<Star className="w-4 h-4 text-purple-500" />
						<span className="text-sm font-medium text-gray-700">
							Recursos Inovadores
						</span>
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.3, duration: 0.8 }}
						className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-900 bg-clip-text text-transparent mb-6"
					>
						Tudo que você precisa
						<br />
						<span className="text-purple-600">em uma plataforma</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.4, duration: 0.8 }}
						className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
					>
						Ferramentas profissionais que transformam a organização do seu
						casamento em uma experiência única e memorável
					</motion.p>
				</motion.div>

				{/* Grid de Features */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								animate={inView ? { opacity: 1, y: 0 } : {}}
								transition={{
									delay: 0.5 + index * 0.1,
									duration: 0.6,
									ease: 'easeOut',
								}}
								className="group"
							>
								<div
									className={`relative bg-gradient-to-br ${feature.bgColor} border border-white/50 rounded-3xl p-8 shadow-lg shadow-gray-200/50 backdrop-blur-sm hover:shadow-xl hover:shadow-gray-300/50 transition-all duration-500 hover:-translate-y-2`}
								>
									{/* Elemento decorativo interno */}
									<div className="absolute top-4 right-4 w-16 h-16 bg-white/30 rounded-full blur-xl"></div>

									{/* Ícone com gradiente */}
									<div
										className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
									>
										<Icon className="w-8 h-8 text-white" />
									</div>

									<h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
										{feature.title}
									</h3>

									<p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
										{feature.description}
									</p>

									{/* Linha decorativa */}
									<div
										className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl`}
									></div>
								</div>
							</motion.div>
						);
					})}
				</div>

				{/* CTA Bottom */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 1.2, duration: 0.8 }}
					className="text-center mt-20"
				>
					<div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-xl shadow-gray-200/50 max-w-2xl mx-auto">
						<Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-4" />
						<h3 className="text-2xl font-bold text-gray-900 mb-3">
							Pronto para começar?
						</h3>
						<p className="text-gray-600 mb-6">
							Experimente todos esses recursos gratuitamente por 7 dias
						</p>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
						>
							Teste Grátis Agora
						</motion.button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
