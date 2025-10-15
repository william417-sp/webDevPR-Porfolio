// Simulación de base de datos de tickets de soporte
let tickets = JSON.parse(localStorage.getItem('support_tickets')) || [];

// Función para crear un ticket de soporte
function createTicket(ticketData) {
    const newTicket = {
        id: Date.now().toString(),
        userId: ticketData.userId,
        projectId: ticketData.projectId,
        number: generateTicketNumber(),
        subject: ticketData.subject,
        description: ticketData.description,
        priority: ticketData.priority || 'medium', // low, medium, high, urgent
        status: 'open', // open, in_progress, resolved, closed
        category: ticketData.category || 'general',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        assignedTo: null,
        messages: [],
        attachments: ticketData.attachments || []
    };

    tickets.push(newTicket);
    localStorage.setItem('support_tickets', JSON.stringify(tickets));

    // Notificar al equipo de soporte (en un entorno real)
    window.messagesService.createNotification({
        userId: 'support_team',
        type: 'new_ticket',
        title: 'Nuevo Ticket de Soporte',
        description: `Nuevo ticket #${newTicket.number}: ${newTicket.subject}`,
        relatedId: newTicket.id
    });

    return newTicket;
}

// Función para obtener tickets de un usuario
function getUserTickets(userId) {
    return tickets.filter(ticket => ticket.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Función para obtener tickets de un proyecto
function getProjectTickets(projectId) {
    return tickets.filter(ticket => ticket.projectId === projectId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Función para actualizar un ticket
function updateTicket(ticketId, updates) {
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) throw new Error('Ticket no encontrado');

    Object.assign(ticket, updates, {
        updatedAt: new Date().toISOString()
    });

    localStorage.setItem('support_tickets', JSON.stringify(tickets));

    // Notificar al usuario
    window.messagesService.createNotification({
        userId: ticket.userId,
        type: 'ticket_updated',
        title: 'Ticket Actualizado',
        description: `El ticket #${ticket.number} ha sido actualizado`,
        relatedId: ticket.id
    });

    return ticket;
}

// Función para agregar mensaje a un ticket
function addTicketMessage(ticketId, messageData) {
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) throw new Error('Ticket no encontrado');

    const newMessage = {
        id: Date.now().toString(),
        userId: messageData.userId,
        content: messageData.content,
        attachments: messageData.attachments || [],
        createdAt: new Date().toISOString()
    };

    ticket.messages.push(newMessage);
    ticket.updatedAt = new Date().toISOString();

    localStorage.setItem('support_tickets', JSON.stringify(tickets));

    // Notificar a todos los involucrados
    const notifyUsers = [ticket.userId];
    if (ticket.assignedTo) notifyUsers.push(ticket.assignedTo);

    notifyUsers.forEach(userId => {
        if (userId !== messageData.userId) {
            window.messagesService.createNotification({
                userId: userId,
                type: 'ticket_message',
                title: 'Nuevo Mensaje en Ticket',
                description: `Nuevo mensaje en ticket #${ticket.number}`,
                relatedId: ticket.id
            });
        }
    });

    return newMessage;
}

// Función para cerrar un ticket
function closeTicket(ticketId, resolution) {
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) throw new Error('Ticket no encontrado');

    ticket.status = 'closed';
    ticket.resolution = resolution;
    ticket.closedAt = new Date().toISOString();
    ticket.updatedAt = new Date().toISOString();

    localStorage.setItem('support_tickets', JSON.stringify(tickets));

    // Notificar al usuario
    window.messagesService.createNotification({
        userId: ticket.userId,
        type: 'ticket_closed',
        title: 'Ticket Cerrado',
        description: `El ticket #${ticket.number} ha sido cerrado`,
        relatedId: ticket.id
    });

    return ticket;
}

// Función para obtener estadísticas de tickets
function getTicketStats(userId) {
    const userTickets = getUserTickets(userId);
    return {
        totalTickets: userTickets.length,
        byStatus: userTickets.reduce((acc, ticket) => {
            acc[ticket.status] = (acc[ticket.status] || 0) + 1;
            return acc;
        }, {}),
        byPriority: userTickets.reduce((acc, ticket) => {
            acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
            return acc;
        }, {}),
        averageResponseTime: calculateAverageResponseTime(userTickets),
        resolutionRate: calculateResolutionRate(userTickets)
    };
}

// Funciones auxiliares
function generateTicketNumber() {
    const prefix = 'TKT';
    const year = new Date().getFullYear().toString().substr(-2);
    const sequence = (tickets.length + 1).toString().padStart(4, '0');
    return `${prefix}-${year}${sequence}`;
}

function calculateAverageResponseTime(tickets) {
    const responseTimes = tickets
        .filter(t => t.messages.length > 1)
        .map(t => {
            const firstMessage = new Date(t.createdAt);
            const firstResponse = new Date(t.messages[1].createdAt);
            return firstResponse - firstMessage;
        });

    if (responseTimes.length === 0) return 0;
    return responseTimes.reduce((acc, time) => acc + time, 0) / responseTimes.length;
}

function calculateResolutionRate(tickets) {
    const closedTickets = tickets.filter(t => t.status === 'closed').length;
    return tickets.length > 0 ? (closedTickets / tickets.length) * 100 : 0;
}

// Exportar funciones
window.supportService = {
    createTicket,
    getUserTickets,
    getProjectTickets,
    updateTicket,
    addTicketMessage,
    closeTicket,
    getTicketStats
};
