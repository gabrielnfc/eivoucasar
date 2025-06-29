# MicroSaaS de Casamento - Documentação Completa (MVP Simplificado)

## 📋 Visão Geral do Projeto

**MicroSaaS Multi-tenant** para criação de sites de casamento personalizados com **gamificação de contribuições**. Cada casal cria sua conta, configura seu site único e engaja convidados através de competições entre grupos. O sistema principal gerencia assinaturas, templates e funcionalidades core, enquanto cada casal tem controle total sobre seus dados.

**ESTRATÉGIA MVP**: Foco no core value (sites + gamificação + contribuições) sem integrações complexas para validação de mercado com custo zero.

## 🛠️ Stack Tecnológica (MVP)

### Frontend & Framework

- **Next.js 14+** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** (design system customizado)
- **Shadcn/ui** (componentes base)
- **Framer Motion** (animações)
- **React Hook Form** + **Zod** (validação)

### Backend & Database

- **Supabase** (PostgreSQL + Auth + Storage + Edge Functions)
- **Prisma** (ORM para type safety)
- **Supabase Storage** (upload de imagens)

### Serviços Essenciais (MVP)

- **AbacatePay** (PIX para contribuições dos convidados - R$ 0,80/transação)
- **Stripe** (assinaturas recorrentes do SaaS)
- **Resend** (email transacional - notificações)

### Integrações Futuras (Phase 2 - Pós-validação)

- **Evolution API** (WhatsApp - após MRR > R$ 2.000)
- **Instagram Basic Display API** (fotos - quando demandado)
- **Google Calendar API** (eventos - quando demandado)

### Monitoramento & Analytics

- **Vercel Analytics**
- **Sentry** (error tracking)
- **Posthog** (product analytics)

## 🗂️ Estrutura do Projeto

eicasei/
├── src/
│   ├── app/                    # App Router (Next.js 14+)
│   │   ├── (auth)/            # Auth do SaaS (assinaturas)
│   │   ├── (dashboard)/       # Dashboard dos casais
│   │   ├── (public)/          # Landing page do SaaS
│   │   ├── api/               # API Routes
│   │   │   ├── webhooks/      # Stripe, AbacatePay webhooks
│   │   │   ├── integrations/  # Proxy para APIs externas
│   │   │   └── tenant/        # APIs específicas por casal
│   │   ├── admin/             # Admin do SaaS (nosso)
│   │   └── [domain]/          # Sites multi-tenant dos casais
│   ├── components/
│   │   ├── ui/                # Componentes base (shadcn)
│   │   ├── saas/              # Componentes do SaaS principal
│   │   ├── wedding/           # Componentes dos sites de casamento
│   │   └── integrations/      # Componentes de integração
│   ├── lib/
│   │   ├── database/          # Queries multi-tenant
│   │   ├── integrations/      # SDKs e wrappers
│   │   ├── tenant/            # Lógica de multi-tenancy
│   │   └── subscription/      # Gestão de assinaturas
│   ├── types/                 # TypeScript definitions
│   └── styles/                # CSS global + temas por tenant
├── prisma/                    # Database schema multi-tenant
├── public/                    # Assets estáticos
└── docs/                      # Documentação técnica

## 🎯 Roadmap de Desenvolvimento (MVP Focado)

### Phase 1 - MVP Core (6 Semanas - CUSTO ZERO)

**Semanas 1-2: SaaS Foundation**
- Setup inicial do projeto (Next.js + TypeScript + Tailwind)
- Configuração do Supabase + Prisma (multi-tenant)
- Sistema de autenticação para casais
- Gestão de assinaturas (Stripe)
- Landing page do SaaS
- Dashboard base para casais

**Semanas 3-4: Multi-tenancy & Sites Core**
- Sistema de domínios personalizados (slug-based)
- Criação de sites de casamento
- Página inicial dos casais
- Sistema RSVP (email notifications)
- Informações do evento
- Lista de presentes básica

