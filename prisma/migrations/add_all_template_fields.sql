-- Migration: Add all template editable fields to couples table
-- Data: 2025-01-28
-- Descrição: Adiciona todos os campos editáveis identificados nos templates

-- Campos de Convite (Invitation Section)
ALTER TABLE couples ADD COLUMN IF NOT EXISTS invitation_message TEXT;

-- Campos de Venue/Local
ALTER TABLE couples ADD COLUMN IF NOT EXISTS ceremony_time VARCHAR(10);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS reception_time VARCHAR(10);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS directions TEXT;
ALTER TABLE couples ADD COLUMN IF NOT EXISTS parking_info TEXT;

-- Campos de RSVP
ALTER TABLE couples ADD COLUMN IF NOT EXISTS rsvp_title VARCHAR(255);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS rsvp_subtitle VARCHAR(255);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS rsvp_deadline DATE;
ALTER TABLE couples ADD COLUMN IF NOT EXISTS rsvp_message TEXT;
ALTER TABLE couples ADD COLUMN IF NOT EXISTS rsvp_confirmation_message TEXT;

-- Campos de Padrinhos (Groomsmen)
ALTER TABLE couples ADD COLUMN IF NOT EXISTS groomsmen_title VARCHAR(255);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS groomsmen_subtitle VARCHAR(255);

-- Campos de Detalhes (Details)
ALTER TABLE couples ADD COLUMN IF NOT EXISTS details_title VARCHAR(255);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS dress_code VARCHAR(255);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS dress_code_description TEXT;
ALTER TABLE couples ADD COLUMN IF NOT EXISTS important_notes TEXT;

-- Campos de Galeria (Gallery)
ALTER TABLE couples ADD COLUMN IF NOT EXISTS gallery_title VARCHAR(255);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS gallery_subtitle VARCHAR(255);

-- Campos de Depoimentos (Testimonials)
ALTER TABLE couples ADD COLUMN IF NOT EXISTS testimonials_title VARCHAR(255);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS testimonials_subtitle VARCHAR(255);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS testimonials_message TEXT;
ALTER TABLE couples ADD COLUMN IF NOT EXISTS testimonials_auto_approve BOOLEAN DEFAULT false;

-- Campos de Gamificação
ALTER TABLE couples ADD COLUMN IF NOT EXISTS gamification_title VARCHAR(255);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS gamification_subtitle VARCHAR(255);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS pix_key VARCHAR(255);

-- Campos de Rodapé (Footer)
ALTER TABLE couples ADD COLUMN IF NOT EXISTS footer_thank_you_message TEXT;
ALTER TABLE couples ADD COLUMN IF NOT EXISTS footer_signature VARCHAR(255);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS footer_contact_email VARCHAR(255);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS footer_contact_phone VARCHAR(20);

-- Comentários para documentação
COMMENT ON COLUMN couples.ceremony_time IS 'Horário da cerimônia (formato HH:MM)';
COMMENT ON COLUMN couples.reception_time IS 'Horário da recepção (formato HH:MM)';
COMMENT ON COLUMN couples.directions IS 'Instruções de como chegar aos locais';
COMMENT ON COLUMN couples.parking_info IS 'Informações sobre estacionamento';
COMMENT ON COLUMN couples.rsvp_deadline IS 'Data limite para confirmação de presença';
COMMENT ON COLUMN couples.testimonials_auto_approve IS 'Se depoimentos são aprovados automaticamente';
COMMENT ON COLUMN couples.pix_key IS 'Chave PIX para contribuições da lua de mel';

-- Criar índices para campos mais consultados
CREATE INDEX IF NOT EXISTS idx_couples_ceremony_time ON couples(ceremony_time);
CREATE INDEX IF NOT EXISTS idx_couples_reception_time ON couples(reception_time);
CREATE INDEX IF NOT EXISTS idx_couples_rsvp_deadline ON couples(rsvp_deadline);
CREATE INDEX IF NOT EXISTS idx_couples_pix_key ON couples(pix_key);

-- Valores padrão para campos essenciais (apenas para registros existentes)
UPDATE couples SET 
  rsvp_title = 'Confirme sua Presença',
  rsvp_subtitle = 'Sua presença é muito importante para nós!',
  groomsmen_title = 'Nossos Padrinhos',
  groomsmen_subtitle = 'As pessoas especiais que nos acompanham nesta jornada',
  details_title = 'Detalhes do Evento',
  gallery_title = 'Nossa Galeria',
  gallery_subtitle = 'Momentos especiais capturados para sempre',
  testimonials_title = 'Depoimentos',
  testimonials_subtitle = 'Palavras carinhosas dos nossos amigos e família',
  testimonials_auto_approve = false,
  gamification_title = 'Ajude nossa Lua de Mel',
  gamification_subtitle = 'Contribua para tornar nossos sonhos realidade',
  footer_thank_you_message = 'Obrigado por fazer parte da nossa história de amor!',
  footer_signature = 'Com amor'
WHERE 
  rsvp_title IS NULL OR
  groomsmen_title IS NULL OR
  details_title IS NULL OR
  gallery_title IS NULL OR
  testimonials_title IS NULL OR
  gamification_title IS NULL OR
  footer_thank_you_message IS NULL; 