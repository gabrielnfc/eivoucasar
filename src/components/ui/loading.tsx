'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LoadingProps {
  message?: string;
  showTimeout?: boolean;
  timeoutSeconds?: number;
  onComplete?: () => void;
}

export default function Loading({ 
  message = 'Carregando...', 
  showTimeout = false,
  timeoutSeconds = 3,
  onComplete
}: LoadingProps) {
  const [loadingMessage, setLoadingMessage] = useState(message);
  const [animationComplete, setAnimationComplete] = useState(false);

  // ✅ Timing sincronizado com a progress bar
  const progressDuration = timeoutSeconds * 1000;
  const messageInterval1 = progressDuration * 0.4;
  const messageInterval2 = progressDuration * 0.8;

  useEffect(() => {
    if (!showTimeout) {
      // Se não tem timeout, chama onComplete imediatamente
      const timer = setTimeout(() => {
        setAnimationComplete(true);
        onComplete?.();
      }, 100);
      return () => clearTimeout(timer);
    }

    const messageTimer1 = setTimeout(() => {
      setLoadingMessage('Quase pronto...');
    }, messageInterval1);

    const messageTimer2 = setTimeout(() => {
      setLoadingMessage('Finalizando...');
    }, messageInterval2);

    const completeTimer = setTimeout(() => {
      setAnimationComplete(true);
      onComplete?.();
    }, progressDuration);

    return () => {
      clearTimeout(messageTimer1);
      clearTimeout(messageTimer2);
      clearTimeout(completeTimer);
    };
  }, [showTimeout, messageInterval1, messageInterval2, progressDuration, onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Spinner universal com coração EiVouCasar */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <motion.div
            className="w-full h-full border-4 border-purple-300 border-t-purple-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
          <Heart className="absolute inset-0 m-auto w-6 h-6 text-purple-600" />
        </div>

        {/* Mensagem principal */}
        <motion.p 
          className="text-gray-700 font-medium text-lg mb-3"
          key={loadingMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {loadingMessage}
        </motion.p>

        {/* Progress bar - apenas se showTimeout */}
        {showTimeout && (
          <div className="w-48 h-1.5 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: progressDuration / 1000,
                ease: "easeOut" 
              }}
              onAnimationComplete={() => {
                if (!animationComplete) {
                  setAnimationComplete(true);
                  onComplete?.();
                }
              }}
            />
          </div>
        )}

        {/* Timeout info - apenas se showTimeout */}
        {showTimeout && (
          <motion.p 
            className="text-xs text-gray-400"
            animate={{ 
              opacity: animationComplete ? 0.6 : 1 
            }}
            transition={{ duration: 0.3 }}
          >
            {animationComplete 
              ? "Finalizando..." 
              : `Redirecionamento automático em ${timeoutSeconds}s se houver problemas`
            }
          </motion.p>
        )}

        {/* Branding EiVouCasar */}
        <motion.div 
          className="mt-8 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="text-xs text-gray-400 font-medium">EiVouCasar</p>
        </motion.div>
      </div>
    </div>
  );
} 