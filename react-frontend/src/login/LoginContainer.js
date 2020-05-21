import React from "react";
import { createStore } from "redux";

import Login from "login/LoginComponent";
import Reducers from "reducers/loginReducer";

const store = createStore(Reducers);

const LoginContainer = () => {
  const responseGoogle = (response) => {
    store.dispatch(response.tokenObj.access_token);
  };

  return (
    <div>
      <Login responseGoogle={responseGoogle} />
    </div>
  );
};

export default LoginContainer;
