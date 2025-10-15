# 🌓 Guía de Temas Dark/Light Mode

## 🎨 Sistema de Temas Implementado

El panel de administración ahora cuenta con un sistema completo de temas claro y oscuro con:

✅ **Toggle elegante** en el header  
✅ **Tema también en login screen**  
✅ **Detección automática** del tema del sistema  
✅ **Persistencia** de preferencia (localStorage)  
✅ **Transiciones suaves** entre temas  
✅ **Iconos animados** (☀️ / 🌙)  

---

## 🎯 Cómo Usar

### Método 1: Toggle en el Header

Una vez dentro del panel:

```
┌────────────────────────────────────────┐
│ Dashboard    [☀️ ◯──────○ 🌙] 👤 Salir │
└────────────────────────────────────────┘
              ↑
         Click aquí
```

1. Busca el toggle en la esquina superior derecha
2. Click en cualquier parte del toggle
3. ¡El tema cambia instantáneamente!

### Método 2: Desde Login Screen

Antes de iniciar sesión:

```
┌─────────────────────────┐
│  🛡️           [🌙]      │
│                         │
│    Panel Admin          │
│    Usuario: ___         │
└─────────────────────────┘
              ↑
         Click aquí
```

---

## 🎨 Características del Sistema

### 🌞 **Light Mode (Modo Claro)**
- Fondo blanco/gris claro
- Texto oscuro
- Alto contraste para lectura diurna
- Ideal para ambientes bien iluminados

**Paleta de Colores**:
- Background: `#f5f7fa`
- Cards: `#ffffff`
- Text: `#333333`
- Borders: `#e1e4e8`

### 🌙 **Dark Mode (Modo Oscuro)**
- Fondo oscuro azul profundo
- Texto claro
- Reduce fatiga visual en la noche
- Ideal para ambientes con poca luz

**Paleta de Colores**:
- Background: `#1a1a2e`
- Cards: `#16213e`
- Text: `#e2e8f0`
- Borders: `#2d3748`
- Sidebar: Gradiente `#16213e` → `#0f3460`

---

## 🔄 Comportamiento del Toggle

### Estados del Toggle

**Light Mode** (Posición Izquierda):
```
☀️ ◯──────○ 🌙
   ↑
 Activo
```

**Dark Mode** (Posición Derecha):
```
☀️ ○──────◯ 🌙
           ↑
        Activo
```

### Transiciones

Todos los elementos cambian suavemente:
- Backgrounds
- Colores de texto
- Bordes
- Sombras

**Duración**: 0.3 segundos

---

## 💾 Persistencia de Preferencia

### Guardado Automático

Tu preferencia se guarda en `localStorage`:
```javascript
localStorage.setItem('admin_theme', 'dark'); // o 'light'
```

### Al Recargar la Página

1. El sistema verifica tu última preferencia
2. Si no hay preferencia guardada, usa la del sistema
3. Aplica el tema inmediatamente (sin parpadeo)

---

## 🔍 Detección del Sistema

### Preferencia del Sistema Operativo

Si nunca has seleccionado un tema manualmente, el panel detecta automáticamente:

**Windows 10/11**:
- Configuración → Personalización → Colores → "Elige tu modo"

**macOS**:
- Preferencias del Sistema → General → Apariencia

**Linux**:
- Depende de tu entorno de escritorio

### Cambio Automático

Si cambias el tema de tu sistema operativo, el panel se actualiza automáticamente (solo si no has establecido una preferencia manual).

---

## 🎯 Elementos Temáticos

### Login Screen
- ✅ Fondo del contenedor
- ✅ Campos de input
- ✅ Labels
- ✅ Hints
- ✅ Toggle propio

### Dashboard
- ✅ Sidebar con gradiente
- ✅ Header completo
- ✅ Tarjetas de estadísticas
- ✅ Tablas
- ✅ Formularios
- ✅ Botones
- ✅ Inputs y selects
- ✅ Estados hover
- ✅ Gráficas (Chart.js)

### Notificaciones
Las notificaciones mantienen sus colores distintivos en ambos temas:
- ✅ Success: Verde
- ❌ Error: Rojo
- ℹ️ Info: Azul
- ⚠️ Warning: Naranja

---

## 🔧 Personalización Avanzada

### Cambiar Colores del Dark Mode

Edita los estilos en `admin-panel.html`:

```css
/* Dark Mode Styles */
body.dark-mode {
    background: #TU_COLOR_AQUI;
}

body.dark-mode .sidebar {
    background: linear-gradient(180deg, #COLOR1 0%, #COLOR2 100%);
}

body.dark-mode .card {
    background: #TU_COLOR_DE_TARJETAS;
}
```

