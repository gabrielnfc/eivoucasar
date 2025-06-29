'use client';

import { ArrowRight, Heart, Users, Trophy, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardIcon,
} from '@/components/ui/card';
import Navbar from '@/components/layout/navbar';
import Logo from '@/components/ui/logo';

export default function HomePage() {
	const { user, loading } = useAuth();

	return (
		<div className="min-h-screen bg-mesh-gradient">
			{/* Navigation */}
			<Navbar currentPage="home" variant="transparent" />

			{/* Hero Section */}
			<section className="section-padding px-4 sm:px-6 lg:px-8">
				<div className="container-modern">
					<div className="text-center animate-fade-in">
						<h1 className="heading-1 animate-stagger-1">
							Transforme seu{' '}
							<span className="text-gradient-primary">casamento</span> em uma
							competição épica
						</h1>

						<p className="body-large mt-6 max-w-3xl mx-auto animate-stagger-2">
							Crie um site único para seu casamento e gamifique as contribuições
							dos convidados. Família vs Amigos: quem contribui mais para o seu
							grande dia?
						</p>

						<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 animate-stagger-3">
							{!loading && (
								<>
									{user ? (
										<Button
											asChild
											variant="gradient"
											size="lg"
											icon={<ArrowRight className="h-5 w-5" />}
											iconPosition="right"
										>
											<Link href="/dashboard">Ir para Dashboard</Link>
										</Button>
									) : (
										<Button
											asChild
											variant="gradient"
											size="lg"
											animation="glow"
											icon={<Sparkles className="h-5 w-5" />}
											iconPosition="right"
										>
											<Link href="/signup">Criar Meu Site de Casamento</Link>
										</Button>
									)}
								</>
							)}

							<Button asChild variant="glass" size="lg">
								<Link href="#features">Ver Demonstração</Link>
							</Button>
						</div>

						<div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-600 dark:text-neutral-400 animate-stagger-4">
							<div className="flex items-center gap-2 glass-effect px-4 py-2 rounded-full">
								<Star className="h-4 w-4 text-accent-500" />
								<span>Setup em 5 minutos</span>
							</div>
							<div className="flex items-center gap-2 glass-effect px-4 py-2 rounded-full">
								<Users className="h-4 w-4 text-secondary-500" />
								<span>Ilimitados convidados</span>
							</div>
							<div className="flex items-center gap-2 glass-effect px-4 py-2 rounded-full">
								<Trophy className="h-4 w-4 text-primary-500" />
								<span>Rankings em tempo real</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Preview */}
			<section
				id="features"
				className="section-padding px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm"
			>
				<div className="container-modern">
					<div className="text-center space-component animate-fade-in">
						<h2 className="heading-2">
							Gamificação que{' '}
							<span className="text-gradient-primary">funciona</span>
						</h2>
						<p className="body-large mt-4">
							Transforme contribuições em competições divertidas
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 animate-slide-up">
						{/* Feature 1 */}
						<Card
							variant="elevated"
							interactive="hover"
							className="text-center group"
						>
							<CardHeader centered>
								<CardIcon
									variant="primary"
									size="lg"
									className="mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
								>
									<Users className="h-8 w-8" />
								</CardIcon>
								<CardTitle
									size="lg"
									className="group-hover:text-primary-600 transition-colors"
								>
									Grupos Competindo
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription size="md">
									Família da noiva vs família do noivo vs amigos. Quem contribui
									mais para o casamento?
								</CardDescription>
							</CardContent>
						</Card>

						{/* Feature 2 */}
						<Card
							variant="gradient"
							interactive="hover"
							className="text-center group"
						>
							<CardHeader centered>
								<CardIcon
									variant="secondary"
									size="lg"
									className="mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
								>
									<Trophy className="h-8 w-8" />
								</CardIcon>
								<CardTitle
									size="lg"
									gradient
									className="group-hover:scale-105 transition-transform"
								>
									Rankings em Tempo Real
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription size="md">
									Veja quem está na liderança e acompanhe as metas sendo
									atingidas em tempo real.
								</CardDescription>
							</CardContent>
						</Card>

						{/* Feature 3 */}
						<Card
							variant="elevated"
							interactive="hover"
							className="text-center group"
						>
							<CardHeader centered>
								<CardIcon
									variant="accent"
									size="lg"
									className="mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
								>
									<Heart className="h-8 w-8" />
								</CardIcon>
								<CardTitle
									size="lg"
									className="group-hover:text-primary-600 transition-colors"
								>
									PIX Instantâneo
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription size="md">
									Contribuições via PIX com QR code automático. Receba o
									dinheiro na sua conta instantaneamente.
								</CardDescription>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="section-padding px-4 sm:px-6 lg:px-8 bg-gradient-primary relative overflow-hidden">
				{/* Background decorative elements */}
				<div className="absolute inset-0 bg-gradient-to-r from-primary-500/90 to-secondary-500/90"></div>
				<div className="absolute top-0 left-0 w-96 h-96 bg-accent-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
				<div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

				<div className="container-modern relative z-10">
					<div className="text-center animate-scale-in">
						<h2 className="heading-2 text-white mb-4">
							Pronto para gamificar seu casamento?
						</h2>
						<p className="body-large text-white/90 mb-10 max-w-2xl mx-auto">
							Junte-se a centenas de casais que já transformaram suas cerimônias
							em experiências únicas
						</p>

						<div className="flex flex-col sm:flex-row items-center justify-center gap-6">
							{!loading && (
								<>
									{user ? (
										<Button
											asChild
											variant="glass"
											size="xl"
											icon={<ArrowRight className="h-6 w-6" />}
											iconPosition="right"
										>
											<Link href="/dashboard">Acessar Dashboard</Link>
										</Button>
									) : (
										<Button
											asChild
											variant="accent"
											size="xl"
											animation="glow"
											icon={<Sparkles className="h-6 w-6" />}
											iconPosition="right"
										>
											<Link href="/signup">Começar Agora - É Grátis</Link>
										</Button>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm px-4 py-12 sm:px-6 lg:px-8">
				<div className="container-modern">
					<div className="flex flex-col md:flex-row items-center justify-between">
						<div className="flex items-center space-x-3">
							<Logo size="md" />
						</div>

						<div className="mt-6 md:mt-0 flex items-center space-x-8 text-sm text-neutral-600 dark:text-neutral-400">
							<Link
								href="/privacy"
								className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
							>
								Privacidade
							</Link>
							<Link
								href="/terms"
								className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
							>
								Termos
							</Link>
							<Link
								href="/contact"
								className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
							>
								Contato
							</Link>
						</div>
					</div>

					<div className="mt-8 border-t border-neutral-200 dark:border-neutral-700 pt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
						<p>
							© 2025 EiVouCasar. Transformando casamentos em experiências
							inesquecíveis.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
