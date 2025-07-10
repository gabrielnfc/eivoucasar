'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit3, 
  Check, 
  X, 
  Upload, 
  Calendar, 
  Clock, 
  Palette, 
  Link, 
  Phone, 
  Mail,
  Type,
  AlignLeft,
  Bold,
  Italic,
  Underline,
  Image as ImageIcon,
  Save,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EditableField, EditableFieldType, EditableFieldValue } from '@/types/template';
import { cn } from '@/lib/utils';

interface InlineEditorProps {
  field: EditableField;
  value: EditableFieldValue;
  onSave: (value: EditableFieldValue) => void;
  onCancel?: () => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  placeholder?: string;
  template?: {
    fonts: {
      heading: string;
      body: string;
      script: string;
    };
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      text: string;
      textSecondary: string;
    };
  };
}

interface RichTextToolbarProps {
  onFormat: (command: string, value?: string) => void;
  isActive: (command: string) => boolean;
}

function RichTextToolbar({ onFormat, isActive }: RichTextToolbarProps) {
  return (
    <div className="flex items-center gap-1 p-2 bg-white border-b border-gray-200 rounded-t-lg">
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => onFormat('bold')}
        className={cn(
          'h-8 w-8 p-0',
          isActive('bold') && 'bg-blue-100 text-blue-600'
        )}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => onFormat('italic')}
        className={cn(
          'h-8 w-8 p-0',
          isActive('italic') && 'bg-blue-100 text-blue-600'
        )}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => onFormat('underline')}
        className={cn(
          'h-8 w-8 p-0',
          isActive('underline') && 'bg-blue-100 text-blue-600'
        )}
      >
        <Underline className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => onFormat('justifyLeft')}
        className="h-8 w-8 p-0"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
    </div>
  );
}

function ImageUploader({ 
  value, 
  onUpload, 
  placeholder = "Clique para fazer upload",
  className 
}: { 
  value: string; 
  onUpload: (url: string) => void; 
  placeholder?: string;
  className?: string;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas imagens');
      return;
    }

    setIsUploading(true);
    
    try {
      // Simular upload - em produção, fazer upload real para Supabase Storage
      const mockUrl = `https://images.unsplash.com/photo-${Date.now()}?w=800&h=600&fit=crop`;
      
      // Simular delay de upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onUpload(mockUrl);
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload da imagem');
    } finally {
      setIsUploading(false);
    }
  }, [onUpload]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg transition-all duration-200",
        dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
        className="hidden"
      />
      
      {value ? (
        <div className="relative group">
          <img 
            src={value} 
            alt="" 
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={handleClick}
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Alterar
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          disabled={isUploading}
          className="w-full h-48 flex flex-col items-center justify-center p-6 text-gray-500 hover:text-gray-700 transition-colors"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin mb-2" />
              <span className="text-sm">Fazendo upload...</span>
            </>
          ) : (
            <>
              <ImageIcon className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">{placeholder}</span>
              <span className="text-xs text-gray-400 mt-1">
                Ou arraste uma imagem aqui
              </span>
            </>
          )}
        </button>
      )}
    </div>
  );
}

