'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
	ArrowRight,
	AlertCircle,
	Lock,
	Mail,
	Eye,
	EyeOff,
	Heart,
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
import RomanticDecorations from '@/components/ui/romantic-decorations';
import { signIn } from '@/lib/auth';
import { useAuth } from '@/contexts/auth-context';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const router = useRouter();
	const { refreshUser } = useAuth();
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	// Load saved email if remember me was checked previously
	useEffect(() => {
		const rememberLogin = localStorage.getItem('rememberLogin')
		const lastLoginEmail = localStorage.getItem('lastLoginEmail')
		
		if (rememberLogin === 'true' && lastLoginEmail) {
			setEmail(lastLoginEmail)
			setRememberMe(true)
		}
	}, [])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const result = await signIn({ 
				email, 
				password,
				rememberMe: rememberMe,
			});

			if (result.success) {
				// ✅ OTIMIZADO: Delay reduzido de 200ms para 50ms + retry inteligente
				// Aguardar propagação mínima do estado antes de refreshUser
				setTimeout(async () => {
					try {
						await refreshUser();
						router.push('/dashboard');
					} catch (refreshError) {
						console.error('Erro ao atualizar dados do usuário:', refreshError);
						// ✅ OTIMIZADO: Retry uma vez antes de prosseguir
						try {
							await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms
							await refreshUser();
							router.push('/dashboard');
						} catch (retryError) {
							console.error('Retry falhou, prosseguindo sem dados do casal:', retryError);
							// Mesmo com erro no refresh, permitir acesso ao dashboard
							// pois a autenticação foi bem-sucedida
							router.push('/dashboard');
						}
					}
				}, 50); // Reduzido de 200ms para 50ms
			} else {
				setError(result.error || 'Erro ao fazer login');
			}
		} catch (error) {
			console.error('Erro no login:', error);
			setError('Erro inesperado. Tente novamente.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen relative overflow-hidden">
			{/* Background Romântico com Animações */}
			<div className="absolute inset-0">
				{/* Gradiente Base Romântico */}
				<div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50/60 to-purple-50/40"></div>

				{/* Animações Românticas de Casamento */}
				<RomanticDecorations variant="section" className="opacity-60" />

				{/* Overlay Gradiente Suave */}
				<div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/20 to-white/75"></div>
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
									className="absolute -inset-4 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
						<Card className="bg-white/95 backdrop-blur-sm border border-rose-200/50 shadow-2xl shadow-rose-200/30 rounded-3xl overflow-hidden">
							<CardHeader className="text-center pb-6 bg-gradient-to-r from-rose-50/70 to-pink-50/70">
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={inView ? { opacity: 1, y: 0 } : {}}
									transition={{ delay: 0.6, duration: 0.6 }}
									className="flex justify-center mb-4"
								>
									<div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
										<Heart className="w-8 h-8 text-white" />
									</div>
								</motion.div>

								<CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-rose-800 bg-clip-text text-transparent">
									Bem-vindo de volta
								</CardTitle>
								<CardDescription className="text-gray-600 mt-2">
									Entre na sua conta para gerenciar seu site de casamento
								</CardDescription>
							</CardHeader>

							<CardContent className="p-8 space-y-6">
								{error && (
									<motion.div
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										className="flex items-center space-x-3 text-red-600 bg-red-50 p-4 rounded-2xl border border-red-200"
									>
										<AlertCircle className="h-5 w-5 flex-shrink-0" />
										<span className="text-sm font-medium">{error}</span>
									</motion.div>
								)}

								<form onSubmit={handleSubmit} className="space-y-6">
									{/* Email Field */}
									<motion.div
										initial={{ opacity: 0, x: -20 }}
										animate={inView ? { opacity: 1, x: 0 } : {}}
										transition={{ delay: 0.8, duration: 0.6 }}
										className="space-y-2"
									>
										<label
											htmlFor="email"
											className="text-sm font-semibold text-gray-700 flex items-center gap-2"
										>
											<Mail className="w-4 h-4 text-rose-500" />
											E-mail
										</label>
										<div className="relative">
											<input
												id="email"
												type="email"
												className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500"
												placeholder="seu@email.com"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												required
												disabled={loading}
											/>
											<div className="absolute inset-y-0 right-4 flex items-center">
												<div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
											</div>
										</div>
									</motion.div>

									{/* Password Field */}
									<motion.div
										initial={{ opacity: 0, x: -20 }}
										animate={inView ? { opacity: 1, x: 0 } : {}}
										transition={{ delay: 1, duration: 0.6 }}
										className="space-y-2"
									>
										<label
											htmlFor="password"
											className="text-sm font-semibold text-gray-700 flex items-center gap-2"
										>
											<Lock className="w-4 h-4 text-rose-500" />
											Senha
										</label>
										<div className="relative">
											<input
												id="password"
												type={showPassword ? 'text' : 'password'}
												className="w-full px-4 py-3.5 pr-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500"
												placeholder="••••••••"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												required
												disabled={loading}
											/>
											<button
												type="button"
												onClick={() => setShowPassword(!showPassword)}
												className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-rose-500 transition-colors duration-200"
											>
												{showPassword ? (
													<EyeOff className="w-5 h-5" />
												) : (
													<Eye className="w-5 h-5" />
												)}
											</button>
										</div>
									</motion.div>

									{/* Options */}
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={inView ? { opacity: 1, y: 0 } : {}}
										transition={{ delay: 1.2, duration: 0.6 }}
										className="flex items-center justify-between"
									>
										<label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer group">
											<input
												type="checkbox"
												className="w-4 h-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500 focus:ring-offset-0 transition-colors duration-200"
												checked={rememberMe}
												onChange={(e) => setRememberMe(e.target.checked)}
											/>
											<span className="group-hover:text-gray-800 transition-colors duration-200">
												Lembrar de mim
											</span>
										</label>

										<Link
											href="/forgot-password"
											className="text-sm text-rose-600 hover:text-rose-700 font-medium transition-colors duration-200 hover:underline"
										>
											Esqueci minha senha
										</Link>
									</motion.div>

									{/* Submit Button */}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={inView ? { opacity: 1, y: 0 } : {}}
										transition={{ delay: 1.4, duration: 0.6 }}
									>
										<motion.div
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											<Button
												type="submit"
												className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
												disabled={loading}
											>
												{loading ? (
													<div className="flex items-center justify-center gap-2">
														<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
														Entrando...
													</div>
												) : (
													<div className="flex items-center justify-center gap-2">
														Entrar
														<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
													</div>
												)}
											</Button>
										</motion.div>
									</motion.div>
								</form>

								{/* Sign Up Link */}
								<motion.div
									initial={{ opacity: 0 }}
									animate={inView ? { opacity: 1 } : {}}
									transition={{ delay: 1.6, duration: 0.6 }}
									className="text-center text-sm text-gray-600 pt-4 border-t border-gray-200"
								>
									Não tem uma conta?{' '}
									<Link
										href="/signup"
										className="text-rose-600 hover:text-rose-700 font-semibold transition-colors duration-200 hover:underline"
									>
										Crie agora grátis
									</Link>
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
