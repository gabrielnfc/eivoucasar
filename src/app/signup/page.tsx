'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
	ArrowRight,
	Star,
	Users,
	Trophy,
	CheckCircle,
	AlertCircle,
	Heart,
	MapPin,
	Calendar,
	Phone,
	User,
	Lock,
	Mail,
	Shield,
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
import { signUp, type SignUpData } from '@/lib/auth';
import { useAuth } from '@/contexts/auth-context';

export default function SignupPage() {
	const [formData, setFormData] = useState<SignUpData>({
		// Dados básicos
		email: '',
		emailSecondary: '',
		password: '',

		// Dados do casal
		brideName: '',
		groomName: '',

		// Localização
		city: '',
		state: '',
		country: 'Brasil',

		// Contatos
		bridePhone: '',
		groomPhone: '',

		// Evento
		weddingDate: '',
		weddingTime: '',

		// Configuração
		signupRole: 'bride',

		// Aceites
		acceptTerms: false,
	});
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const router = useRouter();
	const { refreshUser } = useAuth();
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;

		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		// Validações
		if (formData.password !== confirmPassword) {
			setError('As senhas não coincidem');
			setLoading(false);
			return;
		}

		if (formData.password.length < 6) {
			setError('A senha deve ter pelo menos 6 caracteres');
			setLoading(false);
			return;
		}

		if (!formData.brideName.trim() || !formData.groomName.trim()) {
			setError('Por favor, preencha os nomes completos da noiva e do noivo');
			setLoading(false);
			return;
		}

		if (!formData.city.trim() || !formData.state.trim()) {
			setError('Por favor, preencha sua localização (cidade e estado)');
			setLoading(false);
			return;
		}

		if (!formData.bridePhone?.trim() && !formData.groomPhone?.trim()) {
			setError('Por favor, informe pelo menos um telefone de contato');
			setLoading(false);
			return;
		}

		if (!formData.weddingDate || !formData.weddingTime) {
			setError('Por favor, informe a data e horário do casamento');
			setLoading(false);
			return;
		}

		if (!formData.acceptTerms) {
			setError('Você deve aceitar os termos de uso e política de privacidade');
			setLoading(false);
			return;
		}

		try {
			const result = await signUp(formData);

			if (result.success) {
				setSuccess(true);
				// Aguardar um pouco e redirecionar para verificação de email
				setTimeout(() => {
					router.push('/verify-email');
				}, 2000);
			} else {
				setError(result.error || 'Erro ao criar conta');
			}
		} catch (error) {
			setError('Erro inesperado. Tente novamente.');
		} finally {
			setLoading(false);
		}
	};

	if (success) {
		return (
			<div className="min-h-screen relative overflow-hidden">
				{/* Background Romântico de Sucesso */}
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50/50 to-pink-50/30"></div>

					{/* Animações Românticas de Celebração */}
					<RomanticDecorations variant="hero" className="opacity-40" />

					{/* Elementos Flutuantes de Celebração */}
					{[...Array(15)].map((_, i) => {
						// Posições determinísticas para evitar hydration mismatch
						const positions = [
							{ left: '10%', top: '15%' },
							{ left: '85%', top: '20%' },
							{ left: '20%', top: '75%' },
							{ left: '75%', top: '80%' },
							{ left: '5%', top: '45%' },
							{ left: '90%', top: '55%' },
							{ left: '35%', top: '10%' },
							{ left: '65%', top: '90%' },
							{ left: '15%', top: '60%' },
							{ left: '80%', top: '35%' },
							{ left: '45%', top: '25%' },
							{ left: '55%', top: '70%' },
							{ left: '25%', top: '40%' },
							{ left: '70%', top: '15%' },
							{ left: '30%', top: '85%' },
						];

						const position = positions[i] || positions[0];
						const durations = [
							3, 4, 3.5, 4.5, 3.2, 4.2, 3.8, 4.8, 3.3, 4.3, 3.7, 4.7, 3.1, 4.1,
							3.9,
						];
						const delays = [
							0, 0.5, 1, 1.5, 0.2, 0.7, 1.2, 1.7, 0.3, 0.8, 1.3, 1.8, 0.4, 0.9,
							1.4,
						];

						return (
							<motion.div
								key={i}
								className="absolute"
								style={position}
								animate={{
									opacity: [0, 1, 0],
									scale: [0, 1.5, 0],
									rotate: [0, 360, 0],
									y: [0, -50, 0],
								}}
								transition={{
									duration: durations[i],
									repeat: Infinity,
									ease: 'easeInOut',
									delay: delays[i],
								}}
							>
								<Star className="w-4 h-4 text-emerald-400/60" />
							</motion.div>
						);
					})}
				</div>

				<div className="relative z-10 min-h-screen flex items-center justify-center px-4">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8 }}
					>
						<Card className="w-full max-w-md text-center bg-white/95 backdrop-blur-sm border border-green-200/50 shadow-2xl rounded-3xl overflow-hidden">
							<CardContent className="pt-8 pb-8">
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
								>
									<CheckCircle className="h-20 w-20 text-emerald-500 mx-auto mb-6" />
								</motion.div>

								<motion.h2
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5, duration: 0.6 }}
									className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4"
								>
									Conta criada com sucesso!
								</motion.h2>

								<motion.p
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.7, duration: 0.6 }}
									className="text-gray-600 mb-8 leading-relaxed"
								>
									Verifique seu email para confirmar sua conta e começar a usar
									o EiVouCasar!
								</motion.p>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.9, duration: 0.6 }}
								>
									<Button
										asChild
										className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg"
									>
										<Link href="/login">Ir para Login</Link>
									</Button>
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen relative overflow-hidden">
			{/* Background Romântico com Animações */}
			<div className="absolute inset-0">
				{/* Gradiente Base Romântico */}
				<div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50/60 to-purple-50/40"></div>

				{/* Animações Românticas de Casamento */}
				<RomanticDecorations variant="section" className="opacity-50" />

				{/* Overlay Gradiente Suave */}
				<div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-white/80"></div>
			</div>

			{/* Header Simples */}
			<motion.header
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="relative z-20 border-b border-gray-200/50 bg-white/90 backdrop-blur-sm"
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<Link
							href="/"
							className="hover:opacity-80 transition-opacity group"
						>
							<div className="relative">
								<Logo className="h-10 w-auto group-hover:scale-105 transition-transform duration-300" />
								<motion.div
									className="absolute -inset-2 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

						<div className="flex items-center space-x-4">
							<span className="text-sm text-gray-600">Já tem uma conta?</span>
							<Button
								variant="ghost"
								asChild
								className="hover:bg-rose-50 hover:text-rose-700 transition-colors duration-200"
							>
								<Link href="/login">Entrar</Link>
							</Button>
						</div>
					</div>
				</div>
			</motion.header>

			{/* Conteúdo Principal */}
			<div className="relative z-10 flex min-h-[calc(100vh-4rem)]">
				<div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
					<motion.div
						ref={ref}
						initial={{ opacity: 0, y: 30 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8 }}
						className="w-full max-w-2xl"
					>
						<Card className="bg-white/95 backdrop-blur-sm border border-rose-200/50 shadow-2xl shadow-rose-200/30 rounded-3xl overflow-hidden">
							<CardHeader className="text-center pb-6 bg-gradient-to-r from-pink-50/70 to-rose-50/70">
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={inView ? { opacity: 1, y: 0 } : {}}
									transition={{ delay: 0.3, duration: 0.6 }}
									className="flex justify-center mb-4"
								>
									<div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
										<Heart className="w-8 h-8 text-white" />
									</div>
								</motion.div>

								<CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-rose-800 bg-clip-text text-transparent">
									Crie sua conta
								</CardTitle>
								<CardDescription className="text-gray-600 mt-2">
									Comece a gamificar seu casamento em 2 minutos
								</CardDescription>
							</CardHeader>

							<CardContent className="p-8 space-y-8">
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

								<form onSubmit={handleSubmit} className="space-y-8">
									{/* Seção: Dados do Casal */}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={inView ? { opacity: 1, y: 0 } : {}}
										transition={{ delay: 0.5, duration: 0.6 }}
										className="space-y-6"
									>
										<div className="flex items-center gap-3 pb-4 border-b border-gray-200">
											<div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
												<Users className="w-5 h-5 text-white" />
											</div>
											<h3 className="text-lg font-semibold text-gray-800">
												Dados do Casal
											</h3>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div className="space-y-2">
												<label
													htmlFor="brideName"
													className="text-sm font-semibold text-gray-700 flex items-center gap-2"
												>
													<User className="w-4 h-4 text-pink-500" />
													Nome Completo da Noiva *
												</label>
												<input
													id="brideName"
													name="brideName"
													type="text"
													className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500"
													placeholder="Maria Silva Santos"
													value={formData.brideName}
													onChange={handleChange}
													required
													disabled={loading}
												/>
											</div>
											<div className="space-y-2">
												<label
													htmlFor="groomName"
													className="text-sm font-semibold text-gray-700 flex items-center gap-2"
												>
													<User className="w-4 h-4 text-blue-500" />
													Nome Completo do Noivo *
												</label>
												<input
													id="groomName"
													name="groomName"
													type="text"
													className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500"
													placeholder="João Oliveira Costa"
													value={formData.groomName}
													onChange={handleChange}
													required
													disabled={loading}
												/>
											</div>
										</div>

										<div className="space-y-2">
											<label
												htmlFor="signupRole"
												className="text-sm font-semibold text-gray-700 flex items-center gap-2"
											>
												<Shield className="w-4 h-4 text-rose-500" />
												Eu sou *
											</label>
											<select
												id="signupRole"
												name="signupRole"
												className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900"
												value={formData.signupRole}
												onChange={handleChange}
												required
												disabled={loading}
											>
												<option value="bride">A Noiva</option>
												<option value="groom">O Noivo</option>
												<option value="other">Outro (amigo/família)</option>
											</select>
										</div>
									</motion.div>

									{/* Seção: Contato */}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={inView ? { opacity: 1, y: 0 } : {}}
										transition={{ delay: 0.7, duration: 0.6 }}
										className="space-y-6"
									>
										<div className="flex items-center gap-3 pb-4 border-b border-gray-200">
											<div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
												<Mail className="w-5 h-5 text-white" />
											</div>
											<h3 className="text-lg font-semibold text-gray-800">
												Contato
											</h3>
										</div>

										<div className="space-y-4">
											<div className="space-y-2">
												<label
													htmlFor="email"
													className="text-sm font-semibold text-gray-700 flex items-center gap-2"
												>
													<Mail className="w-4 h-4 text-blue-500" />
													E-mail Principal *
												</label>
												<input
													id="email"
													name="email"
													type="email"
													className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500"
													placeholder="contato@mariaejoao.com"
													value={formData.email}
													onChange={handleChange}
													required
													disabled={loading}
												/>
											</div>

											<div className="space-y-2">
												<label
													htmlFor="emailSecondary"
													className="text-sm font-semibold text-gray-700 flex items-center gap-2"
												>
													<Mail className="w-4 h-4 text-gray-400" />
													E-mail Secundário (opcional)
												</label>
												<input
													id="emailSecondary"
													name="emailSecondary"
													type="email"
													className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500"
													placeholder="segundo@email.com"
													value={formData.emailSecondary}
													onChange={handleChange}
													disabled={loading}
												/>
											</div>

											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="space-y-2">
													<label
														htmlFor="bridePhone"
														className="text-sm font-semibold text-gray-700 flex items-center gap-2"
													>
														<Phone className="w-4 h-4 text-pink-500" />
														Telefone da Noiva
													</label>
													<input
														id="bridePhone"
														name="bridePhone"
														type="tel"
														className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500"
														placeholder="(11) 99999-9999"
														value={formData.bridePhone}
														onChange={handleChange}
														disabled={loading}
													/>
												</div>
												<div className="space-y-2">
													<label
														htmlFor="groomPhone"
														className="text-sm font-semibold text-gray-700 flex items-center gap-2"
													>
														<Phone className="w-4 h-4 text-blue-500" />
														Telefone do Noivo
													</label>
													<input
														id="groomPhone"
														name="groomPhone"
														type="tel"
														className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500"
														placeholder="(11) 99999-9999"
														value={formData.groomPhone}
														onChange={handleChange}
														disabled={loading}
													/>
												</div>
											</div>
											<p className="text-xs text-gray-500 bg-amber-50 p-3 rounded-xl border border-amber-200">
												* Informe pelo menos um telefone
											</p>
										</div>
									</motion.div>

									{/* Seção: Localização */}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={inView ? { opacity: 1, y: 0 } : {}}
										transition={{ delay: 0.9, duration: 0.6 }}
										className="space-y-6"
									>
										<div className="flex items-center gap-3 pb-4 border-b border-gray-200">
											<div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
												<MapPin className="w-5 h-5 text-white" />
											</div>
											<h3 className="text-lg font-semibold text-gray-800">
												Localização
											</h3>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<label
													htmlFor="city"
													className="text-sm font-semibold text-gray-700 flex items-center gap-2"
												>
													<MapPin className="w-4 h-4 text-green-500" />
													Cidade *
												</label>
												<input
													id="city"
													name="city"
													type="text"
													className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500"
													placeholder="São Paulo"
													value={formData.city}
													onChange={handleChange}
													required
													disabled={loading}
												/>
											</div>
											<div className="space-y-2">
												<label
													htmlFor="state"
													className="text-sm font-semibold text-gray-700 flex items-center gap-2"
												>
													<MapPin className="w-4 h-4 text-emerald-500" />
													Estado *
												</label>
												<input
													id="state"
													name="state"
													type="text"
													className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500"
													placeholder="SP"
													value={formData.state}
													onChange={handleChange}
													required
													disabled={loading}
												/>
											</div>
										</div>

										<div className="space-y-2">
											<label
												htmlFor="country"
												className="text-sm font-semibold text-gray-700 flex items-center gap-2"
											>
												<MapPin className="w-4 h-4 text-gray-500" />
												País
											</label>
											<input
												id="country"
												name="country"
												type="text"
												className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500"
												value={formData.country}
												onChange={handleChange}
												disabled={loading}
											/>
										</div>
									</motion.div>

									{/* Seção: Casamento */}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={inView ? { opacity: 1, y: 0 } : {}}
										transition={{ delay: 1.1, duration: 0.6 }}
										className="space-y-6"
									>
										<div className="flex items-center gap-3 pb-4 border-b border-gray-200">
											<div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
												<Calendar className="w-5 h-5 text-white" />
											</div>
											<h3 className="text-lg font-semibold text-gray-800">
												Casamento
											</h3>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<label
													htmlFor="weddingDate"
													className="text-sm font-semibold text-gray-700 flex items-center gap-2"
												>
													<Calendar className="w-4 h-4 text-rose-500" />
													Data do Casamento *
												</label>
												<input
													id="weddingDate"
													name="weddingDate"
													type="date"
													className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900"
													value={formData.weddingDate}
													onChange={handleChange}
													required
													disabled={loading}
												/>
											</div>
											<div className="space-y-2">
												<label
													htmlFor="weddingTime"
													className="text-sm font-semibold text-gray-700 flex items-center gap-2"
												>
													<Calendar className="w-4 h-4 text-pink-500" />
													Horário *
												</label>
												<input
													id="weddingTime"
													name="weddingTime"
													type="time"
													className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900"
													value={formData.weddingTime}
													onChange={handleChange}
													required
													disabled={loading}
												/>
											</div>
										</div>
									</motion.div>

									{/* Seção: Senha */}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={inView ? { opacity: 1, y: 0 } : {}}
										transition={{ delay: 1.3, duration: 0.6 }}
										className="space-y-6"
									>
										<div className="flex items-center gap-3 pb-4 border-b border-gray-200">
											<div className="w-10 h-10 bg-gradient-to-r from-slate-500 to-gray-600 rounded-xl flex items-center justify-center">
												<Lock className="w-5 h-5 text-white" />
											</div>
											<h3 className="text-lg font-semibold text-gray-800">
												Senha
											</h3>
										</div>

										<div className="space-y-4">
											<div className="space-y-2">
												<label
													htmlFor="password"
													className="text-sm font-semibold text-gray-700 flex items-center gap-2"
												>
													<Lock className="w-4 h-4 text-slate-500" />
													Senha *
												</label>
												<input
													id="password"
													name="password"
													type="password"
													className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500"
													placeholder="••••••••"
													value={formData.password}
													onChange={handleChange}
													required
													disabled={loading}
												/>
											</div>

											<div className="space-y-2">
												<label
													htmlFor="confirmPassword"
													className="text-sm font-semibold text-gray-700 flex items-center gap-2"
												>
													<Lock className="w-4 h-4 text-gray-600" />
													Confirmar Senha *
												</label>
												<input
													id="confirmPassword"
													name="confirmPassword"
													type="password"
													className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 placeholder-gray-500"
													placeholder="••••••••"
													value={confirmPassword}
													onChange={(e) => setConfirmPassword(e.target.value)}
													required
													disabled={loading}
												/>
											</div>
											<p className="text-xs text-gray-500 bg-blue-50 p-3 rounded-xl border border-blue-200">
												Mínimo de 6 caracteres
											</p>
										</div>
									</motion.div>

									{/* Termos e Condições */}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={inView ? { opacity: 1, y: 0 } : {}}
										transition={{ delay: 1.5, duration: 0.6 }}
										className="space-y-4"
									>
										<label className="flex items-start space-x-3 text-sm text-gray-600 cursor-pointer group p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
											<input
												type="checkbox"
												name="acceptTerms"
												className="w-5 h-5 mt-0.5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 transition-colors duration-200"
												checked={formData.acceptTerms}
												onChange={handleChange}
												required
												disabled={loading}
											/>
											<span className="group-hover:text-gray-800 transition-colors duration-200 leading-relaxed">
												Eu aceito os{' '}
												<Link
													href="/terms"
													className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
												>
													Termos de Uso
												</Link>{' '}
												e a{' '}
												<Link
													href="/privacy"
													className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
												>
													Política de Privacidade
												</Link>
											</span>
										</label>
									</motion.div>

									{/* Submit Button */}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={inView ? { opacity: 1, y: 0 } : {}}
										transition={{ delay: 1.7, duration: 0.6 }}
									>
										<motion.div
											whileHover={{ scale: 1.01 }}
											whileTap={{ scale: 0.99 }}
										>
											<Button
												type="submit"
												className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
												disabled={loading}
											>
												{loading ? (
													<div className="flex items-center justify-center gap-2">
														<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
														Criando conta...
													</div>
												) : (
													<div className="flex items-center justify-center gap-2">
														Criar Conta Grátis
														<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
													</div>
												)}
											</Button>
										</motion.div>
									</motion.div>
								</form>

								{/* Login Link */}
								<motion.div
									initial={{ opacity: 0 }}
									animate={inView ? { opacity: 1 } : {}}
									transition={{ delay: 1.9, duration: 0.6 }}
									className="text-center text-sm text-gray-600 pt-6 border-t border-gray-200"
								>
									Já tem uma conta?{' '}
									<Link
										href="/login"
										className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200 hover:underline"
									>
										Entre agora
									</Link>
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
