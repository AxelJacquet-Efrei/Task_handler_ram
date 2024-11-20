const {
    getTasks,
    saveTasks,
    modifyTaskName,
    modifyTaskDescription,
    modifyTaskStartDate,
    modifyTaskEndDate,
    modifyTaskStatus,
    getTaskById,
    deleteTask,
    getTasksByName,
} = require('../model/tasks');

// **Fonctions du contrôleur**

exports.getTasks = (req, res) => {
    const tasks = getTasks();
    res.json(tasks);
};

exports.getTask = (req, res) => {
    const { id } = req.params;
    const tasks = getTasks();
    const task = getTaskById(tasks, id);
    if (!task) {
        return res.status(404).json({ error: "Tâche introuvable" });
    }
    res.json(task);
};

exports.addTask = (req, res) => {
    const { name, description, startDate, endDate, status } = req.body;
    if (!name || !description || !startDate || !endDate || !status) {
        return res.status(400).json({ error: "Données manquantes pour créer une tâche" });
    }
    const tasks = getTasks();
    const id = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1; // Générer un nouvel ID basé sur la longueur des tâches
    const newTask = { id, name, description, startDate, endDate, status };
    tasks.push(newTask);
    saveTasks(tasks);
    res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { name, description, startDate, endDate, status } = req.body;
    const tasks = getTasks();
    const task = getTaskById(tasks, id);
    if (!task) {
        return res.status(404).json({ error: "Tâche introuvable" });
    }

    // Mise à jour des propriétés de la tâche
    if (name) modifyTaskName(tasks, id, name);
    if (description) modifyTaskDescription(tasks, id, description);
    if (startDate) modifyTaskStartDate(tasks, id, startDate);
    if (endDate) modifyTaskEndDate(tasks, id, endDate);
    if (status) modifyTaskStatus(tasks, id, status);

    saveTasks(tasks);
    res.json(getTaskById(tasks, id));
};

exports.deleteTask = (req, res) => {
    const { id } = req.params; // Récupérer l'ID de la tâche à supprimer
    const tasks = taskModel.getTasks(); // Obtenir la liste actuelle des tâches

    // Parcourir les tâches pour trouver celle à supprimer
    let taskIndex = -1;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) { // Comparer l'ID (en tant que nombre)
            taskIndex = i;
            break;
        }
    }

    if (taskIndex === -1) {
        // Si l'index est toujours -1, la tâche n'a pas été trouvée
        return res.status(404).send('Tâche introuvable');
    }

    // Sauvegarder les tâches mises à jour
    deleteTask(tasks,taskIndex)

};


exports.getTasksByStatus = (req, res) => {
    const { status } = req.query;
    const tasks = getTasks();
    const filteredTasks = tasks.filter(task => task.status === status);
    res.json(filteredTasks);
};

exports.changeStatus = (req, res) => {
    const { id } = req.params;
    const { status, endDate } = req.body;
    const tasks = getTasks();
    const task = getTaskById(tasks, id);
    if (!task) {
        return res.status(404).json({ error: "Tâche introuvable" });
    }

    modifyTaskStatus(tasks, id, status);
    if (endDate) modifyTaskEndDate(tasks, id, endDate);
    
    saveTasks(tasks);
    res.json(getTaskById(tasks, id));
};

exports.finishTask = (req, res) => {
    const { id } = req.params;
    const { endDate } = req.body;
    const tasks = getTasks();
    const task = getTaskById(tasks, id);
    if (!task) {
        return res.status(404).json({ error: "Tâche introuvable" });
    }

    modifyTaskStatus(tasks, id, "finish");
    modifyTaskEndDate(tasks, id, endDate || new Date().toISOString().split("T")[0]);

    saveTasks(tasks);
    res.json(getTaskById(tasks, id));
};

exports.inProgressTask = (req, res) => {
    const { id } = req.params;
    const tasks = getTasks();
    const task = getTaskById(tasks, id);
    if (!task) {
        return res.status(404).json({ error: "Tâche introuvable" });
    }

    modifyTaskStatus(tasks, id, "inprogress");
    saveTasks(tasks);
    res.json(getTaskById(tasks, id));
};

exports.toDoTask = (req, res) => {
    const { id } = req.params;
    const tasks = getTasks();
    const task = getTaskById(tasks, id);
    if (!task) {
        return res.status(404).json({ error: "Tâche introuvable" });
    }

    modifyTaskStatus(tasks, id, "todo");
    saveTasks(tasks);
    res.json(getTaskById(tasks, id));
};
