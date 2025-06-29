'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-parallax';
import { useRef } from 'react';
import {
	Trophy,
	Medal,
	Crown,
	Star,
	Zap,
	Target,
	Award,
	Users,
	TrendingUp,
	Gift,
	Heart,
	Sparkles,
} from 'lucide-react';
import {
	HeartAnimation,
	SparklesAnimation,
} from '@/components/ui/lottie-animations';

const rankings = [
	{
		position: 1,
		group: 'Família da Noiva',
		score: 2850,
		icon: Crown,
		color: 'from-yellow-400 to-amber-500',
		bgColor: 'from-yellow-50 to-amber-50',
		members: 24,
		achievements: ['🎯 RSVP Completo', '🎁 Presentes +5', '📸 Fotos +10'],
	},
	{
		position: 2,
		group: 'Amigos da Faculdade',
		score: 2340,
		icon: Medal,
		color: 'from-slate-400 to-gray-500',
		bgColor: 'from-slate-50 to-gray-50',
		members: 18,
		achievements: ['⚡ Confirmação Rápida', '🎉 Participação Ativa'],
	},
	{
		position: 3,
		group: 'Família do Noivo',
		score: 1890,
		icon: Award,
		color: 'from-orange-400 to-red-500',
		bgColor: 'from-orange-50 to-red-50',
		members: 20,
		achievements: ['💝 Presentes Únicos', '📱 Engajamento Digital'],
	},
];

const features = [
	{
		icon: Trophy,
		title: 'Ranking em Tempo Real',
		description: 'Competição saudável entre grupos de convidados',
		color: 'from-amber-500 to-yellow-500',
	},
	{
		icon: Target,
		title: 'Desafios Personalizados',
		description: 'Missões exclusivas que engajam cada convidado',
		color: 'from-blue-500 to-cyan-500',
	},
	{
		icon: Award,
		title: 'Sistema de Conquistas',
		description: 'Badges e recompensas por participação ativa',
		color: 'from-purple-500 to-pink-500',
	},
	{
		icon: Zap,
		title: 'Pontuação Inteligente',
		description: 'Algoritmo que premia ações relevantes',
		color: 'from-emerald-500 to-teal-500',
	},
];

