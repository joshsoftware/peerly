import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import Login from "login/LoginComponent";
import Reducers from "reducers/loginReducer";
import LoginApi from "utils/postJson";
import sagas from "sagas/loginSaga";
const sagaMiddleware = createSagaMiddleware();
const store = createStore(Reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);

const LoginContainer = () => {
  const responseGoogle = async (response) => {
    store.dispatch({ type: "GOOGLE_LOGIN_SUCCESS" });
    const a = await (
      await LoginApi({ access_token: response.tokenObj.access_token })
    ).json();
    store.dispatch({ type: "LOGIN_SUCCESS", value: a });
  };

  return (
    <div>
      <Login responseGoogle={responseGoogle} />
    </div>
  );
};

export default LoginContainer;
