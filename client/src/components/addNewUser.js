import React from "react";
import PropTypes from "prop-types";
import httpPostRequest from "./utils/httpPostRequest";
import { useState } from "react";

const pathToFile = "http://localhost:8080/api/";

async function post(addForm) {
  const data = {
    nick: addForm.nick.value,
    lastName: addForm.lastName.value,
    email: addForm.email.value,
    pwd: addForm.pwd.value,
    role: "user",
    profileLogo: addForm.profileLogo.value,
  };
  const body = JSON.stringify(data);
  const path = pathToFile + "admin/profile/users/registration";
  return await httpPostRequest(path, body);
}

function AddNewUser(props) {
  const [visible, setVisible] = useState(100);
  const [visibleComplete, setVisibleComplete] = useState(-5000);
  const [answerServer, setAnswerServer] = useState("");

  const handleForm = async function (e) {
    e.preventDefault();

    const userForm = document.forms.newUser;
    post(userForm).then(
      (res) => {

        setVisible(0);
        setVisibleComplete(0);

        const result = JSON.parse(res);

        setAnswerServer(result.message);
        setTimeout(() => {
          props.handleNewUser();
          setVisible(100);
          setVisibleComplete(-5000);
        }, 4000);
      },
      (err) => {
        console.log("err");
      }
    );
  };

  if (props.addNewUserFlag) {
    return (
      <div className="AddNewUser">
        <span className="AddNewUser__title" style={{ opacity: visible }}>
          {" "}
          New user ...{" "}
        </span>
        <form name="newUser" className="AddNewUser__form" onSubmit={handleForm}>
          <fieldset style={{ opacity: visible }}>
            firstName{" "}
            <input
              name="nick"
              className="AddNewUser__input_firstName"
              type="text"
              required
            ></input>
            <br></br>
            lastName{" "}
            <input
              name="lastName"
              className="AddNewUser__input_lastName"
              type="text"
              required
            ></input>
            <br></br>
            email{" "}
            <input
              name="email"
              className="AddNewUser__input_email"
              type="email"
              required
            ></input>
            <br></br>
            password{" "}
            <input
              name="pwd"
              className="AddNewUser__input_pwd"
              type="text"
              required
            ></input>
            <br></br>
            profileLogo{" "}
            <input
              name="profileLogo"
              className="AddNewUser__input_profileLogo"
              type="text"
              required
            ></input>
            <br></br>
            <button className="AddNewUser__btn_addUser"> submit </button>
          </fieldset>
        </form>

        <div
          className="AddNewUser__complete"
          style={{ marginLeft: visibleComplete }}
        >
          {answerServer}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

AddNewUser.propTypes = {
  addNewUserFlag: PropTypes.bool.isRequired,
  handleNewUser: PropTypes.func.isRequired,
};

export default AddNewUser;