export default function GamificationSection() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start end', 'end start'],
	});

	const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
	const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
	const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

	return (
		<section
			ref={containerRef}
			className="relative py-20 lg:py-32 overflow-hidden"
		>
			{/* Background Parallax Complexo */}
			<Parallax bgImage="" strength={500} className="absolute inset-0">
				{/* Gradiente Base Dinâmico */}
				<div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
					<div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 via-transparent to-amber-50/50"></div>
					<div className="absolute inset-0 bg-gradient-to-bl from-rose-50/30 via-transparent to-cyan-50/30"></div>
				</div>

				{/* Elementos Geométricos Animados */}
				<motion.div
					style={{ y: y1, rotate }}
					className="absolute top-20 left-20 w-80 h-80 opacity-10"
				>
					<div className="relative w-full h-full">
						<div className="absolute inset-0 bg-gradient-to-br from-purple-300/40 to-blue-300/40 rounded-full"></div>
						<div className="absolute top-10 left-10 w-60 h-60 border-8 border-amber-300/30 rounded-full"></div>
						<div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-rose-400/35 to-pink-400/35 rounded-full"></div>
						<div className="absolute top-30 left-30 w-20 h-20 bg-gradient-to-br from-emerald-400/40 to-teal-400/40 rounded-full"></div>
					</div>
				</motion.div>

				<motion.div
					style={{ y: y2 }}
					className="absolute top-40 right-16 w-64 h-64 opacity-12"
					animate={{
						rotate: [0, 360],
						scale: [1, 1.2, 1],
					}}
					transition={{
						duration: 25,
						repeat: Infinity,
						ease: 'linear',
					}}
				>
					<div className="w-full h-full">
						<div className="absolute inset-0 bg-gradient-to-br from-cyan-300/30 to-blue-300/30 transform rotate-45 rounded-3xl"></div>
						<div className="absolute top-4 left-4 w-56 h-56 border-4 border-purple-300/40 transform -rotate-12 rounded-2xl"></div>
						<div className="absolute top-8 left-8 w-48 h-48 bg-gradient-to-br from-amber-300/25 to-orange-300/25 transform rotate-12 rounded-3xl"></div>
					</div>
				</motion.div>

				<motion.div
					className="absolute bottom-20 left-1/3 w-72 h-72 opacity-8"
					animate={{
						scale: [1, 1.3, 1],
						rotate: [0, 180, 360],
						x: [0, 50, 0],
					}}
					transition={{
						duration: 30,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="relative w-full h-full">
						<div className="absolute inset-0 border-12 border-emerald-200/30 rounded-full"></div>
						<div className="absolute top-8 left-8 w-56 h-56 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full"></div>
						<div className="absolute top-16 left-16 w-40 h-40 border-6 border-blue-300/40 rounded-full"></div>
					</div>
				</motion.div>

				{/* Partículas Brilhantes Flutuantes */}
				{[...Array(15)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-6 h-6"
						style={{
							left: `${10 + i * 6}%`,
							top: `${20 + (i % 5) * 15}%`,
						}}
						animate={{
							y: [0, -40, 0],
							opacity: [0.2, 1, 0.2],
							scale: [0.3, 1.2, 0.3],
							rotate: [0, 180, 360],
						}}
						transition={{
							duration: 4 + i * 0.3,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: i * 0.2,
						}}
					>
						<div className="w-full h-full bg-gradient-to-r from-yellow-400/70 to-amber-400/70 rounded-full shadow-lg shadow-yellow-200/50"></div>
					</motion.div>
				))}

				{/* Elementos Lottie Decorativos */}
				<div className="absolute top-32 right-32 opacity-20 transform scale-150">
					<HeartAnimation size="lg" />
				</div>
				<div className="absolute bottom-40 left-16 opacity-15 transform scale-125">
					<SparklesAnimation size="xl" />
				</div>
				<div className="absolute top-1/2 right-1/4 opacity-10 transform scale-110">
					<SparklesAnimation size="lg" />
				</div>

				{/* Ondas Decorativas */}
				<div className="absolute inset-0">
					<svg
						className="absolute bottom-0 w-full h-32"
						viewBox="0 0 1200 120"
						preserveAspectRatio="none"
					>
						<defs>
							<linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.1" />
								<stop offset="50%" stopColor="#EC4899" stopOpacity="0.15" />
								<stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
							</linearGradient>
						</defs>
						<path
							d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z"
							fill="url(#wave1)"
						/>
					</svg>
				</div>

				{/* Overlay Final */}
				<div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/50"></div>
				<div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30"></div>
			</Parallax>

			{/* Conteúdo Principal */}
			<div className="relative z-10 container mx-auto px-4">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="text-center mb-20"
				>
					{/* Badge Gamificação */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={inView ? { opacity: 1, scale: 1 } : {}}
						transition={{ delay: 0.2, duration: 0.6 }}
						className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-full px-6 py-3 mb-8 shadow-lg"
					>
						<Trophy className="w-4 h-4 text-purple-500" />
						<span className="text-sm font-medium text-gray-700">
							Gamificação Exclusiva
						</span>
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.3, duration: 0.8 }}
						className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-900 bg-clip-text text-transparent mb-6"
					>
						Transforme convidados em
						<br />
						<span className="text-purple-600">participantes ativos</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.4, duration: 0.8 }}
						className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
					>
						Sistema único de gamificação que cria engajamento real e torna seu
						casamento uma experiência interativa inesquecível
					</motion.p>
				</motion.div>

				<div className="grid lg:grid-cols-2 gap-16 items-start">
					{/* Ranking Mockup */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={inView ? { opacity: 1, x: 0 } : {}}
						transition={{ delay: 0.6, duration: 0.8 }}
						className="space-y-6"
					>
						<div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-2xl shadow-gray-200/50">
							{/* Header do Ranking */}
							<div className="flex items-center justify-between mb-8">
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
										<Trophy className="w-6 h-6 text-white" />
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-900">
											Ranking dos Grupos
										</h3>
										<p className="text-sm text-gray-600">
											Atualizado em tempo real
										</p>
									</div>
								</div>
								<div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
									🔥 Ao Vivo
								</div>
							</div>

							{/* Lista de Ranking */}
							<div className="space-y-4">
								{rankings.map((rank, index) => {
									const Icon = rank.icon;
									return (
										<motion.div
											key={index}
											initial={{ opacity: 0, x: -20 }}
											animate={inView ? { opacity: 1, x: 0 } : {}}
											transition={{
												delay: 0.8 + index * 0.1,
												duration: 0.5,
											}}
											className={`relative bg-gradient-to-r ${rank.bgColor} border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group`}
										>
											{/* Posição e Ícone */}
											<div className="flex items-center gap-4">
												<div
													className={`relative w-14 h-14 bg-gradient-to-r ${rank.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
												>
													<span className="text-2xl font-bold text-white">
														#{rank.position}
													</span>
												</div>

												<div className="flex-1">
													<div className="flex items-center justify-between mb-2">
														<h4 className="text-lg font-bold text-gray-900">
															{rank.group}
														</h4>
														<div className="flex items-center gap-2">
															<Users className="w-4 h-4 text-gray-600" />
															<span className="text-sm text-gray-600">
																{rank.members}
															</span>
														</div>
													</div>

													<div className="flex items-center justify-between">
														<div className="flex items-center gap-2">
															<TrendingUp className="w-4 h-4 text-emerald-600" />
															<span className="text-2xl font-bold text-gray-900">
																{rank.score.toLocaleString()}
															</span>
															<span className="text-sm text-gray-600">
																pontos
															</span>
														</div>
													</div>

													{/* Conquistas */}
													<div className="flex flex-wrap gap-1 mt-3">
														{rank.achievements.map((achievement, achIndex) => (
															<span
																key={achIndex}
																className="text-xs bg-white/70 text-gray-700 px-2 py-1 rounded-full border border-gray-200/50"
															>
																{achievement}
															</span>
														))}
													</div>
												</div>
											</div>

											{/* Barra de Progresso */}
											<div className="mt-4 bg-white/50 rounded-full h-2 overflow-hidden">
												<motion.div
													className={`h-full bg-gradient-to-r ${rank.color} rounded-full`}
													initial={{ width: 0 }}
													animate={
														inView
															? { width: `${(rank.score / 3000) * 100}%` }
															: {}
													}
													transition={{
														delay: 1 + index * 0.1,
														duration: 1,
														ease: 'easeOut',
													}}
												/>
											</div>
										</motion.div>
									);
								})}
							</div>
						</div>
					</motion.div>

					{/* Features da Gamificação */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={inView ? { opacity: 1, x: 0 } : {}}
						transition={{ delay: 0.7, duration: 0.8 }}
						className="space-y-8"
					>
						<div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-2xl shadow-gray-200/50">
							<div className="flex items-center gap-3 mb-8">
								<div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center">
									<Sparkles className="w-6 h-6 text-white" />
								</div>
								<div>
									<h3 className="text-xl font-bold text-gray-900">
										Como Funciona
									</h3>
									<p className="text-sm text-gray-600">
										Sistema inteligente de pontuação
									</p>
								</div>
							</div>

							<div className="space-y-6">
								{features.map((feature, index) => {
									const Icon = feature.icon;
									return (
										<motion.div
											key={index}
											initial={{ opacity: 0, y: 20 }}
											animate={inView ? { opacity: 1, y: 0 } : {}}
											transition={{
												delay: 0.9 + index * 0.1,
												duration: 0.5,
											}}
											className="flex items-start gap-4 group"
										>
											<div
												className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
											>
												<Icon className="w-6 h-6 text-white" />
											</div>

											<div>
												<h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
													{feature.title}
												</h4>
												<p className="text-gray-600 leading-relaxed">
													{feature.description}
												</p>
											</div>
										</motion.div>
									);
								})}
							</div>
						</div>

						{/* Estatísticas */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 1.4, duration: 0.6 }}
							className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl shadow-purple-200/50"
						>
							<div className="grid grid-cols-2 gap-6">
								<div className="text-center">
									<div className="text-3xl font-bold mb-2">+87%</div>
									<div className="text-sm opacity-90">Mais Engajamento</div>
								</div>
								<div className="text-center">
									<div className="text-3xl font-bold mb-2">+65%</div>
									<div className="text-sm opacity-90">Confirmações</div>
								</div>
								<div className="text-center">
									<div className="text-3xl font-bold mb-2">+92%</div>
									<div className="text-sm opacity-90">Satisfação</div>
								</div>
								<div className="text-center">
									<div className="text-3xl font-bold mb-2">+78%</div>
									<div className="text-sm opacity-90">Presentes</div>
								</div>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
