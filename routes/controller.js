const express = require("express");
const router = express.Router();
const tasksController = require("../controller/tasks");

// Routes pour les tâches
router.get("/tasks", tasksController.getTasks); // Récupérer toutes les tâches
router.get("/tasks/:id", tasksController.getTask); // Récupérer une tâche par ID
router.post("/tasks", tasksController.addTask); // Ajouter une nouvelle tâche
router.put("/tasks/:id", tasksController.updateTask); // Mettre à jour une tâche par ID
router.delete("/tasks/:id", tasksController.deleteTask); // Supprimer une tâche par ID

// Routes avancées pour les statuts
router.get("/tasks/status/:status", tasksController.getTasksByStatus); // Récupérer les tâches par statut
router.patch("/tasks/:id/status", tasksController.changeStatus); // Changer le statut d'une tâche
router.patch("/tasks/:id/finish", tasksController.finishTask); // Marquer une tâche comme terminée
router.patch("/tasks/:id/inprogress", tasksController.inProgressTask); // Marquer une tâche comme en cours
router.patch("/tasks/:id/todo", tasksController.toDoTask); // Marquer une tâche comme à faire

module.exports = router;
