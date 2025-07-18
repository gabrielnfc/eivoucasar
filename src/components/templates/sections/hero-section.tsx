'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Heart, Calendar, MapPin, Sparkles } from 'lucide-react';
import { TemplateSection, WeddingTemplate, NewHeroSectionData } from '@/types/template';
import { InlineEditor } from '../inline-editor';
import { cn } from '@/lib/utils';
import { formatBrazilianDate, createBrazilianDate, temporalDebugInfo } from '@/lib/utils';
import { getThemeStyles } from '@/lib/utils/theme-utils';

interface HeroSectionProps {
  section: TemplateSection;
  template: WeddingTemplate;
  isEditable: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
}

// ✨ FONTES ELEGANTES POR TEMA
const getThemeTypography = (template: WeddingTemplate) => {
  const themeStyles = getThemeStyles(template);
  
  // Fontes mais elegantes e modernas baseadas no tema
  const typography = {
    couple: {
      fontFamily: "'Playfair Display', 'Georgia', serif",
      fontWeight: '700',
      letterSpacing: '0.02em',
      // ✨ SOMBRAS SUTIS E ELEGANTES
      textShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
    },
    subtitle: {
      fontFamily: "'Inter', 'Helvetica Neue', sans-serif", 
      fontWeight: '300',
      letterSpacing: '0.05em',
      // ✨ SOMBRA MAIS LEVE PARA SUBTÍTULOS
      textShadow: '0 1px 2px rgba(0,0,0,0.1)',
      filter: 'drop-shadow(0 0.5px 1px rgba(0,0,0,0.08))'
    },
    details: {
      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      fontWeight: '500',
      letterSpacing: '0.03em',
      // ✨ SOMBRA MÍNIMA PARA DETALHES
      textShadow: '0 1px 2px rgba(0,0,0,0.08)',
      filter: 'drop-shadow(0 0.5px 1px rgba(0,0,0,0.06))'
    }
  };

  return typography;
};

