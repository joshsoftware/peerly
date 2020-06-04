import React from "react";
import PropTypes from "prop-types";

import TopNavbar from "shared-components/layout/TopNavbar";
import Sidebar from "shared-components/layout/Sidebar";

const withLayout = (WrappedComponent, includeNavbar, includeSidebar) => (
  props
) => {
  return (
    <>
      {includeNavbar && <TopNavbar />}
      <WrappedComponent {...props} />
      {includeSidebar && <Sidebar />}
    </>
  );
};

withLayout.propTypes = {
  WrappedComponent: PropTypes.func.isRequired,
  includeNavbar: PropTypes.bool.isRequired,
  includeSidebar: PropTypes.bool.isRequired,
};

export default withLayout;
