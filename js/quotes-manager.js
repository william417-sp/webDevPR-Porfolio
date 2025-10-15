class QuotesManager {
    constructor() {
        this.quotesService = new QuotesService();
        this.quotes = [];
        this.init();
    }

    async init() {
        await this.loadQuotes();
        this.renderQuotes();
        this.bindEvents();
    }

    async loadQuotes() {
        try {
            this.quotes = await this.quotesService.getQuotes();
            this.updateDashboardCounter();
        } catch (error) {
            console.error('Error loading quotes:', error);
            this.showError('Error al cargar las cotizaciones');
        }
    }

    updateDashboardCounter() {
        const pendingQuotes = this.quotes.filter(quote => quote.status === 'pending');
        const counterElement = document.getElementById('quotes-count');
        if (counterElement) {
            counterElement.textContent = pendingQuotes.length;
        }
    }

    renderQuotes() {
        const container = document.getElementById('quotes-container');
        if (!container) return;

        if (this.quotes.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
                    <h3 class="text-lg font-semibold text-gray-600 mb-2">No hay cotizaciones</h3>
                    <p class="text-gray-500">Las cotizaciones aparecerán aquí cuando los clientes las soliciten.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.quotes.map(quote => this.createQuoteCard(quote)).join('');
    }

    createQuoteCard(quote) {
        const statusClass = this.getStatusClass(quote.status);
        const statusIcon = this.getStatusIcon(quote.status);
        const formattedDate = new Date(quote.createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return `
            <div class="quote-card" data-quote-id="${quote.id}">
                <div class="quote-header">
                    <div class="quote-info">
                        <h3 class="quote-service">${quote.service}</h3>
                        <p class="quote-client">${quote.clientInfo.name || 'Cliente Anónimo'}</p>
                        <p class="quote-date">${formattedDate}</p>
                    </div>
                    <div class="quote-status">
                        <span class="status-badge ${statusClass}">
                            <i class="fas ${statusIcon} mr-1"></i>
                            ${this.getStatusText(quote.status)}
                        </span>
                    </div>
                </div>
                
                <div class="quote-details">
                    <div class="quote-price">
                        <span class="price-label">Total:</span>
                        <span class="price-value">${quote.totalPrice}</span>
                    </div>
                    
                    <div class="quote-features">
                        <h4>Características seleccionadas:</h4>
                        <ul>
                            ${quote.features.map(feature => `
                                <li><i class="fas fa-check text-green-500 mr-2"></i>${feature.name} (+$${feature.price})</li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    ${quote.clientInfo.email ? `
                        <div class="quote-contact">
                            <h4>Información de contacto:</h4>
                            <p><i class="fas fa-envelope mr-2"></i>${quote.clientInfo.email}</p>
                            ${quote.clientInfo.phone ? `<p><i class="fas fa-phone mr-2"></i>${quote.clientInfo.phone}</p>` : ''}
                            ${quote.clientInfo.company ? `<p><i class="fas fa-building mr-2"></i>${quote.clientInfo.company}</p>` : ''}
                        </div>
                    ` : ''}
                </div>
                
                <div class="quote-actions">
                    <button class="btn-action btn-primary" onclick="quotesManager.updateQuoteStatus('${quote.id}', 'approved')">
                        <i class="fas fa-check mr-2"></i>Aprobar
                    </button>
                    <button class="btn-action btn-secondary" onclick="quotesManager.updateQuoteStatus('${quote.id}', 'pending')">
                        <i class="fas fa-clock mr-2"></i>Pendiente
                    </button>
                    <button class="btn-action btn-danger" onclick="quotesManager.updateQuoteStatus('${quote.id}', 'rejected')">
                        <i class="fas fa-times mr-2"></i>Rechazar
                    </button>
                    <button class="btn-action btn-outline" onclick="quotesManager.viewQuoteDetails('${quote.id}')">
                        <i class="fas fa-eye mr-2"></i>Ver Detalles
                    </button>
                </div>
            </div>
        `;
    }

    getStatusClass(status) {
        const classes = {
            'pending': 'status-pending',
            'approved': 'status-approved',
            'rejected': 'status-rejected',
            'completed': 'status-completed'
        };
        return classes[status] || 'status-pending';
    }

    getStatusIcon(status) {
        const icons = {
            'pending': 'fa-clock',
            'approved': 'fa-check-circle',
            'rejected': 'fa-times-circle',
            'completed': 'fa-check-double'
        };
        return icons[status] || 'fa-clock';
    }

    getStatusText(status) {
        const texts = {
            'pending': 'Pendiente',
            'approved': 'Aprobado',
            'rejected': 'Rechazado',
            'completed': 'Completado'
        };
        return texts[status] || 'Pendiente';
    }

    async updateQuoteStatus(quoteId, newStatus) {
        try {
            await this.quotesService.updateQuoteStatus(quoteId, newStatus);
            
            // Update local data
            const quote = this.quotes.find(q => q.id === quoteId);
            if (quote) {
                quote.status = newStatus;
            }
            
            // Re-render quotes
            this.renderQuotes();
            
            // Update dashboard counter
            this.updateDashboardCounter();
            
            this.showSuccess(`Estado actualizado a: ${this.getStatusText(newStatus)}`);
        } catch (error) {
            console.error('Error updating quote status:', error);
            this.showError('Error al actualizar el estado de la cotización');
        }
    }

    viewQuoteDetails(quoteId) {
        const quote = this.quotes.find(q => q.id === quoteId);
        if (!quote) return;

        // Create modal with quote details
        const modal = document.createElement('div');
        modal.className = 'quote-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2>Detalles de la Cotización</h2>
                        <button class="modal-close" onclick="this.closest('.quote-modal').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="quote-detail-section">
                            <h3>Información del Servicio</h3>
                            <p><strong>Servicio:</strong> ${quote.service}</p>
                            <p><strong>Precio Base:</strong> $${quote.basePrice}</p>
                            <p><strong>Total:</strong> ${quote.totalPrice}</p>
                        </div>
                        
                        <div class="quote-detail-section">
                            <h3>Características</h3>
                            <ul>
                                ${quote.features.map(feature => `
                                    <li>${feature.name} - +$${feature.price}</li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <div class="quote-detail-section">
                            <h3>Información del Cliente</h3>
                            <p><strong>Nombre:</strong> ${quote.clientInfo.name || 'No especificado'}</p>
                            <p><strong>Email:</strong> ${quote.clientInfo.email || 'No especificado'}</p>
                            <p><strong>Teléfono:</strong> ${quote.clientInfo.phone || 'No especificado'}</p>
                            <p><strong>Empresa:</strong> ${quote.clientInfo.company || 'No especificado'}</p>
                            ${quote.clientInfo.message ? `<p><strong>Mensaje:</strong> ${quote.clientInfo.message}</p>` : ''}
                        </div>
                        
                        <div class="quote-detail-section">
                            <h3>Metadatos</h3>
                            <p><strong>Fecha:</strong> ${new Date(quote.createdAt).toLocaleString('es-ES')}</p>
                            <p><strong>Estado:</strong> ${this.getStatusText(quote.status)}</p>
                            <p><strong>Fuente:</strong> ${quote.metadata?.source || 'No especificado'}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    bindEvents() {
        // Add any additional event listeners here
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quotes-container')) {
        window.quotesManager = new QuotesManager();
    }
});
