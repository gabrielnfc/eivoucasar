# Setup do Banco de Dados - Supabase

**Documentação completa da configuração do banco de dados do EiCasei**

## 📋 Visão Geral

Esta documentação detalha todo o processo de configuração do banco de dados PostgreSQL no Supabase para o projeto EiCasei. O banco foi configurado com **isolamento multi-tenant**, **gamificação automática** e **segurança Row Level Security (RLS)**.

## 🗂️ Estrutura Criada

### **📊 Resumo do Database**
```
✅ 13 Tabelas principais
✅ 15+ Views e funções auxiliares
✅ 25+ Policies RLS (isolamento multi-tenant)
✅ 10+ Triggers automáticos
✅ 3 Planos de assinatura pré-configurados
✅ Sistema de gamificação completo
✅ Ranking e conquistas automáticas
```

## 🚀 Scripts Executados

### **Script 1: Extensões e Configurações**
```sql
-- Extensões habilitadas
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Funções criadas:
- generate_unique_slug() -- Gera slugs únicos automaticamente
- update_group_current_amount() -- Atualiza valor arrecadado por grupo
- update_guest_total_contributed() -- Atualiza total por convidado
```

### **Script 2: Tabelas Principais**
```sql
-- Tabelas criadas:
✅ subscription_plans (planos SaaS)
✅ couples (tenants principais)  
✅ subscriptions (assinaturas Stripe)
✅ guest_groups (gamificação)
✅ guests (convidados)
✅ contributions (PIX AbacatePay)

-- Índices criados:
✅ Performance otimizada para queries multi-tenant
✅ Índices em chaves estrangeiras
✅ Índices em campos de busca frequente
```

### **Script 3: Tabelas Complementares**
```sql
-- Tabelas adicionais:
✅ gifts (lista de presentes)
✅ messages (depoimentos)
✅ photos (galeria)
✅ schedule_events (cronograma)
✅ achievements (conquistas)
✅ email_notifications (emails)
✅ custom_domains (domínios Premium)
✅ analytics_events (tracking)
```

### **Script 4: Triggers e Automações**
```sql
-- Triggers configurados:
✅ update_updated_at_column() -- Atualiza updated_at automaticamente
✅ update_group_member_count() -- Sincroniza contadores
✅ update_group_current_amount() -- Atualiza arrecadação
✅ generate_couple_slug() -- Cria slugs únicos
✅ check_and_create_achievements() -- Gamificação automática
```

### **Script 5: RLS (Row Level Security)**
```sql
-- Isolamento multi-tenant:
✅ Casais veem apenas seus dados
✅ Convidados acessam apenas sites públicos
✅ Sistema pode gerenciar notificações
✅ Analytics isolados por tenant
✅ Contribuições seguras por casal
```

### **Script 6: Dados Iniciais e Views**
```sql
-- Configurações finais:
✅ 3 Planos pré-configurados (Básico, Premium, Pro)
✅ Views de ranking (guests e groups)
✅ View de estatísticas (couple_stats)
✅ Funções de gamificação
✅ Função de busca pública (get_couple_by_slug)
```

## 📋 Estrutura Detalhada das Tabelas

### **🏢 SaaS Core**
```sql
subscription_plans
├── Básico: R$ 29,90/mês (50 convidados)
├── Premium: R$ 49,90/mês (150 convidados + domínio)
└── Pro: R$ 79,90/mês (ilimitado + analytics)

subscriptions
├── Integração com Stripe
├── Status de pagamento
└── Períodos de cobrança
```

### **👰🤵 Multi-tenant Core**
```sql
couples (TENANT PRINCIPAL)
├── user_id → auth.users (Supabase Auth)
├── slug → joao-maria-2025 (único)
├── custom_domain → Premium/Pro only
├── theme_colors → Personalização visual
└── RLS: auth.uid() = user_id

guest_groups (GAMIFICAÇÃO)
├── Família da Noiva/Noivo
├── Amigos da Faculdade
├── Colegas de Trabalho
├── current_amount → Atualizado automaticamente
└── member_count → Sincronizado via trigger
```

