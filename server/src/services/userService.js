const { readFile, writeFile } = require("./fileService");
const tokenService = require("./tokenService");

const bcrypt = require("bcryptjs");

const pathToFile = "user.json";

const saveChanges = (pathToFile, fileData) => {
  writeFile(pathToFile, fileData, function (error) {
    if (error) {
      console.log("*** file writing error ***");
    }
  });
};

function getAllUsers() {
  const data = readFile(pathToFile);
  const arrUsers = data.users.map((el) => {
    return el.id + " " + el.nick + " " + el.lastName;
  });

  return arrUsers;
}

function getUserById(userId) {
  console.log("getUserById");
  const data = readFile(pathToFile);
  const result = data.users.find((user) => {
    return user.id === userId;
  });
  return result;
}

async function createUser(userObj) {
  console.log(createUser);
  let res = {};

  // check
  const fileData = readFile(pathToFile);
  let inUsers = false;

  await Object.values(fileData.users).forEach((el) => {
    if (el.email === userObj.email) inUsers = true;
  });

  if (inUsers) {
    res.message = "Пользователь уже есть в базе данных";
    return res;
  }
  //

  // generation ID to new user
  let maxID = 0;
  fileData.users.forEach((user) => {
    if (+user.id > maxID) {
      maxID = +user.id;
    }
  });
  userObj.id = JSON.stringify(maxID + 1);

  payload = { nick: userObj.nick, lastName: userObj.lastName, id: userObj.id };
  const { accessToken, refreshToken } = tokenService.generateToken(payload);
  res.accessToken = accessToken;
  res.refreshToken = refreshToken;
  userObj.refreshToken = refreshToken;

  fileData.users.push(userObj);
  saveChanges(pathToFile, fileData);
  res.message = "Пользователь успешно зарегистрирован";

  return res;
}

async function login(loginData) {
  console.log("userService login");
  let res = {};
  // find & check password user
  const fileData = readFile(pathToFile);
  let inUsers = false;
  let indexUser;

  await Object.values(fileData.users).forEach((el, index) => {
    if (
      el.email === loginData.email &&
      bcrypt.compareSync(loginData.pwd, el.pwd)
    ) {
      inUsers = true;
      res.dataUser = el; // get userData in base
      indexUser = index;
    }
  });

  if (!inUsers) {
    return "";
  }
  // make tokens
  payload = {
    nick: res.dataUser.nick,
    lastName: res.dataUser.lastName,
    userId: res.dataUser.id,
  };
  const tokens = tokenService.generateToken(payload);
  res.accessToken = tokens.accessToken;
  res.refreshToken = tokens.refreshToken;
 

  //rewrite refreshToken
  fileData.users[indexUser].refreshToken  = tokens.refreshToken;
  writeFile('user.json',fileData);

  return res;
}

function updateUser(userId, userUpd) {
  console.log("updateUser");
  const fileData = readFile(pathToFile);

  const user = fileData.users.find((el) => el.id === userId);

  if (!!user) {
    Object.assign(user, userUpd);
  } else {
    console.log("*** the user is missing in base ***");
    return;
  }

  saveChanges(pathToFile, fileData);
}

function deleteUser(userId) {
  console.log("deleteUser ");
  const fileData = readFile(pathToFile);

  const userPos = fileData.users.findIndex((user) => {
    return +user.id === +userId;
  });

  if (userPos > 0) {
    fileData.users.splice(userPos, 1);
  } else {
    console.log("*** user is missing in base ***");
    return;
  }

  saveChanges(pathToFile, fileData);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
};
