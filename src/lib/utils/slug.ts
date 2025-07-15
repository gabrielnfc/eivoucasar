/**
 * Gera um slug seguro removendo caracteres especiais e acentos
 */
export function generateSlug(text: string): string;
export function generateSlug(bride_name: string, groom_name: string): string;
export function generateSlug(textOrBrideName: string, groom_name?: string): string {
  if (groom_name) {
    // Versão com dois parâmetros (bride_name, groom_name)
    const removeAccents = (str: string) => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };
    
    const processedBrideName = removeAccents(textOrBrideName)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-')         // Substitui espaços por hífens
      .replace(/-+/g, '-')          // Remove hífens duplicados
      .replace(/^-|-$/g, '');       // Remove hífens no início e fim
    
    const processedGroomName = removeAccents(groom_name)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-')         // Substitui espaços por hífens
      .replace(/-+/g, '-')          // Remove hífens duplicados
      .replace(/^-|-$/g, '');       // Remove hífens no início e fim
    
    return `${processedBrideName}-${processedGroomName}`;
  } else {
    // Versão original com um parâmetro (text)
    return textOrBrideName
      .toLowerCase()
      .normalize('NFD') // Decompor caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '') // Remover diacríticos (acentos)
      .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiais
      .replace(/\s+/g, '-') // Trocar espaços por hífens
      .replace(/-+/g, '-') // Remover hífens duplos
      .replace(/^-|-$/g, '') // Remover hífens no início/fim
  }
}

/**
 * Gera slug para casal
 */
export function generateCoupleSlug(brideName: string, groomName: string, year?: number): string {
  const brideFirstName = brideName.split(' ')[0]
  const groomFirstName = groomName.split(' ')[0]
  const yearSuffix = year ? `-${year}` : ''
  
  return generateSlug(`${brideFirstName}-${groomFirstName}${yearSuffix}`)
}

/**
 * Valida se um slug está em formato correto
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(slug)
}

/**
 * Corrige um slug existente
 */
export function fixSlug(slug: string): string {
  return generateSlug(slug)
}

// Função para validar slug
export function validateSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9-]+$/;
  return slugRegex.test(slug);
} 