**Semanas 5-6: Gamificação & Monetização**
- Integração AbacatePay (PIX para convidados)
- Sistema de contribuições
- Grupos de convidados
- Rankings e leaderboards em tempo real
- Sistema de metas e recompensas
- Polish e otimizações

### Phase 2 - Integrações Avançadas (Pós-validação)

**Critérios para Phase 2:**
- ✅ MRR > R$ 2.000/mês (sustentado por 3 meses)
- ✅ 20+ casais ativos
- ✅ Demanda clara dos clientes por integrações

**Integrações a adicionar:**
- **Evolution API** (WhatsApp próprio - +R$ 70/mês infraestrutura)
- **Instagram** (fotos automáticas)
- **Google Calendar** (sincronização de eventos)
- **Dashboard de integrações**

### Phase 3 - Escala & Analytics (Pós-validação)

- Dashboard administrativo do SaaS
- Analytics avançado por casal
- Relatórios e métricas
- Otimização de performance

## 🎮 Sistema de Gameficação

### Mecânicas Principais

1. **Grupos de Convidados**
   - Família da noiva/noivo
   - Amigos da faculdade
   - Colegas de trabalho
   - Outros (customizável)

2. **Rankings Dinâmicos**
   - Individual: Top contribuidores
   - Por grupo: Competição entre famílias/amigos
   - Percentual de meta atingida

3. **Metas e Recompensas**
   - Lua de mel: R$ 5.000
   - Mobília: R$ 3.000
   - Festa: R$ 2.000
   - Desbloqueio de brindes por meta

4. **Cupons Automáticos**
   - QR codes gerados automaticamente
   - Prêmios personalizados
   - Expiração configurável

## 📊 Estrutura do Banco de Dados (MVP)

### Entidades Principais (Multi-tenant com RLS)

