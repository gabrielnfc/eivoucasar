'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WeddingTemplate, TemplateSection } from '@/types/template';
import { createRealTemplate } from '@/lib/create-real-template';
import { 
  HeroSection,
  InvitationSection,
  CountdownSection, 
  StorySection,
  GroomsmenSection,
  GamificationSection,
  RSVPSection,
  VenueSection,
  DetailsSection,
  GallerySection,
  TestimonialsSection,
  FooterSection
} from './sections/temporary-sections';
import Loading from '@/components/ui/loading';

interface CoupleData {
  id: string;
  slug: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingDateTime: string;
  ceremonyVenue?: string;
  receptionVenue?: string;
  welcomeMessage?: string;
  story?: string;
  coverPhotoUrl?: string;
  themeColors?: any;
  email: string;
  emailSecondary?: string;
  city: string;
  state: string;
  country?: string;
  bridePhone?: string;
  groomPhone?: string;
  isActive: boolean;
  isPublished: boolean;
}

interface TemplateRendererProps {
  template?: WeddingTemplate;
  slug?: string;
  isEditable?: boolean;
  coupleId?: string;
  coupleData?: any; // Dados do casal já carregados (evita nova busca na API)
  onSectionUpdate?: (sectionId: string, fieldId: string, value: string) => void;
}

// Mapeamento de tipos de seções para componentes
const SECTION_COMPONENTS = {
  hero: HeroSection,
  invitation: InvitationSection,
  countdown: CountdownSection,
  story: StorySection,
  groomsmen: GroomsmenSection,
  gamification: GamificationSection,
  rsvp: RSVPSection,
  venue: VenueSection,
  details: DetailsSection,
  gallery: GallerySection,
  testimonials: TestimonialsSection,
  footer: FooterSection,
} as const;

interface SectionWrapperProps {
  section: TemplateSection;
  template: WeddingTemplate;
  isEditable: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
  children: React.ReactNode;
}

function SectionWrapper({ section, template, isEditable, onFieldUpdate, children }: SectionWrapperProps) {
  return (
    <motion.section
      id={section.id}
      className="relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      style={{
        order: section.order,
        display: section.enabled ? 'block' : 'none'
      }}
    >
      {children}
    </motion.section>
  );
}

