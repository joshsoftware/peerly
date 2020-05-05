import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import withLayout from "HOC/withLayout";
import SessionFallback from "sharedComponents/SessionFallback";

const PrivateRoute = ({ route }) => {
  const token = useSelector((state) => state.appReducer.token);

  const finalComponent = token ? withLayout(route.component) : SessionFallback;

  return (
    <Route path={route.path} component={finalComponent} exact={route.exact} />
  );
};

PrivateRoute.propTypes = {
  route: PropTypes.shape({
    path: PropTypes.string,
    component: PropTypes.func,
    is_protected: PropTypes.bool,
    is_navbar: PropTypes.bool,
    is_sidebar: PropTypes.bool,
    exact: PropTypes.bool,
  }),
};

export default PrivateRoute;
