'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Heart, 
  User,
  Send,
  Check,
  Clock,
  Star,
  Quote,
  Calendar,
  ThumbsUp,
  Share2,
  Filter,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  MessageSquare,
  Users,
  Sparkles,
  Award,
  Crown,
  Gift,
  Coffee,
  Smile,
  PartyPopper
} from 'lucide-react';
import { TemplateSection, WeddingTemplate, TestimonialsSectionData } from '@/types/template';
import { InlineEditor } from '../inline-editor';
import { cn } from '@/lib/utils';

interface TestimonialsSectionProps {
  section: TemplateSection;
  template: WeddingTemplate;
  isEditable: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
}

interface Testimonial {
  id: string;
  name: string;
  message: string;
  date: string;
  approved: boolean;
  rating?: number;
  avatar?: string;
  relationship: string;
  location?: string;
  likes: number;
  isLiked: boolean;
  isHighlighted: boolean;
}

interface TestimonialFormData {
  name: string;
  message: string;
  relationship: string;
  location: string;
  rating: number;
}

export function TestimonialsSection({
  section,
  template,
  isEditable,
  onFieldUpdate
}: TestimonialsSectionProps) {
  const data = section.data as TestimonialsSectionData;
  const [showForm, setShowForm] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'friends' | 'family' | 'colleagues'>('all');
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    message: '',
    relationship: '',
    location: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedTestimonial, setExpandedTestimonial] = useState<string | null>(null);

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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  // Mock testimonials data
  const mockTestimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Maria Silva',
      message: 'Que alegria imensa ver vocês dois juntos! Conheci a Ana ainda criança e sempre soube que ela encontraria alguém especial. João, você é perfeito para ela. Desejo muito amor, felicidade e cumplicidade para vocês! 💕',
      date: '2024-01-15',
      approved: true,
      rating: 5,
      avatar: '👩‍🦱',
      relationship: 'Tia da noiva',
      location: 'São Paulo, SP',
      likes: 12,
      isLiked: false,
      isHighlighted: true
    },
    {
      id: '2',
      name: 'Carlos Oliveira',
      message: 'João, meu amigo, que momento incrível! Lembro quando você me contou sobre a Ana pela primeira vez, seus olhos brilhavam. Agora entendo o porquê. Vocês são perfeitos juntos!',
      date: '2024-01-18',
      approved: true,
      rating: 5,
      avatar: '👨‍💼',
      relationship: 'Amigo do noivo',
      location: 'Rio de Janeiro, RJ',
      likes: 8,
      isLiked: true,
      isHighlighted: false
    },
    {
      id: '3',
      name: 'Fernanda Costa',
      message: 'Ana, desde a faculdade você falava sobre encontrar seu príncipe encantado. E olha só, você encontrou! João é maravilhoso e vocês formam um casal lindo. Muitas felicidades!',
      date: '2024-01-20',
      approved: true,
      rating: 5,
      avatar: '👩‍🎓',
      relationship: 'Amiga da faculdade',
      location: 'Belo Horizonte, MG',
      likes: 15,
      isLiked: false,
      isHighlighted: false
    },
    {
      id: '4',
      name: 'Roberto Santos',
      message: 'Filha, ver você feliz é tudo o que eu sempre quis. João, obrigado por cuidar tão bem da minha princesa. Que Deus abençoe esta união e que vocês sejam muito felizes!',
      date: '2024-01-22',
      approved: true,
      rating: 5,
      avatar: '👨‍🦳',
      relationship: 'Pai da noiva',
      location: 'São Paulo, SP',
      likes: 25,
      isLiked: true,
      isHighlighted: true
    },
    {
      id: '5',
      name: 'Juliana Ferreira',
      message: 'Que casal lindo! Trabalhar com vocês dois foi uma alegria, sempre demonstraram muito carinho um pelo outro. Desejo todo sucesso e felicidade nesta nova jornada!',
      date: '2024-01-25',
      approved: true,
      rating: 4,
      avatar: '👩‍💻',
      relationship: 'Colega de trabalho',
      location: 'São Paulo, SP',
      likes: 6,
      isLiked: false,
      isHighlighted: false
    }
  ];

  const relationshipOptions = [
    { value: 'family', label: 'Família', icon: '👨‍👩‍👧‍👦' },
    { value: 'friends', label: 'Amigos', icon: '👫' },
    { value: 'colleagues', label: 'Colegas', icon: '💼' },
    { value: 'neighbors', label: 'Vizinhos', icon: '🏠' },
    { value: 'others', label: 'Outros', icon: '🤝' }
  ];

  const filterOptions = [
    { id: 'all', label: 'Todos', count: mockTestimonials.length },
    { id: 'family', label: 'Família', count: mockTestimonials.filter(t => t.relationship.toLowerCase().includes('pai') || t.relationship.toLowerCase().includes('tia')).length },
    { id: 'friends', label: 'Amigos', count: mockTestimonials.filter(t => t.relationship.toLowerCase().includes('amig')).length },
    { id: 'colleagues', label: 'Colegas', count: mockTestimonials.filter(t => t.relationship.toLowerCase().includes('colega')).length }
  ];

  const filteredTestimonials = selectedFilter === 'all' 
    ? mockTestimonials 
    : mockTestimonials.filter(t => {
        const rel = t.relationship.toLowerCase();
        switch (selectedFilter) {
          case 'family':
            return rel.includes('pai') || rel.includes('tia') || rel.includes('mãe') || rel.includes('irmã');
          case 'friends':
            return rel.includes('amig');
          case 'colleagues':
            return rel.includes('colega');
          default:
            return true;
        }
      });

  const handleInputChange = (field: keyof TestimonialFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simula envio para API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Em produção, aqui faria o POST para /api/testimonials
      console.log('Depoimento enviado:', formData);
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        message: '',
        relationship: '',
        location: '',
        rating: 5
      });
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao enviar depoimento:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleLike = (testimonialId: string) => {
    // Em produção, aqui faria a requisição para a API
    console.log('Toggle like for testimonial:', testimonialId);
  };

  const shareTestimonial = async (testimonial: Testimonial) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Depoimento de ${testimonial.name}`,
          text: testimonial.message,
          url: window.location.href
        });
      } catch (err) {
        console.log('Erro ao compartilhar:', err);
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={cn(
          "w-4 h-4",
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )} 
      />
    ));
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
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(circle at 25% 75%, ${template.colors.primary}, transparent 60%),
                        radial-gradient(circle at 75% 25%, ${template.colors.secondary}, transparent 60%)`
          }}
        />

        {/* Animated Quote Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color: template.colors.primary,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            >
              <Quote className="w-6 h-6" />
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
              {data.title?.value || ''}
            </h2>
          )}

          {isEditable ? (
            <InlineEditor
              field={data.subtitle || { id: 'subtitle', type: 'text', value: '' }}
              value={data.subtitle?.value || ''}
              onSave={(value) => onFieldUpdate('subtitle', String(value))}
              className="text-lg md:text-xl max-w-3xl mx-auto mb-8"
              style={{
                fontFamily: template.fonts.body,
                color: template.colors.textSecondary,
              }}
              template={template}
            />
          ) : (
            <p
              className="text-lg md:text-xl max-w-3xl mx-auto mb-8"
              style={{
                fontFamily: template.fonts.body,
                color: template.colors.textSecondary,
              }}
            >
              {data.subtitle?.value || 'Palavras carinhosas dos nossos queridos amigos e familiares'}
            </p>
          )}

          <motion.div
            className="w-32 h-1 mx-auto rounded-full mb-8"
            style={{
              background: `linear-gradient(90deg, ${template.colors.primary}, ${template.colors.secondary})`
            }}
            variants={itemVariants}
          />

          {/* Add Testimonial Button */}
          <motion.button
            onClick={() => setShowForm(!showForm)}
            className="px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center gap-2 mx-auto text-white shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageSquare className="w-5 h-5" />
            {showForm ? 'Cancelar' : 'Deixar Depoimento'}
          </motion.button>
        </motion.div>

        {/* Testimonial Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="mb-16"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div
                className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 max-w-2xl mx-auto"
                style={{
                  borderColor: `${template.colors.primary}20`,
                  boxShadow: `0 25px 50px -12px ${template.colors.primary}20`
                }}
              >
                <div className="text-center mb-8">
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{
                      color: template.colors.primary,
                      fontFamily: template.fonts.heading
                    }}
                  >
                    Deixe seu Depoimento
                  </h3>
                  <p
                    className="text-base"
                    style={{
                      color: template.colors.textSecondary,
                      fontFamily: template.fonts.body
                    }}
                  >
                    Compartilhe suas palavras de carinho conosco
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 transition-all duration-200"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Relação</label>
                      <select
                        value={formData.relationship}
                        onChange={(e) => handleInputChange('relationship', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 transition-all duration-200"
                      >
                        <option value="">Selecione...</option>
                        {relationshipOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.icon} {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Localização</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 transition-all duration-200"
                        placeholder="Cidade, Estado"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Avaliação</label>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <motion.button
                            key={i}
                            type="button"
                            onClick={() => handleInputChange('rating', i + 1)}
                            className="p-1"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Star 
                              className={cn(
                                "w-6 h-6 transition-colors",
                                i < formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              )} 
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Mensagem *</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 transition-all duration-200 resize-none"
                      placeholder="Deixe sua mensagem carinhosa para os noivos..."
                    />
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 text-white"
                      style={{
                        background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                        opacity: isSubmitting ? 0.7 : 1
                      }}
                      whileHover={{ scale: 1.02 }}
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
                          Enviar Depoimento
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-3 rounded-xl font-medium transition-all duration-300 border-2"
                      style={{
                        borderColor: template.colors.primary,
                        color: template.colors.primary
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancelar
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div
                className="inline-block bg-green-50 border-2 border-green-200 rounded-2xl px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-bold text-green-800">Depoimento enviado!</h4>
                    <p className="text-sm text-green-700">Será avaliado e publicado em breve.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          variants={itemVariants}
        >
          {filterOptions.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm",
                selectedFilter === filter.id
                  ? "text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800"
              )}
              style={{
                background: selectedFilter === filter.id 
                  ? `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`
                  : 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(10px)',
                border: selectedFilter === filter.id 
                  ? 'none' 
                  : `1px solid ${template.colors.primary}30`
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{filter.label}</span>
              <span className="bg-white/30 px-2 py-1 rounded-full text-xs">
                {filter.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={cn(
                "bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 relative overflow-hidden",
                testimonial.isHighlighted && "ring-2 ring-yellow-400"
              )}
              style={{
                borderColor: testimonial.isHighlighted ? '#fbbf24' : `${template.colors.primary}20`,
                boxShadow: `0 25px 50px -12px ${testimonial.isHighlighted ? '#fbbf24' : template.colors.primary}20`
              }}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Highlight Badge */}
              {testimonial.isHighlighted && (
                <div className="absolute top-4 right-4">
                  <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Destaque
                  </div>
                </div>
              )}

              {/* Quote Icon */}
              <div className="absolute top-4 left-4">
                <Quote 
                  className="w-8 h-8 opacity-20"
                  style={{ color: template.colors.primary }}
                />
              </div>

              {/* Avatar & Info */}
              <div className="flex items-center gap-4 mb-4 mt-8">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${template.colors.primary}20` }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <h4
                    className="font-bold text-lg"
                    style={{
                      color: template.colors.text,
                      fontFamily: template.fonts.heading
                    }}
                  >
                    {testimonial.name}
                  </h4>
                  <p
                    className="text-sm opacity-80"
                    style={{
                      color: template.colors.primary,
                      fontFamily: template.fonts.body
                    }}
                  >
                    {testimonial.relationship}
                  </p>
                  {testimonial.location && (
                    <p
                      className="text-xs opacity-60"
                      style={{
                        color: template.colors.textSecondary,
                        fontFamily: template.fonts.body
                      }}
                    >
                      {testimonial.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Rating */}
              {testimonial.rating && (
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
              )}

              {/* Message */}
              <div className="mb-4">
                <p
                  className={cn(
                    "leading-relaxed",
                    expandedTestimonial === testimonial.id ? "" : "line-clamp-4"
                  )}
                  style={{
                    color: template.colors.textSecondary,
                    fontFamily: template.fonts.body
                  }}
                >
                  {testimonial.message}
                </p>
                {testimonial.message.length > 150 && (
                  <button
                    onClick={() => setExpandedTestimonial(
                      expandedTestimonial === testimonial.id ? null : testimonial.id
                    )}
                    className="text-sm font-medium mt-2 hover:underline"
                    style={{ color: template.colors.primary }}
                  >
                    {expandedTestimonial === testimonial.id ? 'Ver menos' : 'Ver mais'}
                  </button>
                )}
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 opacity-60" />
                <span
                  className="text-xs opacity-60"
                  style={{
                    color: template.colors.textSecondary,
                    fontFamily: template.fonts.body
                  }}
                >
                  {new Date(testimonial.date).toLocaleDateString('pt-BR')}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <motion.button
                    onClick={() => toggleLike(testimonial.id)}
                    className="flex items-center gap-1 text-sm transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart 
                      className={cn(
                        "w-4 h-4 transition-colors",
                        testimonial.isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                      )}
                    />
                    <span
                      style={{
                        color: testimonial.isLiked ? '#ef4444' : template.colors.textSecondary,
                        fontFamily: template.fonts.body
                      }}
                    >
                      {testimonial.likes}
                    </span>
                  </motion.button>
                </div>

                <motion.button
                  onClick={() => shareTestimonial(testimonial)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-4 h-4" style={{ color: template.colors.secondary }} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <div
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 max-w-2xl mx-auto"
            style={{
              borderColor: `${template.colors.primary}20`,
              boxShadow: `0 25px 50px -12px ${template.colors.primary}20`
            }}
          >
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{
                    color: template.colors.primary,
                    fontFamily: template.fonts.heading
                  }}
                >
                  {mockTestimonials.length}
                </div>
                <p
                  className="text-sm opacity-80"
                  style={{
                    color: template.colors.textSecondary,
                    fontFamily: template.fonts.body
                  }}
                >
                  Depoimentos
                </p>
              </div>
              
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{
                    color: template.colors.primary,
                    fontFamily: template.fonts.heading
                  }}
                >
                  {mockTestimonials.reduce((sum, t) => sum + t.likes, 0)}
                </div>
                <p
                  className="text-sm opacity-80"
                  style={{
                    color: template.colors.textSecondary,
                    fontFamily: template.fonts.body
                  }}
                >
                  Curtidas
                </p>
              </div>
              
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{
                    color: template.colors.primary,
                    fontFamily: template.fonts.heading
                  }}
                >
                  {(mockTestimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / mockTestimonials.length).toFixed(1)}
                </div>
                <p
                  className="text-sm opacity-80"
                  style={{
                    color: template.colors.textSecondary,
                    fontFamily: template.fonts.body
                  }}
                >
                  Avaliação
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
} 