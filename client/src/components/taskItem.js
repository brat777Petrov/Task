import React from "react";
import PropTypes from "prop-types";

function TaskItem({ task, index, taskInfo,idActiveTaskData }) {
 
  // console.log('TaskItem className', z);
  return (
    <li  onClick={() => {taskInfo(task.id)}}>
      <span className="black">{index + 1}</span>
      &nbsp; &nbsp;
      <span className={(task.id === idActiveTaskData)?"yellow":"black"}>{task.title}</span>
    </li>
  );
}

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  taskInfo: PropTypes.func.isRequired,
  idActiveTaskData: PropTypes.string
};

export default TaskItem;
