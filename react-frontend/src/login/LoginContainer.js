import React from "react";
import { useSelector } from "react-redux";

import LoginComponent from "login/LoginPageComponent";
import actionGenerator from "utils/actionGenerator";
import { LOGIN_API, LOGIN } from "constants/actionConstants";
import { store } from "root/redux-store";
import actionObjectGenerator from "actions/actionObjectGenerator";
import { useHistory } from "react-router-dom";

const LoginContainer = () => {
  let history = useHistory();
  const loginAuthorization = useSelector((state) => state.loginReducer);

  const responseGoogleOnSuccess = ({ tokenObj }) => {
    const actionStatus = actionGenerator(LOGIN_API);
    const dispatchObject = actionObjectGenerator(
      actionStatus.success,
      tokenObj.access_token
    );
    store.dispatch(dispatchObject);
  };

  const responseGoogleOnFailure = (message) => {
    const actionStatus = actionGenerator(LOGIN);
    const dispatchObject = actionObjectGenerator(actionStatus.failure, {
      value: { message: message.error },
    });
    store.dispatch(dispatchObject);
  };

  if (loginAuthorization.status === 401) {
    return "Unauthorized user"; //TODO: redirect to unauthorized component
  } else if (loginAuthorization.status === 500) {
    return "internal server error"; //TODO: redirects to internal server error component
  } else if (loginAuthorization.error.message === "popup_closed_by_user") {
    return "Unauthorized user"; //TODO: redirect to unauthorized component
  } else if (loginAuthorization.status === 200) {
    history.push("/createREcognition");
  }
  return (
    <LoginComponent
      responseGoogleOnSuccess={responseGoogleOnSuccess}
      responseGoogleOnFailure={responseGoogleOnFailure}
    />
  );
};

export default React.memo(LoginContainer);
