'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { TemplateSection, WeddingTemplate } from '@/types/template';
import { InlineEditor } from '../inline-editor';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  const [isMusicPlaying, setIsMusicPlaying] = React.useState(false);
  const [showPlayButton, setShowPlayButton] = React.useState(true);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const data = section.data;

  // Controle de música
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  // Formatação da data
  const formatWeddingDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Estilos dinâmicos baseados no template
  const overlayStyle = {
    background: `linear-gradient(135deg, ${template.colors.primary}33, ${template.colors.secondary}33)`,
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {isEditable ? (
          <InlineEditor
            field={data.heroImage}
            value={data.heroImage.value}
            onSave={(value) => onFieldUpdate('heroImage', String(value))}
            className="w-full h-full"
          />
        ) : (
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-700"
            style={{
              backgroundImage: data.heroImage.value 
                ? `url(${data.heroImage.value})` 
                : `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`
            }}
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0" style={overlayStyle} />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Audio Element */}
      {data.musicUrl?.value && (
        <audio
          ref={audioRef}
          src={data.musicUrl.value}
          loop
          onPlay={() => setIsMusicPlaying(true)}
          onPause={() => setIsMusicPlaying(false)}
          onLoadedData={() => {
            if (data.enableAutoplay) {
              audioRef.current?.play();
            }
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Subtitle */}
        {data.subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            {isEditable ? (
              <InlineEditor
                field={data.subtitle}
                value={data.subtitle.value}
                onSave={(value) => onFieldUpdate('subtitle', String(value))}
                className="text-lg md:text-xl text-white/90 font-light tracking-wide"
                style={{ fontFamily: template.fonts.body }}
              />
            ) : (
              <p 
                className="text-lg md:text-xl text-white/90 font-light tracking-wide"
                style={{ fontFamily: template.fonts.body }}
              >
                {data.subtitle.value}
              </p>
            )}
          </motion.div>
        )}

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-8"
        >
          {isEditable ? (
            <InlineEditor
              field={data.coupleNames}
              value={data.coupleNames.value}
              onSave={(value) => onFieldUpdate('coupleNames', String(value))}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
              style={{ 
                fontFamily: template.fonts.script,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            />
          ) : (
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
              style={{ 
                fontFamily: template.fonts.script,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              {data.coupleNames.value}
            </h1>
          )}
        </motion.div>

        {/* Wedding Date */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-px bg-white/60"></div>
            <div className="w-3 h-3 rounded-full bg-white/80"></div>
            <div className="w-16 h-px bg-white/60"></div>
          </div>
          
          {isEditable ? (
            <InlineEditor
              field={data.weddingDate}
              value={data.weddingDate.value}
              onSave={(value) => onFieldUpdate('weddingDate', String(value))}
              className="text-xl md:text-2xl text-white font-medium tracking-widest"
              style={{ fontFamily: template.fonts.heading }}
            />
          ) : (
            <p 
              className="text-xl md:text-2xl text-white font-medium tracking-widest"
              style={{ fontFamily: template.fonts.heading }}
            >
              {formatWeddingDate(data.weddingDate.value)}
            </p>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Scroll Indicator */}
          <Button
            variant="ghost"
            size="lg"
            className="text-white border-white/30 hover:bg-white/10 backdrop-blur-sm"
            onClick={() => {
              const nextSection = document.querySelector('[id^="invitation-"]');
              nextSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Play className="w-5 h-5 mr-2" />
            Ver Convite
          </Button>

          {/* Music Control */}
          {data.musicUrl?.value && (
            <Button
              variant="ghost"
              size="lg"
              onClick={toggleMusic}
              className="text-white border-white/30 hover:bg-white/10 backdrop-blur-sm"
            >
              {isMusicPlaying ? (
                <Volume2 className="w-5 h-5 mr-2" />
              ) : (
                <VolumeX className="w-5 h-5 mr-2" />
              )}
              {isMusicPlaying ? 'Pausar Música' : 'Tocar Música'}
            </Button>
          )}
        </motion.div>

        {/* Scroll Indicator Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/80 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20 text-2xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            ♥
          </motion.div>
        ))}

        {/* Romantic Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Mobile Optimization */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-section {
            min-height: 100vh;
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </div>
  );
} 