import React from "react";
import TaskItem from "./taskItem";
import PropTypes from "prop-types";

function UserTasks(props) {
  // console.log('UserTasks props', props);
  if (props.userTasksFlag) {
    if (props.userTasks.length === 0) {
      return <div></div>;
    } else {
      return (
        <div className="UserTasks">
         <h2 className="UserTasks_title">UserTasks</h2> 
          <div className="UserTasks_panel">
          
          <ul>
            {Object.values(props.userTasks).map((task, index) => {
              return (
                <TaskItem
                  task={task}
                  key={task.id}
                  index={index}
                  taskInfo={props.getActiveTask}
                  idActiveTaskData={props.idActiveTaskData}
                />
              );
            })}
          </ul>
          </div>
          <button className="addTask_btn" onClick={props.handleAddTask}>
            add task
          </button>
        </div>
      );
    }
  } else {
    return <div></div>;
  }
}
UserTasks.propTypes = {
  userTasks: PropTypes.array.isRequired,
  getActiveTask: PropTypes.func.isRequired,
  handleAddTask: PropTypes.func.isRequired,
  idActiveTaskData: PropTypes.string,
  userTasksFlag: PropTypes.bool.isRequired,
};

export default UserTasks;
