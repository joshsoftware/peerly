import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Button } from "react-bootstrap";

import Reducers from "reducers/organisationReducer";
import sagas from "sagas/organisaionSaga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(Reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);

const OrganisationContainer = () => {
  const getOrganisations = () => {
    store.dispatch({ type: "GET_ORGANISATIONS" });
  };

  return (
    <div>
      <Button onClick={getOrganisations}>click</Button>
    </div>
  );
};

export default OrganisationContainer;
