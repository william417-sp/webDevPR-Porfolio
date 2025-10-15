# 🤖 Agente de IA para Servicio al Cliente - webDevPR

## Descripción

Un chatbot inteligente con IA integrado que proporciona atención al cliente 24/7 en tu sitio web. El sistema puede funcionar de dos maneras:

1. **Modo Inteligente (Sin API)** - Usa patrones de reconocimiento avanzados para responder preguntas comunes
2. **Modo IA Completo (Con API)** - Se conecta a OpenAI para respuestas generadas por IA real

## ✨ Características

### Funcionalidades Principales
- 💬 **Chat en tiempo real** con interfaz moderna y atractiva
- 🎯 **Botones de acciones rápidas** para consultas comunes
- 📱 **Diseño responsivo** que funciona en móviles y desktop
- 🌐 **Multilenguaje** (actualmente en español, fácil de expandir)
- 🎨 **Personalizable** con temas y colores de tu marca
- ⚡ **Rendimiento optimizado** con carga rápida
- 🔒 **Seguro** sin almacenar datos sensibles del usuario

### Capacidades del Chatbot
El chatbot puede responder preguntas sobre:
- ✅ Servicios ofrecidos (Desarrollo Web, E-commerce, Apps, SEO, etc.)
- ✅ Precios y cotizaciones
- ✅ Tiempos de desarrollo
- ✅ Información de contacto
- ✅ Portafolio y proyectos anteriores
- ✅ Agendar consultas gratuitas
- ✅ Soporte técnico y mantenimiento

## 🚀 Instalación

### Ya está instalado en tu sitio

El chatbot ya está integrado en:
- ✅ `pages/homepage.html`
- ✅ `pages/contact_consultation.html`
- ✅ Puedes agregarlo a cualquier otra página

### Para agregar a páginas adicionales

Simplemente agrega esta línea antes del cierre de `</body>`:

```html
<!-- AI Chatbot -->
<script src="../js/ai-chatbot.js"></script>
```

## 📖 Uso

### Modo 1: Inteligente (Predeterminado - Sin API)

**Estado actual:** ✅ ACTIVO

El chatbot está funcionando con respuestas inteligentes predefinidas. No requiere configuración adicional.

**Ventajas:**
- ✅ Funciona inmediatamente sin configuración
- ✅ Sin costos de API
- ✅ Respuestas rápidas y consistentes
- ✅ Control total sobre las respuestas
- ✅ Privacidad garantizada (no envía datos a terceros)

**Ideal para:**
- Respuestas a preguntas frecuentes
- Información sobre servicios y precios
- Redirección a formularios de contacto
- Captura de leads básica

### Modo 2: IA Completa (Con OpenAI API)

**Estado actual:** ⚠️ INACTIVO (requiere API key)

Para activar respuestas generadas por IA real usando OpenAI:

#### Paso 1: Obtener API Key de OpenAI

