import Link from 'next/link';
import Logo from '@/components/ui/logo';
import { cn } from '@/lib/utils';

interface FooterProps {
	className?: string;
}

export default function Footer({ className }: FooterProps) {
	return (
		<footer
			className={cn(
				'border-t border-neutral-200 bg-white px-4 py-12 sm:px-6 lg:px-8',
				className
			)}
		>
			<div className="mx-auto max-w-7xl">
				<div className="flex flex-col md:flex-row items-center justify-between">
					<div className="flex items-center space-x-2">
						<Logo size="sm" />
					</div>

					<div className="mt-4 md:mt-0 flex items-center space-x-6 text-sm text-secondary-600">
						<Link
							href="/privacy"
							className="hover:text-secondary-900 transition-colors"
						>
							Privacidade
						</Link>
						<Link
							href="/terms"
							className="hover:text-secondary-900 transition-colors"
						>
							Termos
						</Link>
						<Link
							href="/contact"
							className="hover:text-secondary-900 transition-colors"
						>
							Contato
						</Link>
					</div>
				</div>

				<div className="mt-8 border-t border-neutral-200 pt-8 text-center text-sm text-secondary-500">
					<p>
						© 2025 EiVouCasar! Transformando casamentos em experiências
						inesquecíveis.
					</p>
				</div>
			</div>
		</footer>
	);
}
