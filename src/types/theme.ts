export interface WeddingTheme {
  id: string
  name: string
  displayName: string
  description: string
  preview: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
  }
  fonts: {
    primary: string
    secondary: string
    accent: string
  }
  styling: {
    borderRadius: string
    shadow: string
    spacing: string
    buttonStyle: string
  }
  animations: {
    speed: number
    easing: string
  }
}

export interface ThemeContextType {
  currentTheme: WeddingTheme
  availableThemes: WeddingTheme[]
  setTheme: (themeId: string) => void
  isLoading: boolean
}

export const DEFAULT_THEMES: WeddingTheme[] = [
  {
    id: 'default-elegant',
    name: 'defaultElegant',
    displayName: 'Elegante Padrão',
    description: 'Tema original do template preservado',
    preview: '💎',
    colors: {
      primary: '#2563eb',
      secondary: '#7c3aed',
      accent: '#06b6d4',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb'
    },
    fonts: {
      primary: 'Inter, sans-serif',
      secondary: 'Playfair Display, serif',
      accent: 'Dancing Script, cursive'
    },
    styling: {
      borderRadius: '0.75rem',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      spacing: '1.5rem',
      buttonStyle: 'rounded-lg'
    },
    animations: {
      speed: 0.3,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  {
    id: 'classic-romance',
    name: 'classicRomance',
    displayName: 'Classic Romance',
    description: 'Rosa elegante com toques dourados',
    preview: '🌸',
    colors: {
      primary: '#d946ef',
      secondary: '#fbbf24',
      accent: '#f472b6',
      background: '#fef7ff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb'
    },
    fonts: {
      primary: 'Inter, sans-serif',
      secondary: 'Playfair Display, serif',
      accent: 'Dancing Script, cursive'
    },
    styling: {
      borderRadius: '0.75rem',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      spacing: '1.5rem',
      buttonStyle: 'rounded-full'
    },
    animations: {
      speed: 0.3,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  {
    id: 'ocean-breeze',
    name: 'oceanBreeze',
    displayName: 'Ocean Breeze',
    description: 'Azul oceano com toques turquesa',
    preview: '🌊',
    colors: {
      primary: '#0891b2',
      secondary: '#06b6d4',
      accent: '#0ea5e9',
      background: '#f0f9ff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb'
    },
    fonts: {
      primary: 'Inter, sans-serif',
      secondary: 'Lora, serif',
      accent: 'Great Vibes, cursive'
    },
    styling: {
      borderRadius: '0.5rem',
      shadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      spacing: '1.25rem',
      buttonStyle: 'rounded-lg'
    },
    animations: {
      speed: 0.4,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
  },
  {
    id: 'garden-fresh',
    name: 'gardenFresh',
    displayName: 'Garden Fresh',
    description: 'Verde natureza com dourado suave',
    preview: '🌿',
    colors: {
      primary: '#059669',
      secondary: '#eab308',
      accent: '#16a34a',
      background: '#f0fdf4',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb'
    },
    fonts: {
      primary: 'Inter, sans-serif',
      secondary: 'Merriweather, serif',
      accent: 'Satisfy, cursive'
    },
    styling: {
      borderRadius: '0.625rem',
      shadow: '0 3px 5px rgba(0, 0, 0, 0.12)',
      spacing: '1.375rem',
      buttonStyle: 'rounded-md'
    },
    animations: {
      speed: 0.35,
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  },
  {
    id: 'sunset-glow',
    name: 'sunsetGlow',
    displayName: 'Sunset Glow',
    description: 'Coral vibrante com tons pêssego',
    preview: '🌅',
    colors: {
      primary: '#ea580c',
      secondary: '#f97316',
      accent: '#fb923c',
      background: '#fff7ed',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb'
    },
    fonts: {
      primary: 'Inter, sans-serif',
      secondary: 'Crimson Text, serif',
      accent: 'Allura, cursive'
    },
    styling: {
      borderRadius: '1rem',
      shadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
      spacing: '1.625rem',
      buttonStyle: 'rounded-2xl'
    },
    animations: {
      speed: 0.25,
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }
  },
  {
    id: 'modern-noir',
    name: 'modernNoir',
    displayName: 'Modern Noir',
    description: 'Preto elegante com dourado luxuoso',
    preview: '⚫',
    colors: {
      primary: '#1f2937',
      secondary: '#fbbf24',
      accent: '#374151',
      background: '#f9fafb',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb'
    },
    fonts: {
      primary: 'Inter, sans-serif',
      secondary: 'Playfair Display, serif',
      accent: 'Pacifico, cursive'
    },
    styling: {
      borderRadius: '0.375rem',
      shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      spacing: '1.75rem',
      buttonStyle: 'rounded-sm'
    },
    animations: {
      speed: 0.5,
      easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
    }
  }
] 