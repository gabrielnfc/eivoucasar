import { WeddingTemplate } from '@/types/template';
import { formatBrazilianDate, createBrazilianDate, toInputDateFormat } from '@/lib/utils';

interface CoupleData {
  id: string;
  slug: string;
  bride_name: string;
  groom_name: string;
  wedding_date: string;
  wedding_time?: string;
  wedding_location?: string;
  wedding_address?: string;
  
  // Campos de convite
  invitation_message?: string;
  invitation_title?: string;
  formal_invitation_message?: string;
  invitation_signature?: string;
  
  // Campos de história
  couple_story?: string;
  story_title?: string;
  first_meeting_date?: string;
  first_meeting_story?: string;
  engagement_date?: string;
  engagement_story?: string;
  
  // Campos de contagem regressiva
  countdown_title?: string;
  
  // Campos de imagem
  bride_photo?: string;
  groom_photo?: string;
  cover_photo_url?: string;
  invitation_image_2?: string;
  invitation_image_3?: string;
  hero_background_image?: string;
  couple_photo?: string;
  
  // Outros campos
  welcomeMessage?: string;
  theme_color?: string;
  email: string;
  email_secondary?: string;
  city: string;
  state: string;
  country?: string;
  bride_phone?: string;
  groom_phone?: string;
  is_active: boolean;
  is_published: boolean;
}

// Helper function to safely handle wedding dates
function getValidWeddingDate(dateString: string | null | undefined): Date {
  if (!dateString) {
    // Return a future date if no date is provided
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    return futureDate;
  }

  // Usar formatação brasileira para evitar problemas de timezone
  if (dateString.includes('-')) {
    const [year, month, day] = dateString.split('-').map(Number);
    // Criar data local brasileira SEM conversão UTC
    return new Date(year, month - 1, day, 12, 0, 0); // Meio-dia para evitar DST issues
  }

  // Fallback para outros formatos
  const date = new Date(dateString + 'T12:00:00');
  if (isNaN(date.getTime())) {
    // Return a future date if the date is invalid
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    return futureDate;
  }

  return date;
}

