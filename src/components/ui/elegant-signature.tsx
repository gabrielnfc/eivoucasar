'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ElegantSignatureProps {
  coupleName: string;
  style?: 'classic' | 'modern' | 'romantic' | 'luxury' | 'vintage' | 'cursive' | 'super-cursive' | 'elegant-cursive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  animated?: boolean;
  showInk?: boolean;
  className?: string;
}

// 🎭 TIPOGRAFIAS MANUSCRITAS ELEGANTES
const signatureFonts = {
  classic: {
    fontFamily: "'Great Vibes', cursive",
    letterSpacing: '0.08em',
    fontWeight: '400',
  },
  modern: {
    fontFamily: "'Dancing Script', cursive", 
    letterSpacing: '0.02em',
    fontWeight: '500',
  },
  romantic: {
    fontFamily: "'Allura', cursive",
    letterSpacing: '0.08em', 
    fontWeight: '400',
  },
  luxury: {
    fontFamily: "'Alex Brush', cursive",
    letterSpacing: '0.06em',
    fontWeight: '400',
  },
  vintage: {
    fontFamily: "'Kaushan Script', cursive",
    letterSpacing: '0.03em',
    fontWeight: '400',
  },
  cursive: {
    fontFamily: "'Satisfy', cursive",
    letterSpacing: '0.05em',
    fontWeight: '400',
  },
  'super-cursive': {
    fontFamily: "'Pacifico', cursive",
    letterSpacing: '0.04em',
    fontWeight: '400',
  },
  'elegant-cursive': {
    fontFamily: "'Courgette', cursive",
    letterSpacing: '0.06em',
    fontWeight: '400',
  }
};

// 📏 TAMANHOS RESPONSIVOS
const signatureSizes = {
  sm: 'text-xl sm:text-2xl',
  md: 'text-2xl sm:text-3xl lg:text-4xl',
  lg: 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl',
  xl: 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl'
};

// 🖋️ HOOK PARA EFEITO MÁQUINA DE ESCREVER
function useTypewriter(text: string, speed: number = 150, delay: number = 500) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    const timer = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return { displayText, isComplete };
}

