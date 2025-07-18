'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Sparkles, Quote, Star } from 'lucide-react';
import { TemplateSection, WeddingTemplate, InvitationSectionData } from '@/types/template';
import { InlineEditor } from '../inline-editor';
import { cn } from '@/lib/utils';
import { getThemeStyles } from '@/lib/utils/theme-utils';
import { ElegantSignature } from '@/components/ui/elegant-signature';

interface InvitationSectionProps {
  section: TemplateSection;
  template: WeddingTemplate;
  isEditable: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
}

// ✨ TIPOGRAFIA ULTRA-MODERNA 2025 ELEGANTE
const getModernTypography = (template: WeddingTemplate) => {
  const themeStyles = getThemeStyles(template);
  
  return {
    title: {
      fontFamily: "'Playfair Display', 'Georgia', serif",
      fontWeight: '300',
      letterSpacing: '-0.02em',
      lineHeight: '1.1',
    },
    message: {
      fontFamily: "'Inter', 'system-ui', sans-serif", 
      fontWeight: '300',
      letterSpacing: '0.005em',
      lineHeight: '1.7',
    },
    formal: {
      fontFamily: "'Inter', 'system-ui', sans-serif",
      fontWeight: '400',
      letterSpacing: '0.01em',
      lineHeight: '1.6',
    },
    // 🎭 TIPOGRAFIA DISCURSIVA NATURAL
    signature: {
      fontFamily: "'Caveat', 'Dancing Script', cursive",
      fontWeight: '400',
      letterSpacing: '0.02em',
      lineHeight: '1.4',
      fontStyle: 'normal',
      textTransform: 'none' as const,
    }
  };
};

