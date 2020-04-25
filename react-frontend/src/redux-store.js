import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import rootReducer from "reducers/rootReducer.js";
import rootSaga from "sagas/rootSaga.js";

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware();

function configureStore() {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
}

export const store = configureStore();

// run the root saga
sagaMiddleware.run(rootSaga);
