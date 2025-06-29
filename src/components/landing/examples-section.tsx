'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Eye, ChevronRight, Palette, Award, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	HeartAnimation,
	SparklesAnimation,
} from '@/components/ui/lottie-animations';
import RomanticDecorations from '@/components/ui/romantic-decorations';

const examples = [
	{
		id: 1,
		title: 'Ana & Pedro',
		subtitle: 'Igreja São Francisco',
		date: '22 de Dezembro, 2024',
		style: 'Clássico',
		image:
			'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=300&h=400&fit=crop&crop=faces',
		confirmed: '87%',
		raised: 'R$ 3.2k',
		color: 'from-rose-500 to-pink-500',
		bgColor: 'from-rose-100 to-pink-200',
		cardBg: 'from-rose-50 to-pink-50',
		animation: HeartAnimation,
	},
	{
		id: 2,
		title: 'Julia & Ricardo',
		subtitle: 'Praia de Copacabana',
		date: '15 de Março, 2025',
		style: 'Moderno',
		image:
			'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=300&h=400&fit=crop&crop=faces',
		confirmed: '92%',
		raised: 'R$ 5.8k',
		color: 'from-purple-500 to-indigo-500',
		bgColor: 'from-purple-100 to-indigo-200',
		cardBg: 'from-purple-50 to-indigo-50',
		animation: SparklesAnimation,
	},
	{
		id: 3,
		title: 'Carol & Miguel',
		subtitle: 'Sítio das Flores',
		date: '8 de Junho, 2025',
		style: 'Romântico',
		image:
			'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=400&fit=crop&crop=faces',
		confirmed: '94%',
		raised: 'R$ 4.1k',
		color: 'from-emerald-500 to-teal-500',
		bgColor: 'from-emerald-100 to-teal-200',
		cardBg: 'from-emerald-50 to-teal-50',
		animation: HeartAnimation,
	},
];

export default function ExamplesSection() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<section className="relative py-20 lg:py-32 overflow-hidden" id="examples">
			{/* Background Base */}
			<div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50/50 to-pink-50/30"></div>

			{/* Decorações Românticas */}
			<RomanticDecorations variant="section" />

			{/* Conteúdo Principal */}
			<div className="relative z-10 container mx-auto px-4">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="text-center space-y-16"
				>
					{/* Header */}
					<div className="space-y-6">
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={inView ? { opacity: 1, scale: 1 } : {}}
							transition={{ delay: 0.2, duration: 0.6 }}
							className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-full px-6 py-3 shadow-lg"
						>
							<Eye className="w-4 h-4 text-purple-500" />
							<span className="text-sm font-medium text-gray-700">
								Sites Reais de Casais
							</span>
						</motion.div>

						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.3, duration: 0.8 }}
							className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-900 bg-clip-text text-transparent"
						>
							Veja sites criados por
							<br />
							<span className="text-purple-600">casais apaixonados</span>
						</motion.h2>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.4, duration: 0.8 }}
							className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
						>
							Cada casal tem sua personalidade única. Veja como diferentes
							estilos e temas foram criados com nossa plataforma
						</motion.p>
					</div>

					{/* Examples Grid */}
					<div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{examples.map((example, index) => {
							const AnimationComponent = example.animation;
							return (
								<motion.div
									key={example.id}
									initial={{ opacity: 0, y: 40 }}
									animate={inView ? { opacity: 1, y: 0 } : {}}
									transition={{
										delay: 0.6 + index * 0.2,
										duration: 0.7,
										ease: 'easeOut',
									}}
									className="group cursor-pointer"
								>
									<div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
										<div
											className={`aspect-[4/5] bg-gradient-to-br ${example.bgColor} p-6 flex flex-col justify-between relative overflow-hidden`}
										>
											{/* Imagem de fundo dos noivos */}
											<Image
												src={example.image}
												alt={`${example.title} - Casal ${example.style}`}
												fill
												className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
											/>

											<div className="relative z-10 space-y-4">
												{/* Header do Card */}
												<div className="flex items-center justify-between">
													<motion.div
														whileHover={{ scale: 1.1, rotate: 10 }}
														className={`w-10 h-10 bg-gradient-to-r ${example.color} rounded-full border-3 border-white shadow-lg flex items-center justify-center`}
													>
														<AnimationComponent size="sm" />
													</motion.div>
													<div
														className={`text-sm text-white bg-gradient-to-r ${example.color} backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 shadow-md font-medium`}
													>
														{example.style}
													</div>
												</div>

												{/* Informações do Casal */}
												<div className="space-y-2">
													<h3 className="text-2xl font-bold text-gray-900 drop-shadow-sm">
														{example.title}
													</h3>
													<p className="text-gray-800 font-medium drop-shadow-sm">
														{example.subtitle}
													</p>
													<p className="text-sm text-gray-700 drop-shadow-sm">
														{example.date}
													</p>
												</div>
											</div>

											{/* Stats Cards */}
											<div className="grid grid-cols-2 gap-3 relative z-10">
												<motion.div
													whileHover={{ scale: 1.05 }}
													className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50"
												>
													<div className="text-lg font-bold text-green-600">
														{example.confirmed}
													</div>
													<div className="text-xs text-gray-700 font-medium">
														Confirmados
													</div>
												</motion.div>
												<motion.div
													whileHover={{ scale: 1.05 }}
													className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50"
												>
													<div className="text-lg font-bold text-emerald-600">
														{example.raised}
													</div>
													<div className="text-xs text-gray-700 font-medium">
														Arrecadado
													</div>
												</motion.div>
											</div>
										</div>

										{/* Overlay de Hover */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

										{/* Botão de Ação */}
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											whileHover={{ opacity: 1, y: 0 }}
											className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500"
										>
											<Button
												className={`w-full bg-white/95 backdrop-blur-sm text-gray-800 hover:bg-white border border-white/50 shadow-xl font-semibold`}
											>
												<Eye className="w-4 h-4 mr-2" />
												Ver Site Completo
											</Button>
										</motion.div>

										{/* Badge de Destaque */}
										<div className="absolute top-4 right-4">
											<motion.div
												animate={{
													scale: [1, 1.1, 1],
													rotate: [0, 5, -5, 0],
												}}
												transition={{
													duration: 2,
													repeat: Infinity,
													ease: 'easeInOut',
												}}
												className={`w-8 h-8 bg-gradient-to-r ${example.color} rounded-full flex items-center justify-center shadow-lg`}
											>
												<Award className="w-4 h-4 text-white" />
											</motion.div>
										</div>
									</div>
								</motion.div>
							);
						})}
					</div>

					{/* CTA Bottom */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 1.4, duration: 0.8 }}
						className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-xl shadow-gray-200/50 max-w-3xl mx-auto"
					>
						<div className="space-y-6">
							<div className="flex items-center justify-center gap-2 mb-4">
								<Palette className="w-6 h-6 text-purple-500" />
								<h3 className="text-2xl font-bold text-gray-900">
									Inspire-se e crie o seu
								</h3>
							</div>

							<p className="text-gray-600 leading-relaxed">
								Cada um dos sites acima foi criado em menos de 24 horas. Veja
								mais exemplos e descubra o estilo perfeito para o seu casamento.
							</p>

							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button
										size="lg"
										variant="outline"
										className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-2xl font-semibold"
									>
										Ver Mais Exemplos
										<ChevronRight className="w-5 h-5 ml-2" />
									</Button>
								</motion.div>

								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button
										size="lg"
										className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
									>
										<Heart className="w-5 h-5 mr-2" />
										Criar Meu Site Agora
									</Button>
								</motion.div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
