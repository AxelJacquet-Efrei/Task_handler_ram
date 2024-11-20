const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/tasks.json');

const getTasks = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};

const saveTasks = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf-8');
};

module.exports = {
    getTasks,
    saveTasks,
};