// Helper function to safely format wedding date
function formatWeddingDate(dateString: string | null | undefined): string {
  if (!dateString) {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    return formatBrazilianDate(futureDate, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return formatBrazilianDate(dateString, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Helper function to safely get date string for inputs
function getDateInputValue(dateString: string | null | undefined): string {
  if (!dateString) {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    return toInputDateFormat(futureDate);
  }

  return toInputDateFormat(dateString);
}

// Helper function to safely get time string
function getTimeInputValue(dateString: string | null | undefined, timeString?: string): string {
  if (timeString) {
    return timeString;
  }
  
  const date = getValidWeddingDate(dateString);
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export function createRealTemplate(coupleData: CoupleData): WeddingTemplate {
  console.log('🏗️ createRealTemplate: Recebendo dados:', coupleData);
  console.log('🖼️ createRealTemplate: hero_background_image:', coupleData.hero_background_image);
  
  const coupleNames = `${coupleData.bride_name} & ${coupleData.groom_name}`;
  const weddingDateFormatted = formatWeddingDate(coupleData.wedding_date);
  
  const locationText = coupleData.wedding_location || `${coupleData.city}, ${coupleData.state}`;
  const themeColors = coupleData.theme_color ? {
    primary: coupleData.theme_color,
    secondary: coupleData.theme_color,
    accent: coupleData.theme_color,
    background: '#fef2f2',
    text: '#1f2937'
  } : {
    primary: '#be185d',
    secondary: '#ec4899',
    accent: '#f97316',
    background: '#fef2f2',
    text: '#1f2937'
  };

  const heroBackgroundImage = coupleData.hero_background_image || '/image/template_layout.jpg';
  console.log('🎨 createRealTemplate: heroBackgroundImage final:', heroBackgroundImage);

  return {
    id: coupleData.id,
    name: `Template de ${coupleNames}`,
    
    description: `Celebre conosco o casamento de ${coupleNames}`,
    category: 'Custom',
    preview: coupleData.cover_photo_url || '/image/template_layout.jpg',
    colors: {
      primary: themeColors.primary,
      secondary: themeColors.secondary,
      accent: themeColors.accent,
      background: themeColors.background,
      text: themeColors.text,
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
        id: 'hero',
        type: 'hero',
        name: 'Seção Principal',
        component: 'HeroSection',
        editable: true,
        required: true,
        order: 1,
        enabled: true,
        layout: {
          type: 'full',
          background: 'image',
          padding: 'none',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#fef2f2',
          textColor: '#1f2937'
        },
        data: {
          brideName: { id: 'brideName', type: 'text', value: coupleData.bride_name },
          groomName: { id: 'groomName', type: 'text', value: coupleData.groom_name },
          weddingDate: { id: 'weddingDate', type: 'text', value: weddingDateFormatted },
          weddingTime: { id: 'weddingTime', type: 'text', value: coupleData.wedding_time || '' },
          location: { id: 'location', type: 'text', value: coupleData.wedding_location || locationText },
          subtitle: { id: 'subtitle', type: 'text', value: coupleData.welcomeMessage || 'Venha celebrar conosco o nosso grande dia!' },
          backgroundImage: { id: 'backgroundImage', type: 'image', value: coupleData.hero_background_image || heroBackgroundImage }
        },
        settings: {
          showTitle: true,
          showSubtitle: true,
          animation: 'fade'
        }
      },
      {
        id: 'invitation',
        type: 'invitation',
        name: 'Convite',
        component: 'InvitationSection',
        editable: true,
        required: false,
        order: 2,
        enabled: true,
        layout: {
          type: 'container',
          background: 'transparent',
          padding: 'xlarge',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#ffffff',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: coupleData.invitation_title || 'Você está convidado!' },
          message: { id: 'message', type: 'textarea', value: coupleData.invitation_message || 'É com grande alegria que convidamos você para celebrar conosco o nosso casamento. Sua presença é muito importante para nós e tornará este dia ainda mais especial.' },
          formalMessage: { id: 'formalMessage', type: 'textarea', value: coupleData.formal_invitation_message || `${coupleData.bride_name} & ${coupleData.groom_name} têm a honra de convidar você para sua cerimônia de casamento em ${formatWeddingDate(coupleData.wedding_date)} às ${getTimeInputValue(coupleData.wedding_date, coupleData.wedding_time)} em ${coupleData.wedding_location || locationText}.` },
          signature: { id: 'signature', type: 'text', value: coupleData.invitation_signature && coupleData.invitation_signature.trim() 
            ? (coupleData.invitation_signature.startsWith('Com amor') 
                ? coupleData.invitation_signature 
                : `Com amor, ${coupleData.invitation_signature}`)
            : `Com amor, ${coupleNames}` },
          invitationImage: { id: 'invitationImage', type: 'image', value: coupleData.cover_photo_url || '/image/template_layout.jpg' },
          invitationImage2: { id: 'invitationImage2', type: 'image', value: coupleData.invitation_image_2 || '' },
          invitationImage3: { id: 'invitationImage3', type: 'image', value: coupleData.invitation_image_3 || '' }
        },
        settings: {
          showTitle: true,
          showSubtitle: true,
          animation: 'slide'
        }
      },
      {
        id: 'countdown',
        type: 'countdown',
        name: 'Contagem Regressiva',
        component: 'CountdownSection',
        editable: true,
        required: false,
        order: 3,
        enabled: true,
        layout: {
          type: 'container',
          background: 'colored',
          padding: 'xlarge',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#fef2f2',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: coupleData.countdown_title || 'Faltam apenas...' },
          targetDate: { id: 'targetDate', type: 'date', value: getDateInputValue(coupleData.wedding_date) }
        },
        settings: {
          showTitle: true,
          showSubtitle: true,
          animation: 'slide'
        }
      },
      {
        id: 'story',
        type: 'story',
        name: 'Nossa História',
        component: 'StorySection',
        editable: true,
        required: false,
        order: 4,
        enabled: true,
        layout: {
          type: 'container',
          background: 'transparent',
          padding: 'xlarge',
          alignment: 'center',
          spacing: 'loose'
        },
        style: {
          backgroundColor: '#ffffff',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: coupleData.story_title || 'Nossa História de Amor' },
          story: { id: 'story', type: 'textarea', value: coupleData.couple_story || 'Nossa história de amor começou de forma especial e única...' },
          image: { id: 'image', type: 'image', value: coupleData.couple_photo || '/image/template_layout.jpg' },
          timeline: [
            {
              id: 'timeline_1',
              title: 'Primeiro Encontro',
              date: coupleData.first_meeting_date || '2020-01-01',
              description: coupleData.first_meeting_story || 'Nos conhecemos em um dia especial...'
            },
            {
              id: 'timeline_2',
              title: 'Noivado',
              date: coupleData.engagement_date || '2022-06-15',
              description: coupleData.engagement_story || 'O pedido de casamento foi mágico...'
            }
          ]
        },
        settings: {
          showTitle: true,
          showSubtitle: true,
          animation: 'fade'
        }
      },
      {
        id: 'groomsmen',
        type: 'groomsmen',
        name: 'Padrinhos',
        component: 'GroomsmenSection',
        editable: true,
        required: false,
        order: 5,
        enabled: true,
        layout: {
          type: 'container',
          background: 'transparent',
          padding: 'xlarge',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#fef2f2',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: 'Nossos Padrinhos' },
          groomsmen: [],
          bridesmaids: []
        },
        settings: {
          showTitle: true,
          showSubtitle: true,
          animation: 'fade'
        }
      },
      {
        id: 'gamification',
        type: 'gamification',
        name: 'Contribuições',
        component: 'GamificationSection',
        editable: true,
        required: false,
        order: 6,
        enabled: true,
        layout: {
          type: 'container',
          background: 'transparent',
          padding: 'xlarge',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#ffffff',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: 'Ajude-nos na Lua de Mel' },
          subtitle: { id: 'subtitle', type: 'text', value: 'Sua contribuição nos ajudará a tornar nossa lua de mel ainda mais especial!' },
          pixKey: { id: 'pixKey', type: 'text', value: coupleData.email || 'chave-pix@exemplo.com' },
          currentGoal: 0,
          totalGoal: 5000,
          groups: [
            {
              name: 'Família',
              totalContributed: 0,
              memberCount: 0,
              avatar: '👨‍👩‍👧‍👦'
            }
          ],
          leaderboard: [
            {
              groupName: 'Família',
              amount: 0,
              position: 1
            }
          ]
        },
        settings: {
          showTitle: true,
          showSubtitle: true,
          animation: 'fade'
        }
      },
      {
        id: 'rsvp',
        type: 'rsvp',
        name: 'Confirmar Presença',
        component: 'RSVPSection',
        editable: true,
        required: false,
        order: 7,
        enabled: true,
        layout: {
          type: 'container',
          background: 'colored',
          padding: 'xlarge',
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
          deadline: { id: 'deadline', type: 'date', value: (() => {
            const weddingDate = getValidWeddingDate(coupleData.wedding_date);
            const deadlineDate = new Date(weddingDate.getTime() - 30 * 24 * 60 * 60 * 1000);
            return deadlineDate.toISOString().split('T')[0];
          })() },
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
        type: 'venue',
        name: 'Local',
        component: 'VenueSection',
        editable: true,
        required: false,
        order: 8,
        enabled: true,
        layout: {
          type: 'container',
          background: 'transparent',
          padding: 'xlarge',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#ffffff',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: 'Onde Será' },
          ceremonyTitle: { id: 'ceremonyTitle', type: 'text', value: 'Cerimônia Religiosa' },
          ceremonyAddress: { id: 'ceremonyAddress', type: 'text', value: coupleData.wedding_address || 'Igreja São José, Rua das Flores, 123' },
          ceremonyTime: { id: 'ceremonyTime', type: 'text', value: coupleData.wedding_time || '16:00' },
          ceremonyDescription: { id: 'ceremonyDescription', type: 'text', value: 'Local da cerimônia religiosa' },
          ceremonyImage: { id: 'ceremonyImage', type: 'image', value: '/image/template_layout-2.jpg' },
          receptionTitle: { id: 'receptionTitle', type: 'text', value: 'Recepção' },
          receptionAddress: { id: 'receptionAddress', type: 'text', value: 'Salão de Festas Villa Bella, Av. Principal, 456' },
          receptionTime: { id: 'receptionTime', type: 'text', value: '18:30' },
          receptionDescription: { id: 'receptionDescription', type: 'text', value: 'Local da festa e confraternização' },
          receptionImage: { id: 'receptionImage', type: 'image', value: '/image/template_layout-3.jpg' }
        },
        settings: {
          showTitle: true,
          showSubtitle: true,
          animation: 'fade'
        }
      },
      {
        id: 'details',
        type: 'details',
        name: 'Detalhes',
        component: 'DetailsSection',
        editable: true,
        required: false,
        order: 9,
        enabled: true,
        layout: {
          type: 'container',
          background: 'colored',
          padding: 'xlarge',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#fef2f2',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: 'Detalhes Importantes' },
          details: [
            {
              id: 'detail_1',
              title: 'Dress Code',
              description: 'Traje social completo',
              icon: 'dress'
            },
            {
              id: 'detail_2',
              title: 'Horário',
              description: getTimeInputValue(coupleData.wedding_date, coupleData.wedding_time),
              icon: 'clock'
            },
            {
              id: 'detail_3',
              title: 'Local',
              description: locationText,
              icon: 'location'
            }
          ]
        },
        settings: {
          showTitle: true,
          showSubtitle: true,
          animation: 'fade'
        }
      },
      {
        id: 'gallery',
        type: 'gallery',
        name: 'Galeria',
        component: 'GallerySection',
        editable: true,
        required: false,
        order: 10,
        enabled: true,
        layout: {
          type: 'container',
          background: 'transparent',
          padding: 'xlarge',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#ffffff',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: 'Nossos Momentos' },
          images: [
            {
              id: 'image_1',
              url: coupleData.cover_photo_url || '/image/template_layout.jpg',
              alt: 'Foto do casal',
              caption: 'Momento especial'
            }
          ]
        },
        settings: {
          showTitle: true,
          showSubtitle: true,
          animation: 'fade'
        }
      },
      {
        id: 'testimonials',
        type: 'testimonials',
        name: 'Depoimentos',
        component: 'TestimonialsSection',
        editable: true,
        required: false,
        order: 11,
        enabled: true,
        layout: {
          type: 'container',
          background: 'colored',
          padding: 'xlarge',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#fef2f2',
          textColor: '#1f2937'
        },
        data: {
          title: { id: 'title', type: 'text', value: 'Depoimentos' },
          testimonials: [
            {
              id: 'testimonial_1',
              name: 'Família e Amigos',
              text: 'Vocês são um casal incrível!',
              role: 'Pessoas queridas',
              image: '/api/placeholder/100/100'
            }
          ]
        },
        settings: {
          showTitle: true,
          showSubtitle: true,
          animation: 'fade'
        }
      },
      {
        id: 'footer',
        type: 'footer',
        name: 'Rodapé',
        component: 'FooterSection',
        editable: true,
        required: true,
        order: 12,
        enabled: true,
        layout: {
          type: 'full',
          background: 'colored',
          padding: 'xlarge',
          alignment: 'center',
          spacing: 'normal'
        },
        style: {
          backgroundColor: '#1f2937',
          textColor: '#ffffff'
        },
        data: {
          thankYouMessage: { id: 'thankYouMessage', type: 'textarea', value: 'Obrigado por fazer parte do nosso dia especial! Vocês tornaram nosso sonho ainda mais bonito e inesquecível.' },
          coupleSignature: { id: 'coupleSignature', type: 'text', value: `Com amor, ${coupleNames}` },
          weddingDate: { id: 'weddingDate', type: 'date', value: getDateInputValue(coupleData.wedding_date) },
          contactEmail: { id: 'contactEmail', type: 'email', value: coupleData.email },
          websiteCredit: { id: 'websiteCredit', type: 'text', value: `Site criado com amor por ${coupleNames} | ${new Date().getFullYear()}` }
        },
        settings: {
          showTitle: true,
          showSubtitle: true,
          animation: 'fade'
        }
      }
    ],
    globalSettings: {
      showNavigation: false,
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
      image: { id: 'seoImage', type: 'image', value: coupleData.cover_photo_url || '/api/placeholder/1200/630' },
      keywords: { 
        id: 'seoKeywords', 
        type: 'text', 
        value: `casamento, ${coupleData.bride_name?.toLowerCase() || ''}, ${coupleData.groom_name?.toLowerCase() || ''}, ${coupleData.city?.toLowerCase() || ''}, ${getValidWeddingDate(coupleData.wedding_date).getFullYear()}` 
      }
    }
  };
} 