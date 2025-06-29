'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
	Mail,
	ArrowRight,
	CheckCircle,
	Clock,
	RefreshCw,
	Sparkles,
	Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Logo from '@/components/ui/logo';

export default function VerifyEmailPage() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<div className="min-h-screen relative overflow-hidden">
			{/* Background Decorativo */}
			<div className="absolute inset-0">
				{/* Gradiente Base */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/30"></div>

				{/* Elementos Geométricos Flutuantes */}
				<motion.div
					className="absolute top-20 left-12 w-80 h-80 opacity-8"
					animate={{
						rotate: [0, 360],
						scale: [1, 1.2, 1],
					}}
					transition={{
						duration: 35,
						repeat: Infinity,
						ease: 'linear',
					}}
				>
					<div className="w-full h-full border-4 border-blue-300/25 rounded-full"></div>
					<div className="absolute top-16 left-16 w-48 h-48 border-3 border-indigo-300/30 rounded-full"></div>
					<div className="absolute top-24 left-24 w-32 h-32 bg-gradient-to-br from-blue-300/15 to-indigo-300/15 rounded-full"></div>
				</motion.div>

				<motion.div
					className="absolute top-32 right-16 w-64 h-64 opacity-12"
					animate={{
						y: [0, -40, 0],
						rotate: [0, 180, 360],
					}}
					transition={{
						duration: 28,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="w-full h-full bg-gradient-to-br from-purple-300/20 to-indigo-300/20 transform rotate-45 rounded-3xl"></div>
				</motion.div>

				{/* Elementos de Email Flutuantes */}
				{[...Array(8)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute"
						style={{
							left: `${18 + i * 12}%`,
							top: `${12 + (i % 4) * 22}%`,
						}}
						animate={{
							opacity: [0.2, 0.9, 0.2],
							scale: [0.6, 1.4, 0.6],
							y: [0, -20, 0],
						}}
						transition={{
							duration: 3.5 + i * 0.4,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: i * 0.3,
						}}
					>
						<Mail className="w-4 h-4 text-blue-400/60" />
					</motion.div>
				))}

				{/* Partículas Send */}
				{[...Array(6)].map((_, i) => (
					<motion.div
						key={`send-${i}`}
						className="absolute"
						style={{
							right: `${12 + i * 16}%`,
							bottom: `${15 + (i % 3) * 25}%`,
						}}
						animate={{
							opacity: [0.3, 1, 0.3],
							scale: [0.5, 1.5, 0.5],
							rotate: [0, 360, 0],
						}}
						transition={{
							duration: 4 + i * 0.5,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: i * 0.2,
						}}
					>
						<Send className="w-3 h-3 text-indigo-400/50" />
					</motion.div>
				))}

				{/* Sparkles animados */}
				{[...Array(10)].map((_, i) => {
					// Posições determinísticas para evitar hydration mismatch
					const positions = [
						{ left: '12%', top: '18%' },
						{ left: '88%', top: '25%' },
						{ left: '25%', top: '72%' },
						{ left: '78%', top: '85%' },
						{ left: '8%', top: '52%' },
						{ left: '92%', top: '48%' },
						{ left: '42%', top: '12%' },
						{ left: '58%', top: '88%' },
						{ left: '22%', top: '38%' },
						{ left: '82%', top: '62%' },
					];

					const position = positions[i] || positions[0];
					const durations = [2, 3, 2.5, 3.5, 2.2, 3.2, 2.8, 3.8, 2.3, 3.3];
					const delays = [0, 0.4, 0.8, 1.2, 0.2, 0.6, 1.0, 1.4, 0.3, 0.7];

					return (
						<motion.div
							key={`sparkle-${i}`}
							className="absolute"
							style={position}
							animate={{
								opacity: [0, 1, 0],
								scale: [0, 1.2, 0],
								rotate: [0, 180, 360],
							}}
							transition={{
								duration: durations[i],
								repeat: Infinity,
								ease: 'easeInOut',
								delay: delays[i],
							}}
						>
							<Sparkles className="w-2 h-2 text-purple-400/40" />
						</motion.div>
					);
				})}

				{/* Overlay Gradiente */}
				<div className="absolute inset-0 bg-gradient-to-t from-white/85 via-transparent to-white/70"></div>
			</div>

			{/* Conteúdo Principal */}
			<div className="relative z-10 min-h-screen flex items-center justify-center px-4">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="w-full max-w-md"
				>
					{/* Logo com Animação */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={inView ? { opacity: 1, scale: 1 } : {}}
						transition={{ delay: 0.2, duration: 0.6 }}
						className="text-center mb-8"
					>
						<Link href="/" className="inline-block group">
							<div className="relative">
								<Logo className="h-16 w-auto group-hover:scale-105 transition-transform duration-300" />
								<motion.div
									className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
									animate={{
										scale: [1, 1.05, 1],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: 'easeInOut',
									}}
								/>
							</div>
						</Link>
					</motion.div>

					{/* Card Principal */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.4, duration: 0.8 }}
					>
						<Card className="bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-2xl shadow-gray-200/50 rounded-3xl overflow-hidden">
							<CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={inView ? { opacity: 1, scale: 1 } : {}}
									transition={{ delay: 0.6, duration: 0.6 }}
									className="mx-auto mb-6 relative"
								>
									<div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-lg">
										<Mail className="h-10 w-10 text-white" />
									</div>
									{/* Pulse rings */}
									<motion.div
										className="absolute inset-0 w-20 h-20 border-4 border-blue-400/30 rounded-3xl"
										animate={{
											scale: [1, 1.4, 1],
											opacity: [0.7, 0.2, 0.7],
										}}
										transition={{
											duration: 2,
											repeat: Infinity,
											ease: 'easeInOut',
										}}
									/>
									<motion.div
										className="absolute inset-0 w-20 h-20 border-2 border-purple-400/40 rounded-3xl"
										animate={{
											scale: [1, 1.6, 1],
											opacity: [0.5, 0.1, 0.5],
										}}
										transition={{
											duration: 2,
											repeat: Infinity,
											ease: 'easeInOut',
											delay: 0.5,
										}}
									/>
								</motion.div>

								<CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
									Verifique seu email
								</CardTitle>
								<CardDescription className="text-gray-600 mt-2 leading-relaxed">
									Enviamos um link de confirmação para seu email. Clique no link
									para ativar sua conta.
								</CardDescription>
							</CardHeader>

							<CardContent className="p-8 space-y-6">
								{/* Status Section */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={inView ? { opacity: 1, y: 0 } : {}}
									transition={{ delay: 0.8, duration: 0.6 }}
									className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/50"
								>
									<div className="flex items-center gap-3 mb-4">
										<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
											<Clock className="w-4 h-4 text-white" />
										</div>
										<h3 className="font-semibold text-gray-800">
											Aguardando verificação
										</h3>
									</div>

									<ul className="text-sm text-gray-600 space-y-3">
										<motion.li
											initial={{ opacity: 0, x: -10 }}
											animate={inView ? { opacity: 1, x: 0 } : {}}
											transition={{ delay: 1, duration: 0.5 }}
											className="flex items-center gap-2"
										>
											<CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
											Email enviado com sucesso
										</motion.li>
										<motion.li
											initial={{ opacity: 0, x: -10 }}
											animate={inView ? { opacity: 1, x: 0 } : {}}
											transition={{ delay: 1.2, duration: 0.5 }}
											className="flex items-center gap-2"
										>
											<div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin flex-shrink-0"></div>
											Aguardando confirmação
										</motion.li>
									</ul>
								</motion.div>

								{/* Tips Section */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={inView ? { opacity: 1, y: 0 } : {}}
									transition={{ delay: 1, duration: 0.6 }}
									className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200/50"
								>
									<div className="flex items-center gap-3 mb-4">
										<div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
											<RefreshCw className="w-4 h-4 text-white" />
										</div>
										<h3 className="font-semibold text-gray-800">
											Não recebeu o email?
										</h3>
									</div>

									<ul className="text-sm text-gray-600 space-y-3">
										<motion.li
											initial={{ opacity: 0, x: -10 }}
											animate={inView ? { opacity: 1, x: 0 } : {}}
											transition={{ delay: 1.2, duration: 0.5 }}
											className="flex items-start gap-2"
										>
											<div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
											Verifique sua caixa de spam e lixo eletrônico
										</motion.li>
										<motion.li
											initial={{ opacity: 0, x: -10 }}
											animate={inView ? { opacity: 1, x: 0 } : {}}
											transition={{ delay: 1.4, duration: 0.5 }}
											className="flex items-start gap-2"
										>
											<div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
											Confirme se o email digitado está correto
										</motion.li>
										<motion.li
											initial={{ opacity: 0, x: -10 }}
											animate={inView ? { opacity: 1, x: 0 } : {}}
											transition={{ delay: 1.6, duration: 0.5 }}
											className="flex items-start gap-2"
										>
											<div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
											Aguarde alguns minutos e recarregue a página
										</motion.li>
									</ul>
								</motion.div>

								{/* Action Buttons */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={inView ? { opacity: 1, y: 0 } : {}}
									transition={{ delay: 1.4, duration: 0.6 }}
									className="flex flex-col space-y-3"
								>
									<motion.div
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<Button
											asChild
											className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
										>
											<Link href="/login">
												<div className="flex items-center justify-center gap-2">
													Ir para Login
													<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
												</div>
											</Link>
										</Button>
									</motion.div>

									<motion.div
										whileHover={{ scale: 1.01 }}
										whileTap={{ scale: 0.99 }}
									>
										<Button
											variant="ghost"
											asChild
											className="w-full py-3 rounded-2xl hover:bg-gray-100 transition-colors duration-200"
										>
											<Link href="/signup">Voltar ao Cadastro</Link>
										</Button>
									</motion.div>
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>

					{/* Back Link */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={inView ? { opacity: 1 } : {}}
						transition={{ delay: 1.8, duration: 0.6 }}
						className="mt-8 text-center"
					>
						<Link
							href="/"
							className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 hover:underline"
						>
							← Voltar para o site
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
