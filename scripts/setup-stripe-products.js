// ===============================================
// EICASEI - STRIPE PRODUCTS SETUP SCRIPT
// ===============================================

const Stripe = require("stripe");
require("dotenv").config({ path: ".env.local" });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createStripeProducts() {
  console.log("🚀 Configurando produtos e preços no Stripe...\n");

  try {
    // Plano Básico
    console.log("📦 Criando plano Básico...");
    const basicProduct = await stripe.products.create({
      name: "Básico",
      description: "Perfeito para casamentos menores - até 50 convidados",
      metadata: {
        plan_id: "BASIC",
        max_guests: "50",
        max_photos: "20",
        allows_custom_domain: "false",
        allows_analytics: "false",
      },
    });

    const basicMonthly = await stripe.prices.create({
      product: basicProduct.id,
      unit_amount: 2990, // R$ 29,90
      currency: "brl",
      recurring: { interval: "month" },
      nickname: "Básico Mensal",
    });

    const basicYearly = await stripe.prices.create({
      product: basicProduct.id,
      unit_amount: 29990, // R$ 299,90
      currency: "brl",
      recurring: { interval: "year" },
      nickname: "Básico Anual",
    });

    console.log(`✅ Básico criado:`);
    console.log(`   Product ID: ${basicProduct.id}`);
    console.log(`   Monthly Price ID: ${basicMonthly.id}`);
    console.log(`   Yearly Price ID: ${basicYearly.id}\n`);

    // Plano Premium
    console.log("📦 Criando plano Premium...");
    const premiumProduct = await stripe.products.create({
      name: "Premium",
      description:
        "Para casamentos médios com mais recursos - até 150 convidados",
      metadata: {
        plan_id: "PREMIUM",
        max_guests: "150",
        max_photos: "100",
        allows_custom_domain: "true",
        allows_analytics: "true",
      },
    });

    const premiumMonthly = await stripe.prices.create({
      product: premiumProduct.id,
      unit_amount: 4990, // R$ 49,90
      currency: "brl",
      recurring: { interval: "month" },
      nickname: "Premium Mensal",
    });

    const premiumYearly = await stripe.prices.create({
      product: premiumProduct.id,
      unit_amount: 49990, // R$ 499,90
      currency: "brl",
      recurring: { interval: "year" },
      nickname: "Premium Anual",
    });

    console.log(`✅ Premium criado:`);
    console.log(`   Product ID: ${premiumProduct.id}`);
    console.log(`   Monthly Price ID: ${premiumMonthly.id}`);
    console.log(`   Yearly Price ID: ${premiumYearly.id}\n`);

    // Plano Pro
    console.log("📦 Criando plano Pro...");
    const proProduct = await stripe.products.create({
      name: "Pro",
      description:
        "Para casamentos grandes sem limites - convidados ilimitados",
      metadata: {
        plan_id: "PRO",
        max_guests: "-1",
        max_photos: "-1",
        allows_custom_domain: "true",
        allows_analytics: "true",
      },
    });

    const proMonthly = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: 7990, // R$ 79,90
      currency: "brl",
      recurring: { interval: "month" },
      nickname: "Pro Mensal",
    });

    const proYearly = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: 79990, // R$ 799,90
      currency: "brl",
      recurring: { interval: "year" },
      nickname: "Pro Anual",
    });

    console.log(`✅ Pro criado:`);
    console.log(`   Product ID: ${proProduct.id}`);
    console.log(`   Monthly Price ID: ${proMonthly.id}`);
    console.log(`   Yearly Price ID: ${proYearly.id}\n`);

    // Generate environment variables
    console.log("🔧 Adicione essas variáveis ao seu .env.local:\n");
    console.log("# Stripe Product IDs");
    console.log(`STRIPE_PRODUCT_BASIC_ID=${basicProduct.id}`);
    console.log(`STRIPE_PRICE_BASIC_MONTHLY_ID=${basicMonthly.id}`);
    console.log(`STRIPE_PRICE_BASIC_YEARLY_ID=${basicYearly.id}`);
    console.log();
    console.log(`STRIPE_PRODUCT_PREMIUM_ID=${premiumProduct.id}`);
    console.log(`STRIPE_PRICE_PREMIUM_MONTHLY_ID=${premiumMonthly.id}`);
    console.log(`STRIPE_PRICE_PREMIUM_YEARLY_ID=${premiumYearly.id}`);
    console.log();
    console.log(`STRIPE_PRODUCT_PRO_ID=${proProduct.id}`);
    console.log(`STRIPE_PRICE_PRO_MONTHLY_ID=${proMonthly.id}`);
    console.log(`STRIPE_PRICE_PRO_YEARLY_ID=${proYearly.id}`);
    console.log();

    console.log("🎉 Produtos criados com sucesso!");
    console.log("📝 Não esqueça de:");
    console.log("   1. Adicionar as variáveis de ambiente acima");
    console.log("   2. Configurar o webhook endpoint no Stripe Dashboard");
    console.log("   3. Testar o checkout flow");
    console.log();
    console.log("🔗 Webhook URL: https://your-domain.com/api/stripe/webhooks");
  } catch (error) {
    console.error("❌ Erro ao criar produtos:", error.message);

    if (error.code === "invalid_api_key") {
      console.log(
        "💡 Verifique se STRIPE_SECRET_KEY está correto no .env.local"
      );
    }
  }
}

// Run the script
createStripeProducts();
