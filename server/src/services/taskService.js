const { readFile, writeFile } = require("./fileService");
const taskStatus = require("./utils/taskStatus.js");
const pathToFile = "task.json";
const saveChanges = (pathToFile, fileData) => {
  writeFile(pathToFile, fileData, function (error) {
    if (error) {
      console.log("*** file writing error ***");
    }
  });
};

function getAllUserTask() {
  console.log("getAllUserTask");
  const data = readFile(pathToFile);
  const arrTask = data.tasks.map((task) => {
    return task;
  });
  return arrTask;
}

function getTaskById(taskId) {
  console.log("getTaskById");
  const data = readFile(pathToFile);

  const result = data.tasks.find((task) => task.id === taskId);
  if (!!result) {
    return result;
  } else {
    return console.log("*** The task is missing in base ***");
  }
}

function getTasksByUser(userId) {
  console.log("getTasksByUser");
  const data = readFile(pathToFile);

  let result = [];
  data.tasks.filter((task) => {
    if (task.createdBy === userId) {
      result.push(task);
    }
    return result;
  });
  return result;
}

function createTask(taskObj) {
  console.log("createTask");
  const fileData = readFile(pathToFile);

  // generation ID to new task
  let maxID = 0;
  fileData.tasks.forEach((task) => {
    if (+task.id > maxID) {
      maxID = +task.id;
    }
  });
  taskObj.id = JSON.stringify(maxID + 1);

  fileData.tasks.push(taskObj);
  saveChanges(pathToFile, fileData);
}

function updateTask(taskId, taskObj) {
  console.log("updateTask");
  const fileData = readFile(pathToFile);

  const task = fileData.tasks.find((el) => el.id === taskId);
  if (!!task) {
    Object.assign(task, taskObj);
  } else {
    console.log("*** the task is missing in base ***");
    return;
  }

  saveChanges(pathToFile, fileData);
}

function deleteTask(taskId) {
  console.log("deleteTask");
  const fileData = readFile(pathToFile);

  const taskPos = fileData.tasks.findIndex((el) => {
    return +el.id === +taskId;
  });

  if (taskPos > 0) {
    fileData.tasks.splice(taskPos, 1);
  } else {
    console.log("*** task is missing in base ***");
    return;
  }

  saveChanges(pathToFile, fileData);
}

function getTaskCompleted(userId, completed) {
  const arrUserTasks = getTasksByUser(userId);
  const result = arrUserTasks.filter((task) => {
    if (completed === "true") {
      return task.status === taskStatus.open;
    } else {
      return task.status !== taskStatus.open;
    }
  });
  return result;
}

module.exports = {
  getTaskById,
  getAllUserTask,
  getTasksByUser,
  createTask,
  updateTask,
  deleteTask,
  getTaskCompleted,
};
