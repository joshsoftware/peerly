import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

import PrivateRoute from "sharedComponents/PrivateRoute";

function GenerateRoutes({ configs }) {
  return (
    <>
      {configs.map((route) => {
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
    </>
  );
}

GenerateRoutes.propTypes = {
  configs: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      is_protected: PropTypes.bool,
      is_navbar: PropTypes.bool,
      is_sidebar: PropTypes.bool,
      component: PropTypes.func,
      exact: PropTypes.bool,
    })
  ),
};
export default GenerateRoutes;
