import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency to Brazilian Real
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount)
}

/**
 * Format date to Brazilian format
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR').format(dateObj)
}

/**
 * TEMPORAL API INSPIRED - MODERN DATE HANDLING FOR BRAZIL
 * Implementação baseada na nova Temporal API do JavaScript
 * Resolve problemas de timezone UTC-3 brasileiro
 */

// Detecta se Temporal API está disponível (Firefox Nightly, polyfills)
const hasTemporalAPI = typeof (globalThis as any).Temporal !== 'undefined';

/**
 * Classe PlainDate inspirada na Temporal API
 * Representa uma data calendário sem timezone (ideal para datas de casamento)
 */
class BrazilianPlainDate {
  private year: number;
  private month: number; // 1-12
  private day: number;
  
  constructor(year: number, month: number, day: number) {
    this.year = year;
    this.month = month;
    this.day = day;
  }
  
  static from(dateString: string): BrazilianPlainDate {
    if (!dateString) {
      const now = new Date();
      return new BrazilianPlainDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
    }
    
    // Parse formato YYYY-MM-DD (padrão brasileiro)
    if (dateString.includes('-')) {
      const [year, month, day] = dateString.split('-').map(Number);
      return new BrazilianPlainDate(year, month, day);
    }
    
    // Fallback para outras strings
    const date = new Date(dateString + 'T12:00:00'); // Forçar meio-dia para evitar UTC issues
    return new BrazilianPlainDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }
  
  toString(): string {
    const year = this.year.toString().padStart(4, '0');
    const month = this.month.toString().padStart(2, '0');
    const day = this.day.toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  toLocaleDateString(locale = 'pt-BR', options?: Intl.DateTimeFormatOptions): string {
    // Criar data local sem problemas de timezone
    const localDate = new Date(this.year, this.month - 1, this.day);
    return localDate.toLocaleDateString(locale, {
      timeZone: 'America/Sao_Paulo',
      ...options
    });
  }
  
  add(duration: { days?: number; months?: number; years?: number }): BrazilianPlainDate {
    let newYear = this.year;
    let newMonth = this.month;
    let newDay = this.day;
    
    if (duration.years) newYear += duration.years;
    if (duration.months) newMonth += duration.months;
    if (duration.days) newDay += duration.days;
    
    // Ajustar overflow de mês
    while (newMonth > 12) {
      newMonth -= 12;
      newYear += 1;
    }
    while (newMonth < 1) {
      newMonth += 12;
      newYear -= 1;
    }
    
    return new BrazilianPlainDate(newYear, newMonth, newDay);
  }
}

/**
 * Cria uma data brasileira usando Temporal API ou implementação compatível
 */
export function createBrazilianDate(dateString: string): Date | BrazilianPlainDate {
  if (!dateString) return new Date();
  
  // Se Temporal API disponível, usar PlainDate nativo
  if (hasTemporalAPI && (globalThis as any).Temporal?.PlainDate) {
    try {
      return (globalThis as any).Temporal.PlainDate.from(dateString);
    } catch (error) {
      console.warn('Temporal.PlainDate falhou, usando implementação própria:', error);
    }
  }
  
  // Usar nossa implementação compatível
  return BrazilianPlainDate.from(dateString);
}

/**
 * Formata uma data para o formato brasileiro considerando timezone
 * SOLUÇÃO DEFINITIVA para UTC-3 brasileiro
 */
export function formatBrazilianDate(dateString: string | Date, options?: Intl.DateTimeFormatOptions): string {
  if (!dateString) return '';
  
  try {
    // Se Temporal API disponível, usar ZonedDateTime
    if (hasTemporalAPI && (globalThis as any).Temporal?.ZonedDateTime && typeof dateString === 'string') {
      try {
        const zonedDate = (globalThis as any).Temporal.ZonedDateTime.from({
          year: parseInt(dateString.split('-')[0]),
          month: parseInt(dateString.split('-')[1]),
          day: parseInt(dateString.split('-')[2]),
          timeZone: 'America/Sao_Paulo'
        });
        return zonedDate.toLocaleString('pt-BR', options);
      } catch (error) {
        console.warn('Temporal.ZonedDateTime falhou:', error);
      }
    }
    
    // Implementação robusta sem Temporal
    let year: number, month: number, day: number;
    
    if (typeof dateString === 'string') {
      if (dateString.includes('-')) {
        [year, month, day] = dateString.split('-').map(Number);
      } else {
        // Fallback para outras strings
        const date = new Date(dateString + 'T12:00:00');
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
      }
    } else {
      // dateString é um Date object
      year = dateString.getFullYear();
      month = dateString.getMonth() + 1;
      day = dateString.getDate();
    }
    
    // Criar data local brasileira SEM conversão UTC
    const brazilianDate = new Date(year, month - 1, day, 12, 0, 0); // Meio-dia para evitar DST issues
    
    const defaultOptions: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Sao_Paulo',
      ...options
    };
    
    return brazilianDate.toLocaleDateString('pt-BR', defaultOptions);
  } catch (error) {
    console.error('Erro ao formatar data brasileira:', error);
    return String(dateString);
  }
}

