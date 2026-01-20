# 🚀 Configuración de Ollama Local con Llama 3.2 para el Chatbot

## ✅ El chatbot ya está configurado para usar Ollama local con Llama 3.2

El código ya está listo. Solo necesitas asegurarte de que Ollama esté corriendo y que tengas el modelo instalado.

## 📝 Pasos para Configurar Ollama

### **Paso 1: Verificar que Ollama esté corriendo**

1. **Inicia Ollama** en tu terminal:
```bash
ollama serve
```

2. **Verifica que esté corriendo** en: http://localhost:11434
   - Deberías ver algo como: `Ollama is running`

### **Paso 2: Instalar el modelo Llama 3.2**

1. **Instala Llama 3.2**:
```bash
ollama pull llama3.2
```

   **Alternativas:**
   - Llama 3.1: `ollama pull llama3.1`
   - Llama 3: `ollama pull llama3`

2. **Verifica que el modelo esté instalado**:
```bash
ollama list
```

   Deberías ver `llama3.2` en la lista.

### **Paso 3: Configurar el Chatbot**

1. **Abre el archivo**: `js/ai-chatbot.js`
2. **Busca esta sección** (al inicio del archivo, línea ~17):

```javascript
const OLLAMA_CONFIG = {
    enabled: true, // Ya está habilitado por defecto
    endpoint: 'http://localhost:11434/api/chat',
    model: 'llama3.2', // ⬅️ Asegúrate de que coincida con tu modelo instalado
    ...
};
```

3. **Ajusta el nombre del modelo** si es necesario:
   - Si instalaste `llama3.2` → usa `'llama3.2'`
   - Si instalaste `llama3.1` → cambia a `'llama3.1'`
   - Si instalaste `llama3` → cambia a `'llama3'`

**Ejemplo:**
```javascript
const OLLAMA_CONFIG = {
    enabled: true, // ✅ Habilitado
    endpoint: 'http://localhost:11434/api/chat', // ✅ API local
    model: 'llama3.2', // ✅ Nombre exacto de tu modelo
    temperature: 0.7,
    num_predict: 500
};
```

### **Paso 4: Probar el Chatbot**

1. **Asegúrate de que Ollama esté corriendo**:
```bash
ollama serve
```

2. **Abre tu página web** en el navegador
3. **Abre el chatbot** y haz una pregunta de prueba
4. **Verifica en la consola del navegador** (F12) que no haya errores

## 🎯 Modelos Disponibles en Ollama

### **Llama 3.2 (Recomendado)**
```bash
ollama pull llama3.2
```
- **Tamaño**: ~2.2GB (8B) o ~12GB (90B)
- **Mejor calidad** y más reciente

### **Llama 3.1 (Alternativa)**
```bash
ollama pull llama3.1
```
- **Tamaño**: ~4.7GB (8B)
- Buen balance entre velocidad y calidad

### **Llama 3 (Económico)**
```bash
ollama pull llama3
```
- **Tamaño**: ~4.7GB (8B)
- Más rápido, menos recursos

## 💡 Ventajas de Ollama Local

✅ **100% Privado**: No envía datos a servidores externos
✅ **Sin costos**: Gratis, sin límites de uso
✅ **Rápido**: Sin latencia de red
✅ **Sin dependencia de internet**: Funciona offline
✅ **Control total**: Configuración completa local

## 🛠️ Troubleshooting

### **El chatbot no responde con IA**
- ✅ Verifica que `enabled: true`
- ✅ Verifica que Ollama esté corriendo: `ollama serve`
- ✅ Verifica que tengas el modelo instalado: `ollama list`
- ✅ Abre la consola del navegador (F12) y revisa errores
- ✅ Verifica que el nombre del modelo coincida exactamente

### **Error: Failed to fetch**
- Ollama no está corriendo o no es accesible
- Ejecuta: `ollama serve`
- Verifica en el navegador: http://localhost:11434

### **Error: model not found**
- El modelo no está instalado
- Instala el modelo: `ollama pull llama3.2`
- Verifica el nombre exacto: `ollama list`

### **Error CORS (Cross-Origin)**
Si usas `localhost` desde un archivo HTML local (`file://`), puede haber problemas de CORS.

**Soluciones:**
1. **Usa un servidor local**:
```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

2. **O usa el protocolo `http://localhost`** en lugar de `file://`

### **El chatbot usa respuestas predefinidas**
- Esto es normal si Ollama no está disponible o hay un error
- El sistema usa fallback automáticamente
- Verifica tu configuración y que Ollama esté corriendo

## 📊 Comandos Útiles de Ollama

```bash
# Iniciar Ollama
ollama serve

# Ver modelos instalados
ollama list

# Instalar un modelo
ollama pull llama3.2

# Ejecutar un modelo directamente (prueba)
ollama run llama3.2

# Ver información de un modelo
ollama show llama3.2

# Eliminar un modelo
ollama rm llama3.2
```

## ✨ Características

- ✅ **Fallback automático**: Si Ollama falla, usa respuestas predefinidas
- ✅ **System prompt personalizado**: Configurado para webDevPR
- ✅ **Respuestas en español**: Optimizado para tu mercado
- ✅ **Información de la empresa**: El bot conoce tus servicios y precios
- ✅ **100% local y privado**: Sin envío de datos a terceros

## 🎯 Próximos Pasos

Una vez configurado, el chatbot:
- Responderá con **Llama 3.2 local** para conversaciones más naturales
- Será **más rápido** al estar en local
- Será **100% privado** (sin enviar datos a la nube)
- Mantendrá las respuestas predefinidas como **fallback** seguro
- Será más inteligente y flexible con preguntas variadas

¡Listo! Tu chatbot ahora usa Llama 3.2 con Ollama local. 🚀

## 🔒 Nota de Seguridad

Si vas a usar esto en producción en un servidor, considera:
- ✅ Usar HTTPS
- ✅ Implementar rate limiting
- ✅ Validar inputs del usuario
- ✅ Usar un backend proxy para mayor seguridad

