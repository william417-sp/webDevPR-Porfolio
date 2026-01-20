// Chatbot simple para webDevPR - Compatible con todos los navegadores
(function() {
    'use strict';
    
    console.log('🤖 Cargando chatbot...');

    // ============================================
    // CONFIGURACIÓN DE OLLAMA LOCAL (Llama 3.2)
    // ============================================
    // Para usar Llama 3.2 con Ollama local:
    // 1. Asegúrate de tener Ollama corriendo en http://localhost:11434
    // 2. Instala el modelo: ollama pull llama3.2
    // 3. Cambia 'enabled: false' a 'enabled: true'
    // 4. El chatbot usará Llama 3.2 localmente (más rápido y privado)
    // 5. Si Ollama no está disponible, usará respuestas predefinidas como fallback
    
    const OLLAMA_CONFIG = {
        enabled: true, // Cambia a 'true' para habilitar Ollama local
        endpoint: 'http://localhost:11434/api/chat', // API de Ollama local
        model: 'llama3.2:latest', // Modelo Llama 3.2 (usa el nombre exacto de tu modelo instalado)
        // model: 'llama3.1', // Alternativa si tienes Llama 3.1 instalado
        // model: 'llama3', // Si tienes Llama 3 instalado
        temperature: 0.7,
        num_predict: 500 // Máximo de tokens a generar
    };

    // ============================================
    // Función para obtener respuesta de Ollama API Local
    // ============================================
    async function getOllamaResponse(userMessage) {
        // Verificar si Ollama está habilitado
        if (!OLLAMA_CONFIG.enabled) {
            console.log('⚠️ Ollama está deshabilitado, usando respuestas predefinidas');
            return null; // Usar fallback
        }

        try {
            // System prompt personalizado para webDevPR
            const systemPrompt = `Eres un asistente virtual amigable y profesional de webDevPR, una empresa de desarrollo web en Puerto Rico. 
Tu misión es ayudar a los clientes con información sobre servicios, precios, tiempos y agendar consultas.
Mantén respuestas breves, claras y en español. Si no sabes algo, dirige a contactar directamente.
Información clave sobre webDevPR:
- Sitios web desde $1,500
- E-commerce desde $3,000
- Apps móviles desde $10,000
- SEO desde $500/mes
- Mantenimiento desde $99/mes
- Consultas gratuitas disponibles
- Contacto: +1 (787) 555-0123, info@webdevpr.com`;

            console.log('🤖 Intentando conectar con Ollama en:', OLLAMA_CONFIG.endpoint);
            console.log('📦 Modelo:', OLLAMA_CONFIG.model);

            const response = await fetch(OLLAMA_CONFIG.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: OLLAMA_CONFIG.model,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userMessage }
                    ],
                    stream: false,
                    options: {
                        temperature: OLLAMA_CONFIG.temperature,
                        num_predict: OLLAMA_CONFIG.num_predict
                    }
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Error en Ollama API:', response.status, response.statusText);
                console.error('📄 Detalles:', errorText);
                console.log('💡 Asegúrate de que:');
                console.log('   1. Ollama esté corriendo: ollama serve');
                console.log('   2. El modelo esté instalado: ollama pull llama3.2');
                console.log('   3. El nombre del modelo sea correcto:', OLLAMA_CONFIG.model);
                return null; // Usar fallback
            }

            const data = await response.json();
            console.log('✅ Respuesta recibida de Ollama:', data);
            
            // La API de Ollama puede devolver la respuesta en diferentes formatos
            if (data.message && data.message.content) {
                console.log('✅ Respuesta extraída correctamente');
                return data.message.content.trim();
            }
            
            // Formato alternativo (algunas versiones de Ollama)
            if (data.response) {
                console.log('✅ Respuesta encontrada en formato alternativo');
                return data.response.trim();
            }

            console.warn('⚠️ Formato de respuesta no reconocido:', data);
            return null; // Usar fallback
        } catch (error) {
            console.error('❌ Error llamando a Ollama API local:', error);
            console.error('📋 Tipo de error:', error.name);
            console.error('📋 Mensaje:', error.message);
            
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                console.log('💡 Problema de conexión. Verifica que:');
                console.log('   1. Ollama esté corriendo: ollama serve');
                console.log('   2. La URL sea correcta: http://localhost:11434');
                console.log('   3. No haya problemas de CORS (si usas file://, usa un servidor local)');
            }
            
            return null; // Usar fallback
        }
    }

    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }

    function initChatbot() {
        console.log('🤖 Inicializando chatbot...');
        
        // Cargar Font Awesome si no está presente
        if (!document.querySelector('link[href*="font-awesome"]')) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            document.head.appendChild(link);
        }

        // Crear el widget
        createChatWidget();
    }

    function createChatWidget() {
        // HTML del chatbot - Diseño minimalista
        var chatHTML = '<div id="chatbot-widget" style="position:fixed!important;bottom:24px!important;right:24px!important;z-index:999999!important;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,\'Helvetica Neue\',Arial,sans-serif!important">' +
            '<button id="chatbot-toggle" style="width:64px!important;height:64px!important;background:white!important;color:#1a2332!important;border:none!important;border-radius:50%!important;box-shadow:0 4px 12px rgba(0,0,0,0.15),0 0 1px rgba(0,0,0,0.1)!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;font-size:26px!important;padding:0!important;margin:0!important;transition:all 0.3s ease!important">' +
            '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>' +
            '</button>' +
            '<div id="chatbot-window" style="display:none!important;position:absolute!important;bottom:80px!important;right:0!important;width:380px!important;max-width:calc(100vw - 32px)!important;height:600px!important;max-height:calc(100vh - 120px)!important;background:#1a2332!important;border-radius:16px!important;box-shadow:0 12px 48px rgba(0,0,0,0.3),0 0 1px rgba(0,0,0,0.2)!important;overflow:hidden!important;flex-direction:column!important">' +
            '<div style="background:#1a2332!important;color:white!important;padding:20px!important;display:flex!important;align-items:flex-start!important;justify-content:space-between!important;border-bottom:1px solid rgba(255,255,255,0.1)!important">' +
            '<div style="flex:1!important">' +
            '<div style="font-weight:600!important;font-size:16px!important;margin-bottom:4px!important">webDevPR Assistant</div>' +
            '<div style="font-size:13px!important;opacity:0.7!important;display:flex!important;align-items:center!important;gap:6px!important">' +
            '<span style="width:8px!important;height:8px!important;background:#10b981!important;border-radius:50%!important;display:inline-block!important"></span>' +
            'En línea • Empresa Nueva' +
            '</div></div>' +
            '<button id="chatbot-close" style="background:none!important;border:none!important;color:white!important;cursor:pointer!important;padding:4px!important;font-size:20px!important;opacity:0.7!important;transition:opacity 0.2s!important;line-height:1!important">×</button>' +
            '</div>' +
            '<div id="chatbot-messages" style="flex:1!important;overflow-y:auto!important;padding:20px!important;background:#1a2332!important"></div>' +
            '<div style="padding:16px!important;background:#1a2332!important;border-top:1px solid rgba(255,255,255,0.1)!important">' +
            '<div style="display:flex!important;gap:8px!important;align-items:center!important">' +
            '<input type="text" id="chatbot-input" style="flex:1!important;padding:12px 16px!important;border:1px solid rgba(255,255,255,0.15)!important;border-radius:24px!important;font-size:14px!important;outline:none!important;background:#2a3441!important;color:white!important" placeholder="Escribe tu pregunta...">' +
            '<button id="chatbot-send" style="background:#667eea!important;color:white!important;border:none!important;border-radius:50%!important;width:40px!important;height:40px!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;transition:background 0.2s!important;flex-shrink:0!important"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button>' +
            '</div></div></div></div>';

        // Agregar al body
        var container = document.createElement('div');
        container.innerHTML = chatHTML;
        document.body.appendChild(container);

        console.log('✅ Widget creado');

        // Configurar event listeners
        setupEventListeners();
        
        // Agregar estilos para scrollbar personalizado
        var style = document.createElement('style');
        style.textContent = '#chatbot-messages::-webkit-scrollbar{width:6px}#chatbot-messages::-webkit-scrollbar-track{background:rgba(255,255,255,0.05)}#chatbot-messages::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.2);border-radius:3px}#chatbot-messages::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,0.3)}';
        document.head.appendChild(style);
    }

    function setupEventListeners() {
        var toggle = document.getElementById('chatbot-toggle');
        var close = document.getElementById('chatbot-close');
        var window = document.getElementById('chatbot-window');
        var input = document.getElementById('chatbot-input');
        var send = document.getElementById('chatbot-send');

        if (toggle && window) {
            // Efectos hover para el botón flotante
            toggle.onmouseover = function() {
                this.style.transform = 'scale(1.08)!important';
                this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)!important';
            };
            toggle.onmouseout = function() {
                this.style.transform = 'scale(1)!important';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15),0 0 1px rgba(0,0,0,0.1)!important';
            };
            
            toggle.onclick = function() {
                var currentDisplay = window.style.display;
                var isVisible = currentDisplay === 'flex' || currentDisplay === 'flex !important' || currentDisplay.includes('flex');
                
                if (isVisible) {
                    window.style.cssText = window.style.cssText.replace(/display\s*:\s*[^;]+/gi, 'display:none!important');
                } else {
                    window.style.cssText = window.style.cssText.replace(/display\s*:\s*[^;]+/gi, 'display:flex!important');
                    
                    // Si se abre por primera vez y no hay mensajes, mostrar mensaje de bienvenida
                    var messages = document.getElementById('chatbot-messages');
                    if (messages && messages.children.length === 0) {
                        setTimeout(function() {
                            addMessage('bot', '¡Hola! 👋 Soy el asistente virtual de webDevPR. Somos una empresa nueva en Puerto Rico especializada en desarrollo web moderno. Estoy aquí para ayudarte con información sobre nuestros servicios. ¿En qué puedo asistirte hoy?', true);
                        }, 300);
                    }
                    if (input) input.focus();
                }
            };
        }

        if (close && window) {
            close.onmouseover = function() {
                this.style.opacity = '1!important';
            };
            close.onmouseout = function() {
                this.style.opacity = '0.7!important';
            };
            close.onclick = function() {
                window.style.cssText = window.style.cssText.replace(/display\s*:\s*[^;]+/gi, 'display:none!important');
            };
        }

        if (input && send) {
            // Efectos hover para el botón de enviar
            send.onmouseover = function() {
                this.style.background = '#5568d3!important';
                this.style.transform = 'scale(1.05)!important';
            };
            send.onmouseout = function() {
                this.style.background = '#667eea!important';
                this.style.transform = 'scale(1)!important';
            };
            
            var sendMessage = function() {
                var message = input.value.trim();
                if (message) {
                    handleUserMessage(message);
                    input.value = '';
                }
            };

            send.onclick = sendMessage;
            input.onkeypress = function(e) {
                if (e.key === 'Enter') sendMessage();
            };
            
            // Efecto focus en input
            input.onfocus = function() {
                this.style.borderColor = 'rgba(102,126,234,0.5)!important';
            };
            input.onblur = function() {
                this.style.borderColor = 'rgba(255,255,255,0.15)!important';
            };
        }

        console.log('✅ Event listeners configurados');
    }

    function addMessage(sender, text, showButtons) {
        var messages = document.getElementById('chatbot-messages');
        if (!messages) return;

        var messageDiv = document.createElement('div');
        messageDiv.style.cssText = 'margin:0 0 16px 0!important;display:flex!important;justify-content:' + 
            (sender === 'user' ? 'flex-end' : 'flex-start') + '!important;flex-direction:column!important;align-items:' +
            (sender === 'user' ? 'flex-end' : 'flex-start') + '!important';

        var bubble = document.createElement('div');
        bubble.style.cssText = 'max-width:85%!important;padding:14px 18px!important;border-radius:18px!important;' +
            (sender === 'user' 
                ? 'background:#667eea!important;color:white!important;border-bottom-right-radius:4px!important;font-size:14px!important;line-height:1.5!important'
                : 'background:white!important;color:#1a2332!important;border-bottom-left-radius:4px!important;font-size:14px!important;line-height:1.6!important;box-shadow:0 2px 8px rgba(0,0,0,0.08)!important') +
            ';white-space:pre-wrap!important;word-wrap:break-word!important';

        bubble.textContent = text;
        messageDiv.appendChild(bubble);

        // Agregar botones de respuesta rápida si es mensaje del bot
        if (sender === 'bot' && showButtons !== false) {
            var buttonsContainer = document.createElement('div');
            buttonsContainer.style.cssText = 'display:flex!important;flex-wrap:wrap!important;gap:8px!important;margin-top:12px!important;max-width:85%!important';
            
            var buttons = getQuickButtons(text);
            buttons.forEach(function(btn) {
                var button = document.createElement('button');
                button.textContent = btn.text;
                button.style.cssText = 'background:white!important;border:none!important;' +
                    'color:#1a2332!important;padding:10px 16px!important;border-radius:16px!important;' +
                    'cursor:pointer!important;font-size:13px!important;font-weight:500!important;transition:all 0.2s!important;white-space:nowrap!important;' +
                    'box-shadow:0 2px 8px rgba(0,0,0,0.08)!important';
                
                button.onmouseover = function() {
                    this.style.background = '#667eea!important';
                    this.style.color = 'white!important';
                    this.style.transform = 'translateY(-1px)!important';
                    this.style.boxShadow = '0 4px 12px rgba(102,126,234,0.3)!important';
                };
                button.onmouseout = function() {
                    this.style.background = 'white!important';
                    this.style.color = '#1a2332!important';
                    this.style.transform = 'translateY(0)!important';
                    this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)!important';
                };
                button.onclick = function() {
                    handleUserMessage(btn.value || btn.text);
                    // Remover todos los botones de respuesta después de hacer clic
                    var allButtons = document.querySelectorAll('#chatbot-messages button');
                    allButtons.forEach(function(b) { b.remove(); });
                };
                
                buttonsContainer.appendChild(button);
            });
            
            if (buttons.length > 0) {
                messageDiv.appendChild(buttonsContainer);
            }
        }

        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    function getQuickButtons(messageText) {
        var msg = messageText.toLowerCase();
        
        // Mensaje de bienvenida
        if (msg.includes('empresa nueva en puerto rico') || msg.includes('asistente virtual de webdevpr')) {
            return [];
        }
        
        // Otros mensajes de bienvenida
        if (msg.includes('bienvenido') || msg.includes('asistente virtual y puedo ayudarte')) {
            return [
                { text: '💰 Ver Precios', value: '¿Cuánto cuesta un sitio web?' },
                { text: '🚀 Servicios', value: '¿Qué servicios ofrecen?' },
                { text: '📅 Agendar', value: 'Agendar consulta' },
                { text: '📞 Contacto', value: 'Información de contacto' }
            ];
        }
        
        // Respuesta de precios
        if (msg.includes('rangos de precios') || msg.includes('sitio web básico')) {
            return [
                { text: '🛍️ E-commerce', value: 'Quiero una tienda online' },
                { text: '📱 App Móvil', value: '¿Hacen apps móviles?' },
                { text: '📅 Consulta', value: 'Agendar consulta gratuita' },
                { text: '⏱️ Tiempos', value: '¿Cuánto tiempo tarda?' }
            ];
        }
        
        // Servicios
        if (msg.includes('nuestros servicios') || msg.includes('desarrollo web') || msg.includes('servicios de desarrollo')) {
            return [
                { text: 'Sitios web corporativos', value: 'Sitios web corporativos' },
                { text: 'Tiendas en línea (E-commerce)', value: 'Tiendas en línea' },
                { text: 'Aplicaciones web personalizadas', value: 'Aplicaciones web personalizadas' },
                { text: 'Diseño UI/UX profesional', value: 'Diseño UI/UX' },
                { text: 'Optimización SEO', value: 'Optimización SEO' }
            ];
        }
        
        // E-commerce
        if (msg.includes('e-commerce completo') || msg.includes('catálogo de productos')) {
            return [
                { text: '⏱️ Tiempo desarrollo', value: '¿Cuánto tarda un e-commerce?' },
                { text: '💳 Métodos pago', value: '¿Qué métodos de pago aceptan?' },
                { text: '📅 Consulta', value: 'Quiero agendar una consulta' },
                { text: '🎨 Ver ejemplos', value: 'Mostrar portfolio' }
            ];
        }
        
        // Apps móviles
        if (msg.includes('apps móviles') || msg.includes('ios') && msg.includes('android')) {
            return [
                { text: '💰 Precio exacto', value: '¿Cuánto cuesta una app?' },
                { text: '⏱️ Tiempo', value: '¿Cuánto tarda una app?' },
                { text: '🛠️ Tecnologías', value: '¿Qué tecnologías usan?' },
                { text: '📅 Consulta', value: 'Agendar consulta' }
            ];
        }
        
        // Tiempos
        if (msg.includes('tiempos de desarrollo') || msg.includes('semana')) {
            return [
                { text: '💰 Ver Precios', value: 'Precios' },
                { text: '⚡ Urgente', value: '¿Tienen servicio urgente?' },
                { text: '📅 Agendar', value: 'Agendar consulta' },
                { text: '🚀 Servicios', value: 'Ver servicios' }
            ];
        }
        
        // Contacto
        if (msg.includes('información de contacto') || msg.includes('teléfono')) {
            return [
                { text: '📅 Agendar Consulta', value: 'Quiero agendar una consulta' },
                { text: '💬 WhatsApp', value: 'Contactar por WhatsApp' },
                { text: '✉️ Email', value: 'Enviar email' },
                { text: '🚀 Ver Servicios', value: 'Servicios' }
            ];
        }
        
        // Agendar
        if (msg.includes('agendar consulta') || msg.includes('opciones disponibles')) {
            return [
                { text: '📝 Formulario', value: 'Formulario online' },
                { text: '☎️ Llamar', value: 'Llamar por teléfono' },
                { text: '💬 WhatsApp', value: 'WhatsApp' },
                { text: '✉️ Email', value: 'Enviar email' }
            ];
        }
        
        // Portfolio
        if (msg.includes('portfolio') || msg.includes('tiendapr.com')) {
            return [
                { text: '💰 Precios', value: 'Ver precios' },
                { text: '📅 Consulta', value: 'Agendar consulta' },
                { text: '⏱️ Tiempos', value: 'Tiempo de desarrollo' },
                { text: '🚀 Servicios', value: 'Ver servicios' }
            ];
        }
        
        // Tecnologías
        if (msg.includes('tecnologías') || msg.includes('react') || msg.includes('node')) {
            return [
                { text: '💰 Precios', value: 'Ver precios' },
                { text: '⏱️ Tiempos', value: 'Cuánto tarda' },
                { text: '📅 Consulta', value: 'Agendar consulta' },
                { text: '🎨 Portfolio', value: 'Ver trabajos' }
            ];
        }
        
        // Mantenimiento
        if (msg.includes('planes de mantenimiento') || msg.includes('básico') && msg.includes('mes')) {
            return [
                { text: '💰 Otros precios', value: 'Ver todos los precios' },
                { text: '📅 Contratar', value: 'Quiero contratar mantenimiento' },
                { text: '❓ Más info', value: '¿Qué incluye el mantenimiento?' },
                { text: '🏠 Inicio', value: 'Volver al inicio' }
            ];
        }
        
        // SEO/Marketing
        if (msg.includes('seo') || msg.includes('marketing digital')) {
            return [
                { text: '💰 Desarrollo Web', value: 'Precios sitios web' },
                { text: '📅 Consulta', value: 'Agendar consulta' },
                { text: '📊 Resultados', value: '¿Qué resultados puedo esperar?' },
                { text: '🏠 Inicio', value: 'Volver al inicio' }
            ];
        }
        
        // Garantías
        if (msg.includes('garantías') || msg.includes('satisfacción')) {
            return [
                { text: '💰 Ver Precios', value: 'Precios' },
                { text: '📅 Agendar', value: 'Agendar consulta' },
                { text: '🚀 Servicios', value: 'Ver servicios' },
                { text: '🏠 Inicio', value: 'Hola' }
            ];
        }
        
        // Respuesta por defecto
        if (msg.includes('gracias por tu mensaje') || msg.includes('en qué puedo ayudarte')) {
            return [
                { text: '💰 Precios', value: 'Ver precios' },
                { text: '🚀 Servicios', value: 'Ver servicios' },
                { text: '📅 Agendar', value: 'Agendar consulta' },
                { text: '📞 Contacto', value: 'Información de contacto' }
            ];
        }
        
        // Ayuda
        if (msg.includes('en qué puedo ayudarte') || msg.includes('escribe sobre')) {
            return [
                { text: '💰 Precios', value: 'Precios' },
                { text: '🚀 Servicios', value: 'Servicios' },
                { text: '⏱️ Tiempos', value: 'Tiempos' },
                { text: '📅 Agendar', value: 'Agendar' },
                { text: '📞 Contacto', value: 'Contacto' },
                { text: '🎨 Portfolio', value: 'Portfolio' }
            ];
        }
        
        // Botones genéricos para cualquier respuesta
        return [
            { text: '❓ Más info', value: 'Más información' },
            { text: '📅 Agendar', value: 'Agendar consulta' },
            { text: '🏠 Inicio', value: 'Hola' }
        ];
    }

    async function handleUserMessage(message) {
        addMessage('user', message, false);
        
        // Guardar conversación en localStorage para el panel admin
        saveConversation(message, 'user');
        
        // Intentar usar Ollama local primero
        var ollamaResponse = await getOllamaResponse(message);
        
        if (ollamaResponse) {
            // Usar respuesta de Ollama (Llama 3.2 local)
            setTimeout(function() {
                addMessage('bot', ollamaResponse, true);
                saveConversation(ollamaResponse, 'bot');
            }, 300);
        } else {
            // Usar respuestas predefinidas como fallback
            setTimeout(function() {
                var response = findResponse(message.toLowerCase());
                addMessage('bot', response, true);
                saveConversation(response, 'bot');
            }, 500 + Math.random() * 1000);
        }
    }

    function saveConversation(message, sender) {
        try {
            var conversations = JSON.parse(localStorage.getItem('chatbot_conversations') || '[]');
            conversations.push({
                message: message,
                sender: sender,
                timestamp: new Date().toISOString(),
                date: new Date().toLocaleDateString('es-PR'),
                time: new Date().toLocaleTimeString('es-PR', { hour: '2-digit', minute: '2-digit' })
            });
            
            // Mantener solo las últimas 100 conversaciones
            if (conversations.length > 100) {
                conversations = conversations.slice(-100);
            }
            
            localStorage.setItem('chatbot_conversations', JSON.stringify(conversations));
            
            // Actualizar estadísticas
            updateStats(message, sender);
        } catch (e) {
            console.error('Error guardando conversación:', e);
        }
    }

    function updateStats(message, sender) {
        try {
            var stats = JSON.parse(localStorage.getItem('chatbot_stats') || '{"totalMessages":0,"userMessages":0,"botMessages":0,"sessionsToday":0,"lastUpdate":""}');
            
            stats.totalMessages++;
            if (sender === 'user') {
                stats.userMessages++;
            } else {
                stats.botMessages++;
            }
            
            var today = new Date().toLocaleDateString('es-PR');
            if (stats.lastUpdate !== today) {
                stats.sessionsToday = 1;
                stats.lastUpdate = today;
            }
            
            localStorage.setItem('chatbot_stats', JSON.stringify(stats));
        } catch (e) {
            console.error('Error actualizando stats:', e);
        }
    }

    function findResponse(message) {
        // Saludos
        if (/hola|buenos|buenas|saludos|hey|hi/i.test(message)) {
            return '¡Hola! 👋 Bienvenido a webDevPR.\n\nSoy tu asistente virtual y puedo ayudarte con:\n• 💰 Información de precios\n• 🚀 Servicios disponibles\n• 📅 Agendar consultas\n• 📞 Información de contacto\n• ⏱️ Tiempos de desarrollo\n• 🎨 Ver portfolio\n\n¿En qué puedo ayudarte hoy?';
        }
        
        // Precios - Generales
        if (/precio|costo|cuanto|cuánto|valor|cotización|cotizacion|presupuesto/i.test(message)) {
            return '💰 Aquí tienes nuestros rangos de precios:\n\n📱 SITIO WEB BÁSICO: $1,000 - $3,000\n  • Hasta 5 páginas\n  • Diseño responsive\n  • Formulario de contacto\n  • SEO básico\n  • Hosting 1 año incluido\n\n💼 SITIO PROFESIONAL: $3,000 - $7,000\n  • Hasta 10 páginas\n  • Diseño personalizado\n  • Blog/Noticias\n  • SEO avanzado\n  • Panel de administración\n  • Integración redes sociales\n\n🛍️ E-COMMERCE: $5,000 - $15,000\n  • Catálogo ilimitado\n  • Carrito de compras\n  • Pasarela de pagos\n  • Gestión inventario\n  • Panel administrativo\n  • Reportes de ventas\n\n📱 APP MÓVIL: Desde $10,000\n  • iOS y/o Android\n  • Diseño nativo\n  • Backend incluido\n  • Panel de control\n  • Push notifications\n\n¿Te gustaría una cotización personalizada?';
        }
        
        // E-commerce específico
        if (/tienda|ecommerce|e-commerce|vender|shop|productos/i.test(message)) {
            return '🛍️ E-COMMERCE COMPLETO\n\n💵 Desde $5,000\n\n✅ Incluye:\n• Catálogo de productos ilimitado\n• Carrito de compras\n• Pasarela de pagos (PayPal, Stripe, ATH Móvil)\n• Gestión de inventario\n• Cupones y descuentos\n• Seguimiento de pedidos\n• Panel administrativo\n• Reportes de ventas\n• Integración con envíos\n• Email automáticos\n• Sistema de reseñas\n• Multi-idioma (opcional)\n\n⏱️ Tiempo: 6-12 semanas\n\n¿Qué tipo de productos quieres vender?';
        }
        
        // Apps móviles
        if (/app|aplicación|aplicacion|móvil|movil|android|ios|iphone/i.test(message)) {
            return '📱 DESARROLLO DE APPS MÓVILES\n\n💵 Desde $10,000\n\n🎯 Plataformas:\n• iOS (iPhone/iPad)\n• Android\n• Multiplataforma (React Native/Flutter)\n• Progressive Web App (PWA)\n\n✅ Incluye:\n• Diseño UI/UX profesional\n• Desarrollo nativo o híbrido\n• Backend/API\n• Panel de administración web\n• Push notifications\n• Integración con servicios\n• Testing completo\n• Publicación en stores\n• 3 meses de soporte\n\n⏱️ Tiempo: 8-16 semanas\n\n¿Para qué plataforma necesitas la app?';
        }
        
        // Servicios
        if (/servicio|que hace|qué hace|ofrece|trabaja|desarrolla/i.test(message)) {
            return 'Como empresa nueva, ofrecemos servicios de desarrollo web moderno:\n\n• Sitios web corporativos\n• Tiendas en línea (E-commerce)\n• Aplicaciones web personalizadas\n• Diseño UI/UX profesional\n• Optimización SEO\n\n¿Sobre cuál te gustaría saber más?';
        }
        
        // Tiempos de desarrollo
        if (/tiempo|demora|tarda|cuanto.*tiempo|cuánto.*tiempo|cuando|cuándo|plazo|duración|duracion/i.test(message)) {
            return '⏱️ TIEMPOS DE DESARROLLO:\n\n⚡ SITIO WEB BÁSICO: 2-4 semanas\n  Semana 1: Diseño y planificación\n  Semana 2-3: Desarrollo\n  Semana 4: Revisiones\n\n💼 SITIO PROFESIONAL: 4-8 semanas\n  Sem 1: Análisis y wireframes\n  Sem 2-3: Diseño UI/UX\n  Sem 4-6: Desarrollo\n  Sem 7-8: Testing y optimización\n\n🛍️ E-COMMERCE: 6-12 semanas\n  Sem 1-2: Planificación\n  Sem 3-4: Diseño\n  Sem 5-9: Desarrollo\n  Sem 10-12: Testing y lanzamiento\n\n📱 APP MÓVIL: 8-16 semanas\n  Sem 1-2: UX/UI Design\n  Sem 3-4: Prototipos\n  Sem 5-12: Desarrollo\n  Sem 13-16: Testing y publicación\n\n✅ Todos incluyen revisiones ilimitadas\n\n¿Qué tipo de proyecto tienes en mente?';
        }
        
        // Contacto
        if (/contacto|comunicar|llamar|email|correo|teléfono|telefono|whatsapp/i.test(message)) {
            return '📞 INFORMACIÓN DE CONTACTO:\n\n☎️ TELÉFONO:\n  +1 (787) 555-0123\n  Lun-Vie: 9AM - 6PM AST\n\n✉️ EMAIL:\n  info@webdevpr.com\n  Respuesta en 24h\n\n💬 WHATSAPP:\n  +1 (787) 555-0123\n  Disponible 24/7\n\n🏢 OFICINA:\n  San Juan, Puerto Rico\n  (Por cita previa)\n\n🌐 REDES SOCIALES:\n  Instagram: @webdevpr\n  LinkedIn: /webdevpr\n  Facebook: /webdevpr\n\n🚨 EMERGENCIAS (24/7):\n  +1 (787) 555-0124\n\n¿Cómo prefieres que te contactemos?';
        }
        
        // Consulta/Agendar
        if (/consulta|cita|reunión|reunion|agendar|programar|coordinar/i.test(message)) {
            return '📅 AGENDAR CONSULTA GRATUITA\n\n✅ La consulta incluye:\n• Análisis de necesidades (30 min)\n• Propuesta inicial\n• Estimación de costos\n• Cronograma del proyecto\n• Sin compromiso\n\n🎯 OPCIONES DISPONIBLES:\n\n1. 📝 FORMULARIO ONLINE\n   • Llena el formulario\n   • Respuesta en 24h\n   • Elige tu horario\n\n2. ☎️ LLAMADA DIRECTA\n   • +1 (787) 555-0123\n   • Lun-Vie 9AM-6PM\n   • Atención inmediata\n\n3. 💬 WHATSAPP\n   • +1 (787) 555-0123\n   • Disponible 24/7\n   • Respuesta rápida\n\n4. 📧 EMAIL\n   • info@webdevpr.com\n   • Detalla tu proyecto\n   • Adjunta referencias\n\n¿Qué opción te conviene más?';
        }
        
        // Portfolio/Trabajos anteriores
        if (/portafolio|portfolio|ejemplo|muestra|trabajo|proyecto.*anterior|proyecto.*previo/i.test(message)) {
            return '🎨 NUESTRO PORTFOLIO:\n\n1. 🛍️ TIENDAPR.COM\n   E-commerce completo\n   • 500+ productos\n   • PayPal + Stripe\n   • +200% en ventas\n\n2. 📱 FOODDELIVERYPR\n   App de delivery\n   • iOS y Android\n   • 50,000+ descargas\n   • GPS en tiempo real\n\n3. 💼 CONSULTORESPR.COM\n   Portal empresarial\n   • Sistema CRM\n   • Panel administrativo\n   • Reportes automáticos\n\n4. 🏥 CLINICAPR.COM\n   Portal médico\n   • Citas online\n   • Portal pacientes\n   • HIPAA compliant\n\n5. 🏨 HOTELPR.COM\n   Sistema de reservas\n   • Booking engine\n   • Pagos online\n   • Calendar sync\n\n📁 Ver portfolio completo:\nwww.webdevpr.com/portfolio\n\n¿Qué tipo de proyecto te interesa?';
        }
        
        // Tecnologías
        if (/tecnología|tecnologia|lenguaje|framework|herramienta|stack/i.test(message)) {
            return '🛠️ TECNOLOGÍAS QUE USAMOS:\n\n💻 FRONTEND:\n• React.js / Next.js\n• Vue.js / Nuxt.js\n• Angular\n• Tailwind CSS\n• TypeScript\n\n⚙️ BACKEND:\n• Node.js / Express\n• Python / Django\n• PHP / Laravel\n• .NET Core\n• Ruby on Rails\n\n📱 MOBILE:\n• React Native\n• Flutter\n• Swift (iOS)\n• Kotlin (Android)\n\n💾 BASES DE DATOS:\n• PostgreSQL\n• MongoDB\n• MySQL\n• Redis\n• Firebase\n\n☁️ CLOUD & DEVOPS:\n• AWS / Azure / GCP\n• Docker / Kubernetes\n• CI/CD (GitHub Actions)\n• Vercel / Netlify\n\n🔒 SEGURIDAD:\n• SSL/TLS\n• OAuth 2.0\n• Encryption\n• GDPR Compliant\n\n¿Tienes preferencia por alguna tecnología?';
        }
        
        // Mantenimiento
        if (/mantenimiento|soporte|actualización|actualizacion|mantener|actualizar/i.test(message)) {
            return '🔧 PLANES DE MANTENIMIENTO:\n\n📦 BÁSICO - $99/mes\n• Actualizaciones de seguridad\n• Backups semanales\n• Monitoreo básico\n• Soporte por email\n• 1h cambios/mes\n\n💼 BUSINESS - $199/mes\n• Todo lo del plan Básico\n• Backups diarios\n• Monitoreo 24/7\n• Soporte telefónico\n• 2h cambios/mes\n• Reportes mensuales\n\n🚀 PREMIUM - $399/mes\n• Todo lo del plan Business\n• Backups en tiempo real\n• Soporte prioritario\n• 5h cambios/mes\n• SEO mensual\n• Optimización continua\n• Consultoría estratégica\n\n🛡️ SOPORTE EMERGENCIA\n• Disponible 24/7\n• Respuesta < 1h\n• Línea directa\n• Resolución prioritaria\n\n¿Qué nivel de soporte necesitas?';
        }
        
        // SEO/Marketing
        if (/seo|posicionamiento|google|marketing|publicidad|ads/i.test(message)) {
            return '📈 SEO & MARKETING DIGITAL:\n\n🎯 SEO BÁSICO - $500/mes\n• Keywords research\n• Optimización on-page\n• Contenido básico (2 posts)\n• Reportes mensuales\n• Google Analytics\n\n💪 SEO AVANZADO - $1,000/mes\n• Todo lo del plan Básico\n• SEO técnico completo\n• Contenido premium (4 posts)\n• Link building\n• Local SEO\n• Google My Business\n\n🚀 MARKETING FULL - $1,500/mes\n• Todo lo del SEO Avanzado\n• Google Ads management\n• Facebook/Instagram Ads\n• Email marketing\n• Social media (3 posts/semana)\n• Analytics avanzado\n• A/B Testing\n\n📊 RESULTADOS ESPERADOS:\n• Aumento tráfico: 50-300%\n• Mejora ranking: Top 10 en 3-6 meses\n• ROI promedio: 300-500%\n\n¿Qué estrategia te interesa?';
        }
        
        // Pagos/Métodos de pago
        if (/pago|factura|cobr|método.*pago|metodo.*pago|forma.*pago/i.test(message)) {
            return '💳 MÉTODOS DE PAGO:\n\n💰 PAGOS DIRECTOS:\n• Tarjetas crédito/débito\n• PayPal\n• Transferencia bancaria\n• ATH Móvil (PR)\n• Zelle\n\n📅 PLANES DE PAGO:\n• 50% inicio / 50% entrega\n• 30% inicio / 40% desarrollo / 30% entrega\n• Pagos mensuales (proyectos grandes)\n• Sin intereses en 3 meses\n\n🏢 EMPRESAS:\n• Facturación corporativa\n• Purchase orders\n• Términos Net 30/60\n• Factura con IVU\n\n⚡ PAGOS RECURRENTES:\n• Hosting y mantenimiento\n• Cargo automático\n• Facturación mensual\n• Cancelación flexible\n\n💵 DESCUENTOS:\n• 10% pago adelantado completo\n• 5% proyectos múltiples\n• Descuentos por referidos\n\n¿Qué método prefieres?';
        }
        
        // Garantías
        if (/garantía|garantia|seguro|respaldo|calidad|devol/i.test(message)) {
            return '✅ NUESTRAS GARANTÍAS:\n\n💯 SATISFACCIÓN:\n• 30 días de garantía\n• Revisiones ilimitadas\n• Soporte post-entrega\n• Política de devolución\n\n🛡️ SEGURIDAD:\n• SSL certificado incluido\n• Backups automáticos diarios\n• Protección anti-DDoS\n• GDPR/CCPA compliant\n• Encriptación de datos\n\n📈 PERFORMANCE:\n• 99.9% uptime garantizado\n• Optimización continua\n• Monitoreo 24/7\n• Google PageSpeed 90+\n• Carga < 3 segundos\n\n🤝 COMPROMISO:\n• Contrato detallado\n• Términos claros\n• NDA disponible\n• Soporte local\n• Comunicación constante\n\n📄 CÓDIGO:\n• Código limpio y documentado\n• Estándares de industria\n• Propiedad intelectual\n• Acceso completo\n\n¿Tienes alguna preocupación específica?';
        }
        
        // Hosting/Dominio
        if (/hosting|host|dominio|servidor|alojamiento/i.test(message)) {
            return '🌐 HOSTING Y DOMINIOS:\n\n📦 INCLUIDO EN PROYECTOS:\n• 1 año de hosting gratis\n• Dominio .com gratis\n• SSL certificado\n• Email profesional (5 cuentas)\n• Backups diarios\n\n🚀 HOSTING PREMIUM:\n$19/mes después del primer año\n• Velocidad optimizada\n• 99.9% uptime\n• CDN incluido\n• Emails ilimitados\n• Soporte prioritario\n\n💼 HOSTING EMPRESARIAL:\n$49/mes\n• Servidor dedicado\n• Recursos ilimitados\n• Múltiples sitios\n• Staging environment\n• Backups en tiempo real\n\n🌍 DOMINIOS ADICIONALES:\n• .com: $15/año\n• .net/.org: $18/año\n• .pr: $35/año\n• .co: $25/año\n\n✅ Manejamos todo el proceso\n✅ Migración gratuita incluida\n\n¿Necesitas ayuda con dominio o hosting?';
        }
        
        // Diseño
        if (/diseño|design|logo|imagen|gráfico|grafico|visual|color/i.test(message)) {
            return '🎨 SERVICIOS DE DISEÑO:\n\n✨ INCLUIDO EN WEB:\n• Diseño UI/UX completo\n• Diseño responsive\n• Iconografía personalizada\n• Paleta de colores\n• Tipografía profesional\n\n🎯 BRANDING ADICIONAL:\n$500 - $2,000\n• Diseño de logo\n• Manual de marca\n• Papelería corporativa\n• Tarjetas de presentación\n• Materiales marketing\n\n📱 DISEÑO APP:\n$1,500 - $3,000\n• Wireframes\n• Mockups alta fidelidad\n• Prototipos interactivos\n• Icon design\n• Splash screens\n\n📄 DISEÑO GRÁFICO:\n$50/hora\n• Flyers y brochures\n• Banners web\n• Posts redes sociales\n• Infografías\n• Presentaciones\n\n🖼️ REDISEÑO:\n30% del costo original\n• Modernización UI\n• Mejora UX\n• Responsive design\n• Optimización visual\n\n¿Qué tipo de diseño necesitas?';
        }
        
        // Migración/Rediseño
        if (/migra|redeseñ|redisen|cambiar.*sitio|mover.*sitio|actualizar.*sitio/i.test(message)) {
            return '🔄 MIGRACIÓN Y REDISEÑO:\n\n🆕 REDISEÑO COMPLETO:\n$2,000 - $5,000\n• Análisis sitio actual\n• Diseño moderno\n• Mejora UX/UI\n• Optimización SEO\n• Responsive design\n• Mantenimiento SEO rankings\n\n📦 MIGRACIÓN:\n$500 - $1,500\n• De cualquier plataforma\n• WordPress, Wix, Squarespace, etc.\n• Preservar SEO\n• Cero downtime\n• Testing completo\n• Redirects automáticos\n\n⚡ MODERNIZACIÓN:\n$1,000 - $3,000\n• Actualizar tecnologías\n• Mejorar velocidad\n• Mobile-first\n• Seguridad actualizada\n• Nueva funcionalidad\n\n✅ GARANTÍAS:\n• Sin pérdida de datos\n• Rankings SEO preservados\n• Soporte 30 días incluido\n• Backups completos\n\n¿Qué plataforma usas actualmente?';
        }
        
        // Urgente/Rápido
        if (/urgente|rápido|rapido|pronto|ya|inmediato/i.test(message)) {
            return '⚡ SERVICIO EXPRESS:\n\n🚨 PROYECTOS URGENTES:\n+50% del costo base\n• Prioridad máxima\n• Equipo dedicado\n• Entregas aceleradas\n\n⏱️ TIEMPOS EXPRESS:\n• Landing page: 3-5 días\n• Sitio básico: 1-2 semanas\n• Sitio profesional: 2-4 semanas\n• E-commerce: 4-6 semanas\n\n🛠️ SOPORTE URGENTE:\n$150/hora\n• Disponible 24/7\n• Respuesta inmediata\n• Resolución prioritaria\n• Línea directa\n\n📞 CONTACTO URGENTE:\n• Tel: +1 (787) 555-0124\n• WhatsApp: +1 (787) 555-0123\n• Email: urgente@webdevpr.com\n\n¿Cuál es tu deadline?';
        }
        
        // Gracias
        if (/gracias|thank|excelente|perfecto|bien|ok|genial/i.test(message)) {
            return '¡De nada! 😊 Encantado de ayudarte.\n\n¿Hay algo más que quieras saber sobre:\n• Otros servicios\n• Detalles de precios\n• Agendar una consulta\n• Ejemplos de trabajos\n\nEstoy aquí para lo que necesites. 👍';
        }
        
        // Despedidas
        if (/adiós|adios|chao|bye|hasta.*luego|nos.*vemos/i.test(message)) {
            return '¡Hasta pronto! 👋\n\nRecuerda que puedes:\n📞 Llamarnos: +1 (787) 555-0123\n✉️ Email: info@webdevpr.com\n💬 WhatsApp 24/7\n📅 Agendar consulta gratuita\n\n¡Que tengas un excelente día!\nEstaremos encantados de ayudarte con tu proyecto. 😊';
        }
        
        // Ayuda
        if (/ayuda|help|opciones|menu|menú/i.test(message)) {
            return '🆘 ¿EN QUÉ PUEDO AYUDARTE?\n\nEscribe sobre:\n\n💰 PRECIOS\n  "¿Cuánto cuesta un sitio web?"\n  "Precios de e-commerce"\n\n🚀 SERVICIOS\n  "¿Qué servicios ofrecen?"\n  "Desarrollo de apps"\n\n⏱️ TIEMPOS\n  "¿Cuánto tarda?"\n  "Tiempo de desarrollo"\n\n📅 AGENDAR\n  "Agendar consulta"\n  "Quiero una reunión"\n\n📞 CONTACTO\n  "Información de contacto"\n  "Cómo llamarlos"\n\n🎨 PORTFOLIO\n  "Mostrar trabajos"\n  "Ejemplos de proyectos"\n\nEscribe tu pregunta y te ayudaré. 😊';
        }
        
        // Respuesta por defecto mejorada
        return '💭 Gracias por tu mensaje.\n\nPara ayudarte mejor, ¿tu consulta es sobre:\n\n💰 Precios y cotizaciones\n🚀 Servicios disponibles\n📅 Agendar una consulta\n⏱️ Tiempos de desarrollo\n📞 Información de contacto\n🎨 Ver portfolio\n🔧 Soporte técnico\n\nTambién puedes escribir "ayuda" para ver todas las opciones.\n\n¿En qué puedo ayudarte específicamente?';
    }

    console.log('✅ Chatbot script cargado');
})();