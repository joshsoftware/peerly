import React from "react";

import Login from "login/LoginComponent";
import { store } from "root/redux-store";

const LoginContainer = () => {
  const responseGoogle = ({ tokenObj }) => {
    store.dispatch({ type: "LOGIN_API", payload: tokenObj.access_token });
  };

  return (
    <div>
      <Login responseGoogle={responseGoogle} />
    </div>
  );
};

export default LoginContainer;
