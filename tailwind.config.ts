import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // EiVouCasar - Cores da Logo
        primary: {
          50: '#fff8f9',
          100: '#ffeef0',
          200: '#ffdde2',
          300: '#ffbbc5',
          400: '#ff8a9a',
          500: '#fe97a2', // Rosa coral da logo
          600: '#f56570',
          700: '#e63946',
          800: '#c62a35',
          900: '#a61e2a',
        },
        secondary: {
          50: '#f9f9f9',
          100: '#f0f0f0',
          200: '#e3e3e3',
          300: '#c7c7c8',
          400: '#a8a8a9',
          500: '#535354', // Cinza da logo
          600: '#424243',
          700: '#363637',
          800: '#2a2a2b',
          900: '#1f1f20',
        },
        accent: {
          50: '#fef9f5',
          100: '#fdf1ea',
          200: '#fbe0d1',
          300: '#f7c5ad',
          400: '#f2a085',
          500: '#ed7a5e',
          600: '#e55a3c',
          700: '#d64426',
          800: '#b33a20',
          900: '#90311e',
        },
        // Mantendo rose para compatibilidade (baseado na primary)
        rose: {
          50: '#fff8f9',
          100: '#ffeef0',
          200: '#ffdde2',
          300: '#ffbbc5',
          400: '#ff8a9a',
          500: '#fe97a2',
          600: '#f56570',
          700: '#e63946',
          800: '#c62a35',
          900: '#a61e2a',
        },
        // Neutros com fundo sempre branco
        neutral: {
          50: '#ffffff', // Sempre branco
          100: '#fafafa',
          200: '#f5f5f5',
          300: '#e5e5e5',
          400: '#d4d4d4',
          500: '#a3a3a3',
          600: '#737373',
          700: '#525252',
          800: '#404040',
          900: '#262626',
        },
        // Garantir que o background seja sempre branco
        background: '#ffffff',
        foreground: '#535354',
        border: '#e5e5e5',
        input: '#ffffff',
        ring: '#fe97a2',
        muted: {
          DEFAULT: '#f5f5f5',
          foreground: '#737373',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'full': '9999px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(254, 151, 162, 0.4)' },
          '100%': { boxShadow: '0 0 30px rgba(254, 151, 162, 0.8)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config 