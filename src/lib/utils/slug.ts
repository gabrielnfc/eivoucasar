/**
 * Gera um slug seguro removendo caracteres especiais e acentos
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompor caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remover diacríticos (acentos)
    .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiais
    .replace(/\s+/g, '-') // Trocar espaços por hífens
    .replace(/-+/g, '-') // Remover hífens duplos
    .replace(/^-|-$/g, '') // Remover hífens no início/fim
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
 * Corrige slug existente removendo caracteres problemáticos
 */
export function fixSlug(slug: string): string {
  return generateSlug(slug)
} 