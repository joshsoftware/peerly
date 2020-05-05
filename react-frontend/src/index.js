import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "redux-store";
import CreateRecognitionComponent from "./createRecognition/CreateRecognitionComponent";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CreateRecognitionComponent />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
