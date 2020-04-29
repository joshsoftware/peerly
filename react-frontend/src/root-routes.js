import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "App";

function Root() {
  return (
    <main>
      <Switch>
        <Route path="/" component={App} exact />
      </Switch>
    </main>
  );
}

export default Root;