```sql
-- 🏢 SaaS: Planos de assinatura (SIMPLIFICADOS)
subscription_plans
- id (uuid, pk)
- name (varchar) -- "Básico", "Premium", "Pro"
- price_monthly (decimal) -- 29.90, 49.90, 79.90
- price_yearly (decimal) -- 299.90, 499.90, 799.90
- max_guests (integer) -- 50, 150, ilimitado
- max_photos (integer) -- 20, 100, ilimitado
- allows_custom_domain (boolean) -- false, true, true
- allows_analytics (boolean) -- false, false, true
- is_active (boolean)
- created_at, updated_at

-- 🏢 SaaS: Assinaturas dos casais
subscriptions
- id (uuid, pk)
- couple_id (uuid, fk -> couples.id)
- plan_id (uuid, fk -> subscription_plans.id)
- stripe_subscription_id (varchar)
- stripe_customer_id (varchar)
- status (enum: "active", "canceled", "past_due", "unpaid")
- current_period_start (timestamp)
- current_period_end (timestamp)
- cancel_at_period_end (boolean)
- created_at, updated_at

-- 👰🤵 Multi-tenant: Casais (tenants principais)
couples
- id (uuid, pk)
- user_id (uuid, fk -> auth.users.id) -- Supabase Auth
- slug (varchar, unique) -- "joao-maria-2025"
- custom_domain (varchar, unique, nullable) -- Premium/Pro only
- bride_name (varchar)
- groom_name (varchar)
- wedding_date (date)
- ceremony_venue (text)
- reception_venue (text)
- welcome_message (text)
- story (text)
- cover_photo_url (varchar)
- theme_colors (jsonb) -- {"primary": "#d946ef", "secondary": "#f97316"}
- is_active (boolean)
- is_published (boolean)
- created_at, updated_at
-- RLS: auth.uid() = couples.user_id

-- 👥 Grupos de convidados (GAMIFICAÇÃO CORE)
guest_groups
- id (uuid, pk)
- couple_id (uuid, fk -> couples.id)
- name (varchar) -- "Família da Noiva", "Amigos do Trabalho"
- color (varchar) -- "#3b82f6"
- target_amount (decimal) -- Meta de contribuição
- current_amount (decimal, default: 0)
- member_count (integer, default: 0)
- emoji (varchar) -- "👨‍👩‍👧‍👦"
- created_at, updated_at
-- RLS: auth.uid() = (SELECT user_id FROM couples WHERE id = couple_id)

-- 👤 Convidados (por casal)
guests
- id (uuid, pk)
- couple_id (uuid, fk -> couples.id)
- group_id (uuid, fk -> guest_groups.id)
- name (varchar)
- email (varchar)
- phone (varchar, nullable) -- Para futuras integrações
- rsvp_status (enum: "pending", "confirmed", "declined")
- companions_count (integer, default: 0)
- dietary_restrictions (text)
- notes (text)
- total_contributed (decimal, default: 0)
- invitation_sent_at (timestamp)
- responded_at (timestamp)
- created_at, updated_at
-- RLS: auth.uid() = (SELECT user_id FROM couples WHERE id = couple_id)

-- 💰 Contribuições via AbacatePay (CORE MONETIZATION)
contributions
- id (uuid, pk)
- guest_id (uuid, fk -> guests.id)
- couple_id (uuid, fk -> couples.id)
- group_id (uuid, fk -> guest_groups.id)
- amount (decimal)
- goal_type (enum: "honeymoon", "furniture", "party", "other")
- goal_description (varchar)
- abacate_payment_id (varchar, unique)
- abacate_billing_id (varchar)
- pix_key (varchar)
- qr_code (text)
- status (enum: "pending", "paid", "expired", "failed")
- paid_at (timestamp)
- expires_at (timestamp)
- created_at, updated_at
-- RLS: auth.uid() = (SELECT user_id FROM couples WHERE id = couple_id)

-- 🎁 Lista de presentes (por casal)
gifts
- id (uuid, pk)
- couple_id (uuid, fk -> couples.id)
- name (varchar)
- description (text)
- price (decimal)
- image_url (varchar)
- external_url (varchar) -- Link Amazon, etc
- category (varchar) -- "Casa", "Cozinha", "Eletrônicos"
- is_reserved (boolean, default: false)
- reserved_by_name (varchar)
- reserved_by_email (varchar)
- reserved_at (timestamp)
- notes (text) -- Mensagem do presenteador
- created_at, updated_at
-- RLS: auth.uid() = (SELECT user_id FROM couples WHERE id = couple_id)

-- 💌 Mensagens/Depoimentos dos convidados
messages
- id (uuid, pk)
- couple_id (uuid, fk -> couples.id)
- guest_name (varchar)
- guest_email (varchar)
- content (text)
- is_approved (boolean, default: true)
- is_featured (boolean, default: false)
- created_at, updated_at
-- RLS: auth.uid() = (SELECT user_id FROM couples WHERE id = couple_id)

-- 🌐 Domínios customizados (Premium/Pro plans)
custom_domains
- id (uuid, pk)
- couple_id (uuid, fk -> couples.id)
- domain (varchar, unique) -- "nosso-casamento.com"
- is_verified (boolean, default: false)
- ssl_status (enum: "pending", "active", "error")
- verification_token (varchar)
- dns_configured (boolean, default: false)
- created_at, updated_at
-- RLS: auth.uid() = (SELECT user_id FROM couples WHERE id = couple_id)

-- 📊 Analytics e eventos (tracking)
analytics_events
- id (uuid, pk)
- couple_id (uuid, fk -> couples.id)
- event_type (enum: "page_view", "rsvp", "contribution", "gift_reserved")
- event_data (jsonb) -- Dados específicos do evento
- user_agent (text)
- ip_address (inet)
- created_at
-- RLS: auth.uid() = (SELECT user_id FROM couples WHERE id = couple_id)

-- 🎮 Conquistas e gamificação (DIFERENCIAL COMPETITIVO)
achievements
- id (uuid, pk)
- couple_id (uuid, fk -> couples.id)
- guest_id (uuid, fk -> guests.id, nullable)
- group_id (uuid, fk -> guest_groups.id, nullable)
- type (enum: "first_contribution", "goal_reached", "top_contributor", "group_winner")
- title (varchar) -- "Primeiro a Contribuir!"
- description (text) -- "Você foi o primeiro a contribuir para nossa lua de mel!"
- badge_url (varchar) -- URL do badge/ícone
- reward_type (enum: "discount_coupon", "special_mention", "gift")
- reward_data (jsonb) -- Dados do prêmio
- is_claimed (boolean, default: false)
- claimed_at (timestamp)
- created_at, updated_at
-- RLS: auth.uid() = (SELECT user_id FROM couples WHERE id = couple_id)

-- 📸 Galeria de fotos (SIMPLIFICADA - upload manual)
photos
- id (uuid, pk)
- couple_id (uuid, fk -> couples.id)
- title (varchar)
- description (text)
- url (varchar) -- Supabase Storage URL
- thumbnail_url (varchar)
- category (enum: "engagement", "pre_wedding", "ceremony", "reception")
- order_index (integer)
- is_featured (boolean, default: false)
- uploaded_by (varchar) -- "couple" ou nome do convidado
- created_at, updated_at
-- RLS: auth.uid() = (SELECT user_id FROM couples WHERE id = couple_id)

-- 📅 Cronograma do dia
schedule_events
- id (uuid, pk)
- couple_id (uuid, fk -> couples.id)
- title (varchar) -- "Cerimônia", "Recepção", "Primeira Dança"
- description (text)
- start_time (timestamp)
- end_time (timestamp)
- location (varchar)
- is_public (boolean, default: true) -- Visível para convidados
- order_index (integer)
- created_at, updated_at
-- RLS: auth.uid() = (SELECT user_id FROM couples WHERE id = couple_id)

-- 📧 Email notifications (替代 WhatsApp no MVP)
email_notifications
- id (uuid, pk)
- couple_id (uuid, fk -> couples.id)
- guest_id (uuid, fk -> guests.id, nullable)
- type (enum: "rsvp_confirmation", "contribution_thanks", "achievement_unlock", "reminder")
- subject (varchar)
- content (text)
- template_id (varchar)
- status (enum: "pending", "sent", "delivered", "failed")
- sent_at (timestamp)
- error_message (text, nullable)
- created_at, updated_at
-- RLS: auth.uid() = (SELECT user_id FROM couples WHERE id = couple_id)
```

