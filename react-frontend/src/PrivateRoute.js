import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

import "./App.css";
import Fallback from "Fallback";
import withLayout from "HOC/withLayout";

const PrivateRoute = ({ route }) => {
  // TODO get login info from session
  const isLoggedIn = true;
  const finalComponent = isLoggedIn ? route.component : Fallback;
  const withLayoutComponent = withLayout(finalComponent);
  return (
    <Route
      path={route.path}
      component={withLayoutComponent}
      exact={route.exact}
    />
  );
};

PrivateRoute.propTypes = {
  route: PropTypes.object,
};

export default PrivateRoute;
