# 🚀 EiCasei - Setup do Sistema de Assinaturas

**Guia completo para configurar o sistema de assinaturas com Stripe**

## 📋 Pré-requisitos

1. ✅ Conta no Stripe (https://stripe.com)
2. ✅ Chaves de API configuradas no `.env.local`
3. ✅ Dependências instaladas: `stripe` e `@stripe/stripe-js`

## 🔧 Configuração Passo a Passo

### 1. Verificar Variáveis de Ambiente

Confirme que essas variáveis estão no seu `.env.local`:

```bash
# Stripe Keys (já configuradas)
STRIPE_SECRET_KEY=sk_test_51Rf3juP0rWdJjfkPi...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51Rf3juP0rWdJjfkPy...
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 2. Criar Produtos no Stripe

Execute o script automatizado:

```bash
npm run stripe:setup
```

Este script irá:
- ✅ Criar 3 produtos (Básico, Premium, Pro)
- ✅ Criar preços mensais e anuais para cada produto
- ✅ Gerar as variáveis de ambiente com os IDs

### 3. Adicionar Product IDs

O script irá exibir as variáveis. Adicione-as ao `.env.local`:

```bash
# Stripe Product IDs (gerados pelo script)
STRIPE_PRODUCT_BASIC_ID=prod_xxxxx
STRIPE_PRICE_BASIC_MONTHLY_ID=price_xxxxx
STRIPE_PRICE_BASIC_YEARLY_ID=price_xxxxx

STRIPE_PRODUCT_PREMIUM_ID=prod_xxxxx
STRIPE_PRICE_PREMIUM_MONTHLY_ID=price_xxxxx
STRIPE_PRICE_PREMIUM_YEARLY_ID=price_xxxxx

STRIPE_PRODUCT_PRO_ID=prod_xxxxx
STRIPE_PRICE_PRO_MONTHLY_ID=price_xxxxx
STRIPE_PRICE_PRO_YEARLY_ID=price_xxxxx
```

### 4. Configurar Webhook

1. **Acesse o Stripe Dashboard:**
   - Vá para Developers → Webhooks
   - Clique em "Add endpoint"

2. **Configure o endpoint:**
   ```
   URL: https://your-domain.com/api/stripe/webhooks
   (Para local: use ngrok ou similar)
   ```

3. **Selecione os eventos:**
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

4. **Copie o webhook secret** e adicione ao `.env.local`:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```

### 5. Testar em Desenvolvimento

Para testar webhooks localmente:

```bash
# Terminal 1: Stripe CLI
npm run stripe:listen

# Terminal 2: Next.js dev server
npm run dev
```

## 🏗️ Estrutura Implementada

### 📁 Arquivos Criados

```
src/lib/stripe/
├── client.ts              # Configuração do Stripe
├── products.ts            # Definição dos planos
└── subscription.ts        # Utilities de assinatura

src/app/api/stripe/
├── checkout/route.ts      # Criar checkout sessions
└── webhooks/route.ts      # Processar webhooks

src/components/saas/
└── pricing-table.tsx     # Tabela de preços

src/app/pricing/
└── page.tsx              # Página de pricing
```

### 🎯 Funcionalidades Implementadas

- ✅ **3 Planos de Assinatura:**
  - Básico: R$ 29,90/mês (50 convidados)
  - Premium: R$ 49,90/mês (150 convidados + domínio)
  - Pro: R$ 79,90/mês (ilimitado + analytics)

- ✅ **Checkout Flow Completo:**
  - Seleção de plano (mensal/anual)
  - Criação de customer no Stripe
  - Redirecionamento para Stripe Checkout
  - Processamento de webhooks

- ✅ **Gestão de Assinaturas:**
  - Verificação de limites por plano
  - Customer portal para cancelamento
  - Status de assinatura em tempo real

## 🧪 Como Testar

### 1. Testar a Página de Pricing

```bash
# Acessar a página
http://localhost:3000/pricing

# Teste:
1. Visualizar os planos
2. Alternar entre mensal/anual
3. Clicar em "Começar Agora"
```

### 2. Testar o Checkout

```bash
# Fazer login e tentar comprar um plano
1. Criar conta: /signup
2. Ir para pricing: /pricing
3. Selecionar plano
4. Usar cartão de teste: 4242 4242 4242 4242
```

### 3. Cartões de Teste Stripe

```bash
# Pagamento aprovado
4242 4242 4242 4242 (qualquer CVV, data futura)

# Pagamento negado
4000 0000 0000 0002

# 3D Secure
4000 0025 0000 3155
```

### 4. Verificar Webhooks

```bash
# No terminal do Stripe CLI
✅ checkout.session.completed
✅ customer.subscription.created
✅ Subscription criada no banco
```

## 📊 Monitoramento

### Verificar no Dashboard

```typescript
// Verificar assinatura do casal
const subscription = await getCurrentSubscription(coupleId)

// Verificar limites
const canAdd = await canPerformAction(coupleId, 'add_guest')

// Ver uso atual
const usage = await getSubscriptionUsage(coupleId)
```

### Logs Importantes

```bash
# Webhooks processados
✅ checkout.session.completed: sub_xxxxx
✅ Subscription created for couple: uuid

# Limites verificados
❌ Guest limit reached (50). Upgrade your plan.
✅ Action allowed: add_guest
```

## 🚨 Problemas Comuns

### 1. Webhook não funciona

```bash
# Verificar URL endpoint
curl -X POST http://localhost:3000/api/stripe/webhooks

# Verificar secret
echo $STRIPE_WEBHOOK_SECRET

# Usar ngrok para HTTPS local
ngrok http 3000
```

### 2. Price ID não encontrado

```bash
# Verificar se produtos foram criados
npm run stripe:setup

# Verificar variáveis de ambiente
echo $STRIPE_PRICE_BASIC_MONTHLY_ID
```

### 3. Subscription não aparece

```bash
# Verificar RLS no Supabase
# Verificar se coupleId está correto
# Ver logs do webhook
```

## 🔄 Fluxo Completo

### 1. **Usuário seleciona plano**
   - Página `/pricing`
   - Clica em "Começar Agora"

### 2. **Checkout Session**
   - POST `/api/stripe/checkout`
   - Redirecionamento para Stripe
   - Customer criado/encontrado

### 3. **Pagamento processado**
   - Webhook `checkout.session.completed`
   - Subscription criada no banco
   - Status: `active`

### 4. **Dashboard atualizado**
   - Verificação de limites
   - Funcionalidades liberadas
   - Usage tracking ativo

## 🎉 Próximos Passos

### Após configurar Stripe:

1. **Testar fluxo completo** com cartão real/teste
2. **Implementar middleware** de verificação de assinatura
3. **Adicionar customer portal** para gestão
4. **Criar sites públicos** dos casais
5. **Implementar gamificação** (AbacatePay)

---

## ✅ Checklist de Setup

- [ ] Variáveis Stripe configuradas
- [ ] Script `npm run stripe:setup` executado
- [ ] Product IDs adicionados ao `.env.local`
- [ ] Webhook configurado no Stripe Dashboard
- [ ] Webhook secret atualizado
- [ ] Teste de checkout realizado
- [ ] Webhook recebido e processado
- [ ] Subscription aparece no banco

**🎯 Status: Sistema de assinaturas pronto para uso!**

Agora é possível monetizar o SaaS e validar o modelo de negócio com clientes reais. 