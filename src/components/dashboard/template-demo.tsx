'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Eye, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TemplateDemo() {
  const [isPlaying, setIsPlaying] = useState(false);

  const features = [
    {
      icon: Sparkles,
      title: 'Templates Visuais',
      description: '6 templates pré-configurados: Clássico, Moderno, Romântico, Praia, Igreja e Surpreenda-me',
      status: 'Implementado'
    },
    {
      icon: Eye,
      title: 'Preview Interativo',
      description: 'Visualização navegável com edição inline de textos e placeholders clicáveis para imagens',
      status: 'Implementado'
    },
    {
      icon: Settings,
      title: 'Personalização',
      description: 'Variações de cores automáticas por categoria de template com preview em tempo real',
      status: 'Implementado'
    }
  ];

  const implementedFiles = [
    {
      file: 'src/lib/tenant/themes.ts',
      description: 'Sistema de temas com 6 templates completos'
    },
    {
      file: 'src/components/dashboard/template-gallery.tsx',
      description: 'Galeria de templates com seleção e preview'
    },
    {
      file: 'src/components/dashboard/template-preview.tsx',
      description: 'Modal de preview com edição inline interativa'
    },
    {
      file: 'src/components/dashboard/color-picker.tsx',
      description: 'Seletor de variações de cores por template'
    },
    {
      file: 'src/app/dashboard/settings/page.tsx',
      description: 'Página atualizada com sistema de abas Template + Settings'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Templates Implementado
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sistema completo de escolha de templates visuais para sites de casais com mockups interativos e edição inline.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            size="lg"
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
          >
            <Play className="w-5 h-5 mr-2" />
            {isPlaying ? 'Pausar Demo' : 'Ver Demonstração'}
          </Button>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                    ✅ {feature.status}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Technical Implementation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-purple-600" />
            Arquivos Implementados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {implementedFiles.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <code className="text-sm font-mono text-purple-700 bg-purple-50 px-2 py-1 rounded">
                    {item.file}
                  </code>
                  <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-900">Como Usar</CardTitle>
        </CardHeader>
        <CardContent className="text-purple-800">
          <ol className="space-y-2 list-decimal list-inside">
            <li>Execute a migração SQL para adicionar o campo <code>template_id</code> na tabela couples</li>
            <li>Acesse <code>/dashboard/settings</code> para ver o sistema implementado</li>
            <li>Clique na aba "Escolher Template" para ver a galeria de 6 templates</li>
            <li>Use o botão "👁️" para preview completo com edição inline</li>
            <li>Clique nos textos e imagens do preview para editá-los em tempo real</li>
            <li>Selecione um template e veja as variações de cores disponíveis</li>
          </ol>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-dashed border-2 border-gray-300">
        <CardHeader>
          <CardTitle className="text-gray-700">Próximos Passos Sugeridos</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600">
          <ul className="space-y-2">
            <li>• Implementar upload real de imagens nos placeholders</li>
            <li>• Adicionar mais variações de cores por template</li>
            <li>• Criar sistema de templates personalizados</li>
            <li>• Integrar com os sites públicos dos casais (/[slug]/)</li>
            <li>• Adicionar prévia mobile no sistema de templates</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 