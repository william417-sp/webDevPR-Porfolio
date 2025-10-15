# 🔧 Solución de Problemas - Chatbot AI

## El chatbot no aparece cuando hago clic

### ✅ Soluciones Aplicadas

He actualizado el chatbot con las siguientes mejoras:

1. **CSS Inline**: Ahora el chatbot no depende de clases de Tailwind compiladas
2. **Display forzado**: Usa `style.display` para asegurar visibilidad
3. **Logs de depuración**: Mensajes en consola para identificar problemas
4. **Página de prueba**: `test-chatbot.html` para diagnosticar

### 📋 Pasos para Verificar

#### 1. Abre la página de prueba

```
test-chatbot.html
```

Esta página te mostrará:
- ✅ Si el archivo del chatbot se cargó
- ✅ Si el chatbot se inicializó correctamente
- ✅ Si el botón está visible en el DOM

#### 2. Abre la Consola del Navegador

**Windows:** Presiona `F12` o `Ctrl + Shift + I`
**Mac:** Presiona `Cmd + Option + I`

Busca estos mensajes:

```
🚀 DOM loaded, initializing chatbot...
🤖 Initializing AI Chatbot...
📝 Config: {...}
✅ Chat widget created
✅ Event listeners attached
✅ AI Chatbot initialized successfully!
🎉 Chatbot ready! Click the floating button to start chatting.
```

Si ves todos estos mensajes, el chatbot está funcionando.

#### 3. Busca el Botón

El botón debe aparecer en la **esquina inferior derecha** de la pantalla:
- Color: Morado/Púrpura (degradado)
- Forma: Circular
- Icono: Robot 🤖
- Tamaño: 64x64 px

#### 4. Haz Clic en el Botón

Cuando hagas clic, deberías ver en la consola:

```
🖱️ Chat toggle button clicked
🤖 Toggling chat. isOpen: true
✅ Opening chat window
```

Si ves estos mensajes pero la ventana no aparece, continúa con los siguientes pasos.

### 🔍 Diagnóstico Paso a Paso

#### Problema 1: El botón no aparece

**Verifica:**

1. ¿El archivo `js/ai-chatbot.js` existe?
   ```
   Abre: js/ai-chatbot.js en tu editor
   ```

2. ¿El script está incluido en tu página?
   ```html
   <!-- Debe estar antes de </body> -->
   <script src="../js/ai-chatbot.js"></script>
   ```

3. ¿Hay errores en la consola?
   ```
   Presiona F12 > Console
   Busca mensajes en rojo
   ```

**Solución:**
```html
<!-- Asegúrate de incluir Font Awesome para los iconos -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

<!-- Incluye el chatbot antes de </body> -->
<script src="../js/ai-chatbot.js"></script>
```

#### Problema 2: El botón aparece pero no pasa nada al hacer clic

**En la consola, ejecuta:**

```javascript
// Verificar si el chatbot está inicializado
console.log(window.webDevPRChatbot);

// Intentar abrir manualmente
window.webDevPRChatbot.toggleChat();
```

Si la ventana se abre con este comando, el problema es con el event listener.

**Solución:**
Refresca la página con `Ctrl + F5` (forzar recarga)

#### Problema 3: La ventana aparece pero se ve mal o cortada

**Verifica el z-index:**

En la consola, ejecuta:
```javascript
const widget = document.getElementById('ai-chat-widget');
console.log(window.getComputedStyle(widget).zIndex);
// Debe ser: 9999
```

**Verifica conflictos de CSS:**
```javascript
const chatWindow = document.getElementById('ai-chat-window');
console.log(window.getComputedStyle(chatWindow).display);
// Cuando está abierto debe ser: 'flex'
```

**Solución:**
El chatbot ahora usa estilos inline que tienen prioridad sobre otros CSS.

#### Problema 4: La ventana aparece brevemente y desaparece

**Causa probable:** Otro JavaScript está interfiriendo

**Verifica:**
```javascript
// En la consola después de hacer clic
const chatWindow = document.getElementById('ai-chat-window');
console.log(chatWindow.classList);
console.log(chatWindow.style.display);
```

**Solución:**
Agrega `!important` a los estilos:
```javascript
// En la consola
document.getElementById('ai-chat-window').style.display = 'flex !important';
```

Si esto funciona, hay un conflicto de CSS que debemos resolver.

### 🛠️ Soluciones Rápidas

#### Solución 1: Forzar Apertura Manual

Abre la consola y ejecuta:
```javascript
const chatWindow = document.getElementById('ai-chat-window');
chatWindow.classList.remove('hidden');
chatWindow.style.display = 'flex';
```

