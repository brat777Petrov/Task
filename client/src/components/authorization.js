import React from "react";
import PropTypes from "prop-types";

function Authorization(props) {
  // console.log(props);
  if (props.authorizationFlag) {
    return (
      <div className="Authorization">

         <span className="Authorization__title"></span>
        <form className="Authorization__form" action="">
          <fieldset>
            Email{" "}
            <input
              className="Authorization__input_name"
              type="text"
              onChange={props.handleEmailChange}
              value={props.email}
            ></input>
            <br></br>
            Password{" "}
            <input
              className="Authorization__input_password"
              type="password"
              onChange={props.handlePasswordChange}
              value={props.password}
            ></input>
            <br></br>
          </fieldset>
        </form>
        <div className="Authorization__btns">
          <button
            className="Authorization__btn_submit"
            onClick={props.handleSubmit}
          >
            {" "}
            submit{" "}
          </button>
          <button
            className="Authorization__btn_addUser"
            onClick={props.handleNewUser}
          >
            {" "}
            new user{" "}
          </button>
        </div>
      </div>
    );
  } else {
    return <div></div>
  }
}
Authorization.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleNewUser: PropTypes.func.isRequired,
  authorizationFlag: PropTypes.bool.isRequired,
};

export default Authorization;
