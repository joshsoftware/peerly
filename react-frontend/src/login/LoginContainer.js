import React from "react";

import Login from "login/LoginComponent";
import { store } from "root/redux-store";

const LoginContainer = () => {
  const responseGoogleOnSuccess = ({ tokenObj }) => {
    store.dispatch({ type: "LOGIN_API", payload: tokenObj.access_token });
  };

  const responseGoogleOnFailure = (error) => {
    store.dispatch({ type: "LOGIN_FAILURE", value: error });
  };

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
