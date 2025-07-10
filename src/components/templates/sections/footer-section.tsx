'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Calendar, 
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ExternalLink,
  ArrowUp,
  Star,
  Gift,
  Camera,
  Music,
  Flower,
  Crown,
  Sparkles,
  Coffee,
  Home,
  Users,
  MessageCircle,
  Share2,
  Clock,
  Award,
  CheckCircle,
  Globe,
  Smartphone,
  Monitor,
  ChevronUp
} from 'lucide-react';
import { EditableField, TemplateSection, WeddingTemplate } from '@/types/template';
import { InlineEditor } from '../inline-editor';
import { cn } from '@/lib/utils';

interface FooterSectionProps {
  section: TemplateSection;
  template: WeddingTemplate;
  isEditable: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
}

interface FooterSectionData {
  thankYouMessage: { id: string; type: string; value: string };
  coupleSignature: { id: string; type: string; value: string };
  weddingDate: { id: string; type: string; value: string };
  weddingLocation: { id: string; type: string; value: string };
  socialLinks: {
    instagram: { id: string; type: string; value: string };
    facebook: { id: string; type: string; value: string };
    youtube: { id: string; type: string; value: string };
  };
  contactInfo: {
    phone: { id: string; type: string; value: string };
    email: { id: string; type: string; value: string };
  };
  credits: {
    photographer: { id: string; type: string; value: string };
    venue: { id: string; type: string; value: string };
    website: { id: string; type: string; value: string };
  };
}

