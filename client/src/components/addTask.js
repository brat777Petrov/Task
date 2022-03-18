import React from "react";
import PropTypes from "prop-types";

import httpPostRequest from "./utils/httpPostRequest";

function handleForm(e) {
  console.log("addTask handleForm ");
  e.preventDefault();

  const addForm = document.forms.task;
  
  const data = {
    title: addForm.title.value,
    description: addForm.description.value,
    status: addForm.status,
    createdAt: addForm.createdAt,
    assignedTo: addForm.assignedTo.value,
    createdBy: 'brat777',
  };
  // const body = JSON.stringify(data);



  console.log('addForm  body ', data);
  const pathToFile = "http://localhost:8080/api/admin/tasks";
  // httpPostRequest(pathToFile, body);

  //  console.log("AddTask body.title", body);
}

function AddTask(props) {
    // console.log( 'AddTask props', props);
  
    const currDate = new Date().toLocaleDateString();

    return (
       
      <form name="task" id="task" >
        <fieldset>
          <div className="addTask">
            AddTask
            <ul>
              <li className="title">
                title: {"   "}
                <input name="title" className="black" type="text"></input>
              </li>

              <li className="desc">
                description:{" "}
                <input name="description" className="black" type="text"></input>
              </li>

              <li className="status">
                <p>
                  status: <span className="black"> open </span>
                </p>
              </li>

              <li className="createdAt">
                createdAt: <span className="black"> {currDate} </span>
              </li>

              <li className="assignedTo">
                assignedTo:{" "}
                <input name="assignedTo" className="black" type="text"></input>
              </li>
              <button className="submit" onClick={handleForm}>
                {" "}
                submit{" "}
              </button>

              <button className="return" onClick={props.handleReturnAdd}>
                {" "}
                return{" "}
              </button>

            </ul>
          </div>
        </fieldset>
      </form>
    );
  
}

AddTask.propTypes = {
  addTaskFlag: PropTypes.bool.isRequired,
  handleReturnAdd:PropTypes.func.isRequired
};

export default AddTask;
