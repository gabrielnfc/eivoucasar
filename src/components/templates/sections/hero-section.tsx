'use client';

import React, { useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { Heart, Camera, Upload, X, Calendar, MapPin, Sparkles } from 'lucide-react';
import { TemplateSection, WeddingTemplate, NewHeroSectionData } from '@/types/template';
import { InlineEditor } from '../inline-editor';
import { cn } from '@/lib/utils';
import { getThemeStyles } from '@/lib/utils/theme-utils';

interface HeroSectionProps {
  section: TemplateSection;
  template: WeddingTemplate;
  isEditable: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
}

export function HeroSection({
  section,
  template,
  isEditable,
  onFieldUpdate
}: HeroSectionProps) {
  const data = section.data as NewHeroSectionData;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const themeStyles = getThemeStyles(template);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'hero-background');
      
      // Upload to API (implementar depois)
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // Por enquanto, usar URL temporária para preview
      const imageUrl = URL.createObjectURL(file);
      onFieldUpdate('backgroundImage', imageUrl);
      
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
    } finally {
      setIsUploading(false);
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
    }
  };

  return (
    <motion.section
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Upload Button (Editor Mode) */}
      {isEditable && (
        <motion.div
          className="absolute top-6 right-6 z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <motion.button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={cn(
              "group relative flex items-center gap-2 px-4 py-2 rounded-full",
              "bg-white/90 backdrop-blur-sm border border-white/20",
              "text-gray-700 font-medium text-sm",
              "hover:bg-white hover:shadow-lg transition-all duration-300",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isUploading ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" />
                <span>{data.backgroundImage?.value ? 'Alterar Foto' : 'Adicionar Foto'}</span>
              </>
            )}
          </motion.button>
        </motion.div>
      )}

      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-3 h-3" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        
        {/* Decorative Top Element */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
            style={{
              background: themeStyles.primaryGradient
            }}
            variants={heartVariants}
            whileHover={{ scale: 1.1, rotate: 15 }}
          >
            <Heart className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>

        {/* Names */}
        <motion.div variants={itemVariants} className="mb-6">
          {isEditable ? (
            <div className="space-y-2">
              <InlineEditor
                field={data.brideName}
                value={data.brideName.value}
                onSave={(value) => onFieldUpdate('brideName', String(value))}
                className="text-3xl md:text-5xl lg:text-7xl font-bold block"
                style={{
                  fontFamily: themeStyles.fontAccent,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
                template={template}
              />
              <div 
                className="text-2xl md:text-4xl lg:text-5xl font-light"
                style={{
                  fontFamily: themeStyles.fontPrimary,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                &
              </div>
              <InlineEditor
                field={data.groomName}
                value={data.groomName.value}
                onSave={(value) => onFieldUpdate('groomName', String(value))}
                className="text-3xl md:text-5xl lg:text-7xl font-bold block"
                style={{
                  fontFamily: themeStyles.fontAccent,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
                template={template}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <h1
                className="text-3xl md:text-5xl lg:text-7xl font-bold"
                style={{
                  fontFamily: themeStyles.fontAccent,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {data.brideName.value}
              </h1>
              <div 
                className="text-2xl md:text-4xl lg:text-5xl font-light"
                style={{
                  fontFamily: themeStyles.fontPrimary,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                &
              </div>
              <h1
                className="text-3xl md:text-5xl lg:text-7xl font-bold"
                style={{
                  fontFamily: themeStyles.fontAccent,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {data.groomName.value}
              </h1>
            </div>
          )}
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants} className="mb-8">
          {data.subtitle && (
            <>
              {isEditable ? (
                <InlineEditor
                  field={data.subtitle}
                  value={data.subtitle.value}
                  onSave={(value) => onFieldUpdate('subtitle', String(value))}
                  className="text-lg md:text-xl font-light opacity-90"
                  style={{
                    fontFamily: themeStyles.fontPrimary,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}
                  template={template}
                />
              ) : (
                <p
                  className="text-lg md:text-xl font-light opacity-90"
                  style={{
                    fontFamily: themeStyles.fontPrimary,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  {data.subtitle.value}
                </p>
              )}
            </>
          )}
        </motion.div>

        {/* Wedding Info */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-12"
        >
          {/* Date */}
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 opacity-80" />
            {isEditable ? (
              <InlineEditor
                field={data.weddingDate}
                value={data.weddingDate.value}
                onSave={(value) => onFieldUpdate('weddingDate', String(value))}
                className="text-base md:text-lg font-medium"
                style={{
                  fontFamily: themeStyles.fontPrimary,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
                template={template}
              />
            ) : (
              <span
                className="text-base md:text-lg font-medium"
                style={{
                  fontFamily: themeStyles.fontPrimary,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                {data.weddingDate.value}
              </span>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 opacity-80" />
            {isEditable ? (
              <InlineEditor
                field={data.location}
                value={data.location.value}
                onSave={(value) => onFieldUpdate('location', String(value))}
                className="text-base md:text-lg font-medium"
                style={{
                  fontFamily: themeStyles.fontPrimary,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
                template={template}
              />
            ) : (
              <span
                className="text-base md:text-lg font-medium"
                style={{
                  fontFamily: themeStyles.fontPrimary,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                {data.location.value}
              </span>
            )}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          variants={itemVariants}
          className="mb-12"
        >
          <motion.a
            href="#invitation"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300"
            style={{
              background: themeStyles.primaryGradient,
              color: 'white',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              fontFamily: themeStyles.fontPrimary
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 15px 40px rgba(0,0,0,0.4)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-5 h-5" />
            <span>Celebrar Conosco</span>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full flex justify-center"
            style={{
              backgroundColor: 'white',
              boxShadow: `0 4px 12px -2px ${themeStyles.primary}20`
            }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </motion.section>
  );
} 