1. Ve a [OpenAI Platform](https://platform.openai.com/api-keys)
2. Crea una cuenta o inicia sesión
3. Genera una nueva API key
4. Copia la key (empieza con `sk-...`)

**Costo aproximado:** $0.002 por conversación típica (GPT-3.5-turbo)

#### Paso 2: Configurar API Key

Abre `js/ai-chatbot.js` y busca esta sección al final del archivo:

```javascript
// Initialize with default configuration
window.webDevPRChatbot = new AIChatbot({
    businessName: 'webDevPR',
    language: 'es',
    theme: 'primary',
    // To enable real AI, add your OpenAI API key here:
    // apiKey: 'sk-your-api-key-here',
    // useAI: true
});
```

Modifica a:

```javascript
window.webDevPRChatbot = new AIChatbot({
    businessName: 'webDevPR',
    language: 'es',
    theme: 'primary',
    apiKey: 'sk-tu-api-key-aqui',  // ⚠️ IMPORTANTE: Reemplaza con tu API key
    useAI: true
});
```

**⚠️ SEGURIDAD IMPORTANTE:**
- NO subas el archivo con tu API key a repositorios públicos (GitHub, GitLab, etc.)
- Considera usar variables de entorno o un backend proxy
- Monitorea el uso de tu API para evitar costos inesperados

#### Paso 3: Para Producción (Recomendado)

Para mayor seguridad, crea un backend proxy:

```javascript
// Archivo: api/chatbot-proxy.js (Node.js example)
const express = require('express');
const app = express();

app.post('/api/chat', async (req, res) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    res.json(data);
});

app.listen(3000);
```

Luego configura el chatbot:

```javascript
window.webDevPRChatbot = new AIChatbot({
    businessName: 'webDevPR',
    language: 'es',
    apiEndpoint: '/api/chat',  // Tu backend proxy
    useAI: true
});
```

## 🎨 Personalización

### Cambiar Colores y Tema

El chatbot usa las clases CSS de Tailwind del sitio. Para cambiar colores, modifica en `js/ai-chatbot.js`:

```javascript
window.webDevPRChatbot = new AIChatbot({
    theme: 'primary',  // Opciones: 'primary', 'secondary', 'accent'
    // ... otras opciones
});
```

### Modificar Respuestas Predefinidas

En `js/ai-chatbot.js`, busca el método `getIntelligentResponse()` y modifica los patrones:

```javascript
const patterns = [
    {
        patterns: ['hola', 'buenos', 'buenas'],
        responses: [
            '¡Hola! 👋 Tu mensaje personalizado aquí'
        ]
    },
    // Agrega más patrones...
];
```

### Agregar Nuevas Acciones Rápidas

En `createChatWidget()`, modifica los botones de acciones rápidas:

```html
<button class="quick-action-btn ..." data-action="tu-accion">
    🎯 Tu Acción
</button>
```

Y agrega el handler en `handleQuickAction()`:

```javascript
const messages = {
    servicios: '¿Qué servicios ofrecen?',
    'tu-accion': '¿Tu pregunta personalizada?'
};
```

## 📊 Monitoreo y Analytics

### Ver Conversaciones en Consola

El chatbot registra todas las conversaciones en la consola del navegador. Para acceder:

1. Presiona F12 (Developer Tools)
2. Ve a la pestaña "Console"
3. Busca los mensajes del chatbot

### Integrar con Google Analytics

Agrega este código en `handleSendMessage()`:

```javascript
// Después de agregar el mensaje del usuario
gtag('event', 'chatbot_message', {
    'event_category': 'Chatbot',
    'event_label': message,
    'value': 1
});
```

## 🔧 Solución de Problemas

### El chatbot no aparece

1. ✅ Verifica que el script esté incluido: `<script src="../js/ai-chatbot.js"></script>`
2. ✅ Verifica la ruta del archivo (usa `../js/` si estás en `pages/`)
3. ✅ Abre la consola (F12) y busca errores
4. ✅ Verifica que Tailwind CSS esté cargado

### Las respuestas son lentas

**Con API de OpenAI:**
- Configura un timeout más corto
- Usa GPT-3.5-turbo en lugar de GPT-4 (más rápido y barato)
- Implementa caché de respuestas comunes

**Sin API:**
- Las respuestas deberían ser instantáneas
- Verifica tu conexión a internet
- Revisa la consola por errores

### Error de API con OpenAI

1. ✅ Verifica que tu API key sea correcta
2. ✅ Asegúrate de tener créditos disponibles en OpenAI
3. ✅ Revisa los límites de rate limit (solicitudes por minuto)
4. ✅ Verifica que `useAI: true` esté configurado

### El chatbot no responde bien

**Modo Inteligente:**
- Agrega más patrones en `getIntelligentResponse()`
- Mejora las palabras clave que busca

**Modo IA:**
- Mejora el `systemPrompt` con más contexto
- Aumenta `max_tokens` para respuestas más largas
- Ajusta `temperature` (0.7 = creativo, 0.3 = preciso)

## 🚀 Próximas Mejoras

### Funcionalidades Planeadas

- [ ] **Historial de conversaciones** - Guardar chats en localStorage
- [ ] **Notificaciones por email** - Enviar transcripciones al equipo
- [ ] **Integración con CRM** - Enviar leads automáticamente
- [ ] **Análisis de sentimiento** - Detectar clientes frustrados
- [ ] **Chat en vivo** - Opción para conectar con humano
- [ ] **Multilenguaje** - Detección automática del idioma
- [ ] **Voice input** - Hablar con el chatbot
- [ ] **Horario inteligente** - Diferentes respuestas según hora/día

### Integraciones Sugeridas

- **Zapier** - Automatización con 5000+ apps
- **HubSpot** - CRM y marketing automation
- **Calendly** - Agendar citas automáticamente
- **Slack** - Notificaciones al equipo
- **Google Sheets** - Registro de conversaciones
- **Twilio** - Enviar SMS de seguimiento

## 💡 Mejores Prácticas

### Para obtener mejores resultados:

1. **Responde rápido** - Los usuarios esperan respuestas en < 2 segundos
2. **Sé conversacional** - Usa emojis y lenguaje natural
3. **Ofrece opciones** - Da al usuario caminos claros a seguir
4. **Captura leads** - Pide email/teléfono antes de información detallada
5. **Deriva cuando necesario** - Si el bot no puede ayudar, ofrece contacto humano
6. **Actualiza regularmente** - Agrega nuevas preguntas frecuentes
7. **Monitorea conversaciones** - Aprende qué preguntan los usuarios

### Contenido de las Respuestas

✅ **HACER:**
- Respuestas cortas (2-4 líneas)
- Incluir llamados a la acción (CTAs)
- Usar formato (negritas, listas)
- Agregar links relevantes
- Emojis con moderación

❌ **EVITAR:**
- Respuestas muy largas
- Jerga técnica excesiva
- Promesas que no puedes cumplir
- Información desactualizada
- Errores gramaticales

## 📞 Soporte

### ¿Necesitas ayuda con el chatbot?

**Documentación adicional:**
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

**Contacto del desarrollador:**
- Email: info@webdevpr.com
- Tel: +1 (787) 555-0123

## 📄 Licencia

Este chatbot fue desarrollado para webDevPR. Todos los derechos reservados.

---

## 🎉 ¡Listo para usar!

El chatbot está activo y funcionando en tu sitio. Los visitantes pueden:
- ✅ Hacer preguntas sobre servicios
- ✅ Obtener información de precios
- ✅ Agendar consultas
- ✅ Contactar al equipo

**¡Disfruta de tu nuevo asistente virtual!** 🤖✨

