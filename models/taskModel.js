const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/tasks.json');

const getTasks = () => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

const modifyTaskName = (tasks, id, name) => {
    const task = tasks[id];
    task.name = name;
}

const modifyTaskDescription = (tasks, id, description) => {
    const task = tasks[id];
    task.description = description;
}

const modifyTaskStartDate = (tasks, id, startDate) => {
    const task = tasks[id];
    task.startDate = startDate;
}

const modifyTaskEndDate = (tasks, id, endDate) => {
    const task = tasks[id];
    task.endDate = endDate;
}

const modifyTaskStatus = (tasks, id, status) => {
    const task = tasks[id];
    task.status = status;
}

const getTaskById = (tasks, id) => {
    return tasks[id];
}

const getTasksByName = (tasks, name) => {
    return Object.values(tasks).filter(task => task.name === name);
}

const deleteTask = (tasks, id) => {
    delete tasks[id];
}

const saveTasks = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

module.exports = {
    getTasks,
    saveTasks,
    modifyTaskName,
    modifyTaskDescription,
    modifyTaskStartDate,
    modifyTaskEndDate,
    modifyTaskStatus,
    getTaskById,
    deleteTask,
    getTasksByName
};
