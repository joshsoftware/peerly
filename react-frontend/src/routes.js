import React from "react";
import { Switch, Route } from "react-router-dom";

import rootRoutes from "root-routes";
import PrivateRoute from "PrivateRoute";

function Routes() {
  return (
    <Switch>
      {rootRoutes.map((route) => {
        return route.is_protected ? (
          <PrivateRoute route={route} key={route.path} />
        ) : (
          <Route
            path={route.path}
            component={route.component}
            exact={route.exact}
            key={route.path}
          />
        );
      })}
    </Switch>
  );
}

export default Routes;
