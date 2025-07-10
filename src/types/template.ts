import { ReactNode } from 'react';

// Tipos base para edição inline
export type EditableFieldType = 
  | 'text' 
  | 'textarea' 
  | 'rich-text' 
  | 'image' 
  | 'date' 
  | 'time' 
  | 'color' 
  | 'phone' 
  | 'email' 
  | 'url';

export interface EditableField {
  id: string;
  type: EditableFieldType;
  value: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  validation?: (value: string) => string | null;
}

// Configurações de layout por seção
export interface SectionLayout {
  type: 'full' | 'container' | 'narrow' | 'split' | 'grid';
  background: 'transparent' | 'colored' | 'gradient' | 'image';
  padding: 'none' | 'small' | 'medium' | 'large' | 'xlarge';
  alignment: 'left' | 'center' | 'right';
  spacing: 'tight' | 'normal' | 'loose' | 'xlarge';
}

// Configurações de estilo específicas
export interface SectionStyle {
  backgroundColor?: string;
  backgroundImage?: string;
  textColor?: string;
  borderRadius?: string;
  shadow?: 'none' | 'small' | 'medium' | 'large';
  border?: string;
  customCSS?: string;
}

// Dados estruturados para cada seção
export interface SectionData {
  [key: string]: EditableField | EditableField[] | any;
}

// Definição completa de uma seção
export interface TemplateSection {
  id: string;
  name: string;
  type: 'hero' | 'invitation' | 'countdown' | 'story' | 'groomsmen' | 'gallery' | 'gamification' | 'rsvp' | 'testimonials' | 'venue' | 'details' | 'footer';
  component: string; // nome do componente
  editable: boolean;
  required: boolean;
  order: number;
  enabled: boolean;
  layout: SectionLayout;
  style: SectionStyle;
  data: SectionData;
  settings: {
    showTitle?: boolean;
    showSubtitle?: boolean;
    showDivider?: boolean;
    animation?: 'none' | 'fade' | 'slide' | 'zoom';
    mobileOrder?: number;
  };
}

// Dados específicos para seções comuns
export interface HeroSectionData {
  coupleNames: EditableField;
  brideName: EditableField;
  groomName: EditableField;
  weddingDate: EditableField;
  heroImage: EditableField;
  backgroundVideo?: EditableField;
  subtitle?: EditableField;
  musicUrl?: EditableField;
  enableAutoplay?: boolean;
}

export interface InvitationSectionData {
  title: EditableField;
  message: EditableField;
  formalMessage: EditableField;
  invitationImage?: EditableField;
  signature: EditableField;
}

export interface CountdownSectionData {
  title: EditableField;
  targetDate: EditableField;
  message: EditableField;
  showDays: boolean;
  showHours: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  completedMessage: EditableField;
}

export interface StorySectionData {
  title: EditableField;
  story: EditableField;
  coupleImage: EditableField;
  timeline?: Array<{
    date: EditableField;
    title: EditableField;
    description: EditableField;
    image?: EditableField;
  }>;
}

export interface GroomsmenSectionData {
  title: EditableField;
  subtitle?: EditableField;
  groomsmen: Array<{
    name: EditableField;
    role: EditableField;
    image: EditableField;
    description?: EditableField;
  }>;
  bridesmaids: Array<{
    name: EditableField;
    role: EditableField;
    image: EditableField;
    description?: EditableField;
  }>;
}

export interface GallerySection {
  title: EditableField;
  subtitle?: EditableField;
  images: Array<{
    url: EditableField;
    caption?: EditableField;
    alt: EditableField;
  }>;
  layout: 'grid' | 'masonry' | 'carousel' | 'slideshow';
}

export interface GamificationSectionData {
  title: EditableField;
  subtitle?: EditableField;
  currentGoal: number;
  totalGoal: number;
  pixKey: EditableField;
  groups: Array<{
    name: string;
    totalContributed: number;
    memberCount: number;
    avatar?: string;
  }>;
  leaderboard: Array<{
    groupName: string;
    amount: number;
    position: number;
  }>;
}

export interface RSVPSectionData {
  title: EditableField;
  subtitle?: EditableField;
  deadline: EditableField;
  message: EditableField;
  confirmationMessage: EditableField;
  fields: Array<{
    name: string;
    type: 'text' | 'email' | 'phone' | 'select' | 'radio' | 'checkbox' | 'textarea';
    label: EditableField;
    required: boolean;
    options?: string[];
  }>;
}

