import { WeddingTemplate } from '@/types/template';

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

export function createRealTemplate(coupleData: CoupleData): WeddingTemplate {
  const coupleNames = `${coupleData.brideName} & ${coupleData.groomName}`;
  const weddingDateFormatted = new Date(coupleData.weddingDateTime).toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const locationText = `${coupleData.city}, ${coupleData.state}`;
  const themeColors = coupleData.themeColors || {
    primary: '#be185d',
    secondary: '#ec4899',
    accent: '#f97316',
    background: '#fef2f2',
    text: '#1f2937'
  };

  return {
    id: `template-${coupleData.id}`,
    name: `Template de ${coupleNames}`,
    description: `Template personalizado para o casamento de ${coupleNames}`,
    category: 'Custom',
    preview: coupleData.coverPhotoUrl || '/api/placeholder/800/600',
    colors: {
      primary: themeColors.primary || '#be185d',
      secondary: themeColors.secondary || '#ec4899',
      accent: themeColors.accent || '#f97316',
      background: themeColors.background || '#fef2f2',
      text: themeColors.text || '#1f2937',
      textSecondary: '#6b7280',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    fonts: {
      heading: 'Playfair Display, serif',
      body: 'Inter, sans-serif',
      script: 'Dancing Script, cursive'
    },
    sections: [
      {
        id: 'invitation',
        name: 'Convite',
        type: 'invitation',
        component: 'InvitationSection',
        editable: true,
        required: true,
        order: 1,
        enabled: true,
        layout: {
          type: 'container',
          background: 'transparent',
          padding: 'large',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#ffffff',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: 'Você está convidado!' },
          message: { 
            id: 'message', 
            type: 'textarea', 
            value: coupleData.welcomeMessage || 'Com grande alegria, convidamos você para celebrar conosco este momento único e especial.' 
          },
          formalMessage: { 
            id: 'formalMessage', 
            type: 'textarea', 
            value: `${coupleData.brideName} & ${coupleData.groomName} têm a honra de convidar para sua cerimônia de casamento.` 
          },
          signature: { id: 'signature', type: 'text', value: `Com amor, ${coupleNames}` },
          invitationImage: { id: 'invitationImage', type: 'image', value: coupleData.coverPhotoUrl || '/api/placeholder/600/400' }
        },
        settings: {
          showTitle: true,
          showSubtitle: true,
          showDivider: true,
          animation: 'fade'
        }
      },
      {
        id: 'countdown',
        name: 'Countdown',
        type: 'countdown',
        component: 'CountdownSection',
        editable: true,
        required: false,
        order: 2,
        enabled: true,
        layout: {
          type: 'container',
          background: 'colored',
          padding: 'large',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#fef2f2',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: 'Faltam poucos dias!' },
          targetDate: { id: 'targetDate', type: 'date', value: coupleData.weddingDateTime },
          message: { id: 'message', type: 'text', value: 'Contagem regressiva para o nosso grande dia' },
          completedMessage: { id: 'completedMessage', type: 'text', value: 'Hoje é o grande dia! 🎉' },
          showDays: true,
          showHours: true,
          showMinutes: true,
          showSeconds: true
        },
        settings: {
          showTitle: true,
          animation: 'slide'
        }
      },
      {
        id: 'story',
        name: 'Nossa História',
        type: 'story',
        component: 'StorySection',
        editable: true,
        required: false,
        order: 3,
        enabled: true,
        layout: {
          type: 'container',
          background: 'transparent',
          padding: 'large',
          alignment: 'center',
          spacing: 'loose'
        },
        style: {
          backgroundColor: '#ffffff',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: 'Nossa História de Amor' },
          story: { 
            id: 'story', 
            type: 'textarea', 
            value: coupleData.story || 'Nossa história de amor começou de forma especial e única...' 
          },
          coupleImage: { id: 'coupleImage', type: 'image', value: coupleData.coverPhotoUrl || '/api/placeholder/600/400' },
          timeline: [
            {
              date: { id: 'date1', type: 'date', value: '2020-03-15' },
              title: { id: 'title1', type: 'text', value: 'Primeiro Encontro' },
              description: { id: 'desc1', type: 'textarea', value: 'Nos conhecemos e foi amor à primeira vista.' },
              image: { id: 'img1', type: 'image', value: '/api/placeholder/300/200' }
            },
            {
              date: { id: 'date2', type: 'date', value: '2023-12-24' },
              title: { id: 'title2', type: 'text', value: 'Pedido de Casamento' },
              description: { id: 'desc2', type: 'textarea', value: 'Uma noite mágica que mudou nossas vidas para sempre.' },
              image: { id: 'img2', type: 'image', value: '/api/placeholder/300/200' }
            }
          ]
        },
        settings: {
          showTitle: true,
          animation: 'fade'
        }
      },
      {
        id: 'groomsmen',
        name: 'Padrinhos',
        type: 'groomsmen',
        component: 'GroomsmenSection',
        editable: true,
        required: false,
        order: 4,
        enabled: true,
        layout: {
          type: 'container',
          background: 'transparent',
          padding: 'large',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#fef2f2',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: 'Nossos Queridos' },
          subtitle: { id: 'subtitle', type: 'text', value: 'Pessoas especiais que estarão ao nosso lado' },
          groomsmen: [
            {
              name: { id: 'name1', type: 'text', value: 'Padrinho do Noivo' },
              role: { id: 'role1', type: 'text', value: 'Padrinho' },
              image: { id: 'img1', type: 'image', value: '/api/placeholder/300/300' },
              description: { id: 'desc1', type: 'textarea', value: 'Uma pessoa muito especial' }
            }
          ],
          bridesmaids: [
            {
              name: { id: 'name1', type: 'text', value: 'Madrinha da Noiva' },
              role: { id: 'role1', type: 'text', value: 'Madrinha' },
              image: { id: 'img1', type: 'image', value: '/api/placeholder/300/300' },
              description: { id: 'desc1', type: 'textarea', value: 'Uma pessoa muito especial' }
            }
          ]
        },
        settings: {
          showTitle: true,
          showSubtitle: true,
          animation: 'slide'
        }
      },
      {
        id: 'gamification',
        name: 'Contribuições',
        type: 'gamification',
        component: 'GamificationSection',
        editable: true,
        required: false,
        order: 5,
        enabled: true,
        layout: {
          type: 'container',
          background: 'transparent',
          padding: 'large',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#ffffff',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: 'Ajude-nos na Lua de Mel' },
          subtitle: { id: 'subtitle', type: 'text', value: 'Sua contribuição tornará nossos sonhos realidade' },
          currentGoal: 0,
          totalGoal: 15000,
          pixKey: { id: 'pixKey', type: 'text', value: coupleData.email },
          groups: [],
          leaderboard: []
        },
        settings: {
          showTitle: true,
          showSubtitle: true,
          animation: 'zoom'
        }
      },
      {
        id: 'rsvp',
        name: 'Confirmar Presença',
        type: 'rsvp',
        component: 'RSVPSection',
        editable: true,
        required: false,
        order: 6,
        enabled: true,
        layout: {
          type: 'container',
          background: 'colored',
          padding: 'large',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#fef2f2',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: 'Confirme sua Presença' },
          subtitle: { id: 'subtitle', type: 'text', value: 'Sua presença é muito importante para nós!' },
          deadline: { id: 'deadline', type: 'date', value: new Date(new Date(coupleData.weddingDateTime).getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
          message: { id: 'message', type: 'textarea', value: 'Por favor, confirme sua presença até 30 dias antes do casamento.' },
          confirmationMessage: { id: 'confirmationMessage', type: 'textarea', value: 'Obrigado por confirmar! Aguardamos você.' },
          fields: []
        },
        settings: {
          showTitle: true,
          showSubtitle: true,
          animation: 'fade'
        }
      },
      {
        id: 'venue',
        name: 'Local',
        type: 'venue',
        component: 'VenueSection',
        editable: true,
        required: false,
        order: 7,
        enabled: true,
        layout: {
          type: 'container',
          background: 'transparent',
          padding: 'large',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#ffffff',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: 'Onde Será' },
          ceremonyTitle: { id: 'ceremonyTitle', type: 'text', value: 'Cerimônia' },
          ceremonyAddress: { 
            id: 'ceremonyAddress', 
            type: 'text', 
            value: coupleData.ceremonyVenue || 'Local da cerimônia será divulgado em breve' 
          },
          ceremonyTime: { id: 'ceremonyTime', type: 'time', value: new Date(coupleData.weddingDateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) },
          ceremonyImage: { id: 'ceremonyImage', type: 'image', value: '/api/placeholder/600/400' },
          receptionTitle: { id: 'receptionTitle', type: 'text', value: 'Recepção' },
          receptionAddress: { 
            id: 'receptionAddress', 
            type: 'text', 
            value: coupleData.receptionVenue || 'Local da recepção será divulgado em breve' 
          },
          receptionTime: { id: 'receptionTime', type: 'time', value: new Date(new Date(coupleData.weddingDateTime).getTime() + 2 * 60 * 60 * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) },
          receptionImage: { id: 'receptionImage', type: 'image', value: '/api/placeholder/600/400' }
        },
        settings: {
          showTitle: true,
          animation: 'slide'
        }
      },
      {
        id: 'details',
        name: 'Detalhes',
        type: 'details',
        component: 'DetailsSection',
        editable: true,
        required: false,
        order: 8,
        enabled: true,
        layout: {
          type: 'container',
          background: 'colored',
          padding: 'large',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#fef2f2',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: 'Informações Importantes' },
          dressCode: { id: 'dressCode', type: 'text', value: 'Traje Esporte Fino' },
          dressCodeDescription: { id: 'dressCodeDescription', type: 'textarea', value: 'Traje social, evitem cores muito claras como branco e bege.' },
          importantNotes: { id: 'importantNotes', type: 'textarea', value: 'Cerimônia unplugged - pedimos para guardar os celulares durante a cerimônia.' },
          timeline: [],
          contacts: []
        },
        settings: {
          showTitle: true,
          animation: 'fade'
        }
      },
      {
        id: 'gallery',
        name: 'Galeria',
        type: 'gallery',
        component: 'GallerySection',
        editable: true,
        required: false,
        order: 9,
        enabled: true,
        layout: {
          type: 'container',
          background: 'transparent',
          padding: 'large',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#ffffff',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: 'Nossos Momentos' },
          subtitle: { id: 'subtitle', type: 'text', value: 'Momentos especiais da nossa jornada' },
          images: [],
          layout: 'grid'
        },
        settings: {
          showTitle: true,
          showSubtitle: true,
          animation: 'zoom'
        }
      },
      {
        id: 'testimonials',
        name: 'Depoimentos',
        type: 'testimonials',
        component: 'TestimonialsSection',
        editable: true,
        required: false,
        order: 10,
        enabled: true,
        layout: {
          type: 'container',
          background: 'colored',
          padding: 'large',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#fef2f2',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: 'Palavras Carinhosas' },
          subtitle: { id: 'subtitle', type: 'text', value: 'O que nossos queridos disseram sobre nós' },
          message: { id: 'message', type: 'textarea', value: 'Deixe uma mensagem carinhosa para os noivos' },
          testimonials: []
        },
        settings: {
          showTitle: true,
          showSubtitle: true,
          animation: 'slide'
        }
      },
      {
        id: 'footer',
        name: 'Rodapé',
        type: 'footer',
        component: 'FooterSection',
        editable: true,
        required: true,
        order: 11,
        enabled: true,
        layout: {
          type: 'full',
          background: 'colored',
          padding: 'large',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#f9fafb',
          textColor: '#1f2937'
        },
        data: {
          thankYouMessage: { 
            id: 'thankYouMessage', 
            type: 'textarea', 
            value: 'Obrigado por fazer parte do nosso dia especial! Vocês tornaram nosso sonho ainda mais bonito e inesquecível.' 
          },
          coupleSignature: { id: 'coupleSignature', type: 'text', value: `Com amor, ${coupleNames}` },
          weddingDate: { id: 'weddingDate', type: 'date', value: coupleData.weddingDate },
          weddingLocation: { id: 'weddingLocation', type: 'text', value: locationText },
          socialLinks: {
            instagram: { id: 'instagram', type: 'url', value: `@${coupleData.slug}` },
            facebook: { id: 'facebook', type: 'url', value: `/${coupleData.slug}` },
            youtube: { id: 'youtube', type: 'url', value: `@${coupleData.slug}` }
          },
          contactInfo: {
            phone: { id: 'phone', type: 'phone', value: coupleData.bridePhone || coupleData.groomPhone || '(11) 99999-9999' },
            email: { id: 'email', type: 'email', value: coupleData.email }
          },
          credits: {
            photographer: { id: 'photographer', type: 'text', value: 'Fotografia: Studio Momentos' },
            venue: { id: 'venue', type: 'text', value: coupleData.ceremonyVenue ? `Local: ${coupleData.ceremonyVenue}` : 'Local: A definir' },
            website: { id: 'website', type: 'text', value: 'Site: EiVouCasar.com' }
          }
        },
        settings: {
          showTitle: false,
          animation: 'fade'
        }
      }
    ],
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
      title: { 
        id: 'seoTitle', 
        type: 'text', 
        value: `${coupleNames} - Casamento ${weddingDateFormatted}` 
      },
      description: { 
        id: 'seoDescription', 
        type: 'textarea', 
        value: `Celebre conosco o casamento de ${coupleNames} no dia ${weddingDateFormatted} em ${locationText}` 
      },
      image: { id: 'seoImage', type: 'image', value: coupleData.coverPhotoUrl || '/api/placeholder/1200/630' },
      keywords: { 
        id: 'seoKeywords', 
        type: 'text', 
        value: `casamento, ${coupleData.brideName.toLowerCase()}, ${coupleData.groomName.toLowerCase()}, ${coupleData.city.toLowerCase()}, ${new Date(coupleData.weddingDateTime).getFullYear()}` 
      }
    }
  };
} 