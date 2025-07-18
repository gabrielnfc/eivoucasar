// Mapeamento entre campos do template (sectionId.fieldId) e campos do banco de dados
// Para sincronização bidirecional template ↔ configurações

export const TEMPLATE_TO_DB_FIELD_MAPPING: Record<string, string> = {
  // 💌 SEÇÃO INVITATION
  'invitation.title': 'invitation_title',
  'invitation.message': 'invitation_message', // ⚠️ REMOVIDO da interface Config, mas mantido para compatibilidade
  'invitation.formalMessage': 'formal_invitation_message',
  'invitation.signature': 'invitation_signature',
  
  'invitation.invitationImage': 'cover_photo_url',
  'invitation.invitationImage2': 'invitation_image_2',
  'invitation.invitationImage3': 'invitation_image_3',

  // 🎭 SEÇÃO HERO
  'hero.brideName': 'bride_name',
  'hero.groomName': 'groom_name', 
  'hero.weddingDate': 'wedding_date',
  'hero.weddingTime': 'wedding_time',
  'hero.location': 'wedding_location',
  'hero.subtitle': 'welcome_message',
  'hero.backgroundImage': 'hero_background_image',

  // 📖 SEÇÃO STORY
  'story.title': 'story_title',
  'story.story': 'couple_story',
  'story.content': 'couple_story', // alias
  'story.image': 'couple_photo',

  // ⏰ SEÇÃO COUNTDOWN
  'countdown.title': 'countdown_title',

  'countdown.targetDate': 'wedding_date',

  // 🏛️ SEÇÃO VENUE
  'venue.ceremonyVenue': 'ceremony_venue',
  'venue.ceremonyTime': 'ceremony_time',
  'venue.receptionVenue': 'reception_venue', 
  'venue.receptionTime': 'reception_time',
  'venue.directions': 'directions',
  'venue.parking': 'parking_info',

  // 📝 SEÇÃO RSVP
  'rsvp.title': 'rsvp_title',
  'rsvp.subtitle': 'rsvp_subtitle',
  'rsvp.deadline': 'rsvp_deadline',
  'rsvp.message': 'rsvp_message',
  'rsvp.confirmationMessage': 'rsvp_confirmation_message',

  // 👔 SEÇÃO GROOMSMEN  
  'groomsmen.title': 'groomsmen_title',
  'groomsmen.subtitle': 'groomsmen_subtitle',

  // 🎯 SEÇÃO DETAILS
  'details.title': 'details_title',
  'details.dressCode': 'dress_code',
  'details.description': 'dress_code_description',
  'details.notes': 'important_notes',

  // 🖼️ SEÇÃO GALLERY
  'gallery.title': 'gallery_title',
  'gallery.subtitle': 'gallery_subtitle',

  // 💰 SEÇÃO GAMIFICATION
  'gamification.title': 'gamification_title',
  'gamification.subtitle': 'gamification_subtitle',
  'gamification.pixKey': 'pix_key',

  // 💬 SEÇÃO TESTIMONIALS
  'testimonials.title': 'testimonials_title',
  'testimonials.subtitle': 'testimonials_subtitle',
  'testimonials.message': 'testimonials_message',
  'testimonials.autoApprove': 'testimonials_auto_approve',

  // 🔚 SEÇÃO FOOTER
  'footer.thankYou': 'footer_thank_you',
  'footer.signature': 'footer_signature',
  'footer.contactEmail': 'footer_contact_email',
  'footer.contactPhone': 'footer_contact_phone',
};

// Mapeamento reverso (banco → template)
export const DB_TO_TEMPLATE_FIELD_MAPPING: Record<string, string> = Object.fromEntries(
  Object.entries(TEMPLATE_TO_DB_FIELD_MAPPING).map(([template, db]) => [db, template])
);

/**
 * Converte fieldId do template para campo do banco de dados
 */
export function getDbFieldFromTemplate(sectionId: string, fieldId: string): string | null {
  const templateKey = `${sectionId}.${fieldId}`;
  return TEMPLATE_TO_DB_FIELD_MAPPING[templateKey] || null;
}

/**
 * Converte campo do banco para fieldId do template
 */
export function getTemplateFieldFromDb(dbField: string): { sectionId: string; fieldId: string } | null {
  const templateKey = DB_TO_TEMPLATE_FIELD_MAPPING[dbField];
  if (!templateKey) return null;
  
  const [sectionId, fieldId] = templateKey.split('.');
  return { sectionId, fieldId };
}

/**
 * Valida se um campo de template é mapeável para o banco
 */
export function isTemplateFieldMappable(sectionId: string, fieldId: string): boolean {
  const templateKey = `${sectionId}.${fieldId}`;
  return templateKey in TEMPLATE_TO_DB_FIELD_MAPPING;
}

/**
 * Lista todos os campos mapeáveis de uma seção
 */
export function getMappableFieldsForSection(sectionId: string): string[] {
  const prefix = `${sectionId}.`;
  return Object.keys(TEMPLATE_TO_DB_FIELD_MAPPING)
    .filter(key => key.startsWith(prefix))
    .map(key => key.substring(prefix.length));
} 