#### Solución 2: Reinicializar Chatbot

```javascript
// Eliminar chatbot existente
document.getElementById('ai-chat-widget')?.remove();

// Crear uno nuevo
window.webDevPRChatbot = new AIChatbot({
    businessName: 'webDevPR',
    language: 'es',
    useAI: false  // Sin API por ahora, para probar
});
```

#### Solución 3: Verificar Ruta del Script

Si estás en una página dentro de `pages/`, la ruta debe ser:
```html
<script src="../js/ai-chatbot.js"></script>
```

Si estás en la raíz del sitio:
```html
<script src="js/ai-chatbot.js"></script>
```

### 📱 Problemas en Móvil

#### La ventana del chat no se ve bien en móvil

**Verifica el viewport:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

**El chatbot ahora tiene estilos responsive:**
- En pantallas pequeñas, ocupa casi todo el ancho
- Se ajusta automáticamente

#### El botón está muy cerca del borde en móvil

**Ajusta la posición:**

En `js/ai-chatbot.js`, busca:
```javascript
style="position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9999;"
```

Cambia a:
```javascript
style="position: fixed; bottom: 1rem; right: 1rem; z-index: 9999;"
```

### 🐛 Errores Comunes

#### Error: "Cannot read property 'classList' of null"

**Causa:** El elemento no existe en el DOM

**Solución:**
```javascript
// Verifica que el elemento existe antes de usarlo
const chatWindow = document.getElementById('ai-chat-window');
if (chatWindow) {
    chatWindow.classList.remove('hidden');
}
```

#### Error: "Font Awesome icons not showing"

**Causa:** Font Awesome no está cargado

**Solución:**
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
```

#### Error: "API key invalid"

**Causa:** La API key de OpenAI no es correcta

**Solución temporal (probar sin IA):**

En `js/ai-chatbot.js`, al final del archivo, cambia:
```javascript
useAI: false  // Desactiva IA temporalmente
```

Esto usará respuestas predefinidas inteligentes mientras resuelves el problema de la API.

### 📊 Herramienta de Diagnóstico

Copia y pega esto en la consola para un diagnóstico completo:

```javascript
console.log('=== DIAGNÓSTICO DEL CHATBOT ===');

// 1. Verificar clase
console.log('1. Clase AIChatbot:', typeof AIChatbot !== 'undefined' ? '✅' : '❌');

// 2. Verificar instancia
console.log('2. Instancia:', window.webDevPRChatbot ? '✅' : '❌');

// 3. Verificar widget
const widget = document.getElementById('ai-chat-widget');
console.log('3. Widget existe:', widget ? '✅' : '❌');

// 4. Verificar botón
const toggleBtn = document.getElementById('ai-chat-toggle');
console.log('4. Botón existe:', toggleBtn ? '✅' : '❌');

// 5. Verificar ventana
const chatWindow = document.getElementById('ai-chat-window');
console.log('5. Ventana existe:', chatWindow ? '✅' : '❌');

if (chatWindow) {
    console.log('   - Display:', window.getComputedStyle(chatWindow).display);
    console.log('   - Z-index:', window.getComputedStyle(chatWindow).zIndex);
    console.log('   - Clases:', chatWindow.className);
}

// 6. Verificar estilos
const styles = document.getElementById('ai-chatbot-styles');
console.log('6. Estilos cargados:', styles ? '✅' : '❌');

// 7. Verificar Font Awesome
const fa = document.querySelector('link[href*="font-awesome"]');
console.log('7. Font Awesome:', fa ? '✅' : '❌');

console.log('=== FIN DIAGNÓSTICO ===');
```

### 📞 Soporte Adicional

Si ninguna solución funciona:

1. **Envía el output del diagnóstico** (código de arriba)
2. **Incluye errores de la consola** (screenshot o texto)
3. **Indica qué navegador usas** (Chrome, Firefox, Safari, etc.)
4. **Indica si estás en móvil o desktop**

### ✅ Lista de Verificación Final

Antes de reportar un problema, verifica:

- [ ] El archivo `js/ai-chatbot.js` existe
- [ ] El script está incluido en la página
- [ ] Font Awesome está cargado
- [ ] No hay errores en la consola
- [ ] Has refrescado la página con Ctrl+F5
- [ ] Has probado en `test-chatbot.html`
- [ ] Has ejecutado el diagnóstico de arriba

---

**¿Aún tienes problemas?** Abre `test-chatbot.html` y envíame los mensajes de la consola.

