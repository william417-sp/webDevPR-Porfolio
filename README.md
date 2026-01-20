# 🚀 webDevPR - Portfolio Website

Portfolio profesional de desarrollo web para webDevPR, una empresa de soluciones tecnológicas en Puerto Rico.

## 📋 Descripción

Sitio web portfolio moderno y responsivo que muestra servicios de desarrollo web, proyectos realizados, y proporciona herramientas interactivas para clientes. El sitio incluye un sistema de autenticación, panel de administración, chatbot con IA, calculadora de servicios, y gestión de cotizaciones.

## ✨ Características Principales

### 🎨 Interfaz de Usuario
- **Diseño Moderno**: Interfaz con efectos glassmorphism y animaciones suaves
- **Responsive Design**: Totalmente adaptado para móviles, tablets y desktop
- **Tema Oscuro/Claro**: Sistema de cambio de tema integrado
- **Navegación Intuitiva**: Menú responsive con animaciones

### 🛠️ Funcionalidades
- **Portfolio Interactivo**: Galería de proyectos con carruseles y casos de estudio
- **Calculadora de Servicios**: Herramienta para calcular precios de servicios web
- **Sistema de Cotizaciones**: Gestión completa de cotizaciones para clientes
- **Chatbot con IA**: Asistente virtual para atención al cliente 24/7
- **Panel de Administración**: Gestión de cotizaciones, proyectos y contenido
- **Portal de Cliente**: Área privada para clientes con proyectos, mensajes y facturas
- **Autenticación de Usuarios**: Sistema de login y registro seguro

### 📱 Páginas Disponibles
- **Inicio** (`index.html`): Página de bienvenida con redirección automática
- **Homepage** (`pages/homepage.html`): Página principal del sitio
- **Servicios** (`pages/services_hub.html`): Catálogo de servicios con calculadora
- **Portfolio** (`pages/portfolio_showcase.html`): Galería de proyectos realizados
- **Nosotros** (`pages/about_us.html`): Información sobre la empresa
- **Contacto** (`pages/contact_consultation.html`): Formulario de contacto y consultas
- **Portal Cliente** (`pages/client_portal.html`): Área privada para clientes
- **Dashboard Cliente** (`pages/client-dashboard.html`): Panel de control del cliente
- **Login/Registro** (`pages/login.html`, `pages/signup.html`): Autenticación
- **Casos de Estudio** (`pages/case-study-salud-total.html`): Detalles de proyectos

### 🔧 Herramientas de Administración
- **Panel de Administración** (`admin-panel.html`): Gestión completa del sitio
- **Panel Chatbot** (`admin-chatbot.html`): Configuración del chatbot

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica moderna
- **Tailwind CSS 3.4**: Framework CSS utility-first
- **JavaScript (Vanilla)**: Sin frameworks, JavaScript puro
- **Font Awesome 6.4**: Iconos vectoriales
- **Google Fonts**: Tipografías Inter y JetBrains Mono

### Herramientas de Desarrollo
- **Node.js**: Entorno de ejecución
- **npm**: Gestor de paquetes
- **Tailwind CSS Plugins**:
  - `@tailwindcss/forms`
  - `@tailwindcss/typography`
  - `@tailwindcss/aspect-ratio`
  - `tailwindcss-animate`
  - `tailwindcss-elevation`
  - `tailwindcss-fluid-type`

### Integraciones
- **Rocket.new**: Herramienta de desarrollo
- **Chart.js**: Gráficos para el panel de administración
- **Bootstrap 5.3**: Para algunos componentes del portfolio

## 📦 Instalación

