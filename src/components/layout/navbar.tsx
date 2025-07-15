'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X, LogOut, User, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Logo from '@/components/ui/logo'
import { useAuth } from '@/contexts/auth-context'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  // Navbar não deve forçar verificação de auth - apenas verificar passivamente
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

	return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
					{/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
						<Logo size="lg" />
					</Link>
          </div>

					{/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
						<Link
							href="/#features"
                className="text-secondary-600 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
						>
							Funcionalidades
						</Link>
						<Link
                href="/#pricing"
                className="text-secondary-600 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
						>
							Preços
						</Link>
              <Link
                href="/#examples"
                className="text-secondary-600 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Exemplos
              </Link>
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {!loading && user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-secondary-600">
                    Olá, {user.brideName || user.groomName || user.email}
                  </span>
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Button>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-800"
                  >
                    <LogOut className="h-4 w-4" />
									</Button>
                </div>
								) : (
                <div className="flex items-center space-x-3">
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
											Entrar
                    </Button>
										</Link>
                  <Link href="/signup">
                    <Button size="sm" className="bg-primary-500 hover:bg-primary-600 text-white">
                      Começar Grátis
										</Button>
                  </Link>
                </div>
								)}
            </div>
          </div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-secondary-600 hover:text-primary-500 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
						>
							{isOpen ? (
								<X className="block h-6 w-6" />
							) : (
								<Menu className="block h-6 w-6" />
							)}
						</button>
          </div>
					</div>
				</div>

				{/* Mobile menu */}
				{isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-neutral-200">
							<Link
								href="/#features"
              className="text-secondary-600 hover:text-primary-500 block px-3 py-2 rounded-md text-base font-medium"
								onClick={() => setIsOpen(false)}
							>
								Funcionalidades
							</Link>
							<Link
              href="/#pricing"
              className="text-secondary-600 hover:text-primary-500 block px-3 py-2 rounded-md text-base font-medium"
								onClick={() => setIsOpen(false)}
							>
								Preços
							</Link>
											<Link
              href="/#examples"
              className="text-secondary-600 hover:text-primary-500 block px-3 py-2 rounded-md text-base font-medium"
												onClick={() => setIsOpen(false)}
											>
              Exemplos
            </Link>
            
            {/* Mobile User Actions */}
            <div className="pt-4 pb-3 border-t border-neutral-200">
              {!loading && user ? (
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center px-3">
                    <div className="flex-shrink-0">
                      <User className="h-8 w-8 text-secondary-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-secondary-800">
                        {user.brideName || user.groomName || user.email}
                      </div>
                    </div>
                  </div>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
												Dashboard
                    </Button>
											</Link>
                  <Button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    variant="ghost"
                    className="w-full text-secondary-600"
                  >
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
													Entrar
                    </Button>
												</Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white">
													Começar Grátis
                    </Button>
												</Link>
                </div>
								)}
							</div>
						</div>
        </motion.div>
				)}
    </nav>
  )
}
