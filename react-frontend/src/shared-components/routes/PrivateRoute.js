import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import withLayout from "HOC/withLayout";
import SessionTimeoutComponent from "shared-components/SessionTimeoutComponent";

const PrivateRoute = ({ route }) => {
  const token = useSelector((state) => state.loginReducer.data.token);

  const finalComponent = token
    ? withLayout(route.component, route.includeNavbar, route.includeSidebar)
    : SessionTimeoutComponent;

  return (
    <Route path={route.path} component={finalComponent} exact={route.exact} />
  );
};

PrivateRoute.propTypes = {
  route: PropTypes.shape({
    path: PropTypes.string,
    component: PropTypes.elementType,
    isProtected: PropTypes.bool,
    includeNavbar: PropTypes.bool,
    includeSidebar: PropTypes.bool,
    exact: PropTypes.bool,
  }).isRequired,
};

export default React.memo(PrivateRoute);
