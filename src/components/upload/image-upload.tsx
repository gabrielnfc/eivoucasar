'use client'

import { useState, useCallback } from 'react'
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react'
import { imageService } from '@/lib/upload/image-service'
import toast from 'react-hot-toast'

interface ImageUploadProps {
  coupleId: string
  type: 'hero' | 'couple' | 'bride' | 'groom' | 'gallery' | 'invitation'
  currentImage?: string
  onImageChange: (url: string) => void
  className?: string
  label?: string
  aspectRatio?: 'square' | 'landscape' | 'portrait'
  size?: 'sm' | 'md' | 'lg'
}

export function ImageUpload({
  coupleId,
  type,
  currentImage,
  onImageChange,
  className = '',
  label,
  aspectRatio = 'landscape',
  size = 'md'
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sizeClasses = {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64'
  }

  const aspectClasses = {
    square: 'aspect-square',
    landscape: 'aspect-video',
    portrait: 'aspect-[3/4]'
  }

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      // Preview imediato
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // Upload otimizado
      const uploadedUrl = await imageService.uploadImage(file, {
        coupleId,
        type,
        maxWidth: type === 'hero' ? 1920 : 800,
        maxHeight: type === 'hero' ? 1080 : 600,
        quality: 0.85
      })

      // Atualizar componente pai
      console.log('🖼️ ImageUpload: Chamando onImageChange com URL:', uploadedUrl)
      onImageChange(uploadedUrl)
      
      // Limpar preview temporário
      URL.revokeObjectURL(previewUrl)
      setPreview(uploadedUrl)
      
      toast.success('Imagem enviada com sucesso!')
      
    } catch (error) {
      console.error('Erro no upload:', error)
      setError(error instanceof Error ? error.message : 'Erro ao fazer upload')
      toast.error('Erro ao fazer upload da imagem')
      
      // Reverter preview
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview)
      }
      setPreview(currentImage || null)
    } finally {
      setIsUploading(false)
    }
  }, [coupleId, type, onImageChange, currentImage, preview])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }, [handleFileSelect])

  const handleRemove = useCallback(async () => {
    if (preview && preview !== currentImage) {
      try {
        await imageService.deleteImage(preview, coupleId)
        toast.success('Imagem removida com sucesso!')
      } catch (error) {
        console.error('Erro ao remover imagem:', error)
      }
    }
    
    setPreview(null)
    onImageChange('')
    setError(null)
  }, [preview, currentImage, coupleId, onImageChange])

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-secondary-700">
          {label}
        </label>
      )}
      
      <div className="relative group">
        {preview ? (
          <div className="relative overflow-hidden rounded-lg border border-neutral-200">
            <img
              src={preview}
              alt="Preview"
              className={`w-full object-cover ${sizeClasses[size]} ${aspectClasses[aspectRatio]}`}
            />
            
            {/* Overlay com ações */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                <label className="p-2 bg-white rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
                  <Upload className="w-4 h-4 text-gray-600" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileSelect(file)
                    }}
                    disabled={isUploading}
                  />
                </label>
                
                <button
                  onClick={handleRemove}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  disabled={isUploading}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <label
            className={`
              flex flex-col items-center justify-center 
              ${sizeClasses[size]} ${aspectClasses[aspectRatio]}
              border-2 border-dashed rounded-lg cursor-pointer
              transition-all duration-200
              ${dragActive 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }
              ${isUploading ? 'pointer-events-none opacity-50' : ''}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploading ? (
                <Loader2 className="w-8 h-8 mb-4 text-primary-500 animate-spin" />
              ) : (
                <ImageIcon className="w-8 h-8 mb-4 text-gray-500" />
              )}
              
              <p className="mb-2 text-sm text-gray-500">
                {isUploading ? (
                  <span className="font-semibold">Enviando...</span>
                ) : (
                  <>
                    <span className="font-semibold">Clique para enviar</span> ou arraste aqui
                  </>
                )}
              </p>
              
              {!isUploading && (
                <p className="text-xs text-gray-500">
                  PNG, JPG, WebP até 10MB
                </p>
              )}
            </div>
            
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileSelect(file)
              }}
              disabled={isUploading}
            />
          </label>
        )}
      </div>
      
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  )
} 