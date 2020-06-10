import React from "react";
import { useSelector } from "react-redux";

import LoginComponent from "login/LoginComponent"; /*to do this component is depent on login presentational component */
import { store } from "root/redux-store";
import UnauthorisedErrorComponent from "shared-components/UnauthorisedErrorComponent";
import InternalServerErrorComponent from "shared-components/InternalServerErrorComponent";
import actionGenerator from "utils/actionGenerator";
import RecognitionList from "recognition-list/RecognitionListContainer"; //todo apply path after recognition list container

const LoginContainer = () => {
  const loginAuthorization = useSelector((state) => state.loginReducer);

  const responseGoogleOnSuccess = ({ tokenObj }) => {
    store.dispatch({ type: "LOGIN_API", payload: tokenObj.access_token });
  };

  const responseGoogleOnFailure = (message) => {
    const actionStatus = actionGenerator("LOGIN");
    store.dispatch({
      type: actionStatus.failure,
      payload: {
        value: { message: message.error },
      },
    });
  };
  if (loginAuthorization.status === 401) {
    return <UnauthorisedErrorComponent />;
  } else if (loginAuthorization.status === 500) {
    return <InternalServerErrorComponent />;
  } else if (loginAuthorization.error.message === "popup_closed_by_user") {
    return <UnauthorisedErrorComponent />;
  } else if (loginAuthorization.status === 200) {
    return <RecognitionList />;
  }
  return (
    <LoginComponent
      responseGoogleOnSuccess={responseGoogleOnSuccess}
      responseGoogleOnFailure={responseGoogleOnFailure}
    />
  );
};

export default LoginContainer;
