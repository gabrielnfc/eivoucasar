'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
	Clock,
	Shield,
	Zap,
	Target,
	Heart,
	MessageCircle,
	HelpCircle,
	CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const faqs = [
	{
		icon: Clock,
		question: 'Em quanto tempo meu site fica pronto?',
		answer:
			'Seu site fica pronto em até 24 horas após o cadastro! Nossa equipe especializada configura tudo para você: design, gamificação e integração com PIX. Você só precisa adicionar suas informações e fotos.',
		color: 'from-blue-500 to-cyan-500',
		bgColor: 'from-blue-50 to-cyan-50',
	},
	{
		icon: Shield,
		question: 'E se eu não gostar? Posso cancelar?',
		answer:
			'Sim! Você tem 14 dias para testar gratuitamente. Se não ficar satisfeito, cancele sem custos. Sem multa, sem burocracia. Queremos que você tenha certeza de que é a escolha certa para seu casamento.',
		color: 'from-emerald-500 to-teal-500',
		bgColor: 'from-emerald-50 to-teal-50',
	},
	{
		icon: Zap,
		question: 'Como funciona a gamificação? É fácil para os convidados?',
		answer:
			'Super simples! Os convidados só precisam do link do seu site - sem cadastro, sem app. Eles contribuem via PIX e automaticamente entram na competição. Veem rankings em tempo real e recebem badges por conquistas.',
		color: 'from-purple-500 to-violet-500',
		bgColor: 'from-purple-50 to-violet-50',
	},
	{
		icon: Target,
		question: 'Preciso entender de tecnologia para usar?',
		answer:
			'Não! Nossa plataforma é 100% visual e intuitiva. Você edita tudo clicando e arrastando, como no Instagram. Nossa equipe também oferece suporte especializado para ajudar em qualquer dúvida.',
		color: 'from-orange-500 to-amber-500',
		bgColor: 'from-orange-50 to-amber-50',
	},
	{
		icon: Heart,
		question: 'O que acontece após o casamento? Perco o site?',
		answer:
			'Seu site fica ativo para sempre! Vira uma linda lembrança digital com todas as fotos, depoimentos e momentos especiais. Muitos casais transformam em álbum digital da família.',
		color: 'from-rose-500 to-pink-500',
		bgColor: 'from-rose-50 to-pink-50',
	},
];

