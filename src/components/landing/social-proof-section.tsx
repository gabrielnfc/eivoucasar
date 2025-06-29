'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Users, Heart, Trophy, TrendingUp } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

// Componente de Stats Animadas
function StatsSection() {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const stats = [
		{
			number: 500,
			label: 'Casais Atendidos',
			icon: Users,
			color: 'from-blue-500 to-cyan-500',
			suffix: '+',
		},
		{
			number: 92,
			label: 'Taxa de RSVP',
			icon: TrendingUp,
			color: 'from-emerald-500 to-teal-500',
			suffix: '%',
		},
		{
			number: 180,
			label: 'Arrecadado pelos Casais',
			icon: Trophy,
			color: 'from-amber-500 to-orange-500',
			prefix: 'R$ ',
			suffix: 'k',
		},
		{
			number: 4.9,
			label: 'Nota dos Casais',
			icon: Star,
			color: 'from-purple-500 to-pink-500',
			decimals: 1,
			suffix: '⭐',
		},
	];

	return (
		<div
			ref={ref}
			className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
		>
			{stats.map((stat, index) => {
				const Icon = stat.icon;
				return (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 30 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: index * 0.1, duration: 0.6 }}
						className="text-center space-y-4 group"
					>
						<div
							className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}
						>
							<Icon className="w-8 h-8 text-white" />
						</div>
						<div>
							<div className="text-4xl font-bold text-gray-900 mb-2">
								{stat.prefix || ''}
								{inView ? (
									<CountUp
										end={stat.number}
										duration={2.5}
										decimals={stat.decimals || 0}
									/>
								) : (
									'0'
								)}
								{stat.suffix || ''}
							</div>
							<div className="text-sm text-gray-600 font-medium">
								{stat.label}
							</div>
						</div>
					</motion.div>
				);
			})}
		</div>
	);
}

