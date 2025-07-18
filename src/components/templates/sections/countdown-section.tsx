'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from 'react-countdown';
import { TemplateSection, WeddingTemplate, CountdownSectionData } from '@/types/template';
import { InlineEditor } from '../inline-editor';
import { getThemeStyles } from '@/lib/utils/theme-utils';
import { Heart, Calendar, Clock, Star, Sparkles, Zap, Timer, ArrowDown } from 'lucide-react';

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
            ${themeStyles.primary}08
          `,
          boxShadow: `
            0 20px 40px -12px ${themeStyles.primary}20,
            0 0 0 1px ${themeStyles.primary}15,
            inset 0 2px 0 rgba(255, 255, 255, 0.15),
            inset 0 -2px 0 rgba(0, 0, 0, 0.05)
          `
        }}
      >
        {/* Pulse Effect Ring */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 opacity-0"
          style={{ borderColor: themeStyles.primary }}
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
                backgroundColor: themeStyles.accent,
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
              ${themeStyles.primary}20 50%, 
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
            background: `radial-gradient(circle at center, ${themeStyles.primary}15 0%, transparent 70%)`,
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
                  color: themeStyles.primary,
                  textShadow: `0 4px 8px ${themeStyles.primary}20`,
                }}
                whileHover={{ 
                  scale: 1.1,
                  textShadow: `0 6px 12px ${themeStyles.primary}30`,
                }}
              >
                {unit.value.toString().padStart(2, '0')}
                
                {/* Number Reflection */}
                <span
                  className="absolute inset-0 opacity-20 blur-sm"
                  style={{
                    background: `linear-gradient(to bottom, ${themeStyles.primary}, transparent)`,
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
              color: themeStyles.textSecondary,
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
            style={{ backgroundColor: themeStyles.accent }}
            initial={{ width: 0, x: '-50%' }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Accent Elements */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.div 
            className="w-2 h-2 rounded-full opacity-60"
            style={{ backgroundColor: themeStyles.accent }}
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
              <Zap className="w-3 h-3 opacity-40" style={{ color: themeStyles.accent }} />
            </motion.div>
          )}
        </div>

        {/* Corner Accents */}
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 opacity-20 rounded-bl-lg"
             style={{ borderColor: themeStyles.primary }} />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 opacity-20 rounded-tr-lg"
             style={{ borderColor: themeStyles.primary }} />
      </div>

      {/* Card Shadow/Reflection */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          background: `linear-gradient(135deg, ${themeStyles.primary}05 0%, transparent 100%)`,
          transform: 'translateY(8px) scale(0.95)',
          filter: 'blur(8px)',
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
        backgroundColor: section.style.backgroundColor || themeStyles.background,
        color: section.style.textColor || themeStyles.text,
      }}
    >
      {/* 🌟 BACKGROUND MODERNO */}
      <div className="absolute inset-0">
                 {/* Background Base */}
         <div 
           className="absolute inset-0"
           style={{
             background: `${themeStyles.primary}03`
           }}
         />
        
                 {/* Floating Elements Modernos e Intuitivos */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {[...Array(12)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute"
               style={{
                 left: `${5 + Math.random() * 90}%`,
                 top: `${5 + Math.random() * 90}%`,
               }}
               animate={{
                 y: [0, -30 - Math.random() * 20, 0],
                 x: [0, 15 - Math.random() * 30, 0],
                 opacity: [0.1, 0.4, 0.1],
                 scale: [1, 1.3 + Math.random() * 0.5, 1],
                 rotate: [0, 180, 360],
               }}
               transition={{
                 duration: 10 + Math.random() * 8,
                 repeat: Infinity,
                 delay: Math.random() * 6,
                 ease: "easeInOut"
               }}
             >
               {i % 4 === 0 ? (
                 <Heart className="w-3 h-3" style={{ color: themeStyles.primary }} />
               ) : i % 4 === 1 ? (
                 <Star className="w-2 h-2" style={{ color: themeStyles.secondary }} />
               ) : i % 4 === 2 ? (
                 <Sparkles className="w-4 h-4" style={{ color: themeStyles.accent }} />
               ) : (
                 <motion.div
                   className="w-1 h-1 rounded-full"
                   style={{ backgroundColor: themeStyles.primary }}
                   animate={{
                     scale: [1, 2, 1],
                     opacity: [0.3, 0.8, 0.3],
                   }}
                   transition={{
                     duration: 2,
                     repeat: Infinity,
                     delay: Math.random() * 2
                   }}
                 />
               )}
             </motion.div>
           ))}
         </div>

         {/* Ambient Light Effects */}
         <motion.div
           className="absolute inset-0 opacity-20"
           animate={{
             background: [
               `radial-gradient(circle at 20% 30%, ${themeStyles.primary}10 0%, transparent 50%)`,
               `radial-gradient(circle at 80% 70%, ${themeStyles.secondary}10 0%, transparent 50%)`,
               `radial-gradient(circle at 50% 50%, ${themeStyles.accent}10 0%, transparent 50%)`,
               `radial-gradient(circle at 20% 30%, ${themeStyles.primary}10 0%, transparent 50%)`
             ]
           }}
           transition={{
             duration: 15,
             repeat: Infinity,
             ease: "easeInOut"
           }}
         />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${themeStyles.primary} 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
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
              {/* Background para Edição */}
              <div 
                className="absolute inset-0 rounded-2xl backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-4"
                style={{
                  background: `${themeStyles.primary}08`,
                  boxShadow: `0 8px 32px -8px ${themeStyles.primary}20`
                }}
              />
              
              <InlineEditor
                field={data.title}
                value={data.title.value}
                onSave={(value) => onFieldUpdate('title', String(value))}
                className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold"
                style={{
                  ...typography.title,
                  color: themeStyles.primary,
                  textShadow: `0 2px 4px ${themeStyles.primary}15`,
                }}
                template={template}
              />
              
              {/* Edit Indicator */}
              <motion.div
                className="absolute -top-3 -right-3 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: themeStyles.accent,
                  boxShadow: `0 2px 8px ${themeStyles.accent}40`
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
                color: themeStyles.primary,
                textShadow: `0 2px 4px ${themeStyles.primary}15`,
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
              <Timer className="w-6 h-6 opacity-70" style={{ color: themeStyles.primary }} />
              
              {/* Pulse Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 opacity-0"
                style={{ borderColor: themeStyles.primary }}
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
                      color: themeStyles.primary,
                    }}
                  >
                    Felizes para sempre!
                  </h3>
                  <p 
                    className="text-xl opacity-75"
                    style={{
                      ...typography.subtitle,
                      color: themeStyles.textSecondary,
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-12">
                {newTimeLeft.map((unit, index) => renderAnimatedNumber(unit, index))}
              </div>
            );
          }}
        />

                 {/* 💬 MENSAGEM DO COUNTDOWN COM EFEITOS MODERNOS */}
         {('message' in data && data.message?.value) && (
           <motion.div 
             className="text-center mb-12 relative"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6, duration: 0.6 }}
           >
             {/* Background Elegante para Edição */}
             <motion.div
               className="absolute inset-0 rounded-2xl backdrop-blur-md border border-white/20 -m-6"
               style={{
                 background: `
                                       linear-gradient(135deg, 
                      ${themeStyles.background || '#ffffff'}90 0%, 
                      ${themeStyles.background || '#f8fafc'}80 100%
                    )
                 `,
                 boxShadow: `
                   0 20px 40px -12px ${themeStyles.primary}15,
                   inset 0 1px 0 rgba(255, 255, 255, 0.2)
                 `
               }}
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.8, duration: 0.6 }}
             />

             {isEditable ? (
               <motion.div
                 className="relative z-10 group"
                 whileHover={{ scale: 1.03 }}
                 transition={{ duration: 0.3 }}
               >
                 <InlineEditor
                   field={data.message}
                   value={data.message.value}
                   onSave={(value) => onFieldUpdate('message', String(value))}
                   className="text-xl md:text-2xl font-medium px-4 py-2 rounded-xl"
                   style={{
                     ...typography.subtitle,
                                           color: themeStyles.text || themeStyles.primary,
                     textShadow: `0 1px 2px ${themeStyles.primary}10`,
                     background: 'transparent',
                     border: `2px dashed ${themeStyles.primary}30`,
                   }}
                   template={template}
                 />
                 
                 {/* Edit Hint */}
                 <motion.div
                   className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ color: themeStyles.textSecondary }}
                 >
                   <span className="text-xs font-medium bg-white/90 px-3 py-1 rounded-full shadow-sm">
                     Clique para editar
                   </span>
                 </motion.div>
               </motion.div>
             ) : (
               <motion.div 
                 className="relative z-10"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1, duration: 0.6 }}
               >
                 <motion.p
                   className="text-xl md:text-2xl font-medium opacity-90 relative"
                   style={{
                     ...typography.subtitle,
                     color: themeStyles.textSecondary,
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
                   {data.message.value}
                   
                   {/* Text Glow Effect */}
                   <motion.span
                     className="absolute inset-0 opacity-20 blur-sm"
                     style={{
                       color: themeStyles.primary,
                     }}
                     animate={{
                       opacity: [0.1, 0.3, 0.1],
                     }}
                     transition={{
                       duration: 3,
                       repeat: Infinity,
                       ease: "easeInOut"
                     }}
                   >
                     {data.message.value}
                   </motion.span>
                 </motion.p>

                 {/* Decorative Arrow */}
                 <motion.div
                   className="flex justify-center mt-4"
                   animate={{
                     y: [0, 8, 0],
                   }}
                   transition={{
                     duration: 2,
                     repeat: Infinity,
                     ease: "easeInOut"
                   }}
                 >
                   <ArrowDown 
                     className="w-5 h-5 opacity-40" 
                     style={{ color: themeStyles.primary }} 
                   />
                 </motion.div>
               </motion.div>
             )}
           </motion.div>
         )}

         {/* 📅 DATA DO EVENTO COM EDIÇÃO APRIMORADA */}
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
               {/* Background Editável */}
               <div 
                 className="absolute inset-0 rounded-xl backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-3"
                 style={{
                                       background: `${themeStyles.background || '#ffffff'}80`,
                   boxShadow: `0 8px 32px -8px ${themeStyles.primary}20`
                 }}
               />
               
               <InlineEditor
                 field={data.targetDate}
                 value={data.targetDate.value}
                 onSave={(value) => onFieldUpdate('targetDate', String(value))}
                 className="relative z-10 px-4 py-2 rounded-lg font-medium"
                 style={{
                   ...typography.subtitle,
                                       color: themeStyles.text || themeStyles.primary,
                   border: `1px solid ${themeStyles.primary}30`,
                   background: 'rgba(255, 255, 255, 0.5)',
                 }}
                 template={template}
               />
             </motion.div>
           ) : (
             <div className="flex items-center justify-center gap-3">
               <motion.div
                 animate={{ rotate: [0, 15, -15, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               >
                 <Clock className="w-5 h-5 opacity-60" style={{ color: themeStyles.primary }} />
               </motion.div>
               <p
                 className="text-lg md:text-xl font-medium"
                 style={{
                   ...typography.subtitle,
                   color: themeStyles.textSecondary,
                   textShadow: `0 1px 2px ${themeStyles.primary}10`,
                 }}
               >
                 {new Date(data.targetDate.value).toLocaleDateString('pt-BR', {
                   weekday: 'long',
                   year: 'numeric',
                   month: 'long',
                   day: 'numeric'
                 })}
               </p>
             </div>
           )}
         </motion.div>
      </div>
    </motion.section>
  );
} 