export function TemplateRenderer({ 
  template: initialTemplate, 
  slug,
  isEditable = false, 
  coupleId,
  coupleData,
  onSectionUpdate 
}: TemplateRendererProps) {
  const [template, setTemplate] = useState<WeddingTemplate | null>(initialTemplate || null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar dados do casal e gerar template real
  const fetchCoupleData = async () => {
    // Priorizar coupleId sobre slug para evitar problemas de encoding
    if (!coupleId && !slug) {
      console.log('❌ TemplateRenderer: Nem coupleId nem slug fornecidos');
      setError('Identificador do casal não fornecido');
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      
      let apiUrl: string;
      if (coupleId) {
        console.log('🔍 TemplateRenderer: Buscando dados por user_id:', coupleId);
        // Buscar por user_id em vez de slug (evita problemas de encoding)
        apiUrl = `/api/couples?user_id=${coupleId}`;
      } else {
        console.log('🔍 TemplateRenderer: Buscando dados por slug:', slug);
        apiUrl = `/api/public/couples/${slug}`;
      }
      
      const response = await fetch(apiUrl);
      console.log('📡 TemplateRenderer: Status da resposta:', response.status);
      
      const result = await response.json();
      console.log('📋 TemplateRenderer: Resposta da API:', result);
      
      if (!response.ok) {
        console.error('❌ TemplateRenderer: Resposta não OK:', response.status, result);
        throw new Error(`Erro ${response.status}: ${result.error || 'Casal não encontrado'}`);
      }
      
      if (result.success) {
        console.log('✅ TemplateRenderer: Dados do casal carregados:', result.data.brideName, '&', result.data.groomName);
        const realTemplate = createRealTemplate(result.data);
        setTemplate(realTemplate);
      } else {
        console.error('❌ TemplateRenderer: API retornou erro:', result.error);
        throw new Error(result.error || 'Erro ao buscar dados do casal');
      }
    } catch (err) {
      console.error('💥 TemplateRenderer: Erro ao buscar dados:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  // Ordenar seções por ordem configurada
  const sortedSections = template ? [...template.sections].sort((a, b) => a.order - b.order) : [];

  // Mapear campos de seção para campos do formulário - MAPEAMENTO COMPLETO
  const mapSectionFieldToFormField = (sectionId: string, fieldId: string): string | null => {
    const mappings: Record<string, Record<string, string>> = {
      'hero': {
        'brideName': 'bride_name',
        'groomName': 'groom_name',
        'weddingDate': 'wedding_date',
        'weddingTime': 'wedding_time',
        'location': 'wedding_location',
        'subtitle': 'invitation_message',
        'backgroundImage': 'hero_background_image'
      },
      'invitation': {
        'title': 'invitation_title',
        'message': 'invitation_message',
        'formalMessage': 'formal_invitation_message',
        'signature': 'invitation_signature',
        'invitationImage': 'cover_photo_url'
      },
      'countdown': {
        'title': 'countdown_title',
        'message': 'countdown_message',
        'targetDate': 'wedding_date'
      },
      'story': {
        'title': 'story_title',
        'story': 'couple_story',
        'content': 'couple_story',
        'image': 'couple_photo'
      },
      'groomsmen': {
        'title': 'groomsmen_title',
        'subtitle': 'groomsmen_subtitle'
      },
      'venue': {
        'title': 'venue_title',
        'ceremonyTitle': 'ceremony_venue',
        'ceremonyAddress': 'wedding_location',
        'ceremonyTime': 'ceremony_time',
        'ceremonyImage': 'ceremony_image',
        'receptionTitle': 'reception_venue',
        'receptionAddress': 'wedding_address',
        'receptionTime': 'reception_time',
        'receptionImage': 'reception_image',
        'directions': 'directions',
        'parkingInfo': 'parking_info'
      },
      'rsvp': {
        'title': 'rsvp_title',
        'subtitle': 'rsvp_subtitle',
        'deadline': 'rsvp_deadline',
        'message': 'rsvp_message',
        'confirmationMessage': 'rsvp_confirmation_message'
      },
      'gamification': {
        'title': 'gamification_title',
        'subtitle': 'gamification_subtitle',
        'pixKey': 'pix_key'
      },
      'details': {
        'title': 'details_title',
        'dressCode': 'dress_code',
        'dressCodeDescription': 'dress_code_description',
        'importantNotes': 'important_notes'
      },
      'gallery': {
        'title': 'gallery_title',
        'subtitle': 'gallery_subtitle'
      },
      'testimonials': {
        'title': 'testimonials_title',
        'subtitle': 'testimonials_subtitle',
        'message': 'testimonials_message',
        'autoApprove': 'testimonials_auto_approve'
      },
      'footer': {
        'thankYouMessage': 'footer_thank_you_message',
        'coupleSignature': 'footer_signature',
        'weddingDate': 'wedding_date',
        'weddingLocation': 'wedding_location',
        'contactEmail': 'footer_contact_email',
        'contactPhone': 'footer_contact_phone'
      }
    };

    return mappings[sectionId]?.[fieldId] || null;
  };

  // Handler para atualização de campos
  const handleFieldUpdate = (sectionId: string) => (fieldId: string, value: string) => {
    if (onSectionUpdate) {
      onSectionUpdate(sectionId, fieldId, value);
    }
    
    // ⚠️ IMPORTANTE: Só disparar evento se estivermos no modo editor
    // Previne loops quando mudanças vêm das configurações
    if (isEditable) {
      // Notificar mudanças para o formulário de configurações
      const mappedFieldId = mapSectionFieldToFormField(sectionId, fieldId);
      if (mappedFieldId) {
        console.log('🔄 Template→Config: Disparando evento para', mappedFieldId, '=', value);
        window.dispatchEvent(new CustomEvent('templateFieldUpdate', {
          detail: { fieldId: mappedFieldId, value }
        }));
      }
    }
    
    // 🚫 REMOVIDO: Saving direto da API - deixar apenas o UnifiedSettings salvar
    // Evita conflitos e duplicação de saves
  };

  useEffect(() => {
    if (initialTemplate) {
      // Se template foi fornecido, usar diretamente
      setTemplate(initialTemplate);
      setIsLoading(false);
    } else if (coupleData) {
      // Se dados do casal foram fornecidos, usar diretamente
      console.log('🎯 TemplateRenderer: Usando dados do casal fornecidos:', coupleData.bride_name, '&', coupleData.groom_name);
      console.log('🖼️ TemplateRenderer: hero_background_image:', coupleData.hero_background_image);
      console.log('🖼️ TemplateRenderer: cover_photo_url:', coupleData.cover_photo_url);
      console.log('🎨 TemplateRenderer: theme_color:', coupleData.theme_color);
      
      // Transformar dados para formato consistente
      const transformedData = {
        id: coupleData.id,
        slug: coupleData.slug,
        brideName: coupleData.bride_name,
        groomName: coupleData.groom_name,
        weddingDate: coupleData.wedding_date,
        weddingDateTime: coupleData.wedding_datetime,
        ceremonyVenue: coupleData.ceremony_venue,
        receptionVenue: coupleData.reception_venue,
        welcomeMessage: coupleData.welcome_message,
        story: coupleData.story,
        coverPhotoUrl: coupleData.cover_photo_url,
        themeColors: coupleData.theme_colors,
        email: coupleData.email,
        emailSecondary: coupleData.email_secondary,
        city: coupleData.city,
        state: coupleData.state,
        country: coupleData.country,
        bridePhone: coupleData.bride_phone,
        groomPhone: coupleData.groom_phone,
        isActive: coupleData.is_active,
        isPublished: coupleData.is_published,
        // Adicionar campos esperados pelo CoupleData
        bride_name: coupleData.bride_name,
        groom_name: coupleData.groom_name,
        wedding_date: coupleData.wedding_date,
        wedding_time: coupleData.wedding_time,
        wedding_location: coupleData.wedding_location,
        wedding_address: coupleData.wedding_address,
        hero_background_image: coupleData.hero_background_image,
        couple_photo: coupleData.couple_photo,
        bride_photo: coupleData.bride_photo,
        groom_photo: coupleData.groom_photo,
        theme_color: coupleData.theme_color,
        is_active: coupleData.is_active,
        is_published: coupleData.is_published,
        
        // 💌 CAMPOS DE INVITATION - ESSENCIAIS PARA SINCRONIZAÇÃO
        invitation_title: coupleData.invitation_title,
        invitation_message: coupleData.invitation_message,
        formal_invitation_message: coupleData.formal_invitation_message,
        invitation_signature: coupleData.invitation_signature,
   
      
      // ⏰ CAMPOS DE COUNTDOWN PARA SINCRONIZAÇÃO
      countdown_title: coupleData.countdown_title,
      countdown_message: coupleData.countdown_message
      };
      
      const realTemplate = createRealTemplate(transformedData);
      setTemplate(realTemplate);
      setIsLoading(false);
    } else if (coupleId || slug) {
      // Se coupleId ou slug foi fornecido, buscar dados do casal via API
      fetchCoupleData();
    } else {
      setError('Nenhum template, coupleData, coupleId ou slug fornecido');
      setIsLoading(false);
    }
  }, [coupleId, slug, coupleData, initialTemplate]);

  if (isLoading) {
    return null; // Loading gerenciado pela página pai
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar template</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          
          {/* Informações de debug */}
          <div className="text-left bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-semibold text-gray-800 mb-2">🐛 Debug Info:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li><strong>Couple Data:</strong> {coupleData ? `${coupleData.bride_name} & ${coupleData.groom_name}` : 'Não fornecido'}</li>
              <li><strong>Couple ID:</strong> {coupleId || 'Não fornecido'}</li>
              <li><strong>Slug usado:</strong> {slug || 'Não fornecido'}</li>
              <li><strong>Template inicial:</strong> {initialTemplate ? 'Fornecido' : 'Não fornecido'}</li>
              <li><strong>Método:</strong> {coupleData ? 'Dados diretos' : coupleId ? 'API por user_id' : 'API por slug'}</li>
              <li><strong>URL da API:</strong> {coupleData ? 'N/A (dados diretos)' : coupleId ? `/api/couples?user_id=${coupleId}` : `/api/public/couples/${slug}`}</li>
            </ul>
          </div>
          
          <div className="mt-6 space-x-4">
            <button
              onClick={() => {
                setError(null);
                if (slug) fetchCoupleData();
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Tentar Novamente
            </button>
            <a
              href="/api/couples/debug"
              target="_blank"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md inline-block"
            >
              Ver Debug da API
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Template não encontrado</h2>
          <p className="text-gray-600">Nenhum template disponível para renderizar</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`template-renderer ${isEditable ? 'editor-mode' : ''}`}>
      {/* Template Styles - Usando CSS custom properties do tema */}
      <style jsx global>{`
        .template-renderer {
          /* Fallback para cores do template, mas prioridade para tema */
          --template-primary: var(--theme-primary, ${template.colors.primary});
          --template-secondary: var(--theme-secondary, ${template.colors.secondary});
          --template-accent: var(--theme-accent, ${template.colors.accent});
          --template-background: var(--theme-background, ${template.colors.background});
          --template-text: var(--theme-text, ${template.colors.text});
          --template-text-secondary: var(--theme-text-secondary, ${template.colors.textSecondary});
          --template-success: ${template.colors.success};
          --template-warning: ${template.colors.warning};
          --template-error: ${template.colors.error};
          
          /* Fontes do tema */
          --template-font-primary: var(--theme-font-primary, ${template.fonts.body});
          --template-font-secondary: var(--theme-font-secondary, ${template.fonts.heading});
          --template-font-accent: var(--theme-font-accent, ${template.fonts.script});
          
          /* Aplicar propriedades */
          font-family: var(--template-font-primary);
          color: var(--template-text);
          background-color: var(--template-background);
        }
        
        .template-renderer h1,
        .template-renderer h2,
        .template-renderer h3,
        .template-renderer h4,
        .template-renderer h5,
        .template-renderer h6 {
          font-family: var(--template-font-secondary);
        }
        
        .template-script {
          font-family: var(--template-font-accent);
        }
        
        /* Editor mode styles */
        .editor-mode {
          height: 100%;
          overflow-y: auto;
        }
        
        .editor-mode .template-content {
          min-height: 100vh;
        }
      `}</style>

      {/* SEO Meta (apenas no modo público) */}
      {!isEditable && (
        <>
          <title>{template.seo.title.value}</title>
          <meta name="description" content={template.seo.description.value} />
          <meta property="og:title" content={template.seo.title.value} />
          <meta property="og:description" content={template.seo.description.value} />
          <meta property="og:image" content={template.seo.image.value} />
          <meta name="keywords" content={template.seo.keywords.value} />
        </>
      )}

      {/* Navigation (se habilitada) */}
      {template.globalSettings.showNavigation && (
        <nav 
          className={`
            ${template.globalSettings.navigationStyle === 'fixed' ? 'fixed top-0 left-0 right-0 z-50' : ''}
            ${template.globalSettings.navigationStyle === 'sticky' ? 'sticky top-0 z-50' : ''}
            bg-white/95 backdrop-blur-sm border-b shadow-sm
          `}
          style={{ borderColor: `${template.colors.primary}20` }}
        >
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                {sortedSections
                  .filter(section => section.enabled && section.type !== 'footer')
                  .slice(0, 6) // Limitar a 6 itens na navegação
                  .map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="text-sm font-medium transition-colors hover:opacity-80"
                      style={{ color: template.colors.text }}
                    >
                      {section.name}
                    </a>
                  ))}
              </div>
              
              {/* Logo/Nome do casal - removido conforme solicitado */}
            </div>
          </div>
        </nav>
      )}

      {/* Editor toolbar para modo edição */}
      {isEditable && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex items-center gap-2">
            <div className="flex items-center gap-2 px-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Auto-save ativo</span>
            </div>
          </div>
        </div>
      )}

      {/* Renderizar Seções */}
      <main className="template-content">
        {sortedSections.map((section) => {
          const SectionComponent = SECTION_COMPONENTS[section.type as keyof typeof SECTION_COMPONENTS];
          
          if (!SectionComponent) {
            console.warn(`Componente não encontrado para seção tipo: ${section.type}`);
            return null;
          }

          return (
            <SectionWrapper
              key={section.id}
              section={section}
              template={template}
              isEditable={isEditable}
              onFieldUpdate={handleFieldUpdate(section.id)}
            >
              <SectionComponent
                section={section}
                template={template}
                isEditable={isEditable}
                onFieldUpdate={handleFieldUpdate(section.id)}
              />
            </SectionWrapper>
          );
        })}
      </main>

      {/* Floating Elements (apenas no modo público) */}
      {!isEditable && (
        <>
          {/* Música de fundo (se habilitada) */}
          {template.globalSettings.musicAutoplay && (
            <div className="fixed bottom-4 left-4 z-50">
              <button
                className="w-12 h-12 rounded-full text-white shadow-lg flex items-center justify-center"
                style={{ backgroundColor: template.colors.primary }}
                onClick={() => {
                  // Implementar controle de música
                  console.log('Toggle music');
                }}
              >
                🎵
              </button>
            </div>
          )}

          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 h-1 z-50"
            style={{ 
              backgroundColor: template.colors.primary,
              transformOrigin: "0%"
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}

      {/* Animações de fundo (se habilitadas) */}
      {template.globalSettings.enableAnimations && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Corações flutuantes baseado na intensidade */}
          {template.romantic.intensity !== 'minimal' && (
            <div className="absolute inset-0">
              {[...Array(template.romantic.intensity === 'intense' ? 20 : 10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute opacity-10"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    color: template.colors.primary,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 5,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                >
                  ❤️
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 