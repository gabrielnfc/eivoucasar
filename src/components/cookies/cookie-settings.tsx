'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cookie, Shield, BarChart3, Target, Palette, Save, RotateCcw } from 'lucide-react';
import { useCookies, type CookiePreferences } from '@/contexts/cookie-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CookieSettings() {
  const { preferences, updatePreferences } = useCookies();
  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(
    preferences || {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
  );
  const [saved, setSaved] = useState(false);

  const cookieTypes = [
    {
      key: 'essential' as keyof CookiePreferences,
      title: 'Cookies Essenciais',
      description: 'Necessários para o funcionamento básico do site, incluindo autenticação, carrinho de compras e funcionalidades de segurança.',
      icon: Shield,
      required: true,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      examples: ['Sessão de login', 'Tokens de segurança', 'Preferências de idioma'],
    },
    {
      key: 'functional' as keyof CookiePreferences,
      title: 'Cookies Funcionais',
      description: 'Melhoram a funcionalidade do site lembrando suas escolhas e preferências pessoais.',
      icon: Palette,
      required: false,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      examples: ['Tema escuro/claro', 'Tamanho da fonte', 'Configurações do editor'],
    },
    {
      key: 'analytics' as keyof CookiePreferences,
      title: 'Cookies de Analytics',
      description: 'Coletam informações sobre como você usa o site para nos ajudar a melhorar a experiência.',
      icon: BarChart3,
      required: false,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      examples: ['Google Analytics', 'Tempo na página', 'Páginas mais visitadas'],
    },
    {
      key: 'marketing' as keyof CookiePreferences,
      title: 'Cookies de Marketing',
      description: 'Personalizam anúncios e conteúdo baseado no seu comportamento e interesses.',
      icon: Target,
      required: false,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      examples: ['Anúncios personalizados', 'Remarketing', 'Redes sociais'],
    },
  ];

  const handleTogglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Não pode desativar essenciais
    
    setLocalPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    updatePreferences(localPreferences);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setLocalPreferences({
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
  };

  const hasChanges = preferences && JSON.stringify(localPreferences) !== JSON.stringify(preferences);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Cookie className="w-6 h-6 text-rose-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Configurações de Cookies
          </h2>
          <p className="text-gray-600 mt-1">
            Gerencie suas preferências de cookies conforme a LGPD
          </p>
        </div>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4"
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <Save className="w-3 h-3 text-white" />
            </div>
            <span className="text-green-800 font-medium">
              Preferências salvas com sucesso!
            </span>
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        {cookieTypes.map((type) => {
          const Icon = type.icon;
          const isEnabled = localPreferences[type.key];

          return (
            <Card key={type.key} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl ${type.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${type.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {type.title}
                        </h3>
                        {type.required && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                            Obrigatório
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {type.description}
                      </p>
                      
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Exemplos de uso:
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {type.examples.map((example, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 ml-6">
                    <button
                      onClick={() => handleTogglePreference(type.key)}
                      disabled={type.required}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${
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
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-lg ${
                          isEnabled ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      {isEnabled ? 'Ativado' : 'Desativado'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <Button
          onClick={handleReset}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Resetar para Padrão
        </Button>

        <div className="flex items-center gap-3">
          {hasChanges && (
            <span className="text-sm text-amber-600 font-medium">
              Você tem alterações não salvas
            </span>
          )}
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Salvar Configurações
          </Button>
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            🛡️ Sua Privacidade é Importante
          </h3>
          <div className="space-y-2 text-blue-800 text-sm">
            <p>
              • <strong>Controle total:</strong> Você pode alterar essas configurações a qualquer momento.
            </p>
            <p>
              • <strong>Transparência:</strong> Seguimos rigorosamente as normas da LGPD.
            </p>
            <p>
              • <strong>Segurança:</strong> Seus dados são protegidos e nunca compartilhados sem consentimento.
            </p>
            <p>
              • <strong>Direitos:</strong> Você pode solicitar acesso, correção ou exclusão dos seus dados.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 