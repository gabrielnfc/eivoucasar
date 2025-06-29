'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
	ArrowRight,
	Star,
	Users,
	Trophy,
	CheckCircle,
	AlertCircle,
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
			<div className="min-h-screen bg-gradient-to-br from-slate-50 to-rose-50 flex items-center justify-center px-4">
				<Card className="w-full max-w-md text-center">
					<CardContent className="pt-6">
						<CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
						<h2 className="text-2xl font-bold text-slate-900 mb-2">
							Conta criada com sucesso!
						</h2>
						<p className="text-secondary-600 mb-4">
							Verifique seu email para confirmar sua conta e começar a usar o
							EiVouCasar!
						</p>
						<Button asChild>
							<Link href="/login">Ir para Login</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-mesh-gradient">
			{/* Header Simples */}
			<header className="border-b border-neutral-200 bg-white/80 backdrop-blur-sm">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<Link href="/" className="hover:opacity-80 transition-opacity">
							<Logo size="lg" />
						</Link>

						<div className="flex items-center space-x-4">
							<span className="text-sm text-secondary-600">
								Já tem uma conta?
							</span>
							<Button variant="ghost" asChild>
								<Link href="/login">Entrar</Link>
							</Button>
						</div>
					</div>
				</div>
			</header>

			<div className="flex min-h-[calc(100vh-4rem)]">
				{/* Left Side - Form */}
				<div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
					<Card variant="glass" className="w-full max-w-2xl shadow-romantic">
						<CardHeader className="text-center">
							<CardTitle className="text-2xl font-bold text-secondary-900">
								Crie sua conta
							</CardTitle>
							<CardDescription>
								Comece a gamificar seu casamento em 2 minutos
							</CardDescription>
						</CardHeader>

						<CardContent className="space-y-6">
							{error && (
								<div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
									<AlertCircle className="h-5 w-5 flex-shrink-0" />
									<span className="text-sm">{error}</span>
								</div>
							)}

							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Seção: Dados do Casal */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-secondary-800 border-b border-neutral-200 pb-2">
										👰🤵 Dados do Casal
									</h3>

									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<label
												htmlFor="brideName"
												className="text-sm font-medium text-secondary-700"
											>
												Nome Completo da Noiva *
											</label>
											<input
												id="brideName"
												name="brideName"
												type="text"
												className="input-modern"
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
												className="text-sm font-medium text-secondary-700"
											>
												Nome Completo do Noivo *
											</label>
											<input
												id="groomName"
												name="groomName"
												type="text"
												className="input-modern"
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
											className="text-sm font-medium text-secondary-700"
										>
											Eu sou *
										</label>
										<select
											id="signupRole"
											name="signupRole"
											className="input-modern"
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
								</div>

								{/* Seção: Contato */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-secondary-800 border-b border-neutral-200 pb-2">
										📧 Contato
									</h3>

									<div className="space-y-2">
										<label
											htmlFor="email"
											className="text-sm font-medium text-secondary-700"
										>
											E-mail Principal *
										</label>
										<input
											id="email"
											name="email"
											type="email"
											className="input-modern"
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
											className="text-sm font-medium text-secondary-700"
										>
											E-mail Secundário (opcional)
										</label>
										<input
											id="emailSecondary"
											name="emailSecondary"
											type="email"
											className="input-modern"
											placeholder="segundo@email.com"
											value={formData.emailSecondary}
											onChange={handleChange}
											disabled={loading}
										/>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<label
												htmlFor="bridePhone"
												className="text-sm font-medium text-secondary-700"
											>
												Telefone da Noiva
											</label>
											<input
												id="bridePhone"
												name="bridePhone"
												type="tel"
												className="input-modern"
												placeholder="(11) 99999-9999"
												value={formData.bridePhone}
												onChange={handleChange}
												disabled={loading}
											/>
										</div>
										<div className="space-y-2">
											<label
												htmlFor="groomPhone"
												className="text-sm font-medium text-secondary-700"
											>
												Telefone do Noivo
											</label>
											<input
												id="groomPhone"
												name="groomPhone"
												type="tel"
												className="input-modern"
												placeholder="(11) 99999-9999"
												value={formData.groomPhone}
												onChange={handleChange}
												disabled={loading}
											/>
										</div>
									</div>
									<p className="text-xs text-secondary-500">
										* Informe pelo menos um telefone
									</p>
								</div>

								{/* Seção: Localização */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-secondary-800 border-b border-neutral-200 pb-2">
										📍 Localização
									</h3>

									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<label
												htmlFor="city"
												className="text-sm font-medium text-secondary-700"
											>
												Cidade *
											</label>
											<input
												id="city"
												name="city"
												type="text"
												className="input-modern"
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
												className="text-sm font-medium text-secondary-700"
											>
												Estado *
											</label>
											<input
												id="state"
												name="state"
												type="text"
												className="input-modern"
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
											className="text-sm font-medium text-secondary-700"
										>
											País
										</label>
										<input
											id="country"
											name="country"
											type="text"
											className="input-modern"
											value={formData.country}
											onChange={handleChange}
											disabled={loading}
										/>
									</div>
								</div>

								{/* Seção: Casamento */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-secondary-800 border-b border-neutral-200 pb-2">
										💒 Casamento
									</h3>

									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<label
												htmlFor="weddingDate"
												className="text-sm font-medium text-secondary-700"
											>
												Data do Casamento *
											</label>
											<input
												id="weddingDate"
												name="weddingDate"
												type="date"
												className="input-modern"
												value={formData.weddingDate}
												onChange={handleChange}
												required
												disabled={loading}
											/>
										</div>
										<div className="space-y-2">
											<label
												htmlFor="weddingTime"
												className="text-sm font-medium text-secondary-700"
											>
												Horário *
											</label>
											<input
												id="weddingTime"
												name="weddingTime"
												type="time"
												className="input-modern"
												value={formData.weddingTime}
												onChange={handleChange}
												required
												disabled={loading}
											/>
										</div>
									</div>
								</div>

								{/* Seção: Senha */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-secondary-800 border-b border-neutral-200 pb-2">
										🔒 Senha
									</h3>

									<div className="space-y-2">
										<label
											htmlFor="password"
											className="text-sm font-medium text-secondary-700"
										>
											Senha *
										</label>
										<input
											id="password"
											name="password"
											type="password"
											className="input-modern"
											placeholder="••••••••"
											value={formData.password}
											onChange={handleChange}
											required
											disabled={loading}
											minLength={6}
										/>
									</div>

									<div className="space-y-2">
										<label
											htmlFor="confirmPassword"
											className="text-sm font-medium text-secondary-700"
										>
											Confirmar Senha *
										</label>
										<input
											id="confirmPassword"
											name="confirmPassword"
											type="password"
											className="input-modern"
											placeholder="••••••••"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											required
											disabled={loading}
											minLength={6}
										/>
									</div>
								</div>

								{/* Seção: Termos */}
								<div className="space-y-4">
									<div className="flex items-start space-x-3">
										<input
											id="acceptTerms"
											name="acceptTerms"
											type="checkbox"
											className="mt-1"
											checked={formData.acceptTerms}
											onChange={handleChange}
											required
											disabled={loading}
										/>
										<label
											htmlFor="acceptTerms"
											className="text-sm text-secondary-700"
										>
											Aceito os{' '}
											<Link
												href="/terms"
												className="text-primary-500 hover:underline"
											>
												Termos de Uso
											</Link>{' '}
											e a{' '}
											<Link
												href="/privacy"
												className="text-primary-500 hover:underline"
											>
												Política de Privacidade
											</Link>{' '}
											*
										</label>
									</div>
								</div>

								<Button
									type="submit"
									className="w-full"
									size="lg"
									disabled={loading}
								>
									{loading ? 'Criando conta...' : 'Criar Meu Site de Casamento'}
									{!loading && <ArrowRight className="ml-2 h-4 w-4" />}
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>

				{/* Right Side - Benefits */}
				<div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 text-white p-8">
					<div className="max-w-md space-y-8">
						<div>
							<h2 className="text-3xl font-bold mb-4">
								Transforme seu casamento em uma competição épica
							</h2>
							<p className="text-primary-100 text-lg">
								Gamifique as contribuições e veja a mágica acontecer
							</p>
						</div>

						<div className="space-y-6">
							<div className="flex items-start space-x-3">
								<div className="flex-shrink-0">
									<CheckCircle className="h-6 w-6 text-primary-200" />
								</div>
								<div>
									<h3 className="font-semibold">
										Site único criado em 5 minutos
									</h3>
									<p className="text-primary-100 text-sm">
										Interface linda e responsiva, pronta para compartilhar
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-3">
								<div className="flex-shrink-0">
									<Users className="h-6 w-6 text-primary-200" />
								</div>
								<div>
									<h3 className="font-semibold">Grupos competindo</h3>
									<p className="text-primary-100 text-sm">
										Família vs Amigos - quem contribui mais?
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-3">
								<div className="flex-shrink-0">
									<Trophy className="h-6 w-6 text-primary-200" />
								</div>
								<div>
									<h3 className="font-semibold">Rankings em tempo real</h3>
									<p className="text-primary-100 text-sm">
										Acompanhe as metas e celebre cada contribuição
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-3">
								<div className="flex-shrink-0">
									<Star className="h-6 w-6 text-primary-200" />
								</div>
								<div>
									<h3 className="font-semibold">PIX instantâneo</h3>
									<p className="text-primary-100 text-sm">
										Receba o dinheiro direto na sua conta
									</p>
								</div>
							</div>
						</div>

						<div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
							<p className="text-sm text-primary-100">
								💡 <strong>Dica:</strong> Casais que gamificam recebem em média
								<span className="text-white font-semibold">
									{' '}
									40% mais contribuições
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