/**
 * Converte data para o formato de input (YYYY-MM-DD) 
 * TEMPORAL API STYLE - sem problemas de timezone
 */
export function toInputDateFormat(dateString: string | Date): string {
  if (!dateString) return '';
  
  try {
    // Se Temporal API disponível
    if (hasTemporalAPI && (globalThis as any).Temporal?.PlainDate && typeof dateString === 'string') {
      try {
        const plainDate = (globalThis as any).Temporal.PlainDate.from(dateString);
        return plainDate.toString(); // Formato YYYY-MM-DD
      } catch (error) {
        console.warn('Temporal.PlainDate.from falhou:', error);
      }
    }
    
    // Implementação própria
    let year: number, month: number, day: number;
    
    if (typeof dateString === 'string') {
      if (dateString.includes('-')) {
        // Já está no formato correto YYYY-MM-DD
        const [y, m, d] = dateString.split('-').map(Number);
        year = y;
        month = m;
        day = d;
      } else {
        // Parse outras strings
        const date = new Date(dateString + 'T12:00:00');
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
      }
    } else {
      // dateString é um Date object
      year = dateString.getFullYear();
      month = dateString.getMonth() + 1;
      day = dateString.getDate();
    }
    
    // Garantir formato YYYY-MM-DD
    const yearStr = year.toString().padStart(4, '0');
    const monthStr = month.toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    
    return `${yearStr}-${monthStr}-${dayStr}`;
  } catch (error) {
    console.error('Erro ao converter data para input:', error);
    return '';
  }
}

/**
 * TEMPORAL NOW API - Obter data atual brasileira
 */
export function brazilianNow() {
  if (hasTemporalAPI && (globalThis as any).Temporal?.Now) {
    try {
      return (globalThis as any).Temporal.Now.plainDateISO('America/Sao_Paulo');
    } catch (error) {
      console.warn('Temporal.Now falhou:', error);
    }
  }
  
  // Implementação própria - data atual brasileira
  const now = new Date();
  const brazilianDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  return BrazilianPlainDate.from(toInputDateFormat(brazilianDate));
}

/**
 * Debug helper - mostra informações sobre Temporal API
 */
export function temporalDebugInfo() {
  console.log('🔍 TEMPORAL API DEBUG INFO:');
  console.log('✅ Temporal disponível:', hasTemporalAPI);
  console.log('📅 Temporal.PlainDate:', !!(globalThis as any).Temporal?.PlainDate);
  console.log('🌍 Temporal.ZonedDateTime:', !!(globalThis as any).Temporal?.ZonedDateTime);
  console.log('⏰ Temporal.Now:', !!(globalThis as any).Temporal?.Now);
  console.log('🇧🇷 Timezone Brasil:', 'America/Sao_Paulo');
  
  if (hasTemporalAPI) {
    console.log('🎉 Usando Temporal API nativa!');
  } else {
    console.log('🔄 Usando implementação compatível');
  }
}

/**
 * Generate a random slug
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
} 