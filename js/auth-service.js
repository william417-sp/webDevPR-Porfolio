// Simulación de base de datos de usuarios (en un entorno real, esto estaría en el backend)
let users = JSON.parse(localStorage.getItem('users')) || [];
const ADMIN_EMAIL = 'admin@webdevpr.com';
const ADMIN_PASSWORD = 'admin123';

// Función para registrar un nuevo usuario
function registerUser(userData) {
    // Verificar si el email ya existe
    if (users.some(user => user.email === userData.email)) {
        throw new Error('Este email ya está registrado');
    }

    // Crear nuevo usuario
    const newUser = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        company: userData.company || '',
        password: userData.password, // En un entorno real, la contraseña estaría hasheada
        role: 'client',
        projects: [] // Lista de proyectos vacía inicialmente
    };

    // Guardar usuario
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Iniciar sesión automáticamente
    return loginUser(userData.email, userData.password);
}

// Función para iniciar sesión
function loginUser(email, password) {
    // Verificar si es el admin
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminSession = {
            id: 'admin',
            email: ADMIN_EMAIL,
            role: 'admin',
            firstName: 'Admin',
            lastName: 'User'
        };
        localStorage.setItem('currentUser', JSON.stringify(adminSession));
        return adminSession;
    }

    // Buscar usuario
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        throw new Error('Email o contraseña incorrectos');
    }

    // Crear sesión
    const session = {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
    };

    // Guardar sesión
    localStorage.setItem('currentUser', JSON.stringify(session));
    return session;
}

// Función para cerrar sesión
function logoutUser() {
    localStorage.removeItem('currentUser');
}

// Función para verificar si hay una sesión activa
function getCurrentUser() {
    const userSession = localStorage.getItem('currentUser');
    return userSession ? JSON.parse(userSession) : null;
}

// Función para verificar si el usuario actual es admin
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

// Función para proteger rutas
function checkAuth() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = '/pages/login.html';
        return false;
    }
    return true;
}

// Función para proteger rutas de admin
function checkAdminAuth() {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
        window.location.href = '/pages/login.html';
        return false;
    }
    return true;
}

// Exportar funciones
window.authService = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    isAdmin,
    checkAuth,
    checkAdminAuth
};