export function ElegantSignature({
  coupleName,
  style = 'romantic',
  size = 'lg',
  color = '#be185d',
  animated = true,
  showInk = true,
  className = ''
}: ElegantSignatureProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showSignature, setShowSignature] = useState(!animated);
  
  const { displayText, isComplete } = useTypewriter(
    showSignature ? coupleName : '', 
    150, // Velocidade um pouco mais lenta para melhor visualização
    100  // Delay menor para começar mais rápido
  );

  const fontStyle = signatureFonts[style];
  const sizeClass = signatureSizes[size];

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Delay menor para mostrar a assinatura mais rapidamente
        setTimeout(() => setShowSignature(true), 300);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
      setShowSignature(true);
    }
  }, [animated]);

  return (
    <div className={`relative inline-block ${className}`}>
      
      {/* 🎨 EFEITO DE TINTA (OPCIONAL) */}
      {showInk && (
        <motion.div
          className="absolute -inset-4 rounded-xl opacity-5 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse, ${color} 0%, transparent 70%)`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isVisible ? [1, 1.1, 1] : 0, 
            opacity: isVisible ? [0.3, 0.5, 0.3] : 0 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      )}

      {/* ✍️ ASSINATURA PRINCIPAL */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8, rotateZ: -2 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? 1 : 0.8,
          rotateZ: isVisible ? [-2, 1, -1, 0] : -2
        }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          rotateZ: { duration: 1.2, ease: "easeInOut" }
        }}
      >
        {/* 🎭 ASSINATURA COM EFEITO TYPEWRITER E LAYOUT VERTICAL */}
        <div className="transform -rotate-1 text-center">
          {(() => {
            const fullText = animated && showSignature ? displayText : coupleName;
            const loveMatch = fullText.match(/^(Com amor,?\s*)(.*)/i);
            
            if (loveMatch) {
              const [, lovePrefix, coupleNames] = loveMatch;
              const lovePrefixLength = lovePrefix.length;
              
              return (
                <div className="flex flex-col items-center gap-1">
                  {/* 💕 "Com amor," em linha separada acima */}
                  <div
                    className={`${size === 'xl' ? 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl' : 
                                size === 'lg' ? 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl' :
                                size === 'md' ? 'text-lg sm:text-xl lg:text-2xl' : 
                                'text-base sm:text-lg'} opacity-70 leading-tight`}
                    style={{
                      ...fontStyle,
                      color,
                      fontWeight: '300'
                    }}
                  >
                    {animated && showSignature ? 
                      lovePrefix.slice(0, Math.max(0, displayText.length)) : 
                      lovePrefix
                    }
                    
                    {/* ✨ CURSOR PISCANTE (quando ainda está digitando "Com amor,") */}
                    {animated && showSignature && !isComplete && displayText.length <= lovePrefixLength && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="ml-1"
                      >
                        |
                      </motion.span>
                    )}
                  </div>
                  
                  {/* 👰🤵 Nomes do casal em linha separada abaixo */}
                  {(animated && showSignature ? displayText.length > lovePrefixLength : true) && (
                    <div
                      className={`${sizeClass} leading-tight`}
                      style={{
                        ...fontStyle,
                        color,
                      }}
                    >
                      {animated && showSignature ? 
                        coupleNames.slice(0, Math.max(0, displayText.length - lovePrefixLength)) : 
                        coupleNames
                      }
                      
                      {/* ✨ CURSOR PISCANTE (só aparece nos nomes) */}
                      {animated && showSignature && !isComplete && displayText.length > lovePrefixLength && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="ml-1"
                        >
                          |
                        </motion.span>
                      )}
                    </div>
                  )}
                </div>
              );
            } else {
              // Se não houver "Com amor," usa renderização normal
              return (
                <span
                  className={sizeClass}
                  style={{
                    ...fontStyle,
                    color,
                  }}
                >
                  {fullText}
                  
                  {/* ✨ CURSOR PISCANTE */}
                  {animated && !isComplete && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-1"
                    >
                      |
                    </motion.span>
                  )}
                </span>
              );
            }
          })()}
        </div>

        {/* ✨ BRILHO SUTIL - REMOVIDO */}
      </motion.div>

      {/* 🎪 ORNAMENTOS ELEGANTES - REMOVIDOS */}
    </div>
  );
}

// 🎭 COMPONENTE PARA MÚLTIPLAS ASSINATURAS (NOIVOS)
interface CoupleSignatureProps {
  brideName: string;
  groomName: string;
  style?: 'classic' | 'modern' | 'romantic' | 'luxury' | 'vintage' | 'cursive' | 'super-cursive' | 'elegant-cursive';
  layout?: 'horizontal' | 'vertical' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  animated?: boolean;
  separator?: '&' | 'e' | '+' | '💕' | '✨';
  className?: string;
}

export function CoupleSignature({
  brideName,
  groomName,
  style = 'romantic',
  layout = 'horizontal',
  size = 'lg', 
  color = '#be185d',
  animated = true,
  separator = '&',
  className = ''
}: CoupleSignatureProps) {
  
  const layoutClasses = {
    horizontal: 'flex items-center gap-4 sm:gap-6 lg:gap-8',
    vertical: 'flex flex-col items-center gap-3 sm:gap-4',
    stacked: 'flex flex-col items-center gap-1 sm:gap-2'
  };

  const separatorStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: size === 'xl' ? '2rem' : size === 'lg' ? '1.5rem' : '1rem',
    opacity: 0.6,
    color,
  };

  return (
    <div className={`${layoutClasses[layout]} ${className}`}>
      {/* 👰 NOME DA NOIVA */}
      <ElegantSignature
        coupleName={brideName}
        style={style}
        size={size}
        color={color}
        animated={animated}
        showInk={true}
      />

      {/* 💫 SEPARADOR ELEGANTE */}
      <motion.span
        style={separatorStyle}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ 
          duration: 0.5, 
          delay: animated ? 3 : 0.5 
        }}
        className="select-none"
      >
        {separator}
      </motion.span>

      {/* 🤵 NOME DO NOIVO */}
      <ElegantSignature
        coupleName={groomName}
        style={style}
        size={size}
        color={color}
        animated={animated}
        showInk={true}
      />
    </div>
  );
} 