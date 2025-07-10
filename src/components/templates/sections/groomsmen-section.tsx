'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Crown, Star, Plus, Edit3, Trash2, User } from 'lucide-react';
import { TemplateSection, WeddingTemplate, GroomsmenSectionData } from '@/types/template';
import { InlineEditor } from '../inline-editor';
import { cn } from '@/lib/utils';

interface GroomsmenSectionProps {
  section: TemplateSection;
  template: WeddingTemplate;
  isEditable: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
}

export function GroomsmenSection({
  section,
  template,
  isEditable,
  onFieldUpdate
}: GroomsmenSectionProps) {
  const data = section.data as GroomsmenSectionData;
  const [activeTab, setActiveTab] = useState<'groomsmen' | 'bridesmaids'>('groomsmen');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  const cardVariants = {
    hidden: { opacity: 0, rotateY: 90 },
    visible: { opacity: 1, rotateY: 0 },
    hover: { 
      y: -10, 
      scale: 1.05,
      rotateY: 5,
      transition: { duration: 0.3 }
    }
  };

  const addNewPerson = (type: 'groomsmen' | 'bridesmaids') => {
    if (!isEditable) return;
    
    const newPerson = {
      name: { id: 'name', type: 'text', value: 'Nome da Pessoa' },
      role: { id: 'role', type: 'text', value: type === 'groomsmen' ? 'Padrinho' : 'Madrinha' },
      image: { id: 'image', type: 'image', value: '' },
      description: { id: 'description', type: 'textarea', value: 'Descrição especial...' }
    };
    
    console.log(`Adicionar novo ${type}:`, newPerson);
  };

  const PersonCard = ({ person, index, type }: { person: any, index: number, type: 'groomsmen' | 'bridesmaids' }) => (
    <motion.div
      className="relative group"
      variants={cardVariants}
      whileHover="hover"
      layout
    >
      <div
        className="relative overflow-hidden rounded-2xl shadow-lg border-2 bg-white/90 backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl"
        style={{
          borderColor: `${template.colors.primary}20`,
          boxShadow: `0 10px 30px -5px ${template.colors.primary}20`
        }}
      >
        {/* Gradient Overlay */}
        <div
          className="absolute top-0 left-0 right-0 h-32 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`
          }}
        />

        {/* Image Section */}
        <div className="relative p-6 pb-4">
          <div className="relative mx-auto w-24 h-24 mb-4">
            {person.image?.value ? (
              <>
                {isEditable ? (
                  <InlineEditor
                    field={person.image}
                    value={person.image.value}
                    onSave={(value) => onFieldUpdate(`${type}.${index}.image`, String(value))}
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                    template={template}
                  />
                ) : (
                  <img
                    src={person.image.value}
                    alt={person.name?.value}
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                  />
                )}
              </>
            ) : (
              <div 
                className="w-full h-full rounded-full border-4 border-dashed flex items-center justify-center bg-gray-50"
                style={{ borderColor: template.colors.primary + '40' }}
              >
                <User 
                  className="w-8 h-8 opacity-40"
                  style={{ color: template.colors.primary }}
                />
              </div>
            )}

            {/* Role Badge */}
            <div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium border-2 border-white shadow-md"
              style={{
                backgroundColor: template.colors.primary,
                color: 'white'
              }}
            >
              {type === 'groomsmen' ? (
                <Crown className="w-3 h-3 inline mr-1" />
              ) : (
                <Star className="w-3 h-3 inline mr-1" />
              )}
              {person.role?.value}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 pb-6">
          {/* Name */}
          <div className="text-center mb-3">
            {isEditable ? (
              <InlineEditor
                field={person.name}
                value={person.name?.value || ''}
                onSave={(value) => onFieldUpdate(`${type}.${index}.name`, String(value))}
                className="text-lg font-bold"
                style={{
                  fontFamily: template.fonts.heading,
                  color: template.colors.text,
                }}
                template={template}
              />
            ) : (
              <h4
                className="text-lg font-bold"
                style={{
                  fontFamily: template.fonts.heading,
                  color: template.colors.text,
                }}
              >
                {person.name?.value}
              </h4>
            )}
          </div>

          {/* Description */}
          <div className="text-center">
            {isEditable ? (
              <InlineEditor
                field={person.description}
                value={person.description?.value || ''}
                onSave={(value) => onFieldUpdate(`${type}.${index}.description`, String(value))}
                className="text-sm leading-relaxed"
                style={{
                  fontFamily: template.fonts.body,
                  color: template.colors.textSecondary,
                }}
                template={template}
              />
            ) : (
              <p
                className="text-sm leading-relaxed"
                style={{
                  fontFamily: template.fonts.body,
                  color: template.colors.textSecondary,
                }}
              >
                {person.description?.value}
              </p>
            )}
          </div>

          {/* Edit Actions */}
          {isEditable && (
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="flex-1 flex items-center justify-center gap-1 px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Edit3 className="w-3 h-3" />
                Editar
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-1 px-3 py-1 text-xs rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Remover
              </button>
            </div>
          )}
        </div>

        {/* Decorative Corner */}
        <div className="absolute top-4 right-4 opacity-20">
          <Heart 
            className="w-5 h-5"
            style={{ color: template.colors.primary }}
          />
        </div>
      </div>
    </motion.div>
  );

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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${template.colors.primary.replace('#', '')}' fill-opacity='0.08'%3E%3Cpath d='M40 40c8.837 0 16-7.163 16-16S48.837 8 40 8 24 15.163 24 24s7.163 16 16 16zm0-4c6.627 0 12-5.373 12-12S46.627 12 40 12s-12 5.373-12 12 5.373 12 12 12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
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
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
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
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
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

          {isEditable ? (
            <InlineEditor
              field={data.subtitle || { id: 'subtitle', type: 'text', value: '' }}
              value={data.subtitle?.value || ''}
              onSave={(value) => onFieldUpdate('subtitle', String(value))}
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{
                fontFamily: template.fonts.body,
                color: template.colors.textSecondary,
              }}
              template={template}
            />
          ) : (
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{
                fontFamily: template.fonts.body,
                color: template.colors.textSecondary,
              }}
            >
              {data.subtitle?.value || ''}
            </p>
          )}

          <motion.div
            className="w-24 h-1 mx-auto mt-6 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${template.colors.primary}, ${template.colors.secondary})`
            }}
            variants={itemVariants}
          />
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-12"
          variants={itemVariants}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('groomsmen')}
                className={cn(
                  "px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2",
                  activeTab === 'groomsmen'
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                )}
                style={{
                  background: activeTab === 'groomsmen' 
                    ? `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`
                    : 'transparent'
                }}
              >
                <Crown className="w-4 h-4" />
                Padrinhos
              </button>
              <button
                onClick={() => setActiveTab('bridesmaids')}
                className={cn(
                  "px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2",
                  activeTab === 'bridesmaids'
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                )}
                style={{
                  background: activeTab === 'bridesmaids' 
                    ? `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`
                    : 'transparent'
                }}
              >
                <Star className="w-4 h-4" />
                Madrinhas
              </button>
            </div>
          </div>
        </motion.div>

        {/* People Grid */}
        <motion.div
          key={activeTab}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {(activeTab === 'groomsmen' ? data.groomsmen : data.bridesmaids)?.map((person, index) => (
            <PersonCard 
              key={index} 
              person={person} 
              index={index} 
              type={activeTab}
            />
          ))}

          {/* Add New Person Card */}
          {isEditable && (
            <motion.div
              className="flex items-center justify-center min-h-[300px]"
              variants={cardVariants}
            >
              <motion.button
                onClick={() => addNewPerson(activeTab)}
                className="w-full h-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-4 bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-300"
                style={{ borderColor: template.colors.primary + '40' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: template.colors.primary + '20' }}
                >
                  <Plus 
                    className="w-8 h-8"
                    style={{ color: template.colors.primary }}
                  />
                </div>
                <div className="text-center">
                  <p
                    className="font-medium mb-1"
                    style={{ color: template.colors.primary }}
                  >
                    Adicionar {activeTab === 'groomsmen' ? 'Padrinho' : 'Madrinha'}
                  </p>
                  <p
                    className="text-sm opacity-70"
                    style={{ color: template.colors.textSecondary }}
                  >
                    Clique para adicionar
                  </p>
                </div>
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Bottom Decorative Element */}
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center gap-6"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div
              className="w-20 h-px opacity-30"
              style={{
                background: `linear-gradient(to right, transparent, ${template.colors.primary})`
              }}
            />
            
            <motion.div
              className="flex items-center gap-2"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Users 
                className="w-6 h-6"
                style={{ color: template.colors.primary }}
              />
              <span
                className="text-sm font-medium"
                style={{ 
                  color: template.colors.primary,
                  fontFamily: template.fonts.body 
                }}
              >
                Nossos Queridos
              </span>
            </motion.div>
            
            <div
              className="w-20 h-px opacity-30"
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