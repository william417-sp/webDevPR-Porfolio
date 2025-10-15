# 🔐 Panel de Administración - Chatbot webDevPR

## 📋 Descripción

Panel de control completo para gestionar y monitorear el chatbot de webDevPR. Visualiza estadísticas, analiza conversaciones y configura el comportamiento del chatbot.

---

## 🚀 Acceso al Panel

### Credenciales por Defecto
```
Usuario: admin
Contraseña: admin123
```

### Formas de Acceder
1. **Desde la página web**: Busca el icono de escudo (🛡️) en el footer
2. **URL directa**: Abre `admin-chatbot.html` en tu navegador
3. **Desde PRUEBA.html**: Haz clic en el botón "Abrir Panel Admin"

---

## 🎯 Características

### 1. 📊 Dashboard de Estadísticas
Visualiza métricas en tiempo real:
- **Total de Mensajes**: Cantidad total de interacciones
- **Mensajes de Usuarios**: Consultas recibidas
- **Respuestas del Bot**: Respuestas enviadas
- **Sesiones Hoy**: Sesiones activas del día

### 2. 💬 Historial de Conversaciones
- Ver todas las conversaciones guardadas
- Fecha y hora de cada mensaje
- Distinción visual entre usuario y bot
- Opción de limpiar historial

### 3. 📈 Análisis de Datos
- **Top 10 palabras clave** más frecuentes
- Análisis de tendencias en consultas
- Identificación de temas más buscados
- Datos útiles para mejorar respuestas

### 4. ⚙️ Configuración
- **Exportar datos**: Descarga todas las conversaciones en JSON
- **Borrar datos**: Limpia el historial completo
- **Configuración de almacenamiento**: Activa/desactiva guardado

---

## 💾 Almacenamiento de Datos

### LocalStorage
El panel utiliza `localStorage` del navegador para guardar:

```javascript
// Conversaciones
chatbot_conversations = [
  {
    message: "texto del mensaje",
    sender: "user" | "bot",
    timestamp: "2025-10-03T...",
    date: "10/3/2025",
    time: "2:30 PM"
  }
]

// Estadísticas
chatbot_stats = {
  totalMessages: 0,
  userMessages: 0,
  botMessages: 0,
  sessionsToday: 0,
  lastUpdate: "10/3/2025"
}
```

### Límites
- Máximo **100 conversaciones** guardadas
- Se eliminan las más antiguas automáticamente
- Los datos persisten entre sesiones

---

## 🔧 Configuración Avanzada

### Cambiar Credenciales de Login

Edita el archivo `admin-chatbot.html` en la línea donde se verifica el login:

```javascript
// Busca esta sección (línea ~235):
if (username === 'admin' && password === 'admin123') {
    // Cambia 'admin' y 'admin123' por tus valores
}
```

### Aumentar Límite de Conversaciones

En el archivo `js/ai-chatbot.js`, busca:

```javascript
// Mantener solo las últimas 100 conversaciones
if (conversations.length > 100) {
    conversations = conversations.slice(-100);
}
```

Cambia `100` por el número que desees.

---

## 📥 Exportar Datos

### Formato de Exportación
El botón "Exportar Datos" genera un archivo JSON:

```json
{
  "conversations": [...],
  "stats": {...},
  "exportDate": "2025-10-03T..."
}
```

### Usos del Archivo Exportado
- Análisis en Excel/Google Sheets
- Backup de conversaciones
- Entrenamiento de modelos de IA
- Reportes para clientes

---

## 🛡️ Seguridad

### Mejores Prácticas

1. **Cambiar las credenciales por defecto**
   - No uses `admin/admin123` en producción
   
2. **Implementar Backend para Producción**
   ```javascript
   // Actualmente usa localStorage (solo frontend)
   // Para producción, conecta a una base de datos:
   fetch('/api/save-conversation', {
       method: 'POST',
       body: JSON.stringify(conversation)
   });
   ```

3. **Proteger el acceso al archivo**
   - Usa autenticación real (JWT, OAuth)
   - Implementa rate limiting
   - Añade logs de acceso

4. **Encriptar datos sensibles**
   ```javascript
   // Ejemplo de encriptación básica
   const encrypted = btoa(JSON.stringify(data));
   localStorage.setItem('data', encrypted);
   ```

---

## 🐛 Troubleshooting

### No aparecen estadísticas
**Solución**: Usa el chatbot primero para generar datos.

### "No hay conversaciones registradas"
**Solución**: Las conversaciones solo se guardan después de interactuar con el chatbot.

### No puedo acceder al panel
**Solución**: 
1. Verifica que `admin-chatbot.html` está en la raíz del proyecto
2. Comprueba la ruta en el enlace del footer
3. Usa las credenciales correctas: `admin / admin123`

### Los datos desaparecen
**Solución**: 
- LocalStorage se borra al limpiar datos del navegador
- Exporta los datos regularmente como backup
- Considera implementar almacenamiento en backend

### Error "localStorage no disponible"
**Solución**: 
- Algunos navegadores bloquean localStorage en modo incógnito
- Verifica la configuración de privacidad del navegador

---

## 🎨 Personalización

### Cambiar Colores

Edita los estilos en `admin-chatbot.html`:

```css
/* Busca estas secciones y personaliza: */
.stat-card .icon.blue { background: #e3f2fd; color: #1976d2; }
.btn-login { background: linear-gradient(...); }
```

### Agregar Nuevas Estadísticas

En la función `loadStats()`:

```javascript
function loadStats() {
    // Agrega tus propias métricas
    const avgResponseTime = calculateAverage();
    document.getElementById('new-stat').textContent = avgResponseTime;
}
```

### Añadir Gráficas

Integra Chart.js o similar:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    new Chart(ctx, {
        type: 'line',
        data: conversationData
    });
</script>
```

---

## 📱 Responsive Design

El panel está optimizado para:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px+)
- ✅ Tablet (768px+)
- ✅ Mobile (375px+)

---

## 🚀 Próximas Mejoras

- [ ] Gráficas interactivas con Chart.js
- [ ] Filtros por fecha en conversaciones
- [ ] Exportar a PDF/Excel
- [ ] Notificaciones en tiempo real
- [ ] Multi-idioma
- [ ] Roles de usuario (Admin, Viewer, Editor)
- [ ] Integración con Google Analytics
- [ ] API REST para integración con otros sistemas

---

## 📞 Soporte

¿Problemas con el panel? Contacta:
- 📧 Email: info@webdevpr.com
- 📱 Teléfono: (787) 123-4567
- 💬 Chatbot en el sitio web

---

## 📄 Licencia

© 2025 webDevPR. Todos los derechos reservados.

