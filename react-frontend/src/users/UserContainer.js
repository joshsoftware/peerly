import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import Reducers from "reducers/userReducer";
import sagas from "sagas/usersSaga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(Reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);

const UsersContainer = () => {
  const getUsers = () => {
    let token = "";
    store.dispatch({ type: "GET_USERS", payload: token });
  };

  return (
    <div>
      <button onClick={getUsers}>fetch All User</button>
    </div>
  );
};

export default UsersContainer;
