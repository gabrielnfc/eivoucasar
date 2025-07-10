# 💕 EiVouCasar

> **MicroSaaS de sites de casamento com gamificação + animações românticas únicas**  
> Transforme seu casamento em uma experiência única e envolvente com o diferencial visual mais inovador do mercado!

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.0-06B6D4?style=for-the-badge&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase)
![Prisma](https://img.shields.io/badge/Prisma-6.10.1-2D3748?style=for-the-badge&logo=prisma)

**Status:** 🚀 MVP 90% Concluído - Ready for Final Sprint!

</div>

## 🎯 **Sobre o Projeto**

**EiVouCasar** é um MicroSaaS inovador que permite casais criarem sites personalizados para seus casamentos com **três diferenciais únicos no mercado**: **gamificação das contribuições**, **34+ animações românticas CSS exclusivas** e **compliance GDPR/LGPD completo desde o dia 1**.

### ✨ **Diferenciais Competitivos ÚNICOS**
- 🌹 **34+ Animações Românticas CSS**: Sistema exclusivo com corações, anéis, flores, casais dançando
- 💖 **Logo SVG Animada**: Micro-animações heartbeat profissionais
- 🎮 **Gamificação Real**: Família vs Amigos competindo por contribuições
- 🏆 **Rankings em Tempo Real**: Leaderboards com sparkles e celebrações
- 📊 **Metas Visuais**: Barras de progresso com heartbeat animations
- 🎁 **Sistema de Conquistas**: Badges automáticos com celebration effects
- 💰 **PIX Integrado**: Contribuições instantâneas via AbacatePay
- 🍪 **Compliance GDPR/LGPD**: Enterprise-level desde o lançamento
- 🌐 **Multi-tenant Robusto**: Arquitetura escalável enterprise-ready

---

## 🚀 **Funcionalidades Implementadas**

### ✅ **Core do SaaS (100%)**
- **Autenticação completa** com Supabase Auth + proteção robusta
- **Dashboard multi-tenant** para gestão completa dos casais
- **Arquitetura multi-tenant completa** com middleware + context + RLS
- **Banco de dados robusto** com 13 tabelas e segurança enterprise
- **APIs REST completas** type-safe com validação Zod

### ✅ **Landing Page Profissional (100%)**
- **11 componentes modulares** (Hero, Features, Pricing, FAQ, etc.)
- **6 bibliotecas visuais** integradas (Lottie, CountUp, Parallax, Toast, Icons)
- **34+ animações românticas** na hero section (diferencial único!)
- **Elementos de conversão** (urgency, scarcity, social proof)
- **Performance otimizada** (GPU-accelerated, mobile-first)

### ✅ **Sistema de Animações Românticas ÚNICO (100%)**
- **8 tipos CSS wedding-themed**: Corações, anéis, flores, buquês, casais, igrejas, taças, sparkles
- **Sistema de densidade**: Hero (34), Section (21), Minimal (13) elementos
- **Posicionamento estratégico**: Center, corners, edges, top, bottom
- **Durações ultra-suaves**: 15s-50s sem piscar
- **Background sempre elegante**: Nunca interfere no conteúdo

### ✅ **Logo SVG Animada Profissional (100%)**
- **Micro-animações heartbeat** nos corações (2s cycle)
- **Pulse animation** no logo completo (3s cycle)
- **Adaptação automática** dark/light mode
- **Sistema de favicons** completo (8 tamanhos + Apple Touch)
- **Contraste garantido** em qualquer background

### ✅ **Sistema de Cookies GDPR/LGPD (100%)**
- **Compliance internacional**: Europa (GDPR), Brasil (LGPD), EUA (CCPA), Canadá (PIPEDA)
- **Banner inteligente** com design EiVouCasar
- **Modal de configurações** granulares por categoria
- **Context global** de gerenciamento de preferências
- **Página dedicada** no dashboard para controle avançado
- **Ready para mercado global** desde o dia 1

### ✅ **Gestão de Convidados Avançada (100%)**
- **Formulário expandido** com 11+ campos validados
- **Sistema de grupos** para gamificação funcional
- **Acompanhantes dinâmicos** com gestão individual
- **RSVP tracking** com status em tempo real
- **Filtros e busca** otimizados + exportação

### ✅ **Design System Modernizado (100%)**
- **Logo oficial EiVouCasar** com animações implementada
- **Paleta de cores oficial** baseada na identidade visual
- **Formulários 100% padronizados** (input-modern)
- **Navegação uniformizada** (logos + cores consistentes)
- **Componentes responsivos** mobile-first

### ✅ **Infraestrutura Enterprise (100%)**
- **Build perfeito** (0 erros TypeScript, hydration issues resolvidos)
- **Performance GPU-accelerated** para todas as animações
- **Stripe APIs completas** (checkout + webhooks funcionando)
- **Multi-tenant com RLS** (isolamento completo por casal)
- **Sites públicos [slug]** funcionais (90% implementados)

### 🚧 **Pendente para MVP 100% (10% restante)**
- **Gamificação PIX** (8%): Rankings animados + conquistas celebrativas
- **Polish final** (2%): Customer portal + otimizações finais

---

## 🛠️ **Stack Tecnológica**

### **Frontend & Framework**
```typescript
Next.js 15.3.4      // App Router + Server Components + Turbopack
TypeScript 5.x      // Type safety completo (strict mode)
Tailwind CSS 3.4.0  // Design system + romantic animations
Shadcn/ui          // Componentes base modernos
Framer Motion      // Animações suaves + micro-interações
Zod               // Validação robusta multi-camadas
```

### **Bibliotecas Visuais (6 implementadas)**
```typescript
Lottie React       // Animações vetoriais profissionais
React CountUp      // Números animados (social proof)
React Parallax     // Efeitos de profundidade
React Hot Toast    // Notificações elegantes
React Icons        // Ícones premium +50.000
Intersection Observer // Triggers para animações on-scroll
```

### **Backend & Database**
```typescript
Supabase          // PostgreSQL + Auth + Storage + RLS
Prisma 6.10.1     // ORM type-safe + migrations
Row Level Security // Isolamento multi-tenant robusto
Stripe           // Assinaturas SaaS (APIs completas)
```

### **Compliance & Integrações**
```typescript
GDPR/LGPD System  // Cookies consent management (enterprise)
AbacatePay        // PIX para gamificação (próximo)
Resend           // Email transacional
Vercel Analytics  // Performance tracking
```

---

## 🏗️ **Arquitetura Multi-tenant Completa**

### **Tenant Detection & Routing**
```typescript
// Middleware automático detecta tenant por slug
/joao-maria-2025 → Context do casal + tema personalizado

// Sites públicos funcionais
src/app/[slug]/page.tsx     // Home do casal
src/middleware.ts           // Tenant detection
src/contexts/tenant-context.tsx // Context global
```

### **Segurança Enterprise**
```sql
-- RLS ativo em todas as tabelas
auth.uid() = couples.user_id

-- Isolamento completo por casal
guests, groups, contributions, photos, etc.

-- Dados públicos controlados
isPublished = true AND isActive = true
```

### **APIs Especializadas**
```typescript
/api/couples/[slug]     // Gerenciamento por tenant
/api/guests/            // CRUD isolado por casal
/api/contributions/     // PIX + gamificação
/api/stripe/checkout    // Assinaturas funcionais
/api/stripe/webhooks    // Payment processing
```

---

## 📊 **Progresso do MVP (ATUALIZADO)**

```
✅ Infraestrutura:         100% ━━━━━━━━━━
✅ Autenticação:           100% ━━━━━━━━━━
✅ Database Schema:        100% ━━━━━━━━━━
✅ Gestão Convidados:      100% ━━━━━━━━━━
✅ Dashboard:              100% ━━━━━━━━━━
✅ Design System:          100% ━━━━━━━━━━
✅ Landing Page:           100% ━━━━━━━━━━
✅ Bibliotecas Visuais:    100% ━━━━━━━━━━
✅ Animações Românticas:   100% ━━━━━━━━━━
✅ Logo SVG Animada:       100% ━━━━━━━━━━
✅ Multi-tenant:           100% ━━━━━━━━━━
✅ Sites Públicos:          90% ━━━━━━━━━─
✅ Stripe Setup:            90% ━━━━━━━━━─
✅ Cookies GDPR/LGPD:      100% ━━━━━━━━━━
🚧 Gamificação PIX:          0% ──────────
🚧 Polish Final:             0% ──────────

TOTAL MVP: 90% ━━━━━━━━━─
```

### **🎯 Milestones Finais**
1. **Gamificação PIX** (1 semana) → +8% = 98%
2. **Polish Final** (2 dias) → +2% = 100% MVP COMPLETO!

---

## ⚙️ **Configuração e Execução**

### **Pré-requisitos**
```bash
Node.js 18+
npm ou yarn
Git
Conta no Supabase (gratuita)
Conta no Stripe (para monetização)
```

### **1. Clone e Instalação**
```bash
git clone https://github.com/gabrielnfc/eivoucasar.git
cd eivoucasar
npm install
```

### **2. Configuração do Ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Configure suas variáveis do Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_aqui
DATABASE_URL=sua_database_url_aqui

# Configure Stripe (para monetização)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### **3. Setup do Banco de Dados**
```bash
# Gerar cliente Prisma
npx prisma generate

# Testar conexão
npm run db:test

# Visualizar dados
npx prisma studio
```

### **4. Setup do Stripe (Monetização)**
```bash
# Criar produtos automaticamente
npm run stripe:setup

# Escutar webhooks (desenvolvimento)
npm run stripe:listen
```

### **5. Executar em Desenvolvimento**
```bash
npm run dev
```

Acesse: http://localhost:3000

---

## 📁 **Estrutura do Projeto**

```
eivoucasar/
├── src/
│   ├── app/
│   │   ├── [slug]/            # Sites multi-tenant dos casais
│   │   ├── api/               # APIs REST completas
│   │   ├── dashboard/         # Dashboard protegido
│   │   │   └── settings/
│   │   │       └── cookies/   # Configurações GDPR/LGPD
│   │   ├── login/             # Autenticação
│   │   ├── signup/            # Cadastro
│   │   └── pricing/           # Página de preços
│   ├── components/
│   │   ├── ui/                # Design system + animações
│   │   ├── landing/           # 11 componentes da landing
│   │   ├── guests/            # Gestão de convidados
│   │   ├── wedding/           # Sites dos casais
│   │   ├── cookies/           # Sistema GDPR/LGPD
│   │   └── auth/              # Componentes de auth
│   ├── contexts/
│   │   ├── auth-context.tsx   # Autenticação global
│   │   ├── tenant-context.tsx # Multi-tenant context
│   │   └── cookie-context.tsx # GDPR/LGPD management
│   ├── lib/
│   │   ├── database/          # Queries Prisma type-safe
│   │   ├── stripe/            # Stripe integration
│   │   └── supabase/          # Supabase clients
│   └── types/                 # TypeScript definitions
├── prisma/
│   └── schema.prisma          # 13 tabelas multi-tenant
├── doc/                       # Documentação técnica completa
├── public/
│   └── image/                 # Logo oficial + favicons
└── scripts/                   # Setup automatizado
```

---

## 🎨 **Design System & Animações**

### **Cores Oficiais (Logo-based)**
```css
Primary:   #fe97a2  /* Rosa coral da logo */
Secondary: #535354  /* Cinza da logo */
Accent:    #ed7a5e  /* Complementar harmônico */
Background: #ffffff /* Sempre branco limpo */
```

### **Sistema de Animações Românticas ÚNICO**
```typescript
// Componente de animações românticas
<RomanticDecorations variant="hero" />      // 34 animações
<RomanticDecorations variant="section" />   // 21 animações
<RomanticDecorations variant="minimal" />   // 13 animações

// Logo animada
<Logo size="lg" />  // Com heartbeat + pulse automáticos

// 8 tipos CSS wedding animations:
CSSHeartAnimation, CSSRingsAnimation, CSSFlowerAnimation,
CSSBouquetAnimation, CSSCoupleAnimation, CSSChurchAnimation,
CSSToastAnimation, CSSSparklesAnimation
```

### **Componentes Padronizados**
- **Formulários**: 100% consistentes com `input-modern`
- **Navegação**: Logos uniformizadas em `size="lg"`
- **Cards**: Variantes glass, elevated, gradient
- **Botões**: Múltiplas variantes + animações hover
- **Animações**: Always-visible background (nunca interfere)

---

## 🍪 **Compliance GDPR/LGPD Enterprise**

### **Jurisdições Atendidas**
- ✅ **GDPR** (Europa): Consentimento explícito e granular
- ✅ **LGPD** (Brasil): Transparência e finalidade específica
- ✅ **CCPA** (Califórnia): Direitos de privacidade
- ✅ **PIPEDA** (Canadá): Proteção de dados pessoais

### **Funcionalidades Implementadas**
```typescript
// Context de cookies global
const { hasConsent, updatePreferences, acceptAll } = useCookies();

// Verificar consentimento antes de carregar scripts
if (hasConsent('analytics')) {
  // Carregar Google Analytics
}

// Componentes automáticos
<CookieBanner />      // Banner GDPR/LGPD
<CookieSettings />    // Modal de configurações
```

### **Categorias de Cookies**
- **Necessários** (sempre ativos): Autenticação, CSRF, funcionamento básico
- **Analíticos** (opcionais): Google Analytics, Hotjar, métricas
- **Marketing** (opcionais): Facebook Pixel, Google Ads, remarketing
- **Funcionalidade** (opcionais): Temas, configurações, personalizações

---

## 📚 **Documentação Técnica Completa**

### **Status e Progresso**
- 📊 [`doc/progresso-atual.md`](doc/progresso-atual.md) - Status 90% atualizado
- 📈 [`doc/progresso-desenvolvimento.md`](doc/progresso-desenvolvimento.md) - Progresso técnico detalhado
- 🎯 [`doc/proximos-passos.md`](doc/proximos-passos.md) - Sprint final (10% restante)
- 📋 [`doc/status-final-onde-paramos.md`](doc/status-final-onde-paramos.md) - Resumo executivo

### **Implementações Técnicas**
- 🏗️ [`doc/arquitetura-multi-tenant.md`](doc/arquitetura-multi-tenant.md) - Multi-tenant completo
- 🍪 [`doc/cookies-gdpr-lgpd-implementado.md`](doc/cookies-gdpr-lgpd-implementado.md) - Compliance enterprise
- 🎨 [`doc/landing-page-implementada.md`](doc/landing-page-implementada.md) - Landing + animações
- ✨ [`doc/melhorias-design-system.md`](doc/melhorias-design-system.md) - Design system modernizado

### **Setup e Configuração**
- 🗃️ [`doc/database-setup.md`](doc/database-setup.md) - Configuração do banco
- 🔧 [`doc/prisma-setup.md`](doc/prisma-setup.md) - Setup Prisma completo
- 💳 [`doc/STRIPE_SETUP.md`](doc/STRIPE_SETUP.md) - Sistema de assinaturas
- 🎨 [`doc/bibliotecas-recomendadas.md`](doc/bibliotecas-recomendadas.md) - Bibliotecas visuais

### **Roadmap e Estratégia**
- 📖 [`doc/documentação.md`](doc/documentação.md) - Documentação completa do MVP

---

## 🔐 **Segurança Enterprise**

### **Implementado**
- ✅ **Row Level Security (RLS)** em todas as 13 tabelas
- ✅ **Validação Zod** em múltiplas camadas (frontend + backend + database)
- ✅ **Isolamento multi-tenant** completo com context + middleware
- ✅ **Autenticação Supabase** robusta + session management
- ✅ **GDPR/LGPD compliance** desde o dia 1
- ✅ **Environment variables** protegidas + validação

### **Políticas de Segurança Multi-tenant**
```sql
-- Isolamento por casal em todas as tabelas
auth.uid() = (SELECT user_id FROM couples WHERE id = couple_id)

-- Sites públicos com controle granular
isPublished = true AND isActive = true

-- Webhooks com verificação de assinatura
stripe.webhooks.constructEvent(body, signature, secret)
```

---

## 🎮 **Gamificação (Implementação Final - 8%)**

### **Mecânicas Ready-to-Implement**
- 🏆 **Competição por grupos**: Família da Noiva vs Família do Noivo vs Amigos
- 📊 **Rankings dinâmicos**: Individual + por grupo com sparkles animations
- 🎯 **Metas visuais**: Lua de mel, mobília, festa com heartbeat progress
- 🏅 **Sistema de conquistas**: Badges automáticos + celebration effects
- 💰 **PIX gamificado**: QR codes com AbacatePay + toast celebrations

### **Animações Celebrativas Planejadas**
```typescript
// Rankings com sparkles
<Leaderboard />           // + sparkles animations
<ProgressBars />          // + heartbeat effects
<Achievements />          // + celebration effects
<ContributionForm />      // + toast success animations
```

---

## 🚀 **Deploy e Produção**

### **Ambiente Otimizado**
- ✅ **Build perfeito** (0 erros TypeScript, 0 hydration issues)
- ✅ **Performance GPU-accelerated** para todas as animações
- ✅ **Vercel optimized** (Next.js 15 + Turbopack)
- ✅ **Supabase Edge Functions** para scale
- ✅ **CDN para assets** (favicons + logo SVG)

### **Plataformas Suportadas**
- ✅ **Vercel** (recomendado - Next.js 15 optimized)
- ✅ **Netlify** (alternativa)
- ✅ **Railway** (full-stack)

### **Configuração de Deploy**
```bash
# Build de produção (0 erros!)
npm run build

# Verificar build localmente
npm start

# Deploy no Vercel (optimized)
npx vercel --prod
```

---

## 🌟 **Diferencial Competitivo GARANTIDO**

### **ÚNICOS no Mercado de Casamentos**
- 🌹 **34+ animações CSS românticas** na hero section (nenhum concorrente tem)
- 💖 **Logo SVG com micro-animações** heartbeat profissionais
- 🎨 **Sistema de posicionamento estratégico** de elementos wedding-themed
- ✨ **Performance GPU-accelerated** otimizada para mobile
- 🍪 **Compliance GDPR/LGPD enterprise** desde o lançamento
- 🌐 **Ready para mercado global** (Europa, Brasil, EUA, Canadá)

### **Vantagens Técnicas vs Concorrência**
- ⚡ **Build perfeito** (0 erros, hydration issues resolvidos)
- 🏗️ **Infraestrutura enterprise-ready** (multi-tenant robusto)
- 📱 **UX premium** que justifica pricing premium
- 🔐 **Segurança de primeiro mundo** (RLS + GDPR/LGPD)
- 🎮 **Gamificação com animações** (diferencial competitivo único)

---

## 🤝 **Contribuição**

### **Como Contribuir**
1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### **Padrões de Código Rigorosos**
- ✅ **TypeScript strict mode** (0 any types)
- ✅ **Build sempre funcionando** (0 erros)
- ✅ **Conventional Commits**
- ✅ **Component patterns** documentados
- ✅ **Performance-first** (GPU acceleration)
- ✅ **Compliance-ready** (GDPR/LGPD)

---

## 📄 **Licença**

Este projeto está sob licença privada. Todos os direitos reservados.

---

## 📞 **Contato**

**Desenvolvedor:** Gabriel NFC  
**Repositório:** https://github.com/gabrielnfc/eivoucasar  
**Status:** MVP 90% - Ready for Final Sprint! 🚀  

---

<div align="center">

**🎉 Transformando casamentos em experiências únicas desde 2024**

*Made with 💕 and 34+ romantic animations for couples who want something special*

**🌟 The only wedding platform in the world with enterprise GDPR/LGPD compliance + 34 CSS romantic animations**

</div> 