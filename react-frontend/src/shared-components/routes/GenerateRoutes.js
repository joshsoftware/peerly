import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

import PrivateRoute from "shared-components/routes/PrivateRoute";

const getRoutes = (config) =>
  config.map((route) =>
    route.isProtected ? (
      <PrivateRoute route={route} key={route.path} />
    ) : (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
        key={route.key}
      />
    )
  );

function GenerateRoutes({ config }) {
  return getRoutes(config);
}

GenerateRoutes.propTypes = {
  config: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      isProtected: PropTypes.bool,
      includeNavbar: PropTypes.bool,
      includeSidebar: PropTypes.bool,
      component: PropTypes.elementType,
      exact: PropTypes.bool,
    })
  ).isRequired,
};

export default React.memo(GenerateRoutes);
