import React from "react";
import { useSelector } from "react-redux";

import LoginComponent from "login/LoginComponent"; /*TODO: this component is depent on login presentational component */
import { store } from "root/redux-store";
import UnauthorisedErrorComponent from "shared-components/UnauthorisedErrorComponent";
import InternalServerErrorComponent from "shared-components/InternalServerErrorComponent";
import actionGenerator from "utils/actionGenerator";

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
    return "Successful"; //TODO: redirect to dashboard
  }
  return (
    <LoginComponent
      responseGoogleOnSuccess={responseGoogleOnSuccess}
      responseGoogleOnFailure={responseGoogleOnFailure}
    />
  ); //TODO: depends upon login presentational component
};

export default React.memo(LoginContainer);
