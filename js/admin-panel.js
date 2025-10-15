/**
 * Admin Panel Functionality
 * webDevPR © 2025
 */

// ==================== DATA MANAGEMENT ====================

class AdminDataManager {
    constructor() {
        this.storageKeys = {
            projects: 'admin_projects',
            testimonials: 'admin_testimonials',
            services: 'admin_services',
            contacts: 'admin_contacts',
            settings: 'admin_settings',
            stats: 'admin_stats'
        };
        
        this.initializeDefaultData();
    }

    // Initialize default data if not exists
    initializeDefaultData() {
        if (!this.getProjects().length) {
            this.saveProjects([
                {
                    id: 1,
                    title: 'E-commerce Fashion',
                    client: 'Ana Torres',
                    category: 'E-commerce',
                    status: 'completed',
                    budget: 8500,
                    startDate: '2025-08-01',
                    endDate: '2025-10-02',
                    description: 'Tienda online completa con sistema de pago integrado'
                }
            ]);
        }

        if (!this.getTestimonials().length) {
            this.saveTestimonials([
                {
                    id: 1,
                    name: 'Carlos Rodríguez',
                    company: 'TechStart PR',
                    role: 'CEO',
                    rating: 5,
                    text: 'webDevPR transformó completamente nuestra presencia digital.',
                    date: '2025-09-15',
                    approved: true
                }
            ]);
        }

        if (!this.getServices().length) {
            this.saveServices([
                {
                    id: 1,
                    name: 'Desarrollo Web',
                    description: 'Sitios web modernos y responsivos',
                    price: 3500,
                    active: true,
                    icon: 'fa-code'
                },
                {
                    id: 2,
                    name: 'E-commerce',
                    description: 'Tiendas online completas',
                    price: 5500,
                    active: true,
                    icon: 'fa-shopping-cart'
                }
            ]);
        }

        if (!this.getContacts().length) {
            this.saveContacts([
                {
                    id: 1,
                    name: 'Carlos Vega',
                    email: 'carlos@email.com',
                    phone: '+1 787 555 0200',
                    subject: 'Consulta sobre servicios',
                    message: 'Me interesa conocer sus servicios de desarrollo web',
                    status: 'new',
                    date: new Date().toISOString()
                }
            ]);
        }
    }