export default function FAQSection() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<section className="relative py-20 lg:py-32 overflow-hidden">
			{/* Background Decorativo */}
			<div className="absolute inset-0">
				{/* Gradiente Base */}
				<div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-blue-50/40"></div>

				{/* Elementos Geométricos Flutuantes */}
				<motion.div
					className="absolute top-20 left-16 w-60 h-60 opacity-5"
					animate={{
						rotate: [0, 360],
						scale: [1, 1.3, 1],
					}}
					transition={{
						duration: 35,
						repeat: Infinity,
						ease: 'linear',
					}}
				>
					<div className="w-full h-full border-4 border-purple-300/30 rounded-full"></div>
					<div className="absolute top-10 left-10 w-40 h-40 border-2 border-blue-300/35 rounded-full"></div>
					<div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-indigo-300/20 to-purple-300/20 rounded-full"></div>
				</motion.div>

				<motion.div
					className="absolute top-40 right-20 w-48 h-48 opacity-7"
					animate={{
						y: [0, -30, 0],
						rotate: [0, 180, 360],
					}}
					transition={{
						duration: 28,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="w-full h-full bg-gradient-to-br from-cyan-300/25 to-blue-300/25 transform rotate-45 rounded-3xl"></div>
				</motion.div>

				<motion.div
					className="absolute bottom-20 left-1/3 w-52 h-52 opacity-6"
					animate={{
						scale: [1, 1.4, 1],
						rotate: [45, 225, 45],
					}}
					transition={{
						duration: 40,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="w-full h-full border-8 border-teal-300/30 rounded-2xl transform rotate-12"></div>
				</motion.div>

				{/* Elementos de Interrogação Flutuantes */}
				{[...Array(6)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute"
						style={{
							left: `${20 + i * 12}%`,
							top: `${25 + (i % 3) * 20}%`,
						}}
						animate={{
							opacity: [0.2, 0.8, 0.2],
							scale: [0.5, 1.3, 0.5],
							y: [0, -20, 0],
							rotate: [0, 360, 0],
						}}
						transition={{
							duration: 4 + i * 0.5,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: i * 0.3,
						}}
					>
						<HelpCircle className="w-4 h-4 text-blue-400/60" />
					</motion.div>
				))}

				{/* Partículas Check */}
				{[...Array(5)].map((_, i) => (
					<motion.div
						key={`check-${i}`}
						className="absolute"
						style={{
							right: `${15 + i * 8}%`,
							top: `${30 + (i % 2) * 30}%`,
						}}
						animate={{
							opacity: [0.3, 1, 0.3],
							scale: [0.8, 1.5, 0.8],
							x: [0, 15, 0],
						}}
						transition={{
							duration: 3 + i * 0.4,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: i * 0.2,
						}}
					>
						<CheckCircle className="w-3 h-3 text-emerald-400/50" />
					</motion.div>
				))}

				{/* Overlay Gradiente */}
				<div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-white/30"></div>
				</div>

			{/* Conteúdo Principal */}
			<div className="relative z-10 container mx-auto px-4">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="max-w-4xl mx-auto"
				>
					{/* Header */}
					<div className="text-center space-y-6 mb-16">
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={inView ? { opacity: 1, scale: 1 } : {}}
							transition={{ delay: 0.2, duration: 0.6 }}
							className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full px-6 py-3 shadow-lg"
						>
							<HelpCircle className="w-4 h-4 text-blue-500" />
							<span className="text-sm font-medium text-gray-700">
								Dúvidas Frequentes
							</span>
						</motion.div>

						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.3, duration: 0.8 }}
							className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent"
						>
							Dúvidas frequentes
							<br />
							<span className="text-blue-600">dos noivos</span>
						</motion.h2>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.4, duration: 0.8 }}
							className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
						>
							Tudo que você precisa saber para tomar a melhor decisão para o seu
							casamento dos sonhos
						</motion.p>
					</div>

					{/* FAQ Items */}
					<div className="space-y-6">
						{faqs.map((faq, index) => {
							const Icon = faq.icon;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									animate={inView ? { opacity: 1, y: 0 } : {}}
									transition={{
										delay: 0.6 + index * 0.1,
										duration: 0.6,
										ease: 'easeOut',
									}}
								>
									<div
										className={`bg-gradient-to-br ${faq.bgColor} border border-white/50 rounded-3xl p-8 shadow-xl shadow-gray-200/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-500 hover:-translate-y-1 group`}
									>
										<div className="flex items-start gap-6">
											<div
												className={`w-14 h-14 bg-gradient-to-r ${faq.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
											>
												<Icon className="w-7 h-7 text-white" />
					</div>

											<div className="space-y-4 flex-1">
												<h3 className="text-xl font-bold text-gray-900 leading-tight">
													{faq.question}
								</h3>
												<p className="text-gray-700 leading-relaxed text-lg">
													{faq.answer}
								</p>
							</div>
						</div>

										{/* Linha Decorativa Bottom */}
										<div
											className={`mt-6 h-1 bg-gradient-to-r ${faq.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full`}
										></div>
									</div>
								</motion.div>
							);
						})}
					</div>

					{/* CTA Section */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 1.2, duration: 0.8 }}
						className="text-center mt-16"
					>
						<div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-xl shadow-gray-200/50 max-w-2xl mx-auto">
							<div className="space-y-6">
								<div className="flex items-center justify-center gap-2 mb-4">
									<MessageCircle className="w-6 h-6 text-blue-500" />
									<h3 className="text-2xl font-bold text-gray-900">
										Ainda tem dúvidas?
								</h3>
					</div>

								<p className="text-gray-600 leading-relaxed">
									Nossa equipe está aqui para ajudar! Fale com nossos
									especialistas e tire todas as suas dúvidas sobre como criar o
									site perfeito para seu casamento.
								</p>

								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
					<Button
						size="lg"
										className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
					>
						<MessageCircle className="w-5 h-5 mr-2" />
						Falar com Especialista
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
