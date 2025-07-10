import { TenantProvider } from '@/contexts/tenant-context'
import WeddingNavbar from './wedding-navbar'
import RomanticDecorations from '@/components/ui/romantic-decorations'

interface WeddingLayoutProps {
  children: React.ReactNode
  slug: string
}

export default function WeddingLayout({ children, slug }: WeddingLayoutProps) {
  return (
    <TenantProvider>
      <div className="min-h-screen bg-white relative">
        {/* Romantic decorations as background */}
        <RomanticDecorations variant="section" />
        
        {/* Fixed navigation */}
        <WeddingNavbar />
        
        {/* Main content with top padding for fixed nav */}
        <main className="relative z-10 pt-16">
          {children}
        </main>
      </div>
    </TenantProvider>
  )
}