### Colores Sugeridos

**Dark Blue Theme** (actual):
- `#1a1a2e`, `#16213e`, `#0f3460`

**Dark Gray Theme**:
- `#1a1a1a`, `#2d2d2d`, `#3a3a3a`

**Dark Purple Theme**:
- `#1e1b2e`, `#2d1b4e`, `#3d2a5e`

**Amoled Black Theme**:
- `#000000`, `#0a0a0a`, `#1a1a1a`

---

## 📊 Compatibilidad con Gráficas

Las gráficas de Chart.js se adaptan automáticamente:

### Light Mode
- Fondo blanco
- Colores vibrantes
- Grid gris claro

### Dark Mode
- Fondo oscuro
- Colores ajustados para contraste
- Grid gris oscuro

---

## 🎪 Showcase de Componentes

### Tablas
| Light Mode | Dark Mode |
|------------|-----------|
| Fondo blanco | Fondo `#16213e` |
| Headers gris claro | Headers `#2d3748` |
| Hover gris | Hover `#2d3748` |

### Formularios
| Elemento | Light | Dark |
|----------|-------|------|
| Input | Blanco | `#2d3748` |
| Border | `#e1e4e8` | `#4a5568` |
| Text | Negro | `#e2e8f0` |
| Focus | Borde azul | Borde azul |

### Botones
| Tipo | Light | Dark |
|------|-------|------|
| Primary | Gradiente morado | Gradiente morado |
| Secondary | Gris claro | `#2d3748` |
| Danger | Rojo | Rojo |

---

## 🐛 Troubleshooting

### El tema no se guarda
**Problema**: El tema vuelve al original al recargar  
**Solución**: Verifica que localStorage esté habilitado en tu navegador

### El toggle no aparece
**Problema**: No ves el switch en el header  
**Solución**: 
1. Verifica que has iniciado sesión
2. El toggle está en la esquina superior derecha
3. Refresca la página (Ctrl+F5)

### Los colores se ven mal
**Problema**: Algunos textos no se leen bien  
**Solución**: Esto puede deberse a extensiones del navegador (dark mode forzado). Desactívalas para el admin panel.

### El tema cambia solo
**Problema**: El tema cambia sin que hagas nada  
**Solución**: Esto ocurre si cambias el tema de tu sistema y no has establecido una preferencia manual. Usa el toggle una vez para fijar tu preferencia.

---

## 💡 Consejos de Uso

### 🌞 Usa Light Mode cuando:
- Trabajas durante el día
- Hay buena iluminación
- Necesitas máximo contraste
- Compartes pantalla

### 🌙 Usa Dark Mode cuando:
- Trabajas de noche
- Ambiente con poca luz
- Sesiones largas de trabajo
- Quieres reducir fatiga visual

---

## 🎓 Accesibilidad

### Contraste WCAG

Ambos temas cumplen con WCAG 2.1 nivel AA:

**Light Mode**: ✅ Ratio 7:1 (AAA)  
**Dark Mode**: ✅ Ratio 7:1 (AAA)

### Para Usuarios con Sensibilidad Visual

El modo oscuro reduce:
- ✅ Brillo de pantalla
- ✅ Emisión de luz azul
- ✅ Fatiga ocular
- ✅ Molestias en ambientes oscuros

---

## 🚀 Funcionalidades Futuras

Mejoras planeadas:

- [ ] **Auto-programado**: Cambio automático según hora
- [ ] **Múltiples temas**: Tema azul, verde, morado
- [ ] **Temas personalizados**: Editor de colores
- [ ] **Sincronización**: Entre dispositivos (con cuenta)
- [ ] **Contraste alto**: Para accesibilidad
- [ ] **Animaciones opcionales**: Activar/desactivar transiciones

---

## 📱 Responsive

El sistema de temas funciona perfectamente en:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px+)
- ✅ Tablet (768px+)
- ✅ Mobile (375px+)

---

## 🎉 ¡Disfruta tu Panel!

Ahora puedes trabajar cómodamente en el panel de administración sin importar la hora del día o las condiciones de iluminación.

**Tip**: Prueba ambos temas y quédate con el que más te guste. ¡Tu preferencia se guardará automáticamente!

---

**¿Tienes sugerencias para mejorar los temas?** ¡Háznoslo saber! 🎨

© 2025 webDevPR. Todos los derechos reservados.

