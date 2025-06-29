'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Logo from '@/components/ui/logo';
import { signIn } from '@/lib/auth';
import { useAuth } from '@/contexts/auth-context';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const router = useRouter();
	const { refreshUser } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const result = await signIn({ email, password });

			if (result.success) {
				await refreshUser();
				router.push('/dashboard');
			} else {
				setError(result.error || 'Erro ao fazer login');
			}
		} catch (error) {
			setError('Erro inesperado. Tente novamente.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-mesh-gradient flex items-center justify-center px-4">
			<div className="w-full max-w-md">
				{/* Logo */}
				<div className="text-center mb-8">
					<Link href="/" className="inline-block hover:opacity-80 transition-opacity">
						<Logo size="xl" />
					</Link>
				</div>

				<Card variant="glass" className="shadow-romantic">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl font-bold text-secondary-900">
							Bem-vindo de volta
						</CardTitle>
						<CardDescription>
							Entre na sua conta para gerenciar seu site de casamento
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
							<div className="space-y-2">
								<label
									htmlFor="email"
									className="text-sm font-medium text-secondary-700"
								>
									E-mail
								</label>
								<input
									id="email"
									type="email"
									className="input-modern"
									placeholder="seu@email.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									disabled={loading}
								/>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="password"
									className="text-sm font-medium text-secondary-700"
								>
									Senha
								</label>
								<input
									id="password"
									type="password"
									className="input-modern"
									placeholder="••••••••"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									disabled={loading}
								/>
							</div>

							<div className="flex items-center justify-between">
								<label className="flex items-center space-x-2 text-sm text-secondary-600">
									<input 
										type="checkbox" 
										className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
									/>
									<span>Lembrar de mim</span>
								</label>

								<Link
									href="/forgot-password"
									className="text-sm text-primary-500 hover:text-primary-600 transition-colors"
								>
									Esqueci minha senha
								</Link>
							</div>

							<Button
								type="submit"
								className="w-full"
								size="lg"
								disabled={loading}
								variant="primary"
							>
								{loading ? 'Entrando...' : 'Entrar'}
								{!loading && <ArrowRight className="ml-2 h-4 w-4" />}
							</Button>
						</form>

						<div className="text-center text-sm text-secondary-600">
							Não tem uma conta?{' '}
							<Link
								href="/signup"
								className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
							>
								Crie agora grátis
							</Link>
						</div>
					</CardContent>
				</Card>

				<div className="mt-8 text-center">
					<Link
						href="/"
						className="text-sm text-secondary-500 hover:text-secondary-700 transition-colors"
					>
						← Voltar para o site
					</Link>
				</div>
			</div>
		</div>
	);
}
