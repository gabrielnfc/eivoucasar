/**
 * Utilitários para aplicação de temas dinâmicos
 */

export const getThemeColor = (color: string, fallback: string): string => {
  return `var(--template-${color}, ${fallback})`;
};

export const getThemeGradient = (
  direction: string,
  color1: string,
  color2: string,
  fallback1: string,
  fallback2: string
): string => {
  return `linear-gradient(${direction}, ${getThemeColor(color1, fallback1)}, ${getThemeColor(color2, fallback2)})`;
};

export const getThemeGradientWithOpacity = (
  direction: string,
  color1: string,
  color2: string,
  color3: string,
  fallback1: string,
  fallback2: string,
  fallback3: string,
  opacity1: string = '20',
  opacity2: string = '10',
  opacity3: string = '15'
): string => {
  return `linear-gradient(${direction}, ${getThemeColor(color1, fallback1)}${opacity1}, ${getThemeColor(color2, fallback2)}${opacity2}, ${getThemeColor(color3, fallback3)}${opacity3})`;
};

export const getThemeFont = (font: string, fallback: string): string => {
  return `var(--template-font-${font}, ${fallback})`;
};

/**
 * Aplica estilos de tema a um elemento
 */
export const applyThemeStyles = (element: HTMLElement, theme: any) => {
  if (!element) return;

  // Aplicar CSS custom properties
  Object.entries(theme.colors).forEach(([key, value]) => {
    element.style.setProperty(`--template-${key}`, value as string);
  });

  Object.entries(theme.fonts).forEach(([key, value]) => {
    element.style.setProperty(`--template-font-${key}`, value as string);
  });
};

/**
 * Hook para usar cores de tema com fallback
 */
export const useThemeColor = (colorName: string, fallback: string) => {
  return `var(--template-${colorName}, ${fallback})`;
};

/**
 * Gera estilos CSS inline para gradientes temáticos
 */
export const getThemeStyles = (template: any) => {
  return {
    primary: getThemeColor('primary', template.colors.primary),
    secondary: getThemeColor('secondary', template.colors.secondary),
    accent: getThemeColor('accent', template.colors.accent),
    background: getThemeColor('background', template.colors.background),
    text: getThemeColor('text', template.colors.text),
    textSecondary: getThemeColor('text-secondary', template.colors.textSecondary),
    
    // Gradientes prontos
    primaryGradient: getThemeGradient('135deg', 'primary', 'accent', template.colors.primary, template.colors.accent),
    secondaryGradient: getThemeGradient('135deg', 'primary', 'secondary', template.colors.primary, template.colors.secondary),
    backgroundGradient: getThemeGradientWithOpacity('135deg', 'primary', 'secondary', 'accent', template.colors.primary, template.colors.secondary, template.colors.accent),
    
    // Fontes
    fontPrimary: getThemeFont('primary', template.fonts.body),
    fontSecondary: getThemeFont('secondary', template.fonts.heading),
    fontAccent: getThemeFont('accent', template.fonts.script),
  };
}; 