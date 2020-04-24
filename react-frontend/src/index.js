import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "redux-store";
import App from "./App";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
