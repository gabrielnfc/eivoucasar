'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Heart, 
  ZoomIn,
  ZoomOut,
  X,
  ChevronLeft,
  ChevronRight,
  Grid,
  Columns,
  Play,
  Pause,
  RotateCcw,
  Download,
  Share2,
  Eye,
  Upload,
  ImageIcon,
  Maximize2,
  Filter,
  Star,
  Calendar,
  MapPin,
  Clock,
  Users,
  Sparkles,
  PlusCircle
} from 'lucide-react';
import { TemplateSection, WeddingTemplate, GallerySection as GallerySectionData } from '@/types/template';
import { InlineEditor } from '../inline-editor';
import { cn } from '@/lib/utils';
import { getThemeStyles } from '@/lib/utils/theme-utils';

interface GallerySectionProps {
  section: TemplateSection;
  template: WeddingTemplate;
  isEditable: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
}

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  alt: string;
  category: string;
  date?: string;
  location?: string;
  likes?: number;
  isLiked?: boolean;
}

type GalleryLayout = 'grid' | 'masonry' | 'carousel' | 'slideshow';

export function GallerySection({
  section,
  template,
  isEditable,
  onFieldUpdate
}: GallerySectionProps) {
  const data = section.data as GallerySectionData;
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [layout, setLayout] = useState<GalleryLayout>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [slideshowInterval, setSlideshowInterval] = useState<NodeJS.Timeout | null>(null);
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
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  const lightboxVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  // Mock gallery data
  const mockImages: GalleryImage[] = [
    {
      id: '1',
      url: '/image/casais/casal1 - 1.jpg',
      caption: 'Nosso primeiro encontro',
      alt: 'Casal no primeiro encontro',
      category: 'namoro',
      date: '2020-02-14',
      location: 'Parque da Cidade',
      likes: 25,
      isLiked: false
    },
    {
      id: '2',
      url: '/image/casais/casal1 - 2.jpg',
      caption: 'Pedido de casamento',
      alt: 'Momento do pedido',
      category: 'pedido',
      date: '2023-06-15',
      location: 'Praia do Leblon',
      likes: 48,
      isLiked: true
    },
    {
      id: '3',
      url: '/image/casais/casal1 - 3.jpg',
      caption: 'Ensaio pré-wedding',
      alt: 'Ensaio fotográfico',
      category: 'ensaio',
      date: '2024-01-20',
      location: 'Centro Histórico',
      likes: 32,
      isLiked: false
    },
    {
      id: '4',
      url: '/image/casais/casal1 - 4.jpg',
      caption: 'Viagem romântica',
      alt: 'Viagem para Paris',
      category: 'viagem',
      date: '2023-12-25',
      location: 'Paris, França',
      likes: 41,
      isLiked: true
    },
    {
      id: '5',
      url: '/image/casais/casal1 - 5.jpg',
      caption: 'Família reunida',
      alt: 'Encontro em família',
      category: 'familia',
      date: '2024-03-10',
      location: 'Casa da Família',
      likes: 28,
      isLiked: false
    },
    {
      id: '6',
      url: '/image/casais/casal2-1.jpg',
      caption: 'Momentos especiais',
      alt: 'Momento romântico',
      category: 'namoro',
      date: '2023-09-08',
      location: 'Restaurante Favorito',
      likes: 35,
      isLiked: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas', count: mockImages.length },
    { id: 'namoro', name: 'Namoro', count: mockImages.filter(img => img.category === 'namoro').length },
    { id: 'pedido', name: 'Pedido', count: mockImages.filter(img => img.category === 'pedido').length },
    { id: 'ensaio', name: 'Ensaio', count: mockImages.filter(img => img.category === 'ensaio').length },
    { id: 'viagem', name: 'Viagens', count: mockImages.filter(img => img.category === 'viagem').length },
    { id: 'familia', name: 'Família', count: mockImages.filter(img => img.category === 'familia').length }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? mockImages 
    : mockImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      setSlideshowInterval(null);
    }
    setIsSlideshow(false);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentIndex + 1) % filteredImages.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const toggleSlideshow = () => {
    if (isSlideshow) {
      if (slideshowInterval) {
        clearInterval(slideshowInterval);
        setSlideshowInterval(null);
      }
      setIsSlideshow(false);
    } else {
      const interval = setInterval(() => {
        navigateImage('next');
      }, 3000);
      setSlideshowInterval(interval);
      setIsSlideshow(true);
    }
  };

  const toggleLike = (imageId: string) => {
    // Em produção, aqui faria a requisição para a API
    console.log('Toggle like for image:', imageId);
  };

  const shareImage = async (image: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.caption,
          text: `Confira esta foto: ${image.caption}`,
          url: image.url
        });
      } catch (err) {
        console.log('Erro ao compartilhar:', err);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isLightboxOpen) {
        switch (event.key) {
          case 'Escape':
            closeLightbox();
            break;
          case 'ArrowLeft':
            navigateImage('prev');
            break;
          case 'ArrowRight':
            navigateImage('next');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, currentIndex]);

  const layoutOptions = [
    { id: 'grid', name: 'Grade', icon: <Grid className="w-4 h-4" /> },
    { id: 'masonry', name: 'Mosaico', icon: <Columns className="w-4 h-4" /> },
    { id: 'carousel', name: 'Carrossel', icon: <Play className="w-4 h-4" /> },
    { id: 'slideshow', name: 'Slideshow', icon: <Maximize2 className="w-4 h-4" /> }
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
            background: `radial-gradient(circle at 30% 70%, ${themeStyles.primary}, transparent 60%),
                        radial-gradient(circle at 70% 30%, ${themeStyles.secondary}, transparent 60%)`
          }}
        />

        {/* Animated Camera Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color: themeStyles.primary,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            >
              <Camera className="w-8 h-8" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
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

          {isEditable ? (
            <InlineEditor
              field={data.subtitle || { id: 'subtitle', type: 'text', value: '' }}
              value={data.subtitle?.value || ''}
              onSave={(value) => onFieldUpdate('subtitle', String(value))}
              className="text-lg md:text-xl max-w-3xl mx-auto mb-8"
              style={{
                fontFamily: themeStyles.fontPrimary,
                color: themeStyles.textSecondary,
              }}
              template={template}
            />
          ) : (
            <p
              className="text-lg md:text-xl max-w-3xl mx-auto mb-8"
              style={{
                fontFamily: themeStyles.fontPrimary,
                color: themeStyles.textSecondary,
              }}
            >
              {data.subtitle?.value || 'Momentos especiais da nossa jornada juntos'}
            </p>
          )}

          <motion.div
            className="w-32 h-1 mx-auto rounded-full"
            style={{
              background: themeStyles.primaryGradient
            }}
            variants={itemVariants}
          />
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-4 mb-12"
          variants={itemVariants}
        >
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                  selectedCategory === category.id
                    ? "text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-800"
                )}
                style={{
                  background: selectedCategory === category.id 
                    ? themeStyles.primaryGradient
                    : 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(10px)',
                  border: selectedCategory === category.id 
                    ? 'none' 
                    : `1px solid ${themeStyles.primary}30`
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{category.name}</span>
                <span className="bg-white/30 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Layout Options */}
          <div className="flex gap-2">
            {layoutOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setLayout(option.id as GalleryLayout)}
                className={cn(
                  "p-3 rounded-full transition-all duration-300 flex items-center gap-2",
                  layout === option.id
                    ? "text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-800"
                )}
                style={{
                  background: layout === option.id 
                    ? themeStyles.primary
                    : 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(10px)',
                  border: layout === option.id 
                    ? 'none' 
                    : `1px solid ${themeStyles.primary}30`
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={option.name}
              >
                {option.icon}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${layout}-${selectedCategory}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
          >
            {/* Grid Layout */}
            {layout === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg"
                    variants={itemVariants}
                    onClick={() => openLightbox(image, index)}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center">
                          <ZoomIn className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm font-medium">Ver foto</p>
                        </div>
                      </div>

                      {/* Like Button */}
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(image.id);
                        }}
                        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart 
                          className={cn(
                            "w-5 h-5 transition-colors",
                            image.isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                          )}
                        />
                      </motion.button>
                    </div>

                    {/* Image Info */}
                    <div className="p-4">
                      <h3
                        className="font-medium mb-1"
                        style={{
                          fontFamily: themeStyles.fontSecondary,
                          color: themeStyles.text,
                        }}
                      >
                        {image.caption}
                      </h3>
                      <div className="flex items-center justify-between text-sm mt-2">
                        <span
                          style={{
                            fontFamily: themeStyles.fontPrimary,
                            color: themeStyles.textSecondary,
                          }}
                        >
                          {image.location}
                        </span>
                        <span
                          style={{
                            fontFamily: themeStyles.fontPrimary,
                            color: themeStyles.textSecondary,
                          }}
                        >
                          {image.date}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span
                            className="text-sm"
                            style={{
                              fontFamily: themeStyles.fontPrimary,
                              color: themeStyles.textSecondary,
                            }}
                          >
                            {image.likes} curtidas
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            shareImage(image);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Share2 className="w-4 h-4" style={{ color: themeStyles.secondary }} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Masonry Layout */}
            {layout === 'masonry' && (
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg mb-6"
                    variants={itemVariants}
                    onClick={() => openLightbox(image, index)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <div className="p-4">
                      <h3
                        className="font-medium mb-1"
                        style={{
                          fontFamily: themeStyles.fontSecondary,
                          color: themeStyles.text,
                        }}
                      >
                        {image.caption}
                      </h3>
                      <p
                        className="text-sm mb-4"
                        style={{
                          fontFamily: themeStyles.fontPrimary,
                          color: themeStyles.textSecondary,
                        }}
                      >
                        {image.location} • {image.date}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Carousel Layout */}
            {layout === 'carousel' && (
              <div className="relative">
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                  {filteredImages.map((image, index) => (
                    <motion.div
                      key={image.id}
                      className="flex-shrink-0 w-80 group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg"
                      variants={itemVariants}
                      onClick={() => openLightbox(image, index)}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <ZoomIn className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      <div className="p-4">
                        <h3
                          className="font-medium mb-1"
                          style={{
                            fontFamily: themeStyles.fontSecondary,
                            color: themeStyles.text,
                          }}
                        >
                          {image.caption}
                        </h3>
                        <p
                          className="text-sm mb-4"
                          style={{
                            fontFamily: themeStyles.fontPrimary,
                            color: themeStyles.textSecondary,
                          }}
                        >
                          {image.location} • {image.date}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Add More Photos Button (if editable) */}
        {isEditable && (
          <motion.div
            className="text-center mt-12"
            variants={itemVariants}
          >
            <motion.button
              className="px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center gap-2 mx-auto"
              style={{
                background: themeStyles.primaryGradient,
                color: 'white'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Adicionar Foto
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            variants={lightboxVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              variants={imageVariants}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Controls */}
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <button
                  onClick={toggleSlideshow}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  {isSlideshow ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={() => shareImage(selectedImage)}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Image */}
              <div className="relative">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm text-white p-4 rounded-b-lg">
                <h3 className="text-lg font-bold mb-2">{selectedImage.caption}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    {selectedImage.date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(selectedImage.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                    {selectedImage.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedImage.location}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{selectedImage.likes}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
} 