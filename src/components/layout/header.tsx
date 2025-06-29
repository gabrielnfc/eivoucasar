'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';
import { cn } from '@/lib/utils';

interface HeaderProps {
	className?: string;
}

export default function Header({ className }: HeaderProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<header
			className={cn(
				'border-b border-neutral-200 bg-white/80 backdrop-blur-sm',
				className
			)}
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
							href="#features"
							className="text-secondary-600 hover:text-secondary-900 transition-colors"
						>
							Funcionalidades
						</Link>
						<Link
							href="#pricing"
							className="text-secondary-600 hover:text-secondary-900 transition-colors"
						>
							Preços
						</Link>
						<Link
							href="/login"
							className="text-secondary-600 hover:text-secondary-900 transition-colors"
						>
							Entrar
						</Link>
						<Button asChild variant="primary">
							<Link href="/signup">Começar Grátis</Link>
						</Button>
					</nav>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden rounded-lg p-2 text-secondary-600 hover:bg-neutral-100 transition-colors"
						onClick={toggleMobileMenu}
						aria-label="Toggle menu"
					>
						{isMobileMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</button>
				</div>

				{/* Mobile Navigation */}
				{isMobileMenuOpen && (
					<div className="md:hidden border-t border-neutral-200 py-4">
						<nav className="flex flex-col space-y-4">
							<Link
								href="#features"
								className="text-secondary-600 hover:text-secondary-900 transition-colors"
								onClick={toggleMobileMenu}
							>
								Funcionalidades
							</Link>
							<Link
								href="#pricing"
								className="text-secondary-600 hover:text-secondary-900 transition-colors"
								onClick={toggleMobileMenu}
							>
								Preços
							</Link>
							<Link
								href="/login"
								className="text-secondary-600 hover:text-secondary-900 transition-colors"
								onClick={toggleMobileMenu}
							>
								Entrar
							</Link>
							<Button asChild variant="primary" className="w-fit">
								<Link href="/signup" onClick={toggleMobileMenu}>
									Começar Grátis
								</Link>
							</Button>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
