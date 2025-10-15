// User Data - Cuentas predefinidas para usuarios y administradores
class UserData {
    constructor() {
        this.users = this.initializeUsers();
        this.admins = this.initializeAdmins();
    }

    // Inicializar usuarios predefinidos
    initializeUsers() {
        return [
            {
                id: 'user_001',
                email: 'cliente1@webdevpr.com',
                password: 'cliente123',
                firstName: 'María',
                lastName: 'González',
                fullName: 'María González',
                role: 'client',
                company: 'Empresa ABC',
                phone: '+1 (787) 123-4567',
                joinDate: '2024-01-15',
                status: 'active',
                projects: [
                    {
                        id: 'proj_001',
                        name: 'Sitio Web Corporativo',
                        status: 'en_progress',
                        startDate: '2024-01-20'
                    }
                ]
            },
            {
                id: 'user_002',
                email: 'cliente2@webdevpr.com',
                password: 'cliente456',
                firstName: 'Carlos',
                lastName: 'Rodríguez',
                fullName: 'Carlos Rodríguez',
                role: 'client',
                company: 'Negocio XYZ',
                phone: '+1 (787) 234-5678',
                joinDate: '2024-02-10',
                status: 'active',
                projects: [
                    {
                        id: 'proj_002',
                        name: 'E-commerce Store',
                        status: 'completed',
                        startDate: '2024-02-15',
                        endDate: '2024-03-30'
                    }
                ]
            },
            {
                id: 'user_003',
                email: 'cliente3@webdevpr.com',
                password: 'cliente789',
                firstName: 'Ana',
                lastName: 'Martínez',
                fullName: 'Ana Martínez',
                role: 'client',
                company: 'Startup Innovadora',
                phone: '+1 (787) 345-6789',
                joinDate: '2024-03-05',
                status: 'active',
                projects: [
                    {
                        id: 'proj_003',
                        name: 'App Móvil',
                        status: 'planning',
                        startDate: '2024-03-20'
                    }
                ]
            }
        ];
    }

    // Inicializar administradores predefinidos
    initializeAdmins() {
        return [
            {
                id: 'admin_001',
                email: 'admin@webdevpr.com',
                password: 'admin123',
                firstName: 'Luis',
                lastName: 'Pérez',
                fullName: 'Luis Pérez',
                role: 'admin',
                permissions: ['all'],
                joinDate: '2024-01-01',
                status: 'active',
                lastLogin: null
            },
            {
                id: 'admin_002',
                email: 'superadmin@webdevpr.com',
                password: 'superadmin123',
                firstName: 'Sofía',
                lastName: 'Hernández',
                fullName: 'Sofía Hernández',
                role: 'superadmin',
                permissions: ['all', 'user_management', 'system_settings'],
                joinDate: '2024-01-01',
                status: 'active',
                lastLogin: null
            }
        ];
    }

    // Buscar usuario por email y contraseña
    findUser(email, password) {
        const allUsers = [...this.users, ...this.admins];
        return allUsers.find(user => 
            user.email.toLowerCase() === email.toLowerCase() && 
            user.password === password
        );
    }

    // Buscar usuario por email solamente
    findUserByEmail(email) {
        const allUsers = [...this.users, ...this.admins];
        return allUsers.find(user => 
            user.email.toLowerCase() === email.toLowerCase()
        );
    }

    // Verificar si es administrador
    isAdmin(user) {
        return user && (user.role === 'admin' || user.role === 'superadmin');
    }

    // Verificar si es super administrador
    isSuperAdmin(user) {
        return user && user.role === 'superadmin';
    }

    // Obtener todos los usuarios (solo para admins)
    getAllUsers() {
        return this.users;
    }

    // Obtener todos los administradores (solo para superadmins)
    getAllAdmins() {
        return this.admins;
    }

    // Crear nuevo usuario
    createUser(userData) {
        const newUser = {
            id: `user_${Date.now()}`,
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: `${userData.firstName} ${userData.lastName}`,
            role: 'client',
            company: userData.company || '',
            phone: userData.phone || '',
            joinDate: new Date().toISOString().split('T')[0],
            status: 'active',
            projects: []
        };

        this.users.push(newUser);
        return newUser;
    }

    // Actualizar información de usuario
    updateUser(userId, updateData) {
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updateData };
            return this.users[userIndex];
        }
        return null;
    }

    // Obtener estadísticas
    getStats() {
        return {
            totalUsers: this.users.length,
            totalAdmins: this.admins.length,
            activeUsers: this.users.filter(user => user.status === 'active').length,
            totalProjects: this.users.reduce((total, user) => total + user.projects.length, 0)
        };
    }
}

// Crear instancia global
window.userData = new UserData();
