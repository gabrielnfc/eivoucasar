# 🚀 EiCasei - Próximos Passos Críticos

> **Status atual:** 35% do MVP concluído  
> **Base sólida:** ✅ Auth + Dashboard + Convidados expandidos  
> **Próximo objetivo:** Sistema de Assinaturas (Stripe)  

## 🎯 PRIORIDADES IMEDIATAS

### 🏢 1. SISTEMA DE ASSINATURAS (CRÍTICO)
**Objetivo:** Começar a monetizar e validar o modelo de negócio

#### **Setup Inicial:**
```bash
# Instalar dependências
npm install stripe @stripe/stripe-js

# Variáveis .env.local
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### **Arquivos a Criar:**
```
src/lib/stripe/
├── client.ts              # Configuração do Stripe
├── products.ts            # Planos e preços
└── webhooks.ts            # Handlers de webhook

src/app/api/stripe/
├── checkout/route.ts      # Criar checkout session
├── portal/route.ts        # Customer portal
└── webhooks/route.ts      # Receber webhooks

src/components/saas/
└── pricing-table.tsx     # Tabela de preços
```

#### **Planos a Implementar:**
```typescript
Básico:   R$ 29,90/mês - 50 convidados
Premium:  R$ 49,90/mês - 150 convidados + domínio custom
Pro:      R$ 79,90/mês - Ilimitado + analytics
```

---

### 🌐 2. LANDING PAGE SAAS
**Objetivo:** Converter visitantes em clientes pagantes

#### **Páginas Essenciais:**
```
src/app/page.tsx           # Landing principal com hero
src/app/pricing/page.tsx   # Pricing detalhado
src/app/features/page.tsx  # Showcase de funcionalidades
```

#### **Componentes de Marketing:**
```
src/components/saas/
├── hero-section.tsx       # Hero com CTA
├── feature-grid.tsx       # Grid de funcionalidades
├── testimonials.tsx       # Depoimentos
└── call-to-action.tsx     # CTAs de conversão
```

---

### 🏠 3. SITES PÚBLICOS DOS CASAIS
**Objetivo:** Entregar valor real aos clientes (core product)

#### **Multi-tenant Routing:**
```
src/middleware.ts          # Detectar tenant por slug
src/app/[slug]/           # Sites públicos dos casais
src/contexts/tenant-context.tsx
```

#### **Páginas do Casal:**
```
src/app/[slug]/page.tsx           # Home com countdown
src/app/[slug]/rsvp/page.tsx      # Formulário RSVP
src/app/[slug]/gifts/page.tsx     # Lista de presentes
src/app/[slug]/gallery/page.tsx   # Galeria de fotos
```

---

### 🎮 4. GAMIFICAÇÃO (DIFERENCIAL)
**Objetivo:** Diferencial competitivo único

#### **AbacatePay Integration:**
```
ABACATE_API_KEY=xxx
ABACATE_WEBHOOK_SECRET=xxx

src/lib/integrations/
└── abacate-pay.ts        # SDK do AbacatePay
```

#### **Sistema de Rankings:**
```
src/components/wedding/
├── leaderboard.tsx       # Rankings em tempo real
├── progress-bars.tsx     # Barras de progresso das metas
└── achievements.tsx      # Sistema de conquistas
```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### ✅ Já Feito:
- [x] Next.js + TypeScript + Tailwind configurado
- [x] Supabase + Prisma + 13 tabelas implementadas
- [x] Sistema de autenticação completo
- [x] Dashboard funcional com proteção
- [x] Sistema de convidados expandido (além do planejado)
- [x] APIs REST com validação Zod
- [x] RLS (Row Level Security) ativo

### 🚀 Próximas Tarefas:

#### **Semana 1-2: Sistema de Assinaturas**
- [ ] Configurar Stripe (produtos, preços, webhooks)
- [ ] Implementar checkout flow
- [ ] Criar middleware de verificação de plano
- [ ] Pricing table responsiva
- [ ] Customer portal para gestão de assinatura

#### **Semana 3: Landing Page**
- [ ] Hero section com proposta de valor clara
- [ ] Feature showcase (gamificação como destaque)
- [ ] Testimonials e social proof
- [ ] Call-to-action otimizado para conversão
- [ ] SEO básico e analytics

#### **Semana 4-5: Sites Públicos**
- [ ] Multi-tenant routing por slug
- [ ] Layout público responsivo
- [ ] Página inicial com countdown
- [ ] Sistema RSVP público (sem login)
- [ ] Lista de presentes básica

#### **Semana 6: Gamificação**
- [ ] Integração AbacatePay (PIX)
- [ ] Rankings em tempo real
- [ ] Sistema de contribuições
- [ ] Leaderboard individual e por grupo
- [ ] Conquistas automáticas

---

## 🔧 COMANDOS ÚTEIS

### **Desenvolvimento:**
```bash
npm run dev                    # Servidor desenvolvimento
npm run build && npm start    # Build produção
npx prisma studio             # Ver dados do banco
```

### **Stripe Setup:**
```bash
# Instalar CLI do Stripe (opcional)
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhooks
```

### **Deploy:**
```bash
# Vercel (quando pronto)
vercel --prod
```

---

## 📊 MÉTRICAS DE SUCESSO

### **MVP Validado quando:**
- [ ] 10 casais pagantes ativos
- [ ] MRR > R$ 500/mês
- [ ] Taxa de RSVP > 70%
- [ ] Feedback positivo sobre gamificação

### **Critérios para Phase 2:**
- [ ] MRR > R$ 2.000/mês (sustentado 3 meses)
- [ ] 20+ casais usando gamificação
- [ ] Demanda clara por integrações (WhatsApp, Instagram)

---

## ⚠️ LEMBRETES IMPORTANTES

### **🔐 Segurança:**
- Sempre validar dados no servidor (Zod)
- Manter RLS ativo no Supabase
- Rate limiting nas APIs públicas
- Sanitizar inputs de usuários

### **📱 UX/UI:**
- Mobile-first sempre
- Loading states consistentes
- Error handling graceful
- Feedback visual claro

### **🚀 Performance:**
- Dynamic imports para componentes pesados
- Image optimization (Next.js Image)
- Bundle analysis regular
- Database queries otimizadas

---

## 🎯 FOCO: VALIDAÇÃO RÁPIDA

**Objetivo principal:** Validar se existe demanda real pelo produto antes de investir em integrações complexas.

**Estratégia:** 
1. **Implementar monetização** (Stripe) para testar willingness to pay
2. **Entregar core value** (sites + RSVP) para satisfazer clientes
3. **Destacar diferencial** (gamificação) para se diferenciar
4. **Iterar baseado em feedback** real de clientes pagantes

**Meta:** 10 casais pagantes em 2 meses para validar o MVP.

---

**🚀 Ready to continue building!** Base sólida estabelecida, próximo passo: monetização com Stripe. 