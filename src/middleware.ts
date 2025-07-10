import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for static files, API routes, and auth routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/pricing') ||
    pathname.startsWith('/verify-email') ||
    pathname.startsWith('/test-auth') ||
    pathname === '/' ||
    pathname === '/favicon.ico' ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Extract slug from pathname (e.g., /joao-maria -> joao-maria)
  const slug = pathname.split('/')[1]
  
  if (!slug) {
    return NextResponse.next()
  }

  try {
    const supabase = await createClient()
    
    // Check if couple exists with this slug
    const { data: couple, error } = await supabase
      .from('couples')
      .select('id, slug, bride_name, groom_name, wedding_date, is_active')
      .eq('slug', slug)
      .single()

    if (error || !couple) {
      // Redirect to home if couple not found
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (!couple.is_active) {
      // Redirect to home if couple is not active
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Add couple data to headers for use in components
    const response = NextResponse.next()
    response.headers.set('x-couple-id', couple.id)
    response.headers.set('x-couple-slug', couple.slug)
    response.headers.set('x-couple-bride', couple.bride_name)
    response.headers.set('x-couple-groom', couple.groom_name)
    response.headers.set('x-couple-wedding-date', couple.wedding_date)
    
    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}