    // Generic storage methods
    getItem(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Projects
    getProjects() {
        return this.getItem(this.storageKeys.projects);
    }

    saveProjects(projects) {
        this.setItem(this.storageKeys.projects, projects);
    }

    addProject(project) {
        const projects = this.getProjects();
        project.id = Date.now();
        projects.push(project);
        this.saveProjects(projects);
        return project;
    }

    updateProject(id, updatedProject) {
        const projects = this.getProjects();
        const index = projects.findIndex(p => p.id === id);
        if (index !== -1) {
            projects[index] = { ...projects[index], ...updatedProject };
            this.saveProjects(projects);
            return true;
        }
        return false;
    }

    deleteProject(id) {
        const projects = this.getProjects();
        const filtered = projects.filter(p => p.id !== id);
        this.saveProjects(filtered);
    }

    // Testimonials
    getTestimonials() {
        return this.getItem(this.storageKeys.testimonials);
    }

    saveTestimonials(testimonials) {
        this.setItem(this.storageKeys.testimonials, testimonials);
    }

    addTestimonial(testimonial) {
        const testimonials = this.getTestimonials();
        testimonial.id = Date.now();
        testimonials.push(testimonial);
        this.saveTestimonials(testimonials);
        return testimonial;
    }

    deleteTestimonial(id) {
        const testimonials = this.getTestimonials();
        const filtered = testimonials.filter(t => t.id !== id);
        this.saveTestimonials(filtered);
    }

    // Services
    getServices() {
        return this.getItem(this.storageKeys.services);
    }

    saveServices(services) {
        this.setItem(this.storageKeys.services, services);
    }

    addService(service) {
        const services = this.getServices();
        service.id = Date.now();
        services.push(service);
        this.saveServices(services);
        return service;
    }

    deleteService(id) {
        const services = this.getServices();
        const filtered = services.filter(s => s.id !== id);
        this.saveServices(filtered);
    }

    toggleServiceStatus(id) {
        const services = this.getServices();
        const service = services.find(s => s.id === id);
        if (service) {
            service.active = !service.active;
            this.saveServices(services);
        }
    }

    // Contacts
    getContacts() {
        return this.getItem(this.storageKeys.contacts);
    }

    saveContacts(contacts) {
        this.setItem(this.storageKeys.contacts, contacts);
    }

    updateContactStatus(id, status) {
        const contacts = this.getContacts();
        const contact = contacts.find(c => c.id === id);
        if (contact) {
            contact.status = status;
            this.saveContacts(contacts);
        }
    }

    deleteContact(id) {
        const contacts = this.getContacts();
        const filtered = contacts.filter(c => c.id !== id);
        this.saveContacts(filtered);
    }

    // Settings
    getSettings() {
        const defaultSettings = {
            siteName: 'webDevPR',
            email: 'info@webdevpr.com',
            phone: '+1 (787) 555-0123',
            description: 'Tu socio tecnológico de confianza en Puerto Rico.'
        };
        const settings = this.getItem(this.storageKeys.settings);
        return settings.length ? settings[0] : defaultSettings;
    }

    saveSettings(settings) {
        this.setItem(this.storageKeys.settings, [settings]);
    }

    // Export all data
    exportAllData() {
        return {
            projects: this.getProjects(),
            testimonials: this.getTestimonials(),
            services: this.getServices(),
            contacts: this.getContacts(),
            settings: this.getSettings(),
            exportDate: new Date().toISOString()
        };
    }

    // Import data
    importData(data) {
        if (data.projects) this.saveProjects(data.projects);
        if (data.testimonials) this.saveTestimonials(data.testimonials);
        if (data.services) this.saveServices(data.services);
        if (data.contacts) this.saveContacts(data.contacts);
        if (data.settings) this.saveSettings(data.settings);
    }
}

// ==================== UI MANAGER ====================

class AdminUI {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.currentEditId = null;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Projects
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-add-project')) {
                this.showProjectModal();
            }
            if (e.target.closest('.btn-edit-project')) {
                const id = parseInt(e.target.closest('.btn-edit-project').dataset.id);
                this.editProject(id);
            }
            if (e.target.closest('.btn-delete-project')) {
                const id = parseInt(e.target.closest('.btn-delete-project').dataset.id);
                this.deleteProject(id);
            }
        });

        // Search and filter for projects
        const searchProjects = document.getElementById('search-projects');
        const filterProjectsStatus = document.getElementById('filter-projects-status');
        
        if (searchProjects) {
            searchProjects.addEventListener('input', () => {
                this.loadProjects(searchProjects.value, filterProjectsStatus?.value);
            });
        }
        
        if (filterProjectsStatus) {
            filterProjectsStatus.addEventListener('change', () => {
                this.loadProjects(searchProjects?.value, filterProjectsStatus.value);
            });
        }

        // Search and filter for contacts
        const searchContacts = document.getElementById('search-contacts');
        const filterContactsStatus = document.getElementById('filter-contacts-status');
        
        if (searchContacts) {
            searchContacts.addEventListener('input', () => {
                this.loadContacts(searchContacts.value, filterContactsStatus?.value);
            });
        }
        
        if (filterContactsStatus) {
            filterContactsStatus.addEventListener('change', () => {
                this.loadContacts(searchContacts?.value, filterContactsStatus.value);
            });
        }

        // Load initial data when switching sections
        document.addEventListener('DOMContentLoaded', () => {
            this.loadDashboardStats();
            this.loadProjects();
            this.loadTestimonials();
            this.loadServices();
            this.loadContacts();
            this.loadSettings();
            this.loadCharts();
        });
    }

    // Dashboard
    loadDashboardStats() {
        const projects = this.dataManager.getProjects();
        const testimonials = this.dataManager.getTestimonials();
        const services = this.dataManager.getServices();
        const contacts = this.dataManager.getContacts();

        const completedProjects = projects.filter(p => p.status === 'completed').length;
        const activeClients = new Set(projects.map(p => p.client)).size;
        const inProgressProjects = projects.filter(p => p.status === 'in_progress').length;
        const totalRevenue = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
        const newMessages = contacts.filter(c => c.status === 'new').length;
        const avgRating = testimonials.length ? 
            (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1) : 0;

        document.getElementById('stat-total').textContent = completedProjects;
        document.getElementById('stat-users').textContent = activeClients;
        document.getElementById('stat-today').textContent = inProgressProjects;
        
        const revenueEl = document.querySelector('.stat-card:nth-child(4) .value');
        if (revenueEl) {
            revenueEl.textContent = `$${(totalRevenue / 1000).toFixed(1)}K`;
        }
        
        const messagesEl = document.querySelector('.stat-card:nth-child(5) .value');
        if (messagesEl) {
            messagesEl.textContent = newMessages;
        }
        
        const ratingEl = document.querySelector('.stat-card:nth-child(6) .value');
        if (ratingEl) {
            ratingEl.textContent = avgRating;
        }
    }

    // Projects
    loadProjects(searchTerm = '', statusFilter = '') {
        let projects = this.dataManager.getProjects();
        const tbody = document.querySelector('#projects-section tbody');
        
        if (!tbody) return;

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            projects = projects.filter(p => 
                p.title.toLowerCase().includes(term) ||
                p.client.toLowerCase().includes(term) ||
                p.category.toLowerCase().includes(term)
            );
        }

        // Apply status filter
        if (statusFilter) {
            projects = projects.filter(p => p.status === statusFilter);
        }

        if (projects.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px;">
                        <i class="fas fa-folder-open" style="font-size: 48px; color: #ccc; margin-bottom: 10px;"></i>
                        <p style="color: #999;">${searchTerm || statusFilter ? 'No se encontraron proyectos' : 'No hay proyectos aún'}</p>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = projects.map(project => `
            <tr>
                <td><strong>${project.title}</strong></td>
                <td>${project.client}</td>
                <td>${project.category}</td>
                <td>
                    <span class="badge ${this.getStatusBadge(project.status)}">
                        ${this.getStatusText(project.status)}
                    </span>
                </td>
                <td>$${project.budget.toLocaleString()}</td>
                <td>
                    <button class="btn btn-secondary btn-edit-project" data-id="${project.id}" style="padding: 6px 12px; font-size: 13px; margin-right: 5px;">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-delete-project" data-id="${project.id}" style="padding: 6px 12px; font-size: 13px;">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    getStatusBadge(status) {
        const badges = {
            'completed': 'success',
            'in_progress': 'warning',
            'pending': 'info',
            'cancelled': 'danger'
        };
        return badges[status] || 'info';
    }

    getStatusText(status) {
        const texts = {
            'completed': 'Completado',
            'in_progress': 'En Progreso',
            'pending': 'Pendiente',
            'cancelled': 'Cancelado'
        };
        return texts[status] || status;
    }

    showProjectModal() {
        const html = `
            <div id="project-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center;">
                <div class="card" style="max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto;">
                    <h2><i class="fas fa-plus"></i> Nuevo Proyecto</h2>
                    <form id="project-form">
                        <div class="form-row">
                            <label>Título del Proyecto *</label>
                            <input type="text" name="title" required>
                        </div>
                        <div class="form-row">
                            <label>Cliente *</label>
                            <input type="text" name="client" required>
                        </div>
                        <div class="form-row">
                            <label>Categoría *</label>
                            <select name="category" required>
                                <option value="">Seleccionar...</option>
                                <option value="E-commerce">E-commerce</option>
                                <option value="Web Corporativa">Web Corporativa</option>
                                <option value="App Móvil">App Móvil</option>
                                <option value="Landing Page">Landing Page</option>
                                <option value="Dashboard">Dashboard</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <label>Estado *</label>
                            <select name="status" required>
                                <option value="in_progress">En Progreso</option>
                                <option value="completed">Completado</option>
                                <option value="pending">Pendiente</option>
                                <option value="cancelled">Cancelado</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <label>Presupuesto ($) *</label>
                            <input type="number" name="budget" required min="0">
                        </div>
                        <div class="form-row">
                            <label>Fecha de Inicio</label>
                            <input type="date" name="startDate">
                        </div>
                        <div class="form-row">
                            <label>Fecha de Fin</label>
                            <input type="date" name="endDate">
                        </div>
                        <div class="form-row">
                            <label>Descripción</label>
                            <textarea name="description" rows="3"></textarea>
                        </div>
                        <div class="form-row" style="display: flex; gap: 10px;">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i> Guardar Proyecto
                            </button>
                            <button type="button" class="btn btn-secondary" onclick="document.getElementById('project-modal').remove()">
                                <i class="fas fa-times"></i> Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);

        document.getElementById('project-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const project = Object.fromEntries(formData);
            project.budget = parseFloat(project.budget);
            
            this.dataManager.addProject(project);
            this.loadProjects();
            this.loadDashboardStats();
            document.getElementById('project-modal').remove();
            
            this.showNotification('Proyecto agregado exitosamente', 'success');
        });
    }

    editProject(id) {
        const project = this.dataManager.getProjects().find(p => p.id === id);
        if (!project) return;

        const html = `
            <div id="project-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center;">
                <div class="card" style="max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto;">
                    <h2><i class="fas fa-edit"></i> Editar Proyecto</h2>
                    <form id="project-edit-form">
                        <div class="form-row">
                            <label>Título del Proyecto *</label>
                            <input type="text" name="title" value="${project.title}" required>
                        </div>
                        <div class="form-row">
                            <label>Cliente *</label>
                            <input type="text" name="client" value="${project.client}" required>
                        </div>
                        <div class="form-row">
                            <label>Categoría *</label>
                            <select name="category" required>
                                <option value="E-commerce" ${project.category === 'E-commerce' ? 'selected' : ''}>E-commerce</option>
                                <option value="Web Corporativa" ${project.category === 'Web Corporativa' ? 'selected' : ''}>Web Corporativa</option>
                                <option value="App Móvil" ${project.category === 'App Móvil' ? 'selected' : ''}>App Móvil</option>
                                <option value="Landing Page" ${project.category === 'Landing Page' ? 'selected' : ''}>Landing Page</option>
                                <option value="Dashboard" ${project.category === 'Dashboard' ? 'selected' : ''}>Dashboard</option>
                                <option value="Otro" ${project.category === 'Otro' ? 'selected' : ''}>Otro</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <label>Estado *</label>
                            <select name="status" required>
                                <option value="in_progress" ${project.status === 'in_progress' ? 'selected' : ''}>En Progreso</option>
                                <option value="completed" ${project.status === 'completed' ? 'selected' : ''}>Completado</option>
                                <option value="pending" ${project.status === 'pending' ? 'selected' : ''}>Pendiente</option>
                                <option value="cancelled" ${project.status === 'cancelled' ? 'selected' : ''}>Cancelado</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <label>Presupuesto ($) *</label>
                            <input type="number" name="budget" value="${project.budget}" required min="0">
                        </div>
                        <div class="form-row">
                            <label>Fecha de Inicio</label>
                            <input type="date" name="startDate" value="${project.startDate || ''}">
                        </div>
                        <div class="form-row">
                            <label>Fecha de Fin</label>
                            <input type="date" name="endDate" value="${project.endDate || ''}">
                        </div>
                        <div class="form-row">
                            <label>Descripción</label>
                            <textarea name="description" rows="3">${project.description || ''}</textarea>
                        </div>
                        <div class="form-row" style="display: flex; gap: 10px;">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i> Actualizar Proyecto
                            </button>
                            <button type="button" class="btn btn-secondary" onclick="document.getElementById('project-modal').remove()">
                                <i class="fas fa-times"></i> Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);

        document.getElementById('project-edit-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const updatedProject = Object.fromEntries(formData);
            updatedProject.budget = parseFloat(updatedProject.budget);
            
            this.dataManager.updateProject(id, updatedProject);
            this.loadProjects();
            this.loadDashboardStats();
            document.getElementById('project-modal').remove();
            
            this.showNotification('Proyecto actualizado exitosamente', 'success');
        });
    }

    deleteProject(id) {
        if (confirm('¿Estás seguro de eliminar este proyecto?')) {
            this.dataManager.deleteProject(id);
            this.loadProjects();
            this.loadDashboardStats();
            this.showNotification('Proyecto eliminado', 'success');
        }
    }

    // Testimonials
    loadTestimonials() {
        const testimonials = this.dataManager.getTestimonials();
        const container = document.querySelector('#testimonials-section .card');
        
        if (!container) return;

        if (testimonials.length === 0) {
            container.innerHTML = `
                <h2><i class="fas fa-comments"></i> Gestión de Testimonios</h2>
                <div style="margin-bottom: 20px;">
                    <button class="btn btn-primary btn-add-testimonial">
                        <i class="fas fa-plus"></i> Agregar Testimonio
                    </button>
                </div>
                <div class="empty-state">
                    <i class="fas fa-comments"></i>
                    <h3>Sin testimonios recientes</h3>
                    <p>Agrega testimonios de tus clientes satisfechos</p>
                </div>
            `;
        } else {
            container.innerHTML = `
                <h2><i class="fas fa-comments"></i> Gestión de Testimonios</h2>
                <div style="margin-bottom: 20px;">
                    <button class="btn btn-primary btn-add-testimonial">
                        <i class="fas fa-plus"></i> Agregar Testimonio
                    </button>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Empresa</th>
                                <th>Rating</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${testimonials.map(t => `
                                <tr>
                                    <td><strong>${t.name}</strong></td>
                                    <td>${t.company}</td>
                                    <td>${'⭐'.repeat(t.rating)}</td>
                                    <td>
                                        <span class="badge ${t.approved ? 'success' : 'warning'}">
                                            ${t.approved ? 'Aprobado' : 'Pendiente'}
                                        </span>
                                    </td>
                                    <td>
                                        <button class="btn btn-danger btn-delete-testimonial" data-id="${t.id}" style="padding: 6px 12px; font-size: 13px;">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        // Add event listeners
        container.querySelector('.btn-add-testimonial')?.addEventListener('click', () => {
            this.showTestimonialModal();
        });

        container.querySelectorAll('.btn-delete-testimonial').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                if (confirm('¿Eliminar este testimonio?')) {
                    this.dataManager.deleteTestimonial(id);
                    this.loadTestimonials();
                    this.showNotification('Testimonio eliminado', 'success');
                }
            });
        });
    }

    showTestimonialModal() {
        const html = `
            <div id="testimonial-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center;">
                <div class="card" style="max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto;">
                    <h2><i class="fas fa-plus"></i> Nuevo Testimonio</h2>
                    <form id="testimonial-form">
                        <div class="form-row">
                            <label>Nombre del Cliente *</label>
                            <input type="text" name="name" required>
                        </div>
                        <div class="form-row">
                            <label>Empresa *</label>
                            <input type="text" name="company" required>
                        </div>
                        <div class="form-row">
                            <label>Cargo</label>
                            <input type="text" name="role" placeholder="CEO, Director, etc.">
                        </div>
                        <div class="form-row">
                            <label>Calificación (1-5) *</label>
                            <select name="rating" required>
                                <option value="5">⭐⭐⭐⭐⭐ (5 estrellas)</option>
                                <option value="4">⭐⭐⭐⭐ (4 estrellas)</option>
                                <option value="3">⭐⭐⭐ (3 estrellas)</option>
                                <option value="2">⭐⭐ (2 estrellas)</option>
                                <option value="1">⭐ (1 estrella)</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <label>Testimonio *</label>
                            <textarea name="text" rows="4" required></textarea>
                        </div>
                        <div class="form-row">
                            <label style="display: flex; align-items: center; gap: 10px;">
                                <input type="checkbox" name="approved" checked>
                                <span>Aprobar automáticamente</span>
                            </label>
                        </div>
                        <div class="form-row" style="display: flex; gap: 10px;">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i> Guardar Testimonio
                            </button>
                            <button type="button" class="btn btn-secondary" onclick="document.getElementById('testimonial-modal').remove()">
                                <i class="fas fa-times"></i> Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);

        document.getElementById('testimonial-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const testimonial = {
                name: formData.get('name'),
                company: formData.get('company'),
                role: formData.get('role') || '',
                rating: parseInt(formData.get('rating')),
                text: formData.get('text'),
                approved: formData.get('approved') === 'on',
                date: new Date().toISOString().split('T')[0]
            };
            
            this.dataManager.addTestimonial(testimonial);
            this.loadTestimonials();
            this.loadDashboardStats();
            document.getElementById('testimonial-modal').remove();
            
            this.showNotification('Testimonio agregado exitosamente', 'success');
        });
    }

    // Services
    loadServices() {
        const services = this.dataManager.getServices();
        const activeServices = services.filter(s => s.active).length;
        const avgPrice = services.length ? 
            services.reduce((sum, s) => sum + s.price, 0) / services.length : 0;
        
        // Update stats
        const statsContainer = document.querySelector('#services-section .stats-grid');
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="stat-card">
                    <div class="icon blue">
                        <i class="fas fa-tools"></i>
                    </div>
                    <div class="value">${activeServices}</div>
                    <div class="label">Servicios Activos</div>
                </div>
                <div class="stat-card">
                    <div class="icon green">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                    <div class="value">$${avgPrice.toFixed(0)}</div>
                    <div class="label">Precio Promedio</div>
                </div>
                <div class="stat-card">
                    <div class="icon purple">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="value">${services.length}</div>
                    <div class="label">Total Servicios</div>
                </div>
            `;
        }
    }

    // Contacts
    loadContacts(searchTerm = '', statusFilter = '') {
        let contacts = this.dataManager.getContacts();
        const tbody = document.querySelector('#contacts-section tbody');
        
        if (!tbody) return;

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            contacts = contacts.filter(c => 
                c.name.toLowerCase().includes(term) ||
                c.email.toLowerCase().includes(term) ||
                c.subject.toLowerCase().includes(term) ||
                c.message.toLowerCase().includes(term)
            );
        }

        // Apply status filter
        if (statusFilter) {
            contacts = contacts.filter(c => c.status === statusFilter);
        }

        if (contacts.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px;">
                        <i class="fas fa-envelope-open" style="font-size: 48px; color: #ccc; margin-bottom: 10px;"></i>
                        <p style="color: #999;">${searchTerm || statusFilter ? 'No se encontraron mensajes' : 'No hay mensajes aún'}</p>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = contacts.map(contact => `
            <tr>
                <td><strong>${contact.name}</strong></td>
                <td>${contact.email}</td>
                <td>${contact.subject}</td>
                <td>
                    <span class="badge ${this.getContactStatusBadge(contact.status)}">
                        ${this.getContactStatusText(contact.status)}
                    </span>
                </td>
                <td>${new Date(contact.date).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-primary btn-view-contact" data-id="${contact.id}" style="padding: 6px 12px; font-size: 13px; margin-right: 5px;">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-danger btn-delete-contact" data-id="${contact.id}" style="padding: 6px 12px; font-size: 13px;">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        // Add event listeners
        tbody.querySelectorAll('.btn-view-contact').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                this.viewContact(id);
            });
        });

        tbody.querySelectorAll('.btn-delete-contact').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                if (confirm('¿Eliminar este mensaje?')) {
                    this.dataManager.deleteContact(id);
                    this.loadContacts();
                    this.loadDashboardStats();
                    this.showNotification('Mensaje eliminado', 'success');
                }
            });
        });
    }

    getContactStatusBadge(status) {
        const badges = {
            'new': 'info',
            'in_progress': 'warning',
            'resolved': 'success'
        };
        return badges[status] || 'info';
    }

    getContactStatusText(status) {
        const texts = {
            'new': 'Nuevo',
            'in_progress': 'En Proceso',
            'resolved': 'Resuelto'
        };
        return texts[status] || status;
    }

    viewContact(id) {
        const contact = this.dataManager.getContacts().find(c => c.id === id);
        if (!contact) return;

        const html = `
            <div id="contact-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center;">
                <div class="card" style="max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto;">
                    <h2><i class="fas fa-envelope"></i> Mensaje de Contacto</h2>
                    <div style="margin-bottom: 20px;">
                        <p><strong>Nombre:</strong> ${contact.name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
                        <p><strong>Teléfono:</strong> ${contact.phone || 'No proporcionado'}</p>
                        <p><strong>Asunto:</strong> ${contact.subject}</p>
                        <p><strong>Fecha:</strong> ${new Date(contact.date).toLocaleString()}</p>
                        <p><strong>Estado:</strong> 
                            <span class="badge ${this.getContactStatusBadge(contact.status)}">
                                ${this.getContactStatusText(contact.status)}
                            </span>
                        </p>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <strong>Mensaje:</strong>
                        <div style="background: #f5f7fa; padding: 15px; border-radius: 8px; margin-top: 10px;">
                            ${contact.message}
                        </div>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label><strong>Cambiar Estado:</strong></label>
                        <select id="contact-status-select" style="width: 100%; padding: 10px; border: 2px solid #e1e4e8; border-radius: 8px; margin-top: 5px;">
                            <option value="new" ${contact.status === 'new' ? 'selected' : ''}>Nuevo</option>
                            <option value="in_progress" ${contact.status === 'in_progress' ? 'selected' : ''}>En Proceso</option>
                            <option value="resolved" ${contact.status === 'resolved' ? 'selected' : ''}>Resuelto</option>
                        </select>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <a href="mailto:${contact.email}" class="btn btn-primary">
                            <i class="fas fa-reply"></i> Responder por Email
                        </a>
                        <button class="btn btn-secondary" onclick="document.getElementById('contact-modal').remove()">
                            <i class="fas fa-times"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);

        // Update status on change
        document.getElementById('contact-status-select').addEventListener('change', (e) => {
            this.dataManager.updateContactStatus(id, e.target.value);
            this.loadContacts();
            this.loadDashboardStats();
            this.showNotification('Estado actualizado', 'success');
        });
    }

    // Settings
    loadSettings() {
        const settings = this.dataManager.getSettings();
        
        document.querySelector('#settings-section input[name="siteName"]').value = settings.siteName;
        document.querySelector('#settings-section input[name="email"]').value = settings.email;
        document.querySelector('#settings-section input[name="phone"]').value = settings.phone;
        document.querySelector('#settings-section textarea[name="description"]').value = settings.description;
    }

    // Notifications
    showNotification(message, type = 'success') {
        const colors = {
            'success': '#43a047',
            'error': '#f44336',
            'info': '#2196f3',
            'warning': '#ff9800'
        };

        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10001;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Charts
    loadCharts() {
        // Wait for Chart.js to load
        if (typeof Chart === 'undefined') {
            setTimeout(() => this.loadCharts(), 500);
            return;
        }

        this.createProjectsChart();
        this.createRevenueChart();
        this.createRatingsChart();
    }

    createProjectsChart() {
        const projects = this.dataManager.getProjects();
        const statusCounts = {
            'completed': 0,
            'in_progress': 0,
            'pending': 0,
            'cancelled': 0
        };

        projects.forEach(p => {
            if (statusCounts.hasOwnProperty(p.status)) {
                statusCounts[p.status]++;
            }
        });

        const ctx = document.getElementById('projectsChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completados', 'En Progreso', 'Pendientes', 'Cancelados'],
                datasets: [{
                    data: [
                        statusCounts.completed,
                        statusCounts.in_progress,
                        statusCounts.pending,
                        statusCounts.cancelled
                    ],
                    backgroundColor: [
                        '#43a047',
                        '#ff9800',
                        '#2196f3',
                        '#f44336'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createRevenueChart() {
        const projects = this.dataManager.getProjects();
        const categoryRevenue = {};

        projects.forEach(p => {
            if (!categoryRevenue[p.category]) {
                categoryRevenue[p.category] = 0;
            }
            categoryRevenue[p.category] += p.budget || 0;
        });

        const categories = Object.keys(categoryRevenue);
        const revenues = Object.values(categoryRevenue);

        const ctx = document.getElementById('revenueChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Ingresos ($)',
                    data: revenues,
                    backgroundColor: 'rgba(102, 126, 234, 0.8)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    createRatingsChart() {
        const testimonials = this.dataManager.getTestimonials();
        const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        testimonials.forEach(t => {
            if (ratingCounts.hasOwnProperty(t.rating)) {
                ratingCounts[t.rating]++;
            }
        });

        const ctx = document.getElementById('ratingsChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1⭐', '2⭐', '3⭐', '4⭐', '5⭐'],
                datasets: [{
                    label: 'Cantidad',
                    data: [
                        ratingCounts[1],
                        ratingCounts[2],
                        ratingCounts[3],
                        ratingCounts[4],
                        ratingCounts[5]
                    ],
                    backgroundColor: [
                        '#f44336',
                        '#ff9800',
                        '#ffc107',
                        '#8bc34a',
                        '#43a047'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
}

// ==================== INITIALIZATION ====================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdmin);
} else {
    initializeAdmin();
}

function initializeAdmin() {
    // Wait a bit to ensure the page is fully loaded
    setTimeout(() => {
        window.dataManager = new AdminDataManager();
        window.adminUI = new AdminUI(window.dataManager);
        
        // Add event listener for "Add Project" button
        const addProjectBtn = document.querySelector('#projects-section .btn-primary');
        if (addProjectBtn && !addProjectBtn.classList.contains('btn-add-project')) {
            addProjectBtn.classList.add('btn-add-project');
        }

        // Export data functionality
        const exportBtns = document.querySelectorAll('button');
        exportBtns.forEach(btn => {
            if (btn.textContent.includes('Exportar')) {
                btn.addEventListener('click', () => {
                    const data = window.dataManager.exportAllData();
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `webdevpr-data-${new Date().toISOString().split('T')[0]}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                    window.adminUI.showNotification('Datos exportados exitosamente', 'success');
                });
            }
        });

        console.log('✅ Admin Panel inicializado correctamente');
    }, 500);
}

