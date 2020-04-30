import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "App";
import Dashboard from "Dashboard";

function Routes() {
  return (
    <main>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </main>
  );
}

export default Routes;
