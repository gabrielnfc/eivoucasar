import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Logo from '@/components/ui/logo';

export default function VerifyEmailPage() {
	return (
		<div className="min-h-screen bg-mesh-gradient flex items-center justify-center px-4">
			<div className="w-full max-w-md">
				{/* Logo */}
				<div className="text-center mb-8">
					<Link
						href="/"
						className="inline-block hover:opacity-80 transition-opacity"
					>
						<Logo size="xl" />
					</Link>
				</div>

				<Card variant="glass" className="shadow-romantic">
					<CardHeader className="text-center">
						<div className="mx-auto mb-4 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
							<Mail className="h-6 w-6 text-primary-500" />
						</div>
						<CardTitle className="text-2xl font-bold text-secondary-900">
							Verifique seu email
						</CardTitle>
						<CardDescription>
							Enviamos um link de confirmação para seu email. Clique no link
							para ativar sua conta.
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-4">
						<div className="bg-neutral-50 p-4 rounded-lg">
							<h3 className="font-medium text-secondary-900 mb-2">
								Não recebeu o email?
							</h3>
							<ul className="text-sm text-secondary-600 space-y-1">
								<li>• Verifique sua caixa de spam</li>
								<li>• Confirme se o email está correto</li>
								<li>• Aguarde alguns minutos</li>
							</ul>
						</div>

						<div className="flex flex-col space-y-2">
							<Button asChild variant="primary">
								<Link href="/login">
									Ir para Login
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>

							<Button variant="ghost" asChild>
								<Link href="/signup">Voltar ao Cadastro</Link>
							</Button>
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
