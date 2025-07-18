'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from 'react-countdown';
import { TemplateSection, WeddingTemplate, CountdownSectionData } from '@/types/template';
import { InlineEditor } from '../inline-editor';
import { getThemeStyles } from '@/lib/utils/theme-utils';
import { Heart, Calendar, Clock, Star, Sparkles, Zap, Timer } from 'lucide-react';
// import Lottie from 'lottie-react';
// import heartAnimation from '@/public/animations/heart-floating.json';

interface CountdownSectionProps {
  section: TemplateSection;
  template: WeddingTemplate;
  isEditable: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
}

interface TimeUnit {
  value: number;
  label: string;
  prevValue?: number;
}

const getModernTypography = (theme: any) => ({
  title: {
    fontFamily: "'Playfair Display', 'Georgia', serif",
    fontWeight: '600',
    letterSpacing: '-0.02em',
    lineHeight: '1.2',
  },
  subtitle: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontWeight: '400',
    letterSpacing: '0.01em',
    lineHeight: '1.5',
  },
  counter: {
    fontFamily: "'Playfair Display', 'Georgia', serif",
    fontWeight: '700',
    letterSpacing: '-0.02em',
    lineHeight: '1',
  },
  label: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontWeight: '500',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  },
  // ✨ NOVA: Tipografia elegante para data
  date: {
    fontFamily: "'Playfair Display', 'Georgia', serif",
    fontWeight: '500',
    letterSpacing: '-0.01em',
    lineHeight: '1.4',
  },
  // ✨ NOVA: Tipografia para frase romântica
  romantic: {
    fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
    fontWeight: '600',
    letterSpacing: '0.02em',
    lineHeight: '1.3',
  }
});