export default function SocialProofSection() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const couples = [
		{
			src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=100&h=100&fit=crop&crop=faces',
			alt: 'Casal feliz',
		},
		{
			src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=100&h=100&fit=crop&crop=faces',
			alt: 'Casal sorrindo',
		},
		{
			src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=100&h=100&fit=crop&crop=faces',
			alt: 'Noivos elegantes',
		},
		{
			src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=100&h=100&fit=crop&crop=faces',
			alt: 'Casal apaixonado',
		},
		{
			src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=100&h=100&fit=crop&crop=faces',
			alt: 'Noivos românticos',
		},
	];

	return (
		<section className="relative py-20 lg:py-32 overflow-hidden">
			{/* Background Decorativo */}
			<div className="absolute inset-0">
				{/* Gradiente Base */}
				<div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30"></div>

				{/* Elementos Geométricos Flutuantes */}
				<motion.div
					className="absolute top-20 left-10 w-48 h-48 opacity-8"
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
					<div className="w-full h-full border-4 border-blue-300/20 rounded-full"></div>
					<div className="absolute top-6 left-6 w-36 h-36 border-2 border-purple-300/25 rounded-full"></div>
					<div className="absolute top-12 left-12 w-24 h-24 bg-gradient-to-br from-cyan-300/15 to-blue-300/15 rounded-full"></div>
				</motion.div>

				<motion.div
					className="absolute top-32 right-16 w-40 h-40 opacity-6"
					animate={{
						y: [0, -20, 0],
						rotate: [0, 180, 360],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="w-full h-full bg-gradient-to-br from-purple-300/20 to-pink-300/20 transform rotate-45 rounded-3xl"></div>
				</motion.div>

				<motion.div
					className="absolute bottom-20 left-1/4 w-52 h-52 opacity-7"
					animate={{
						scale: [1, 1.15, 1],
						rotate: [45, 180, 45],
					}}
					transition={{
						duration: 30,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="w-full h-full border-6 border-emerald-300/25 rounded-2xl transform rotate-12"></div>
				</motion.div>

				{/* Partículas Brilhantes */}
				{[...Array(8)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-3 h-3 bg-gradient-to-r from-blue-400/60 to-purple-400/60 rounded-full"
						style={{
							left: `${20 + i * 10}%`,
							top: `${15 + (i % 3) * 25}%`,
						}}
						animate={{
							opacity: [0.3, 1, 0.3],
							scale: [0.5, 1.2, 0.5],
							y: [0, -15, 0],
						}}
						transition={{
							duration: 2.5 + i * 0.3,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: i * 0.2,
						}}
					/>
				))}

				{/* Overlay Gradiente */}
				<div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/40"></div>
			</div>

			{/* Conteúdo Principal */}
			<div className="relative z-10 container mx-auto px-4">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="text-center space-y-16"
				>
					{/* Header com Social Proof */}
					<div className="space-y-8">
						{/* Avatar Stack e Avaliações */}
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={inView ? { opacity: 1, scale: 1 } : {}}
							transition={{ delay: 0.2, duration: 0.6 }}
							className="flex flex-col items-center space-y-6"
						>
							{/* Avatar Stack com Animação */}
							<div className="flex items-center space-x-4">
								<div className="flex -space-x-3">
									{couples.map((couple, index) => (
										<motion.div
											key={index}
											initial={{ opacity: 0, scale: 0.5 }}
											animate={inView ? { opacity: 1, scale: 1 } : {}}
											transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
											whileHover={{ scale: 1.1, zIndex: 10 }}
											className="relative"
										>
											<Image
												src={couple.src}
												alt={couple.alt}
												width={50}
												height={50}
												className="w-12 h-12 rounded-full border-3 border-white object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
											/>
										</motion.div>
									))}
									<motion.div
										initial={{ opacity: 0, scale: 0.5 }}
										animate={inView ? { opacity: 1, scale: 1 } : {}}
										transition={{ delay: 0.8, duration: 0.4 }}
										className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full border-3 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
									>
										+500
									</motion.div>
								</div>

								{/* Estrelas com Animação */}
								<div className="flex space-x-1">
									{[...Array(5)].map((_, i) => (
										<motion.div
											key={i}
											initial={{ opacity: 0, rotate: -180 }}
											animate={inView ? { opacity: 1, rotate: 0 } : {}}
											transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
										>
											<Star className="w-5 h-5 text-amber-400 fill-current drop-shadow-sm" />
										</motion.div>
									))}
								</div>
							</div>

							{/* Texto de Social Proof */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={inView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.5, duration: 0.6 }}
								className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-6 shadow-xl shadow-gray-200/50 max-w-2xl mx-auto"
							>
								<div className="flex items-center justify-center gap-3 mb-3">
									<Heart className="w-6 h-6 text-rose-500" />
									<span className="text-lg font-bold text-gray-900">
										500+ casais apaixonados
									</span>
								</div>
								<p className="text-gray-600 leading-relaxed">
									já criaram seus sites únicos e transformaram seus casamentos
									em experiências inesquecíveis para todos os convidados
								</p>
							</motion.div>
						</motion.div>
					</div>

					{/* Stats Grid com Background Especial */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.7, duration: 0.8 }}
						className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-12 shadow-2xl shadow-gray-200/50"
					>
						<div className="text-center mb-12">
							<motion.h3
								initial={{ opacity: 0, y: 20 }}
								animate={inView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.8, duration: 0.6 }}
								className="text-3xl font-bold text-gray-900 mb-4"
							>
								Resultados Comprovados
							</motion.h3>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={inView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.9, duration: 0.6 }}
								className="text-gray-600 max-w-2xl mx-auto"
							>
								Dados reais de casais que escolheram nossa plataforma para criar
								seus sites de casamento únicos
							</motion.p>
						</div>

						<StatsSection />
					</motion.div>

					{/* Trust Indicators */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 1.2, duration: 0.6 }}
						className="flex flex-wrap justify-center gap-8 text-sm text-gray-500"
					>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
							<span>Dados verificados mensalmente</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
							<span>Baseado em feedback real</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 bg-purple-500 rounded-full"></div>
							<span>Transparência total</span>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
