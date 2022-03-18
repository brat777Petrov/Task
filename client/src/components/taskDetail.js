import React from "react";
import PropTypes from "prop-types";

function TaskDetail(props) {
  // console.log("TaskDetail - props", props);
  // console.log("props.userTasks.length", props.userTasks.length);

  if (props.userTasks.length === 0 || props.addTaskFlag === true) {
    return <div></div>;
  } else {
    return (
      // *** createdBy
      
      <div className="taskDetail">
        <h2 className="taskDetail_title">TaskDetail</h2> 
        <ul>
          <li className="title">
            <p>
              title: <span className="black"> {props.userTasks[0].title}</span>
            </p>
          </li>
          <li className="desc">
            <p>
              description:{" "}
              <span className="black"> {props.userTasks[0].desc}</span>
            </p>
          </li>
          <li className="status">
            <p>
              status:{" "}
              <span className="black"> {props.userTasks[0].status}</span>
            </p>
          </li>
          <li className="createdAt">
            <p>
              {" "}
              createdAt:{" "}
              <span className="black">
                {" "}
                {props.userTasks[0].createdAt}
              </span>{" "}
            </p>
          </li>
          <li className="assignedTo">
            <p>
              assignedTo:{" "}
              <span className="black"> {props.userTasks[0].assignedTo}</span>
            </p>
          </li>
        </ul>
      </div>
    );
  }
}

TaskDetail.propTypes = {
  userTasks: PropTypes.array.isRequired,
  addTaskFlag: PropTypes.bool.isRequired,
};

export default TaskDetail;
