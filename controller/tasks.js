const fs = require("fs");
const path = require("path");

// Chemin vers le fichier JSON des tâches
const tasksFilePath = path.join(__dirname, "../data/tasks.json");

// Fonction pour lire les tâches depuis le fichier JSON
const readTasks = () => {
    const data = fs.readFileSync(tasksFilePath, "utf-8");
    return JSON.parse(data);
};

// Fonction pour écrire dans le fichier JSON
const writeTasks = (tasks) => {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf-8");
};

// Fonction pour générer un nouvel ID
const generateNewId = (tasks) => {
    return Object.keys(tasks).length > 0
        ? Math.max(...Object.keys(tasks).map(Number)) + 1
        : 0;
};

// **Fonctions du contrôleur**

// Récupérer toutes les tâches
exports.getTasks = (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
};

// Récupérer une tâche par ID
exports.getTask = (req, res) => {
    const { id } = req.params;
    const tasks = readTasks();
    if (!tasks[id]) {
        return res.status(404).json({ error: "Tâche introuvable" });
    }
    res.json(tasks[id]);
};

// Ajouter une nouvelle tâche
exports.addTask = (req, res) => {
    const { name, description, startDate, endDate, status } = req.body;
    if (!name || !description || !startDate || !endDate || !status) {
        return res.status(400).json({ error: "Données manquantes pour créer une tâche" });
    }
    const tasks = readTasks();
    const id = generateNewId(tasks);
    tasks[id] = { name, description, startDate, endDate, status };
    writeTasks(tasks);
    res.status(201).json({ id, ...tasks[id] });
};

// Mettre à jour une tâche existante
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { name, description, startDate, endDate, status } = req.body;
    const tasks = readTasks();
    if (!tasks[id]) {
        return res.status(404).json({ error: "Tâche introuvable" });
    }
    tasks[id] = { ...tasks[id], name, description, startDate, endDate, status };
    writeTasks(tasks);
    res.json(tasks[id]);
};

// Supprimer une tâche par ID
exports.deleteTask = (req, res) => {
    const { id } = req.params;
    const tasks = readTasks();
    if (!tasks[id]) {
        return res.status(404).json({ error: "Tâche introuvable" });
    }
    delete tasks[id];
    writeTasks(tasks);
    res.json({ message: "Tâche supprimée" });
};

// Récupérer les tâches par statut
exports.getTasksByStatus = (req, res) => {
    const { status } = req.query;
    const tasks = readTasks();
    const filteredTasks = Object.entries(tasks)
        .filter(([_, task]) => task.status === status)
        .reduce((acc, [id, task]) => ({ ...acc, [id]: task }), {});
    res.json(filteredTasks);
};

// Changer le statut d'une tâche
exports.changeStatus = (req, res) => {
    const { id } = req.params;
    const { status, endDate } = req.body;
    const tasks = readTasks();
    if (!tasks[id]) {
        return res.status(404).json({ error: "Tâche introuvable" });
    }
    tasks[id].status = status;
    if (endDate) tasks[id].endDate = endDate;
    writeTasks(tasks);
    res.json(tasks[id]);
};

// Marquer une tâche comme terminée
exports.finishTask = (req, res) => {
    const { id } = req.params;
    const { endDate } = req.body;
    const tasks = readTasks();
    if (!tasks[id]) {
        return res.status(404).json({ error: "Tâche introuvable" });
    }
    tasks[id].status = "finish";
    tasks[id].endDate = endDate || new Date().toISOString().split("T")[0];
    writeTasks(tasks);
    res.json(tasks[id]);
};

// Marquer une tâche comme en cours
exports.inProgressTask = (req, res) => {
    const { id } = req.params;
    const tasks = readTasks();
    if (!tasks[id]) {
        return res.status(404).json({ error: "Tâche introuvable" });
    }
    tasks[id].status = "inprogress";
    writeTasks(tasks);
    res.json(tasks[id]);
};

// Marquer une tâche comme à faire
exports.toDoTask = (req, res) => {
    const { id } = req.params;
    const tasks = readTasks();
    if (!tasks[id]) {
        return res.status(404).json({ error: "Tâche introuvable" });
    }
    tasks[id].status = "todo";
    writeTasks(tasks);
    res.json(tasks[id]);
};