## 🔧 Cursor Rules

```yaml
# .cursorrules
# eicasei - Regras para desenvolvimento limpo e eficiente

## 🎯 PRINCÍPIOS FUNDAMENTAIS
- KISS (Keep It Simple, Stupid) - Simplicidade acima de tudo
- DRY (Don't Repeat Yourself) - Zero duplicação desnecessária  
- YAGNI (You Aren't Gonna Need It) - Evite over-engineering
- Clean Code - Código legível e auto-documentado
- Performance First - Otimizações desde o início

## 📝 CONVENÇÕES DE NOMENCLATURA
# Componentes: PascalCase
WeddingCard, GuestList, ContributionForm

# Arquivos: kebab-case
wedding-card.tsx, guest-list.tsx, contribution-form.tsx

# Variáveis/Funções: camelCase
guestCount, handleSubmit, createPayment

# Constantes: UPPER_SNAKE_CASE
MAX_GUESTS, DEFAULT_THEME, API_ENDPOINTS

# Tipos/Interfaces: PascalCase com sufixo
type User = {...}
interface GuestData {...}
type PaymentStatus = "pending" | "paid"

## 🏗️ ESTRUTURA DE COMPONENTES
# SEMPRE use esta estrutura:
1. Imports (externos → internos → tipos)
2. Tipos/Interfaces locais
3. Component principal
4. Export default

# Exemplo:
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Guest } from '@/types'

interface Props {
  guests: Guest[]
}

export default function GuestList({ guests }: Props) {
  // lógica aqui
}

## 🎨 ESTILIZAÇÃO MODERNA
# Use apenas Tailwind utility classes
- NUNCA custom CSS a menos que absolutamente necessário
- Prefira classes semânticas: bg-white, text-gray-900
- Use design tokens consistentes: space-4, text-sm, rounded-lg
- Dark mode ready: dark:bg-gray-900, dark:text-white

# Paleta moderna minimalista:
- Primary: slate-900, slate-50
- Accent: rose-500, rose-50  
- Success: emerald-500, emerald-50
- Warning: amber-500, amber-50
- Error: red-500, red-50

# Componentes minimalistas:
- Bordas sutis: border border-gray-200
- Sombras leves: shadow-sm, shadow-md (máximo)
- Espaçamentos consistentes: p-4, gap-4, space-y-4
- Tipografia limpa: text-sm, font-medium, leading-relaxed

## ⚛️ PADRÕES REACT/NEXT.JS
# Server Components por padrão
- Use 'use client' APENAS quando necessário (interatividade)
- Prefira Server Components para busca de dados
- Client Components apenas para: forms, states, eventos

# Hooks personalizados para lógica complexa
# Exemplo:
function useGuests(coupleId: string) {
  const [guests, setGuests] = useState<Guest[]>([])
  // lógica aqui
  return { guests, addGuest, updateGuest }
}

# NUNCA duplicate código:
- Extraia lógica comum em hooks
- Crie componentes reutilizáveis
- Use constantes para valores repetidos

## 🗃️ PADRÕES DE DATABASE
# SEMPRE use Prisma com TypeScript
- Tipos automáticos: Prisma.Guest, Prisma.Couple
- Queries type-safe: prisma.guest.findMany()
- NUNCA SQL raw desnecessário

# RLS (Row Level Security) obrigatório:
auth.uid() = couples.user_id

# Padrão de queries:
const guests = await prisma.guest.findMany({
  where: { coupleId },
  include: { group: true },
  orderBy: { createdAt: 'desc' }
})

## 🔧 PADRÕES DE API
# SEMPRE validação com Zod
import { z } from 'zod'

const guestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional()
})

# Error handling consistente:
try {
  const result = await action()
  return { success: true, data: result }
} catch (error) {
  return { success: false, error: error.message }
}

# NUNCA exponha dados sensíveis:
- Sempre select específico
- Sanitize outputs
- Rate limiting em APIs públicas

## 📱 RESPONSIVIDADE MODERNA
# Mobile-first sempre:
- Base: mobile design
- md: tablet (768px+)
- lg: desktop (1024px+)
- xl: large desktop (1280px+)

# Grid moderno:
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

# Flexbox semântico:
flex flex-col md:flex-row items-center justify-between

## 🚀 PERFORMANCE
# Otimizações obrigatórias:
- Dynamic imports: const Component = dynamic(() => import('./Heavy'))
- Image optimization: <Image> do Next.js sempre
- Lazy loading: loading="lazy" por padrão
- Bundle analysis: evite bibliotecas pesadas

# Evite re-renders:
- React.memo para componentes pesados
- useMemo para computações custosas
- useCallback para funções em deps

## 🔐 SEGURANÇA
# Validação em múltiplas camadas:
1. Frontend (UX) - Zod schemas
2. API (segurança) - Validação server-side
3. Database (integridade) - Constraints

# NUNCA confie no cliente:
- Sempre validar no servidor
- Rate limiting em APIs
- Sanitize inputs

## 🧪 QUALIDADE DE CÓDIGO
# Comentários apenas quando necessário:
- Código deve ser auto-explicativo
- Comentários para lógica complexa de negócio
- JSDoc para funções utilitárias

# Refatoração contínua:
- Funções pequenas (< 20 linhas)
- Componentes focados (single responsibility)
- Extraia constantes e tipos

# EVITE:
- Nested ternários complexos
- Funções anônimas em JSX
- Estados desnecessários
- Props drilling (use context quando necessário)

## 🔄 PADRÕES DE ESTADO
# useState para estado local simples
# Para estado complexo, use useReducer:
const [state, dispatch] = useReducer(reducer, initialState)

# Context apenas para:
- Tema/configurações globais
- Auth state
- Multi-tenant context (couple data)

# NUNCA global state desnecessário

## 📦 IMPORTS ORGANIZADOS
# Ordem:
1. React/Next.js
2. Bibliotecas externas
3. Componentes internos
4. Utils/helpers
5. Tipos

# Exemplo:
import React from 'react'
import { NextPage } from 'next'
import { Button } from '@/components/ui/button'
import { GuestCard } from '@/components/guest-card'
import { formatDate } from '@/lib/utils'
import type { Guest } from '@/types'

## 🌐 MULTI-TENANCY
# SEMPRE considere isolamento:
- RLS no banco
- Middleware para routing
- Context para tenant atual
- Cache por tenant

# Padrão de hook:
function useTenant() {
  const { slug } = useParams()
  const couple = useCoupleBySlug(slug)
  return { couple, isLoading }
}

## 🎯 INTEGRAÇÕES
# Wrapper pattern para APIs externas:
class AbacatePayService {
  async createPayment(data: PaymentData) {
    // implementação limpa
  }
}

# NUNCA hardcode credentials:
- Use env vars sempre
- Validate env vars na inicialização
- Type-safe env com Zod

## 🚨 ANTI-PATTERNS (NUNCA FAÇA)
❌ Componentes gigantes (>200 linhas)
❌ Props drilling profundo
❌ useState para dados do servidor
❌ Fetch direto em componentes
❌ CSS inline ou styled-components
❌ console.log em produção
❌ any types no TypeScript
❌ Mutação direta de state
❌ useEffect para tudo
❌ Nested folders profundos

## ✅ BOAS PRÁTICAS (SEMPRE FAÇA)
✅ Componentes pequenos e focados
✅ Custom hooks para lógica
✅ Server Components quando possível
✅ Error boundaries em componentes críticos
✅ Loading states consistentes
✅ TypeScript strict mode
✅ Accessible components (a11y)
✅ SEO meta tags
✅ Progressive enhancement
✅ Graceful degradation

## 🔍 CODE REVIEW CHECKLIST
Antes de commitar, verifique:
□ Zero TypeScript errors
□ Zero console.logs
□ Componentes < 200 linhas
□ Nomes descritivos
□ Sem duplicação
□ Performance otimizada
□ Acessibilidade básica
□ Mobile responsive
□ Error handling
□ Loading states
```

