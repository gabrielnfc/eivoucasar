'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Heart, 
  Check, 
  X, 
  Send, 
  AlertCircle, 
  CheckCircle,
  User,
  Mail,
  Phone,
  MessageSquare,
  Car,
  Utensils,
  Clock,
  MapPin,
  Info
} from 'lucide-react';
import { TemplateSection, WeddingTemplate, RSVPSectionData } from '@/types/template';
import { InlineEditor } from '../inline-editor';
import { cn } from '@/lib/utils';

interface RSVPSectionProps {
  section: TemplateSection;
  template: WeddingTemplate;
  isEditable: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
}

interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  attending: 'yes' | 'no' | '';
  guestCount: number;
  dietaryRestrictions: string[];
  transport: 'own' | 'provided' | 'other';
  message: string;
  accommodation: 'yes' | 'no' | '';
}

const initialFormData: RSVPFormData = {
  name: '',
  email: '',
  phone: '',
  attending: '',
  guestCount: 1,
  dietaryRestrictions: [],
  transport: 'own',
  message: '',
  accommodation: ''
};

export function RSVPSection({
  section,
  template,
  isEditable,
  onFieldUpdate
}: RSVPSectionProps) {
  const data = section.data as RSVPSectionData;
  const [formData, setFormData] = useState<RSVPFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calcula dias restantes para o deadline
  const deadlineDate = new Date(data.deadline?.value || Date.now());
  const today = new Date();
  const daysRemaining = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

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

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetariano', icon: '🥗' },
    { id: 'vegan', label: 'Vegano', icon: '🌱' },
    { id: 'gluten-free', label: 'Sem glúten', icon: '🌾' },
    { id: 'lactose-free', label: 'Sem lactose', icon: '🥛' },
    { id: 'none', label: 'Nenhuma restrição', icon: '🍽️' }
  ];

  const handleInputChange = (field: keyof RSVPFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpa erro do campo quando usuário digita
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleDietaryChange = (option: string) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(option)
        ? prev.dietaryRestrictions.filter(item => item !== option)
        : [...prev.dietaryRestrictions, option]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
    if (!formData.email.includes('@')) newErrors.email = 'Email inválido';
    if (!formData.attending) newErrors.attending = 'Confirmação de presença é obrigatória';
    if (formData.attending === 'yes' && formData.guestCount < 1) {
      newErrors.guestCount = 'Número de convidados deve ser maior que 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simula envio para API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Em produção, aqui faria o POST para /api/rsvp
      console.log('RSVP enviado:', formData);
      
      setIsSubmitted(true);
      setFormData(initialFormData);
    } catch (error) {
      console.error('Erro ao enviar RSVP:', error);
      setErrors({ submit: 'Erro ao enviar confirmação. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData(initialFormData);
    setErrors({});
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
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at 30% 70%, ${template.colors.primary}, transparent 60%),
                        radial-gradient(circle at 70% 30%, ${template.colors.secondary}, transparent 60%)`
          }}
        />

        {/* Animated Hearts */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-200/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            >
              <Heart className="w-8 h-8" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
        >
          {isEditable ? (
            <InlineEditor
              field={data.title || { id: 'title', type: 'text', value: '' }}
              value={data.title?.value || ''}
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
              {data.title?.value || ''}
            </h2>
          )}

          {isEditable ? (
            <InlineEditor
              field={data.subtitle || { id: 'subtitle', type: 'text', value: '' }}
              value={data.subtitle?.value || ''}
              onSave={(value) => onFieldUpdate('subtitle', String(value))}
              className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
              style={{
                fontFamily: template.fonts.body,
                color: template.colors.textSecondary,
              }}
              template={template}
            />
          ) : (
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
              style={{
                fontFamily: template.fonts.body,
                color: template.colors.textSecondary,
              }}
            >
              {data.subtitle?.value || ''}
            </p>
          )}

          {/* Deadline Info */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-8"
            variants={itemVariants}
          >
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2"
              style={{
                borderColor: `${template.colors.primary}40`,
                backgroundColor: `${template.colors.primary}10`,
              }}
            >
              <Clock 
                className="w-5 h-5"
                style={{ color: template.colors.primary }}
              />
              <span
                className="font-medium"
                style={{
                  color: template.colors.primary,
                  fontFamily: template.fonts.body
                }}
              >
                {daysRemaining > 0 
                  ? `${daysRemaining} ${daysRemaining === 1 ? 'dia' : 'dias'} restantes`
                  : 'Prazo encerrado'
                }
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Form Container */}
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border"
              style={{
                borderColor: `${template.colors.primary}20`,
                boxShadow: `0 25px 50px -12px ${template.colors.primary}20`
              }}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3
                      className="text-xl font-bold flex items-center gap-2"
                      style={{
                        color: template.colors.primary,
                        fontFamily: template.fonts.heading
                      }}
                    >
                      <User className="w-5 h-5" />
                      Informações Pessoais
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Nome completo *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={cn(
                            "w-full px-4 py-3 rounded-xl border-2 transition-all duration-200",
                            errors.name ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-400"
                          )}
                          placeholder="Seu nome completo"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={cn(
                            "w-full px-4 py-3 rounded-xl border-2 transition-all duration-200",
                            errors.email ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-400"
                          )}
                          placeholder="seu@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Telefone (opcional)
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 transition-all duration-200"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Attendance Confirmation */}
                  <div className="space-y-6">
                    <h3
                      className="text-xl font-bold flex items-center gap-2"
                      style={{
                        color: template.colors.primary,
                        fontFamily: template.fonts.heading
                      }}
                    >
                      <Calendar className="w-5 h-5" />
                      Confirmação de Presença
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-3">
                          Você comparecerá ao nosso casamento? *
                        </label>
                        <div className="flex gap-4">
                          <motion.button
                            type="button"
                            onClick={() => handleInputChange('attending', 'yes')}
                            className={cn(
                              "flex-1 p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-2",
                              formData.attending === 'yes' 
                                ? "bg-green-50 border-green-400 text-green-700"
                                : "border-gray-200 hover:border-green-300"
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Check className="w-5 h-5" />
                            <span className="font-medium">Sim, estarei presente! 🎉</span>
                          </motion.button>

                          <motion.button
                            type="button"
                            onClick={() => handleInputChange('attending', 'no')}
                            className={cn(
                              "flex-1 p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-2",
                              formData.attending === 'no' 
                                ? "bg-red-50 border-red-400 text-red-700"
                                : "border-gray-200 hover:border-red-300"
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <X className="w-5 h-5" />
                            <span className="font-medium">Não poderei comparecer</span>
                          </motion.button>
                        </div>
                        {errors.attending && (
                          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.attending}
                          </p>
                        )}
                      </div>

                      {/* Guest Count (only if attending) */}
                      <AnimatePresence>
                        {formData.attending === 'yes' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4"
                          >
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Quantas pessoas estarão com você? *
                              </label>
                              <div className="flex items-center gap-4">
                                <button
                                  type="button"
                                  onClick={() => handleInputChange('guestCount', Math.max(1, formData.guestCount - 1))}
                                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                >
                                  -
                                </button>
                                <span className="w-16 text-center font-bold text-xl">
                                  {formData.guestCount}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleInputChange('guestCount', Math.min(10, formData.guestCount + 1))}
                                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                >
                                  +
                                </button>
                                <span className="text-sm text-gray-600">
                                  {formData.guestCount === 1 ? 'pessoa' : 'pessoas'} (incluindo você)
                                </span>
                              </div>
                            </div>

                            {/* Dietary Restrictions */}
                            <div>
                              <label className="block text-sm font-medium mb-3">
                                Restrições alimentares (opcional)
                              </label>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {dietaryOptions.map((option) => (
                                  <motion.button
                                    key={option.id}
                                    type="button"
                                    onClick={() => handleDietaryChange(option.id)}
                                    className={cn(
                                      "p-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-2 text-sm",
                                      formData.dietaryRestrictions.includes(option.id)
                                        ? "bg-blue-50 border-blue-400 text-blue-700"
                                        : "border-gray-200 hover:border-blue-300"
                                    )}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <span>{option.icon}</span>
                                    <span className="font-medium">{option.label}</span>
                                  </motion.button>
                                ))}
                              </div>
                            </div>

                            {/* Transport */}
                            <div>
                              <label className="block text-sm font-medium mb-3">
                                Como chegará ao local?
                              </label>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <motion.button
                                  type="button"
                                  onClick={() => handleInputChange('transport', 'own')}
                                  className={cn(
                                    "p-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-2",
                                    formData.transport === 'own' 
                                      ? "bg-blue-50 border-blue-400 text-blue-700"
                                      : "border-gray-200 hover:border-blue-300"
                                  )}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Car className="w-5 h-5" />
                                  <span className="font-medium">Veículo próprio</span>
                                </motion.button>

                                <motion.button
                                  type="button"
                                  onClick={() => handleInputChange('transport', 'provided')}
                                  className={cn(
                                    "p-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-2",
                                    formData.transport === 'provided' 
                                      ? "bg-blue-50 border-blue-400 text-blue-700"
                                      : "border-gray-200 hover:border-blue-300"
                                  )}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Users className="w-5 h-5" />
                                  <span className="font-medium">Transporte fornecido</span>
                                </motion.button>

                                <motion.button
                                  type="button"
                                  onClick={() => handleInputChange('transport', 'other')}
                                  className={cn(
                                    "p-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-2",
                                    formData.transport === 'other' 
                                      ? "bg-blue-50 border-blue-400 text-blue-700"
                                      : "border-gray-200 hover:border-blue-300"
                                  )}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <MapPin className="w-5 h-5" />
                                  <span className="font-medium">Outro</span>
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-4">
                    <h3
                      className="text-xl font-bold flex items-center gap-2"
                      style={{
                        color: template.colors.primary,
                        fontFamily: template.fonts.heading
                      }}
                    >
                      <MessageSquare className="w-5 h-5" />
                      Mensagem (opcional)
                    </h3>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 transition-all duration-200 resize-none"
                      rows={4}
                      placeholder="Deixe uma mensagem carinhosa para os noivos..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                      style={{
                        background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                        opacity: isSubmitting ? 0.7 : 1
                      }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Confirmar Presença
                        </>
                      )}
                    </motion.button>

                    {errors.submit && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.submit}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border text-center py-16 px-8"
              style={{
                borderColor: `${template.colors.primary}20`,
                boxShadow: `0 25px 50px -12px ${template.colors.primary}20`
              }}
              variants={successVariants as any}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: 1,
                }}
              >
                <CheckCircle className="w-10 h-10 text-green-600" />
              </motion.div>

              <h3
                className="text-3xl font-bold mb-4"
                style={{
                  color: template.colors.primary,
                  fontFamily: template.fonts.heading
                }}
              >
                Confirmação Enviada! 🎉
              </h3>

              <p
                className="text-lg mb-8 max-w-md mx-auto"
                style={{
                  color: template.colors.textSecondary,
                  fontFamily: template.fonts.body
                }}
              >
                Obrigado por confirmar sua presença! Em breve entraremos em contato com mais detalhes.
              </p>

              <motion.button
                onClick={resetForm}
                className="px-6 py-3 rounded-full border-2 text-sm font-medium transition-all duration-300"
                style={{
                  borderColor: template.colors.primary,
                  color: template.colors.primary
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Fazer nova confirmação
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
} 