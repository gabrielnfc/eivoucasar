'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Calendar, MapPin, Camera, Edit3, Trash2 } from 'lucide-react';
import { TemplateSection, WeddingTemplate, StorySectionData } from '@/types/template';
import { InlineEditor } from '../inline-editor';
import { cn } from '@/lib/utils';

interface StorySectionProps {
  section: TemplateSection;
  template: WeddingTemplate;
  isEditable: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
}

export function StorySection({
  section,
  template,
  isEditable,
  onFieldUpdate
}: StorySectionProps) {
  const data = section.data as StorySectionData;
  const [selectedMoment, setSelectedMoment] = useState<number | null>(null);

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

  const timelineVariants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: { scaleY: 1 }
  };

  const momentVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.8 },
    visible: { opacity: 1, x: 0, scale: 1 },
    hover: { scale: 1.05, y: -5 }
  };

  const addNewMoment = () => {
    if (!isEditable) return;
    
    const newMoment = {
      date: { id: 'date', type: 'date', value: new Date().toISOString().split('T')[0] },
      title: { id: 'title', type: 'text', value: 'Novo Momento' },
      description: { id: 'description', type: 'textarea', value: 'Descrição do momento especial...' },
      image: { id: 'image', type: 'image', value: '' }
    };
    
    // Aqui você implementaria a lógica para adicionar o momento
    console.log('Adicionar novo momento:', newMoment);
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
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${template.colors.primary.replace('#', '')}' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/20"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Heart className="w-6 h-6" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          {isEditable ? (
            <InlineEditor
              field={data.title}
              value={data.title.value}
              onSave={(value) => onFieldUpdate('title', String(value))}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{
                fontFamily: template.fonts.heading,
                background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              template={template}
            />
          ) : (
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{
                fontFamily: template.fonts.heading,
                background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {data.title.value}
            </h2>
          )}

          <motion.div
            className="w-24 h-1 mx-auto mb-8 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${template.colors.primary}, ${template.colors.secondary})`
            }}
            variants={itemVariants}
          />

          <div className="max-w-3xl mx-auto">
            {isEditable ? (
              <InlineEditor
                field={data.story}
                value={data.story.value}
                onSave={(value) => onFieldUpdate('story', String(value))}
                className="text-lg md:text-xl leading-relaxed"
                style={{
                  fontFamily: template.fonts.body,
                  color: template.colors.textSecondary,
                }}
                template={template}
              />
            ) : (
              <div
                className="text-lg md:text-xl leading-relaxed"
                style={{
                  fontFamily: template.fonts.body,
                  color: template.colors.textSecondary,
                }}
                dangerouslySetInnerHTML={{ __html: data.story.value }}
              />
            )}
          </div>
        </motion.div>

        {/* Couple Photo */}
        <motion.div
          className="text-center mb-20"
          variants={itemVariants}
        >
          {data.coupleImage?.value ? (
            <div className="relative inline-block max-w-md mx-auto">
              {isEditable ? (
                <InlineEditor
                  field={data.coupleImage}
                  value={data.coupleImage.value}
                  onSave={(value) => onFieldUpdate('coupleImage', String(value))}
                  className="rounded-2xl shadow-2xl overflow-hidden"
                  template={template}
                />
              ) : (
                <img
                  src={data.coupleImage.value}
                  alt="Foto do casal"
                  className="rounded-2xl shadow-2xl w-full"
                />
              )}
              
              {/* Decorative Frame */}
              <div
                className="absolute -inset-4 rounded-3xl border-4 opacity-20 -z-10"
                style={{ borderColor: template.colors.primary }}
              />
              <div
                className="absolute -inset-8 rounded-3xl border-2 opacity-10 -z-20"
                style={{ borderColor: template.colors.secondary }}
              />
            </div>
          ) : isEditable && data.coupleImage && (
            <motion.div
              className="max-w-md mx-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className="aspect-[4/3] border-2 border-dashed rounded-2xl flex items-center justify-center bg-white/50 backdrop-blur-sm cursor-pointer"
                style={{ borderColor: template.colors.primary + '40' }}
              >
                <div className="text-center p-8">
                  <Camera 
                    className="w-12 h-12 mx-auto mb-4 opacity-50"
                    style={{ color: template.colors.primary }}
                  />
                  <p 
                    className="text-sm font-medium opacity-70"
                    style={{ color: template.colors.text }}
                  >
                    Clique para adicionar foto do casal
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          className="relative"
          variants={itemVariants}
        >
          <div className="text-center mb-12">
            <h3
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{
                fontFamily: template.fonts.heading,
                color: template.colors.primary,
              }}
            >
              Nossa Jornada
            </h3>
            <p
              className="text-lg opacity-80"
              style={{
                fontFamily: template.fonts.body,
                color: template.colors.textSecondary,
              }}
            >
              Os momentos especiais que nos trouxeram até aqui
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full rounded-full"
              style={{
                background: `linear-gradient(to bottom, ${template.colors.primary}, ${template.colors.secondary})`
              }}
              variants={timelineVariants}
            />

            {/* Timeline Items */}
            <div className="space-y-12">
              {data.timeline && data.timeline.map((moment, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "relative flex items-center",
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  )}
                  variants={momentVariants}
                  whileHover="hover"
                  onClick={() => setSelectedMoment(selectedMoment === index ? null : index)}
                >
                  {/* Content Card */}
                  <div className={cn(
                    "w-5/12 p-6 rounded-2xl shadow-lg border-2 cursor-pointer transition-all duration-300",
                    selectedMoment === index ? "scale-105" : "hover:shadow-xl"
                  )}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: selectedMoment === index ? template.colors.primary : `${template.colors.accent}40`,
                    backdropFilter: 'blur(10px)'
                  }}>
                    {/* Date */}
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar 
                        className="w-4 h-4"
                        style={{ color: template.colors.primary }}
                      />
                      {isEditable ? (
                        <InlineEditor
                          field={moment.date}
                          value={moment.date.value}
                          onSave={(value) => onFieldUpdate(`timeline.${index}.date`, String(value))}
                          className="text-sm font-medium"
                          style={{
                            fontFamily: template.fonts.body,
                            color: template.colors.primary,
                          }}
                          template={template}
                        />
                      ) : (
                        <span
                          className="text-sm font-medium"
                          style={{
                            fontFamily: template.fonts.body,
                            color: template.colors.primary,
                          }}
                        >
                          {new Date(moment.date.value).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    {isEditable ? (
                      <InlineEditor
                        field={moment.title}
                        value={moment.title.value}
                        onSave={(value) => onFieldUpdate(`timeline.${index}.title`, String(value))}
                        className="text-xl font-bold mb-3"
                        style={{
                          fontFamily: template.fonts.heading,
                          color: template.colors.text,
                        }}
                        template={template}
                      />
                    ) : (
                      <h4
                        className="text-xl font-bold mb-3"
                        style={{
                          fontFamily: template.fonts.heading,
                          color: template.colors.text,
                        }}
                      >
                        {moment.title.value}
                      </h4>
                    )}

                    {/* Description */}
                    {isEditable ? (
                      <InlineEditor
                        field={moment.description}
                        value={moment.description.value}
                        onSave={(value) => onFieldUpdate(`timeline.${index}.description`, String(value))}
                        className="text-base leading-relaxed"
                        style={{
                          fontFamily: template.fonts.body,
                          color: template.colors.textSecondary,
                        }}
                        template={template}
                      />
                    ) : (
                      <p
                        className="text-base leading-relaxed"
                        style={{
                          fontFamily: template.fonts.body,
                          color: template.colors.textSecondary,
                        }}
                      >
                        {moment.description.value}
                      </p>
                    )}

                    {/* Image */}
                    {moment.image?.value && (
                      <div className="mt-4 rounded-lg overflow-hidden">
                        {isEditable ? (
                          <InlineEditor
                            field={moment.image}
                            value={moment.image.value}
                            onSave={(value) => onFieldUpdate(`timeline.${index}.image`, String(value))}
                            className="w-full h-48 object-cover"
                            template={template}
                          />
                        ) : (
                          <img
                            src={moment.image.value}
                            alt={moment.title.value}
                            className="w-full h-48 object-cover"
                          />
                        )}
                      </div>
                    )}

                    {/* Edit Actions */}
                    {isEditable && (
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                        <button
                          className="flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                          Editar
                        </button>
                        <button
                          className="flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remover
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      className="w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10"
                      style={{
                        backgroundColor: template.colors.primary,
                      }}
                      whileHover={{ scale: 1.2 }}
                      animate={{
                        boxShadow: selectedMoment === index 
                          ? `0 0 20px ${template.colors.primary}60`
                          : `0 0 10px ${template.colors.primary}30`
                      }}
                    >
                      <Heart className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}

              {/* Add New Moment Button */}
              {isEditable && (
                <motion.div
                  className="relative flex justify-center"
                  variants={momentVariants}
                >
                  <motion.button
                    onClick={addNewMoment}
                    className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-dashed hover:bg-white/50 transition-all duration-300"
                    style={{
                      borderColor: template.colors.primary,
                      color: template.colors.primary
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Adicionar Momento</span>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottom Decorative Element */}
        <motion.div
          className="text-center mt-20"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center gap-6"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div
              className="w-16 h-px opacity-30"
              style={{
                background: `linear-gradient(to right, transparent, ${template.colors.primary})`
              }}
            />
            
            <motion.div
              className="relative"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center border-4"
                style={{
                  background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
              >
                <Heart className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <div
              className="w-16 h-px opacity-30"
              style={{
                background: `linear-gradient(to left, transparent, ${template.colors.primary})`
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
} 