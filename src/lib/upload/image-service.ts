import { createClient } from '@/lib/supabase/client'
import imageCompression from 'browser-image-compression'

interface UploadOptions {
  coupleId: string
  type: 'hero' | 'couple' | 'bride' | 'groom' | 'gallery' | 'invitation'
  maxWidth?: number
  maxHeight?: number
  quality?: number
}

export class ImageService {
  private supabase = createClient()
  private bucketName = 'wedding-images'

  async uploadImage(file: File, options: UploadOptions): Promise<string> {
    try {
      // 1. Validar arquivo
      if (!this.isValidImage(file)) {
        throw new Error('Formato de imagem inválido. Use PNG, JPG ou WebP.')
      }

      // 2. Comprimir imagem antes do upload
      const compressedFile = await this.compressImage(file, options)

      // 3. Gerar path multi-tenant
      const path = this.generateImagePath(options.coupleId, options.type, file.name)

      // 4. Upload para Supabase Storage
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .upload(path, compressedFile, {
          cacheControl: '3600',
          upsert: true
        })

      if (error) {
        console.error('Erro no upload:', error)
        throw new Error(`Erro ao fazer upload da imagem: ${error.message || 'Erro desconhecido'}`)
      }

      // 5. Retornar URL pública
      return this.getPublicUrl(data.path)
    } catch (error) {
      console.error('Erro no ImageService:', error)
      
      // Melhorar error handling
      if (error instanceof Error) {
        throw new Error(`Upload falhou: ${error.message}`)
      } else {
        throw new Error(`Upload falhou: ${JSON.stringify(error)}`)
      }
    }
  }

  async deleteImage(url: string, coupleId: string): Promise<void> {
    try {
      const path = this.extractPathFromUrl(url)
      
      // Verificar se o path pertence ao casal (segurança multi-tenant)
      if (!path.startsWith(coupleId)) {
        throw new Error('Acesso negado: imagem não pertence ao casal')
      }

      const { error } = await this.supabase.storage
        .from(this.bucketName)
        .remove([path])

      if (error) {
        console.error('Erro ao deletar imagem:', error)
        throw new Error('Erro ao deletar imagem')
      }
    } catch (error) {
      console.error('Erro ao deletar imagem:', error)
      throw error
    }
  }

  private isValidImage(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    const maxSize = 10 * 1024 * 1024 // 10MB
    
    return validTypes.includes(file.type) && file.size <= maxSize
  }

  private async compressImage(file: File, options: UploadOptions): Promise<File> {
    const compressionOptions = {
      maxSizeMB: 2,
      maxWidthOrHeight: this.getMaxDimensions(options.type),
      useWebWorker: true,
      fileType: 'image/webp' as const,
      quality: options.quality || 0.85
    }

    try {
      return await imageCompression(file, compressionOptions)
    } catch (error) {
      console.error('Erro na compressão:', error)
      // Se falhar a compressão, retorna arquivo original
      return file
    }
  }

  private getMaxDimensions(type: string): number {
    switch (type) {
      case 'hero':
        return 1920
      case 'couple':
      case 'bride':
      case 'groom':
        return 800
      case 'gallery':
        return 1200
      case 'invitation':
        return 600
      default:
        return 1200
    }
  }

  private generateImagePath(coupleId: string, type: string, filename: string): string {
    const timestamp = Date.now()
    const extension = filename.split('.').pop()?.toLowerCase() || 'webp'
    
    // Garantir isolamento multi-tenant no path
    return `${coupleId}/${type}/${timestamp}.${extension}`
  }

  private getPublicUrl(path: string): string {
    const { data } = this.supabase.storage
      .from(this.bucketName)
      .getPublicUrl(path)

    return data.publicUrl
  }

  private extractPathFromUrl(url: string): string {
    // Extrair path do URL público do Supabase
    const urlParts = url.split('/')
    const bucketIndex = urlParts.findIndex(part => part === this.bucketName)
    
    if (bucketIndex === -1) {
      throw new Error('URL inválida')
    }

    return urlParts.slice(bucketIndex + 1).join('/')
  }

  // Método utilitário para verificar se bucket existe (sem criar)
  async checkBucketExists(): Promise<boolean> {
    try {
      const { data: buckets } = await this.supabase.storage.listBuckets()
      return buckets?.some(bucket => bucket.name === this.bucketName) || false
    } catch (error) {
      console.error('Erro ao verificar bucket:', error)
      return false
    }
  }

  // Método simplificado para inicializar bucket (apenas para uso manual)
  async initializeBucket(): Promise<void> {
    try {
      const { data: buckets } = await this.supabase.storage.listBuckets()
      
      const bucketExists = buckets?.some(bucket => bucket.name === this.bucketName)
      
      if (!bucketExists) {
        console.warn(`Bucket ${this.bucketName} não encontrado. Configure manualmente no Supabase Dashboard.`)
        throw new Error(`Bucket ${this.bucketName} não encontrado. Execute a migração SQL completa.`)
      }
    } catch (error) {
      console.error('Erro ao verificar bucket:', error)
      throw error
    }
  }
}

// Instância singleton
export const imageService = new ImageService() 