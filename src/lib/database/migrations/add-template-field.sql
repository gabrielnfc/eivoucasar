-- Migration: Add template_id field to couples table
-- Date: 2025-01-XX
-- Description: Add template selection functionality for couple websites

ALTER TABLE couples 
ADD COLUMN IF NOT EXISTS template_id VARCHAR(50) DEFAULT 'classico';

-- Add comment to the column
COMMENT ON COLUMN couples.template_id IS 'Template visual selecionado para o site do casal';

-- Update existing couples to have the default template
UPDATE couples 
SET template_id = 'classico' 
WHERE template_id IS NULL;

-- Create index for faster template lookups
CREATE INDEX IF NOT EXISTS idx_couples_template_id ON couples(template_id); 