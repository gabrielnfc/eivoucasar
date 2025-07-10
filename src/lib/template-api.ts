import { WeddingTemplate } from '@/types/template';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class TemplateApiClient {
  private baseUrl = '/api/templates';

  async getTemplate(coupleId: string): Promise<WeddingTemplate | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${coupleId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result: ApiResponse<WeddingTemplate> = await response.json();

      if (!result.success) {
        console.error('Erro ao buscar template:', result.error);
        return null;
      }

      return result.data || null;
    } catch (error) {
      console.error('Erro na requisição:', error);
      return null;
    }
  }

  async updateTemplateField(
    coupleId: string, 
    sectionId: string, 
    fieldId: string, 
    value: string
  ): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${coupleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sectionId,
          fieldId,
          value
        }),
      });

      const result: ApiResponse = await response.json();

      if (!result.success) {
        console.error('Erro ao atualizar campo:', result.error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro na requisição:', error);
      return false;
    }
  }

  async saveTemplate(coupleId: string, template: WeddingTemplate): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${coupleId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(template),
      });

      const result: ApiResponse = await response.json();

      if (!result.success) {
        console.error('Erro ao salvar template:', result.error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro na requisição:', error);
      return false;
    }
  }

  // Batch update para múltiplos campos
  async updateMultipleFields(
    coupleId: string, 
    updates: Array<{
      sectionId: string;
      fieldId: string;
      value: string;
    }>
  ): Promise<boolean> {
    try {
      const promises = updates.map(update => 
        this.updateTemplateField(coupleId, update.sectionId, update.fieldId, update.value)
      );

      const results = await Promise.all(promises);
      return results.every(result => result);
    } catch (error) {
      console.error('Erro ao atualizar múltiplos campos:', error);
      return false;
    }
  }

  // Debounced update para evitar muitas requisições
  private updateTimeouts = new Map<string, NodeJS.Timeout>();

  debouncedUpdateField(
    coupleId: string,
    sectionId: string,
    fieldId: string,
    value: string,
    delay = 1000
  ): void {
    const key = `${coupleId}-${sectionId}-${fieldId}`;
    
    // Limpar timeout anterior se existir
    if (this.updateTimeouts.has(key)) {
      clearTimeout(this.updateTimeouts.get(key)!);
    }

    // Criar novo timeout
    const timeout = setTimeout(() => {
      this.updateTemplateField(coupleId, sectionId, fieldId, value);
      this.updateTimeouts.delete(key);
    }, delay);

    this.updateTimeouts.set(key, timeout);
  }
}

// Instância singleton
export const templateApi = new TemplateApiClient();

// Hook para usar em React components
export function useTemplateApi() {
  return templateApi;
}

// Utilidades de validação
export function validateTemplate(template: WeddingTemplate): { 
  isValid: boolean; 
  errors: string[] 
} {
  const errors: string[] = [];

  if (!template.id) {
    errors.push('Template deve ter um ID');
  }

  if (!template.sections || template.sections.length === 0) {
    errors.push('Template deve ter pelo menos uma seção');
  }

  if (!template.colors || !template.colors.primary) {
    errors.push('Template deve ter cores definidas');
  }

  if (!template.fonts || !template.fonts.body) {
    errors.push('Template deve ter fontes definidas');
  }

  // Validar seções obrigatórias
  const requiredSections = template.sections.filter(s => s.required);
  const enabledRequiredSections = requiredSections.filter(s => s.enabled);
  
  if (enabledRequiredSections.length !== requiredSections.length) {
    errors.push('Todas as seções obrigatórias devem estar habilitadas');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Utilidade para criar template padrão
export function createDefaultTemplate(coupleId: string): WeddingTemplate {
  return {
    id: `template-${coupleId}`,
    name: 'Novo Template',
    description: 'Template personalizado para casamento',
    category: 'Custom',
    preview: '/api/placeholder/800/600',
    colors: {
      primary: '#be185d',
      secondary: '#ec4899',
      accent: '#f97316',
      background: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
      script: 'Inter, sans-serif'
    },
    sections: [],
    globalSettings: {
      showNavigation: true,
      navigationStyle: 'sticky',
      showFooter: true,
      enableAnimations: true,
      musicAutoplay: false,
      theme: 'light'
    },
    romantic: {
      animationStyle: 'elegant',
      intensity: 'moderate'
    },
    seo: {
      title: { id: 'seoTitle', type: 'text', value: 'Nosso Casamento' },
      description: { id: 'seoDescription', type: 'textarea', value: 'Celebre conosco este momento especial' },
      image: { id: 'seoImage', type: 'image', value: '/api/placeholder/1200/630' },
      keywords: { id: 'seoKeywords', type: 'text', value: 'casamento, wedding' }
    }
  };
} 