export function HeroSection({
  section,
  template,
  isEditable,
  onFieldUpdate
}: HeroSectionProps) {
  const data = section.data as NewHeroSectionData;
  const themeStyles = getThemeStyles(template);
  const typography = getThemeTypography(template);

  // ✅ FORMATAÇÃO INTELIGENTE DE DATA/HORA USANDO TEMPORAL API BRASILEIRA
  const formatWeddingDateTime = () => {
    try {
      const dateValue = data.weddingDate?.value;
      const timeValue = data.weddingTime?.value;
      
      if (!dateValue) return '';
      
      // Usar formatação brasileira da Temporal API
      const formattedDate = formatBrazilianDate(dateValue, {
        weekday: 'long',
        year: 'numeric', 
        month: 'long',
        day: 'numeric'
      });
      
      // Se há horário, incluir na formatação
      if (timeValue && timeValue.trim() !== '') {
        return `${formattedDate} às ${timeValue}`;
      }
      
      return formattedDate;
    } catch (error) {
      console.error('Erro ao formatar data/hora com Temporal API:', error);
      // Debug info no desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        temporalDebugInfo();
      }
      
      // Fallback: se formatação Temporal falha, usar valores brutos
      const dateValue = data.weddingDate?.value || '';
      const timeValue = data.weddingTime?.value || '';
      
      if (timeValue && timeValue.trim() !== '') {
        return `${dateValue} às ${timeValue}`;
      }
      
      return dateValue;
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  // ✅ ANIMAÇÃO DO CORAÇÃO RESTAURADA COM BATIMENTO
  const heartVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 10,
        delay: 1
      }
    },
    heartbeat: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const decorativeVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 10,
        delay: 1
      }
    }
  };

  return (
    <motion.section
      className="relative h-screen max-h-[900px] min-h-[600px] flex items-center justify-center overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {data.backgroundImage?.value ? (
          <motion.img
            src={data.backgroundImage.value}
            alt="Foto do casal"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
          />
        ) : (
          <div 
            className="w-full h-full bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200"
            style={{
              background: themeStyles.backgroundGradient
            }}
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Decorative Top Element - COM ANIMAÇÃO DO CORAÇÃO */}
        <motion.div
          className="mb-6 sm:mb-8"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full mb-4 sm:mb-6"
            style={{
              background: themeStyles.primaryGradient
            }}
            variants={heartVariants}
            animate={["visible", "heartbeat"]}
          >
            <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-current" />
          </motion.div>
        </motion.div>

        {/* 💍 NOMES COM TIPOGRAFIA ELEGANTE - ESPAÇAMENTO MAIOR */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
          {/* ✨ ORNAMENTOS ROMÂNTICOS ELEGANTES */}
          <div className="relative">
            {/* Ornamento Superior - COMPACTO */}
            <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-2 text-white/30">
                <div className="w-6 sm:w-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                <div className="w-6 sm:w-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              </div>
            </div>

            {/* Moldura Delicada - RESPONSIVA */}
            <div className="relative mx-auto max-w-3xl lg:max-w-4xl">
              {/* Cantos Ornamentais - MENORES */}
              <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-t-2 border-white/20 rounded-tl-lg"></div>
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-t-2 border-white/20 rounded-tr-lg"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-b-2 border-white/20 rounded-bl-lg"></div>
              <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-b-2 border-white/20 rounded-br-lg"></div>

              {/* Conteúdo dos Nomes - PADDING OTIMIZADO */}
              <div className="px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6">
                {isEditable ? (
                  <div className="space-y-2 sm:space-y-3">
                    <InlineEditor
                      field={data.brideName}
                      value={data.brideName.value}
                      onSave={(value) => onFieldUpdate('brideName', String(value))}
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold block"
                      style={{
                        ...typography.couple,
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                      template={template}
                    />
                    <div className="relative">
                      {/* Ornamento do & - COMPACTO */}
                      <div className="flex items-center justify-center gap-2 sm:gap-3 my-2 sm:my-3">
                        <div className="w-8 sm:w-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                        <div 
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light px-2 py-1 sm:px-3 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                          style={{
                            ...typography.subtitle,
                            color: '#f8f9fa'
                          }}
                        >
                          &
                        </div>
                        <div className="w-8 sm:w-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                      </div>
                    </div>
                    <InlineEditor
                      field={data.groomName}
                      value={data.groomName.value}
                      onSave={(value) => onFieldUpdate('groomName', String(value))}
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold block"
                      style={{
                        ...typography.couple,
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                      template={template}
                    />
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    <h1
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
                      style={{
                        ...typography.couple,
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {data.brideName.value}
                    </h1>
                    <div className="relative">
                      {/* Ornamento do & - COMPACTO */}
                      <div className="flex items-center justify-center gap-2 sm:gap-3 my-2 sm:my-3">
                        <div className="w-8 sm:w-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                        <div 
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light px-2 py-1 sm:px-3 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                          style={{
                            ...typography.subtitle,
                            color: '#f8f9fa'
                          }}
                        >
                          &
                        </div>
                        <div className="w-8 sm:w-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                      </div>
                    </div>
                    <h1
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
                      style={{
                        ...typography.couple,
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {data.groomName.value}
                    </h1>
                  </div>
                )}
              </div>
            </div>

            {/* Ornamento Inferior - COMPACTO */}
            <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-2 text-white/30">
                <div className="w-4 sm:w-6 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                <div className="flex gap-1">
                  <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white/40"></div>
                  <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white/40"></div>
                  <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white/40"></div>
                </div>
                <div className="w-4 sm:w-6 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Subtitle - MAIS ESPAÇO DOS NOMES */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-10">
          {data.subtitle && (
            <div className="max-w-xl sm:max-w-2xl mx-auto">
              {isEditable ? (
                <InlineEditor
                  field={data.subtitle}
                  value={data.subtitle.value}
                  onSave={(value) => onFieldUpdate('subtitle', String(value))}
                  className="text-base sm:text-lg md:text-xl font-light opacity-95 text-center"
                  style={{
                    ...typography.subtitle,
                    color: '#f8f9fa'
                  }}
                  template={template}
                />
              ) : (
                <p
                  className="text-base sm:text-lg md:text-xl font-light opacity-95 text-center"
                  style={{
                    ...typography.subtitle,
                    color: '#f8f9fa'
                  }}
                >
                  {data.subtitle.value}
                </p>
              )}
            </div>
          )}
        </motion.div>

        {/* 📅 INFORMAÇÕES DO CASAMENTO - ESPAÇO OTIMIZADO */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10"
        >
          {/* Data Formatada */}
          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md rounded-xl px-4 py-2 sm:px-6 sm:py-3 border border-white/20 shadow-lg">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
            {isEditable ? (
              <div className="flex items-center gap-2">
                <InlineEditor
                  field={data.weddingDate}
                  value={data.weddingDate.value}
                  onSave={(value) => onFieldUpdate('weddingDate', String(value))}
                  className="text-sm sm:text-base font-medium text-white"
                  style={{
                    ...typography.details
                  }}
                  template={template}
                />
                {data.weddingTime && (
                  <>
                    <span className="text-white/70 text-sm">às</span>
                    <InlineEditor
                      field={data.weddingTime}
                      value={data.weddingTime.value}
                      onSave={(value) => onFieldUpdate('weddingTime', String(value))}
                      className="text-sm sm:text-base font-medium text-white"
                      style={{
                        ...typography.details
                      }}
                      template={template}
                    />
                  </>
                )}
              </div>
            ) : (
              <span
                className="text-sm sm:text-base font-medium text-white"
                style={{
                  ...typography.details
                }}
              >
                {formatBrazilianDate(data.weddingDate?.value)}
              </span>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md rounded-xl px-4 py-2 sm:px-6 sm:py-3 border border-white/20 shadow-lg">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
            {isEditable ? (
              <InlineEditor
                field={data.location}
                value={data.location.value}
                onSave={(value) => onFieldUpdate('location', String(value))}
                className="text-sm sm:text-base font-medium text-white"
                style={{
                  ...typography.details
                }}
                template={template}
              />
            ) : (
              <span
                className="text-sm sm:text-base font-medium text-white"
                style={{
                  ...typography.details
                }}
              >
                {data.location.value}
              </span>
            )}
          </div>
        </motion.div>

        {/* CTA Button - ESPAÇAMENTO MAIOR DO SCROLL */}
        <motion.div 
          variants={itemVariants}
          className="mb-16 sm:mb-20"
        >
          <motion.a
            href="#invitation"
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-300"
            style={{
              background: themeStyles.primaryGradient,
              color: 'white',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              ...typography.details
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 15px 40px rgba(0,0,0,0.4)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Celebrar Conosco</span>
          </motion.a>
        </motion.div>

        {/* ✅ SCROLL INDICATOR - POSIÇÃO CORRIGIDA PARA NÃO SOBREPOR */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 sm:w-6 sm:h-10 rounded-full flex justify-center"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-0.5 h-2 sm:w-1 sm:h-3 bg-white/60 rounded-full mt-1 sm:mt-2"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-black/20 to-transparent" />
    </motion.section>
  );
} 