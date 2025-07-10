import { NextRequest, NextResponse } from 'next/server'
import { WeddingTemplate } from '@/types/template'

// Mock data - em produção viria do banco de dados
const mockTemplate: WeddingTemplate = {
  id: 'template-1',
  name: 'Romance Clássico',
  description: 'Template elegante e romântico',
  category: 'Classic',
  preview: '/api/placeholder/800/600',
  colors: {
    primary: '#be185d',
    secondary: '#ec4899',
    accent: '#f97316',
    background: '#fef2f2',
    text: '#1f2937',
    textSecondary: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  fonts: {
    heading: 'Playfair Display, serif',
    body: 'Inter, sans-serif',
    script: 'Dancing Script, cursive'
  },
  sections: [], // Configuração completa das seções
  globalSettings: {
    showNavigation: true,
    navigationStyle: 'sticky',
    showFooter: true,
    enableAnimations: true,
    musicAutoplay: false,
    theme: 'light'
  },
  romantic: {
    animationStyle: 'elegant',
    intensity: 'moderate'
  },
  seo: {
    title: { id: 'seoTitle', type: 'text', value: 'Ana & João - Casamento 15/06/2024' },
    description: { id: 'seoDescription', type: 'textarea', value: 'Celebre conosco o casamento de Ana e João no dia 15 de junho de 2024' },
    image: { id: 'seoImage', type: 'image', value: '/api/placeholder/1200/630' },
    keywords: { id: 'seoKeywords', type: 'text', value: 'casamento, ana, joão, 2024, são paulo' }
  }
}

// GET - Buscar template do casal
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ coupleId: string }> }
) {
  try {
    const { coupleId } = await params
    
    // Em produção:
    // const template = await getTemplateByCouple(coupleId)
    // if (!template) return NextResponse.json({ error: 'Template não encontrado' }, { status: 404 })
    
    // Mock response
    const template = {
      ...mockTemplate,
      coupleId
    }
    
    return NextResponse.json({ 
      success: true, 
      data: template 
    })
    
  } catch (error) {
    console.error('Erro ao buscar template:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar template
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ coupleId: string }> }
) {
  try {
    const { coupleId } = await params
    const body = await request.json()
    
    // Validação básica
    if (!body.sectionId || !body.fieldId || body.value === undefined) {
      return NextResponse.json(
        { success: false, error: 'Dados inválidos' },
        { status: 400 }
      )
    }
    
    // Em produção:
    // await updateTemplateField(coupleId, body.sectionId, body.fieldId, body.value)
    
    console.log('Template atualizado:', {
      coupleId,
      sectionId: body.sectionId,
      fieldId: body.fieldId,
      value: body.value
    })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Template atualizado com sucesso' 
    })
    
  } catch (error) {
    console.error('Erro ao atualizar template:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar template' },
      { status: 500 }
    )
  }
}

// POST - Salvar template completo
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ coupleId: string }> }
) {
  try {
    const { coupleId } = await params
    const template: WeddingTemplate = await request.json()
    
    // Validação do template
    if (!template.id || !template.sections) {
      return NextResponse.json(
        { success: false, error: 'Template inválido' },
        { status: 400 }
      )
    }
    
    // Em produção:
    // await saveTemplate(coupleId, template)
    
    console.log('Template salvo:', { coupleId, templateId: template.id })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Template salvo com sucesso',
      data: { id: template.id }
    })
    
  } catch (error) {
    console.error('Erro ao salvar template:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao salvar template' },
      { status: 500 }
    )
  }
} 