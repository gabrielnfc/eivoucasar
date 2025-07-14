'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TemplateSection, WeddingTemplate, CountdownSectionData } from '@/types/template';
import { InlineEditor } from '../inline-editor';
import WeddingCountdownAnimated from '@/components/wedding/wedding-countdown-animated';
import { getThemeStyles } from '@/lib/utils/theme-utils';

interface CountdownSectionProps {
  section: TemplateSection;
  template: WeddingTemplate;
  isEditable: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
}

export function CountdownSection({
  section,
  template,
  isEditable,
  onFieldUpdate
}: CountdownSectionProps) {
  const data = section.data as CountdownSectionData;
  const themeStyles = getThemeStyles(template);

  return (
    <motion.section
      className="relative py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      style={{
        backgroundColor: section.style.backgroundColor || themeStyles.background,
        color: section.style.textColor || themeStyles.text,
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at 30% 70%, ${themeStyles.primary}, transparent 50%),
                        radial-gradient(circle at 70% 30%, ${themeStyles.secondary}, transparent 50%)`
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Title editável */}
        <div className="text-center mb-8">
          {isEditable ? (
            <InlineEditor
              field={data.title}
              value={data.title.value}
              onSave={(value) => onFieldUpdate('title', String(value))}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{
                fontFamily: themeStyles.fontSecondary,
                color: themeStyles.primary,
              }}
              template={template}
            />
          ) : (
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{
                fontFamily: themeStyles.fontSecondary,
                color: themeStyles.primary,
              }}
            >
              {data.title.value}
            </h2>
          )}
        </div>

        {/* Countdown Animado */}
        <WeddingCountdownAnimated 
          targetDate={data.targetDate.value}
          className="mb-8"
        />

        {/* Data do evento editável */}
        <div className="text-center">
          {isEditable ? (
            <InlineEditor
              field={data.targetDate}
              value={data.targetDate.value}
              onSave={(value) => onFieldUpdate('targetDate', String(value))}
              className="text-lg font-medium text-gray-600"
              style={{
                fontFamily: themeStyles.fontPrimary,
                color: themeStyles.textSecondary,
              }}
              template={template}
            />
          ) : (
            <p
              className="text-lg font-medium"
              style={{
                fontFamily: themeStyles.fontPrimary,
                color: themeStyles.textSecondary,
              }}
            >
              {new Date(data.targetDate.value).toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}
        </div>
      </div>
    </motion.section>
  );
} 