### Prerrequisitos
- Node.js (v12.x o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd Webporfolio
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Compilar CSS (primera vez)**
   ```bash
   npm run build:css
   ```

4. **Iniciar modo desarrollo (con watch)**
   ```bash
   npm run dev
   ```

## 🚀 Uso

### Desarrollo

Para desarrollo con recarga automática de CSS:

```bash
npm run dev
```

Este comando ejecuta Tailwind CSS en modo watch, recompilando automáticamente cuando detecta cambios en los archivos.

### Producción

Para compilar CSS para producción:

```bash
npm run build:css
```

### Estructura de Archivos

```
Webporfolio/
├── index.html              # Página de entrada (redirige a homepage)
├── admin-panel.html        # Panel de administración
├── admin-chatbot.html      # Configuración del chatbot
├── css/
│   ├── main.css           # CSS compilado (generado)
│   ├── tailwind.css       # Archivo fuente de Tailwind
│   ├── carousel.css       # Estilos para carruseles
│   ├── custom-carousel.css # Estilos personalizados de carrusel
│   ├── quotes-manager.css # Estilos del gestor de cotizaciones
│   └── services-calculator.css # Estilos de la calculadora
├── js/
│   ├── admin-panel.js     # Lógica del panel de administración
│   ├── ai-chatbot.js      # Chatbot con IA
│   ├── auth-manager.js    # Gestión de autenticación
│   ├── auth-service.js    # Servicio de autenticación
│   ├── carousel.js        # Funcionalidad de carruseles
│   ├── files-service.js   # Gestión de archivos
│   ├── invoices-service.js # Gestión de facturas
│   ├── messages-service.js # Gestión de mensajes
│   ├── navbar-responsive.js # Navegación responsive
│   ├── offline-queue.js   # Cola offline
│   ├── projects-service.js # Gestión de proyectos
│   ├── quotes-manager.js  # Gestor de cotizaciones
│   ├── quotes-service.js  # Servicio de cotizaciones
│   ├── services-calculator.js # Calculadora de servicios
│   ├── support-service.js # Servicio de soporte
│   ├── theme-toggle.js    # Cambio de tema
│   └── user-data.js       # Gestión de datos de usuario
├── pages/                 # Páginas del sitio
├── images/                # Imágenes del portfolio
│   ├── Academia Digital PR/
│   ├── BoutiqueLuna/
│   ├── RestauranteElYunque/
│   └── SaludTotal/
├── public/
│   ├── dhws-data-injector.js
│   ├── favicon.ico
│   └── manifest.json
├── package.json
├── package-lock.json
└── tailwind.config.js     # Configuración de Tailwind
```

## 📝 Scripts Disponibles

- `npm run build:css`: Compila el CSS de Tailwind una vez
- `npm run watch:css`: Compila CSS en modo watch (desarrollo)
- `npm run dev`: Alias para `watch:css`

## 🔄 Cambios Recientes

### Limpieza de Archivos Innecesarios (Última Actualización)

Se realizó una limpieza exhaustiva del proyecto eliminando archivos que no son necesarios para el funcionamiento de la página:

#### 📄 Archivos de Documentación Eliminados
- `ADMIN_ACCESS_BUTTON.md`
- `ADMIN_FUNCTIONALITY.md`
- `ADMIN_GUIDE.md`
- `ADMIN_PANEL_README.md`
- `AI_CHATBOT_README.md`
- `DARK_MODE_GUIDE.md`
- `GROQ_SETUP.md`
- `NAVBAR_RESPONSIVE_IMPROVEMENTS.md`
- `OLLAMA_SETUP.md`
- `QUICK_START.md`
- `SECURITY_GUIDE.md`
- `THEME_GUIDE.md`
- `TROUBLESHOOTING.md`
- `USER_ACCOUNTS.md`
- `README.md` (versión genérica anterior)

#### 🗑️ Archivos de Ejemplo Eliminados
- `js/ai-chatbot-config.example.js`

#### 🚫 Archivos JavaScript No Utilizados
- `js/admin-access.js` (no referenciado en ningún HTML)

#### 🖼️ Directorios de Imágenes Duplicados
- `images/Restaurante El Yunque/` (duplicado con archivos .png, se mantiene `RestauranteElYunque/` con .jpg que es el utilizado)

### Resultado
El proyecto ahora contiene solo los archivos esenciales para el funcionamiento de la página, mejorando la organización y reduciendo el tamaño del repositorio.

## 🎯 Funcionalidades Detalladas

### Calculadora de Servicios
Permite a los clientes calcular el precio estimado de servicios web seleccionando:
- Tipo de servicio (Sitio Web, E-commerce, App Móvil, Mantenimiento)
- Características adicionales
- Muestra precio total en tiempo real

### Sistema de Cotizaciones
- Creación de cotizaciones personalizadas
- Gestión desde el panel de administración
- Envío automático a clientes
- Seguimiento de estado

### Chatbot con IA
- Respuestas inteligentes predefinidas
- Opción de integración con APIs de IA
- Personalizable según necesidades del negocio
- Interfaz moderna y responsiva

### Panel de Administración
- Dashboard con estadísticas
- Gestión de cotizaciones
- Gestión de proyectos
- Configuración del sitio
- Exportación de datos

### Portal de Cliente
- Visualización de proyectos asignados
- Mensajes y comunicación
- Facturas y pagos
- Archivos compartidos
- Soporte técnico

## 🔒 Seguridad

- Autenticación de usuarios implementada
- Validación de formularios
- Manejo seguro de datos del cliente
- Protección contra acceso no autorizado al panel de administración

## 🌐 Navegación

El sitio incluye navegación responsive con:
- Menú desktop horizontal
- Menú móvil hamburguesa
- Enlaces a todas las secciones principales
- Botones de autenticación dinámicos

## 📱 Responsive Design

El sitio está completamente optimizado para:
- **Móviles**: 320px - 768px
- **Tablets**: 768px - 1024px
- **Desktop**: 1024px+

## 🎨 Personalización

### Colores
Los colores principales están definidos en `tailwind.config.js`:
- **Primary**: Azul (#1E3A8A)
- **Secondary**: Azul claro (#3B82F6)
- **Accent**: Ámbar (#F59E0B)
- **Success**: Verde esmeralda (#10B981)
- **Error**: Rojo (#EF4444)

### Fuentes
- **Principal**: Inter (sans-serif)
- **Monospace**: JetBrains Mono

## 📞 Soporte

Para más información o soporte, contacta a través de:
- Página de contacto del sitio
- Email: info@webdevpr.com

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles

## 👨‍💻 Autor

**webDevPR**
- Desarrollo web profesional en Puerto Rico
- Soluciones tecnológicas innovadoras

---

**Última actualización**: 2024
**Versión**: 1.0.0

