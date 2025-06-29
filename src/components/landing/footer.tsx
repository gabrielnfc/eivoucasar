'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
	Heart,
	Mail,
	Phone,
	MapPin,
	Instagram,
	Facebook,
	Twitter,
	Youtube,
	Shield,
	Award,
	Users,
	Sparkles,
	Star,
} from 'lucide-react';
import Logo from '@/components/ui/logo';

const footerSections = [
	{
		title: 'Produto',
		links: [
			{ name: 'Funcionalidades', href: '#features' },
			{ name: 'Preços', href: '#pricing' },
			{ name: 'Gamificação', href: '#gamification' },
			{ name: 'Templates', href: '/templates' },
			{ name: 'Demonstração', href: '/demo' },
		],
	},
	{
		title: 'Empresa',
		links: [
			{ name: 'Sobre Nós', href: '/about' },
			{ name: 'Blog', href: '/blog' },
			{ name: 'Carreiras', href: '/careers' },
			{ name: 'Contato', href: '/contact' },
			{ name: 'Imprensa', href: '/press' },
		],
	},
	{
		title: 'Recursos',
		links: [
			{ name: 'Central de Ajuda', href: '/help' },
			{ name: 'Guias', href: '/guides' },
			{ name: 'API Docs', href: '/api' },
			{ name: 'Status', href: '/status' },
			{ name: 'Changelog', href: '/changelog' },
		],
	},
	{
		title: 'Legal',
		links: [
			{ name: 'Privacidade', href: '/privacy' },
			{ name: 'Termos', href: '/terms' },
			{ name: 'Cookies', href: '/cookies' },
			{ name: 'LGPD', href: '/lgpd' },
			{ name: 'Licenças', href: '/licenses' },
		],
	},
];

const socialLinks = [
	{
		icon: Instagram,
		href: 'https://instagram.com/eivoucasar',
		label: 'Instagram',
	},
	{
		icon: Facebook,
		href: 'https://facebook.com/eivoucasar',
		label: 'Facebook',
	},
	{ icon: Twitter, href: 'https://twitter.com/eivoucasar', label: 'Twitter' },
	{ icon: Youtube, href: 'https://youtube.com/eivoucasar', label: 'YouTube' },
];

const trustBadges = [
	{ icon: Shield, text: 'SSL Seguro' },
	{ icon: Award, text: 'ISO 27001' },
	{ icon: Users, text: '+10k Casais' },
	{ icon: Star, text: '4.9/5 Estrelas' },
];

