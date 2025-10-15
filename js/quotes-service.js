class QuotesService {
    constructor() {
        this.baseUrl = 'https://webdevprp2754back.builtwithrocket.new';
        this.quotesEndpoint = '/api/quotes';
    }

    async submitQuote(quoteData, retries = 3) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        try {
            const response = await fetch(`${this.baseUrl}${this.quotesEndpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getAuthToken()}`,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({
                    ...quoteData,
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                    source: 'calculator',
                    clientTimestamp: Date.now()
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error('La solicitud tardó demasiado tiempo. Inténtalo de nuevo.');
            }
            
            // Retry logic for network errors
            if (retries > 0 && (error.name === 'TypeError' || error.message.includes('fetch'))) {
                console.log(`Reintentando envío... (${4 - retries}/3)`);
                await this.delay(1000 * (4 - retries)); // Exponential backoff
                return this.submitQuote(quoteData, retries - 1);
            }
            
            console.error('Error submitting quote:', error);
            throw error;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getQuotes() {
        try {
            const response = await fetch(`${this.baseUrl}${this.quotesEndpoint}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.getAuthToken()}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const quotes = await response.json();
            return quotes;
        } catch (error) {
            console.error('Error fetching quotes:', error);
            throw error;
        }
    }

    async updateQuoteStatus(quoteId, status) {
        try {
            const response = await fetch(`${this.baseUrl}${this.quotesEndpoint}/${quoteId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getAuthToken()}`
                },
                body: JSON.stringify({ status })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error updating quote status:', error);
            throw error;
        }
    }

    getAuthToken() {
        // Get token from localStorage or session
        return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    }

    // Format quote data for submission
    formatQuoteData(calculatorData, contactData = {}) {
        return {
            service: calculatorData.service,
            basePrice: calculatorData.basePrice,
            features: calculatorData.features,
            totalPrice: calculatorData.totalPrice,
            clientInfo: {
                name: contactData.name || '',
                email: contactData.email || '',
                phone: contactData.phone || '',
                company: contactData.company || '',
                message: contactData.message || ''
            },
            metadata: {
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString(),
                source: 'calculator'
            }
        };
    }
}

// Export for use in other modules
window.QuotesService = QuotesService;