export function InvitationSection({
  section,
  template,
  isEditable,
  onFieldUpdate
}: InvitationSectionProps) {
  const data = section.data as InvitationSectionData;
  const themeStyles = getThemeStyles(template);
  const typography = getModernTypography(template);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  };

  return (
    <motion.section
      id="invitation"
      className="relative min-h-screen flex items-center justify-center py-16 sm:py-20 lg:py-28 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      variants={containerVariants}
      style={{
        backgroundColor: section.style.backgroundColor || themeStyles.background,
        color: section.style.textColor || themeStyles.text,
      }}
    >
      {/* 🌌 BACKGROUND PREMIUM ULTRA-ELEGANTE */}
      <div className="absolute inset-0">
        {/* Gradient Base Sofisticado */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 20% 20%, ${themeStyles.primary}04 0%, transparent 60%), 
              radial-gradient(ellipse 100% 90% at 80% 80%, ${themeStyles.secondary}03 0%, transparent 50%),
              linear-gradient(135deg, ${themeStyles.primary}01 0%, transparent 40%, ${themeStyles.secondary}02 100%)
            `
          }}
        />
        
        {/* Noise Texture Refinada */}
        <div 
          className="absolute inset-0 opacity-[0.012] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Floating Elements - Luxuosos */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${10 + Math.random() * 80}%`,
                width: `${150 + Math.random() * 200}px`,
                height: `${150 + Math.random() * 200}px`,
                background: `radial-gradient(circle, ${themeStyles.primary}${i % 2 === 0 ? '02' : '01'} 0%, transparent 70%)`,
                filter: 'blur(1px)',
              }}
              animate={{
                x: [0, 20, 0],
                y: [0, -30, 0],
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 25 + Math.random() * 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Glow Effects Luxuosos */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${themeStyles.primary} 0%, transparent 70%)`,
            }}
          />
          <div 
            className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full opacity-5 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${themeStyles.secondary} 0%, transparent 70%)`,
            }}
          />
        </div>
      </div>

      {/* 📱 CONTAINER PRINCIPAL - VIEWPORT OTIMIZADO */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 🎭 LAYOUT PRINCIPAL - ASSIMÉTRICO MODERNO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* COLUNA ESQUERDA - ÍCONE + TÍTULO */}
          <div className="lg:col-span-7 lg:col-start-1">
            
            {/* 💌 ÍCONE GLASSMORPHISM PREMIUM */}
            <motion.div
              className="mb-8 lg:mb-12 flex justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.div
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Multi-layer Glow */}
                <div 
                  className="absolute inset-0 rounded-full opacity-20 blur-xl animate-pulse"
                  style={{
                    background: `radial-gradient(circle, ${themeStyles.primary} 0%, transparent 70%)`,
                    transform: 'scale(1.8)'
                  }}
                />
                <div 
                  className="absolute inset-0 rounded-full opacity-10 blur-2xl"
                  style={{
                    background: `radial-gradient(circle, ${themeStyles.secondary} 0%, transparent 70%)`,
                    transform: 'scale(2.2)'
                  }}
                />
                
                {/* Glassmorphism Icon Premium */}
                <div
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center backdrop-blur-xl border-2 border-white/10"
                  style={{
                    background: `linear-gradient(135deg, 
                      ${themeStyles.primary}18 0%, 
                      ${themeStyles.primary}08 50%, 
                      ${themeStyles.secondary}05 100%
                    )`,
                    boxShadow: `
                      0 12px 40px ${themeStyles.primary}25, 
                      inset 0 1px 0 rgba(255,255,255,0.15),
                      0 0 0 1px ${themeStyles.primary}08
                    `
                  }}
                >
                  <Mail className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: themeStyles.primary }} />
                  
                  {/* Sparkle Effect */}
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360] 
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="w-4 h-4 opacity-40" style={{ color: themeStyles.secondary }} />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* 🎭 TÍTULO ELEGANTE */}
            <motion.div
              className="mb-8 lg:mb-10 text-center lg:text-left"
              variants={itemVariants}
            >
              {isEditable ? (
                <InlineEditor
                  field={data.title}
                  value={data.title.value}
                  onSave={(value) => onFieldUpdate('title', String(value))}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light leading-[0.9] tracking-tighter bg-gradient-to-br from-current via-current to-current/80 bg-clip-text"
                  style={{
                    ...typography.title,
                    color: themeStyles.text,
                  }}
                  template={template}
                />
              ) : (
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light leading-[0.9] tracking-tighter bg-gradient-to-br from-current via-current to-current/80 bg-clip-text"
                  style={{
                    ...typography.title,
                    color: themeStyles.text,
                  }}
                >
                  {data.title.value}
                </h1>
              )}
            </motion.div>

            {/* 💬 MENSAGEM ELEGANTE */}
            <motion.div
              className="mb-8 lg:mb-12 text-center lg:text-left"
              variants={itemVariants}
            >
              <div className="max-w-2xl lg:max-w-none">
                {isEditable ? (
                  <InlineEditor
                    field={data.message}
                    value={data.message.value}
                    onSave={(value) => onFieldUpdate('message', String(value))}
                    className="text-lg sm:text-xl lg:text-2xl opacity-85 leading-relaxed"
                    style={{
                      ...typography.message,
                      color: themeStyles.textSecondary,
                    }}
                    template={template}
                  />
                ) : (
                  <div
                    className="text-lg sm:text-xl lg:text-2xl opacity-85 leading-relaxed"
                    style={{
                      ...typography.message,
                      color: themeStyles.textSecondary,
                    }}
                    dangerouslySetInnerHTML={{ __html: data.message.value }}
                  />
                )}
              </div>
            </motion.div>
          </div>

          {/* COLUNA DIREITA - CONVITE FORMAL GLASSMORPHISM */}
          <div className="lg:col-span-5 lg:col-start-8 flex justify-center">
            <motion.div
              className="w-full max-w-lg"
              variants={itemVariants}
            >
              {/* 🔮 CARD GLASSMORPHISM ULTRA-PREMIUM */}
              <div
                className="relative backdrop-blur-2xl rounded-3xl p-8 sm:p-10 lg:p-12 border border-white/10"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(255,255,255,0.12) 0%, 
                    rgba(255,255,255,0.06) 50%, 
                    rgba(255,255,255,0.02) 100%
                  )`,
                  boxShadow: `
                    0 20px 50px rgba(0,0,0,0.15),
                    inset 0 1px 0 rgba(255,255,255,0.15),
                    0 0 0 1px ${themeStyles.primary}12
                  `
                }}
              >
                {/* Glow interno premium */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-40 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 30% 20%, ${themeStyles.primary}06 0%, transparent 50%)`
                  }}
                />

                {/* 🎨 ORNAMENTOS MODERNOS */}
                <div className="absolute top-8 left-8 opacity-[0.08]">
                  <Star className="w-6 h-6" style={{ color: themeStyles.primary }} />
                </div>
                <div className="absolute top-8 right-8 opacity-[0.08]">
                  <Sparkles className="w-6 h-6" style={{ color: themeStyles.primary }} />
                </div>

                <div className="relative text-center">
                  {/* Quote Visual Elegante */}
                  <motion.div
                    className="mb-8 flex justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.3 }}
                  >
                    <Quote className="w-10 h-10 opacity-25" style={{ color: themeStyles.primary }} />
                  </motion.div>

                  {/* Mensagem Formal Premium */}
                  {isEditable ? (
                    <InlineEditor
                      field={data.formalMessage}
                      value={data.formalMessage.value}
                      onSave={(value) => onFieldUpdate('formalMessage', String(value))}
                      className="text-base sm:text-lg lg:text-xl leading-relaxed mb-10 opacity-90"
                      style={{
                        ...typography.formal,
                        color: themeStyles.text,
                      }}
                      template={template}
                    />
                  ) : (
                    <p
                      className="text-base sm:text-lg lg:text-xl leading-relaxed mb-10 opacity-90"
                      style={{
                        ...typography.formal,
                        color: themeStyles.text,
                      }}
                    >
                      {data.formalMessage.value}
                    </p>
                  )}

                  {/* 🎭 SEPARADOR ELEGANTE */}
                  <div className="flex items-center justify-center gap-6 mb-12">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-25" style={{ color: themeStyles.primary }} />
                    <motion.div
                      animate={{ 
                        scale: [1, 1.15, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Heart className="w-5 h-5 opacity-50" style={{ color: themeStyles.primary }} />
                    </motion.div>
                    <div className="w-16 h-px bg-gradient-to-l from-transparent via-current to-transparent opacity-25" style={{ color: themeStyles.primary }} />
                  </div>

                  {/* 🎭 ASSINATURA ELEGANTE MANUSCRITA */}
                  {isEditable ? (
                    <div className="group">
                      <InlineEditor
                        field={data.signature}
                        value={data.signature.value}
                        onSave={(value) => onFieldUpdate('signature', String(value))}
                        className="opacity-0 absolute pointer-events-none"
                        template={template}
                      />
                      <ElegantSignature
                        coupleName={data.signature.value}
                        style="modern"
                        size="lg"
                        color={themeStyles.primary}
                        animated={true}
                        showInk={false}
                        className="group-hover:opacity-80 transition-opacity duration-300"
                      />
                    </div>
                  ) : (
                    <ElegantSignature
                      coupleName={data.signature.value}
                      style="modern"
                      size="lg"
                      color={themeStyles.primary}
                      animated={true}
                      showInk={false}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 🎭 FOOTER ELEGANTE */}
        <motion.div
          className="text-center mt-20 lg:mt-32"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center gap-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-current opacity-15" style={{ color: themeStyles.primary }} />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.7, 0.4],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart 
                className="w-6 h-6"
                style={{ color: themeStyles.primary, opacity: 0.5 }}
              />
            </motion.div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-current opacity-15" style={{ color: themeStyles.primary }} />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
} 