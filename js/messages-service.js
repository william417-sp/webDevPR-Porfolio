// Simulación de base de datos de mensajes y notificaciones
let messages = JSON.parse(localStorage.getItem('messages')) || [];
let notifications = JSON.parse(localStorage.getItem('notifications')) || [];

// Función para enviar un mensaje
function sendMessage(messageData) {
    const newMessage = {
        id: Date.now().toString(),
        senderId: messageData.senderId,
        receiverId: messageData.receiverId,
        subject: messageData.subject,
        content: messageData.content,
        createdAt: new Date().toISOString(),
        read: false,
        projectId: messageData.projectId
    };

    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));

    // Crear notificación para el receptor
    createNotification({
        userId: messageData.receiverId,
        type: 'new_message',
        title: 'Nuevo Mensaje',
        description: `Nuevo mensaje de ${messageData.senderName}: ${messageData.subject}`,
        relatedId: newMessage.id
    });

    return newMessage;
}

// Función para obtener mensajes de un usuario
function getUserMessages(userId) {
    return messages.filter(msg => 
        msg.receiverId === userId || msg.senderId === userId
    ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Función para marcar mensaje como leído
function markMessageAsRead(messageId) {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
        message.read = true;
        localStorage.setItem('messages', JSON.stringify(messages));
    }
}

// Función para crear una notificación
function createNotification(notificationData) {
    const newNotification = {
        id: Date.now().toString(),
        userId: notificationData.userId,
        type: notificationData.type,
        title: notificationData.title,
        description: notificationData.description,
        createdAt: new Date().toISOString(),
        read: false,
        relatedId: notificationData.relatedId
    };

    notifications.push(newNotification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    return newNotification;
}

// Función para obtener notificaciones de un usuario
function getUserNotifications(userId) {
    return notifications.filter(notif => 
        notif.userId === userId
    ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Función para marcar notificación como leída
function markNotificationAsRead(notificationId) {
    const notification = notifications.find(notif => notif.id === notificationId);
    if (notification) {
        notification.read = true;
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }
}

// Función para obtener conteo de mensajes no leídos
function getUnreadMessagesCount(userId) {
    return messages.filter(msg => 
        msg.receiverId === userId && !msg.read
    ).length;
}

// Función para obtener conteo de notificaciones no leídas
function getUnreadNotificationsCount(userId) {
    return notifications.filter(notif => 
        notif.userId === userId && !notif.read
    ).length;
}

// Exportar funciones
window.messagesService = {
    sendMessage,
    getUserMessages,
    markMessageAsRead,
    createNotification,
    getUserNotifications,
    markNotificationAsRead,
    getUnreadMessagesCount,
    getUnreadNotificationsCount
};
