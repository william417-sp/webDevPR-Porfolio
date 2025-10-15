/**
 * EJEMPLO DE CONFIGURACIÓN SEGURA PARA PRODUCCIÓN
 * 
 * IMPORTANTE: Este es un archivo de ejemplo. Para usarlo:
 * 1. Copia este archivo como 'ai-chatbot-config.js'
 * 2. Agrega tu API key real
 * 3. Agrega 'ai-chatbot-config.js' a tu .gitignore
 * 4. Nunca subas ai-chatbot-config.js a repositorios públicos
 */

// Configuración del chatbot (para desarrollo/testing local)
const CHATBOT_CONFIG = {
    businessName: 'webDevPR',
    language: 'es',
    theme: 'primary',
    
    // Opción 1: Sin IA (respuestas predefinidas inteligentes)
    useAI: false,
    
    // Opción 2: Con IA de OpenAI (descomentar y agregar tu API key)
    // useAI: true,
    // apiKey: 'sk-your-api-key-here',
    // model: 'gpt-3.5-turbo',
    
    // Opción 3: Con backend proxy (RECOMENDADO para producción)
    // useAI: true,
    // apiEndpoint: '/api/chatbot',  // Tu endpoint de backend
};

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CHATBOT_CONFIG;
}

