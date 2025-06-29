'use client';

// ===============================================
// EICASEI - DESIGN SYSTEM SHOWCASE
// Demonstra todos os componentes do design system moderno
// ===============================================

import { Button } from './button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
	CardIcon,
} from './card';
import {
	Heart,
	Users,
	Trophy,
	Star,
	Sparkles,
	ArrowRight,
	Eye,
} from 'lucide-react';

export default function DesignSystemShowcase() {
	return (
		<div className="min-h-screen bg-mesh-gradient p-8">
			<div className="container-modern">
				{/* Header */}
				<div className="text-center space-component">
					<h1 className="heading-1">
						Design System <span className="text-gradient-primary">Moderno</span>
					</h1>
					<p className="body-large">
						Romance Moderno - Paleta elegante e minimalista para SaaS de
						casamento
					</p>
				</div>

				{/* Colors Palette */}
				<Card variant="elevated" className="space-component">
					<CardHeader>
						<CardTitle size="lg">Paleta de Cores</CardTitle>
						<CardDescription>Cores principais do design system</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
							{/* Primary Colors */}
							<div className="space-y-3">
								<h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
									Primary
								</h4>
								<div className="space-y-2">
									<div className="h-12 rounded-lg bg-primary-500 flex items-center justify-center text-white text-sm font-medium">
										#e4a5a7
									</div>
									<div className="h-8 rounded-md bg-primary-300"></div>
									<div className="h-8 rounded-md bg-primary-700"></div>
								</div>
							</div>

							{/* Secondary Colors */}
							<div className="space-y-3">
								<h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
									Secondary
								</h4>
								<div className="space-y-2">
									<div className="h-12 rounded-lg bg-secondary-500 flex items-center justify-center text-white text-sm font-medium">
										#6b73a3
									</div>
									<div className="h-8 rounded-md bg-secondary-300"></div>
									<div className="h-8 rounded-md bg-secondary-700"></div>
								</div>
							</div>

							{/* Accent Colors */}
							<div className="space-y-3">
								<h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
									Accent
								</h4>
								<div className="space-y-2">
									<div className="h-12 rounded-lg bg-accent-500 flex items-center justify-center text-neutral-900 text-sm font-medium">
										#eeb040
									</div>
									<div className="h-8 rounded-md bg-accent-300"></div>
									<div className="h-8 rounded-md bg-accent-700"></div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Buttons */}
				<Card variant="elevated" className="space-component">
					<CardHeader>
						<CardTitle size="lg">Botões</CardTitle>
						<CardDescription>
							Todas as variantes e tamanhos disponíveis
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Primary Buttons */}
						<div>
							<h4 className="font-semibold mb-3">Variantes Principais</h4>
							<div className="flex flex-wrap gap-4">
								<Button variant="primary">Primary</Button>
								<Button variant="secondary">Secondary</Button>
								<Button variant="accent">Accent</Button>
								<Button variant="ghost">Ghost</Button>
								<Button variant="outline">Outline</Button>
								<Button variant="glass">Glass</Button>
								<Button variant="gradient">Gradient</Button>
							</div>
						</div>

						{/* Sizes */}
						<div>
							<h4 className="font-semibold mb-3">Tamanhos</h4>
							<div className="flex flex-wrap items-center gap-4">
								<Button size="xs">Extra Small</Button>
								<Button size="sm">Small</Button>
								<Button size="md">Medium</Button>
								<Button size="lg">Large</Button>
								<Button size="xl">Extra Large</Button>
							</div>
						</div>

						{/* With Icons */}
						<div>
							<h4 className="font-semibold mb-3">Com Ícones</h4>
							<div className="flex flex-wrap gap-4">
								<Button variant="primary" icon={<Heart className="h-4 w-4" />}>
									Com Ícone
								</Button>
								<Button
									variant="accent"
									icon={<ArrowRight className="h-4 w-4" />}
									iconPosition="right"
								>
									Ícone à Direita
								</Button>
								<Button variant="glass" loading>
									Carregando...
								</Button>
							</div>
						</div>

						{/* Animations */}
						<div>
							<h4 className="font-semibold mb-3">Animações</h4>
							<div className="flex flex-wrap gap-4">
								<Button variant="primary" animation="glow">
									Glow
								</Button>
								<Button variant="secondary" animation="pulse">
									Pulse
								</Button>
								<Button variant="accent" animation="bounce">
									Bounce
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Cards */}
				<Card variant="elevated" className="space-component">
					<CardHeader>
						<CardTitle size="lg">Cards</CardTitle>
						<CardDescription>
							Diferentes variantes de cards com exemplos
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{/* Default Card */}
							<Card variant="default">
								<CardHeader>
									<CardIcon variant="primary">
										<Heart className="h-6 w-6" />
									</CardIcon>
									<CardTitle>Card Padrão</CardTitle>
									<CardDescription>
										Card simples com border e fundo branco
									</CardDescription>
								</CardHeader>
							</Card>

							{/* Elevated Card */}
							<Card variant="elevated" interactive="hover">
								<CardHeader>
									<CardIcon variant="secondary">
										<Users className="h-6 w-6" />
									</CardIcon>
									<CardTitle>Card Elevado</CardTitle>
									<CardDescription>
										Com shadow e efeito hover interativo
									</CardDescription>
								</CardHeader>
							</Card>

							{/* Glass Card */}
							<Card variant="glass">
								<CardHeader>
									<CardIcon variant="accent">
										<Trophy className="h-6 w-6" />
									</CardIcon>
									<CardTitle>Glass Card</CardTitle>
									<CardDescription>
										Efeito glassmorphism moderno
									</CardDescription>
								</CardHeader>
							</Card>

							{/* Gradient Card */}
							<Card variant="gradient">
								<CardHeader>
									<CardIcon variant="primary">
										<Star className="h-6 w-6" />
									</CardIcon>
									<CardTitle gradient>Card Gradiente</CardTitle>
									<CardDescription>
										Com gradiente sutil de fundo
									</CardDescription>
								</CardHeader>
							</Card>

							{/* Romantic Card */}
							<Card variant="romantic" interactive="clickable">
								<CardHeader centered>
									<CardIcon variant="accent" size="lg">
										<Sparkles className="h-8 w-8" />
									</CardIcon>
									<CardTitle size="lg">Romantic</CardTitle>
									<CardDescription>
										Estilo romântico com múltiplas cores
									</CardDescription>
								</CardHeader>
								<CardFooter centered>
									<Button variant="outline" size="sm">
										Ver Mais
									</Button>
								</CardFooter>
							</Card>

							{/* Outline Card */}
							<Card variant="outline" interactive="magnetic">
								<CardHeader centered>
									<CardIcon variant="neutral">
										<Eye className="h-6 w-6" />
									</CardIcon>
									<CardTitle>Outline</CardTitle>
									<CardDescription>
										Apenas border com hover magnético
									</CardDescription>
								</CardHeader>
							</Card>
						</div>
					</CardContent>
				</Card>

				{/* Typography */}
				<Card variant="elevated" className="space-component">
					<CardHeader>
						<CardTitle size="lg">Tipografia</CardTitle>
						<CardDescription>Sistema de tipografia hierárquico</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div>
							<h1 className="heading-1">Heading 1</h1>
							<p className="text-sm text-neutral-500 mt-1">.heading-1</p>
						</div>
						<div>
							<h2 className="heading-2">Heading 2</h2>
							<p className="text-sm text-neutral-500 mt-1">.heading-2</p>
						</div>
						<div>
							<h3 className="heading-3">Heading 3</h3>
							<p className="text-sm text-neutral-500 mt-1">.heading-3</p>
						</div>
						<div>
							<p className="body-large">
								Body Large - Lorem ipsum dolor sit amet, consectetur adipiscing
								elit.
							</p>
							<p className="text-sm text-neutral-500 mt-1">.body-large</p>
						</div>
						<div>
							<p className="body-base">
								Body Base - Lorem ipsum dolor sit amet, consectetur adipiscing
								elit.
							</p>
							<p className="text-sm text-neutral-500 mt-1">.body-base</p>
						</div>
						<div>
							<p className="text-gradient-primary text-2xl font-bold">
								Texto com Gradiente
							</p>
							<p className="text-sm text-neutral-500 mt-1">
								.text-gradient-primary
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Effects and Animations */}
				<Card variant="elevated" className="space-component">
					<CardHeader>
						<CardTitle size="lg">Efeitos e Animações</CardTitle>
						<CardDescription>
							Demonstração dos efeitos modernos disponíveis
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							<div className="interactive-hover p-6 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-center">
								<h4 className="font-semibold mb-2">Interactive Hover</h4>
								<p className="text-sm text-neutral-600 dark:text-neutral-400">
									Hover para ver o efeito
								</p>
							</div>

							<div className="magnetic-hover p-6 rounded-xl bg-secondary-50 dark:bg-secondary-900/20 text-center">
								<h4 className="font-semibold mb-2">Magnetic Hover</h4>
								<p className="text-sm text-neutral-600 dark:text-neutral-400">
									Efeito magnético
								</p>
							</div>

							<div className="tilt-hover p-6 rounded-xl bg-accent-50 dark:bg-accent-900/20 text-center">
								<h4 className="font-semibold mb-2">Tilt Hover</h4>
								<p className="text-sm text-neutral-600 dark:text-neutral-400">
									Rotação sutil
								</p>
							</div>

							<div className="animate-fade-in p-6 rounded-xl bg-gradient-romantic text-center">
								<h4 className="font-semibold mb-2">Fade In</h4>
								<p className="text-sm text-neutral-600 dark:text-neutral-400">
									Animação de entrada
								</p>
							</div>

							<div className="animate-slide-up p-6 rounded-xl glass-effect text-center">
								<h4 className="font-semibold mb-2">Slide Up</h4>
								<p className="text-sm text-neutral-600 dark:text-neutral-400">
									Movimento vertical
								</p>
							</div>

							<div className="animate-scale-in p-6 rounded-xl shadow-romantic text-center">
								<h4 className="font-semibold mb-2">Scale In</h4>
								<p className="text-sm text-neutral-600 dark:text-neutral-400">
									Escala de entrada
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Usage Examples */}
				<Card variant="romantic" className="space-component">
					<CardHeader centered>
						<CardTitle size="xl" gradient>
							Como Usar
						</CardTitle>
						<CardDescription size="lg">
							Exemplos práticos de implementação do design system
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4 text-sm bg-neutral-900 dark:bg-neutral-800 rounded-xl p-6 overflow-x-auto">
							<div className="text-emerald-400">
								// Botão principal com ícone
							</div>
							<div className="text-neutral-300">
								{`<Button variant="gradient" size="lg" icon={<Heart />} animation="glow">
  Criar Site de Casamento
</Button>`}
							</div>

							<div className="text-emerald-400 mt-6">
								// Card interativo com glassmorphism
							</div>
							<div className="text-neutral-300">
								{`<Card variant="glass" interactive="hover">
  <CardHeader>
    <CardIcon variant="primary">
      <Users className="h-6 w-6" />
    </CardIcon>
    <CardTitle gradient>Título</CardTitle>
  </CardHeader>
</Card>`}
							</div>

							<div className="text-emerald-400 mt-6">
								// Tipografia com gradiente
							</div>
							<div className="text-neutral-300">
								{`<h1 className="heading-1">
  Seu <span className="text-gradient-primary">casamento</span> perfeito
</h1>`}
							</div>
						</div>
					</CardContent>
					<CardFooter centered>
						<Button
							variant="accent"
							size="lg"
							icon={<ArrowRight className="h-5 w-5" />}
							iconPosition="right"
						>
							Implementar Agora
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
