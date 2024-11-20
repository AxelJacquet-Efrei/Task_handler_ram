const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/tasks.json');

const getTasks = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};

const modifyTaskName = (tasks, id, name) => {
    const task = tasks.find(task => task.id === id);
    task.name = name;
}

const modifyTaskDescription = (tasks, id, description) => {
    const task = tasks.find(task => task.id === id);
    task.description = description;
}

const modifyTaskStartDate = (tasks, id, startDate) => {
    const task = tasks.find(task => task.id === id);
    task.startDate = startDate;
}

const modifyTaskEndDate = (tasks, id, endDate) => {
    const task = tasks.find(task => task.id === id);
    task.endDate = endDate;
}

const modifyTaskStatus = (tasks, id, status) => {
    const task = tasks.find(task => task.id === id);
    task.status = status;
}

const getTaskById = (tasks, id) => {
    return tasks.find(task => task.id === id);
}

const getTasksByName = (tasks, name) => {
    return tasks.filter(task => task.name === name);
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
    getTasksByName
};
