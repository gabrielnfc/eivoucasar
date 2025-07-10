'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export interface CookiePreferences {
  essential: boolean; // Sempre true, obrigatórios
  analytics: boolean; // Google Analytics, etc.
  marketing: boolean; // Anúncios personalizados
  functional: boolean; // Preferências do usuário, personalização
}

interface CookieContextType {
  preferences: CookiePreferences | null;
  consentGiven: boolean;
  showBanner: boolean;
  acceptAll: () => void;
  acceptSelected: (preferences: CookiePreferences) => void;
  rejectOptional: () => void;
  updatePreferences: (preferences: CookiePreferences) => void;
}

const defaultPreferences: CookiePreferences = {
  essential: true, // Sempre obrigatório
  analytics: false,
  marketing: false,
  functional: false,
};

const CookieContext = createContext<CookieContextType | undefined>(undefined);

const COOKIE_CONSENT_KEY = 'eivoucasar_cookie_consent';
const COOKIE_PREFERENCES_KEY = 'eivoucasar_cookie_preferences';

export function CookieProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // Carregar preferências salvas
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

      if (savedConsent === 'true' && savedPreferences) {
        try {
          const parsed = JSON.parse(savedPreferences);
          setPreferences(parsed);
          setConsentGiven(true);
          setShowBanner(false);
        } catch (error) {
          console.error('Erro ao carregar preferências de cookies:', error);
          setShowBanner(true);
        }
      } else {
        // Primeiro acesso - mostrar banner
        setShowBanner(true);
      }
    }
  }, []);

  const savePreferences = (newPreferences: CookiePreferences) => {
    setPreferences(newPreferences);
    setConsentGiven(true);
    setShowBanner(false);

    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences));
    }

    // Aplicar configurações imediatamente
    applyPreferences(newPreferences);
  };

  const applyPreferences = (prefs: CookiePreferences) => {
    // Analytics (Google Analytics, etc.)
    if (prefs.analytics) {
      // Ativar Google Analytics
      console.log('Analytics cookies ativados');
      // gtag('consent', 'update', { analytics_storage: 'granted' });
    } else {
      console.log('Analytics cookies desativados');
      // gtag('consent', 'update', { analytics_storage: 'denied' });
    }

    // Marketing
    if (prefs.marketing) {
      console.log('Marketing cookies ativados');
      // gtag('consent', 'update', { ad_storage: 'granted' });
    } else {
      console.log('Marketing cookies desativados');
      // gtag('consent', 'update', { ad_storage: 'denied' });
    }

    // Functional
    if (prefs.functional) {
      console.log('Functional cookies ativados');
    } else {
      console.log('Functional cookies desativados');
    }
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    savePreferences(allAccepted);
  };

  const acceptSelected = (selectedPreferences: CookiePreferences) => {
    // Garantir que essential seja sempre true
    const finalPreferences = {
      ...selectedPreferences,
      essential: true,
    };
    savePreferences(finalPreferences);
  };

  const rejectOptional = () => {
    const onlyEssential: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    savePreferences(onlyEssential);
  };

  const updatePreferences = (newPreferences: CookiePreferences) => {
    savePreferences(newPreferences);
  };

  const value: CookieContextType = {
    preferences,
    consentGiven,
    showBanner,
    acceptAll,
    acceptSelected,
    rejectOptional,
    updatePreferences,
  };

  return (
    <CookieContext.Provider value={value}>
      {children}
    </CookieContext.Provider>
  );
}

export function useCookies() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookies must be used within a CookieProvider');
  }
  return context;
} 