## 🚀 Configuração Inicial (MVP)

### 1. Setup do Projeto

```bash
npx create-next-app@latest eicasei --typescript --tailwind --eslint --app
cd eicasei
npm install @supabase/supabase-js prisma @prisma/client
npm install @stripe/stripe-js stripe
npm install framer-motion lucide-react
npm install react-hook-form @hookform/resolvers zod
npm install resend # Para notificações email
```

### 2. Configuração do Supabase

```bash
# Instalar Supabase CLI
npm install supabase --save-dev

# Inicializar projeto
npx supabase init

# Configurar variáveis de ambiente
cp .env.example .env.local
```

### 3. Configuração do Prisma

```bash
npx prisma init
npx prisma generate
npx prisma db push
```

## 🔐 Variáveis de Ambiente (MVP)

```bash
# .env.local
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AbacatePay (Pagamentos dos convidados)
ABACATE_API_KEY=your_abacate_api_key
ABACATE_WEBHOOK_SECRET=your_webhook_secret

# Stripe (Assinaturas do SaaS)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Resend)
RESEND_API_KEY=re_...

# FUTURAS INTEGRAÇÕES (Phase 2)
# Google APIs (cada casal conecta sua conta)
# GOOGLE_CLIENT_ID=your_google_client_id
# GOOGLE_CLIENT_SECRET=your_google_client_secret

# Evolution API (WhatsApp)
# EVOLUTION_API_BASE_URL=https://your-evolution-instance.com
# EVOLUTION_API_KEY=your_evolution_api_key

# Instagram Basic Display (cada casal conecta)
# INSTAGRAM_CLIENT_ID=your_instagram_client_id  
# INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
```

