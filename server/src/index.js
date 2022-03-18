const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const { base64encode, base64decode } = require("nodejs-base64");
const UserService = require("./services/userService");
const TaskService = require("./services/taskService");
const TokenService = require("./services/tokenService");
const UserException = require("./userException");
const utils = require("./services/utils/object");

const { getAllUsers, getUserById, createUser, updateUser, deleteUser, login } =
  UserService;
const {
  getTaskById,
  getAllUserTask,
  getTasksByUser,
  createTask,
  updateTask,
  deleteTask,
  getTaskCompleted,
} = TaskService;
const { pick } = utils;

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(7);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/admin/", function (req, res, next) {
  console.log("middleware url: ", req.url);
  let accessCheckNeed = true;
  req.url.split("/").find((el) => {
    if (el === "login" || el === "registration") accessCheckNeed = false;
  });
  console.log('accessCheckNeed : ', accessCheckNeed);
  // console.log("req : ", req);

  next();
});

// *** handle ADMIN userAPI ************************************************************

app.get("/api/admin/profile/users", function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  const users = UserService.getAllUsers();
  response.send(users);
});

app.get("/api/admin/profile/users/:id", function (request, response) {
  try {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
      "Access-Control-Allow-Headers",
      "origin, content-type, accept"
    );
    const result = UserService.getUserById(request.params.id);
    if (Object.keys(result).length == 0) {
      throw new UserException("*** User not found in data ***");
    }
    response.send(result);
  } catch (e) {
    response.send(e.message);
  }
});

// *** LOGIN ************************* 

app.post("/api/admin/profile/users/login", function (request, response) {
  const loginData = pick(request.body, ["email", "pwd"]);

  // check password & get new tokens
  UserService.login(loginData).then((res) => {
    if (res === "") {
      response.send(res);
    }

    res.tasks = TaskService.getTasksByUser(res.dataUser.id); //get userTasks
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
      "Access-Control-Allow-Headers",
      "origin, content-type, accept"
    );
    response.cookie("refreshToken", res.refreshToken, {
      maxAge: 2592000000,
      httpOnly: true,
    });
    response.send(res); // send userData (with tokens) & userTasks
  });
});

// *** Registration with bcryptjs ***

app.post("/api/admin/profile/users/registration", function (request, response) {
  const taskData = pick(request.body, [
    "nick",
    "lastName",
    "email",
    "pwd",
    "role",
    "profileLogo",
  ]);

  const hashPassword = bcrypt.hashSync(taskData.pwd, salt); 
  taskData.pwd = hashPassword;

  UserService.createUser(taskData).then((data) => {
    response.send(data);
  });
});

app.patch("/api/admin/profile/users/:id", function (request, response) {
  const taskData = pick(request.body, [
    "firstName",
    "lastName",
    "email",
    "pwd",
    "role",
    "profileLogo",
  ]);

  const user = UserService.updateUser(request.params.id, taskData);
  response.send(user);
});

app.delete("/api/admin/profile/users/:id", function (request, response) {
  const user = deleteUser(request.params.id);
  response.send(user);
});

// *** handle ADMIN taskAPI ***********************************

app.get("/api/admin/tasks", function (request, response) {
  const tasks = TaskService.getAllUserTask();
  response.send(tasks);
});

app.get("/api/admin/tasks/:id", function (request, response) {
  try {
    const result = TaskService.getTaskById(request.params.id);
    if (Object.keys(result).length == 0) {
      throw new UserException("*** Task not found in data ***");
    }
    response.send(result);
  } catch (e) {
    response.send(e.message);
  }
});

app.get("/api/admin/tasks/user/:userid", function (request, response) {
  try {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
      "Access-Control-Allow-Headers",
      "origin, content-type, accept"
    );
    response.setHeader("Content-Type", "application/json");
    const result = TaskService.getTasksByUser(request.params.userid);
    console.log("server : ", typeof result);
    if (Object.keys(result).length === 0) {
      console.log("*** Tasks this user is not found in data ***");
    }
    response.send(result);
  } catch (e) {
    response.send(e.message);
  }
});

//add createTask - not in base task
app.post("/api/admin/tasks/", function (request, response) {
console.log('************************ POST NEW TASK', request);

  const taskData = pick(request.body, [ 
    "title",
    "desc",
    "status",
    "createdBy",
    "createdAt",
    "assignedTo",
  ]);
  const task = TaskService.createTask(taskData);

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  response.setHeader("Content-Type", "application/json");
  response.send(task);
});

app.patch("/api/admin/tasks/:taskId", function (request, response) {
  const taskData = pick(request.body, [
    "title",
    "desc",
    "status",
    "createdBy",
    "createdAt",
    "assignedTo",
  ]);
  const task = TaskService.updateTask(request.params.taskId, taskData);
  response.send(task);
});

app.delete("/api/admin/tasks/:taskId", function (request, response) {
  const task = TaskService.deleteTask(request.params.taskId);
  response.send(task);
});

// *** handle USER userAPI ************************************************************

app.get("/api/users/profile/:id", function (request, response) {
  const user = UserService.getUserById(request.params.id);
  response.send(user);
});

app.patch("/api/users/profile/:id", function (request, response) {
  const taskData = pick(request.body, [
    "firstName",
    "lastName",
    "email",
    "pwd",
    "profileLogo",
  ]);
  const user = UserService.updateUser(request.params.id, taskData);
  response.send(user);
});

app.delete("/api/users/profile/:id", function (request, response) {
  const user = UserService.deleteUser(request.params.id);
  response.send(user);
});

// return all task with completed parameter
app.get("/api/tasks/:userid", function (request, response) {
  const tasks = TaskService.getTaskCompleted(
    request.params.userid,
    request.query.completed
  );
  response.send(tasks);
});

app.post("/api/tasks/:userid", function (request, response) {
  const task = TaskService.createTask(request.body, request.params.id);
  response.send(task);
});

app.patch("/api/tasks/:taskId", function (request, response) {
  const task = TaskService.updateTask(request.params.taskId, request.body);
  response.send(task);
});

app.delete("/api/tasks/:taskId", function (request, response) {
  const task = TaskService.deleteTask(request.params.taskId);
  response.send(task);
});

app.listen(8080, function () {
  console.log("server start on port 8080");
});
