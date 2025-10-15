class ServicesCalculator {
    constructor() {
        this.services = {
            'website': {
                name: 'Sitio Web Corporativo',
                basePrice: 1500,
                features: {
                    'responsive': { name: 'Diseño Responsivo', price: 300 },
                    'seo': { name: 'Optimización SEO', price: 500 },
                    'cms': { name: 'Sistema de Gestión de Contenidos', price: 800 },
                    'analytics': { name: 'Google Analytics', price: 200 },
                    'ssl': { name: 'Certificado SSL', price: 100 },
                    'hosting': { name: 'Hosting (1 año)', price: 300 }
                }
            },
            'ecommerce': {
                name: 'Tienda Online (E-commerce)',
                basePrice: 3000,
                features: {
                    'payment': { name: 'Pasarela de Pagos', price: 600 },
                    'inventory': { name: 'Gestión de Inventario', price: 800 },
                    'shipping': { name: 'Cálculo de Envíos', price: 400 },
                    'reviews': { name: 'Sistema de Reseñas', price: 300 },
                    'discounts': { name: 'Códigos de Descuento', price: 200 },
                    'analytics': { name: 'Analytics Avanzado', price: 400 }
                }
            },
            'mobile': {
                name: 'Aplicación Móvil',
                basePrice: 5000,
                features: {
                    'ios': { name: 'Versión iOS', price: 2000 },
                    'android': { name: 'Versión Android', price: 2000 },
                    'backend': { name: 'Backend API', price: 1500 },
                    'push': { name: 'Notificaciones Push', price: 300 },
                    'offline': { name: 'Funcionalidad Offline', price: 800 },
                    'analytics': { name: 'Analytics Móvil', price: 400 }
                }
            },
            'maintenance': {
                name: 'Mantenimiento Web',
                basePrice: 200,
                features: {
                    'updates': { name: 'Actualizaciones Mensuales', price: 100 },
                    'backup': { name: 'Backups Automáticos', price: 50 },
                    'security': { name: 'Monitoreo de Seguridad', price: 150 },
                    'support': { name: 'Soporte Técnico', price: 200 },
                    'performance': { name: 'Optimización de Rendimiento', price: 100 }
                }
            }
        };
        
        this.init();
    }
    
    init() {
        this.createCalculatorHTML();
        this.bindEvents();
    }
    
    createCalculatorHTML() {
        const calculatorHTML = `
            <div id="services-calculator" class="services-calculator">
                <div class="calculator-header">
                    <h3>Calculadora de Servicios</h3>
                    <p>Obtén una estimación personalizada para tu proyecto</p>
                </div>
                
                <div class="calculator-content">
                    <div class="service-selection">
                        <h4>Selecciona tu Servicio Principal</h4>
                        <div class="service-options">
                            ${Object.keys(this.services).map(key => `
                                <label class="service-option">
                                    <input type="radio" name="main-service" value="${key}">
                                    <div class="service-card">
                                        <h5>${this.services[key].name}</h5>
                                        <span class="base-price">Desde $${this.services[key].basePrice}</span>
                                    </div>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="features-selection" id="features-selection" style="display: none;">
                        <h4>Características Adicionales</h4>
                        <div class="features-grid" id="features-grid">
                            <!-- Features will be populated dynamically -->
                        </div>
                    </div>
                    
                    <div class="calculator-summary" id="calculator-summary" style="display: none;">
                        <div class="summary-content">
                            <h4>Resumen de tu Proyecto</h4>
                            <div class="summary-details">
                                <div class="summary-item">
                                    <span>Servicio Base:</span>
                                    <span id="base-service-name">-</span>
                                    <span id="base-service-price">$0</span>
                                </div>
                                <div class="summary-features" id="summary-features">
                                    <!-- Features will be populated dynamically -->
                                </div>
                                <div class="summary-total">
                                    <span>Total Estimado:</span>
                                    <span id="total-price">$0</span>
                                </div>
                            </div>
                            <div class="calculator-actions">
                                <button class="btn-primary" id="request-quote">
                                    <i class="fas fa-paper-plane mr-2"></i>Solicitar Cotización
                                </button>
                                <button class="btn-outline" id="reset-calculator">
                                    <i class="fas fa-undo mr-2"></i>Reiniciar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert the calculator into the services page
        const servicesSection = document.querySelector('.services-content') || document.querySelector('main');
        if (servicesSection) {
            servicesSection.insertAdjacentHTML('beforeend', calculatorHTML);
        }
    }
    
    bindEvents() {
        // Service selection
        document.addEventListener('change', (e) => {
            if (e.target.name === 'main-service') {
                this.selectService(e.target.value);
            }
        });
        
        // Feature selection
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('feature-checkbox')) {
                this.updateCalculation();
            }
        });
        
        // Reset calculator
        document.addEventListener('click', (e) => {
            if (e.target.id === 'reset-calculator') {
                this.resetCalculator();
            }
        });
        
        // Request quote
        document.addEventListener('click', (e) => {
            if (e.target.id === 'request-quote') {
                this.requestQuote();
            }
        });
    }
    
    selectService(serviceKey) {
        const service = this.services[serviceKey];
        const featuresSelection = document.getElementById('features-selection');
        const featuresGrid = document.getElementById('features-grid');
        const calculatorSummary = document.getElementById('calculator-summary');
        
        // Show features selection
        featuresSelection.style.display = 'block';
        calculatorSummary.style.display = 'block';
        
        // Populate features
        featuresGrid.innerHTML = Object.keys(service.features).map(key => `
            <label class="feature-option">
                <input type="checkbox" class="feature-checkbox" value="${key}" data-price="${service.features[key].price}">
                <div class="feature-card">
                    <h6>${service.features[key].name}</h6>
                    <span class="feature-price">+$${service.features[key].price}</span>
                </div>
            </label>
        `).join('');
        
        // Update calculation
        this.updateCalculation();
    }
    
    updateCalculation() {
        const selectedService = document.querySelector('input[name="main-service"]:checked');
        if (!selectedService) return;
        
        const serviceKey = selectedService.value;
        const service = this.services[serviceKey];
        
        // Calculate base price
        let totalPrice = service.basePrice;
        const selectedFeatures = [];
        
        // Calculate features price
        document.querySelectorAll('.feature-checkbox:checked').forEach(checkbox => {
            const featureKey = checkbox.value;
            const feature = service.features[featureKey];
            totalPrice += feature.price;
            selectedFeatures.push(feature);
        });
        
        // Update summary
        document.getElementById('base-service-name').textContent = service.name;
        document.getElementById('base-service-price').textContent = `$${service.basePrice}`;
        
        // Update features summary
        const summaryFeatures = document.getElementById('summary-features');
        summaryFeatures.innerHTML = selectedFeatures.map(feature => `
            <div class="summary-item">
                <span>${feature.name}:</span>
                <span>+$${feature.price}</span>
            </div>
        `).join('');
        
        // Update total
        document.getElementById('total-price').textContent = `$${totalPrice}`;
    }
    
    resetCalculator() {
        // Reset all inputs
        document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
        document.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);
        
        // Hide sections
        document.getElementById('features-selection').style.display = 'none';
        document.getElementById('calculator-summary').style.display = 'none';
        
        // Reset summary
        document.getElementById('base-service-name').textContent = '-';
        document.getElementById('base-service-price').textContent = '$0';
        document.getElementById('summary-features').innerHTML = '';
        document.getElementById('total-price').textContent = '$0';
    }
    
    async requestQuote() {
        const selectedService = document.querySelector('input[name="main-service"]:checked');
        if (!selectedService) {
            this.showNotification('Por favor selecciona un servicio principal', 'warning');
            return;
        }
        
        const serviceKey = selectedService.value;
        const service = this.services[serviceKey];
        const selectedFeatures = Array.from(document.querySelectorAll('.feature-checkbox:checked'))
            .map(checkbox => service.features[checkbox.value]);
        
        // Create quote data
        const quoteData = {
            service: service.name,
            basePrice: service.basePrice,
            features: selectedFeatures,
            totalPrice: document.getElementById('total-price').textContent,
            timestamp: new Date().toISOString()
        };
        
        // Store quote data locally first (fast fallback)
        localStorage.setItem('quoteData', JSON.stringify(quoteData));
        
        try {
            // Show loading state with progress
            this.showLoadingState();
            
            // Check if online
            if (!navigator.onLine) {
                // Add to offline queue
                const queueId = window.offlineQueue.addToQueue(quoteData);
                this.showNotification('Sin conexión. Cotización guardada para envío posterior.', 'warning');
                
                setTimeout(() => {
                    window.location.href = 'contact_consultation.html?source=calculator&queueId=' + queueId;
                }, 2000);
                return;
            }
            
            // Initialize quotes service
            const quotesService = new QuotesService();
            
            // Submit quote to database with timeout
            const result = await Promise.race([
                quotesService.submitQuote(quoteData),
                this.createTimeoutPromise(6000) // Reduced to 6 seconds
            ]);
            
            // Store quote ID if successful
            if (result && result.id) {
                localStorage.setItem('quoteId', result.id);
                this.showNotification('Cotización enviada exitosamente. Redirigiendo...', 'success');
            } else {
                this.showNotification('Cotización guardada localmente. Redirigiendo...', 'info');
            }
            
            // Redirect immediately after short delay
            setTimeout(() => {
                const redirectUrl = result && result.id 
                    ? `contact_consultation.html?source=calculator&quoteId=${result.id}`
                    : 'contact_consultation.html?source=calculator';
                window.location.href = redirectUrl;
            }, 1200); // Reduced delay
            
        } catch (error) {
            console.error('Error submitting quote:', error);
            this.hideLoadingState();
            
            // Add to offline queue for retry
            const queueId = window.offlineQueue.addToQueue(quoteData);
            
            // Show error but still redirect (data is already stored locally)
            this.showNotification('Error de conexión. Cotización guardada para envío posterior.', 'warning');
            
            setTimeout(() => {
                window.location.href = 'contact_consultation.html?source=calculator&queueId=' + queueId;
            }, 1500);
        }
    }

    createTimeoutPromise(ms) {
        return new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Timeout')), ms);
        });
    }
    
    showLoadingState() {
        const button = document.getElementById('request-quote');
        if (button) {
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
            
            // Add progress bar
            this.addProgressBar();
        }
    }

    addProgressBar() {
        const calculator = document.querySelector('.services-calculator');
        if (calculator && !document.getElementById('quote-progress')) {
            const progressContainer = document.createElement('div');
            progressContainer.id = 'quote-progress';
            progressContainer.innerHTML = `
                <div class="progress-bar-container">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="progress-text">Enviando cotización...</div>
                </div>
            `;
            
            const summarySection = calculator.querySelector('.summary-section');
            if (summarySection) {
                summarySection.appendChild(progressContainer);
            }
            
            // Animate progress bar
            this.animateProgress();
        }
    }

    animateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (!progressFill || !progressText) return;
        
        let progress = 0;
        const messages = [
            'Enviando cotización...',
            'Procesando datos...',
            'Conectando con el servidor...',
            'Guardando en la base de datos...',
            'Finalizando...'
        ];
        
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 90) progress = 90;
            
            progressFill.style.width = `${progress}%`;
            
            // Update message based on progress
            const messageIndex = Math.floor((progress / 100) * messages.length);
            if (messageIndex < messages.length) {
                progressText.textContent = messages[messageIndex];
            }
        }, 200);
        
        // Store interval for cleanup
        this.progressInterval = interval;
    }

    removeProgressBar() {
        const progressContainer = document.getElementById('quote-progress');
        if (progressContainer) {
            progressContainer.remove();
        }
        
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    hideLoadingState() {
        const button = document.getElementById('request-quote');
        if (button) {
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Solicitar Cotización';
        }
        
        // Remove progress bar
        this.removeProgressBar();
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ServicesCalculator();
});
