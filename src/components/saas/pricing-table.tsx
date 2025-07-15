'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Crown, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

const plans = [
  {
    id: 'basic',
    name: 'Básico',
    description: 'Perfeito para casamentos menores',
    price: {
      monthly: 29.90,
      yearly: 299.90,
    },
    features: [
      'Até 50 convidados',
      'Site personalizado',
      'RSVP online',
      'Lista de presentes',
      'Gamificação básica',
      'Email notifications',
      'Suporte por email',
    ],
    icon: <Star className="h-6 w-6" />,
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Ideal para a maioria dos casamentos',
    price: {
      monthly: 49.90,
      yearly: 499.90,
    },
    features: [
      'Até 150 convidados',
      'Domínio customizado',
      'Todas as funcionalidades básicas',
      'Gamificação avançada',
      'Analytics detalhado',
      'Templates premium',
      'Suporte prioritário',
      'Backup automático',
    ],
    icon: <Crown className="h-6 w-6" />,
    popular: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Para casamentos grandes e exclusivos',
    price: {
      monthly: 79.90,
      yearly: 799.90,
    },
    features: [
      'Convidados ilimitados',
      'Múltiplos domínios',
      'Todas as funcionalidades premium',
      'White-label parcial',
      'API access',
      'Analytics completo',
      'Suporte dedicado',
      'Setup personalizado',
    ],
    icon: <Zap className="h-6 w-6" />,
    popular: false,
  },
]

export default function PricingTable() {
  const [isYearly, setIsYearly] = useState(false)
  // Pricing table não deve forçar verificação de auth - apenas verificar passivamente
  const { user } = useAuth()

  const handleSelectPlan = (planId: string) => {
    if (user) {
      // Usuário logado - ir direto para checkout
      window.location.href = `/checkout?plan=${planId}&billing=${isYearly ? 'yearly' : 'monthly'}`
			} else {
      // Usuário não logado - ir para signup com plano selecionado
      window.location.href = `/signup?plan=${planId}&billing=${isYearly ? 'yearly' : 'monthly'}`
		}
  }

	return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Escolha seu plano perfeito
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transforme seu casamento em uma celebração inesquecível com nossos planos flexíveis
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${!isYearly ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Mensal
            </span>
					<button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? 'bg-primary-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
						}`}
              />
					</button>
            <span className={`text-sm ${isYearly ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
						Anual
            </span>
            {isYearly && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                Economize 17%
						</span>
            )}
				</div>
			</div>

			{/* Plans Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''
							}`}
						>
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary-500 text-white text-center py-2 text-sm font-medium">
										Mais Popular
								</div>
							)}

              <div className={`p-8 ${plan.popular ? 'pt-16' : ''}`}>
							{/* Plan Header */}
							<div className="text-center mb-8">
                  <div className="flex justify-center mb-4 text-primary-500">
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  {/* Price */}
								<div className="mb-6">
									<div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        R$ {isYearly ? plan.price.yearly.toFixed(0) : plan.price.monthly.toFixed(2)}
										</span>
                      <span className="text-gray-500 ml-1">
                        /{isYearly ? 'ano' : 'mês'}
										</span>
									</div>
                    {isYearly && (
                      <p className="text-sm text-gray-500 mt-1">
                        R$ {(plan.price.yearly / 12).toFixed(2)}/mês
										</p>
									)}
								</div>

                  {/* CTA Button */}
								<Button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full ${
                      plan.popular
                        ? 'bg-primary-500 hover:bg-primary-600 text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
									}`}
								>
                    {user ? 'Assinar Agora' : 'Começar Grátis'}
								</Button>
							</div>

							{/* Features List */}
							<div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{feature}</span>
									</div>
								))}
							</div>
									</div>
            </motion.div>
          ))}
			</div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Não tem certeza qual plano escolher? Comece com o teste grátis de 14 dias.
				</p>
          <Button variant="outline" onClick={() => handleSelectPlan('basic')}>
            Teste Grátis por 14 Dias
          </Button>
        </div>
			</div>
		</div>
  )
}
 