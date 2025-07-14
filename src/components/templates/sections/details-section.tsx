'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Users, 
  Heart, 
  Info,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle,
  Shirt,
  Calendar,
  MapPin,
  Camera,
  Music,
  Utensils,
  Gift,
  Car,
  Home,
  Star,
  MessageCircle,
  Shield,
  Sparkles,
  PartyPopper,
  Coffee,
  Moon,
  Sun,
  Flower,
  Crown,
  Award,
  Target,
  Zap,
  FileText,
  User,
  UserCheck
} from 'lucide-react';
import { TemplateSection, WeddingTemplate, DetailsSectionData } from '@/types/template';
import { InlineEditor } from '../inline-editor';
import { cn } from '@/lib/utils';
import { getThemeStyles } from '@/lib/utils/theme-utils';

interface DetailsSectionProps {
  section: TemplateSection;
  template: WeddingTemplate;
  isEditable: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
}

interface TimelineEvent {
  time: string;
  event: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface DressCodeColor {
  name: string;
  hex: string;
  status: 'recommended' | 'avoid' | 'neutral';
}

export function DetailsSection({
  section,
  template,
  isEditable,
  onFieldUpdate
}: DetailsSectionProps) {
  const data = section.data as DetailsSectionData;
  const [activeTab, setActiveTab] = useState<'dress-code' | 'timeline' | 'info' | 'contacts'>('dress-code');
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState<number | null>(null);
  const themeStyles = getThemeStyles(template);

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  // Mock timeline data
  const timelineEvents: TimelineEvent[] = [
    {
      time: '15:30',
      event: 'Chegada dos Convidados',
      description: 'Recepção e coquetel de boas-vindas',
      icon: <Users className="w-5 h-5" />,
      color: themeStyles.primary
    },
    {
      time: '16:00',
      event: 'Cerimônia',
      description: 'Início da cerimônia de casamento',
      icon: <Heart className="w-5 h-5" />,
      color: themeStyles.secondary
    },
    {
      time: '16:30',
      event: 'Fotos & Cumprimentos',
      description: 'Sessão de fotos e cumprimentos aos noivos',
      icon: <Camera className="w-5 h-5" />,
      color: themeStyles.accent
    },
    {
      time: '18:00',
      event: 'Jantar',
      description: 'Jantar festivo com entrada, prato principal e sobremesa',
      icon: <Utensils className="w-5 h-5" />,
      color: themeStyles.primary
    },
    {
      time: '20:00',
      event: 'Primeira Dança',
      description: 'Abertura da pista com a primeira dança dos noivos',
      icon: <Music className="w-5 h-5" />,
      color: themeStyles.secondary
    },
    {
      time: '21:00',
      event: 'Festa',
      description: 'Música, dança e celebração até o amanhecer',
      icon: <PartyPopper className="w-5 h-5" />,
      color: themeStyles.accent
    }
  ];

  // Mock dress code colors
  const dressCodeColors: DressCodeColor[] = [
    { name: 'Azul Marinho', hex: '#1e3a8a', status: 'recommended' },
    { name: 'Cinza', hex: '#6b7280', status: 'recommended' },
    { name: 'Vinho', hex: '#7c2d12', status: 'recommended' },
    { name: 'Verde Escuro', hex: '#14532d', status: 'recommended' },
    { name: 'Preto', hex: '#000000', status: 'neutral' },
    { name: 'Bege', hex: '#d2b48c', status: 'neutral' },
    { name: 'Branco', hex: '#ffffff', status: 'avoid' },
    { name: 'Rosa Bebê', hex: '#ffc0cb', status: 'avoid' },
    { name: 'Amarelo Neon', hex: '#ffff00', status: 'avoid' }
  ];

  // Mock contact info
  const emergencyContacts = [
    {
      name: 'Ana (Madrinha)',
      role: 'Organizadora Principal',
      phone: '(11) 99999-9999',
      email: 'ana@email.com',
      responsibility: 'Dúvidas gerais e emergências'
    },
    {
      name: 'Carlos (Padrinho)',
      role: 'Coordenador de Transporte',
      phone: '(11) 88888-8888',
      email: 'carlos@email.com',
      responsibility: 'Transporte e logística'
    },
    {
      name: 'Cerimonialista',
      role: 'Lívia Santos',
      phone: '(11) 77777-7777',
      email: 'livia@cerimonial.com',
      responsibility: 'Coordenação do evento'
    }
  ];

  const tabs = [
    { id: 'dress-code', label: 'Dress Code', icon: <Shirt className="w-5 h-5" /> },
    { id: 'timeline', label: 'Cronograma', icon: <Clock className="w-5 h-5" /> },
    { id: 'info', label: 'Informações', icon: <Info className="w-5 h-5" /> },
    { id: 'contacts', label: 'Contatos', icon: <Phone className="w-5 h-5" /> }
  ];

  const importantNotes = [
    {
      icon: <Camera className="w-5 h-5" />,
      title: 'Cerimônia Unplugged',
      description: 'Pedimos para guardar celulares e câmeras durante a cerimônia. Nosso fotógrafo capturará todos os momentos!'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Protocolo de Segurança',
      description: 'Apresentação de documento com foto na entrada. Máscara opcional.'
    },
    {
      icon: <Moon className="w-5 h-5" />,
      title: 'Festa até tarde',
      description: 'A festa vai até 03:00. Recomendamos levar casaco, pode esfriar durante a madrugada.'
    },
    {
      icon: <Car className="w-5 h-5" />,
      title: 'Transporte',
      description: 'Ônibus gratuito saindo da cerimônia para a recepção às 17:00.'
    },
    {
      icon: <Gift className="w-5 h-5" />,
      title: 'Lista de Presentes',
      description: 'Preferimos PIX ou presentes da lista online. Link disponível no convite.'
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Crianças',
      description: 'Crianças são bem-vindas até 22:00. Temos espaço kids disponível.'
    }
  ];

  return (
    <motion.section
      className="relative py-20 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      style={{
        backgroundColor: section.style.backgroundColor || themeStyles.background,
        color: section.style.textColor || themeStyles.text,
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(circle at 20% 80%, ${themeStyles.primary}, transparent 50%),
                        radial-gradient(circle at 80% 20%, ${themeStyles.secondary}, transparent 50%),
                        radial-gradient(circle at 40% 40%, ${themeStyles.accent}, transparent 50%)`
          }}
        />

        {/* Animated Info Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-blue-300/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            >
              {[<Info className="w-6 h-6" />, <Clock className="w-6 h-6" />, <Heart className="w-6 h-6" />, <Star className="w-6 h-6" />][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          {isEditable ? (
            <InlineEditor
              field={data.title || { id: 'title', type: 'text', value: '' }}
              value={data.title?.value || ''}
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
              {data.title?.value || ''}
            </h2>
          )}

          <motion.div
            className="w-32 h-1 mx-auto rounded-full mb-8"
            style={{
              background: themeStyles.primaryGradient
            }}
            variants={itemVariants}
          />

          <p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{
              fontFamily: themeStyles.fontPrimary,
              color: themeStyles.textSecondary,
            }}
          >
            Tudo o que você precisa saber para aproveitar nosso grande dia! 💕
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          variants={itemVariants}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-full font-medium transition-all duration-300 text-sm md:text-base",
                activeTab === tab.id
                  ? "text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800"
              )}
              style={{
                background: activeTab === tab.id 
                  ? themeStyles.primaryGradient
                  : 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(10px)',
                border: activeTab === tab.id 
                  ? 'none' 
                  : `1px solid ${themeStyles.primary}30`
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={tabVariants}
            transition={{ duration: 0.3 }}
          >
            {/* Dress Code Tab */}
            {activeTab === 'dress-code' && (
              <div className="space-y-8">
                {/* Dress Code Info */}
                <div
                  className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
                  style={{
                    boxShadow: `0 25px 50px -12px ${themeStyles.primary}20`
                  }}
                >
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Shirt 
                        className="w-8 h-8"
                        style={{ color: themeStyles.primary }}
                      />
                      <h3
                        className="text-2xl md:text-3xl font-bold"
                        style={{
                          color: themeStyles.primary,
                          fontFamily: themeStyles.fontSecondary
                        }}
                      >
                        Dress Code
                      </h3>
                    </div>

                    <div className="mb-6">
                      {isEditable ? (
                        <InlineEditor
                          field={data.dressCode || { id: 'dressCode', type: 'text', value: '' }}
                          value={data.dressCode?.value || ''}
                          onSave={(value) => onFieldUpdate('dressCode', String(value))}
                          className="text-4xl font-bold mb-4"
                          style={{
                            color: themeStyles.primary,
                            fontFamily: themeStyles.fontSecondary
                          }}
                          template={template}
                        />
                      ) : (
                        <p
                          className="text-4xl font-bold mb-4"
                          style={{
                            color: themeStyles.primary,
                            fontFamily: themeStyles.fontSecondary
                          }}
                        >
                          {data.dressCode?.value || ''}
                        </p>
                      )}

                      {isEditable ? (
                        <InlineEditor
                          field={data.dressCodeDescription || { id: 'dressCodeDescription', type: 'text', value: '' }}
                          value={data.dressCodeDescription?.value || ''}
                          onSave={(value) => onFieldUpdate('dressCodeDescription', String(value))}
                          className="text-lg max-w-2xl mx-auto"
                          style={{
                            color: themeStyles.textSecondary,
                            fontFamily: themeStyles.fontPrimary
                          }}
                          template={template}
                        />
                      ) : (
                        <p
                          className="text-lg max-w-2xl mx-auto"
                          style={{
                            color: themeStyles.textSecondary,
                            fontFamily: themeStyles.fontPrimary
                          }}
                        >
                          {data.dressCodeDescription?.value || ''}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <h4
                        className="text-lg font-bold mb-6"
                        style={{
                          color: themeStyles.text,
                          fontFamily: themeStyles.fontSecondary
                        }}
                      >
                        Paleta de Cores
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Recommended Colors */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <h5 className="font-bold text-green-700">Recomendadas</h5>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {dressCodeColors.filter(c => c.status === 'recommended').map((color) => (
                            <motion.div
                              key={color.name}
                              className="flex items-center gap-2 p-2 rounded-lg bg-green-50 border border-green-200"
                              whileHover={{ scale: 1.05 }}
                            >
                              <div
                                className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                                style={{ backgroundColor: color.hex }}
                              />
                              <span className="text-sm font-medium text-green-800">
                                {color.name}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Neutral Colors */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Info className="w-5 h-5 text-blue-500" />
                          <h5 className="font-bold text-blue-700">Neutras</h5>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {dressCodeColors.filter(c => c.status === 'neutral').map((color) => (
                            <motion.div
                              key={color.name}
                              className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 border border-blue-200"
                              whileHover={{ scale: 1.05 }}
                            >
                              <div
                                className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                                style={{ backgroundColor: color.hex }}
                              />
                              <span className="text-sm font-medium text-blue-800">
                                {color.name}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Avoid Colors */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <h5 className="font-bold text-red-700">Evitar</h5>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {dressCodeColors.filter(c => c.status === 'avoid').map((color) => (
                            <motion.div
                              key={color.name}
                              className="flex items-center gap-2 p-2 rounded-lg bg-red-50 border border-red-200"
                              whileHover={{ scale: 1.05 }}
                            >
                              <div
                                className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                                style={{ backgroundColor: color.hex }}
                              />
                              <span className="text-sm font-medium text-red-800">
                                {color.name}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div
                className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
                style={{
                  boxShadow: `0 25px 50px -12px ${themeStyles.primary}20`
                }}
              >
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Calendar 
                      className="w-8 h-8"
                      style={{ color: themeStyles.primary }}
                    />
                    <h3
                      className="text-2xl md:text-3xl font-bold"
                      style={{
                        color: themeStyles.primary,
                        fontFamily: themeStyles.fontSecondary
                      }}
                    >
                      Cronograma do Evento
                    </h3>
                  </div>
                  <p
                    className="text-lg"
                    style={{
                      color: themeStyles.textSecondary,
                      fontFamily: themeStyles.fontPrimary
                    }}
                  >
                    Programação completa do nosso grande dia
                  </p>
                </div>

                <div className="space-y-6">
                  {timelineEvents.map((event, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-6 group cursor-pointer"
                      onClick={() => setSelectedTimelineEvent(selectedTimelineEvent === index ? null : index)}
                      whileHover={{ scale: 1.02 }}
                      variants={itemVariants}
                    >
                      {/* Time */}
                      <div className="flex-shrink-0 w-20 text-center">
                        <div
                          className="inline-block px-3 py-2 rounded-full font-bold text-white text-sm"
                          style={{ backgroundColor: event.color }}
                        >
                          {event.time}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 relative">
                        {/* Connector Line */}
                        {index < timelineEvents.length - 1 && (
                          <div
                            className="absolute left-6 top-12 w-0.5 h-12 opacity-30"
                            style={{ backgroundColor: event.color }}
                          />
                        )}

                        <div
                          className={cn(
                            "bg-gray-50 rounded-2xl p-6 transition-all duration-300 shadow-md hover:shadow-lg",
                            selectedTimelineEvent === index ? "shadow-lg scale-105" : "hover:shadow-md"
                          )}
                          style={{
                            borderColor: selectedTimelineEvent === index ? event.color : `${event.color}20`
                          }}
                        >
                          <div className="flex items-center gap-4 mb-2">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                              style={{ backgroundColor: event.color }}
                            >
                              {event.icon}
                            </div>
                            <div>
                              <h4
                                className="text-lg font-bold"
                                style={{
                                  color: themeStyles.text,
                                  fontFamily: themeStyles.fontSecondary
                                }}
                              >
                                {event.event}
                              </h4>
                              <p
                                className="text-sm opacity-80"
                                style={{
                                  color: themeStyles.textSecondary,
                                  fontFamily: themeStyles.fontPrimary
                                }}
                              >
                                {event.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Information Tab */}
            {activeTab === 'info' && (
              <div className="space-y-6">
                {importantNotes.map((note, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                    style={{
                      boxShadow: `0 15px 35px -10px ${themeStyles.primary}15`
                    }}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
                        style={{ backgroundColor: themeStyles.primary }}
                      >
                        {note.icon}
                      </div>
                      <div>
                        <h4
                          className="text-lg font-bold mb-2"
                          style={{
                            color: themeStyles.text,
                            fontFamily: themeStyles.fontSecondary
                          }}
                        >
                          {note.title}
                        </h4>
                        <p
                          className="text-sm leading-relaxed"
                          style={{
                            color: themeStyles.textSecondary,
                            fontFamily: themeStyles.fontPrimary
                          }}
                        >
                          {note.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {emergencyContacts.map((contact, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                    style={{
                      boxShadow: `0 15px 35px -10px ${themeStyles.primary}15`
                    }}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-center">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-4"
                        style={{ backgroundColor: themeStyles.primary }}
                      >
                        <UserCheck className="w-8 h-8" />
                      </div>
                      
                      <h4
                        className="text-lg font-bold mb-1"
                        style={{
                          color: themeStyles.text,
                          fontFamily: themeStyles.fontSecondary
                        }}
                      >
                        {contact.name}
                      </h4>
                      
                      <p
                        className="text-sm font-medium mb-4"
                        style={{
                          color: themeStyles.primary,
                          fontFamily: themeStyles.fontPrimary
                        }}
                      >
                        {contact.role}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4" style={{ color: themeStyles.secondary }} />
                          <span
                            className="text-sm"
                            style={{
                              color: themeStyles.textSecondary,
                              fontFamily: themeStyles.fontPrimary
                            }}
                          >
                            {contact.phone}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-center gap-2">
                          <Mail className="w-4 h-4" style={{ color: themeStyles.secondary }} />
                          <span
                            className="text-sm"
                            style={{
                              color: themeStyles.textSecondary,
                              fontFamily: themeStyles.fontPrimary
                            }}
                          >
                            {contact.email}
                          </span>
                        </div>
                      </div>
                      
                      <p
                        className="text-xs text-center leading-relaxed"
                        style={{
                          color: themeStyles.textSecondary,
                          fontFamily: themeStyles.fontPrimary
                        }}
                      >
                        {contact.responsibility}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
} 