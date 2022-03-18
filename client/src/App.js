import React from "react";
import "./App.css";
import httpPostRequest from "./components/utils/httpPostRequest";
import Authorization from "./components/authorization";
import UserTasks from "./components/userTask.js";
import TaskDetail from "./components/taskDetail";
import AddTask from "./components/addTask";
import AddNewUser from "./components/addNewUser";

const pathToFile = "http://localhost:8080/api/";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userData: {},
      userTasks: [],
      checkPassword: false,
      idActiveTaskData: "",
      addTaskFlag: false,
      addNewUserFlag: false,
      authorizationFlag: true,
      userTasksFlag: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
    this.getActiveTask = this.getActiveTask.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleReturnAdd = this.handleReturnAdd.bind(this); 
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  async handleSubmit() {
    console.log("handleSubmit");
    //***load user data***/

    const url = pathToFile + "admin/profile/users/login";
    const body = JSON.stringify({
      email: this.state.email,
      pwd: this.state.password,
    });
    
    let res = await httpPostRequest(url, body);//res.tasks,res.dataUser,res.*Token
    
    if (res === "") {
      alert(" Пользователь отсутствует в базе данных");
      return;
    }
    res = JSON.parse(res); //go userTasks

    localStorage.setItem(this.state.email, JSON.stringify({"accessToken": res.accessToken}));
    
    this.setState({
      authorizationFlag: false,
      userTasksFlag: true,
      userTasks: res.tasks,
    });
  }

  handleNewUser() {
    console.log("handleNewUser");
    this.setState({
      addNewUserFlag: !this.state.addNewUserFlag,
      authorizationFlag: !this.state.authorizationFlag,
    });
  }

  handleAddTask() {
    this.setState({
      addTaskFlag: true,
    });
  }

  handleReturnAdd() {
    // console.log("handleReturnAdd");
    this.setState({
      addTaskFlag: false,
    });
  }

  getActiveTask(id) {
    console.log("App - getActiveTask id ", id);
    this.setState({
      idActiveTaskData: id,
    });
  }

  render() {
    return (
      <div className="App">
        <Authorization
          email={this.state.email}
          password={this.state.password}
          handleEmailChange={this.handleEmailChange}
          handlePasswordChange={this.handlePasswordChange}
          handleSubmit={this.handleSubmit}
          handleNewUser={this.handleNewUser}
          authorizationFlag={this.state.authorizationFlag}
        />

        <AddNewUser
          addNewUserFlag={this.state.addNewUserFlag}
          handleNewUser={this.handleNewUser}
        />

        <UserTasks
          userTasks={this.state.userTasks}
          getActiveTask={this.getActiveTask}
          handleAddTask={this.handleAddTask}
          idActiveTaskData={this.state.idActiveTaskData}
          userTasksFlag={this.state.userTasksFlag}
        />
        <TaskDetail
          userTasks={this.state.userTasks.filter(
            (task) => task.id === this.state.idActiveTaskData
          )}
          addTaskFlag={this.state.addTaskFlag}
        />
        <div>
          {this.state.addTaskFlag ? (
        <AddTask
          addTaskFlag={this.state.addTaskFlag}
          handleReturnAdd={this.handleReturnAdd}
        />
          ) : (
            ""
          )}{" "}
        </div>
      </div>
    );
  }
}

export default App;
