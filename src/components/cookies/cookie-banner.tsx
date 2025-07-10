'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, Check, X, Shield, BarChart3, Target, Palette } from 'lucide-react';
import { useCookies, type CookiePreferences } from '@/contexts/cookie-context';
import { Button } from '@/components/ui/button';

export default function CookieBanner() {
  const { showBanner, acceptAll, acceptSelected, rejectOptional } = useCookies();
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  if (!showBanner) return null;

  const cookieTypes = [
    {
      key: 'essential' as keyof CookiePreferences,
      title: 'Essenciais',
      description: 'Necessários para o funcionamento básico do site (login, carrinho, etc.)',
      icon: Shield,
      required: true,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      key: 'functional' as keyof CookiePreferences,
      title: 'Funcionais',
      description: 'Lembram suas preferências (tema, idioma, configurações)',
      icon: Palette,
      required: false,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      key: 'analytics' as keyof CookiePreferences,
      title: 'Analytics',
      description: 'Nos ajudam a entender como você usa o site para melhorá-lo',
      icon: BarChart3,
      required: false,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      key: 'marketing' as keyof CookiePreferences,
      title: 'Marketing',
      description: 'Personalizam anúncios e conteúdo baseado no seu interesse',
      icon: Target,
      required: false,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const handleTogglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Não pode desativar essenciais
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAcceptSelected = () => {
    acceptSelected(preferences);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            {!showDetails ? (
              // Banner Simples
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-rose-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      🍪 Este site usa cookies
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Usamos cookies para melhorar sua experiência, lembrar suas preferências e entender como você navega. 
                      Você pode escolher quais tipos aceitar.{' '}
                      <a 
                        href="/privacy" 
                        className="text-rose-600 hover:text-rose-700 underline"
                        target="_blank"
                      >
                        Saiba mais
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                  <Button
                    onClick={() => setShowDetails(true)}
                    variant="outline"
                    size="sm"
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Personalizar
                  </Button>
                  <Button
                    onClick={rejectOptional}
                    variant="outline"
                    size="sm"
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Apenas Essenciais
                  </Button>
                  <Button
                    onClick={acceptAll}
                    className="bg-rose-600 hover:bg-rose-700 text-white"
                    size="sm"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Aceitar Todos
                  </Button>
                </div>
              </div>
            ) : (
              // Painel Detalhado
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Cookie className="w-6 h-6 text-rose-600" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      Configurações de Cookies
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <p className="text-gray-600 text-sm">
                  Escolha quais tipos de cookies você permite. Cookies essenciais são obrigatórios para o funcionamento do site.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cookieTypes.map((type) => {
                    const Icon = type.icon;
                    const isEnabled = preferences[type.key];

                    return (
                      <div
                        key={type.key}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          isEnabled 
                            ? 'border-rose-200 bg-rose-50' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`w-10 h-10 rounded-lg ${type.bgColor} flex items-center justify-center`}>
                              <Icon className={`w-5 h-5 ${type.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-gray-900">
                                  {type.title}
                                </h4>
                                {type.required && (
                                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                    Obrigatório
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {type.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex-shrink-0 ml-3">
                            <button
                              onClick={() => handleTogglePreference(type.key)}
                              disabled={type.required}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${
                                isEnabled 
                                  ? 'bg-rose-600' 
                                  : 'bg-gray-200'
                              } ${
                                type.required 
                                  ? 'opacity-75 cursor-not-allowed' 
                                  : 'cursor-pointer'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  isEnabled ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                  <Button
                    onClick={rejectOptional}
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Apenas Essenciais
                  </Button>
                  <Button
                    onClick={handleAcceptSelected}
                    className="bg-rose-600 hover:bg-rose-700 text-white"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Salvar Preferências
                  </Button>
                  <Button
                    onClick={acceptAll}
                    variant="outline"
                    className="border-rose-300 text-rose-600 hover:bg-rose-50"
                  >
                    Aceitar Todos
                  </Button>
                </div>

                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                  <p className="mb-1">
                    <strong>Sobre seus dados:</strong> Respeitamos sua privacidade conforme a LGPD.
                  </p>
                  <p>
                    Você pode alterar essas configurações a qualquer momento nas configurações do site.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 