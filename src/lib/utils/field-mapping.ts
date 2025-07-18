// Mapeamento entre campos do formulário e banco de dados - VERSÃO COMPLETA ATUALIZADA
import { toInputDateFormat } from '@/lib/utils'

export const FORM_TO_DB_MAPPING = {
  // Campos básicos
  bride_name: 'bride_name',
  groom_name: 'groom_name',
  wedding_date: 'wedding_date',
  wedding_time: 'wedding_time',
  wedding_location: 'wedding_location',
  wedding_address: 'wedding_address',
  
  // Campos de convite
  invitation_message: 'invitation_message',
  invitation_title: 'invitation_title',
  invitation_signature: 'invitation_signature',
  formal_invitation_message: 'formal_invitation_message',
  
  // Campos de história
  couple_story: 'couple_story',
  story_title: 'story_title',
  first_meeting_date: 'first_meeting_date',
  first_meeting_story: 'first_meeting_story',
  engagement_date: 'engagement_date',
  engagement_story: 'engagement_story',
  
  // Campos de contagem regressiva
  countdown_title: 'countdown_title',
  countdown_message: 'countdown_message',
  
  // Campos de imagem
  bride_photo: 'bride_photo',
  groom_photo: 'groom_photo',
  cover_photo_url: 'cover_photo_url',
  invitation_image_2: 'invitation_image_2',
  invitation_image_3: 'invitation_image_3',
  couple_photo: 'couple_photo',
  hero_background_image: 'hero_background_image',
  
  // Campos de local/venue
  ceremony_venue: 'ceremony_venue',
  ceremony_time: 'ceremony_time',
  reception_venue: 'reception_venue',
  reception_time: 'reception_time',
  directions: 'directions',
  parking_info: 'parking_info',
  
  // Campos de RSVP
  rsvp_title: 'rsvp_title',
  rsvp_subtitle: 'rsvp_subtitle',
  rsvp_deadline: 'rsvp_deadline',
  rsvp_message: 'rsvp_message',
  rsvp_confirmation_message: 'rsvp_confirmation_message',
  
  // Campos de padrinhos
  groomsmen_title: 'groomsmen_title',
  groomsmen_subtitle: 'groomsmen_subtitle',
  
  // Campos de detalhes
  details_title: 'details_title',
  dress_code: 'dress_code',
  dress_code_description: 'dress_code_description',
  important_notes: 'important_notes',
  
  // Campos de galeria
  gallery_title: 'gallery_title',
  gallery_subtitle: 'gallery_subtitle',
  
  // Campos de depoimentos
  testimonials_title: 'testimonials_title',
  testimonials_subtitle: 'testimonials_subtitle',
  testimonials_message: 'testimonials_message',
  testimonials_auto_approve: 'testimonials_auto_approve',
  
  // Campos de gamificação
  gamification_title: 'gamification_title',
  gamification_subtitle: 'gamification_subtitle',
  pix_key: 'pix_key',
  
  // Campos de rodapé
  footer_thank_you_message: 'footer_thank_you_message',
  footer_signature: 'footer_signature',
  footer_contact_email: 'footer_contact_email',
  footer_contact_phone: 'footer_contact_phone',
  
  // Outros campos
  theme_color: 'theme_color',
  slug: 'slug'
} as const

