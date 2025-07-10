'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, MessageCircle, Sparkles } from 'lucide-react';
import { TemplateSection, WeddingTemplate, InvitationSectionData } from '@/types/template';
import { InlineEditor } from '../inline-editor';
import { cn } from '@/lib/utils';

interface InvitationSectionProps {
  section: TemplateSection;
  template: WeddingTemplate;
  isEditable: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
}

export function InvitationSection({
  section,
  template,
  isEditable,
  onFieldUpdate
}: InvitationSectionProps) {
  const data = section.data as InvitationSectionData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const heartVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0 }
  };

  return (
    <motion.section
      className="relative py-20 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      style={{
        backgroundColor: section.style.backgroundColor || template.colors.background,
        color: section.style.textColor || template.colors.text,
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-current via-transparent to-current" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, currentColor 2px, transparent 2px)`,
            backgroundSize: '60px 60px',
            opacity: 0.3
          }}
        />
      </div>

      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Heart className="w-4 h-4" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Decorative Top Element */}
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{
              background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.accent})`
            }}
            variants={heartVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.div
            className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-current to-transparent opacity-30 mb-6"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          />
        </motion.div>

        {/* Main Title */}
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {isEditable ? (
            <InlineEditor
              field={data.title}
              value={data.title.value}
              onSave={(value) => onFieldUpdate('title', String(value))}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              style={{
                fontFamily: template.fonts.heading,
                color: template.colors.primary,
                background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              template={template}
            />
          ) : (
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              style={{
                fontFamily: template.fonts.heading,
                background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {data.title.value}
            </h1>
          )}
        </motion.div>

        {/* Invitation Message */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="max-w-3xl mx-auto">
            {isEditable ? (
              <InlineEditor
                field={data.message}
                value={data.message.value}
                onSave={(value) => onFieldUpdate('message', String(value))}
                className="text-lg md:text-xl leading-relaxed mb-8"
                style={{
                  fontFamily: template.fonts.body,
                  color: template.colors.textSecondary,
                }}
                template={template}
              />
            ) : (
              <div
                className="text-lg md:text-xl leading-relaxed mb-8"
                style={{
                  fontFamily: template.fonts.body,
                  color: template.colors.textSecondary,
                }}
                dangerouslySetInnerHTML={{ __html: data.message.value }}
              />
            )}
          </div>
        </motion.div>

        {/* Formal Invitation */}
        <motion.div
          className="relative mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border-2 mx-auto max-w-2xl"
            style={{
              borderColor: `${template.colors.accent}40`,
              boxShadow: `0 25px 50px -12px ${template.colors.primary}20`
            }}
          >
            {/* Decorative Corner Elements */}
            <div className="absolute top-4 left-4 w-8 h-8 opacity-20">
              <Sparkles className="w-full h-full" style={{ color: template.colors.primary }} />
            </div>
            <div className="absolute top-4 right-4 w-8 h-8 opacity-20">
              <Sparkles className="w-full h-full" style={{ color: template.colors.primary }} />
            </div>
            <div className="absolute bottom-4 left-4 w-8 h-8 opacity-20">
              <Sparkles className="w-full h-full" style={{ color: template.colors.primary }} />
            </div>
            <div className="absolute bottom-4 right-4 w-8 h-8 opacity-20">
              <Sparkles className="w-full h-full" style={{ color: template.colors.primary }} />
            </div>

            <div className="text-center">
              {isEditable ? (
                <InlineEditor
                  field={data.formalMessage}
                  value={data.formalMessage.value}
                  onSave={(value) => onFieldUpdate('formalMessage', String(value))}
                  className="text-base md:text-lg leading-relaxed mb-8 italic"
                  style={{
                    fontFamily: template.fonts.body,
                    color: template.colors.text,
                  }}
                  template={template}
                />
              ) : (
                <p
                  className="text-base md:text-lg leading-relaxed mb-8 italic"
                  style={{
                    fontFamily: template.fonts.body,
                    color: template.colors.text,
                  }}
                >
                  {data.formalMessage.value}
                </p>
              )}

              {/* Signature */}
              <div className="relative">
                <div
                  className="w-20 h-px bg-current opacity-30 mx-auto mb-4"
                  style={{ color: template.colors.primary }}
                />
                {isEditable ? (
                  <InlineEditor
                    field={data.signature}
                    value={data.signature.value}
                    onSave={(value) => onFieldUpdate('signature', String(value))}
                    className="text-lg md:text-xl font-medium"
                    style={{
                      fontFamily: template.fonts.script || template.fonts.heading,
                      color: template.colors.primary,
                    }}
                    template={template}
                  />
                ) : (
                  <p
                    className="text-lg md:text-xl font-medium"
                    style={{
                      fontFamily: template.fonts.script || template.fonts.heading,
                      color: template.colors.primary,
                    }}
                  >
                    {data.signature.value}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Image Section */}
        <motion.div
          className="text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {data.invitationImage?.value ? (
            <div className="relative inline-block">
              {isEditable ? (
                <InlineEditor
                  field={data.invitationImage}
                  value={data.invitationImage.value}
                  onSave={(value) => onFieldUpdate('invitationImage', String(value))}
                  className="max-w-md mx-auto rounded-2xl shadow-2xl"
                  template={template}
                />
              ) : (
                <img
                  src={data.invitationImage.value}
                  alt="Convite"
                  className="max-w-md mx-auto rounded-2xl shadow-2xl"
                />
              )}
              
              {/* Image Overlay Effects */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent"
              />
            </div>
          ) : isEditable && data.invitationImage && (
            <motion.div
              className="max-w-md mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="aspect-[3/2] border-2 border-dashed rounded-2xl flex items-center justify-center bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/70"
                style={{ borderColor: template.colors.primary + '40' }}>
                <div className="text-center p-8">
                  <MessageCircle 
                    className="w-12 h-12 mx-auto mb-4 opacity-50"
                    style={{ color: template.colors.primary }}
                  />
                  <p 
                    className="text-sm font-medium opacity-70"
                    style={{ color: template.colors.text }}
                  >
                    Clique para adicionar imagem do convite
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Bottom Decorative Element */}
        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="inline-flex items-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
          >
            <div
              className="w-12 h-px bg-current opacity-20"
              style={{ color: template.colors.primary }}
            />
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Heart 
                className="w-6 h-6"
                style={{ color: template.colors.primary }}
              />
            </motion.div>
            <div
              className="w-12 h-px bg-current opacity-20"
              style={{ color: template.colors.primary }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
} 