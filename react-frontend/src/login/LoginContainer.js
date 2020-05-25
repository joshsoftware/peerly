import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import Login from "login/LoginComponent";
import Reducers from "reducers/loginReducer";
import sagas from "sagas/loginSaga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(Reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);

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
