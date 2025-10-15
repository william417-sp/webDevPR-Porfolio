// Simulación de base de datos de archivos
let files = JSON.parse(localStorage.getItem('files')) || [];

// Función para subir un archivo
function uploadFile(fileData) {
    const newFile = {
        id: Date.now().toString(),
        userId: fileData.userId,
        projectId: fileData.projectId,
        name: fileData.name,
        type: fileData.type,
        size: fileData.size,
        url: fileData.url,
        uploadedAt: new Date().toISOString(),
        category: fileData.category || 'general', // general, design, development, documentation
        tags: fileData.tags || [],
        sharedWith: fileData.sharedWith || []
    };

    files.push(newFile);
    localStorage.setItem('files', JSON.stringify(files));

    // Notificar a usuarios con los que se compartió
    if (newFile.sharedWith.length > 0) {
        newFile.sharedWith.forEach(userId => {
            window.messagesService.createNotification({
                userId: userId,
                type: 'file_shared',
                title: 'Archivo Compartido',
                description: `${fileData.userName} compartió el archivo: ${fileData.name}`,
                relatedId: newFile.id
            });
        });
    }

    // Actualizar actividad del proyecto si está asociado a uno
    if (newFile.projectId) {
        window.projectsService.addProjectFile(newFile.projectId, newFile);
    }

    return newFile;
}

// Función para obtener archivos de un usuario
function getUserFiles(userId) {
    return files.filter(file => 
        file.userId === userId || file.sharedWith.includes(userId)
    ).sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
}

// Función para obtener archivos de un proyecto
function getProjectFiles(projectId) {
    return files.filter(file => file.projectId === projectId)
        .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
}

// Función para compartir un archivo
function shareFile(fileId, userIds) {
    const file = files.find(f => f.id === fileId);
    if (!file) throw new Error('Archivo no encontrado');

    file.sharedWith = [...new Set([...file.sharedWith, ...userIds])];
    localStorage.setItem('files', JSON.stringify(files));

    // Notificar a los nuevos usuarios
    userIds.forEach(userId => {
        window.messagesService.createNotification({
            userId: userId,
            type: 'file_shared',
            title: 'Archivo Compartido',
            description: `Se ha compartido contigo el archivo: ${file.name}`,
            relatedId: file.id
        });
    });

    return file;
}

// Función para eliminar un archivo
function deleteFile(fileId) {
    const index = files.findIndex(f => f.id === fileId);
    if (index === -1) throw new Error('Archivo no encontrado');

    files.splice(index, 1);
    localStorage.setItem('files', JSON.stringify(files));
}

// Función para obtener estadísticas de archivos
function getFileStats(userId) {
    const userFiles = getUserFiles(userId);
    return {
        totalFiles: userFiles.length,
        totalSize: userFiles.reduce((acc, file) => acc + file.size, 0),
        byCategory: userFiles.reduce((acc, file) => {
            acc[file.category] = (acc[file.category] || 0) + 1;
            return acc;
        }, {}),
        byType: userFiles.reduce((acc, file) => {
            acc[file.type] = (acc[file.type] || 0) + 1;
            return acc;
        }, {})
    };
}

// Exportar funciones
window.filesService = {
    uploadFile,
    getUserFiles,
    getProjectFiles,
    shareFile,
    deleteFile,
    getFileStats
};
