# 🚀 Configuración de Groq API con Llama 3.2 para el Chatbot

## ✅ El chatbot ya está configurado para usar Llama 3.2 con Groq

El código ya está listo. Solo necesitas obtener tu API key y configurarla.

## 📝 Pasos para Configurar Groq

### **Paso 1: Obtener API Key de Groq**

1. **Ve a la consola de Groq**: https://console.groq.com/keys
2. **Crea una cuenta** (es gratis, no requiere tarjeta de crédito)
3. **Haz clic en "Create API Key"** o "Crear clave API"
4. **Copia tu API key** (empieza con `gsk_...`)

### **Paso 2: Configurar el Chatbot**

1. **Abre el archivo**: `js/ai-chatbot.js`
2. **Busca esta sección** (al inicio del archivo, línea ~17):

```javascript
const GROQ_CONFIG = {
    enabled: false, // Cambia a 'true' cuando tengas tu API key
    apiKey: 'YOUR_GROQ_API_KEY', // Reemplaza con tu API key de Groq
    model: 'llama-3.2-90b-text-preview', // Llama 3.2 - modelo más potente
    ...
};
```

3. **Reemplaza los valores**:
   - Cambia `enabled: false` a `enabled: true`
   - Reemplaza `'YOUR_GROQ_API_KEY'` con tu API key real

**Ejemplo:**
```javascript
const GROQ_CONFIG = {
    enabled: true, // ✅ Habilitado
    apiKey: 'gsk_tu_api_key_aqui_123456', // ✅ Tu API key real
    model: 'llama-3.2-90b-text-preview',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    temperature: 0.7,
    max_tokens: 500
};
```

### **Paso 3: Guardar y Probar**

1. **Guarda el archivo** `js/ai-chatbot.js`
2. **Recarga tu página web** (Ctrl+F5 o Cmd+Shift+R para limpiar caché)
3. **Abre el chatbot** y haz una pregunta de prueba
4. **Verifica en la consola del navegador** (F12) que no haya errores

## 🤖 Modelos Disponibles en Groq

### **Llama 3.2 90B (Recomendado)**
```javascript
model: 'llama-3.2-90b-text-preview' // Más potente, respuestas mejores
```

### **Llama 3.1 8B (Más Rápido)**
```javascript
model: 'llama-3.1-8b-instant' // Más rápido, menos tokens
```

### **Llama 3.2 11B (Balanceado)**
```javascript
model: 'llama-3.2-11b-text-preview' // Balance entre velocidad y calidad
```

## 💰 Costos de Groq (Muy Económicos)

- **Llama 3.2 90B**: ~$0.27 por 1M tokens de entrada
- **Llama 3.1 8B**: ~$0.05 por 1M tokens de entrada

**Ejemplo de uso:**
- Una conversación típica usa ~200 tokens
- Con el plan gratuito de Groq tienes ~14,000 requests gratis
- Costo por conversación: < $0.001 (menos de 1 centavo)

## 🔒 Seguridad

⚠️ **IMPORTANTE**: 
- **NO** subas tu API key a repositorios públicos (GitHub, GitLab, etc.)
- Si usas control de versiones, agrega `ai-chatbot.js` a `.gitignore` O usa variables de entorno
- Considera usar un backend proxy para mayor seguridad en producción

## 🛠️ Troubleshooting

### **El chatbot no responde con IA**
- ✅ Verifica que `enabled: true`
- ✅ Verifica que tu API key sea correcta (debe empezar con `gsk_`)
- ✅ Abre la consola del navegador (F12) y revisa errores
- ✅ Verifica que tengas créditos en tu cuenta de Groq

### **Error 401 (Unauthorized)**
- Tu API key no es válida o ha expirado
- Obtén una nueva API key en https://console.groq.com/keys

### **Error 429 (Too Many Requests)**
- Has excedido el límite de rate limiting
- Espera unos minutos y vuelve a intentar

### **El chatbot usa respuestas predefinidas**
- Esto es normal si Groq no está configurado
- El sistema usa fallback automáticamente
- Verifica tu configuración de nuevo

## ✨ Características

- ✅ **Fallback automático**: Si Groq falla, usa respuestas predefinidas
- ✅ **System prompt personalizado**: Configurado para webDevPR
- ✅ **Respuestas en español**: Optimizado para tu mercado
- ✅ **Información de la empresa**: El bot conoce tus servicios y precios

## 🎯 Próximos Pasos

Una vez configurado, el chatbot:
- Responderá con **Llama 3.2** para conversaciones más naturales
- Mantendrá las respuestas predefinidas como **fallback** seguro
- Será más inteligente y flexible con preguntas variadas

¡Listo! Tu chatbot ahora usa Llama 3.2 con Groq. 🚀

