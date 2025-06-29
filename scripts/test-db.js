// ===============================================
// EICASEI - SCRIPT DE TESTE DO BANCO DE DADOS
// ===============================================

// Carregar variáveis de ambiente do .env.local
require("dotenv").config({ path: ".env.local" });

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["error"],
});

async function testConnection() {
  try {
    console.log("🔍 Testando conexão com Supabase...");

    // Verificar se variáveis foram carregadas
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL não encontrada no .env.local");
    }

    console.log(
      "📊 DATABASE_URL carregada:",
      process.env.DATABASE_URL.slice(0, 50) + "..."
    );

    // Testar conexão
    await prisma.$connect();
    console.log("✅ Conectado ao Supabase com sucesso!");

    // Testar se planos existem
    const plansCount = await prisma.subscriptionPlan.count();
    console.log(`📊 Planos encontrados: ${plansCount}`);

    if (plansCount > 0) {
      const plans = await prisma.subscriptionPlan.findMany();
      console.log("\n📋 Planos disponíveis:");
      plans.forEach((plan) => {
        console.log(`  • ${plan.name}: R$ ${plan.priceMonthly}/mês`);
        console.log(
          `    ${plan.maxGuests} convidados, ${plan.maxPhotos} fotos`
        );
      });
    } else {
      console.log(
        "⚠️  Nenhum plano encontrado. Execute os scripts SQL no Supabase!"
      );
    }

    // Testar contadores
    const counts = {
      couples: await prisma.couple.count(),
      guests: await prisma.guest.count(),
      guestGroups: await prisma.guestGroup.count(),
      contributions: await prisma.contribution.count(),
    };

    console.log("\n📈 Registros no banco:");
    Object.entries(counts).forEach(([table, count]) => {
      console.log(`  • ${table}: ${count}`);
    });

    console.log("\n🎉 Teste concluído com sucesso!");
    console.log("\n📋 Próximos passos:");
    console.log("  1. ✅ Prisma + Supabase funcionando");
    console.log("  2. 🚀 Começar desenvolvimento do frontend");
    console.log("  3. 🎯 Criar primeiro componente React");
  } catch (error) {
    console.error("❌ Erro no teste:", error.message);

    if (error.message.includes("DATABASE_URL")) {
      console.log("\n🔧 Possíveis soluções:");
      console.log("  1. Verifique se existe o arquivo .env.local");
      console.log("  2. Confira se DATABASE_URL está correto");
      console.log("  3. Instale dotenv: npm install dotenv");
    } else if (error.message.includes("authentication failed")) {
      console.log("\n🔧 Erro de autenticação:");
      console.log("  1. Verifique a senha do banco no DATABASE_URL");
      console.log("  2. Resete a senha no Supabase se necessário");
    } else {
      console.log("\n🔧 Erro geral:");
      console.log("  1. Verifique se o Supabase está ativo");
      console.log("  2. Execute os scripts SQL primeiro");
      console.log("  3. Confira as credenciais");
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Executar teste
testConnection();
