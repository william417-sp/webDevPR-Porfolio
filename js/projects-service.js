// Simulación de base de datos de proyectos
let projects = JSON.parse(localStorage.getItem('projects')) || [];

// Función para crear un nuevo proyecto
function createProject(projectData) {
    const newProject = {
        id: Date.now().toString(),
        userId: projectData.userId,
        name: projectData.name,
        description: projectData.description,
        type: projectData.type,
        status: 'planning', // planning, in_progress, review, completed
        progress: 0,
        startDate: new Date().toISOString(),
        dueDate: projectData.dueDate,
        budget: projectData.budget,
        features: projectData.features || [],
        files: [],
        messages: [],
        activities: [{
            type: 'project_created',
            date: new Date().toISOString(),
            description: 'Proyecto creado'
        }]
    };

    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
    return newProject;
}

// Función para obtener proyectos de un usuario
function getUserProjects(userId) {
    return projects.filter(project => project.userId === userId);
}

// Función para obtener un proyecto específico
function getProject(projectId) {
    return projects.find(project => project.id === projectId);
}

// Función para actualizar un proyecto
function updateProject(projectId, updates) {
    const index = projects.findIndex(project => project.id === projectId);
    if (index === -1) throw new Error('Proyecto no encontrado');

    const project = projects[index];
    const updatedProject = { ...project, ...updates };
    
    // Registrar actividad de actualización
    updatedProject.activities.push({
        type: 'project_updated',
        date: new Date().toISOString(),
        description: 'Proyecto actualizado'
    });

    projects[index] = updatedProject;
    localStorage.setItem('projects', JSON.stringify(projects));
    return updatedProject;
}

// Función para agregar un archivo al proyecto
function addProjectFile(projectId, file) {
    const project = getProject(projectId);
    if (!project) throw new Error('Proyecto no encontrado');

    const newFile = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        url: file.url,
        uploadedAt: new Date().toISOString()
    };

    project.files.push(newFile);
    project.activities.push({
        type: 'file_added',
        date: new Date().toISOString(),
        description: `Archivo agregado: ${file.name}`
    });

    localStorage.setItem('projects', JSON.stringify(projects));
    return newFile;
}

// Función para agregar un mensaje al proyecto
function addProjectMessage(projectId, message) {
    const project = getProject(projectId);
    if (!project) throw new Error('Proyecto no encontrado');

    const newMessage = {
        id: Date.now().toString(),
        userId: message.userId,
        content: message.content,
        createdAt: new Date().toISOString(),
        readBy: [message.userId]
    };

    project.messages.push(newMessage);
    project.activities.push({
        type: 'message_added',
        date: new Date().toISOString(),
        description: 'Nuevo mensaje agregado'
    });

    localStorage.setItem('projects', JSON.stringify(projects));
    return newMessage;
}

// Función para actualizar el progreso del proyecto
function updateProjectProgress(projectId, progress) {
    const project = getProject(projectId);
    if (!project) throw new Error('Proyecto no encontrado');

    project.progress = progress;
    if (progress === 100) {
        project.status = 'completed';
    }

    project.activities.push({
        type: 'progress_updated',
        date: new Date().toISOString(),
        description: `Progreso actualizado a ${progress}%`
    });

    localStorage.setItem('projects', JSON.stringify(projects));
    return project;
}

// Función para obtener las actividades recientes de un usuario
function getUserActivities(userId) {
    const userProjects = getUserProjects(userId);
    const activities = userProjects.flatMap(project => 
        project.activities.map(activity => ({
            ...activity,
            projectId: project.id,
            projectName: project.name
        }))
    );

    return activities.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Exportar funciones
window.projectsService = {
    createProject,
    getUserProjects,
    getProject,
    updateProject,
    addProjectFile,
    addProjectMessage,
    updateProjectProgress,
    getUserActivities
};
