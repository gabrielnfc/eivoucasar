'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Target, Users, Heart, Crown, Medal, Gift, Copy, Check, TrendingUp, Zap, Star } from 'lucide-react';
import { TemplateSection, WeddingTemplate, GamificationSectionData } from '@/types/template';
import { InlineEditor } from '../inline-editor';
import { cn } from '@/lib/utils';
import { getThemeStyles } from '@/lib/utils/theme-utils';

interface GamificationSectionProps {
  section: TemplateSection;
  template: WeddingTemplate;
  isEditable: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
}

export function GamificationSection({
  section,
  template,
  isEditable,
  onFieldUpdate
}: GamificationSectionProps) {
  const data = section.data as GamificationSectionData;
  const [copiedPix, setCopiedPix] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const themeStyles = getThemeStyles(template);

  // Mock data para demonstração (em produção viria do backend)
  const mockLeaderboard = [
    { name: 'Família Silva', amount: 2500, members: 8, avatar: '👨‍👩‍👧‍👦', rank: 1 },
    { name: 'Amigos da Faculdade', amount: 1800, members: 12, avatar: '🎓', rank: 2 },
    { name: 'Família Santos', amount: 1200, members: 6, avatar: '💑', rank: 3 },
    { name: 'Colegas de Trabalho', amount: 900, members: 15, avatar: '💼', rank: 4 },
    { name: 'Amigos de Infância', amount: 750, members: 9, avatar: '🧸', rank: 5 },
  ];

  const totalRaised = mockLeaderboard.reduce((sum, group) => sum + group.amount, 0);
  const progressPercentage = Math.min((totalRaised / data.totalGoal) * 100, 100);

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

  const leaderboardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  const copyPixKey = async () => {
    if (data.pixKey?.value) {
      try {
        await navigator.clipboard.writeText(data.pixKey.value);
        setCopiedPix(true);
        setTimeout(() => setCopiedPix(false), 2000);
      } catch (err) {
        console.error('Erro ao copiar chave PIX:', err);
      }
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Trophy className="w-5 h-5 text-amber-600" />;
      default: return <Star className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-amber-400 to-amber-600';
      default: return 'from-gray-200 to-gray-400';
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

        {/* Animated Money Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-300/10"
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
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              {['💰', '💳', '💎', '🎁'][Math.floor(Math.random() * 4)]}
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
              field={data.title}
              value={data.title.value}
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
              {data.title.value}
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
              {data.subtitle?.value || ''}
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

        {/* Main Goal Progress */}
        <motion.div
          className="mb-16"
          variants={itemVariants}
        >
          <div
                          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto"
            style={{
              boxShadow: `0 25px 50px -12px ${themeStyles.primary}20`
            }}
          >
            {/* Goal Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Target 
                  className="w-8 h-8"
                  style={{ color: themeStyles.primary }}
                />
                <h3
                  className="text-2xl md:text-3xl font-bold"
                  style={{
                    fontFamily: themeStyles.fontSecondary,
                    color: themeStyles.primary,
                  }}
                >
                  Meta da Lua de Mel
                </h3>
              </div>

              <div className="flex items-center justify-center gap-8 flex-wrap">
                <div className="text-center">
                  <p
                    className="text-3xl md:text-4xl font-bold"
                    style={{ color: themeStyles.primary }}
                  >
                    R$ {totalRaised.toLocaleString('pt-BR')}
                  </p>
                  <p
                    className="text-sm opacity-70"
                    style={{ color: themeStyles.textSecondary }}
                  >
                    Arrecadado
                  </p>
                </div>
                
                <div className="text-center">
                  <p
                    className="text-xl font-medium opacity-70"
                    style={{ color: themeStyles.textSecondary }}
                  >
                    R$ {data.totalGoal.toLocaleString('pt-BR')}
                  </p>
                  <p
                    className="text-sm opacity-70"
                    style={{ color: themeStyles.textSecondary }}
                  >
                    Meta Total
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative mb-6">
              <div
                className="h-6 bg-gray-200 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: themeStyles.primaryGradient
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </div>
              
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white drop-shadow-lg">
                  {progressPercentage.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* PIX Section */}
            <div className="text-center">
              <p
                className="text-lg font-medium mb-4"
                style={{
                  fontFamily: themeStyles.fontPrimary,
                  color: themeStyles.text,
                }}
              >
                Contribua via PIX:
              </p>

              <div className="flex items-center justify-center gap-4 flex-wrap">
                {isEditable ? (
                  <InlineEditor
                    field={data.pixKey}
                    value={data.pixKey.value}
                    onSave={(value) => onFieldUpdate('pixKey', String(value))}
                    className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm"
                    style={{
                      fontFamily: 'monospace',
                      color: themeStyles.text,
                    }}
                    template={template}
                  />
                ) : (
                  <div
                    className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm"
                    style={{ color: themeStyles.text }}
                  >
                    {data.pixKey.value || 'chave-pix@exemplo.com'}
                  </div>
                )}

                <motion.button
                  onClick={copyPixKey}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300"
                  style={{
                    backgroundColor: themeStyles.primary,
                    color: 'white'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copiedPix ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar PIX
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
        >
          {/* Group Rankings */}
          <motion.div
            className="space-y-4"
            variants={itemVariants}
          >
            <div className="text-center mb-6">
              <h3
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{
                  fontFamily: themeStyles.fontSecondary,
                  color: themeStyles.primary,
                }}
              >
                🏆 Ranking dos Grupos
              </h3>
              <p
                className="text-base opacity-80"
                style={{
                  fontFamily: themeStyles.fontPrimary,
                  color: themeStyles.textSecondary,
                }}
              >
                Qual grupo contribuiu mais?
              </p>
            </div>

            <div className="space-y-3">
              {mockLeaderboard.map((group, index) => (
                <motion.div
                  key={index}
                  className="group cursor-pointer"
                  variants={leaderboardVariants}
                  onClick={() => setSelectedGroup(selectedGroup === index ? null : index)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className={cn(
                      "bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg transition-all duration-300",
                      selectedGroup === index ? "scale-105" : "hover:shadow-xl"
                    )}
                    style={{
                      borderColor: selectedGroup === index ? themeStyles.primary : `${themeStyles.accent}30`
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold",
                          `bg-gradient-to-br ${getRankColor(group.rank)}`
                        )}
                      >
                        {group.rank <= 3 ? getRankIcon(group.rank) : group.rank}
                      </div>

                      {/* Group Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{group.avatar}</span>
                          <h4
                            className="font-bold text-lg"
                            style={{
                              fontFamily: themeStyles.fontSecondary,
                              color: themeStyles.text,
                            }}
                          >
                            {group.name}
                          </h4>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{group.members} membros</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>R$ {group.amount.toLocaleString('pt-BR')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="text-right">
                        <p
                          className="text-2xl font-bold"
                          style={{ color: themeStyles.primary }}
                        >
                          R$ {group.amount.toLocaleString('pt-BR')}
                        </p>
                        <p
                          className="text-sm opacity-70"
                          style={{ color: themeStyles.textSecondary }}
                        >
                          {((group.amount / totalRaised) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    {/* Progress bar for group */}
                    <div className="mt-3">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: themeStyles.primaryGradient
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(group.amount / Math.max(...mockLeaderboard.map(g => g.amount))) * 100}%` }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievement Section */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <div className="text-center mb-6">
              <h3
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{
                  fontFamily: themeStyles.fontSecondary,
                  color: themeStyles.primary,
                }}
              >
                🎯 Conquistas
              </h3>
              <p
                className="text-base opacity-80"
                style={{
                  fontFamily: themeStyles.fontPrimary,
                  color: themeStyles.textSecondary,
                }}
              >
                Marcos alcançados
              </p>
            </div>

            {/* Achievement Cards */}
            <div className="space-y-4">
              {[
                { icon: '🎉', title: 'Primeira Contribuição', desc: 'Primeiras R$ 100 arrecadadas!', achieved: true },
                { icon: '🔥', title: 'Esquentando', desc: 'R$ 1.000 arrecadados', achieved: true },
                { icon: '💪', title: 'Na Metade', desc: 'Metade da meta alcançada', achieved: totalRaised >= data.totalGoal / 2 },
                { icon: '🏆', title: 'Meta Alcançada', desc: 'Meta total atingida!', achieved: totalRaised >= data.totalGoal },
                { icon: '🌟', title: 'Superou a Meta', desc: 'Passou dos 100%!', achieved: totalRaised > data.totalGoal },
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md transition-all duration-300",
                    achievement.achieved ? "opacity-100" : "opacity-50"
                  )}
                  style={{
                    borderColor: achievement.achieved ? `${themeStyles.primary}40` : `${themeStyles.accent}20`
                  }}
                  variants={leaderboardVariants}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-xl",
                        achievement.achieved ? "bg-gradient-to-br from-green-400 to-green-600" : "bg-gray-200"
                      )}
                    >
                      {achievement.achieved ? achievement.icon : '🔒'}
                    </div>
                    <div className="flex-1">
                      <h4
                        className="font-bold"
                        style={{
                          fontFamily: themeStyles.fontSecondary,
                          color: achievement.achieved ? themeStyles.text : themeStyles.textSecondary,
                        }}
                      >
                        {achievement.title}
                      </h4>
                      <p
                        className="text-sm opacity-80"
                        style={{
                          fontFamily: themeStyles.fontPrimary,
                          color: themeStyles.textSecondary,
                        }}
                      >
                        {achievement.desc}
                      </p>
                    </div>
                    {achievement.achieved && (
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      >
                        <Zap 
                          className="w-6 h-6 text-yellow-500"
                        />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <motion.div
                          className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
            style={{
              boxShadow: `0 25px 50px -12px ${themeStyles.primary}20`
            }}
          >
            <div className="mb-6">
              <Gift 
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: themeStyles.primary }}
              />
              <h3
                className="text-2xl font-bold mb-2"
                style={{
                  fontFamily: themeStyles.fontSecondary,
                  color: themeStyles.primary,
                }}
              >
                Faça Parte da Nossa Jornada! 💕
              </h3>
              <p
                className="text-lg opacity-90"
                style={{
                  fontFamily: themeStyles.fontPrimary,
                  color: themeStyles.textSecondary,
                }}
              >
                Sua contribuição nos ajuda a realizar o sonho da lua de mel perfeita!
              </p>
            </div>

            <motion.button
              className="px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg transition-all duration-300"
              style={{
                background: themeStyles.primaryGradient
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={copyPixKey}
            >
              <Heart className="w-5 h-5 inline mr-2" />
              Contribuir Agora
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
} 