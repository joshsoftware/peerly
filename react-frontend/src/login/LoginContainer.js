import React from "react";
import { useSelector } from "react-redux";

import Login from "login/LoginComponent"; /*to do this component is depent on other pr */
import { store } from "root/redux-store";
import UnauthorisedErrorComponent from "shared-components/UnauthorisedErrorComponent";
import InternalServerErrorComponent from "shared-components/InternalServerErrorComponent";

const LoginContainer = () => {
  const loginAuthorization = useSelector((state) => state.loginReducer);

  const responseGoogleOnSuccess = ({ tokenObj }) => {
    store.dispatch({ type: "LOGIN_API", payload: tokenObj.access_token });
  };

  const responseGoogleOnFailure = (error) => {
    store.dispatch({ type: "LOGIN_FAILURE", value: error });
  };

  if (loginAuthorization.error.message === "unauthorized user") {
    return <UnauthorisedErrorComponent />;
  } else if (loginAuthorization.error.error === "popup_closed_by_user") {
    return <UnauthorisedErrorComponent />;
  } else if (loginAuthorization.error.message === "internal server error") {
    return <InternalServerErrorComponent />;
  }
  return (
    <div data-testid="LoginContainer">
      <Login
        responseGoogleOnSuccess={responseGoogleOnSuccess}
        responseGoogleOnFailure={responseGoogleOnFailure}
      />
    </div>
  );
};

export default LoginContainer;
