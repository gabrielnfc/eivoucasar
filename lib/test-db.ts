// ===============================================
// EICASEI - DATABASE CONNECTION TEST
// ===============================================

import { prisma } from './database/prisma'

/**
 * Testar conexão com o banco de dados
 */
export async function testDatabaseConnection() {
  try {
    console.log('🔍 Testando conexão com o banco de dados...')
    
    // Testar conexão básica
    await prisma.$connect()
    console.log('✅ Conexão estabelecida com sucesso!')
    
    // Testar query simples
    const plansCount = await prisma.subscriptionPlan.count()
    console.log(`📊 Planos de assinatura encontrados: ${plansCount}`)
    
    // Listar planos
    const plans = await prisma.subscriptionPlan.findMany({
      select: {
        name: true,
        priceMonthly: true,
        maxGuests: true
      }
    })
    
    console.log('📋 Planos disponíveis:')
    plans.forEach(plan => {
      console.log(`  - ${plan.name}: R$ ${plan.priceMonthly}/mês (${plan.maxGuests} convidados)`)
    })
    
    return {
      success: true,
      message: 'Conexão com banco estabelecida com sucesso!',
      plansCount,
      plans
    }
    
  } catch (error) {
    console.error('❌ Erro na conexão com o banco:', error)
    return {
      success: false,
      message: 'Falha na conexão com o banco de dados',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }
  } finally {
    await prisma.$disconnect()
  }
} 