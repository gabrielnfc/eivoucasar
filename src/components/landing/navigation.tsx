'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';

const navLinks = [
	{ name: 'Funcionalidades', href: '#features' },
	{ name: 'Exemplos', href: '#examples' },
	{ name: 'Preços', href: '#pricing' },
	{ name: 'FAQ', href: '#faq' },
];

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50">
			{/* Background com elementos decorativos */}
			<div className="absolute inset-0 overflow-hidden">
				{/* Gradiente base */}
				<div
					className={`absolute inset-0 transition-all duration-500 ${
						scrolled
							? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-200/50'
							: 'bg-white/80 backdrop-blur-lg border-b border-white/20'
					}`}
				></div>

				{/* Elementos decorativos flutuantes */}
				<motion.div
					className="absolute top-0 right-20 w-32 h-32 opacity-5"
					animate={{
						rotate: [0, 360],
						scale: [1, 1.1, 1],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: 'linear',
					}}
				>
					<div className="w-full h-full bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full"></div>
				</motion.div>

				<motion.div
					className="absolute top-2 left-1/4 w-24 h-24 opacity-8"
					animate={{
						y: [0, -10, 0],
						rotate: [0, 180, 360],
					}}
					transition={{
						duration: 15,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="w-full h-full bg-gradient-to-br from-blue-300/20 to-cyan-300/20 transform rotate-45 rounded-2xl"></div>
				</motion.div>

				{/* Partículas sutis */}
				{[...Array(3)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-2 h-2 bg-gradient-to-r from-purple-300/40 to-pink-300/40 rounded-full"
						style={{
							left: `${30 + i * 20}%`,
							top: `${5 + i * 3}px`,
						}}
						animate={{
							opacity: [0.3, 0.8, 0.3],
							y: [0, -8, 0],
							scale: [0.5, 1, 0.5],
						}}
						transition={{
							duration: 2 + i,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: i * 0.3,
						}}
					/>
				))}
			</div>

			{/* Conteúdo da Navigation */}
			<div className="relative z-10 container mx-auto px-4">
				<div className="flex items-center justify-between h-20">
					{/* Logo com animação */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="flex-shrink-0"
					>
						<Link href="/" className="flex items-center space-x-2 group">
							<Logo className="h-10 w-auto group-hover:scale-105 transition-transform duration-300" />
						</Link>
					</motion.div>

					{/* Desktop Navigation */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="hidden md:flex items-center space-x-8"
					>
						{navLinks.map((link, index) => (
							<motion.div
								key={link.name}
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
							>
						<Link
									href={link.href}
									className="relative text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 group"
								>
									{link.name}
									<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full rounded-full"></span>

									{/* Efeito de brilho no hover */}
									<span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg -m-2"></span>
						</Link>
							</motion.div>
						))}
					</motion.div>

					{/* Desktop CTAs */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="hidden md:flex items-center space-x-4"
						>
						<Link
							href="/login"
							className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 px-4 py-2 rounded-full hover:bg-purple-50"
						>
							Entrar
						</Link>

						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button
								className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
								asChild
							>
								<Link href="/signup" className="flex items-center">
									<Heart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
									Criar Site Grátis
									<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
								</Link>
							</Button>
						</motion.div>
					</motion.div>

					{/* Mobile menu button */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.4, delay: 0.5 }}
						className="md:hidden"
					>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsOpen(!isOpen)}
							className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 p-2 rounded-2xl"
						>
							<motion.div
								animate={{ rotate: isOpen ? 180 : 0 }}
								transition={{ duration: 0.3 }}
							>
								{isOpen ? (
									<X className="w-6 h-6" />
								) : (
									<Menu className="w-6 h-6" />
								)}
							</motion.div>
						</Button>
					</motion.div>
				</div>

				{/* Mobile Navigation */}
				<motion.div
					initial={false}
					animate={{
						height: isOpen ? 'auto' : 0,
						opacity: isOpen ? 1 : 0,
					}}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					className="md:hidden overflow-hidden"
				>
					<div className="py-6 space-y-4 bg-white/95 backdrop-blur-xl rounded-3xl mt-4 border border-gray-200/50 shadow-xl shadow-gray-200/50">
						{navLinks.map((link, index) => (
							<motion.div
								key={link.name}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
								transition={{ duration: 0.3, delay: index * 0.1 }}
							>
								<Link
									href={link.href}
									className="block px-6 py-3 text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 mx-2 rounded-2xl"
									onClick={() => setIsOpen(false)}
								>
									{link.name}
								</Link>
							</motion.div>
						))}

						{/* Mobile CTAs */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
							transition={{ duration: 0.3, delay: 0.4 }}
							className="pt-4 px-2 space-y-3"
						>
							<Link
								href="/login"
								className="block py-3 text-center text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 hover:bg-purple-50 rounded-2xl"
								onClick={() => setIsOpen(false)}
							>
								Entrar
							</Link>

							<Button
								className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
								asChild
							>
								<Link
									href="/signup"
									onClick={() => setIsOpen(false)}
									className="flex items-center justify-center"
								>
									<Heart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
									Criar Site Grátis
									<Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform duration-300" />
								</Link>
							</Button>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</nav>
	);
}
