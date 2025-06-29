# 📸 Imagens do Unsplash - EiVouCasar

## 🔧 **URLs Válidas e Testadas**

### **Avatar Stack (Casais Felizes)**
```
https://images.unsplash.com/photo-1606216794074-735e91aa2c92    ✅ Ana & Carlos
https://images.unsplash.com/photo-1583939003579-730e3918a45a    ✅ Marina & Felipe  
https://images.unsplash.com/photo-1519741497674-611481863552    ✅ Julia & Roberto
https://images.unsplash.com/photo-1511285560929-80b456fea0bc    ✅ Casal apaixonado
https://images.unsplash.com/photo-1519225421980-715cb0215aed    ✅ Noivos românticos (atualizada)
```

### **Backgrounds dos Exemplos (Cards)**
```
https://images.unsplash.com/photo-1606216794074-735e91aa2c92    ✅ Clássico
https://images.unsplash.com/photo-1583939003579-730e3918a45a    ✅ Moderno
https://images.unsplash.com/photo-1519741497674-611481863552    ✅ Romântico
```

### **Background Parallax (Gamificação)**
```
https://images.unsplash.com/photo-1519741497674-611481863552    ✅ Casamento outdoor
```

## 🚫 **URLs Problemáticas (Removidas)**
```
https://images.unsplash.com/photo-1612117689584-de0717b15460    ❌ 404 Error
https://images.unsplash.com/photo-1600298881974-6be191ceeda1    ❌ Substituída
https://images.unsplash.com/photo-1594736797933-d0501ba2fe65    ❌ Substituída
https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6    ❌ 404 Error (substituída)
```

## 🎯 **Parâmetros de Otimização**

### **Avatars Pequenos (40x40px)**
```
?w=100&h=100&fit=crop&crop=faces
```

### **Backgrounds Cards (300x400px)**
```
?w=300&h=400&fit=crop&crop=faces
```

### **Parallax Background (1920x1080px)**
```
?w=1920&h=1080&fit=crop&crop=center
```

## 🔧 **Configuração Next.js**

```typescript
// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
      port: '',
      pathname: '/**',
    },
  ],
},
```

## 📋 **Checklist de Manutenção**

- ✅ Remover configuração `domains` depreciada
- ✅ Usar apenas `remotePatterns`  
- ✅ Substituir URLs com 404
- ✅ Testar todas as imagens em dev
- ✅ Verificar performance das imagens
- ✅ Alt texts descritivos

## 🚀 **URLs de Backup (Confiáveis)**

Caso precise substituir alguma imagem:

```
https://images.unsplash.com/photo-1522673607200-164d1b6ce486    👰 Noiva elegante
https://images.unsplash.com/photo-1520854221256-17451cc331bf    🤵 Noivo clássico  
https://images.unsplash.com/photo-1519225421980-715cb0215aed    💑 Casal romântico
https://images.unsplash.com/photo-1469371670807-013ccf25f16a    🌸 Casamento jardim
https://images.unsplash.com/photo-1519741497674-611481863552    ⛪ Casamento igreja
```

## 🎨 **Dicas de Performance**

1. **Sempre usar parâmetros de tamanho** apropriados
2. **Usar `crop=faces`** para fotos de pessoas
3. **Usar `crop=center`** para paisagens/cenários
4. **Testar URLs** antes de implementar
5. **Ter backups** de URLs confiáveis

---

**Objetivo**: Garantir que todas as imagens carregem rapidamente e sem erros 404. 