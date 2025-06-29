# 💕 EiVouCasar

> **MicroSaaS de sites de casamento com gamificação**  
> Transforme seu casamento em uma experiência única e engajante!

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.0-06B6D4?style=for-the-badge&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase)
![Prisma](https://img.shields.io/badge/Prisma-6.10.1-2D3748?style=for-the-badge&logo=prisma)

**Status:** 🚧 MVP em desenvolvimento (40% concluído)

</div>

## 🎯 **Sobre o Projeto**

**EiVouCasar** é um MicroSaaS inovador que permite casais criarem sites personalizados para seus casamentos com um **diferencial único**: **gamificação das contribuições**. 

### ✨ **Diferencial Competitivo**
- 🎮 **Gamificação real**: Família vs Amigos competindo por contribuições
- 🏆 **Rankings em tempo real**: Quem contribui mais ganha destaque
- 📊 **Metas visuais**: Barras de progresso motivacionais
- 🎁 **Sistema de conquistas**: Badges e prêmios automáticos
- 💰 **PIX integrado**: Contribuições instantâneas via AbacatePay

---

## 🚀 **Funcionalidades Implementadas**

### ✅ **Core do SaaS**
- **Autenticação completa** com Supabase Auth
- **Dashboard protegido** para gestão dos casais
- **Multi-tenancy** com isolamento completo (RLS)
- **Banco de dados robusto** com 13 tabelas
- **APIs REST** type-safe com validação Zod

### ✅ **Gestão de Convidados Avançada**
- **Formulário expandido** com 11+ campos
- **Sistema de grupos** para gamificação
- **Acompanhantes dinâmicos** com gestão individual
- **RSVP tracking** com status em tempo real
- **Filtros e busca** otimizados

### ✅ **Design System Profissional**
- **Logo oficial EiVouCasar** implementada
- **Paleta de cores harmoniosa** baseada na identidade visual
- **Componentes padronizados** 100% consistentes
- **Responsividade total** (mobile-first)
- **Dark mode ready** para futuras implementações

---

## 🛠️ **Stack Tecnológica**

### **Frontend & Framework**
```typescript
Next.js 15.3.4      // App Router + Server Components
TypeScript 5.x      // Type safety completo
Tailwind CSS 3.4.0  // Design system customizado
Shadcn/ui          // Componentes base modernos
Framer Motion      // Animações suaves
Zod               // Validação robusta
```

### **Backend & Database**
```typescript
Supabase          // PostgreSQL + Auth + Storage
Prisma 6.10.1     // ORM type-safe
Row Level Security // Isolamento multi-tenant
Edge Functions    // Serverless quando necessário
```

### **Integrações**
```typescript
Stripe            // Assinaturas SaaS (próximo)
AbacatePay        // PIX para convidados (próximo)
Resend           // Email transacional (próximo)
```

---

## 🏗️ **Arquitetura**

### **Multi-tenancy Seguro**
```sql
-- Cada casal é um tenant isolado
couples.user_id = auth.uid()

-- RLS aplicado em todas as tabelas
guests, groups, contributions, photos, etc.
```

### **Design Patterns**
- **Server Components** por padrão
- **Client Components** apenas quando necessário
- **Custom Hooks** para lógica complexa
- **API Routes** RESTful com validação
- **Error Boundaries** para robustez

---

## 📊 **Progresso do MVP**

```
✅ Infraestrutura:        100% ━━━━━━━━━━
✅ Autenticação:          100% ━━━━━━━━━━
✅ Database Schema:       100% ━━━━━━━━━━
✅ Gestão Convidados:     100% ━━━━━━━━━━
✅ Dashboard:             100% ━━━━━━━━━━
✅ Design System:         100% ━━━━━━━━━━
🚧 Sistema Assinaturas:     0% ──────────
🚧 Landing Page:            0% ──────────
🚧 Sites Públicos:          0% ──────────
🚧 Gamificação:             0% ──────────

TOTAL MVP: 40% ━━━━──────
```

### **🎯 Próximos Milestones**
1. **Sistema de Assinaturas (Stripe)** → +20% = 60%
2. **Landing Page SaaS** → +15% = 75%
3. **Sites Públicos dos Casais** → +20% = 95%
4. **Gamificação (AbacatePay)** → +5% = 100%

---

## ⚙️ **Configuração e Execução**

### **Pré-requisitos**
```bash
Node.js 18+
npm ou yarn
Git
Conta no Supabase (gratuita)
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
```

### **3. Setup do Banco de Dados**
```bash
# Gerar cliente Prisma
npx prisma generate

# Sincronizar schema (se necessário)
npx prisma db pull

# Visualizar dados
npx prisma studio
```

### **4. Executar em Desenvolvimento**
```bash
npm run dev
```

Acesse: http://localhost:3000

---

## 📁 **Estrutura do Projeto**

```
eivoucasar/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── api/               # API Routes
│   │   ├── dashboard/         # Dashboard protegido
│   │   ├── login/             # Autenticação
│   │   └── signup/            # Cadastro expandido
│   ├── components/
│   │   ├── ui/                # Design system
│   │   ├── guests/            # Gestão de convidados
│   │   ├── layout/            # Header, Footer, Navbar
│   │   └── auth/              # Componentes de auth
│   ├── lib/
│   │   ├── database/          # Queries Prisma
│   │   └── api-client.ts      # HTTP client
│   └── types/                 # TypeScript definitions
├── prisma/
│   └── schema.prisma          # Schema do banco (13 tabelas)
├── doc/                       # Documentação técnica
└── public/
    └── image/                 # Logo oficial + assets
```

---

## 🎨 **Design System**

### **Cores Oficiais**
```css
Primary:   #fe97a2  /* Rosa coral da logo */
Secondary: #535354  /* Cinza da logo */
Accent:    #ed7a5e  /* Complementar harmônico */
Background: #ffffff /* Sempre branco */
```

### **Componentes Padronizados**
- **Formulários**: 100% consistentes com `input-modern`
- **Navegação**: Logos uniformizadas em `size="lg"`
- **Cards**: Variantes glass, elevated, gradient
- **Botões**: 8 variantes + 7 tamanhos + animações

---

## 📚 **Documentação**

### **Documentos Técnicos**
- 📋 [`doc/progresso-atual.md`](doc/progresso-atual.md) - Status detalhado
- 🎨 [`doc/melhorias-design-system.md`](doc/melhorias-design-system.md) - Melhorias visuais
- 📊 [`doc/progresso-desenvolvimento.md`](doc/progresso-desenvolvimento.md) - Progresso técnico
- 🗃️ [`doc/database-setup.md`](doc/database-setup.md) - Configuração do banco
- 🔧 [`doc/prisma-setup.md`](doc/prisma-setup.md) - Setup Prisma
- 🚀 [`doc/proximos-passos.md`](doc/proximos-passos.md) - Roadmap

### **Roadmap Oficial**
- 📖 [`doc/documentação.md`](doc/documentação.md) - Documentação completa do MVP

---

## 🔐 **Segurança**

### **Implementado**
- ✅ **Row Level Security (RLS)** em todas as tabelas
- ✅ **Validação Zod** em múltiplas camadas
- ✅ **Isolamento multi-tenant** completo
- ✅ **Autenticação Supabase** robusta
- ✅ **Environment variables** protegidas

### **Políticas de Segurança**
```sql
-- Casais veem apenas seus dados
auth.uid() = couples.user_id

-- Dados públicos controlados
isPublished = true AND isActive = true
```

---

## 🎮 **Gamificação (Preview)**

### **Mecânicas Planejadas**
- 🏆 **Competição por grupos**: Família vs Amigos
- 📊 **Rankings dinâmicos**: Individual e por grupo
- 🎯 **Metas visuais**: Lua de mel, mobília, festa
- 🏅 **Sistema de conquistas**: Badges automáticos
- 💰 **PIX gamificado**: QR codes com metas

---

## 🚀 **Deploy e Produção**

### **Plataformas Suportadas**
- ✅ **Vercel** (recomendado para Next.js)
- ✅ **Netlify** (alternativa)
- ✅ **Railway** (full-stack)

### **Configuração de Deploy**
```bash
# Build de produção
npm run build

# Verificar build localmente
npm start

# Deploy no Vercel
npx vercel --prod
```

---

## 🤝 **Contribuição**

### **Como Contribuir**
1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### **Padrões de Código**
- ✅ **TypeScript strict mode**
- ✅ **ESLint + Prettier** configurados
- ✅ **Conventional Commits**
- ✅ **Component patterns** documentados
- ✅ **Zero console.logs** em produção

---

## 📄 **Licença**

Este projeto está sob licença privada. Todos os direitos reservados.

---

## 📞 **Contato**

**Desenvolvedor:** Gabriel NFC  
**Repositório:** https://github.com/gabrielnfc/eivoucasar  
**Status:** MVP em desenvolvimento ativo  

---

<div align="center">

**🎉 Transformando casamentos em experiências únicas desde 2024**

*Made with 💕 for couples who want something special*

</div> 