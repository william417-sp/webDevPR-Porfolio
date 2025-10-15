# Cuentas de Usuario y Administrador - webDevPR

## 🔐 Cuentas Predefinidas

### 👥 **Usuarios Cliente**

#### Cliente 1 - María González
- **Email**: `cliente1@webdevpr.com`
- **Contraseña**: `cliente123`
- **Empresa**: Empresa ABC
- **Proyecto**: Sitio Web Corporativo (En progreso)

#### Cliente 2 - Carlos Rodríguez
- **Email**: `cliente2@webdevpr.com`
- **Contraseña**: `cliente456`
- **Empresa**: Negocio XYZ
- **Proyecto**: E-commerce Store (Completado)

#### Cliente 3 - Ana Martínez
- **Email**: `cliente3@webdevpr.com`
- **Contraseña**: `cliente789`
- **Empresa**: Startup Innovadora
- **Proyecto**: App Móvil (Planificación)

### 👨‍💼 **Administradores**

#### Administrador - Luis Pérez
- **Email**: `admin@webdevpr.com`
- **Contraseña**: `admin123`
- **Rol**: Administrador
- **Acceso**: Panel de administración

#### Super Administrador - Sofía Hernández
- **Email**: `superadmin@webdevpr.com`
- **Contraseña**: `superadmin123`
- **Rol**: Super Administrador
- **Acceso**: Panel de administración + Configuraciones del sistema

## 🚀 **Cómo Probar el Sistema**

### 1. **Login como Cliente**
1. Ve a la página de login
2. Usa cualquiera de las credenciales de cliente
3. Serás redirigido al Portal del Cliente

### 2. **Login como Administrador**
1. Ve a la página de login
2. Usa las credenciales de admin o superadmin
3. Serás redirigido al Panel de Administración

### 3. **Registro de Nuevo Usuario**
1. Ve a la página de registro
2. Completa el formulario con datos nuevos
3. El sistema creará una nueva cuenta de cliente
4. Serás redirigido automáticamente al Portal del Cliente

## 🔄 **Funcionalidades del Sistema**

### **Autenticación**
- ✅ Login con credenciales predefinidas
- ✅ Registro de nuevos usuarios
- ✅ Validación de email duplicado
- ✅ Redirección automática según rol

### **Roles y Permisos**
- **Cliente**: Acceso al portal del cliente
- **Admin**: Acceso al panel de administración
- **Super Admin**: Acceso completo al sistema

### **Almacenamiento**
- ✅ Datos almacenados en memoria local (localStorage)
- ✅ Persistencia de sesión entre páginas
- ✅ Logout automático

## 📱 **Navegación Dinámica**

- **Usuario NO logueado**: Ve botón "Login" en todas las páginas
- **Usuario logueado**: Ve botón "Portal de Cliente" en todas las páginas
- **Administrador logueado**: Ve botón "Portal de Cliente" (redirige al panel admin)

## 🛠️ **Desarrollo**

### Archivos Principales
- `js/user-data.js` - Datos de usuarios y administradores
- `js/auth-manager.js` - Gestión de autenticación
- `pages/login.html` - Página de login
- `pages/signup.html` - Página de registro

### Personalización
Para agregar más usuarios o administradores, edita el archivo `js/user-data.js` y modifica los arrays `initializeUsers()` y `initializeAdmins()`.