export const DB_TO_FORM_MAPPING = {
  // Campos básicos
  bride_name: 'bride_name',
  groom_name: 'groom_name',
  wedding_date: 'wedding_date',
  wedding_time: 'wedding_time',
  wedding_location: 'wedding_location',
  wedding_address: 'wedding_address',
  
  // Campos de convite
  invitation_message: 'invitation_message',
  invitation_title: 'invitation_title',
  invitation_signature: 'invitation_signature',
  formal_invitation_message: 'formal_invitation_message',
  
  // Campos de história
  couple_story: 'couple_story',
  story_title: 'story_title',
  first_meeting_date: 'first_meeting_date',
  first_meeting_story: 'first_meeting_story',
  engagement_date: 'engagement_date',
  engagement_story: 'engagement_story',
  
  // Campos de contagem regressiva
  countdown_title: 'countdown_title',
  countdown_message: 'countdown_message',
  
  // Campos de imagem
  bride_photo: 'bride_photo',
  groom_photo: 'groom_photo',
  cover_photo_url: 'cover_photo_url',
  invitation_image_2: 'invitation_image_2',
  invitation_image_3: 'invitation_image_3',
  couple_photo: 'couple_photo',
  hero_background_image: 'hero_background_image',
  
  // Campos de local/venue
  ceremony_venue: 'ceremony_venue',
  ceremony_time: 'ceremony_time',
  reception_venue: 'reception_venue',
  reception_time: 'reception_time',
  directions: 'directions',
  parking_info: 'parking_info',
  
  // Campos de RSVP
  rsvp_title: 'rsvp_title',
  rsvp_subtitle: 'rsvp_subtitle',
  rsvp_deadline: 'rsvp_deadline',
  rsvp_message: 'rsvp_message',
  rsvp_confirmation_message: 'rsvp_confirmation_message',
  
  // Campos de padrinhos
  groomsmen_title: 'groomsmen_title',
  groomsmen_subtitle: 'groomsmen_subtitle',
  
  // Campos de detalhes
  details_title: 'details_title',
  dress_code: 'dress_code',
  dress_code_description: 'dress_code_description',
  important_notes: 'important_notes',
  
  // Campos de galeria
  gallery_title: 'gallery_title',
  gallery_subtitle: 'gallery_subtitle',
  
  // Campos de depoimentos
  testimonials_title: 'testimonials_title',
  testimonials_subtitle: 'testimonials_subtitle',
  testimonials_message: 'testimonials_message',
  testimonials_auto_approve: 'testimonials_auto_approve',
  
  // Campos de gamificação
  gamification_title: 'gamification_title',
  gamification_subtitle: 'gamification_subtitle',
  pix_key: 'pix_key',
  
  // Campos de rodapé
  footer_thank_you_message: 'footer_thank_you_message',
  footer_signature: 'footer_signature',
  footer_contact_email: 'footer_contact_email',
  footer_contact_phone: 'footer_contact_phone',
  
  // Outros campos
  theme_color: 'theme_color',
  slug: 'slug'
} as const

// Campos que são datas e precisam ser convertidos para null se vazios
const DATE_FIELDS = ['wedding_date', 'first_meeting_date', 'engagement_date', 'rsvp_deadline']

// Campos de texto que podem ser null se vazios
const NULLABLE_TEXT_FIELDS = [
  'formal_invitation_message', 'first_meeting_story', 'engagement_story',
  'bride_photo', 'groom_photo', 'cover_photo_url', 'couple_photo',
  'hero_background_image', 'directions', 'parking_info',
  'rsvp_message', 'rsvp_confirmation_message', 'dress_code_description',
  'important_notes', 'testimonials_message', 'footer_thank_you_message'
]

// Campos booleanos
const BOOLEAN_FIELDS = ['testimonials_auto_approve']

// Converter dados do formulário para o banco
export function formToDbData(formData: any): any {
  const dbData: any = {}
  
  for (const [formField, dbField] of Object.entries(FORM_TO_DB_MAPPING)) {
    if (formData[formField] !== undefined) {
      let value = formData[formField]
      
      // Converter strings vazias para null em campos de data
      if (DATE_FIELDS.includes(dbField) && (value === '' || value === null || value === undefined)) {
        value = null
      }
      
      // Converter strings vazias para null em campos de texto opcionais
      if (NULLABLE_TEXT_FIELDS.includes(dbField) && (value === '' || value === null || value === undefined)) {
        value = null
      }
      
      // Converter valores booleanos
      if (BOOLEAN_FIELDS.includes(dbField)) {
        value = value === true || value === 'true' || value === '1'
      }
      
      // Para outros campos de texto, manter string vazia se necessário
      dbData[dbField] = value
    }
  }
  
  return dbData
}

// Converter dados do banco para o formulário
export function dbToFormData(dbData: any): any {
  const formData: any = {}
  
  for (const [dbField, formField] of Object.entries(DB_TO_FORM_MAPPING)) {
    if (dbData[dbField] !== undefined) {
      let value = dbData[dbField]
      
      // Converter valores null para string vazia em campos de texto
      if (value === null && !DATE_FIELDS.includes(dbField)) {
        value = ''
      }
      
      // Converter datas para formato de string brasileiro correto
      if (DATE_FIELDS.includes(dbField) && value) {
        if (value instanceof Date) {
          value = toInputDateFormat(value)
        } else if (typeof value === 'string') {
          value = toInputDateFormat(value)
        }
      }
      
      formData[formField] = value
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