export default function Footer() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<footer className="relative overflow-hidden">
			{/* Background Decorativo */}
			<div className="absolute inset-0">
				{/* Gradiente Base */}
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"></div>

				{/* Overlay com Texturas */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-purple-900/10"></div>
				<div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 via-transparent to-pink-900/5"></div>

				{/* Elementos Geométricos Flutuantes */}
				<motion.div
					className="absolute top-20 left-20 w-64 h-64 opacity-5"
					animate={{
						rotate: [0, 360],
						scale: [1, 1.2, 1],
					}}
					transition={{
						duration: 40,
						repeat: Infinity,
						ease: 'linear',
					}}
				>
					<div className="w-full h-full border-4 border-purple-400/30 rounded-full"></div>
					<div className="absolute top-8 left-8 w-48 h-48 border-2 border-blue-400/20 rounded-full"></div>
					<div className="absolute top-16 left-16 w-32 h-32 bg-gradient-to-br from-rose-400/10 to-purple-400/10 rounded-full"></div>
				</motion.div>

				<motion.div
					className="absolute top-40 right-32 w-48 h-48 opacity-8"
					animate={{
						y: [0, -30, 0],
						rotate: [0, 180, 360],
					}}
					transition={{
						duration: 35,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="w-full h-full bg-gradient-to-br from-cyan-400/15 to-blue-400/15 transform rotate-45 rounded-3xl"></div>
				</motion.div>

				<motion.div
					className="absolute bottom-40 left-1/4 w-56 h-56 opacity-6"
					animate={{
						scale: [1, 1.3, 1],
						rotate: [45, 135, 45],
					}}
					transition={{
						duration: 45,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="w-full h-full border-6 border-emerald-400/20 rounded-2xl transform rotate-12"></div>
				</motion.div>

				{/* Partículas Brilhantes */}
				{[...Array(10)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-3 h-3 bg-gradient-to-r from-white/40 to-purple-200/40 rounded-full"
						style={{
							left: `${15 + i * 8}%`,
							top: `${20 + (i % 4) * 20}%`,
						}}
						animate={{
							opacity: [0.2, 0.8, 0.2],
							scale: [0.5, 1, 0.5],
							y: [0, -20, 0],
						}}
						transition={{
							duration: 3 + i * 0.4,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: i * 0.3,
						}}
					/>
				))}

				{/* Linha Decorativa Superior */}
				<div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
			</div>

			{/* Conteúdo Principal */}
			<div className="relative z-10 pt-20 pb-8">
				<div className="container mx-auto px-4">
					<motion.div
						ref={ref}
						initial={{ opacity: 0, y: 30 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8 }}
					>
						{/* Header do Footer */}
						<div className="grid lg:grid-cols-6 gap-12 mb-16">
							{/* Logo e Descrição */}
							<div className="lg:col-span-2 space-y-6">
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									animate={inView ? { opacity: 1, x: 0 } : {}}
									transition={{ delay: 0.2, duration: 0.6 }}
								>
									<Logo className="h-12 w-auto" />
								</motion.div>

								<motion.div
									initial={{ opacity: 0, x: -20 }}
									animate={inView ? { opacity: 1, x: 0 } : {}}
									transition={{ delay: 0.3, duration: 0.6 }}
									className="space-y-4"
								>
									<p className="text-gray-300 leading-relaxed">
										A plataforma mais completa para criar sites de casamento
										únicos com gamificação exclusiva que engaja todos os seus
										convidados.
									</p>

									{/* Informações de Contato */}
									<div className="space-y-3">
										<div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
											<Mail className="w-4 h-4" />
											<span className="text-sm">contato@eivoucasar.com</span>
										</div>
										<div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
											<Phone className="w-4 h-4" />
											<span className="text-sm">+55 (27) 99259-4304</span>
										</div>
										<div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
											<MapPin className="w-4 h-4" />
											<span className="text-sm">Espírito Santo, Brasil</span>
										</div>
									</div>
								</motion.div>
							</div>

							{/* Links de Navegação */}
							{footerSections.map((section, index) => (
								<motion.div
									key={section.title}
									initial={{ opacity: 0, y: 20 }}
									animate={inView ? { opacity: 1, y: 0 } : {}}
									transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
									className="space-y-6"
								>
									<h3 className="text-lg font-semibold text-white">
										{section.title}
									</h3>
									<ul className="space-y-3">
										{section.links.map((link) => (
											<li key={link.name}>
												<Link
													href={link.href}
													className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
												>
													{link.name}
												</Link>
											</li>
										))}
									</ul>
								</motion.div>
							))}
						</div>

						{/* Newsletter */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.8, duration: 0.6 }}
							className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8 mb-12"
						>
							<div className="grid md:grid-cols-2 gap-8 items-center">
								<div>
									<div className="flex items-center gap-3 mb-4">
										<div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
											<Sparkles className="w-6 h-6 text-white" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-white">
												Dicas Exclusivas
											</h3>
											<p className="text-sm text-gray-300">
												Receba inspirações para seu casamento
											</p>
										</div>
									</div>
									<p className="text-gray-300">
										Cadastre-se e receba dicas, tendências e ofertas especiais
										direto no seu email.
									</p>
								</div>

								<div className="space-y-4">
									<div className="flex gap-2">
										<input
											type="email"
											placeholder="Seu melhor email"
											className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300"
										/>
										<motion.button
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
										>
											Inscrever
										</motion.button>
									</div>
									<p className="text-xs text-gray-400">
										Prometemos não enviar spam. Você pode cancelar a qualquer
										momento.
									</p>
								</div>
							</div>
						</motion.div>

						{/* Redes Sociais e Trust Badges */}
						<div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
							{/* Redes Sociais */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={inView ? { opacity: 1, x: 0 } : {}}
								transition={{ delay: 1, duration: 0.6 }}
								className="flex items-center gap-4"
							>
								<span className="text-gray-400 text-sm font-medium">
									Siga-nos:
								</span>
								<div className="flex gap-3">
									{socialLinks.map((social) => {
										const Icon = social.icon;
										return (
											<motion.a
												key={social.label}
												href={social.href}
												target="_blank"
												rel="noopener noreferrer"
												whileHover={{ scale: 1.1, y: -2 }}
												className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
											>
												<Icon className="w-5 h-5" />
											</motion.a>
										);
									})}
								</div>
							</motion.div>

							{/* Trust Badges */}
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={inView ? { opacity: 1, x: 0 } : {}}
								transition={{ delay: 1.1, duration: 0.6 }}
								className="flex flex-wrap gap-4"
							>
								{trustBadges.map((badge, index) => {
									const Icon = badge.icon;
									return (
										<div
											key={index}
											className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2"
										>
											<Icon className="w-4 h-4 text-emerald-400" />
											<span className="text-xs text-gray-300 font-medium">
												{badge.text}
											</span>
										</div>
									);
								})}
							</motion.div>
						</div>

						{/* Copyright */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 1.2, duration: 0.6 }}
							className="pt-8 border-t border-white/10"
						>
							<div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
								<div className="flex items-center gap-2">
									<Heart className="w-4 h-4 text-rose-500" />
									<span>
										© 2024 EiVouCasar. Criado com amor em Vitória - Espírito
										Santo.
									</span>
								</div>
								<div className="flex items-center gap-6">
									<span>Todos os direitos reservados</span>
									<span>•</span>
									<span>v2.1.0</span>
								</div>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</footer>
	);
}
