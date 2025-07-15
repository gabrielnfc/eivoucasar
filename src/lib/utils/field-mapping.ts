// Mapeamento entre campos do formulário e banco de dados - VERSÃO CORRIGIDA
export const FORM_TO_DB_MAPPING = {
  bride_name: 'bride_name',
  groom_name: 'groom_name',
  wedding_date: 'wedding_date',
  wedding_time: 'wedding_time',
  wedding_location: 'wedding_location',
  wedding_address: 'wedding_address',
  formal_invitation_message: 'formal_invitation_message',
  bride_photo: 'bride_photo',
  groom_photo: 'groom_photo',
  cover_photo_url: 'cover_photo_url',
  couple_photo: 'couple_photo',
  hero_background_image: 'hero_background_image',
  invitation_title: 'invitation_title',
  invitation_signature: 'invitation_signature',
  story_title: 'story_title',
  first_meeting_date: 'first_meeting_date',
  first_meeting_story: 'first_meeting_story',
  engagement_date: 'engagement_date',
  engagement_story: 'engagement_story',
  countdown_title: 'countdown_title',
  countdown_message: 'countdown_message',
  theme_color: 'theme_color',
  slug: 'slug'
} as const

export const DB_TO_FORM_MAPPING = {
  bride_name: 'bride_name',
  groom_name: 'groom_name',
  wedding_date: 'wedding_date',
  wedding_time: 'wedding_time',
  wedding_location: 'wedding_location',
  wedding_address: 'wedding_address',
  formal_invitation_message: 'formal_invitation_message',
  bride_photo: 'bride_photo',
  groom_photo: 'groom_photo',
  cover_photo_url: 'cover_photo_url',
  couple_photo: 'couple_photo',
  hero_background_image: 'hero_background_image',
  invitation_title: 'invitation_title',
  invitation_signature: 'invitation_signature',
  story_title: 'story_title',
  first_meeting_date: 'first_meeting_date',
  first_meeting_story: 'first_meeting_story',
  engagement_date: 'engagement_date',
  engagement_story: 'engagement_story',
  countdown_title: 'countdown_title',
  countdown_message: 'countdown_message',
  theme_color: 'theme_color',
  slug: 'slug'
} as const

// Converter dados do formulário para o banco
export function formToDbData(formData: any): any {
  const dbData: any = {}
  
  for (const [formField, dbField] of Object.entries(FORM_TO_DB_MAPPING)) {
    if (formData[formField] !== undefined) {
      dbData[dbField] = formData[formField]
    }
  }
  
  return dbData
}

// Converter dados do banco para o formulário
export function dbToFormData(dbData: any): any {
  const formData: any = {}
  
  for (const [dbField, formField] of Object.entries(DB_TO_FORM_MAPPING)) {
    if (dbData[dbField] !== undefined) {
      formData[formField] = dbData[dbField]
    }
  }
  
  return formData
}

// Validar se todos os campos obrigatórios estão presentes
export function validateRequiredFields(data: any): { isValid: boolean; errors: string[] } {
  const requiredFields = ['bride_name', 'groom_name', 'wedding_date', 'slug']
  const errors: string[] = []
  
  for (const field of requiredFields) {
    if (!data[field] || data[field].trim() === '') {
      errors.push(`Campo obrigatório: ${field}`)
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
} 