### **👥 Convidados e Gamificação**
```sql
guests
├── RSVP status (pending/confirmed/declined)
├── total_contributed → Calculado automaticamente
├── Dados para contato (email/phone)
└── RLS: Isolado por casal

contributions (CORE MONETIZATION)
├── Integração AbacatePay (PIX)
├── Status em tempo real
├── Triggers → Atualizam rankings
├── Gamificação → Criam conquistas
└── Meta tracking automático
```

### **🎮 Sistema de Gamificação**
```sql
achievements (AUTOMÁTICO)
├── first_contribution → Primeira contribuição
├── big_contributor → Contribuição >= R$ 200
├── top_contributor → Maior contribuidor
├── group_winner → Grupo vencedor
└── Criadas automaticamente via triggers

analytics_events
├── page_view → Visitas ao site
├── rsvp → Confirmações
├── contribution → Contribuições
└── gift_reserved → Presentes reservados
```

## 🔐 Políticas de Segurança (RLS)

### **Isolamento Multi-tenant**
```sql
-- CASAIS: Veem apenas seus dados
auth.uid() = couples.user_id

-- TABELAS RELACIONADAS: Herdam isolamento
auth.uid() = (SELECT user_id FROM couples WHERE id = couple_id)

-- DADOS PÚBLICOS: Sites dos casais
- Informações básicas publicadas
- RSVP e contribuições abertas
- Galeria e cronograma públicos
- Listas de presentes visíveis
```

### **Políticas Específicas**
```sql
✅ Couples podem gerenciar apenas seus dados
✅ Guests podem fazer RSVP sem login
✅ Contributions são criadas publicamente
✅ Sistema pode enviar emails
✅ Analytics isolados por tenant
✅ Achievements criadas automaticamente
```

## ⚙️ Automações Configuradas

### **1. Slugs Únicos**
```sql
-- Função: generate_unique_slug()
joao-maria-2025 → joao-maria-2025-1 (se existir)
```

### **2. Contadores Automáticos**
```sql
-- member_count atualizado quando:
├── Guest adicionado ao grupo (+1)
├── Guest removido do grupo (-1)
└── Guest muda de grupo (move)

-- current_amount atualizado quando:
├── Contribuição marcada como 'paid'
├── Soma todas contribuições pagas do grupo
└── Trigger em tempo real
```

### **3. Gamificação Automática**
```sql
-- Conquistas criadas automaticamente:
IF primeira_contribuição_do_casal THEN
  → "Primeiro a Contribuir! 🎉"

IF contribuição >= R$ 200 THEN
  → "Grande Contribuição! 💰"

IF maior_contribuidor_atual THEN
  → "Maior Contribuidor! 🏆"
```

### **4. Campos Calculados**
```sql
-- updated_at → NOW() automaticamente
-- total_contributed → Soma das contribuições pagas
-- ranking_position → Calculado nas views
-- progress_percentage → (current/target) * 100
```

## 📊 Views para Analytics

### **guest_contribution_ranking**
```sql
-- Ranking individual por casal
SELECT name, total_contributed, ranking_position
FROM guest_contribution_ranking 
WHERE couple_id = ?
ORDER BY ranking_position
```

### **group_contribution_ranking**
```sql
-- Ranking de grupos por casal  
SELECT name, current_amount, progress_percentage
FROM group_contribution_ranking
WHERE couple_id = ?
ORDER BY ranking_position
```

### **couple_stats**
```sql
-- Estatísticas gerais do casal
SELECT 
  total_guests,
  confirmed_guests,
  total_contributions,
  total_gifts,
  reserved_gifts
FROM couple_stats 
WHERE id = ?
```

## 🔧 Funções Auxiliares

### **get_couple_by_slug()**
```sql
-- Para sites públicos (sem auth)
SELECT * FROM get_couple_by_slug('joao-maria-2025')
```

### **create_achievement()**
```sql
-- Criar conquistas programaticamente
SELECT create_achievement(
  couple_id,
  'top_contributor', 
  'Parabéns! 🏆',
  guest_id,
  group_id,
  'Você é o maior contribuidor!'
)
```

## 📦 Dados Pré-configurados