export function FooterSection({
  section,
  template,
  isEditable,
  onFieldUpdate
}: FooterSectionProps) {
  const data = section.data as FooterSectionData;
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const heartVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  // Mock data fallbacks
  const mockData = {
    thankYouMessage: { 
      id: 'thankYouMessage', 
      type: 'textarea' as const, 
      value: data?.thankYouMessage?.value || 'Obrigado por fazer parte do nosso dia especial! Vocês tornaram nosso sonho ainda mais bonito e inesquecível. Que nossa jornada juntos seja repleta de amor, alegria e momentos únicos como este.' 
    } as EditableField,
    coupleSignature: { 
      id: 'coupleSignature', 
      type: 'text' as const, 
      value: data?.coupleSignature?.value || 'Com amor, Ana & João' 
    } as EditableField,
    weddingDate: { 
      id: 'weddingDate', 
      type: 'date', 
      value: data?.weddingDate?.value || '2024-06-15' 
    },
    weddingLocation: { 
      id: 'weddingLocation', 
      type: 'text', 
      value: data?.weddingLocation?.value || 'São Paulo, SP' 
    },
    socialLinks: {
      instagram: { 
        id: 'instagram', 
        type: 'url', 
        value: data?.socialLinks?.instagram?.value || '@anajoao2024' 
      },
      facebook: { 
        id: 'facebook', 
        type: 'url', 
        value: data?.socialLinks?.facebook?.value || '/anajoao.casamento' 
      },
      youtube: { 
        id: 'youtube', 
        type: 'url', 
        value: data?.socialLinks?.youtube?.value || '@casamentoanajoao' 
      }
    },
    contactInfo: {
      phone: { 
        id: 'phone', 
        type: 'phone', 
        value: data?.contactInfo?.phone?.value || '(11) 99999-9999' 
      },
      email: { 
        id: 'email', 
        type: 'email', 
        value: data?.contactInfo?.email?.value || 'contato@anajoao.com' 
      }
    },
    credits: {
      photographer: { 
        id: 'photographer', 
        type: 'text', 
        value: data?.credits?.photographer?.value || 'Fotografia: Studio Momentos' 
      },
      venue: { 
        id: 'venue', 
        type: 'text', 
        value: data?.credits?.venue?.value || 'Local: Villa Bella Eventos' 
      },
      website: { 
        id: 'website', 
        type: 'text', 
        value: data?.credits?.website?.value || 'Site: EiVouCasar.com' 
      }
    }
  };

  const socialPlatforms = [
    { 
      key: 'instagram', 
      icon: <Instagram className="w-5 h-5" />, 
      name: 'Instagram', 
      color: '#E4405F',
      baseUrl: 'https://instagram.com/'
    },
    { 
      key: 'facebook', 
      icon: <Facebook className="w-5 h-5" />, 
      name: 'Facebook', 
      color: '#1877F2',
      baseUrl: 'https://facebook.com/'
    },
    { 
      key: 'youtube', 
      icon: <Youtube className="w-5 h-5" />, 
      name: 'YouTube', 
      color: '#FF0000',
      baseUrl: 'https://youtube.com/'
    }
  ];

  const weddingStats = [
    { icon: <Users className="w-5 h-5" />, label: 'Convidados', value: '150+' },
    { icon: <Camera className="w-5 h-5" />, label: 'Fotos', value: '500+' },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'Depoimentos', value: '25+' },
    { icon: <Heart className="w-5 h-5" />, label: 'Momentos', value: '∞' }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openSocialLink = (platform: any) => {
    const username = mockData.socialLinks[platform.key as keyof typeof mockData.socialLinks]?.value;
    if (username) {
      const cleanUsername = username.replace('@', '').replace('/', '');
      window.open(`${platform.baseUrl}${cleanUsername}`, '_blank');
    }
  };

  return (
    <motion.footer
      className="relative overflow-hidden"
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
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${template.colors.primary}15, ${template.colors.secondary}15, ${template.colors.accent}15)`
          }}
        />

        {/* Animated Hearts */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color: template.colors.primary,
              }}
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              <Heart className="w-4 h-4" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          {/* Thank You Section */}
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <div
              className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-2 max-w-4xl mx-auto"
              style={{
                borderColor: `${template.colors.primary}20`,
                boxShadow: `0 25px 50px -12px ${template.colors.primary}20`
              }}
            >
              {/* Decorative Hearts */}
              <div className="flex justify-center gap-2 mb-8">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    variants={heartVariants as any}
                    custom={i}
                    style={{ color: template.colors.primary }}
                  >
                    <Heart className="w-6 h-6 fill-current" />
                  </motion.div>
                ))}
              </div>

              {/* Thank You Message */}
              {isEditable ? (
                <InlineEditor
                  field={mockData.thankYouMessage as EditableField}
                  value={mockData.thankYouMessage.value}
                  onSave={(value) => onFieldUpdate('thankYouMessage', String(value))}
                  className="text-lg md:text-xl leading-relaxed mb-8"
                  style={{
                    fontFamily: template.fonts.body,
                    color: template.colors.textSecondary,
                  }}
                  template={template}
                />
              ) : (
                <p
                  className="text-lg md:text-xl leading-relaxed mb-8"
                  style={{
                    fontFamily: template.fonts.body,
                    color: template.colors.textSecondary,
                  }}
                >
                  {mockData.thankYouMessage.value}
                </p>
              )}

              {/* Couple Signature */}
              {isEditable ? (
                <InlineEditor
                  field={mockData.coupleSignature as EditableField}
                  value={mockData.coupleSignature.value}
                  onSave={(value) => onFieldUpdate('coupleSignature', String(value))}
                  className="text-2xl md:text-3xl font-bold"
                  style={{
                    fontFamily: template.fonts.script || template.fonts.heading,
                    background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  template={template}
                />
              ) : (
                <h3
                  className="text-2xl md:text-3xl font-bold"
                  style={{
                    fontFamily: template.fonts.script || template.fonts.heading,
                    background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {mockData.coupleSignature?.value || ''}
                </h3>
              )}
            </div>
          </motion.div>

          {/* Wedding Details & Stats */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
            variants={containerVariants}
          >
            {/* Wedding Information */}
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2"
              style={{
                borderColor: `${template.colors.primary}20`,
                boxShadow: `0 20px 40px -10px ${template.colors.primary}15`
              }}
              variants={itemVariants}
            >
              <h4
                className="text-xl font-bold mb-6 flex items-center gap-3"
                style={{
                  color: template.colors.primary,
                  fontFamily: template.fonts.heading
                }}
              >
                <Crown className="w-6 h-6" />
                Nosso Grande Dia
              </h4>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5" style={{ color: template.colors.secondary }} />
                  <div>
                    <p className="font-medium">Data do Casamento</p>
                    <p
                      className="text-sm opacity-80"
                      style={{
                        color: template.colors.textSecondary,
                        fontFamily: template.fonts.body
                      }}
                    >
                      {new Date(mockData.weddingDate.value).toLocaleDateString('pt-BR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" style={{ color: template.colors.secondary }} />
                  <div>
                    <p className="font-medium">Local</p>
                    <p
                      className="text-sm opacity-80"
                      style={{
                        color: template.colors.textSecondary,
                        fontFamily: template.fonts.body
                      }}
                    >
                      {mockData.weddingLocation.value}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" style={{ color: template.colors.secondary }} />
                  <div>
                    <p className="font-medium">Contato</p>
                    <p
                      className="text-sm opacity-80"
                      style={{
                        color: template.colors.textSecondary,
                        fontFamily: template.fonts.body
                      }}
                    >
                      {mockData.contactInfo.phone.value}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" style={{ color: template.colors.secondary }} />
                  <div>
                    <p className="font-medium">E-mail</p>
                    <p
                      className="text-sm opacity-80"
                      style={{
                        color: template.colors.textSecondary,
                        fontFamily: template.fonts.body
                      }}
                    >
                      {mockData.contactInfo.email.value}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Wedding Stats */}
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2"
              style={{
                borderColor: `${template.colors.primary}20`,
                boxShadow: `0 20px 40px -10px ${template.colors.primary}15`
              }}
              variants={itemVariants}
            >
              <h4
                className="text-xl font-bold mb-6 flex items-center gap-3"
                style={{
                  color: template.colors.primary,
                  fontFamily: template.fonts.heading
                }}
              >
                <Award className="w-6 h-6" />
                Momentos Especiais
              </h4>

              <div className="grid grid-cols-2 gap-4">
                {weddingStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 rounded-xl"
                    style={{ backgroundColor: `${template.colors.primary}10` }}
                    whileHover={{ scale: 1.05 }}
                    variants={itemVariants}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                      style={{ backgroundColor: template.colors.primary, color: 'white' }}
                    >
                      {stat.icon}
                    </div>
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{
                        color: template.colors.primary,
                        fontFamily: template.fonts.heading
                      }}
                    >
                      {stat.value}
                    </div>
                    <p
                      className="text-sm opacity-80"
                      style={{
                        color: template.colors.textSecondary,
                        fontFamily: template.fonts.body
                      }}
                    >
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h4
              className="text-2xl font-bold mb-8"
              style={{
                color: template.colors.primary,
                fontFamily: template.fonts.heading
              }}
            >
              Siga Nossa Jornada
            </h4>

            <div className="flex justify-center gap-4">
              {socialPlatforms.map((platform) => {
                const username = mockData.socialLinks[platform.key as keyof typeof mockData.socialLinks]?.value;
                if (!username) return null;

                return (
                  <motion.button
                    key={platform.key}
                    onClick={() => openSocialLink(platform)}
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300"
                    style={{ backgroundColor: platform.color }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                  >
                    {platform.icon}
                  </motion.button>
                );
              })}
            </div>

            <p
              className="text-sm mt-4 opacity-80"
              style={{
                color: template.colors.textSecondary,
                fontFamily: template.fonts.body
              }}
            >
              Compartilhe nossos momentos especiais
            </p>
          </motion.div>

          {/* Credits */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 mb-8"
            style={{
              borderColor: `${template.colors.primary}20`,
              boxShadow: `0 20px 40px -10px ${template.colors.primary}15`
            }}
            variants={itemVariants}
          >
            <h4
              className="text-lg font-bold mb-6 text-center flex items-center justify-center gap-3"
              style={{
                color: template.colors.primary,
                fontFamily: template.fonts.heading
              }}
            >
              <Sparkles className="w-5 h-5" />
              Agradecimentos Especiais
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Camera className="w-8 h-8 mx-auto mb-2" style={{ color: template.colors.secondary }} />
                <p
                  className="text-sm font-medium"
                  style={{
                    color: template.colors.text,
                    fontFamily: template.fonts.body
                  }}
                >
                  {mockData.credits.photographer.value}
                </p>
              </div>

              <div>
                <Home className="w-8 h-8 mx-auto mb-2" style={{ color: template.colors.secondary }} />
                <p
                  className="text-sm font-medium"
                  style={{
                    color: template.colors.text,
                    fontFamily: template.fonts.body
                  }}
                >
                  {mockData.credits.venue.value}
                </p>
              </div>

              <div>
                <Globe className="w-8 h-8 mx-auto mb-2" style={{ color: template.colors.secondary }} />
                <p
                  className="text-sm font-medium"
                  style={{
                    color: template.colors.text,
                    fontFamily: template.fonts.body
                  }}
                >
                  {mockData.credits.website.value}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t py-6"
          style={{ borderColor: `${template.colors.primary}30` }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" style={{ color: template.colors.primary }} />
                <p
                  className="text-sm"
                  style={{
                    color: template.colors.textSecondary,
                    fontFamily: template.fonts.body
                  }}
                >
                  © {currentYear} Ana & João. Feito com amor.
                </p>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <span
                  style={{
                    color: template.colors.textSecondary,
                    fontFamily: template.fonts.body
                  }}
                >
                  Desenvolvido por EiVouCasar
                </span>
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  <Smartphone className="w-4 h-4" />
                  <span
                    style={{
                      color: template.colors.textSecondary,
                      fontFamily: template.fonts.body
                    }}
                  >
                    100% Responsivo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full text-white shadow-lg z-50"
            style={{ backgroundColor: template.colors.primary }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="w-6 h-6 mx-auto" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.footer>
  );
} 