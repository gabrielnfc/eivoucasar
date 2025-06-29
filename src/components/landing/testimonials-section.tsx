'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Star, Quote, Heart, Trophy, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import RomanticDecorations from '@/components/ui/romantic-decorations';

const testimonials = [
	{
		stars: 5,
		text: 'A gamificação foi um sucesso! Os convidados adoraram a competição entre as famílias. Arrecadamos 40% mais do que esperávamos para a lua de mel.',
		name: 'Ana & Carlos',
		date: 'Casaram em Junho/2024',
		image:
			'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=100&h=100&fit=crop&crop=faces',
		color: 'from-rose-500 to-pink-500',
		bgColor: 'from-rose-50 to-pink-50',
		achievement: '🎯 +40% Arrecadação',
	},
	{
		stars: 5,
		text: 'O RSVP sem cadastro foi perfeito! 98% dos convidados confirmaram pelo site. O processo foi super simples e elegante.',
		name: 'Marina & Felipe',
		date: 'Casaram em Agosto/2024',
		image:
			'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=100&h=100&fit=crop&crop=faces',
		color: 'from-emerald-500 to-teal-500',
		bgColor: 'from-emerald-50 to-teal-50',
		achievement: '📊 98% Confirmação',
	},
	{
		stars: 5,
		text: 'O suporte foi excepcional! Nos ajudaram a configurar tudo em 1 dia. O site ficou lindo e todos elogiaram a organização.',
		name: 'Julia & Roberto',
		date: 'Casaram em Setembro/2024',
		image:
			'https://images.unsplash.com/photo-1519741497674-611481863552?w=100&h=100&fit=crop&crop=faces',
		color: 'from-purple-500 to-violet-500',
		bgColor: 'from-purple-50 to-violet-50',
		achievement: '⚡ Setup em 24h',
	},
];

export default function TestimonialsSection() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<section className="relative py-20 lg:py-32 overflow-hidden">
			{/* Background Base */}
			<div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/50"></div>

			{/* Decorações Românticas */}
			<RomanticDecorations variant="section" />

			<div className="relative z-10 container mx-auto px-4">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="text-center space-y-16"
				>
					<div className="space-y-6">
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={inView ? { opacity: 1, scale: 1 } : {}}
							transition={{ delay: 0.2, duration: 0.6 }}
							className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-full px-6 py-3 shadow-lg"
						>
							<Trophy className="w-4 h-4 text-amber-500" />
							<span className="text-sm font-medium text-gray-700">
								Histórias de Sucesso
							</span>
						</motion.div>

						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.3, duration: 0.8 }}
							className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent"
						>
							Casais que realizaram
							<br />
							<span className="text-blue-600">o sonho</span>
						</motion.h2>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.4, duration: 0.8 }}
							className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
						>
							Veja como o EiVouCasar transformou casamentos em experiências
							inesquecíveis com resultados reais e mensuráveis
						</motion.p>
					</div>

					<div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								animate={inView ? { opacity: 1, y: 0 } : {}}
								transition={{
									delay: 0.6 + index * 0.2,
									duration: 0.6,
									ease: 'easeOut',
								}}
							>
								<Card
									className={`relative p-8 bg-gradient-to-br ${testimonial.bgColor} border border-white/50 shadow-xl shadow-gray-200/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-500 hover:-translate-y-2 group h-full flex flex-col`}
								>
									<div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
										<Quote className="w-8 h-8 text-gray-600" />
									</div>

									<div
										className={`absolute -top-4 left-6 bg-gradient-to-r ${testimonial.color} text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg`}
									>
										{testimonial.achievement}
									</div>

									<div className="flex gap-1 mb-6 mt-4">
										{[...Array(testimonial.stars)].map((_, i) => (
											<motion.div
												key={i}
												initial={{ opacity: 0, rotate: -180 }}
												animate={inView ? { opacity: 1, rotate: 0 } : {}}
												transition={{
													delay: 0.8 + index * 0.2 + i * 0.05,
													duration: 0.3,
												}}
											>
												<Star className="w-5 h-5 text-amber-400 fill-current drop-shadow-sm" />
											</motion.div>
										))}
									</div>

									<blockquote className="text-gray-700 italic text-lg leading-relaxed mb-8 flex-grow">
										"{testimonial.text}"
									</blockquote>

									<div className="flex items-center gap-4">
										<motion.div
											whileHover={{ scale: 1.1 }}
											className="relative"
										>
											<Image
												src={testimonial.image}
												alt={testimonial.name}
												width={60}
												height={60}
												className="w-15 h-15 rounded-full object-cover border-3 border-white shadow-lg"
											/>
											<div
												className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r ${testimonial.color} rounded-full flex items-center justify-center shadow-lg`}
											>
												<Heart className="w-3 h-3 text-white" />
											</div>
										</motion.div>

										<div>
											<div className="font-bold text-gray-900 text-lg">
												{testimonial.name}
											</div>
											<div className="text-sm text-gray-600 font-medium">
												{testimonial.date}
											</div>
										</div>
									</div>

									<div
										className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${testimonial.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl`}
									></div>
								</Card>
							</motion.div>
						))}
					</div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 1.4, duration: 0.8 }}
						className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-xl shadow-gray-200/50 max-w-3xl mx-auto"
					>
						<div className="flex items-center justify-center gap-3 mb-4">
							<Award className="w-8 h-8 text-blue-500" />
							<h3 className="text-2xl font-bold text-gray-900">
								Junte-se aos casais vencedores
							</h3>
						</div>

						<p className="text-gray-600 mb-6 leading-relaxed">
							Mais de 500 casais já transformaram seus casamentos em
							experiências únicas. Seu também pode ser o próximo sucesso!
						</p>

						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
						>
							Criar Meu Site Agora
						</motion.button>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