export interface TestimonialsSectionData {
  title: EditableField;
  subtitle?: EditableField;
  message: EditableField;
  testimonials: Array<{
    name: EditableField;
    message: EditableField;
    date: string;
    approved: boolean;
  }>;
}

export interface VenueSectionData {
  title: EditableField;
  ceremonyTitle: EditableField;
  ceremonyAddress: EditableField;
  ceremonyTime: EditableField;
  ceremonyImage?: EditableField;
  receptionTitle: EditableField;
  receptionAddress: EditableField;
  receptionTime: EditableField;
  receptionImage?: EditableField;
  mapUrl?: EditableField;
  directions?: EditableField;
  parkingInfo?: EditableField;
}

export interface DetailsSectionData {
  title: EditableField;
  dressCode: EditableField;
  dressCodeDescription?: EditableField;
  dressCodeColors?: EditableField[];
  importantNotes?: EditableField;
  timeline: Array<{
    time: EditableField;
    event: EditableField;
    description?: EditableField;
    icon?: string;
  }>;
  contacts: Array<{
    name: EditableField;
    role: EditableField;
    phone: EditableField;
    email?: EditableField;
  }>;
}

// Template completo
export interface WeddingTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textSecondary: string;
    success: string;
    warning: string;
    error: string;
  };
  fonts: {
    heading: string;
    body: string;
    script: string;
  };
  sections: TemplateSection[];
  globalSettings: {
    showNavigation: boolean;
    navigationStyle: 'fixed' | 'sticky' | 'static';
    showFooter: boolean;
    enableAnimations: boolean;
    musicAutoplay: boolean;
    theme: 'light' | 'dark' | 'auto';
  };
  romantic: {
    animationStyle: 'elegant' | 'modern' | 'classic' | 'playful';
    intensity: 'minimal' | 'moderate' | 'intense';
  };
  seo: {
    title: EditableField;
    description: EditableField;
    image: EditableField;
    keywords: EditableField;
  };
}

// Estado do editor de templates
export interface TemplateEditorState {
  template: WeddingTemplate;
  activeSection: string | null;
  isEditing: boolean;
  isDirty: boolean;
  isPreview: boolean;
  isSaving: boolean;
  errors: Record<string, string>;
  history: WeddingTemplate[];
  historyIndex: number;
}

// Configurações específicas por tipo de seção
export interface SectionConfig {
  [key: string]: {
    defaultData: SectionData;
    defaultLayout: SectionLayout;
    defaultStyle: SectionStyle;
    editableFields: string[];
    requiredFields: string[];
    validation?: (data: SectionData) => Record<string, string>;
  };
}

// Utilitários para validação
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings?: Record<string, string>;
}

// Configuração de theme dinâmico
export interface DynamicTheme {
  colors: Record<string, string>;
  fonts: Record<string, string>;
  spacing: Record<string, string>;
  breakpoints: Record<string, string>;
  shadows: Record<string, string>;
  borderRadius: Record<string, string>;
}

// Exportações para facilitar uso
export type SectionType = TemplateSection['type'];
export type SectionComponent = keyof SectionConfig;
export type EditableFieldValue = string | number | boolean | Date | null;

// Interfaces para hooks
export interface UseTemplateEditorReturn {
  state: TemplateEditorState;
  actions: {
    updateSection: (sectionId: string, data: Partial<SectionData>) => void;
    updateField: (sectionId: string, fieldId: string, value: EditableFieldValue) => void;
    reorderSection: (sectionId: string, newOrder: number) => void;
    toggleSection: (sectionId: string) => void;
    deleteSection: (sectionId: string) => void;
    addSection: (type: SectionType, afterSectionId?: string) => void;
    duplicateSection: (sectionId: string) => void;
    saveTemplate: () => Promise<void>;
    resetTemplate: () => void;
    undo: () => void;
    redo: () => void;
    setPreview: (isPreview: boolean) => void;
    setActiveSection: (sectionId: string | null) => void;
  };
}

// Configurações de responsividade
export interface ResponsiveConfig {
  mobile: {
    breakpoint: string;
    columns: number;
    fontSize: string;
    spacing: string;
  };
  tablet: {
    breakpoint: string;
    columns: number;
    fontSize: string;
    spacing: string;
  };
  desktop: {
    breakpoint: string;
    columns: number;
    fontSize: string;
    spacing: string;
  };
} 

 