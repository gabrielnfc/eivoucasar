'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Crown, 
  Mail, 
  Clock, 
  Heart, 
  Users, 
  Gift, 
  UserCheck, 
  MapPin, 
  Info, 
  Camera, 
  MessageCircle, 
  Menu,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionNavigatorProps {
  sections: Array<{
    id: string
    name: string
    type: string
    enabled: boolean
  }>
  activeSection?: string
  onSectionClick?: (sectionId: string) => void
  className?: string
}

const sectionIcons = {
  hero: Crown,
  invitation: Mail,
  countdown: Clock,
  story: Heart,
  groomsmen: Users,
  gamification: Gift,
  rsvp: UserCheck,
  venue: MapPin,
  details: Info,
  gallery: Camera,
  testimonials: MessageCircle,
  footer: Menu
}

export function SectionNavigator({ 
  sections, 
  activeSection, 
  onSectionClick,
  className 
}: SectionNavigatorProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [clickedSection, setClickedSection] = useState<string | null>(null)

  // Scroll suave para a seção
  const scrollToSection = (sectionId: string) => {
    setClickedSection(sectionId)
    setTimeout(() => setClickedSection(null), 1000)
    
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
    }
    onSectionClick?.(sectionId)
  }

  if (sections.length === 0) return null

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="md:hidden p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
      >
        {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
      </button>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden flex-1 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 pb-2 min-w-max px-1">
          {sections.map((section, index) => {
            const Icon = sectionIcons[section.type as keyof typeof sectionIcons] || Menu
            const isClicked = clickedSection === section.id
            
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 whitespace-nowrap",
                  "hover:bg-gray-50 active:scale-95 bg-white border border-gray-200",
                  isClicked && "ring-2 ring-purple-300 ring-opacity-50"
                )}
                style={{ minWidth: 'fit-content' }}
              >
                <Icon className="w-3 h-3 flex-shrink-0" />
                <span>{section.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Desktop Navigation - Todos os botões visíveis */}
      <div className="hidden md:flex items-center justify-center flex-1">
        <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm p-0.5 gap-0.5 justify-center max-w-full overflow-hidden">
          {sections.map((section, index) => {
            const Icon = sectionIcons[section.type as keyof typeof sectionIcons] || Menu
            const isClicked = clickedSection === section.id
            
            return (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "relative flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
                  "hover:bg-gray-50 flex-shrink-0 text-gray-700 hover:text-gray-900",
                  isClicked && "ring-2 ring-purple-300 ring-opacity-50"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="whitespace-nowrap hidden lg:block">{section.name}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Mobile Navigation Dropdown - Fallback */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-200 shadow-lg p-2 z-50 max-h-64 overflow-y-auto"
          >
            <div className="grid grid-cols-2 gap-1">
              {sections.map((section, index) => {
                const Icon = sectionIcons[section.type as keyof typeof sectionIcons] || Menu
                const isClicked = clickedSection === section.id
                
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      scrollToSection(section.id)
                      setIsCollapsed(true)
                    }}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                      "hover:bg-gray-50 text-gray-700 hover:text-gray-900",
                      isClicked && "ring-2 ring-purple-300 ring-opacity-50"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-left">{section.name}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 