export function CountdownSection({
  section,
  template,
  isEditable,
  onFieldUpdate
}: CountdownSectionProps) {
  const data = section.data as CountdownSectionData;
  const themeStyles = getThemeStyles(template);
  const typography = getModernTypography(themeStyles);

  // ✨ GARANTIR CORES NEUTRAS E ELEGANTES
  const neutralThemeStyles = {
    ...themeStyles,
    // Forçar cores mais neutras e elegantes
    primary: themeStyles.primary || '#2d3748',
    secondary: themeStyles.secondary || '#4a5568', 
    accent: themeStyles.accent && !themeStyles.accent.includes('#ed7a5e') ? themeStyles.accent : '#6b7280',
    background: '#ffffff',
    text: themeStyles.text || '#1a202c',
    textSecondary: themeStyles.textSecondary || '#4a5568'
  };

  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([
    { value: 0, label: 'DIAS' },
    { value: 0, label: 'HORAS' },
    { value: 0, label: 'MINUTOS' },
    { value: 0, label: 'SEGUNDOS' }
  ]);

  // 🎯 CRIAR DATA CORRETA COM TIMEZONE BRASILEIRO
  const getWeddingDateTime = () => {
    try {
      let targetDateTime: Date;
      
      if (data.targetDate.value.includes('T') || data.targetDate.value.includes(' ')) {
        targetDateTime = new Date(data.targetDate.value);
      } else {
        // Usar data do casamento com horário padrão 19:00 (timezone brasileiro)
        const [year, month, day] = data.targetDate.value.split('-').map(Number);
        targetDateTime = new Date(year, month - 1, day, 19, 0, 0);
      }
      
      return targetDateTime;
    } catch (error) {
      console.error('Erro ao processar data do casamento:', error);
      return new Date();
    }
  };

    // ✨ RENDERIZAR NÚMERO COM EFEITOS MODERNOS E INTUITIVOS
  const renderAnimatedNumber = (unit: TimeUnit, index: number) => (
    <motion.div
      key={unit.label}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 120,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      {/* Card Container com Glass Morphism Avançado */}
      <div 
        className="relative overflow-hidden rounded-3xl backdrop-blur-xl p-8 border border-white/20 shadow-2xl"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(255, 255, 255, 0.1) 0%, 
              rgba(255, 255, 255, 0.05) 50%, 
              rgba(255, 255, 255, 0.02) 100%
            ), 
            ${neutralThemeStyles.primary}08
          `,
          boxShadow: `
            0 20px 40px -12px ${neutralThemeStyles.primary}20,
            0 0 0 1px ${neutralThemeStyles.primary}15,
            inset 0 2px 0 rgba(255, 255, 255, 0.15),
            inset 0 -2px 0 rgba(0, 0, 0, 0.05)
          `
        }}
      >
        {/* Pulse Effect Ring */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 opacity-0"
          style={{ borderColor: neutralThemeStyles.primary }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.5
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-40"
              style={{ 
                backgroundColor: neutralThemeStyles.accent,
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 5, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Shimmer Wave Effect */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              ${neutralThemeStyles.primary}20 50%, 
              transparent 100%
            )`,
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />

        {/* Interactive Glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${neutralThemeStyles.primary}15 0%, transparent 70%)`,
          }}
        />

        {/* Number Display com Flip 3D Animation */}
        <div className="relative h-20 overflow-hidden mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={unit.value}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ 
                rotateX: unit.prevValue !== undefined ? (unit.value > (unit.prevValue || 0) ? -90 : 90) : 0,
                opacity: 0,
                scale: 0.8
              }}
              animate={{ 
                rotateX: 0, 
                opacity: 1,
                scale: 1
              }}
              exit={{ 
                rotateX: unit.value > (unit.prevValue || 0) ? 90 : -90,
                opacity: 0,
                scale: 0.8
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.8
              }}
              style={{ perspective: '1000px' }}
            >
              <motion.span 
                className="text-5xl md:text-6xl font-bold relative"
                style={{
                  ...typography.counter,
                  color: neutralThemeStyles.primary,
                  textShadow: `0 4px 8px ${neutralThemeStyles.primary}20`,
                }}
                whileHover={{ 
                  scale: 1.1,
                  textShadow: `0 6px 12px ${neutralThemeStyles.primary}30`,
                }}
              >
                {unit.value.toString().padStart(2, '0')}
                
                {/* Number Reflection */}
                <span
                  className="absolute inset-0 opacity-20 blur-sm"
                  style={{
                    background: `linear-gradient(to bottom, ${neutralThemeStyles.primary}, transparent)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {unit.value.toString().padStart(2, '0')}
                </span>
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Label com Microinteração */}
        <motion.div 
          className="text-center relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <motion.span 
            className="text-sm md:text-base font-medium opacity-80 tracking-wider"
            style={{
              ...typography.label,
              color: neutralThemeStyles.textSecondary,
            }}
            whileHover={{ 
              opacity: 1,
              scale: 1.05,
              y: -2
            }}
          >
            {unit.label}
          </motion.span>

          {/* Label Underline Effect */}
          <motion.div
            className="absolute bottom-0 left-1/2 h-0.5 bg-current opacity-0 group-hover:opacity-100"
            style={{ backgroundColor: neutralThemeStyles.accent }}
            initial={{ width: 0, x: '-50%' }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Accent Elements */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.div 
            className="w-2 h-2 rounded-full opacity-60"
            style={{ backgroundColor: neutralThemeStyles.accent }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3
            }}
          />
          {index === 3 && ( // Apenas no último (segundos)
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-3 h-3 opacity-40" style={{ color: neutralThemeStyles.accent }} />
            </motion.div>
          )}
        </div>

        {/* Corner Accents */}
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 opacity-20 rounded-bl-lg"
             style={{ borderColor: neutralThemeStyles.primary }} />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 opacity-20 rounded-tr-lg"
             style={{ borderColor: neutralThemeStyles.primary }} />
      </div>

      {/* Card Shadow/Reflection */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          background: `linear-gradient(135deg, ${neutralThemeStyles.primary}05 0%, transparent 100%)`,
          transform: 'translateY(8px) scale(0.95)',
        }}
      />
    </motion.div>
  );

  return (
    <motion.section
      className="relative py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      style={{
        backgroundColor: '#ffffff',
        color: section.style.textColor || neutralThemeStyles.text,
      }}
    >
      {/* 🌟 BACKGROUND MODERNO HARMONIZADO COM TEMAS */}
      <div className="absolute inset-0">
        {/* Background Base Harmonizado */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, 
                ${themeStyles.background || '#ffffff'} 0%,
                ${themeStyles.background || '#f8fafc'} 100%
              )
            `
          }}
        />
        
        {/* Overlay Pattern Harmonizado */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, ${neutralThemeStyles.primary} 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, ${neutralThemeStyles.secondary} 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 90px 90px'
          }}
        />

        {/* Tema-Specific Accent Elements - Muito Sutis */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
                     style={{
             background: `
               radial-gradient(ellipse 800px 600px at 20% 40%, ${neutralThemeStyles.primary}08 0%, transparent 50%),
               radial-gradient(ellipse 600px 800px at 80% 60%, ${neutralThemeStyles.secondary}05 0%, transparent 50%)
             `
           }}
          animate={{
            opacity: [0.02, 0.04, 0.02],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating Elements Harmonizados com Tema */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
              }}
              animate={{
                y: [0, -50 - Math.random() * 30, 0],
                x: [0, 25 - Math.random() * 50, 0],
                opacity: [0.05, 0.15, 0.05],
                scale: [1, 1.3 + Math.random() * 0.3, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20 + Math.random() * 15,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "easeInOut"
              }}
            >
              {i % 3 === 0 ? (
                <Heart className="w-3 h-3" style={{ color: neutralThemeStyles.primary, opacity: 0.3 }} />
                // ✨ OPÇÃO COM LOTTIE (comentado para não quebrar o build):
                // <Lottie 
                //   animationData={heartAnimation} 
                //   className="w-8 h-8"
                //   style={{ filter: `hue-rotate(${i * 45}deg)` }}
                // />
              ) : i % 3 === 1 ? (
                <Sparkles className="w-2 h-2" style={{ color: neutralThemeStyles.secondary, opacity: 0.25 }} />
              ) : (
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: neutralThemeStyles.accent || neutralThemeStyles.primary, opacity: 0.2 }}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: Math.random() * 4
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* ✨ TÍTULO ELEGANTE COM EDIÇÃO MELHORADA */}
        <div className="text-center mb-16">
          {isEditable ? (
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >

              
              <InlineEditor
                field={data.title}
                value={data.title.value}
                onSave={(value) => onFieldUpdate('title', String(value))}
                className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold"
                style={{
                  ...typography.title,
                  color: neutralThemeStyles.primary,
                  textShadow: `0 2px 4px ${neutralThemeStyles.primary}15`,
                  fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Georgia', serif",
                  fontWeight: '600',
                  letterSpacing: '-0.02em',
                }}
                template={template}
              />
              
              {/* Edit Indicator */}
              <motion.div
                className="absolute -top-3 -right-3 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                style={{
                  background: neutralThemeStyles.accent,
                  boxShadow: `0 2px 8px ${neutralThemeStyles.accent}40`
                }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{
                ...typography.title,
                color: neutralThemeStyles.primary,
                textShadow: `0 2px 4px ${neutralThemeStyles.primary}15`,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {data.title.value}
            </motion.h2>
          )}

          {/* Subtitle Decorativo Moderno */}
          <motion.div 
            className="flex items-center justify-center gap-6 mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div 
              className="h-px bg-current w-20 opacity-30 relative"
              animate={{
                scaleX: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="relative"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Timer className="w-6 h-6 opacity-70" style={{ color: neutralThemeStyles.primary }} />
              
              {/* Pulse Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 opacity-0"
                style={{ borderColor: neutralThemeStyles.primary }}
                animate={{
                  scale: [1, 2],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            </motion.div>
            
            <motion.div 
              className="h-px bg-current w-20 opacity-30"
              animate={{
                scaleX: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            />
          </motion.div>
        </div>

        {/* ⏰ COUNTDOWN MODERNO COM REACT-COUNTDOWN */}
        <Countdown
          date={getWeddingDateTime()}
          renderer={({ days, hours, minutes, seconds, completed }) => {
            if (completed) {
              return (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    className="text-8xl mb-6"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    💍
                  </motion.div>
                  <h3 
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{
                      ...typography.title,
                      color: neutralThemeStyles.primary,
                    }}
                  >
                    Felizes para sempre!
                  </h3>
                  <p 
                    className="text-xl opacity-75"
                    style={{
                      ...typography.subtitle,
                      color: neutralThemeStyles.textSecondary,
                    }}
                  >
                    O casamento já aconteceu e foi maravilhoso! 💕
                  </p>
                </motion.div>
              );
            }

            // Atualizar state para animações
            const newTimeLeft = [
              { value: days, label: 'DIAS' },
              { value: hours, label: 'HORAS' },
              { value: minutes, label: 'MINUTOS' },
              { value: seconds, label: 'SEGUNDOS' }
            ];

            return (
              <>
                {/* Countdown Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-8">
                  {newTimeLeft.map((unit, index) => renderAnimatedNumber(unit, index))}
                </div>

                {/* ✨ NOVA: Frase Romântica Embaixo da Contagem */}
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <motion.div
                    className="relative inline-block"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                                         {/* Background Decorativo */}
                     <motion.div
                       className="absolute inset-0 rounded-2xl opacity-80 -m-4 z-0"
                       style={{
                         background: `
                           linear-gradient(135deg, 
                             ${neutralThemeStyles.primary}08 0%, 
                             ${neutralThemeStyles.secondary}06 50%,
                             ${neutralThemeStyles.accent || neutralThemeStyles.primary}04 100%
                           )
                         `,
                         backdropFilter: 'blur(10px)',
                         border: `1px solid ${neutralThemeStyles.primary}20`
                       }}
                                             animate={{
                         background: [
                           `linear-gradient(135deg, ${neutralThemeStyles.primary}08 0%, ${neutralThemeStyles.secondary}06 50%, ${neutralThemeStyles.accent || neutralThemeStyles.primary}04 100%)`,
                           `linear-gradient(135deg, ${neutralThemeStyles.secondary}06 0%, ${neutralThemeStyles.accent || neutralThemeStyles.primary}04 50%, ${neutralThemeStyles.primary}08 100%)`,
                           `linear-gradient(135deg, ${neutralThemeStyles.primary}08 0%, ${neutralThemeStyles.secondary}06 50%, ${neutralThemeStyles.accent || neutralThemeStyles.primary}04 100%)`
                         ]
                       }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    <motion.p
                      className="relative z-10 text-2xl md:text-3xl lg:text-4xl px-6 py-3"
                                             style={{
                         ...typography.romantic,
                         color: neutralThemeStyles.primary,
                         textShadow: `0 2px 8px ${neutralThemeStyles.primary}20`,
                       }}
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      dias para o{' '}
                      <motion.span
                                                 style={{ 
                           color: neutralThemeStyles.accent || neutralThemeStyles.secondary,
                           fontWeight: '700'
                         }}
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        "sim, eu aceito"
                      </motion.span>
                    </motion.p>

                                         {/* Decorative Hearts */}
                     <motion.div
                       className="absolute -top-2 -left-2 z-20"
                       animate={{
                         rotate: [0, 15, -15, 0],
                         scale: [1, 1.2, 1],
                       }}
                       transition={{
                         duration: 3,
                         repeat: Infinity,
                         ease: "easeInOut"
                       }}
                     >
                       <Heart 
                         className="w-4 h-4 fill-current" 
                         style={{ color: neutralThemeStyles.accent || neutralThemeStyles.primary }}
                       />
                     </motion.div>

                     <motion.div
                       className="absolute -bottom-2 -right-2 z-20"
                       animate={{
                         rotate: [0, -15, 15, 0],
                         scale: [1, 1.2, 1],
                       }}
                       transition={{
                         duration: 3,
                         repeat: Infinity,
                         ease: "easeInOut",
                         delay: 1.5
                       }}
                     >
                       <Heart 
                         className="w-4 h-4 fill-current" 
                         style={{ color: neutralThemeStyles.accent || neutralThemeStyles.primary }}
                       />
                     </motion.div>
                  </motion.div>
                </motion.div>
              </>
            );
          }}
        />



         {/* �� DATA DO EVENTO COM TIPOGRAFIA MODERNA E ELEGANTE */}
         <motion.div 
           className="text-center"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8, duration: 0.6 }}
         >
           {isEditable ? (
             <motion.div 
               className="relative group inline-block"
               whileHover={{ scale: 1.05 }}
               transition={{ duration: 0.2 }}
             >
               {/* Background Editável Elegante */}
               <div 
                 className="absolute inset-0 rounded-xl backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-4"
                 style={{
                                       background: `
                      linear-gradient(135deg, 
                        ${neutralThemeStyles.background || '#ffffff'}95 0%, 
                        ${neutralThemeStyles.primary}10 100%
                      )
                    `,
                    boxShadow: `0 8px 32px -8px ${neutralThemeStyles.primary}25`
                 }}
               />
               
               <InlineEditor
                 field={data.targetDate}
                 value={data.targetDate.value}
                 onSave={(value) => onFieldUpdate('targetDate', String(value))}
                 className="relative z-10 px-6 py-3 rounded-lg font-medium"
                 style={{
                   ...typography.date, // ✨ NOVA tipografia elegante
                                     color: neutralThemeStyles.primary,
                  border: `2px solid ${neutralThemeStyles.primary}30`,
                  background: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '1.25rem',
                  textShadow: `0 1px 3px ${neutralThemeStyles.primary}15`,
                 }}
                 template={template}
               />
             </motion.div>
           ) : (
             <motion.div 
               className="flex items-center justify-center gap-4 relative"
               whileHover={{ scale: 1.02 }}
               transition={{ duration: 0.3 }}
             >
                               {/* Background Decorativo */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-60 -m-6 z-0"
                  style={{
                    background: `
                      linear-gradient(135deg, 
                        ${neutralThemeStyles.primary}08 0%, 
                        ${neutralThemeStyles.secondary}06 50%,
                        transparent 100%
                      )
                    `,
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${neutralThemeStyles.primary}15`
                  }}
                 animate={{
                   opacity: [0.4, 0.7, 0.4],
                 }}
                 transition={{
                   duration: 6,
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
               />

               <motion.div
                 className="relative z-10"
                 animate={{ rotate: [0, 15, -15, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               >
                 <Calendar className="w-6 h-6 opacity-70" style={{ color: neutralThemeStyles.primary }} />
               </motion.div>

               <motion.p
                 className="relative z-10 text-xl md:text-2xl lg:text-3xl font-medium px-4"
                 style={{
                   ...typography.date, // ✨ NOVA tipografia elegante
                   color: neutralThemeStyles.primary,
                   textShadow: `0 2px 6px ${neutralThemeStyles.primary}20`,
                 }}
                 animate={{
                   y: [0, -2, 0],
                 }}
                 transition={{
                   duration: 4,
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
               >
                 {new Date(data.targetDate.value).toLocaleDateString('pt-BR', {
                   weekday: 'long',
                   year: 'numeric',
                   month: 'long',
                   day: 'numeric'
                 })}
               </motion.p>

                               {/* Sparkle Effect */}
                <motion.div
                  className="absolute top-0 right-0 z-20"
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles 
                    className="w-5 h-5" 
                    style={{ color: neutralThemeStyles.accent || neutralThemeStyles.secondary }}
                  />
                </motion.div>
             </motion.div>
           )}
         </motion.div>
      </div>
    </motion.section>
  );
} 