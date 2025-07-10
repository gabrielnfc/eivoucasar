# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
```bash
npm run dev          # Development server with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint checking
npm run type-check   # TypeScript type checking
```

### Database
```bash
npm run db:generate  # Generate Prisma client
npm run db:studio    # Open Prisma Studio GUI
npm run db:test      # Test database connection
npm run db:reset     # Reset database (destructive)
```

### Stripe Integration
```bash
npm run stripe:setup  # Configure Stripe products
npm run stripe:listen # Listen to webhooks locally
```

## Architecture Overview

**EiVouCasar** is a multi-tenant wedding SaaS platform built with Next.js 15 App Router. The system allows couples to create gamified wedding websites with contribution systems.

### Core Technologies
- **Next.js 15.3.4** with App Router and Server Components
- **TypeScript 5.x** in strict mode
- **Supabase** for authentication, database, and storage
- **Prisma 6.10.1** as ORM with type-safe queries
- **Tailwind CSS 3.4.0** for styling
- **Framer Motion** for animations
- **Stripe** for SaaS subscriptions

### Multi-tenant Architecture
- Each couple is an isolated tenant
- Row Level Security (RLS) enforced on all tables
- Database isolation: `auth.uid() = couples.user_id`
- Slug-based routing for public sites: `/[slug]/*`

## Database Schema

13 main tables with comprehensive multi-tenant structure:

**Core SaaS Tables:**
- `subscription_plans` - Pricing tiers
- `subscriptions` - Couple subscriptions  
- `couples` - Main tenant entities (with RLS)

**Multi-tenant Tables (all with RLS):**
- `guests` - Guest management with companion support
- `guest_groups` - Gamification groups
- `contributions` - Payment tracking
- `gifts` - Present lists
- `messages` - Guest messages
- `photos` - Gallery management
- `schedule_events` - Wedding timeline
- `achievements` - Gamification rewards
- `custom_domains` - Premium feature
- `analytics_events` - Usage tracking

## Authentication System

**Complete implementation:**
- Supabase Auth with JWT tokens
- Login/signup flows in `/src/app/login/` and `/src/app/signup/`
- Auth context in `/src/contexts/auth-context.tsx`
- API routes in `/src/app/api/auth/`
- Protected routes with middleware

**User flow:**
1. Register → Complete profile → Dashboard access
2. Multi-step signup with couple data collection
3. Profile completion tracking via `isProfileComplete`

## Development Patterns

### Component Structure
Follow the established pattern in `.cursorrules`:
1. Imports (external → internal → types)
2. Types/interfaces
3. Component function
4. Export default

### Server vs Client Components
- **Server Components by default** for data fetching
- **Client Components only for:** forms, state, events, animations
- Mark with `'use client'` only when necessary

### API Route Pattern
```typescript
// Zod validation
const schema = z.object({...})

// Error handling
try {
  const result = await action()
  return { success: true, data: result }
} catch (error) {
  return { success: false, error: error.message }
}
```

### Database Queries
Always use Prisma with RLS consideration:
```typescript
const guests = await prisma.guest.findMany({
  where: { coupleId }, // RLS automatically applied
  include: { group: true },
  orderBy: { createdAt: 'desc' }
})
```

## Design System

### Brand Colors
- Primary: `#fe97a2` (coral pink from logo)
- Secondary: `#535354` (gray from logo)
- Accent: `#ed7a5e` (complementary)
- Background: Always white `#ffffff`

### Component Standards
- Use Tailwind utility classes exclusively
- Consistent spacing: `p-4`, `gap-4`, `space-y-4`
- Modern shadows: `shadow-sm`, `shadow-md` (maximum)
- Responsive design: mobile-first approach

### Animation System
- **34+ romantic CSS animations** for wedding theme
- **Framer Motion** for component interactions
- **Lottie React** for complex animations
- **Animated logo** with heartbeat effects

## File Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes with Zod validation
│   ├── dashboard/         # Protected SaaS dashboard
│   ├── login/             # Authentication pages
│   └── [slug]/            # Public couple sites (planned)
├── components/
│   ├── ui/                # Design system components
│   ├── guests/            # Guest management system
│   ├── landing/           # Landing page modules
│   └── auth/              # Authentication components
├── lib/
│   ├── database/          # Prisma query functions
│   ├── stripe/            # Stripe integration
│   └── auth.ts            # Authentication utilities
├── contexts/              # React contexts
└── types/                 # TypeScript definitions
```

## Security Requirements

### Multi-tenant Security
- RLS policies on all tenant tables
- Auth token validation on API routes
- Data isolation between couples
- No cross-tenant data leakage

### Validation Layers
1. **Frontend (UX)**: Zod schemas for forms
2. **API (Security)**: Server-side validation
3. **Database (Integrity)**: Constraints and RLS

### Code Quality Standards
- TypeScript strict mode enabled
- Zero `console.log` in production
- ESLint + Prettier configuration
- Components under 200 lines
- No `any` types allowed

## Current Status (70% MVP Complete)

**✅ Fully Implemented:**
- Authentication system with Supabase
- Multi-tenant database with RLS
- Guest management system
- Dashboard with modern UI
- Design system with branding
- Landing page with animations
- Romantic animation system

**🚧 In Progress:**
- Stripe subscription integration
- Public couple websites (`/[slug]/*`)
- Gamification system with PIX payments
- Email notification system

## Common Issues

### Hydration Mismatch
- **Status:** Completely resolved
- **Solution:** Proper SSR/CSR handling with `useEffect`

### Authentication Flow
- Profile completion required after signup
- Use `isProfileComplete` to check status
- Redirect to `/dashboard` after login

### Database Connections
- Use `npm run db:test` to verify connection
- Prisma client auto-generated on build
- RLS policies automatically applied

## Integration Points

### Stripe (Configured)
- Product setup via `npm run stripe:setup`
- Webhook handling in `/api/stripe/webhooks`
- Subscription plans in database

### Supabase (Active)
- Authentication and database
- Real-time subscriptions available
- Storage for file uploads

### Planned Integrations
- **AbacatePay** for PIX payments
- **Resend** for email notifications
- **Custom domains** for premium users

## Performance Considerations

- **Turbopack** for fast development
- **Server Components** for better performance
- **Dynamic imports** for heavy components
- **Image optimization** with Next.js Image
- **Bundle analysis** to avoid heavy libraries

## Testing Strategy

Database testing available via `npm run db:test`. No formal test suite currently implemented - focus on TypeScript safety and manual testing through Prisma Studio.

## Deployment

Optimized for **Vercel** deployment with:
- Next.js 15 App Router support
- Automatic CI/CD integration
- Environment variable management
- Database connection pooling