function ColorPicker({ 
  value, 
  onChange, 
  presetColors = [] 
}: { 
  value: string; 
  onChange: (color: string) => void; 
  presetColors?: string[];
}) {
  const [customColor, setCustomColor] = useState(value);

  return (
    <div className="p-4 bg-white border rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cor Personalizada
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={customColor}
            onChange={(e) => {
              setCustomColor(e.target.value);
              onChange(e.target.value);
            }}
            className="w-16 h-10 border rounded-md cursor-pointer"
          />
          <input
            type="text"
            value={customColor}
            onChange={(e) => {
              setCustomColor(e.target.value);
              onChange(e.target.value);
            }}
            className="flex-1 px-3 py-2 border rounded-md text-sm font-mono"
            placeholder="#000000"
          />
        </div>
      </div>
      
      {presetColors.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cores Sugeridas
          </label>
          <div className="grid grid-cols-6 gap-2">
            {presetColors.map((color, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onChange(color)}
                className={cn(
                  "w-8 h-8 rounded-md border-2 transition-all",
                  value === color ? "border-gray-800 scale-110" : "border-gray-300 hover:border-gray-400"
                )}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function InlineEditor({
  field,
  value,
  onSave,
  onCancel,
  className,
  style,
  disabled = false,
  placeholder,
  template
}: InlineEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(value || ''));
  const [isSaving, setIsSaving] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>(null);

  const startEditing = () => {
    if (disabled) return;
    setIsEditing(true);
    setEditValue(String(value || ''));
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditValue(String(value || ''));
    setShowColorPicker(false);
    onCancel?.();
  };

  const saveEditing = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    
    try {
      // Validação
      if (field.required && !editValue.trim()) {
        alert('Este campo é obrigatório');
        return;
      }

      if (field.validation) {
        const error = field.validation(editValue);
        if (error) {
          alert(error);
          return;
        }
      }

      // Salvar valor
      onSave(editValue);
      setIsEditing(false);
      setShowColorPicker(false);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && field.type !== 'textarea' && field.type !== 'rich-text') {
      e.preventDefault();
      saveEditing();
    }
    if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      if (inputRef.current instanceof HTMLInputElement || inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const getFieldIcon = () => {
    switch (field.type) {
      case 'text': return <Type className="h-3 w-3" />;
      case 'textarea': return <AlignLeft className="h-3 w-3" />;
      case 'rich-text': return <Edit3 className="h-3 w-3" />;
      case 'image': return <ImageIcon className="h-3 w-3" />;
      case 'date': return <Calendar className="h-3 w-3" />;
      case 'time': return <Clock className="h-3 w-3" />;
      case 'color': return <Palette className="h-3 w-3" />;
      case 'url': return <Link className="h-3 w-3" />;
      case 'phone': return <Phone className="h-3 w-3" />;
      case 'email': return <Mail className="h-3 w-3" />;
      default: return <Edit3 className="h-3 w-3" />;
    }
  };

  const renderEditingInterface = () => {
    switch (field.type) {
      case 'image':
        return (
          <div className="relative">
            <ImageUploader
              value={editValue}
              onUpload={(url) => {
                setEditValue(url);
                onSave(url);
                setIsEditing(false);
              }}
              placeholder={placeholder || field.placeholder}
              className="min-h-48"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={cancelEditing}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 'rich-text':
        return (
          <div className="border rounded-lg overflow-hidden">
            <RichTextToolbar
              onFormat={(command) => {
                document.execCommand(command, false, undefined);
              }}
              isActive={(command) => document.queryCommandState(command)}
            />
            <div
              ref={inputRef as React.RefObject<HTMLDivElement>}
              contentEditable
              onInput={(e) => setEditValue(e.currentTarget.innerHTML)}
              onKeyDown={handleKeyDown}
              className="p-4 min-h-32 max-h-96 overflow-y-auto focus:outline-none"
              style={{
                fontFamily: template?.fonts.body,
                color: template?.colors.text,
              }}
              dangerouslySetInnerHTML={{ __html: editValue }}
            />
            <div className="flex justify-end gap-2 p-2 bg-gray-50 border-t">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={cancelEditing}
              >
                <X className="h-4 w-4 mr-1" />
                Cancelar
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={saveEditing}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Check className="h-4 w-4 mr-1" />
                )}
                Salvar
              </Button>
            </div>
          </div>
        );

      case 'color':
        return (
          <div className="relative">
            <ColorPicker
              value={editValue}
              onChange={(color) => {
                setEditValue(color);
                onSave(color);
                setIsEditing(false);
              }}
              presetColors={template ? [
                template.colors.primary,
                template.colors.secondary,
                template.colors.accent,
                template.colors.text,
                template.colors.textSecondary,
              ] : []}
            />
            <div className="absolute top-2 right-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={cancelEditing}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 'textarea':
        return (
          <div className="relative">
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder || field.placeholder}
              maxLength={field.maxLength}
              className="w-full p-3 border-2 border-blue-400 rounded-lg focus:outline-none focus:border-blue-600 resize-none"
              style={{
                fontFamily: template?.fonts.body,
                color: template?.colors.text,
                minHeight: '100px',
              }}
              rows={4}
            />
            <div className="absolute -top-8 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              Enter para nova linha, Esc para cancelar
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={cancelEditing}
              >
                <X className="h-4 w-4 mr-1" />
                Cancelar
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={saveEditing}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Check className="h-4 w-4 mr-1" />
                )}
                Salvar
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="relative">
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type={field.type === 'date' ? 'date' : field.type === 'time' ? 'time' : field.type}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={saveEditing}
              placeholder={placeholder || field.placeholder}
              maxLength={field.maxLength}
              className="w-full p-2 border-2 border-blue-400 rounded-lg focus:outline-none focus:border-blue-600"
              style={{
                fontFamily: template?.fonts.body,
                color: template?.colors.text,
              }}
            />
            <div className="absolute -top-8 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              Enter para salvar, Esc para cancelar
            </div>
          </div>
        );
    }
  };

  const renderDisplayValue = () => {
    if (!value && !placeholder && !field.placeholder) {
      return <span className="text-gray-400 italic">Clique para editar</span>;
    }

    const displayValue = String(value || placeholder || field.placeholder);

    switch (field.type) {
      case 'image':
        return value ? (
          <img 
            src={String(value)} 
            alt="" 
            className="w-full h-auto rounded-lg"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <ImageIcon className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm">{displayValue}</span>
            </div>
          </div>
        );

      case 'rich-text':
        return (
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: displayValue }}
          />
        );

      case 'color':
        return (
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded-md border-2 border-gray-300"
              style={{ backgroundColor: String(value || '#000000') }}
            />
            <span>{displayValue}</span>
          </div>
        );

      case 'date':
        return new Date(String(value)).toLocaleDateString('pt-BR');

      case 'time':
        return displayValue;

      default:
        return displayValue;
    }
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className={cn("relative", className)}
        style={style}
      >
        {renderEditingInterface()}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(
        "relative group cursor-pointer transition-all duration-200",
        "hover:bg-blue-50 hover:bg-opacity-50 rounded-lg p-2 -m-2",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      style={style}
      onClick={startEditing}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {renderDisplayValue()}
      
      {!disabled && (
        <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-blue-600 text-white p-1 rounded-full shadow-lg">
            {getFieldIcon()}
          </div>
        </div>
      )}
      
      {field.required && (
        <div className="absolute -top-1 -left-1 text-red-500 text-xs">
          *
        </div>
      )}
    </motion.div>
  );
} 