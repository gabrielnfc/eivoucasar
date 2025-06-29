// ===============================================
// EICASEI - PRISMA CLIENT CONFIGURATION
// ===============================================

import { PrismaClient } from '@prisma/client'

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Helper function to handle Prisma disconnection
export async function disconnectPrisma() {
  await prisma.$disconnect()
}

// Error handling for Prisma
export class DatabaseError extends Error {
  constructor(message: string, public code?: string) {
    super(message)
    this.name = 'DatabaseError'
  }
}

// Helper to handle Prisma errors
export function handlePrismaError(error: any): never {
  console.error('Prisma Error:', error)
  
  if (error.code === 'P2002') {
    throw new DatabaseError('Um registro com estes dados já existe')
  }
  
  if (error.code === 'P2025') {
    throw new DatabaseError('Registro não encontrado')
  }
  
  if (error.code === 'P2003') {
    throw new DatabaseError('Violação de chave estrangeira')
  }
  
  throw new DatabaseError(error.message || 'Erro no banco de dados')
} 