## 📝 Checklist de Funcionalidades (MVP)

### Core SaaS

- ✅ Cadastro e autenticação de casais
- ✅ Gestão de assinaturas (Stripe)
- ✅ Dashboard administrativo básico
- ✅ Landing page de conversão
- ✅ Sistema multi-tenant

### Sites dos Casais

- ✅ Página inicial personalizada
- ✅ Nome dos noivos + foto de capa
- ✅ Contagem regressiva animada
- ✅ Tema visual personalizável
- ✅ Informações do evento (data, local)
- ✅ História do casal

### Sistema RSVP

- ✅ Formulário simples sem login
- ✅ Validação de dados em tempo real
- ✅ Confirmação por email automática
- ✅ Gestão de acompanhantes
- ✅ Status tracking no dashboard

### Lista de Presentes

- ✅ Links externos (Amazon, etc)
- ✅ Lista interna com reservas
- ✅ Sistema de contribuição PIX
- ✅ Notificações de reserva (email)

### Sistema de Gameficação (DIFERENCIAL)

- ✅ Criação de grupos de convidados
- ✅ Rankings individuais e por grupo
- ✅ Barras de progresso para metas
- ✅ Sistema de cupons/prêmios
- ✅ Notificações de conquistas (email)
- ✅ Updates em tempo real

