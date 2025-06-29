'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
	Heart,
	Sparkles,
	Check,
	Play,
	ArrowRight,
	Calendar,
	Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	HeartAnimation,
	SparklesAnimation,
} from '@/components/ui/lottie-animations';
import RomanticDecorations from '@/components/ui/romantic-decorations';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

export default function HeroSection() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	const handleDemoClick = () => {
		toast.success('🎉 Demo em breve! Por enquanto, crie seu site grátis!', {
			duration: 5000,
			style: {
				background: 'linear-gradient(135deg, #fe97a2 0%, #535354 100%)',
				color: 'white',
				fontWeight: '500',
			},
		});
	};

	const handleCreateSiteClick = () => {
		toast.success('💒 Vamos criar seu site de casamento dos sonhos!', {
			duration: 4000,
			style: {
				background: 'linear-gradient(135deg, #fe97a2 0%, #ed7a5e 100%)',
				color: 'white',
				fontWeight: '500',
			},
		});
	};

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-purple-50">
			{/* Decorações Românticas Animadas */}
			<RomanticDecorations variant="hero" />

			{/* Conteúdo Principal */}
			<div className="relative z-10 container mx-auto px-4 text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
					className="max-w-4xl mx-auto"
				>
					{/* Badge Premium */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-rose-200/50 rounded-full px-6 py-3 mb-8 shadow-lg"
					>
						<Sparkles className="w-4 h-4 text-rose-500" />
						<span className="text-sm font-medium text-gray-700">
							Plataforma #1 para casamentos digitais
						</span>
					</motion.div>

					{/* Título Principal */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.8 }}
						className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-rose-800 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight"
					>
						Seu casamento dos
						<br />
						<span className="text-rose-600">sonhos digital</span>
					</motion.h1>

					{/* Subtítulo */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.8 }}
						className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto"
					>
						Crie um site personalizado para seu casamento, gerencie convidados e
						receba presentes de forma simples e elegante.
					</motion.p>

					{/* Estatísticas */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5, duration: 0.8 }}
						className="flex flex-wrap justify-center gap-8 mb-10 text-sm text-gray-600"
					>
						<div className="flex items-center gap-2">
							<Heart className="w-4 h-4 text-rose-500" />
							<span>
								+<CountUp end={1200} duration={3} />+ casais felizes
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Calendar className="w-4 h-4 text-purple-500" />
							<span>
								+<CountUp end={50} duration={3} />+ casamentos por mês
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Users className="w-4 h-4 text-blue-500" />
							<span>
								+<CountUp end={25000} duration={3} />+ convidados conectados
							</span>
						</div>
					</motion.div>

					{/* CTAs */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6, duration: 0.8 }}
						className="flex flex-col sm:flex-row gap-4 justify-center items-center"
					>
						<Button
							size="lg"
							className="bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
						>
							Começar Gratuitamente
							<ArrowRight className="ml-2 w-5 h-5" />
						</Button>

						<Button
							variant="outline"
							size="lg"
							className="border-2 border-gray-300 hover:border-rose-400 text-gray-700 hover:text-rose-600 px-8 py-4 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-300"
						>
							Ver Demonstração
						</Button>
					</motion.div>

					{/* Trust Indicators */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8, duration: 0.8 }}
						className="mt-12 text-sm text-gray-500"
					>
						<p>
							✨ Sem compromisso • 💳 Teste grátis por 7 dias • 🔒 100% seguro
						</p>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
