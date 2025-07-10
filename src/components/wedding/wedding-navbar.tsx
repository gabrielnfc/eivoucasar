'use client'

import { useState } from 'react'
import { Menu, X, Heart } from 'lucide-react'
import { useTenant } from '@/contexts/tenant-context'

const navItems = [
  { id: 'home', label: 'Início', href: '#home' },
  { id: 'invitation', label: 'Convite', href: '#invitation' },
  { id: 'story', label: 'Nossa História', href: '#story' },
  { id: 'groomsmen', label: 'Padrinhos', href: '#groomsmen' },
  { id: 'venue', label: 'Local', href: '#venue' },
  { id: 'location', label: 'Localização', href: '#location' },
  { id: 'contributions', label: 'Vaquinha', href: '#contributions' },
  { id: 'rsvp', label: 'Confirmar Presença', href: '#rsvp' },
  { id: 'messages', label: 'Recados', href: '#messages' }
]

export default function WeddingNavbar() {
  const { couple } = useTenant()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!couple) return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-500" />
            <span className="text-lg font-semibold text-gray-900">
              {couple.bride_name} & {couple.groom_name}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-700 hover:text-rose-500 transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-rose-500 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-500 hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}