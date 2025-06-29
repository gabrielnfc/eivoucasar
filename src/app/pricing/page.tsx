// ===============================================
// EICASEI - PRICING PAGE
// ===============================================

import PricingTable from '@/components/saas/pricing-table';
import Navbar from '@/components/layout/navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Preços - EiVouCasar!',
	description:
		'Escolha o plano perfeito para o seu casamento. Desde R$ 29,90/mês.',
};

export default function PricingPage() {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-900">
			{/* Navigation */}
			<Navbar currentPage="pricing" variant="transparent" />

			{/* Hero Section */}
			<div className="bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
						Preços Simples e Transparentes
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
						Escolha o plano perfeito para o seu casamento. Comece grátis por 7
						dias.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
							<svg
								className="w-5 h-5 text-emerald-500"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clipRule="evenodd"
								/>
							</svg>
							Sem taxas de setup
						</div>
						<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
							<svg
								className="w-5 h-5 text-emerald-500"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clipRule="evenodd"
								/>
							</svg>
							Cancele quando quiser
						</div>
						<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
							<svg
								className="w-5 h-5 text-emerald-500"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clipRule="evenodd"
								/>
							</svg>
							Suporte incluído
						</div>
					</div>
				</div>
			</div>

			{/* Pricing Table */}
			<div className="py-16 px-4 sm:px-6 lg:px-8">
				<PricingTable />
			</div>

			{/* FAQ Section */}
			<div className="bg-gray-50 dark:bg-gray-800 py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
						Perguntas Frequentes
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
								Posso trocar de plano depois?
							</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Sim! Você pode fazer upgrade ou downgrade do seu plano a
								qualquer momento. As mudanças são aplicadas imediatamente.
							</p>
						</div>

						<div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
								Como funciona o período grátis?
							</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Você tem 7 dias para testar todas as funcionalidades. Se
								cancelar antes, não será cobrado nada.
							</p>
						</div>

						<div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
								Posso usar meu próprio domínio?
							</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Sim! Nos planos Premium e Pro você pode conectar seu próprio
								domínio (ex: nosso-casamento.com) de forma gratuita.
							</p>
						</div>

						<div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
								Os convidados precisam pagar algo?
							</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Não! Seus convidados acessam o site gratuitamente. Eles só pagam
								se quiserem contribuir para o seu presente de casamento.
							</p>
						</div>

						<div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
								Como funciona o sistema de contribuições?
							</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Seus convidados contribuem via PIX de forma segura. O dinheiro
								cai direto na sua conta, sem intermediários.
							</p>
						</div>

						<div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
								Preciso de conhecimento técnico?
							</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Não! Nossa plataforma é super fácil de usar. Em poucos minutos
								você já tem seu site pronto e funcionando.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className="bg-rose-500 py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl font-bold text-white mb-4">
						Pronto para começar?
					</h2>
					<p className="text-xl text-rose-100 mb-8">
						Crie seu site de casamento em minutos e surpreenda seus convidados.
					</p>
					<a
						href="/signup"
						className="inline-block bg-white text-rose-500 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
					>
						Começar Grátis por 7 Dias
					</a>
				</div>
			</div>
		</div>
	);
}