### Dashboard dos Casais

- ✅ Overview de confirmações
- ✅ Relatórios de contribuições
- ✅ Gestão de convidados
- ✅ Exportação de dados
- ✅ Analytics básico

### Removido do MVP (Phase 2)

- ❌ Integração WhatsApp (Evolution API)
- ❌ Integração Instagram
- ❌ Integração Google Calendar
- ❌ Dashboard de integrações
- ❌ Sincronização automática de fotos

## 🔄 Fluxos Principais (MVP)

### 1. Onboarding do Casal (SaaS)

```
Landing Page → Cadastro → Escolha do Plano → Pagamento (Stripe) → 
Setup inicial → Criação do site → Personalização → Publicação
```

### 2. RSVP de Convidado

```
Acesso ao site do casal → Preenchimento do form → Confirmação → 
Email de confirmação → Atualização do dashboard
```

### 3. Contribuição via AbacatePay

```
Escolha do valor → Seleção da meta → Geração do PIX → 
Pagamento → Webhook → Atualização do ranking → Email de agradecimento
```

### 4. Gestão Multi-tenant

```
Identificação do tenant (slug) → Carregamento dos dados → 
Aplicação do tema → Renderização personalizada
```

### 5. Gamificação em Tempo Real

```
Nova contribuição → Atualização do grupo → Recálculo do ranking → 
Verificação de conquistas → Notificação de badges → Update UI
```

## 📈 Métricas e KPIs (MVP)

### Métricas de Validação

- **Taxa de conversão RSVP**: >70%
- **Valor médio por contribuição**: R$ 50+
- **Engajamento gamificação**: Rankings acessados diariamente
- **Tempo médio no site**: >3 minutos

### Métricas de Negócio

- **MRR (Monthly Recurring Revenue)**: Meta R$ 2.000
- **Número de casais ativos**: Meta 20+
- **Taxa de churn**: <10%/mês
- **CAC vs LTV**: LTV > 3x CAC

### Critérios para Phase 2

- ✅ MRR > R$ 2.000/mês (sustentado 3 meses)
- ✅ 20+ casais ativos usando gamificação
- ✅ Feedback positivo sobre core features
- ✅ Demanda clara por integrações

