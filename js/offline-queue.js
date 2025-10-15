class OfflineQueue {
    constructor() {
        this.queueKey = 'pendingQuotes';
        this.isOnline = navigator.onLine;
        this.init();
    }

    init() {
        // Listen for online/offline events
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.processQueue();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
        });

        // Process queue on page load if online
        if (this.isOnline) {
            this.processQueue();
        }
    }

    addToQueue(quoteData) {
        try {
            const queue = this.getQueue();
            const quoteWithId = {
                ...quoteData,
                id: this.generateId(),
                timestamp: Date.now(),
                retries: 0
            };
            
            queue.push(quoteWithId);
            this.saveQueue(queue);
            
            console.log('Quote added to offline queue:', quoteWithId.id);
            return quoteWithId.id;
        } catch (error) {
            console.error('Error adding to queue:', error);
            return null;
        }
    }

    async processQueue() {
        if (!this.isOnline) return;

        const queue = this.getQueue();
        if (queue.length === 0) return;

        console.log(`Processing ${queue.length} pending quotes...`);

        const quotesService = new QuotesService();
        const processedIds = [];

        for (const quote of queue) {
            try {
                // Skip if too many retries
                if (quote.retries >= 3) {
                    console.log(`Skipping quote ${quote.id} - too many retries`);
                    processedIds.push(quote.id);
                    continue;
                }

                const result = await quotesService.submitQuote(quote);
                
                if (result && result.id) {
                    console.log(`Successfully processed quote ${quote.id}`);
                    processedIds.push(quote.id);
                    
                    // Update localStorage with server ID
                    const localQuoteData = localStorage.getItem('quoteData');
                    if (localQuoteData) {
                        const parsedData = JSON.parse(localQuoteData);
                        if (parsedData.timestamp === quote.timestamp) {
                            localStorage.setItem('quoteId', result.id);
                        }
                    }
                }
            } catch (error) {
                console.error(`Error processing quote ${quote.id}:`, error);
                
                // Increment retry count
                quote.retries = (quote.retries || 0) + 1;
                quote.lastError = error.message;
                quote.lastRetry = Date.now();
            }
        }

        // Remove processed quotes from queue
        if (processedIds.length > 0) {
            const updatedQueue = queue.filter(quote => !processedIds.includes(quote.id));
            this.saveQueue(updatedQueue);
            
            // Show notification if quotes were processed
            if (processedIds.length > 0) {
                this.showQueueNotification(`${processedIds.length} cotización(es) enviada(s) exitosamente`);
            }
        }
    }

    getQueue() {
        try {
            const queue = localStorage.getItem(this.queueKey);
            return queue ? JSON.parse(queue) : [];
        } catch (error) {
            console.error('Error reading queue:', error);
            return [];
        }
    }

    saveQueue(queue) {
        try {
            localStorage.setItem(this.queueKey, JSON.stringify(queue));
        } catch (error) {
            console.error('Error saving queue:', error);
        }
    }

    generateId() {
        return 'quote_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getQueueStatus() {
        const queue = this.getQueue();
        return {
            count: queue.length,
            hasPending: queue.length > 0,
            isOnline: this.isOnline
        };
    }

    showQueueNotification(message) {
        // Create a subtle notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 0.75rem 1rem;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 500;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideInUp 0.3s ease-out;
        `;
        
        notification.innerHTML = `
            <i class="fas fa-check-circle mr-2"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutDown 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Method to manually retry failed quotes
    async retryFailedQuotes() {
        const queue = this.getQueue();
        const failedQuotes = queue.filter(quote => quote.retries > 0);
        
        if (failedQuotes.length === 0) {
            this.showQueueNotification('No hay cotizaciones fallidas para reintentar');
            return;
        }

        // Reset retry count for failed quotes
        failedQuotes.forEach(quote => {
            quote.retries = 0;
            delete quote.lastError;
            delete quote.lastRetry;
        });

        this.saveQueue(queue);
        await this.processQueue();
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize offline queue
window.offlineQueue = new OfflineQueue();
