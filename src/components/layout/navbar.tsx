'use client';

// ===============================================
// EICASEI - NAVBAR COMPONENT
// ===============================================

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';

interface NavbarProps {
	currentPage?: 'home' | 'pricing' | 'features' | 'about';
	variant?: 'default' | 'transparent';
}

export default function Navbar({
	currentPage = 'home',
	variant = 'default',
}: NavbarProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { user, loading } = useAuth();

	const baseClasses =
		variant === 'transparent'
			? 'bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80'
			: 'bg-white dark:bg-neutral-900';

	const isActive = (page: string) => currentPage === page;

	return (
		<header
			className={`border-b border-neutral-200 dark:border-neutral-700 ${baseClasses}`}
		>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<Link href="/" className="hover:opacity-80 transition-opacity">
						<Logo size="lg" />
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						<Link
							href="/"
							className={`transition-colors ${
								isActive('home')
									? 'text-primary-500 font-medium'
									: 'text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white'
							}`}
						>
							Início
						</Link>
						<Link
							href="/#features"
							className={`transition-colors ${
								isActive('features')
									? 'text-primary-500 font-medium'
									: 'text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white'
							}`}
						>
							Funcionalidades
						</Link>
						<Link
							href="/pricing"
							className={`transition-colors ${
								isActive('pricing')
									? 'text-primary-500 font-medium'
									: 'text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white'
							}`}
						>
							Preços
						</Link>

						{/* Auth Links */}
						{!loading && (
							<>
								{user ? (
									<Button asChild size="sm">
										<Link href="/dashboard">Dashboard</Link>
									</Button>
								) : (
									<>
										<Link
											href="/login"
											className="text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white transition-colors"
										>
											Entrar
										</Link>
										<Button asChild size="sm">
											<Link href="/signup">Começar Grátis</Link>
										</Button>
									</>
								)}
							</>
						)}
					</nav>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white transition-colors"
						>
							{isOpen ? (
								<X className="block h-6 w-6" />
							) : (
								<Menu className="block h-6 w-6" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile menu */}
				{isOpen && (
					<div className="md:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-neutral-200 dark:border-neutral-700">
							<Link
								href="/"
								className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
									isActive('home')
										? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
										: 'text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800'
								}`}
								onClick={() => setIsOpen(false)}
							>
								Início
							</Link>
							<Link
								href="/#features"
								className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
									isActive('features')
										? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
										: 'text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800'
								}`}
								onClick={() => setIsOpen(false)}
							>
								Funcionalidades
							</Link>
							<Link
								href="/pricing"
								className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
									isActive('pricing')
										? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
										: 'text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800'
								}`}
								onClick={() => setIsOpen(false)}
							>
								Preços
							</Link>

							{/* Mobile Auth Links */}
							<div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
								{!loading && (
									<>
										{user ? (
											<Link
												href="/dashboard"
												className="block px-3 py-2 rounded-md text-base font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors"
												onClick={() => setIsOpen(false)}
											>
												Dashboard
											</Link>
										) : (
											<>
												<Link
													href="/login"
													className="block px-3 py-2 rounded-md text-base font-medium text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
													onClick={() => setIsOpen(false)}
												>
													Entrar
												</Link>
												<Link
													href="/signup"
													className="block px-3 py-2 rounded-md text-base font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors"
													onClick={() => setIsOpen(false)}
												>
													Começar Grátis
												</Link>
											</>
										)}
									</>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
