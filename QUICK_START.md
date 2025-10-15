# 🚀 Inicio Rápido - Chatbot AI webDevPR

## ✅ ¡El chatbot ya está configurado y funcionando!

Tu chatbot AI ahora está activo con respuestas reales de OpenAI GPT-3.5-turbo.

## 🎯 Pruébalo Ahora

### Opción 1: Página de Demo
Abre en tu navegador:
```
chatbot-demo.html
```

### Opción 2: Cualquier página del sitio
Abre cualquiera de estas páginas:
- `pages/homepage.html`
- `pages/contact_consultation.html`
- `pages/services_hub.html`
- O cualquier otra página

Busca el **botón circular flotante con icono de robot** en la esquina inferior derecha.

## 💬 Preguntas para Probar

Escribe estas preguntas en el chat:

1. "Hola, ¿qué servicios ofrecen?"
2. "¿Cuánto cuesta desarrollar una tienda online?"
3. "Necesito una app móvil para mi negocio"
4. "¿Cuánto tiempo toma hacer un sitio web?"
5. "Quiero agendar una consulta gratuita"
6. "¿Dónde están ubicados?"
7. "¿Ofrecen mantenimiento?"
8. "¿Trabajan con clientes fuera de Puerto Rico?"

## 🎨 Botones de Acción Rápida

El chatbot incluye 3 botones para acceso rápido:
- 🚀 **Servicios** - Información sobre los servicios
- 💰 **Precios** - Rangos de precios
- 📅 **Consulta** - Agendar consulta gratuita

## ⚠️ IMPORTANTE: Seguridad de tu API Key

**DEBES HACER ESTO AHORA:**

### 1. Regenera tu API Key (Urgente)
Como compartiste tu API key en el chat, es importante regenerarla:

1. Ve a https://platform.openai.com/api-keys
2. Encuentra y elimina la key actual
3. Crea una nueva API key
4. Actualiza el archivo `js/ai-chatbot.js` con la nueva key

### 2. Lee la Guía de Seguridad
Abre y lee:
```
SECURITY_GUIDE.md
```

Esta guía incluye:
- Cómo proteger tu API key
- Configuración de límites de gasto
- Implementación de backend proxy para producción
- Monitoreo de costos
- Qué hacer si tu key fue comprometida

### 3. Configura Límites de Gasto

**Protégete de costos inesperados:**

1. Ve a https://platform.openai.com/account/limits
2. Establece un límite mensual (recomendado: $10-$20 para empezar)
3. Activa alertas por email

**Costos estimados:**
- Una conversación típica: ~$0.0003 (menos de 1 centavo)
- 100 conversaciones: ~$0.03
- 1000 conversaciones: ~$0.30

## 🔧 Configuración Actual

Tu chatbot está configurado con:
- ✅ OpenAI GPT-3.5-turbo (rápido y económico)
- ✅ Respuestas en español
- ✅ Contexto sobre webDevPR y servicios
- ✅ Fallback a respuestas predefinidas si la API falla
- ✅ Interfaz moderna y responsive

## 📝 Próximos Pasos Recomendados

### Para Desarrollo Local (Ahora)
1. ✅ Prueba el chatbot en todas las páginas
2. ✅ Verifica que las respuestas sean apropiadas
3. ✅ Ajusta el `systemPrompt` si necesario (ver más abajo)
4. ⚠️ Regenera tu API key por seguridad

### Para Producción (Antes de Lanzar)
1. 🔒 Implementa un backend proxy (ver `SECURITY_GUIDE.md`)
2. 🔒 Nunca subas archivos con API keys a GitHub
3. 📊 Configura monitoreo de uso
4. ⚡ Implementa rate limiting
5. 🧪 Prueba exhaustivamente

## 🎨 Personalización Rápida

### Cambiar el Mensaje de Bienvenida

En `js/ai-chatbot.js`, busca el método `sendWelcomeMessage()`:

```javascript
sendWelcomeMessage() {
    setTimeout(() => {
        this.addMessage(`¡Hola! 👋 Soy el asistente virtual de webDevPR.

Tu mensaje personalizado aquí...

¿En qué puedo ayudarte hoy?`, 'bot', true);
    }, 500);
}
```

### Modificar el Comportamiento de la IA

En `js/ai-chatbot.js`, busca `systemPrompt` en el método `getOpenAIResponse()`:

```javascript
const systemPrompt = `Eres un asistente virtual profesional para webDevPR...

INSTRUCCIONES:
1. Agrega tus instrucciones personalizadas aquí
2. Define el tono que quieres (formal, casual, técnico)
3. Especifica qué información priorizar
`;
```

### Cambiar Botones de Acción Rápida

En `js/ai-chatbot.js`, busca `createChatWidget()` y modifica:

```javascript
<button class="quick-action-btn ..." data-action="tu-nueva-accion">
    🎯 Tu Botón
</button>
```

Luego agrega el handler en `handleQuickAction()`:

```javascript
const messages = {
    'tu-nueva-accion': 'Tu pregunta predefinida aquí'
};
```

## 📊 Monitoreo de Uso

### Ver Uso en OpenAI Dashboard

1. Ve a https://platform.openai.com/usage
2. Revisa:
   - Requests por día
   - Tokens usados
   - Costo diario/mensual

### Ver Conversaciones en tu Sitio

Abre las Developer Tools del navegador (F12):
1. Ve a la pestaña "Console"
2. Busca logs del chatbot
3. Verás todas las conversaciones

## 🆘 Solución de Problemas

### El chatbot no responde
1. Abre la consola (F12)
2. Busca errores en rojo
3. Verifica tu API key
4. Asegúrate de tener créditos en OpenAI

### Respuestas muy lentas
- GPT-3.5-turbo debería responder en 1-3 segundos
- Si es más lento, puede ser tu conexión
- Verifica el status de OpenAI: https://status.openai.com/

### Error "API key invalid"
- Regenera tu API key
- Asegúrate de copiarla completa
- Verifica que no tenga espacios extra

### Costos muy altos
1. Verifica uso inusual en el dashboard
2. Implementa rate limiting
3. Reduce `max_tokens` en la configuración
4. Considera usar caché para preguntas frecuentes

## 📚 Documentación Completa

- 📖 **AI_CHATBOT_README.md** - Guía completa del chatbot
- 🔒 **SECURITY_GUIDE.md** - Seguridad y mejores prácticas
- ⚙️ **js/ai-chatbot-config.example.js** - Ejemplo de configuración segura

## 🎉 ¡Listo para Usar!

Tu chatbot AI está funcionando con inteligencia artificial real. Ahora tu sitio tiene:

- ✅ Atención al cliente 24/7
- ✅ Respuestas inteligentes y contextuales
- ✅ Captura de leads automática
- ✅ Mejor experiencia de usuario
- ✅ Reducción de carga de trabajo manual

## 💡 Tips Adicionales

1. **Monitorea las conversaciones** - Aprende qué preguntan los usuarios
2. **Actualiza el systemPrompt** - Mejora las respuestas con el tiempo
3. **Prueba regularmente** - Asegúrate de que funciona bien
4. **Ten un plan B** - El chatbot cae a respuestas predefinidas si la API falla
5. **Actualiza info** - Mantén precios y servicios actualizados

## 📞 Soporte

Si necesitas ayuda:
- 📧 Email: info@webdevpr.com
- 📱 Tel: +1 (787) 555-0123
- 🌐 [OpenAI Help Center](https://help.openai.com/)

---

**¡Disfruta de tu nuevo asistente virtual con IA! 🤖✨**

