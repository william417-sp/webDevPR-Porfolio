# 🔒 Guía de Seguridad - API Key de OpenAI

## ⚠️ IMPORTANTE: Protege tu API Key

Tu API key de OpenAI es como una contraseña. Si alguien más la obtiene, puede:
- Usar tu cuenta y generar cargos
- Exceder tus límites de uso
- Acceder a tu información

## 🚨 Acción Inmediata Requerida

### 1. Regenera tu API Key (HAZLO AHORA)

1. Ve a [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Encuentra la key que compartiste
3. Haz clic en "Revoke" o "Delete"
4. Crea una nueva API key
5. Guárdala en un lugar seguro (gestor de contraseñas)

### 2. Configura Límites de Uso

1. Ve a [Usage limits](https://platform.openai.com/account/limits)
2. Establece un límite de gasto mensual (ej: $10/mes)
3. Configura alertas de email

### 3. Monitorea el Uso

Revisa regularmente:
- [Usage Dashboard](https://platform.openai.com/usage)
- Verifica transacciones no autorizadas
- Revisa patrones de uso inusuales

## 🛡️ Mejores Prácticas de Seguridad

### Para Desarrollo Local (Testing)

**Opción A: Archivo de configuración separado (Recomendado)**

1. Crea `js/ai-chatbot-config.js`:
```javascript
const CHATBOT_CONFIG = {
    apiKey: 'tu-nueva-api-key-aqui',
    useAI: true
};
```

2. Agrega al `.gitignore`:
```
js/ai-chatbot-config.js
```

3. Usa en tu código:
```javascript
// En ai-chatbot.js
const config = CHATBOT_CONFIG || {};
window.webDevPRChatbot = new AIChatbot(config);
```

**Opción B: Variables de entorno (Node.js)**

1. Crea `.env`:
```
OPENAI_API_KEY=tu-api-key-aqui
```

2. Usa en tu backend:
```javascript
require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;
```

### Para Producción (RECOMENDADO)

**Usa un Backend Proxy**

Esto evita exponer tu API key en el frontend.

#### Paso 1: Crea un backend simple (Node.js + Express)

```javascript
// server.js
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());

// Endpoint proxy para OpenAI
app.post('/api/chatbot', async (req, res) => {
    try {
        // Validaciones
        if (!req.body.message) {
            return res.status(400).json({ error: 'Message required' });
        }

        // Limitar longitud del mensaje
        if (req.body.message.length > 500) {
            return res.status(400).json({ error: 'Message too long' });
        }

        // Rate limiting básico (implementa uno más robusto)
        // TODO: Agregar rate limiting con express-rate-limit

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'Eres un asistente virtual de webDevPR...'
                    },
                    {
                        role: 'user',
                        content: req.body.message
                    }
                ],
                max_tokens: 200,
                temperature: 0.7
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || 'API Error');
        }

        res.json({
            message: data.choices[0].message.content
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Error processing request',
            fallback: true 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

#### Paso 2: Instala dependencias

```bash
npm install express node-fetch dotenv express-rate-limit
```

#### Paso 3: Crea `.env`

```
OPENAI_API_KEY=tu-api-key-aqui
PORT=3000
```

#### Paso 4: Configura el chatbot para usar tu backend

```javascript
// En ai-chatbot.js
window.webDevPRChatbot = new AIChatbot({
    businessName: 'webDevPR',
    language: 'es',
    useAI: true,
    apiEndpoint: '/api/chatbot',  // Tu backend
    // NO incluir apiKey aquí
});
```

#### Paso 5: Modifica el método getOpenAIResponse

```javascript
async getOpenAIResponse(userMessage) {
    const response = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: userMessage
        })
    });

    if (!response.ok) {
        const data = await response.json();
        if (data.fallback) {
            // Usar respuestas predefinidas como fallback
            return this.getIntelligentResponse(userMessage);
        }
        throw new Error('API request failed');
    }

    const data = await response.json();
    return data.message;
}
```

## 📊 Monitoreo de Costos

### Costos Aproximados de OpenAI (GPT-3.5-turbo)

- Input: $0.0015 por 1K tokens
- Output: $0.002 por 1K tokens

**Una conversación típica:**
- Usuario: ~50 tokens
- Respuesta: ~100 tokens
- Costo: ~$0.0003 (menos de 1 centavo)

**Estimación mensual:**
- 100 conversaciones/día = $0.90/mes
- 500 conversaciones/día = $4.50/mes
- 1000 conversaciones/día = $9.00/mes

### Configura Alertas

1. **En OpenAI Dashboard:**
   - Settings > Billing > Usage limits
   - Establece límite mensual: $10-$50
   - Activa email alerts en: $5, $8, $10

2. **En tu Backend:**
   - Implementa rate limiting
   - Monitorea requests por IP
   - Log de conversaciones

## 🔐 Checklist de Seguridad

Antes de subir a producción, verifica:

- [ ] API key regenerada después de compartir
- [ ] `.env` agregado a `.gitignore`
- [ ] API key NO está en archivos del frontend
- [ ] Backend proxy implementado
- [ ] Rate limiting configurado
- [ ] Límites de uso establecidos en OpenAI
- [ ] Alertas de email configuradas
- [ ] Validación de input implementada
- [ ] CORS configurado correctamente
- [ ] Logs de uso implementados
- [ ] Fallback a respuestas predefinidas si API falla

## 🆘 Si tu API Key fue comprometida

1. **Inmediatamente:**
   - Revoca la key en OpenAI dashboard
   - Revisa el historial de uso
   - Crea una nueva key

2. **Investiga:**
   - Revisa logs de uso inusual
   - Verifica cargos no autorizados
   - Contacta a OpenAI si hay actividad sospechosa

3. **Prevención futura:**
   - Usa backend proxy
   - Nunca incluyas keys en código público
   - Implementa rate limiting agresivo
   - Monitorea uso regularmente

## 📞 Soporte

- [OpenAI Help Center](https://help.openai.com/)
- [OpenAI Status](https://status.openai.com/)
- Email: support@openai.com

## 🔗 Recursos Adicionales

- [OpenAI Best Practices](https://platform.openai.com/docs/guides/safety-best-practices)
- [API Key Security](https://platform.openai.com/docs/guides/safety-best-practices/api-key-safety)
- [Rate Limiting Guide](https://platform.openai.com/docs/guides/rate-limits)

---

**Recuerda:** La seguridad es un proceso continuo. Revisa y actualiza tus prácticas regularmente.