### **Planos de Assinatura**
```sql
Básico (R$ 29,90/mês):
├── 50 convidados máximo
├── 20 fotos máximo  
├── Site com slug (.eicasei.com)
└── Gamificação básica

Premium (R$ 49,90/mês):
├── 150 convidados máximo
├── 100 fotos máximo
├── Domínio customizado
└── Analytics detalhado

Pro (R$ 79,90/mês):
├── Convidados ilimitados
├── Fotos ilimitadas
├── Múltiplos domínios
├── API access
└── Analytics completo
```

## 🔗 Próximos Passos

### **1. Conectar com Prisma**
```bash
# Gerar schema Prisma baseado no Supabase
npx prisma db pull

# Gerar cliente TypeScript
npx prisma generate
```

### **2. Configurar Next.js**
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### **3. Implementar Queries**
```typescript
// lib/database/couples.ts
export async function getCoupleBySlug(slug: string) {
  const { data, error } = await supabase
    .rpc('get_couple_by_slug', { p_slug: slug })
    
  return { data: data?.[0], error }
}
```

### **4. Setup Auth + RLS**
```typescript
// middleware.ts para multi-tenancy
export async function middleware(request: NextRequest) {
  // Detectar slug/domínio
  // Carregar dados do casal
  // Aplicar tema personalizado
}
```

## 🧪 Testando a Configuração

### **1. Verificar Tabelas**
```sql
-- Listar todas as tabelas criadas
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

### **2. Testar RLS**
```sql
-- Conectar como usuário e tentar acessar dados de outro casal
-- Deve retornar vazio se RLS estiver funcionando
```

### **3. Testar Triggers**
```sql
-- Inserir contribuição e verificar se:
-- ✅ current_amount foi atualizado
-- ✅ total_contributed foi atualizado  
-- ✅ achievement foi criada
-- ✅ updated_at foi atualizado
```

### **4. Testar Views**
```sql
-- Verificar se rankings estão calculando corretamente
SELECT * FROM guest_contribution_ranking LIMIT 5;
SELECT * FROM group_contribution_ranking LIMIT 5;
SELECT * FROM couple_stats LIMIT 5;
```

## 🚨 Considerações Importantes

### **Segurança**
- ✅ RLS configurado em todas as tabelas sensíveis
- ✅ Políticas públicas apenas para dados necessários
- ✅ Service role key protegida para operações admin
- ✅ Triggers com validações de segurança

### **Performance**
- ✅ Índices em campos de busca frequente
- ✅ Views materializadas para rankings
- ✅ Triggers otimizados (apenas quando necessário)
- ✅ Queries eficientes com COALESCE

### **Escalabilidade**
- ✅ Estrutura preparada para milhares de casais
- ✅ Particionamento possível por couple_id
- ✅ Cache em views de ranking
- ✅ Async processing para achievements

### **Backup e Recovery**
- ✅ Supabase faz backup automático
- ✅ Point-in-time recovery habilitado
- ✅ Replicação em múltiplas regiões
- ✅ Export de dados configurável

## 📚 Referências Úteis

### **Documentação**
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Triggers](https://www.postgresql.org/docs/current/triggers.html)
- [Prisma com Supabase](https://www.prisma.io/docs/guides/database/supabase)

### **Comandos Úteis**
```sql
-- Ver todas as policies ativas
SELECT * FROM pg_policies;

-- Ver triggers por tabela  
SELECT * FROM information_schema.triggers;

-- Verificar RLS habilitado
SELECT relname, relrowsecurity 
FROM pg_class 
WHERE relrowsecurity = true;

-- Estatísticas das tabelas
SELECT schemaname, tablename, n_tup_ins, n_tup_upd 
FROM pg_stat_user_tables;
```

---

## ✅ Status: CONFIGURAÇÃO COMPLETA

O banco de dados está **100% configurado** e pronto para desenvolvimento!

**Principais conquistas:**
- ✅ Multi-tenancy com isolamento completo
- ✅ Gamificação automática funcionando
- ✅ Segurança RLS implementada
- ✅ Performance otimizada
- ✅ Triggers e automações ativas
- ✅ Views de analytics prontas
- ✅ Dados iniciais carregados

**Próximo passo:** Conectar com o projeto Next.js via Prisma! 🚀 