## 💰 Modelo de Negócio (MVP Simplificado)

### Planos de Assinatura

```
🥉 BÁSICO - R$ 29,90/mês
├── Até 50 convidados
├── Site personalizado (slug)
├── RSVP + Lista de presentes
├── Gamificação básica
└── Email notifications

🥈 PREMIUM - R$ 49,90/mês  
├── Até 150 convidados
├── Domínio customizado
├── Gamificação avançada
├── Analytics detalhado
└── Suporte prioritário

🥇 PRO - R$ 79,90/mês
├── Convidados ilimitados
├── Múltiplos domínios
├── White-label parcial
├── API access
└── Suporte dedicado
```

### Revenue Streams

- **Assinaturas**: R$ 29,90 - R$ 79,90/mês
- **Setup fee**: R$ 49,90 (opcional)
- **Domínios premium**: R$ 19,90/mês
- **AbacatePay commission**: 10% sobre R$ 0,80 = R$ 0,08/transação

## 🚀 Deploy e Produção (MVP)

### Ambientes

- **Development**: Local + Supabase dev
- **Production**: Vercel + Supabase prod (FREE TIERS)

### Custo Mensal MVP

```
✅ Vercel (Hobby): GRATUITO
✅ Supabase (Free): GRATUITO  
✅ Domínio (.com): R$ 40/ano (~R$ 3/mês)
✅ Resend (Free): 3.000 emails/mês grátis
✅ AbacatePay: Apenas R$ 0,80/transação
✅ Stripe: 2.9% + R$ 0,39/transação

TOTAL MENSAL: ~R$ 3/mês até ter clientes!
```

## ✅ **CHECKLIST FINAL - MVP VALIDADO**

### 🎯 **Conceito Focado**

- ✅ MicroSaaS Multi-tenant para sites de casamento
- ✅ **DIFERENCIAL**: Gamificação de contribuições
- ✅ Validação com custo ZERO
- ✅ Monetização desde o dia 1

### 💳 **Estratégia de Pagamento Simplificada**

- ✅ **AbacatePay**: PIX para contribuições (R$ 0,80/transação)
- ✅ **Stripe**: Assinaturas recorrentes (2.9%)
- ✅ Sem custos fixos até validar

### 🛠️ **Stack Validada (Custo Zero)**

- ✅ **Next.js 14 + TypeScript + Tailwind**
- ✅ **Supabase FREE tier**
- ✅ **Vercel FREE tier**
- ✅ **Resend FREE tier (3k emails)**

### 🎮 **Gamificação como Core**

- ✅ **Grupos de convidados**: Família vs Amigos
- ✅ **Rankings em tempo real**: Individual + por grupo
- ✅ **Metas visuais**: Barras de progresso
- ✅ **Sistema de conquistas**: Badges automáticos

### 📊 **Critérios de Sucesso**

- ✅ **10 casais** pagantes em 2 meses
- ✅ **MRR R$ 500+** em 3 meses
- ✅ **Taxa RSVP >70%**
- ✅ **Feedback positivo** sobre gamificação

### 🔄 **Roadmap para Phase 2**

- ✅ **Trigger**: MRR > R$ 2.000/mês
- ✅ **Adicionar**: WhatsApp + Instagram + Calendar
- ✅ **Investimento**: R$ 70/mês em infraestrutura
- ✅ **Justificativa**: Demanda validada dos clientes

---

## 🚀 **READY TO BUILD MVP!**

**MVP Simplificado e focado no core value:**
- ✅ Sites bonitos e personalizados
- ✅ **Gamificação** como diferencial único
- ✅ **Contribuições PIX** com competição
- ✅ Custo ZERO até validar

**Próximos passos:**
1. Setup Next.js + Supabase
2. Schema multi-tenant
3. Landing page SaaS
4. Sistema de autenticação
5. Primeiro site de casal

**Vamos começar!** 🎯
