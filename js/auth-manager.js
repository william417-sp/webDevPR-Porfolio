// Auth Manager - Maneja el estado de autenticación del usuario
class AuthManager {
    constructor() {
        this.isLoggedIn = this.checkLoginStatus();
        this.currentUser = this.getCurrentUser();
        this.init();
    }

    // Verifica si el usuario está logueado
    checkLoginStatus() {
        // Verificar si hay datos de usuario en localStorage
        const userData = localStorage.getItem('webDevPR_user');
        return userData !== null;
    }

    // Obtiene el usuario actual
    getCurrentUser() {
        const userData = localStorage.getItem('webDevPR_user');
        return userData ? JSON.parse(userData) : null;
    }

    // Inicializa el manager
    init() {
        this.updateNavigationButtons();
        this.setupEventListeners();
    }

    // Actualiza todos los botones de navegación
    updateNavigationButtons() {
        const loginButtons = document.querySelectorAll('.auth-button');
        const portalButtons = document.querySelectorAll('.portal-button');
        
        // Temporalmente deshabilitado - Login y Portal pausados
        // Siempre mantener ambos ocultos
        loginButtons.forEach(button => {
            button.style.display = 'none';
        });
        portalButtons.forEach(button => {
            button.style.display = 'none';
        });
    }

    // Configura los event listeners
    setupEventListeners() {
        // Listener para el botón de logout
        const logoutButtons = document.querySelectorAll('.logout-button');
        logoutButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        });
    }

    // Simula el login
    login(userData) {
        // Actualizar último login
        userData.lastLogin = new Date().toISOString();
        
        localStorage.setItem('webDevPR_user', JSON.stringify(userData));
        this.isLoggedIn = true;
        this.currentUser = userData;
        this.updateNavigationButtons();
        
        // Redirigir según el rol
        if (userData.role === 'admin' || userData.role === 'superadmin') {
            window.location.href = 'admin-panel.html';
        } else {
            window.location.href = 'client_portal.html';
        }
    }

    // Simula el logout
    logout() {
        localStorage.removeItem('webDevPR_user');
        this.isLoggedIn = false;
        this.updateNavigationButtons();
        
        // Redirigir al homepage
        window.location.href = 'homepage.html';
    }

    // Obtiene los datos del usuario
    getUserData() {
        const userData = localStorage.getItem('webDevPR_user');
        return userData ? JSON.parse(userData) : null;
    }

    // Verifica si el usuario está logueado
    isUserLoggedIn() {
        return this.isLoggedIn;
    }
}

// Inicializar el AuthManager cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    window.authManager = new AuthManager();
});

// Función para manejar el login del formulario
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('Por favor, completa todos los campos');
        return;
    }
    
    // Buscar usuario en los datos predefinidos
    const user = window.userData.findUser(email, password);
    
    if (user) {
        // Usuario encontrado, hacer login
        window.authManager.login(user);
    } else {
        alert('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
    }
}

// Función para manejar el registro
function handleSignup(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';
    
    if (!firstName || !lastName || !email || !password) {
        alert('Por favor, completa todos los campos requeridos');
        return;
    }
    
    // Verificar si el email ya existe
    const existingUser = window.userData.findUserByEmail(email);
    if (existingUser) {
        alert('Este email ya está registrado. Por favor, usa otro email o inicia sesión.');
        return;
    }
    
    // Crear nuevo usuario
    const newUserData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone
    };
    
    const newUser = window.userData.createUser(newUserData);
    window.authManager.login(newUser);
}
