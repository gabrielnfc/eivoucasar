'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Navigation,
  Phone,
  Car,
  Bus,
  Camera,
  Info,
  ExternalLink,
  Share2,
  Heart,
  Church,
  PartyPopper,
  Home,
  ParkingCircle,
  Route,
  Star,
  MessageCircle
} from 'lucide-react';
import { TemplateSection, WeddingTemplate, VenueSectionData } from '@/types/template';
import { InlineEditor } from '../inline-editor';
import { cn } from '@/lib/utils';

interface VenueSectionProps {
  section: TemplateSection;
  template: WeddingTemplate;
  isEditable: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
}

interface VenueInfo {
  id: string;
  type: 'ceremony' | 'reception' | 'hotel';
  icon: React.ReactNode;
  title: string;
  address: string;
  time: string;
  image?: string;
  description?: string;
  phone?: string;
  website?: string;
  parkingInfo?: string;
  publicTransport?: string;
  mapUrl?: string;
  coordinates?: [number, number];
}

export function VenueSection({
  section,
  template,
  isEditable,
  onFieldUpdate
}: VenueSectionProps) {
  const data = section.data as VenueSectionData;
  const [activeVenue, setActiveVenue] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

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

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  };

  // Mock data para demonstração
  const venues: VenueInfo[] = [
    {
      id: 'ceremony',
      type: 'ceremony',
      icon: <Church className="w-8 h-8" />,
      title: 'Cerimônia',
      address: data.ceremonyAddress?.value || 'Igreja São Francisco, Rua das Flores, 123',
      time: data.ceremonyTime?.value || '16:00',
      image: data.ceremonyImage?.value || '/api/placeholder/600/400',
      description: 'A cerimônia será realizada na bela Igreja São Francisco, um local histórico e aconchegante.',
      phone: '(11) 99999-9999',
      parkingInfo: 'Estacionamento gratuito na rua lateral',
      publicTransport: 'Metrô Linha Azul - Estação Centro (10 min caminhando)',
      mapUrl: 'https://maps.google.com/embed?pb=!1m18!1m12!1m3...',
      coordinates: [-23.5505, -46.6333]
    },
    {
      id: 'reception',
      type: 'reception',
      icon: <PartyPopper className="w-8 h-8" />,
      title: 'Recepção',
      address: data.receptionAddress?.value || 'Salão de Festas Villa Bella, Av. Paulista, 456',
      time: data.receptionTime?.value || '18:00',
      image: data.receptionImage?.value || '/api/placeholder/600/400',
      description: 'A festa será no elegante Salão Villa Bella, com vista panorâmica da cidade.',
      phone: '(11) 88888-8888',
      website: 'https://villabella.com.br',
      parkingInfo: 'Estacionamento valet disponível',
      publicTransport: 'Metrô Linha Verde - Estação Paulista (5 min caminhando)',
      mapUrl: 'https://maps.google.com/embed?pb=!1m18!1m12!1m3...',
      coordinates: [-23.5614, -46.6558]
    }
  ];

  const openDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
  };

  const shareLocation = async (venue: VenueInfo) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Local: ${venue.title}`,
          text: `${venue.address} - ${venue.time}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Erro ao compartilhar:', err);
      }
    } else {
      // Fallback para copiar URL
      try {
        await navigator.clipboard.writeText(`${venue.title}: ${venue.address}`);
        console.log('Endereço copiado!');
      } catch (err) {
        console.log('Erro ao copiar:', err);
      }
    }
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
            background: `radial-gradient(circle at 25% 75%, ${template.colors.primary}, transparent 60%),
                        radial-gradient(circle at 75% 25%, ${template.colors.secondary}, transparent 60%)`
          }}
        />

        {/* Animated Location Pins */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color: template.colors.primary,
              }}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <MapPin className="w-6 h-6" />
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
              {data.title.value}
            </h2>
          )}

          <motion.div
            className="w-32 h-1 mx-auto rounded-full mb-8"
            style={{
              background: `linear-gradient(90deg, ${template.colors.primary}, ${template.colors.secondary})`
            }}
            variants={itemVariants}
          />

          <p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{
              fontFamily: template.fonts.body,
              color: template.colors.textSecondary,
            }}
          >
            Encontre-nos nos locais especiais onde celebraremos nossa união! 💕
          </p>
        </motion.div>

        {/* Venue Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              className="group"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div
                className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-2 overflow-hidden transition-all duration-300 hover:shadow-3xl hover:scale-105"
                style={{
                  borderColor: `${template.colors.primary}20`,
                  boxShadow: `0 25px 50px -12px ${template.colors.primary}20`
                }}
              >
                {/* Venue Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={venue.image || '/api/placeholder/600/400'}
                    alt={venue.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Venue Type Badge */}
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium flex items-center gap-2"
                    style={{
                      background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`
                    }}
                  >
                    {venue.icon}
                    <span>{venue.title}</span>
                  </div>

                  {/* Share Button */}
                  <motion.button
                    onClick={() => shareLocation(venue)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white"
                    style={{ color: template.colors.primary }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Venue Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{
                        fontFamily: template.fonts.heading,
                        color: template.colors.primary,
                      }}
                    >
                      {venue.title}
                    </h3>
                    <p
                      className="text-sm opacity-80"
                      style={{
                        fontFamily: template.fonts.body,
                        color: template.colors.textSecondary,
                      }}
                    >
                      {venue.description}
                    </p>
                  </div>

                  {/* Address & Time */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin 
                        className="w-5 h-5 mt-0.5 flex-shrink-0"
                        style={{ color: template.colors.primary }}
                      />
                      <div>
                        <p
                          className="font-medium"
                          style={{
                            fontFamily: template.fonts.body,
                            color: template.colors.text,
                          }}
                        >
                          {venue.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock 
                        className="w-5 h-5 flex-shrink-0"
                        style={{ color: template.colors.primary }}
                      />
                      <p
                        className="font-medium"
                        style={{
                          fontFamily: template.fonts.body,
                          color: template.colors.text,
                        }}
                      >
                        {venue.time}
                      </p>
                    </div>

                    {venue.phone && (
                      <div className="flex items-center gap-3">
                        <Phone 
                          className="w-5 h-5 flex-shrink-0"
                          style={{ color: template.colors.primary }}
                        />
                        <p
                          className="font-medium"
                          style={{
                            fontFamily: template.fonts.body,
                            color: template.colors.text,
                          }}
                        >
                          {venue.phone}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-3 mb-6">
                    {venue.parkingInfo && (
                      <div className="flex items-start gap-3">
                        <ParkingCircle 
                          className="w-5 h-5 mt-0.5 flex-shrink-0"
                          style={{ color: template.colors.secondary }}
                        />
                        <p
                          className="text-sm"
                          style={{
                            fontFamily: template.fonts.body,
                            color: template.colors.textSecondary,
                          }}
                        >
                          {venue.parkingInfo}
                        </p>
                      </div>
                    )}

                    {venue.publicTransport && (
                      <div className="flex items-start gap-3">
                        <Bus 
                          className="w-5 h-5 mt-0.5 flex-shrink-0"
                          style={{ color: template.colors.secondary }}
                        />
                        <p
                          className="text-sm"
                          style={{
                            fontFamily: template.fonts.body,
                            color: template.colors.textSecondary,
                          }}
                        >
                          {venue.publicTransport}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => openDirections(venue.address)}
                      className="flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                      style={{
                        background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                        color: 'white'
                      }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Navigation className="w-4 h-4" />
                      Como chegar
                    </motion.button>

                    {venue.website && (
                      <motion.button
                        onClick={() => window.open(venue.website, '_blank')}
                        className="py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 border-2"
                        style={{
                          borderColor: template.colors.primary,
                          color: template.colors.primary
                        }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Embedded Map Section */}
        <motion.div
          className="mb-16"
          variants={itemVariants}
        >
          <div
            className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-2 overflow-hidden"
            style={{
              borderColor: `${template.colors.primary}20`,
              boxShadow: `0 25px 50px -12px ${template.colors.primary}20`
            }}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3
                  className="text-2xl font-bold flex items-center gap-3"
                  style={{
                    color: template.colors.primary,
                    fontFamily: template.fonts.heading
                  }}
                >
                  <MapPin className="w-6 h-6" />
                  Localização no Mapa
                </h3>
                <motion.button
                  onClick={() => setShowMap(!showMap)}
                  className="px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 border-2"
                  style={{
                    borderColor: template.colors.primary,
                    color: template.colors.primary
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {showMap ? 'Ocultar' : 'Mostrar'} Mapa
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {showMap && (
                <motion.div
                  className="h-96 bg-gray-100 relative"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 384, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Placeholder for map - in production would use Google Maps API */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin 
                        className="w-16 h-16 mx-auto mb-4"
                        style={{ color: template.colors.primary }}
                      />
                      <p
                        className="text-lg font-medium"
                        style={{
                          color: template.colors.primary,
                          fontFamily: template.fonts.heading
                        }}
                      >
                        Mapa Interativo
                      </p>
                      <p
                        className="text-sm opacity-70"
                        style={{
                          color: template.colors.textSecondary,
                          fontFamily: template.fonts.body
                        }}
                      >
                        Aqui seria exibido o mapa com os locais marcados
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {/* Parking Information */}
          <motion.div
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-2"
            style={{
              borderColor: `${template.colors.accent}30`,
              boxShadow: `0 10px 30px -10px ${template.colors.accent}20`
            }}
            variants={itemVariants}
          >
            <h4
              className="text-lg font-bold mb-4 flex items-center gap-2"
              style={{
                color: template.colors.primary,
                fontFamily: template.fonts.heading
              }}
            >
              <Car className="w-5 h-5" />
              Informações de Estacionamento
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: template.colors.primary }}
                />
                <p
                  className="text-sm"
                  style={{
                    fontFamily: template.fonts.body,
                    color: template.colors.textSecondary,
                  }}
                >
                  Estacionamento gratuito disponível na cerimônia
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: template.colors.primary }}
                />
                <p
                  className="text-sm"
                  style={{
                    fontFamily: template.fonts.body,
                    color: template.colors.textSecondary,
                  }}
                >
                  Serviço de valet disponível na recepção
                </p>
              </div>
            </div>
          </motion.div>

          {/* Transportation Tips */}
          <motion.div
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-2"
            style={{
              borderColor: `${template.colors.accent}30`,
              boxShadow: `0 10px 30px -10px ${template.colors.accent}20`
            }}
            variants={itemVariants}
          >
            <h4
              className="text-lg font-bold mb-4 flex items-center gap-2"
              style={{
                color: template.colors.primary,
                fontFamily: template.fonts.heading
              }}
            >
              <Route className="w-5 h-5" />
              Dicas de Transporte
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: template.colors.primary }}
                />
                <p
                  className="text-sm"
                  style={{
                    fontFamily: template.fonts.body,
                    color: template.colors.textSecondary,
                  }}
                >
                  Metrô e ônibus próximos aos locais
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: template.colors.primary }}
                />
                <p
                  className="text-sm"
                  style={{
                    fontFamily: template.fonts.body,
                    color: template.colors.textSecondary,
                  }}
                >
                  Transporte entre cerimônia e festa organizado
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
} 