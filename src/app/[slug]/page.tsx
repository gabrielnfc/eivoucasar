import { TemplateRenderer } from '@/components/templates/template-renderer'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function WeddingPage({ params }: PageProps) {
  const { slug } = await params
  
  return (
    <div className="wedding-site">
      <TemplateRenderer 
        slug={slug}
        isEditable={false}
      />
    </div>
  )
}